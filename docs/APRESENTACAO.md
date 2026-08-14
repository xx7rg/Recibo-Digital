# x7rG Enterprise — Recibo Digital Interativo

Documentação de apresentação do projeto.

## Sobre o projeto

Uma experiência web que simula uma impressora térmica premium imprimindo um recibo de pagamento. O papel sai progressivamente do equipamento, a moldura de neon RGB acompanha o estado da impressão, efeitos sonoros reforçam a interação e o usuário pode cortar o recibo ou imprimi-lo novamente.

É uma aplicação 100% front-end (sem back-end ou banco de dados), pensada para rodar em qualquer navegador desktop ou mobile.

## Capturas de tela

**1. Estado inicial (idle)** — a impressora pronta, aguardando o clique em "Imprimir recibo".

![Estado inicial](screenshots/01-idle.png)

**2. Imprimindo** — o papel saindo progressivamente da impressora, com a moldura de neon animada.

![Imprimindo](screenshots/02-printing.png)

**3. Recibo pronto** — impressão concluída, com todos os itens, valores e o código de barras do recibo visíveis.

![Recibo pronto](screenshots/03-ready.png)

**4. Recibo cortado** — após a ação "Cortar papel", com opção de imprimir novamente.

![Recibo cortado](screenshots/04-torn.png)

## Funcionalidades

- Animação de impressão com saída progressiva do papel.
- Som mecânico durante a impressão e sinal sonoro (Web Audio API) ao concluir.
- Moldura de neon RGB que acompanha o estado da impressão.
- Indicador de status ("Pago aprobado") sincronizado com o fluxo.
- Ações para imprimir novamente e cortar o recibo.
- Número do recibo copiável para a área de transferência com um toque.
- Layout responsivo, com suporte a teclado e toque.
- Compatível com desktop, Android e navegadores do iPhone.

## Tecnologias utilizadas

| Camada | Tecnologia |
| --- | --- |
| UI | React 19 |
| Linguagem | TypeScript |
| Build / dev server | Vite 8 + [vinext](https://www.npmjs.com/package/vinext) (camada de compatibilidade com a API do Next.js sobre Vite) |
| Estilo | CSS puro, com animações aceleradas por GPU |
| Áudio | Web Audio API |
| Hospedagem / runtime | Cloudflare Workers (`@cloudflare/vite-plugin`, `wrangler`) |
| Qualidade de código | ESLint (`eslint-plugin-react`, `eslint-plugin-jsx-a11y`) |
| Testes | Node.js test runner (`node --test`) sobre o HTML renderizado no servidor |

## Estrutura do projeto

```text
app/
  globals.css    # visual, responsividade e animações
  layout.tsx     # metadados e estrutura global
  page.tsx       # recibo, impressora, sons e interações
worker/
  index.ts       # entrada do Cloudflare Worker (SSR + otimização de imagens)
public/
  x7rg-enterprise-emblem.png
  printer-print.wav
  og.png
docs/
  APRESENTACAO.md
  screenshots/
tests/
  rendered-html.test.mjs
```

## Como executar localmente

Requisitos: Node.js 22.13+ e npm.

```bash
git clone <URL_DO_REPOSITORIO>
cd x7rg-enterprise-recibo-digital
npm install
npm run dev
```

Abra o endereço exibido pelo terminal (por padrão, `http://localhost:3000`).

Outros comandos disponíveis:

```bash
npm run build    # gera e valida a versão de produção
npm run start    # executa a versão de produção
npm run lint     # verifica a qualidade do código
npm test         # builda e roda os testes automatizados
```

## Identidade e uso

A marca, o nome e a logo **x7rG Enterprise** pertencem aos seus respectivos titulares. Antes de reutilizar ou redistribuir esses elementos, confirme que você possui a autorização necessária.
