import {defineConfig} from 'astro/config';
import {fileURLToPath} from 'node:url';

const local = process.env.BBG_LOCAL === '1';

export default defineConfig({
  output: 'static',
  site: local ? undefined : process.env.PAGES_SITE,
  base: local ? '/' : (process.env.PAGES_BASE || '/'),
  publicDir: fileURLToPath(new URL(local ? '../conteudo/Anexos/' : './edicao/Anexos/', import.meta.url)),
  outDir: local ? './dist-local' : './dist',
  devToolbar: {enabled: false},
});
