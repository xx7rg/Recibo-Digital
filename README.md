# x7rG Enterprise — Recibo Digital Interativo

Uma experiência web de impressão de recibo criada para a **x7rG Enterprise**. O projeto simula uma impressora térmica premium: o papel sai do equipamento, os controles acompanham seu movimento e efeitos de luz e som reforçam a interação.

![Recibo pronto](docs/screenshots/03-ready.png)

Documentação completa de apresentação, com mais capturas de tela e detalhes técnicos: [docs/APRESENTACAO.md](docs/APRESENTACAO.md).

## Destaques

- Impressão animada com saída progressiva do papel.
- Compatibilidade com desktop, Android e navegadores do iPhone.
- Som mecânico durante a impressão e sinal sonoro ao concluir.
- Neon RGB contornando a impressora.
- Indicadores verdes sincronizados com o estado da impressão.
- Ações para imprimir novamente e cortar o recibo.
- Recibo legível em espanhol, com valores e itens detalhados.
- Identidade visual oficial da x7rG Enterprise.
- Layout responsivo e suporte a teclado e toque.

## Tecnologias

- React 19
- TypeScript
- vinext e Vite
- CSS responsivo com animações aceleradas por GPU
- Web Audio API
- Cloudflare Workers

## Executar localmente

### Requisitos

- Node.js 22.13 ou superior
- npm

### Instalação

```bash
git clone URL_DO_SEU_REPOSITORIO
cd NOME_DO_REPOSITORIO
npm install
npm run dev
```

Abra no navegador o endereço exibido pelo terminal.

## Comandos disponíveis

```bash
npm run dev      # inicia o ambiente de desenvolvimento
npm run build    # gera e valida a versão de produção
npm run start    # executa a versão de produção
npm run lint     # verifica a qualidade do código
```

## Estrutura principal

```text
app/
  globals.css    # visual, responsividade e animações
  layout.tsx     # metadados e estrutura global
  page.tsx       # recibo, impressora, sons e interações
public/
  x7rg-enterprise-emblem.png
  printer-print.wav
  og.png
```

## Publicar no GitHub

1. Crie um repositório vazio no GitHub.
2. Extraia o arquivo ZIP deste projeto.
3. Abra o terminal dentro da pasta extraída.
4. Execute os comandos abaixo, substituindo a URL pela do seu repositório:

```bash
git init
git add .
git commit -m "Publica recibo digital da x7rG Enterprise"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## Personalização

Os textos, produtos e valores ficam em `app/page.tsx`. Cores, dimensões, posições e tempos das animações ficam em `app/globals.css`. Os arquivos de marca e áudio ficam em `public/`.

## Identidade e uso

A marca, o nome e a logo **x7rG Enterprise** pertencem aos seus respectivos titulares. Antes de reutilizar ou redistribuir esses elementos, confirme que você possui a autorização necessária.

---

Desenvolvido com atenção aos detalhes para a **x7rG Enterprise**.
