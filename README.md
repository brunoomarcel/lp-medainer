## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
3. Run the app:
   `npm run dev`

## Deploy Na Hostinger

Este projeto pode continuar como SPA, com uma única `index.html`.

Para funcionar em produção na Hostinger compartilhada, publique o conteúdo do `dist/` na raiz do site e mantenha a regra de rewrite em `public/.htaccess`, que faz rotas como `/formulario` e `/obrigado` caírem em `index.html`.
