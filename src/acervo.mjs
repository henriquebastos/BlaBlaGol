import {createHash} from 'node:crypto';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {load, JSON_SCHEMA} from 'js-yaml';
import {markdownToHast} from 'satteri';

export const local = process.env.BBG_LOCAL === '1';
const source = resolve(process.cwd(), local ? '../conteudo' : 'edicao');
const wiki = /(!?)\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g;
const imageName = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpe?g|gif|webp|avif)$/i;
const assetPath = (name) => imageName.test(name) && existsSync(join(source, 'Anexos', name));
const textWiki = (s) => String(s || '').replace(wiki, (_, bang, target, label) => label || target.split('/').at(-1));

function cleanPostBody(body) {
  const lines = body.trim().split('\n');
  if (/^Link(?:[ \t]+Link)+$/i.test(lines[0])) lines.shift();
  return lines.filter((line, i) => {
    if (/^\[\d+\s*Coment[aá]rios?\]/i.test(line) && line.includes('Enviar por e-mail') && line.includes('/wp-content/plugins/wp-email/')) return false;
    const asset = /^!\[\[Anexos\/([^|\]]+)/.exec(lines[i-1] || '')?.[1];
    if (asset && assetPath(asset) && /^\[[^\]]+ \(original\)\]\(<https?:\/\/[^>]+\/wp-content\/uploads\/[^>]+>\)[ \t]*$/i.test(line)) return false;
    return true;
  }).join('\n').trim();
}

