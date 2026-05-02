# Google Apps Script para Leads

Este script recebe os dados do formulário da landing e grava uma linha na aba `Leads` da planilha.

## Como usar

1. Crie ou abra a planilha que vai receber os leads.
2. Vá em `Extensões > Apps Script`.
3. Apague o conteúdo padrão do editor.
4. Cole o conteúdo de [medainer-leads.gs](./medainer-leads.gs).
5. Salve o projeto.
6. Clique em `Implantar > Nova implantação`.
7. Em tipo, escolha `Aplicativo da Web`.
8. Em acesso, selecione `Qualquer pessoa`.
9. Publique e autorize.
10. Copie a URL final que termina com `/exec`.

## Onde colar a URL

Substitua esta constante em [src/components/LeadFlow.tsx](../src/components/LeadFlow.tsx):

```ts
const LEAD_FORM_WEBHOOK_URL = 'https://script.google.com/macros/s/your-web-app-id/exec';
```

Pela URL real que o Google gerar, por exemplo:

```ts
const LEAD_FORM_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec';
```

## Colunas salvas

O script grava automaticamente estas colunas:

- `submittedAt`
- `name`
- `phone`
- `email`
- `clinicType`
- `professionalCount`
- `role`
- `source`
- `ctaLabel`
- `targetHref`
- `experience`
- `pagePath`
- `pageUrl`
- `pageTitle`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `fbclid`
- `gclid`
- `gad_source`
- `gbraid`
- `msclkid`
- `wbraid`
- `userAgent`
