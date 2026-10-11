# CLAUDE.md

Site institucional da **CTechsmart Solutions** — empresa de SaaS para clínicas e laboratórios com **duas soluções**: **Chatbot de atendimento** e **Fast-Lab** (agendamento online + gestão, com foco em aumentar o faturamento). O objetivo principal do site é **gerar demonstrações agendadas** a partir de **tráfego orgânico (SEO)**.

**Produtos (definido pelo usuário):** só existem essas duas soluções. Não existe uma "Plataforma de gestão" separada — a gestão faz parte do Fast-Lab. O mockup ainda mostra 3 produtos; nesse ponto ele está desatualizado.

Idioma do site: **português do Brasil** (`lang="pt-BR"`). Responda ao usuário em português.

## Fontes de verdade

| Arquivo | O que contém |
|---|---|
| `Docs/CTechsmart-Manual-de-Marca.docx` | Manual de marca: logo, cores, tipografia, regras de uso |
| `Docs/Website — SPA institucional-html/Website.dc.html` | Mockup de referência do layout (valores de design nos `style="…"` inline) |
| `Docs/fast-lab/` | Logos do produto Fast-Lab (horizontal, símbolo, negativa, monocromática; SVG e PNG) |

O mockup é **referência visual, não código de produção**. Replicar cores, tamanhos, espaçamentos, raios e layout em componentes próprios; não copiar o markup, `support.js` nem `vendor/`.

## Stack (decidida com o usuário)

- **Astro 7** com saída estática (SSG, `build.format: 'file'`, URLs sem barra final): HTML pronto no build, zero JS por padrão. Apesar do nome "SPA" no mockup, **não** renderizar o conteúdo só no cliente.
- CSS puro com variáveis (`src/styles/global.css`) + `<style>` com escopo em cada componente; JS só no menu mobile e no formulário.
- Fonte Sora auto-hospedada via `@fontsource/sora` (400/600/700, subset latin).
- `@astrojs/sitemap` para sitemap; imagens futuras via `astro:assets` (WebP/AVIF, `width`/`height` explícitos).

## Comandos

```bash
npm run dev          # servidor local em http://localhost:4321
npm run build        # gera o site estático em dist/
npm run preview      # serve o dist/
npm run check        # checagem de tipos (astro check)
npm run seo:audit    # após o build: title/description/h1/canonical/JSON-LD de cada página
npm run assets       # regenera favicon, ícones, logo.png e og-image.png em public/
```

Antes de concluir qualquer mudança: `npm run check && npm run build && npm run seo:audit` sem erros.

## Estrutura do código

- `src/data/site.ts` — nome, contatos, CNPJ, `sameAs`, `formEndpoint`, navegação, passos e diferenciais. Campos `null` = ainda não informados.
- `src/data/solutions.ts` / `src/data/audiences.ts` — **todo o conteúdo** das páginas de solução e de público (textos, SEO, FAQ). Editar texto aqui, não nos templates.
- `src/layouts/BaseLayout.astro` — `<head>` completo (title com sufixo " | CTechsmart", description, canonical, OG/Twitter, favicons, JSON-LD `Organization` + `BreadcrumbList`).
- `src/lib/jsonld.ts` — geradores de `FAQPage` e `Service`.
- `src/pages/solucoes/[slug].astro` — template das páginas de solução (uma por item de `solutions.ts`); `src/components/AudiencePage.astro` — template de /para-clinicas e /para-laboratorios.
- `scripts/generate-brand-assets.mjs` — desenha os PNGs da marca com a Sora convertida em vetores.

## Pendências

- Domínio: `https://ctechsmartsolutions.com` (sem www) em `astro.config.mjs` e `public/robots.txt`. Na hospedagem, redirecionar `www.` → domínio sem www (301) e forçar HTTPS.
- WhatsApp, e-mail, CNPJ e redes sociais: preencher em `src/data/site.ts` (o site já mostra/omite automaticamente).
- Formulário: definir serviço de recebimento e preencher `formEndpoint` (hoje mostra "Formulário ainda não configurado").
- Política de privacidade: texto-modelo; precisa de revisão jurídica.

## Requisitos de SEO (obrigatórios)

