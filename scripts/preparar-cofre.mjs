import {existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync} from 'node:fs';
import {resolve, join, basename} from 'node:path';
import {load, JSON_SCHEMA} from 'js-yaml';

const [original, destino] = process.argv.slice(2).map(x => resolve(x));
if (!original || !destino || existsSync(destino)) throw Error('Informe o cofre de origem e um diretório de destino novo.');
for (const dir of ['Posts','Pessoas','Anexos','Temas','Cronologia','.obsidian']) mkdirSync(join(destino,dir),{recursive:true});

const email = /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+\b/gi;
const cpf = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
const telefone = /(?:\+55\s*)?\(?\d{2}\)?\s+9?\d{4}[ .-]\d{4}\b/g;
let redacoes = 0;
function dados(texto) {
  return String(texto || '').replace(email, () => { redacoes++; return '[e-mail omitido]'; })
    .replace(cpf,'[documento omitido]').replace(telefone,'[telefone omitido]');
}
const sensivel = /carol[\s._%/-]*miranda|carolin[a-z]*[\s._%/-]*dieckmann|nudez[\s._%/-]*censurada|(?:foto|vídeo|video)[s]?[\s._%/-]+(?:íntim|intim|vazad)|(?:redtube|xvideos|pornhub|xhamster|thefappening)\./i;
const antigos = readFileSync(join(original,'Mídia.md'),'utf8');
const bloqueadas = new Set();
for (const line of antigos.split('\n')) {
  const img = /\[\[Anexos\/([^|\]]+)/.exec(line)?.[1];
  if (img && sensivel.test(line)) bloqueadas.add(img);
}

function jpegSemMetadados(bytes) {
  if (bytes[0] !== 255 || bytes[1] !== 216) return null;
  const partes = [bytes.subarray(0,2)];
  for (let p=2;p<bytes.length;) {
    const ini=p;
    if (bytes[p++] !== 255) return null;
    while (bytes[p]===255) p++;
    const tipo=bytes[p++];
    if (tipo===218 || tipo===217) return Buffer.concat([...partes,bytes.subarray(ini)]);
    if (p+2 > bytes.length) return null;
    const size=bytes.readUInt16BE(p);
    if (size < 2 || p+size > bytes.length) return null;
    p+=size;
    if (tipo!==225 && tipo!==237 && tipo!==254) partes.push(bytes.subarray(ini,p));
  }
  return null;
}
function pngSemMetadados(bytes) {
  if (bytes.subarray(0,8).toString('hex') !== '89504e470d0a1a0a') return null;
  const partes=[bytes.subarray(0,8)];
  for (let p=8;p+12<=bytes.length;) {
    const size=bytes.readUInt32BE(p), tipo=bytes.toString('ascii',p+4,p+8), next=p+size+12;
    if (next>bytes.length) return null;
    if (!['tEXt','zTXt','iTXt','eXIf'].includes(tipo)) partes.push(bytes.subarray(p,next));
    if (tipo==='IEND') return Buffer.concat(partes);
    p=next;
  }
  return null;
}
const anexos = new Set();
let comments = 0, restritos = 0, posts = 0;
const porPessoa = new Map(), porAno = new Map(), porTema = new Map();
const guardar = (map,key,ref) => {
  if (!map.has(key)) map.set(key,[]);
  map.get(key).push(ref);
};
const wiki = /\[\[(Pessoas|Temas)\/([^|\]]+)(?:\|([^\]]+))?\]\]/g;
const nomeSeg = n => n && basename(n) === n && !/[\\[\]#^|\n\r]/.test(n) && n !== '.' && n !== '..' && !n.includes('omitido');
function linksPublicos(texto) {
  return dados(texto.replace(/<!--[^]*?-->/g,''))
    .replace(/(?:https?:\/\/|mailto:)[^\s<>"\])]+/gi, (url) => sensivel.test(url) ? 'link-omitido' : url)
    .replace(/!\[\[Anexos\/([^|\]]+)(?:\|[^\]]*)?\]\]/g, (m, name) => {
      if (!/^[\da-f]{20}\.(jpg|png|gif)$/.test(name) || bloqueadas.has(name)) return '';
      anexos.add(name);
      return m;
    });
}
for (const f of readdirSync(join(original,'Posts'),{withFileTypes:true})) {
  if (!f.isFile() || !f.name.endsWith('.md')) continue;
  const source = readFileSync(join(original,'Posts',f.name),'utf8');
  const raw = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!raw) throw Error('Cabeçalho ausente: '+f.name);
  const meta = load(raw[1],{schema:JSON_SCHEMA});
  const id = Number(meta.post_id);
  const title = dados(meta.aliases?.[0] || f.name.slice(String(id).length+3,-3));
  const name = dados(f.name).replaceAll('[e-mail omitido]','omitido');
  const date = /^\d{4}-\d{2}-\d{2}$/.test(meta.publicado_em) ? meta.publicado_em : null;
  const author = dados(meta.autor);
  const themes = Array.isArray(meta.temas) ? meta.temas.map(dados) : [];
  const safeMeta = {tipo:'post',post_id:id,aliases:[title],publicado_em:date,autor:author||null,temas:themes};
  const lines = Object.entries(safeMeta).map(([key,value])=>key+': '+JSON.stringify(value));
  const [body,...commentParts] = raw[2].trimStart().replace(/^# [^\n]*\n/,'').split(/^# Comentários\s*$/m);
  const ref = '[[Posts/'+name.slice(0,-3)+'|#'+id+']] - '+title;
  const entries = [];
  for (const comment of commentParts.join('\n').trim().split(/(?=^## [^\n]*#\d+(?: \^comentario-\d+)?\s*$)/m)) {
    if (!comment.trim()) continue;
    const m = /^(## [^\n]*#(\d+)(?: \^comentario-\d+)?)[ \t]*\n?/m.exec(comment);
    if (!m) { entries.push(linksPublicos(comment).trim()); continue; }
    let show = !(id===2492 && m[2]==='25500') && !sensivel.test(comment);
    if (!show) { restritos++; continue; }
    const content = linksPublicos(comment).trim();
    entries.push(content);
    comments++;
    for (const [,kind,key] of dados(m[1]).matchAll(wiki)) {
      if (kind==='Pessoas' && nomeSeg(key)) guardar(porPessoa,key,ref+' · [[Posts/'+name.slice(0,-3)+'#^comentario-'+m[2]+'|#'+m[2]+']]');
    }
  }
  for (const [,kind,key] of author.matchAll(wiki)) if (kind==='Pessoas' && nomeSeg(key)) guardar(porPessoa,key,ref);
  for (const theme of themes) for (const [,kind,key] of theme.matchAll(wiki)) {
    if (kind==='Temas' && nomeSeg(key)) guardar(porTema,key,ref);
  }
  if (date) guardar(porAno,date.slice(0,4),ref);
  const safeBody = [821,1486].includes(id) ? 'Texto não incluído na edição pública.' : linksPublicos(body).trim();
  const texto = ['---',...lines,'---','','# '+title,'',safeBody,entries.length ? '\n# Comentários\n\n'+entries.join('\n\n') : ''].join('\n').trimEnd()+'\n';
  writeFileSync(join(destino,'Posts',name),texto);
  posts++;
}
for (const [dir,dadosMapa] of [['Pessoas',porPessoa],['Temas',porTema],['Cronologia',porAno]]) {
  for (const [key,refs] of dadosMapa) {
    const existing = join(original,dir,key+'.md');
    const titulo = dir==='Temas' && existsSync(existing) ? /^# (.+)$/m.exec(readFileSync(existing,'utf8'))?.[1] || key : key;
    writeFileSync(join(destino,dir,key+'.md'),'# '+dados(titulo)+'\n\n'+refs.map(x=>'- '+x).join('\n')+'\n');
  }
}
let fotos=0;
for (const name of anexos) {
  const path = join(original,'Anexos',name);
  if (!existsSync(path)) continue;
  const originalBytes = readFileSync(path);
  const bytes = name.endsWith('.jpg') ? jpegSemMetadados(originalBytes) : name.endsWith('.png') ? pngSemMetadados(originalBytes) :
    /^GIF8[79]a/.test(originalBytes.toString('ascii',0,6)) ? originalBytes : null;
  if (bytes) { writeFileSync(join(destino,'Anexos',name),bytes); fotos++; }
}
writeFileSync(join(destino,'.obsidian','app.json'),'{"attachmentFolderPath":"Anexos"}\n');
writeFileSync(join(destino,'Início.md'),
  '# BlaBlaGol\n\nAbra **Posts** para ler o blog. Use **Pessoas**, **Temas** e **Cronologia** para navegar pelas referências.\n');
console.log(JSON.stringify({posts,comments,pessoas:porPessoa.size,fotos,redacoes,restritos,bloqueadas:bloqueadas.size,anexosReferenciados:anexos.size}));
