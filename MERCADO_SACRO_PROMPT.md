# PROMPT COMPLETO — MERCADO SACRO E-COMMERCE

---

Starte um projeto novo, um e-commerce católico de artigos religiosos voltado ao público geral — desde terços simples de R$10 até crucifixos artesanais de R$1.000+. O site deve funcionar como um marketplace robusto no estilo Mercado Livre / Amazon, mas com identidade visual católica refinada e acessível.

O nome da marca é: **MERCADO SACRO**.

---

## DOCUMENTO DE REFERÊNCIA: PLANO DE DESENVOLVIMENTO COMPLETO

---

### 1. VISÃO DO PROJETO

#### 1.1 Conceito
E-commerce católico generalista que vende artigos religiosos para TODOS os perfis de fiéis: desde estudantes comprando seu primeiro terço até famílias tradicionais buscando um crucifixo de parede. O site deve ser funcional, rápido, confiável e visualmente agradável — transmitindo fé e acessibilidade sem parecer amador. Pense em um "Mercado Livre Católico" com a organização da Amazon e a identidade visual de uma editora católica séria.

#### 1.2 Público-Alvo
- Católicos de todas as idades (18-65+) e classes sociais
- Desde compradores de impulso (terço de R$10, santinho, vela) até compradores de investimento (imagem sacra de R$800, missal de R$500)
- Pessoas buscando presentes para Batismo, Primeira Comunhão, Crisma, Casamento
- Catequistas, paróquias e grupos de oração comprando em quantidade
- Pessoas que valorizam praticidade, preço justo e entrega rápida
- Familiarizados com Mercado Livre, Shopee, Amazon

#### 1.3 Diferencial
Não é um site de luxo exclusivo. É um marketplace católico completo com:
- Ampla variedade de preços (R$5 a R$2.000+)
- Categorização inteligente por ocasião, faixa de preço, material
- Sistema de avaliações e reviews
- Filtros avançados (preço, material, cor, tamanho, ocasião)
- Frete calculado, cupons, promoções
- Visual católico sério mas acolhedor (não kitsch)

---

### 2. IDENTIDADE VISUAL E DESIGN SYSTEM

#### 2.1 Paleta de Cores

O visual deve ser limpo e confiável, com toques católicos sutis. Inspirado no sistema SACRA HERITAGE mas adaptado para ser mais acessível e comercial.

| Função | Nome | HEX | Uso |
|--------|------|-----|-----|
| **Background Primary** | Alabaster White | `#FAFAFA` | Fundo geral, listas, grids |
| **Background Secondary** | Warm Gray | `#F5F3F0` | Cards, seções alternadas, sidebar |
| **Background Tertiary** | Soft Linen | `#EDE9E3` | Hover states, inputs, chips |
| **Accent Primary** | Sacred Blue | `#2C5282` | CTAs principais, links, header, botão "Comprar" |
| **Accent Primary Hover** | Deep Blue | `#1A365D` | Hover do botão principal |
| **Accent Secondary** | Warm Gold | `#D4A843` | Badges premium, destaques, estrelas de avaliação |
| **Accent Tertiary** | Marian Blue | `#4A90D9` | Links secundários, ícones informativos |
| **Text Primary** | Dark Charcoal | `#1A1A2E` | Títulos, preços, nomes de produto |
| **Text Secondary** | Medium Gray | `#4A5568` | Descrições, body text |
| **Text Tertiary** | Light Gray | `#A0AEC0` | Captions, metadata, placeholder |
| **Success** | Holy Green | `#38A169` | Em estoque, confirmações, descontos |
| **Warning** | Amber | `#D69E2E` | Últimas unidades, atenção |
| **Error** | Cardinal Red | `#C53030` | Erros, fora de estoque |
| **Sale** | Liturgical Red | `#E53E3E` | Preço com desconto, badges de promoção |
| **Dark Header** | Navy Catholic | `#1A202C` | Header principal, footer |
| **White** | Pure White | `#FFFFFF` | Cards, modais, texto em fundo escuro |
| **Border** | Soft Border | `#E2E8F0` | Bordas de cards, divisores, inputs |

#### 2.2 Tipografia

Fontes mais neutras e legíveis para e-commerce funcional, com toque de personalidade nos títulos:

