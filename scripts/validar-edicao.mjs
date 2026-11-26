import {lstatSync, readdirSync, readFileSync} from 'node:fs';

const files = readdirSync('edicao/Posts').filter(name => name !== '.gitkeep');
if (!files.length) throw Error('Adicione pelo menos uma publicação revisada antes de usar o GitHub Pages.');
const email = /\b[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+\b/i;
const privateFields = /^(?:e-?mail|wordpress_user_id|pessoa_id|capturas_imagens_externas):/mi;
for (const name of files) {
  const file = 'edicao/Posts/' + name;
  if (!/^\d+ - .+\.md$/u.test(name) || !lstatSync(file).isFile()) throw Error('Arquivo inválido na edição: ' + name);
  const markdown = readFileSync(file, 'utf8');
  if (email.test(markdown) || privateFields.test(markdown)) throw Error('Dados privados em ' + name);
}
for (const name of readdirSync('edicao/Anexos').filter(name => name !== '.gitkeep')) {
  const file = 'edicao/Anexos/' + name;
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpe?g|gif|webp|avif)$/i.test(name) || !lstatSync(file).isFile()) {
    throw Error('Anexo inválido na edição: ' + name);
  }
}