**Por página**
- Um único `<h1>`; hierarquia `h2` → `h3` sem pular níveis.
- `<title>` único (≤ 60 caracteres) e `<meta name="description">` (≤ 155 caracteres), com palavra-chave principal no início.
- `<link rel="canonical">` absoluto; URLs em minúsculas, sem acento, com hífen (`/chatbot-para-clinicas`).
- Open Graph (`og:title`, `og:description`, `og:image` 1200×630, `og:locale=pt_BR`) e Twitter Card.
- HTML semântico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Todo `<img>` com `alt` descritivo (ou `alt=""` se decorativa); SVGs decorativos com `aria-hidden="true"`.

**Dados estruturados (JSON-LD)**
- `Organization` (nome, logo, contatos, `sameAs` das redes) em todas as páginas.
- `WebSite` na home; `SoftwareApplication`/`Service` nas páginas de produto; `FAQPage` onde houver FAQ; `BreadcrumbList` em páginas internas.
- Validar no Rich Results Test do Google.

**Técnico**
- `robots.txt`, `sitemap.xml`, favicon (16/32/64 px — versão simplificada do símbolo) e `site.webmanifest`.
- Página 404 personalizada.
- Metas: Lighthouse ≥ 95 em Performance, SEO, Acessibilidade e Boas práticas; LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- Fonte Sora auto-hospedada ou com `preconnect` + `display=swap`; preload só do peso usado no h1.
- Sem conteúdo importante escondido atrás de JS, abas ou carrosséis.

**Conteúdo e palavras-chave**
- Público: clínicas (uma ou várias especialidades) e laboratórios de análises clínicas/postos de coleta.
- Termos-alvo de exemplo: "chatbot para clínicas", "chatbot WhatsApp para laboratório", "agendamento online para clínicas", "sistema de gestão para clínicas", "agendamento de coleta laboratório". "Fast-Lab" é marca sem volume de busca: sempre acompanhar das palavras-chave (agendamento, gestão) em title/h1, "software para laboratório de análises clínicas".
- Para escalar o SEO, preferir páginas dedicadas por solução e por público (além da home), cada uma com intenção de busca própria, em vez de tudo numa página só com âncoras. Links internos entre elas.
- Textos claros e diretos, sem jargão técnico; foco no benefício (reduzir faltas, liberar a recepção, atender fora do horário).

## Mapa do site

Decidido com o usuário: páginas dedicadas por solução e por público, além da home.

| URL | Intenção de busca principal |
|---|---|
| `/` | Software para clínicas e laboratórios (visão geral, segue o mockup) |
| `/solucoes/chatbot-de-atendimento` | Chatbot WhatsApp para clínicas e laboratórios |
| `/solucoes/fast-lab` | Agendamento online e sistema de gestão para clínicas e laboratórios (Fast-Lab) |
| `/para-clinicas` | Software para clínicas e consultórios |
| `/para-laboratorios` | Software para laboratório de análises clínicas |
| `/contato` | Agendar demonstração |
| `/politica-de-privacidade` | Página legal (LGPD); `noindex` opcional |
| `/404` | Página não encontrada |

- As páginas internas reutilizam os mesmos componentes da home (header, cards, passos, diferenciais, bloco de contato, footer).
- Cada página interna tem: h1 com a palavra-chave, benefícios, como funciona, FAQ (com `FAQPage`), CTA para demonstração e links para as outras soluções/públicos.
- A nav do header aponta para as seções da home (`/#solucoes` etc.) ou para as páginas dedicadas; o footer lista todas as páginas.

## Estrutura da home (seguir o mockup)

1. **Header** sticky, fundo branco, borda `#E3E9ED`: logo + nav (Soluções, Para quem, Como funciona, Contato) + botão "Agendar demonstração".
2. **Hero** (`#inicio`, fundo Névoa): eyebrow "SOFTWARE PARA CLÍNICAS E LABORATÓRIOS", h1 "Atendimento, agenda e gestão conectados em uma só plataforma.", dois CTAs.
3. **Soluções** (`#solucoes`): 2 cards — Chatbot de atendimento e Fast-Lab (o mockup mostra 3; ver "Produtos" acima).
4. **Para quem** (`#para-quem`, fundo Névoa): card Clínicas (branco) e card Laboratórios (Azul-marinho, check em Ciano).
5. **Como funciona** (`#como-funciona`): 3 passos numerados (01–03) + 4 diferenciais (nuvem, assinatura mensal, suporte, LGPD).
6. **Contato** (`#contato`, fundo Azul-marinho): texto + WhatsApp/e-mail + formulário (nome, empresa, WhatsApp, e-mail, interesse).
7. **Footer** (`#08182A`): logo em negativo, links, © e CNPJ.