| Função | Fonte | Fallback | Peso | Uso |
|--------|-------|----------|------|-----|
| **Logo / Marca** | Cinzel | serif | 400, 700 | Logo "DOMUS FIDEI", headers institucionais |
| **Headings** | Merriweather | Georgia, serif | 400, 700, 900 | H1-H3, títulos de seção, nomes de produto |
| **Body / UI** | Inter | system-ui, sans-serif | 300, 400, 500, 600, 700 | Texto corrido, UI, botões, labels, filtros |
| **Preços** | Inter | system-ui, sans-serif | 600, 700, 800 | Preços, descontos, parcelamento |
| **Accent** | Cormorant Garamond | Times, serif | 400, 500 | Citações bíblicas, mensagens especiais |

#### 2.3 Espaçamento e Grid
- **Mobile**: 12-16px padding lateral, grid 2 colunas para produtos
- **Tablet**: 24px padding, grid 3 colunas
- **Desktop**: max-width 1280px, 32px padding, grid 4-5 colunas para produtos
- **Cards de produto**: border-radius 8px, shadow sutil, gap 12-16px
- **Seções**: 40-60px gap (mais compacto que sites de luxo, mais funcional)
- **Header**: Sticky, altura 56-64px, com barra de busca proeminente

#### 2.4 Estilo de Fotografia para Produtos

Todas as fotos de produto devem seguir este padrão:

**PROMPT BASE PARA FOTOS DE PRODUTO:**
```
Product photo on a clean white background (#FFFFFF). The [PRODUCT] is centered in the frame, occupying 70-80% of the image area. Soft, even studio lighting with minimal shadows. Sharp focus throughout the product. No props, no hands, no decorative elements — just the product on pure white. Shot straight-on or at a slight 15-degree angle. High resolution, e-commerce ready, suitable for product listing grid. Clean, professional, trustworthy appearance similar to Amazon product photography standards.
```

