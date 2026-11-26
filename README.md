# BlaBlaGol

Este repositório guarda o site Astro e a edição web do acervo. O cofre completo do Obsidian fica em `../conteudo/`, fora deste repositório.

## Ler o acervo local

1. Instale as dependências com `pnpm install --frozen-lockfile`.
2. Rode `pnpm acervo` no Azgard.
3. Abra `http://127.0.0.1:4321/` no Azgard.

A leitura local oferece cronologia, páginas por publicação, imagens locais e âncoras nos comentários. O Obsidian segue como referência para fichas de pessoas, fontes e metadados. O site não modifica o cofre.

## Preparar a edição web

Copie para `edicao/Posts/` apenas as publicações revisadas para republicação. Remova dados pessoais e links sensíveis da cópia. Ponha em `edicao/Anexos/` apenas imagens cuja publicação foi autorizada. Não copie o cofre inteiro nem anexos marcados como backup local. Revise os metadados das imagens antes de subir os arquivos.

`pnpm dev` mostra a edição web. Ela lê só `edicao/`. O comando `pnpm acervo:build` cria `dist-local/`. Nunca publique `dist-local/`.

## Publicar

Em Settings → Pages, selecione GitHub Actions como fonte. Rode o workflow **Publicar no GitHub Pages** na branch `main`. Ele só roda manualmente e exige pelo menos uma publicação aprovada. A validação detecta alguns campos de risco, mas não substitui revisão editorial e permissão de republicação.

O endereço padrão é `https://<conta>.github.io/BlaBlaGol/`. Nenhum domínio próprio é necessário.