Placeholders pendentes no mockup: `[SEU NÚMERO]`, `[SEU E-MAIL]`, `[00.000.000/0000-00]`. Não inventar esses dados — perguntar ao usuário.

## Design tokens

**Cores** (proporção ~60% neutros, 30% Azul-marinho, 10% Azul-petróleo/Ciano)

| Token | HEX | Uso |
|---|---|---|
| Azul-marinho | `#0B1F33` | Texto principal, fundos escuros |
| Azul-petróleo | `#0E7490` | Destaque em fundo claro: botões, links, eyebrows, "smart" |
| Ciano | `#67E8F9` | Destaque **somente sobre fundo escuro** |
| Névoa | `#F3F8F9` | Fundos de seção claros |
| Ardósia | `#4A5B6B` | Texto de apoio, "SOLUTIONS" |
| Cinza-claro | `#B6C3CF` | Texto de apoio sobre fundo escuro |
| Branco | `#FFFFFF` | Fundos, logo em negativo |
| (mockup) | `#08182A` | Fundo do footer |
| (mockup) | `#E3E9ED` | Bordas de cards/header |
| (mockup) | `#C9D5DE` | Bordas de inputs e botão secundário |
| (mockup) | `#E6F2F5` | Fundo dos ícones dos cards |

**Tipografia**: Sora (400, 600, 700); fallback `system-ui, Segoe UI, Helvetica, Arial, sans-serif`. `line-height: 1.5`.
- h1 52px/1.1, `letter-spacing: -0.03em`, 700
- h2 38px/1.15, `-0.02em`
- h3 21–26px
- Eyebrow 13px, 600, `letter-spacing: 0.2em`, caixa alta, Azul-petróleo (Ciano no escuro)
- Corpo 15–19px

**Layout**: container `max-width: 1200px`, padding lateral 24px; seções com 96px vertical (hero 88/96). Gaps 24–56px.
**Raios**: botões/inputs 10–12px, cards 18px, formulário 20px, diferenciais 14px.
**Botões**: primário `#0E7490` texto branco 600, padding 16×28; secundário branco com borda `#C9D5DE`.

## Regras de marca

- Logo = símbolo (C de nós conectados; 3 nós à direita em Azul-petróleo/Ciano) + "**CTech**" (700) "smart" (400, cor de destaque) + "SOLUTIONS" (600, `letter-spacing: 0.42em`, Ardósia). O SVG do símbolo está no mockup — reutilizá-lo como componente.
- Fundo claro: traços Azul-marinho, nós Azul-petróleo. Fundo escuro: traços brancos, nós Ciano.
- Tamanho mínimo: logo horizontal 120px de largura; abaixo disso, só o símbolo (mín. 16px).
- Área de proteção ao redor do logo = altura do "C".
- **Não**: esticar/girar, trocar cores, usar Ciano em fundo claro (inclusive em texto), aplicar sombra/contorno/brilho/degradê, colocar sobre fotos sem contraste.

**Fast-Lab (marca de produto)**
- Identidade própria, em verde-petróleo (`#12A594` → `#0B7C72`). Usar **só** em contexto do Fast-Lab (card, página do produto), nunca no lugar da marca CTechsmart.
- Arquivos usados no site: `src/assets/fast-lab/simbolo.svg` (ícone do card, 52px) e `src/assets/fast-lab/logo-horizontal.png` (recortada da original; topo da página, 240px, otimizada pelo `astro:assets`). `public/fast-lab-simbolo.png` é usada no JSON-LD `Service.logo`.
- Não usar `logo-fastlab-horizontal.svg` no site: o texto é `<text>` com Arial e muda conforme as fontes do aparelho. Usar a PNG.
- Para fundos escuros: `logo-fastlab-negativa`; impressão em uma cor: `logo-fastlab-monocromatica`.

## Acessibilidade

- Contraste WCAG AA; foco visível em links, botões e inputs.
- Todo input com `<label for>`; formulário com validação e mensagens acessíveis.
- `aria-label` nos `<nav>` (Principal / Rodapé); `scroll-behavior: smooth` respeitando `prefers-reduced-motion`.

## LGPD

- Formulário com aviso de consentimento (texto do mockup) e link para a Política de Privacidade (criar a página `/politica-de-privacidade`).
- Banner de cookies apenas se houver scripts de analytics/marketing; carregar esses scripts só após consentimento.