**Especificações de imagem:**
- Proporção principal: 1:1 (quadrado) para grid de produtos
- Resolução: 800x800px mínimo, 1200x1200px ideal
- Fundo: Branco puro (#FFFFFF) para consistência no grid
- Formato: WebP (primário) ou JPEG 85%
- Peso máximo: 150KB por imagem otimizada
- Variações: 3-5 fotos por produto (frente, lado, detalhe, escala, uso)

#### 2.5 Microinterações
- **Hover em cards**: Elevação sutil (shadow increase), escala 1.01
- **Adicionar ao carrinho**: Animação de ícone voando para o header + badge counter
- **Filtros**: Toggle com transição suave 200ms
- **Loading**: Skeleton placeholders (não spinners)
- **Toast notifications**: Slide-in from top para confirmações
- **Scroll to top**: Botão flutuante ao scrollar >500px
- **Image gallery**: Swipe + zoom pinch no mobile

---

### 3. ESTRUTURA DE PÁGINAS

#### 3.1 Homepage — Marketplace Style

**HEADER (Sticky em todas as páginas)**
- Barra superior fina: "Frete grátis acima de R$150" + "Parcele em até 12x"
- Logo "MERCADO SACRO" à esquerda (Cinzel, letras espaçadas)
- Barra de busca central proeminente (60% da largura em desktop)
- Ícones: conta/login, favoritos (coração), carrinho com badge
- Menu de categorias horizontal abaixo: Terços | Crucifixos | Bíblias | Imagens | Velas | Presentes | Promoções
- Mobile: hamburger + ícone busca + carrinho

**SEÇÃO 1: Banner Hero (Carousel/Slider)**
- Carousel com 3-5 banners rotativos (auto-play 5s)
- Promoções sazonais, lançamentos, campanhas litúrgicas
- CTA grande e claro: "Comprar Agora" ou "Ver Ofertas"
- Altura: 300px mobile, 400px desktop
- Indicadores de posição (dots) + setas de navegação

**SEÇÃO 2: Categorias em Destaque**
- Grid horizontal scrollável de ícones circulares com categorias
- Similar ao Mercado Livre (ícones redondos clicáveis)
- Ícones: Terços, Crucifixos, Bíblias, Imagens Sacras, Velas & Incenso, Medalhas, Escapulários, Paramentos, Presentes por Ocasião, Decoração Sacra
- Estilo: ícone + nome embaixo, clicável

**SEÇÃO 3: Ofertas do Dia / Mais Vendidos**
- Título: "Mais Vendidos" ou "Ofertas da Semana"
- Carousel horizontal de ProductCards (4-5 visíveis desktop, 2 mobile)
- Cada card: imagem quadrada, nome (2 linhas max), preço original riscado, preço atual em destaque, badge de desconto (%), estrelas de avaliação, botão "Comprar"
- Timer de contagem regressiva para ofertas (opcional)

**SEÇÃO 4: Categorias com Produtos**
- Para cada categoria principal, uma faixa com:
  - Título: "Terços" + link "Ver todos →"
  - 4-5 produtos em carousel
- Repetir para 3-4 categorias principais

**SEÇÃO 5: Banner Secundário**
- Banner horizontal: "Presentes para Primeira Comunhão" ou "Coleção de Quaresma"
- Imagem + texto + CTA
- Menos destaque que o hero, mais contextual

**SEÇÃO 6: Produtos Recomendados**
- Título: "Você também pode gostar"
- Grid 2x2 mobile, 4 colunas desktop
- Baseado em popularidade (inicialmente aleatório)

**SEÇÃO 7: Confiança e Benefícios**
- Faixa horizontal com 4 ícones:
  - 🚚 Frete grátis acima de R$150
  - 🔒 Compra 100% segura
  - 🔄 Troca e devolução em 30 dias
  - 💳 Até 12x sem juros
- Background #F5F3F0, estilo clean

**SEÇÃO 8: Newsletter**
- Fundo Sacred Blue (#2C5282)
- Título: "Receba novidades e ofertas exclusivas"
- Input de email + botão "Inscrever"
- Texto: "Promoções, novos produtos e devocionais toda semana."

**FOOTER**
- Background #1A202C (Navy Catholic)
- Logo MERCADO SACRO
- Colunas: Categorias | Minha Conta | Atendimento | Institucional
- Formas de pagamento (ícones: Visa, Master, Pix, Boleto)
- Selos de segurança
- Redes sociais
- Copyright + "Deus seja louvado."

#### 3.2 Página de Categoria / Listagem (PLP)
- **Referência**: Mercado Livre / Amazon category pages
- Breadcrumb: Home > Terços
- Título da categoria + contagem de resultados ("128 produtos encontrados")
- **Sidebar de filtros** (desktop) / **Bottom sheet de filtros** (mobile):
  - Faixa de preço (slider de range)
  - Material (checkboxes: ouro, prata, madeira, resina, etc.)
  - Cor (swatches visuais)
  - Avaliação mínima (estrelas clicáveis)
  - Disponibilidade (em estoque / todos)
  - Ocasião (Batismo, Comunhão, Casamento, etc.)
  - Ordenar por: Relevância, Menor preço, Maior preço, Mais vendidos, Mais recentes, Melhor avaliados
- **Grid de produtos**: 2 col mobile, 3 tablet, 4-5 desktop
- **ProductCard padrão**:
  - Imagem quadrada 1:1
  - Badge (se aplicável): "NOVO", "-30%", "FRETE GRÁTIS"
  - Nome do produto (max 2 linhas, truncado)
  - Estrelas de avaliação + número de reviews "(47)"
  - Preço atual em negrito grande
  - Preço antigo riscado (se em promoção)
  - "em até 6x de R$XX,XX"
  - Botão: "Adicionar ao carrinho" ou ícone de carrinho
  - Ícone de coração (favoritar)
- **Paginação**: Numbered pages + "Carregar mais" (hybrid)

#### 3.3 Página de Produto (PDP)
- **Referência**: Amazon PDP + Mercado Livre PDP
- **NÃO é estilo Apple** (diferente do SACRA HERITAGE). É funcional e informativo.
- Layout: 2 colunas em desktop (imagens à esquerda, info à direita)
- **Coluna Esquerda (Imagens)**:
  - Imagem principal grande (zoom on hover desktop, pinch-zoom mobile)
  - Thumbnails abaixo ou ao lado (3-5 imagens)
  - Gallery lightbox ao clicar
- **Coluna Direita (Informações)**:
  - Breadcrumb
  - Nome completo do produto (H1, Merriweather)
  - Estrelas de avaliação + link "Ver X avaliações"
  - Preço grande: "R$ XX,XX"
  - Parcelamento: "ou 12x de R$ X,XX sem juros"
  - Pix: "R$ XX,XX no Pix (5% off)" com badge verde
  - Variações: cor, tamanho (selects ou swatches)
  - Quantidade (input numérico +/-)
  - Botão primário: "COMPRAR AGORA" (Sacred Blue, grande)
  - Botão secundário: "Adicionar ao Carrinho" (outline)
  - Estimativa de frete: input de CEP + "Calcular"
  - Trust badges inline: "Compra segura" | "Produto original" | "Devolução grátis"
- **Abaixo das 2 colunas**:
  - Tabs ou accordion: Descrição | Especificações | Avaliações
  - Descrição: texto rico com a história/detalhes do produto
  - Especificações: tabela de specs (Material, Dimensões, Peso, Cor, etc.)
  - Avaliações: lista de reviews com estrelas, nome, data, texto, fotos dos clientes
- **Seção final**: "Produtos Relacionados" — carousel de 4-6 produtos

#### 3.4 Carrinho / Sacola
- Página dedicada (/carrinho) + slide-in drawer no mobile
- Lista de itens: imagem, nome, preço unitário, quantidade (editável), subtotal
- Botão remover por item
- Input de cupom de desconto
- Resumo: Subtotal, Frete (calculado por CEP), Desconto, Total
- CTA: "Finalizar Compra" (Sacred Blue, grande)
- "Continuar Comprando" link secundário

#### 3.5 Checkout (Multi-step)
- Step 1: Identificação (login / cadastro / continuar como visitante)
- Step 2: Endereço de entrega (formulário com ViaCEP para autocompletar)
- Step 3: Frete (opções: PAC, SEDEX, retirada)
- Step 4: Pagamento (Pix, Cartão de crédito, Boleto)
- Step 5: Confirmação (resumo do pedido + botão "Confirmar Pedido")
- Progress bar no topo mostrando o step atual

#### 3.6 Outras Páginas
- **Minha Conta**: Dashboard com pedidos, endereços, dados, favoritos
- **Busca**: Página de resultados com filtros (similar ao PLP)
- **Sobre / Quem Somos**: Storytelling simples e acessível
- **Contato**: Formulário + WhatsApp + email
- **FAQ**: Accordion com perguntas frequentes
- **Políticas**: Trocas, Privacidade, Termos de Uso

---

### 4. TOM DE VOZ E COPYWRITING

#### 4.1 Diretrizes

| Atributo | Como se manifesta |
|----------|-------------------|
| **Acolhedor** | Como uma paróquia amigável — todo mundo é bem-vindo |
| **Claro** | Informação direta, preços transparentes, sem rodeios |
| **Confiável** | Transmite segurança na compra, profissionalismo |
| **Católico com naturalidade** | Referências à fé integradas organicamente, sem ser preachy |
| **Acessível** | Linguagem que fala com todos, do jovem universitário à avó |

**Tom**: Profissional-amigável. Como um bom vendedor de artigos religiosos que conhece os produtos e se importa com o cliente.

**Exemplos de copy**:
- Header: "Frete grátis acima de R$150 para todo o Brasil"
- Hero: "Tudo para sua fé, num só lugar."
- Categoria: "Terços — Do simples ao precioso, encontre o seu."
- CTA: "Comprar agora" / "Adicionar ao carrinho" / "Ver mais"
- Confiança: "Compra segura. Entrega cuidadosa. Satisfação garantida."
- Newsletter: "Receba ofertas e inspirações para sua vida de fé."
- Footer: "Deus seja louvado."

---

### 5. STACK TECNOLÓGICO

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Framework** | Next.js 16 (App Router) | SSR/SSG, performance, SEO |
| **Linguagem** | TypeScript | Type safety |
| **Estilização** | Tailwind CSS 4 | Utility-first, responsivo rápido |
| **Animações** | Framer Motion | Transições suaves, micro-animações |
| **Fontes** | Google Fonts (next/font) | Merriweather + Inter + Cinzel |
| **Ícones** | Lucide React | Consistência |
| **Imagens** | next/image | Otimização automática |
| **Estado** | Context API + useReducer | Carrinho, favoritos, filtros |
| **Busca** | SearchParams + local filter | Inicial; Algolia no futuro |
| **Deploy** | Vercel | Edge, preview deploys |

### 5.1 Estrutura de Pastas
```
mercado-sacro/
├── public/
│   ├── img/
│   │   ├── products/          # Fotos de produtos (quadradas, fundo branco)
│   │   ├── categories/        # Ícones/imagens de categorias
│   │   ├── banners/           # Banners hero e promocionais
│   │   └── brand/             # Logo, favicon, og-image
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fontes, metadata, header, footer)
│   │   ├── page.tsx           # Homepage (marketplace style)
│   │   ├── globals.css        # Design tokens como CSS custom properties
│   │   ├── busca/
│   │   │   └── page.tsx       # Resultados de busca
│   │   ├── categoria/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # PLP (Product Listing Page)
│   │   ├── produto/
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # PDP (Product Detail Page)
│   │   ├── carrinho/
│   │   │   └── page.tsx       # Carrinho de compras
│   │   ├── checkout/
│   │   │   └── page.tsx       # Checkout multi-step
│   │   ├── conta/
│   │   │   └── page.tsx       # Área do cliente
│   │   ├── sobre/
│   │   │   └── page.tsx
│   │   ├── contato/
│   │   │   └── page.tsx
│   │   └── faq/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                # Button, Input, Badge, Select, Modal, Toast, Skeleton
│   │   ├── layout/            # Header, Footer, MobileMenu, SearchBar, Breadcrumb
│   │   ├── home/              # HeroBanner, CategoryIcons, ProductCarousel, BenefitsBar, Newsletter
│   │   ├── product/           # ProductCard, ProductGallery, ProductInfo, ReviewCard, RelatedProducts
│   │   ├── catalog/           # FilterSidebar, SortDropdown, ProductGrid, Pagination, PriceRange
│   │   └── cart/              # CartItem, CartSummary, CartDrawer, CouponInput
│   ├── contexts/
│   │   ├── CartContext.tsx     # Carrinho global
│   │   └── FavoritesContext.tsx
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useFavorites.ts
│   │   ├── useFilters.ts
│   │   └── useSearch.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── utils.ts           # cn(), formatPrice(), calculateDiscount(), etc.
│   │   └── animations.ts
│   ├── data/
│   │   ├── products.ts        # 20+ produtos mockados (range de R$10 a R$2000)
│   │   ├── categories.ts      # 10 categorias
│   │   ├── banners.ts         # Dados dos banners hero
│   │   └── reviews.ts         # Reviews mockadas
│   └── types/
│       ├── product.ts
│       ├── category.ts
│       ├── cart.ts
│       └── review.ts
├── next.config.ts
├── tsconfig.json
├── package.json
├── DEVELOPMENT_PLAN.md
└── README.md
```

---

### 6. DADOS MOCKADOS — PRODUTOS INICIAIS

Criar pelo menos 20 produtos distribuídos assim:

**Faixa Popular (R$10-R$80)** — 8 produtos:
- Terço básico em madeira (R$12)
- Terço de São Bento em acrílico (R$18)
- Medalha Miracolosa banhada a ouro (R$25)
- Escapulário de Nossa Senhora do Carmo (R$15)
- Vela votiva de 7 dias (R$9)
- Kit santinhos (10 unidades sortidas) (R$8)
- Água benta — frasco 100ml (R$12)
- Incenso litúrgico — caixa com 20 (R$22)

**Faixa Intermediária (R$80-R$300)** — 7 produtos:
- Terço em prata 925 com madrepérola (R$189)
- Bíblia Ave Maria capa luxo (R$120)
- Crucifixo de parede em madeira de lei 30cm (R$250)
- Imagem de Santo Antônio em gesso pintado 30cm (R$95)
- Kit Primeira Comunhão (terço + bíblia + vela) (R$145)
- Missal dos Fiéis em couro sintético (R$85)
- Conjunto de velas litúrgicas decorativas (R$70)

**Faixa Premium (R$300-R$2000)** — 5 produtos:
- Terço em ouro 18k com ametistas (R$1.890)
- Crucifixo artesanal em nogueira 50cm (R$780)
- Bíblia de Estudos Edição Catedral em couro (R$590)
- Imagem de Nossa Senhora de Fátima 45cm pintada à mão (R$450)
- Cálice litúrgico em prata 925 (R$1.200)

Cada produto deve ter: id, slug, name, shortName, description, longDescription, price, originalPrice (para promoções), discount (%), category, categorySlug, images (array de 3-5 paths), badge ("novo"/"promoção"/"mais vendido"/"frete grátis"), specs (array), materials, dimensions, weight, inStock, stockQuantity, rating (1-5), reviewCount, featured.

---

### 7. FASES DE DESENVOLVIMENTO

#### FASE 1 — Fundação e Homepage
- [ ] Inicializar Next.js 16 + TypeScript + Tailwind 4
- [ ] Configurar design tokens (cores, tipografia) no globals.css
- [ ] Criar componentes base: Button, Input, Badge, Select, Modal, Toast, Skeleton
- [ ] Criar layout: Header (com SearchBar), Footer, MobileMenu, Breadcrumb
- [ ] Implementar Homepage completa (hero carousel, categorias, produtos, benefícios, newsletter)
- [ ] Dados mockados (20+ produtos, 10 categorias, banners, reviews)

#### FASE 2 — Catálogo e Produto
- [ ] PLP com grid de produtos + sidebar de filtros + ordenação
- [ ] Sistema de filtros: preço (range slider), material, cor, avaliação, disponibilidade
- [ ] PDP com gallery, info completa, tabs, reviews, relacionados
- [ ] Busca com resultados filtráveis
- [ ] Paginação hybrid (numbered + load more)

#### FASE 3 — Carrinho e Funcionalidades
- [ ] CartContext com useReducer (add, remove, update quantity, clear)
- [ ] Página de carrinho (/carrinho) com edição, cupom, resumo
- [ ] CartDrawer (slide-in mobile)
- [ ] Sistema de favoritos (FavoritesContext)
- [ ] Cálculo de frete por CEP (mockado)

#### FASE 4 — Checkout e Conta
- [ ] Checkout multi-step (identificação → endereço → frete → pagamento → confirmação)
- [ ] Área do cliente (/conta): pedidos, endereços, dados pessoais
- [ ] Páginas institucionais: Sobre, Contato, FAQ, Políticas

#### FASE 5 — SEO e Performance
- [ ] Metadata dinâmica por página (title, description, og:image)
- [ ] JSON-LD structured data (Product, BreadcrumbList, Organization)
- [ ] Sitemap.xml dinâmico
- [ ] Lighthouse audit (target: 90+ em todas as métricas)
- [ ] Acessibilidade WCAG AA
- [ ] PWA basic (manifest.json)

#### FASE 6 — Backend (Futuro)
- [ ] CMS headless (Sanity ou Strapi) para gestão de produtos
- [ ] Gateway de pagamento (Mercado Pago / Stripe)
- [ ] Autenticação (NextAuth.js)
- [ ] API de busca (Algolia)
- [ ] Sistema de avaliações real
- [ ] Painel admin

---

### 8. PADRÕES DE CÓDIGO

- TypeScript strict mode
- Componentes: "use client" apenas quando necessário (interatividade)
- Props tipadas com interface nomeada
- Export default para componentes de página
- Tailwind para 95% dos estilos, CSS custom properties para tokens
- Mobile-first: classes base = mobile, md: e lg: para breakpoints
- next/image SEMPRE para imagens
- Skeleton loading (não spinners)
- cn() utility para classes condicionais (clsx + tailwind-merge)

---

### 9. DECISÕES DE DESIGN

1. **Header com busca proeminente** — Como Amazon/ML, a busca é o centro da navegação
2. **Hero com carousel** — Diferente do SACRA (single image), aqui temos múltiplos banners promocionais
3. **Cards de produto compactos** — Informação densa: foto, nome, preço, avaliação, badge — tudo visível
4. **Preço sempre visível e destacado** — Preço é informação #1, em negrito grande
5. **Filtros robustos** — Range de preço, material, cor, avaliação — essencial para marketplace
6. **Sistema de avaliações** — Estrelas + reviews = confiança para o comprador
7. **Frete e parcelamento visíveis** — "12x sem juros" e "Frete grátis acima de R$150" sempre presentes
8. **Cor Sacred Blue para CTAs** — Azul transmite confiança (como ML e PayPal), dourado apenas para destaques
9. **Sem popup de newsletter** — Integrado organicamente na homepage e footer
10. **Responsive-first** — 70%+ do tráfego será mobile

---

## INSTRUÇÕES DE EXECUÇÃO

Implemente a **FASE 1 completa**. Comece inicializando o projeto, configurando o design system, e construindo a homepage completa com todos os componentes e dados mockados. Siga fielmente as diretrizes de cores, tipografia, e estrutura descritas acima.

Crie o arquivo `DEVELOPMENT_PLAN.md` na raiz do projeto com todo este conteúdo para referência futura.