function parsePost(name) {
  const input = readFileSync(join(source, 'Posts', name), 'utf8');
  const parts = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(input);
  if (!parts) throw Error('Cabeçalho inválido: ' + name);
  const data = load(parts[1], {schema: JSON_SCHEMA});
  const id = name.match(/^(\d+) - /)?.[1];
  if (!id || String(data.post_id) !== id) throw Error('ID inválido: ' + name);
  const title = String(data.aliases?.[0] ?? name.slice(id.length + 3, -3));
  const [first, ...rest] = parts[2].trimStart().split('\n');
  const raw = (/^# /.test(first) ? rest.join('\n') : parts[2]).trim();
  const [discussion, ...references] = raw.split(/^# Referências de outros posts[ \t]*$/m);
  const [body, ...sections] = discussion.split(/^# Comentários\s*$/m);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(data.publicado_em) ? String(data.publicado_em) : '';
  return {id, title, date, year: date.slice(0,4) || 'sem-data', author: (/\[\[Pessoas\/([^\]|]+)/.exec(data.autor || '')?.[1] || textWiki(data.autor)).normalize('NFC'),
    catalogOnly: data.registro_historico === true, themes: Array.isArray(data.temas) ? data.temas.map(textWiki) : [], body: cleanPostBody(body),
    comments: sections.join('\n# Comentários\n').trim(), references: references.join('\n# Referências de outros posts\n').trim()};
}

export const posts = readdirSync(join(source, 'Posts'), {withFileTypes:true})
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => parsePost(entry.name))
  .sort((a,b) => b.date.localeCompare(a.date) || Number(b.id) - Number(a.id));
const ids = new Set(posts.map((post) => post.id));
if (ids.size !== posts.length) throw Error('IDs de publicação repetidos');
export const years = [...new Set(posts.map((post) => post.year))];
export const labelYear = (year) => year === 'sem-data' ? 'Sem data' : year;
export const postPath = (id, base) => base.replace(/\/$/, '') + '/posts/' + id + '/';
export const yearPath = (year, base) => base.replace(/\/$/, '') + '/ano/' + year + '/';
export function commentEntries(input) {
  return [...input.matchAll(/^## ([^\n]*?) #(\d+)(?: \^comentario-\d+)?[ \t]*$/gm)].map(([,title,id]) => {
    const profile = /\[\[Pessoas\/([^\]|]+)(?:\|([^\]]+))?\]\]/.exec(title);
    return {id, name: profile ? profile[1].normalize('NFC') : '', date: title.split(' - ',1)[0]};
  });
}
const peopleMap = new Map();
function person(name) {
  name = name.normalize('NFC');
  if (!peopleMap.has(name)) peopleMap.set(name,{name,entries:[],comments:[]});
  return peopleMap.get(name);
}
for (const post of posts) {
  if (post.author) person(post.author).entries.push(post);
  for (const entry of commentEntries(post.comments)) {
    if (entry.name && !(post.id==='2492' && entry.id==='25500')) {
      person(entry.name).comments.push({post, id:entry.id, date:entry.date});
    }
  }
}
export const people = [...peopleMap.values()].sort((a,b) => a.name.localeCompare(b.name,'pt-BR'));
export const commentPath = (id,comment,base) => postPath(id,base)+'#comentario-'+comment;
export const pageKey = (name) => createHash('sha256').update(name.normalize('NFC')).digest('hex').slice(0,16);
export const authorPath = (name,base) => base.replace(/\/$/,'')+'/autor/'+pageKey(name)+'/';
export const themePath = (name,base) => base.replace(/\/$/,'')+'/tema/'+pageKey(name)+'/';
export const dateLabel = (date) => date ? date.split('-').reverse().join('/') : 'Sem data confirmada';

export function renderMarkdown(input, base, {comments = false, postId = ''} = {}) {
  if (comments) {
    if (postId === '2492') input = input.replace(/^## [^\n]*#25500(?=\s|$)[^\n]*\n[\s\S]*?(?=^## |$(?![\s\S]))/m,
      '## Comentário #25500 {#comentario-25500}\n\nConteúdo disponível apenas no cofre local.\n\n');
    input = input.replace(/^## (.*?)(?: \^comentario-\d+)?\s*$/gm, (line, title) => {
      const id = title.match(/#(\d+)$/)?.[1];
      return id ? '### ' + title + ' {#comentario-' + id + '}' : '### ' + title;
    });
  }
  const prefix = base.replace(/\/$/, '') + '/';
  const allowedPaths = new Set();
  const normalized = input.replace(wiki, (_, bang, target, label) => {
    const name = target.startsWith('Anexos/') ? target.slice(7) : '';
    if (bang && assetPath(name)) {
      const url = prefix + encodeURIComponent(name);
      allowedPaths.add(url);
      return '![' + (label || 'Imagem da publicação').replace(/[\[\]]/g,'') + '](' + url + ')';
    }
    const postId = target.match(/^(?:Posts\/)?(\d+)(?: - .*?)?(?:#\^comentario-(\d+))?$/);
    const visible = (label || target.split('/').at(-1)).replace(/[\[\]]/g,'').replaceAll('\\','\\\\');
    if (!bang && target.startsWith('Pessoas/') && peopleMap.has(target.slice(8).normalize('NFC'))) {
      return '[' + visible + '](' + authorPath(target.slice(8),base) + ')';
    }
    if (!bang && postId && ids.has(postId[1])) {
      return '[' + visible + '](' + postPath(postId[1], base) + (postId[2] ? '#comentario-' + postId[2] : '') + ')';
    }
    return bang ? '' : visible;
  });
  const tree = markdownToHast(normalized, {features:{headingAttributes:true,frontmatter:false}});
  return serialize(tree, allowedPaths, prefix);
}

const tags = new Set('p blockquote ul ol li h2 h3 h4 h5 h6 hr br strong em del code pre table thead tbody tr th td sup sub a img'.split(' '));
const clean = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function serialize(node, assets, prefix) {
  if (node.type === 'text') return clean(node.value);
  if (node.type !== 'root' && node.type !== 'element') return '';
  const content = (node.children || []).map(child => serialize(child, assets, prefix)).join('');
  const tag = node.tagName;
  if (!tags.has(tag)) return content;
  const p = node.properties || {};
  if (tag === 'a') {
    const href = String(p.href || '');
    const match = href.startsWith(prefix) && /^(?:posts\/\d+\/(#comentario-\d+)?|autor\/[a-f0-9]{16}\/)$/.test(href.slice(prefix.length));
    if (match || /^#comentario-\d+$/.test(href)) return '<a href="' + clean(href) + '">' + content + '</a>';
    if (!local && /^https:\/\/web\.archive\.org\/web\/\d{14}\//i.test(href)) {
      return '<a rel="noreferrer" href="' + clean(href) + '">' + content + '</a>';
    }
    return content;
  }
  if (tag === 'img') {
    const src = String(p.src || '');
    const name = src.startsWith(prefix) ? src.slice(prefix.length) : '';
    if (!assets.has(src) && !assetPath(name)) return '';
    return '<img loading="lazy" decoding="async" src="' + clean(src) + '" alt="' + clean(p.alt) + '">';
  }
  if (tag === 'br' || tag === 'hr') return '<' + tag + '>';
  const anchor = /^comentario-\d+$/.test(p.id) ? ' id="' + clean(p.id) + '"' : '';
  const start = tag === 'ol' && /^\d+$/.test(p.start) ? ' start="' + p.start + '"' : '';
  return '<' + tag + anchor + start + '>' + content + '</' + tag + '>';
}
