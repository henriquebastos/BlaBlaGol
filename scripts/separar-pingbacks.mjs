import assert from 'node:assert/strict';
import {copyFileSync,existsSync,mkdirSync,readFileSync,readdirSync,renameSync,writeFileSync} from 'node:fs';
import {basename,join,resolve} from 'node:path';
import {load,JSON_SCHEMA} from 'js-yaml';

const [, , indexFile, rootArg, backupArg] = process.argv;
assert(indexFile && rootArg && backupArg, 'Informe o índice, o cofre e o destino da cópia temporária.');
const root=resolve(rootArg);
const backup=resolve(backupArg);
const map=new Map(JSON.parse(readFileSync(indexFile,'utf8')).map(([post,id,origin])=>[post+':'+id,String(origin)]));
const commentsHeading=/^# Comentários[ \t]*$/m;
const refsHeading=/^# Referências de outros posts[ \t]*$/m;
const heading=/^## ([^\n]*?) - #(\d+)(?: \^comentario-\d+)?[ \t]*$/gm;
const files=new Map();
for(const e of readdirSync(join(root,'Posts'),{withFileTypes:true})){
  if(!e.isFile() || !e.name.endsWith('.md'))continue;
  const id=e.name.match(/^(\d+) - /)?.[1];
  if(!id)continue;
  const s=readFileSync(join(root,'Posts',e.name),'utf8');
  const yaml=/^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(s)?.[1];
  assert(yaml,'Cabeçalho não encontrado: '+e.name);
  const meta=load(yaml,{schema:JSON_SCHEMA});
  files.set(id,{name:e.name,s,meta});
}
let moved=0, deleted=0;
const writes=new Map();
const removals=new Set();
const touched=new Set();
const authorNames=new Set();
const movedIds=new Set();
for(const {meta} of files.values()){
  const n=/\[\[Pessoas\/([^\]|]+)/.exec(meta.autor || '')?.[1]?.normalize('NFC');
  if(n)authorNames.add(n);
}
for (const [post,{name,s}] of files) {
  const cut=s.search(commentsHeading);
  if(cut<0 || refsHeading.test(s))continue;
  const intro=s.slice(0,cut).trimEnd();
  const tail=s.slice(cut).replace(commentsHeading,'').trim();
  const matches=[...tail.matchAll(heading)];
  if(!matches.length)continue;
  const initial=tail.slice(0,matches[0].index).trim();
  const keep=initial ? [initial] : [];
  const refs=[];
  for(const [i,m] of matches.entries()){
    const [,info,id]=m;
    const block=tail.slice(m.index,matches[i+1]?.index ?? tail.length).trimEnd();
    const target=map.get(post+':'+id);
    if(!target || !files.has(target)){keep.push(block);continue}
    const n=/\[\[Pessoas\/([^\]|]+)/.exec(info)?.[1]?.normalize('NFC');
    if(n)touched.add(n);
    const source=files.get(target);
    const dest=source.name.slice(0,-3);
    const title=String(source.meta.aliases?.[0] ?? dest.slice(target.length+3)).replace(/[\[\]|\r\n]/g,'');
    const separator=info.search(/ - (?:\[\[Pessoas\/|Nome não exibido$)/);
    const date=separator<0 ? '' : info.slice(0,separator);
    const body=block.slice(m[0].length);
    refs.push('## '+(date ? date+' - ' : '')+'[[Posts/'+dest+'|'+title+']] - #'+id+' ^comentario-'+id+body);
    movedIds.add(post+':'+id);
    moved++;
  }
  if(!refs.length)continue;
  writes.set(join(root,'Posts',name),intro+'\n\n'
    +(keep.length ? '# Comentários\n\n'+keep.join('\n\n')+'\n\n' : '')
    +'# Referências de outros posts\n\n'+refs.join('\n\n')+'\n');
}

for(const e of readdirSync(join(root,'Pessoas'),{withFileTypes:true})){
  if(!e.isFile() || !e.name.endsWith('.md') || !touched.has(e.name.slice(0,-3).normalize('NFC')))continue;
  const path=join(root,'Pessoas',e.name);
  const s=readFileSync(path,'utf8');
  const cut=s.search(/^## Comentários[ \t]*$/m);
  let t=s;
  const isMovedLine=(line)=>{
    const m=/^\s*- .*?\[\[Posts\/(\d+) - .*?#\^comentario-(\d+)\|#\d+\]\]/.exec(line);
    return !!m && movedIds.has(m[1]+':'+m[2]);
  };
  if(cut>=0){
    const history=s.slice(cut).split('\n');
    const result=[];
    for(let i=0;i<history.length;i++){
      const line=history[i];
      if(isMovedLine(line))continue;
      if(/^\[\[Posts\/\d+ - .*\|#\d+\]\]/.test(line)){
        const group=[];
        for(let j=i+1;j<history.length && !/^\[\[Posts\/\d+ - .*\|#\d+\]\]|^<!--/.test(history[j]);j++)group.push(history[j]);
        if(group.some(isMovedLine) && !group.some(l=>l.trim() && !isMovedLine(l)))continue;
      }
      result.push(line);
    }
    t=s.slice(0,cut)+result.join('\n').replace(/\n{3,}/g,'\n\n');
  }else{
    t=s.split('\n').filter(l=>!isMovedLine(l)).join('\n');
  }
  if(t===s)continue;
  const name=e.name.slice(0,-3).normalize('NFC');
  if(!authorNames.has(name) && !/\[\[Posts\//.test(t)) {removals.add(path);deleted++;}
  else writes.set(path,t);
}

const mf=join(root,'Metadados.jsonl');
if(existsSync(mf)){
  let touchedRecords=0;
  const rows=readFileSync(mf,'utf8').split('\n').map(line=>{
    if(!line.trim())return line;
    const r=JSON.parse(line);
    const pid=String(r.id).split(':').at(-1);
    let changed=false;
    for(const c of r.comentarios||[]){
      const key=pid+':'+c.id;
      if(!movedIds.has(key))continue;
      c.tipo='pingback';
      c.post_origem=Number(map.get(key));
      changed=true;touchedRecords++;
    }
    return changed ? JSON.stringify(r) : line;
  });
  assert.equal(touchedRecords,moved);
  writes.set(mf,rows.join('\n'));
}

assert(moved>=400,'Total inesperado: '+moved);
assert(movedIds.has('1109:10909'),'Pingback de referência não foi encontrado');
function backupPath(file){
  const relative=file.slice(root.length+1);
  const old=join(backup,relative);
  const dir=old.slice(0,old.lastIndexOf('/'));
  mkdirSync(dir,{recursive:true});
  return old;
}
for(const [file,t] of writes){
  copyFileSync(file,backupPath(file));
  writeFileSync(file,t);
}
for(const file of removals)renameSync(file,backupPath(file));
console.log(JSON.stringify({moved,peopleRemoved:deleted,affectedNotes:writes.size}));
