# BlaBlaGol

[**Ver o blog publicado**](https://henriquebastos.github.io/BlaBlaGol/)

O blog e o cofre do Obsidian vivem neste repositório. O Astro lê os mesmos posts em Markdown que o Obsidian.

## Abrir no Obsidian

Clone o repositório. No Obsidian, escolha **Abrir pasta como cofre** e abra `edicao/`. As pastas **Posts**, **Pessoas**, **Cronologia** e **Temas** levam ao conteúdo. **Anexos** guarda os arquivos exibidos nos posts e comentários.

## Abrir no navegador

Use Node 24 e pnpm. Rode `pnpm install --frozen-lockfile` e `pnpm dev`. Abra `http://127.0.0.1:4321/`.

Para publicar, rode **Publicar no GitHub Pages** na aba Actions. Só esse workflow manual atualiza o site.

## Limites da edição

Esta edição tem 3.279 registros de posts. Alguns sobreviveram sem o texto ou sem parte dos comentários. Não inclui e-mails, metadados privados nem material restrito a backup local.

A cópia original do cofre não está neste repositório. Em um computador com o cofre original em `../conteudo/`, `pnpm acervo` abre uma prévia local. Nunca publique a saída de `pnpm acervo:build`.
