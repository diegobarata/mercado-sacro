# MERCADO SACRO — Plano de Desenvolvimento

---

## Status Atual: FASE 2 CONCLUÍDA ✅

---

## VISÃO DO PROJETO

E-commerce católico generalista estilo Mercado Livre/Amazon, com identidade visual católica refinada e acessível. O nome da marca é **MERCADO SACRO**.

### Público-Alvo
- Católicos de todas as idades (18-65+) e classes sociais
- Compradores de impulso (terço de R$10) até compradores de investimento (imagem sacra de R$800+)
- Presentes para Batismo, Primeira Comunhão, Crisma, Casamento
- Catequistas, paróquias e grupos de oração

### Diferencial
- Ampla variedade de preços (R$5 a R$2.000+)
- Categorização inteligente por ocasião, preço, material
- Sistema de avaliações e reviews
- Filtros avançados
- Visual católico sério mas acolhedor

---

## STACK TECNOLÓGICO

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS 4 |
| Animações | Framer Motion |
| Fontes | Google Fonts (Merriweather + Inter + Cinzel + Cormorant Garamond) |
| Ícones | Lucide React |
| Imagens | next/image |
| Estado | Context API + useReducer |
| Deploy | Vercel |

---

## FASES DE DESENVOLVIMENTO

### FASE 1 — Fundação e Homepage ✅
- [x] Inicializar Next.js 16 + TypeScript + Tailwind 4
- [x] Configurar design tokens (cores, tipografia) no globals.css
- [x] Criar componentes base: Button, Input, Badge, Modal, Toast, Skeleton, StarRating
- [x] Criar layout: Header (com SearchBar), Footer, MobileMenu, Breadcrumb, ScrollToTop
- [x] Implementar Homepage completa (hero carousel, categorias, produtos, benefícios, newsletter)
- [x] Dados mockados (20 produtos, 10 categorias, 4 banners, 12 reviews)
- [x] Contexts: CartContext + FavoritesContext

### FASE 2 — Catálogo e Produto ✅
- [x] PLP `/categoria/[slug]` com grid responsivo (2 col mobile → 4 col desktop)
- [x] Sidebar de filtros (desktop) + bottom sheet animado (mobile)
- [x] Filtros: faixa de preço (dual range slider), material (checkboxes), avaliação mínima, disponibilidade
- [x] Ordenação: Relevância, Menor/Maior preço, Mais vendidos, Mais recentes, Melhor avaliados
- [x] PDP `/produto/[slug]` com gallery + lightbox + zoom
- [x] ProductInfo: preço, parcelamento, Pix, quantidade, variações, CEP, trust badges
- [x] ProductTabs: Descrição, Especificações (tabela), Avaliações (stars + reviews verificados)
- [x] RelatedProducts carousel horizontal
- [x] Busca `/busca?q=` com resultados filtráveis e normalização de acentos
- [x] Paginação híbrida: numbered pages + "Carregar mais"

**Componentes criados:**
- `src/components/catalog/`: FilterSidebar, MobileFilterSheet, PriceRange, SortDropdown, Pagination
- `src/components/product/`: ProductGallery, ProductInfo, ProductTabs, RelatedProducts
- `src/app/categoria/[slug]/page.tsx`, `src/app/produto/[slug]/page.tsx`, `src/app/busca/page.tsx`

### FASE 3 — Carrinho e Funcionalidades ⬜ (próxima)
- [ ] Página de carrinho `/carrinho` com edição de quantidade, remoção, input de cupom, resumo
- [ ] CartDrawer slide-in (mobile) animado com Framer Motion
- [ ] Página de favoritos `/favoritos` com grid de produtos salvos
- [ ] Cálculo de frete por CEP mockado (integração ViaCEP visual)
- [ ] Toast notifications ao adicionar ao carrinho / favoritos

### FASE 4 — Checkout e Conta
- [ ] Checkout multi-step `/checkout`: identificação → endereço → frete → pagamento → confirmação
- [ ] Progress bar de steps no topo
- [ ] Formulário com autocompletar por CEP (ViaCEP)
- [ ] Área do cliente `/conta`: pedidos, endereços, dados pessoais, favoritos
- [ ] Páginas institucionais: `/sobre`, `/contato`, `/faq`, `/politicas`

### FASE 5 — SEO e Performance
- [ ] Metadata dinâmica por página (title, description, og:image)
- [ ] JSON-LD structured data (Product, BreadcrumbList, Organization)
- [ ] Sitemap.xml dinâmico
- [ ] Lighthouse audit (target: 90+ em todas as métricas)
- [ ] Acessibilidade WCAG AA
- [ ] PWA basic (manifest.json)

### FASE 6 — Backend (Futuro)
- [ ] CMS headless (Sanity ou Strapi)
- [ ] Gateway de pagamento (Mercado Pago / Stripe)
- [ ] Autenticação (NextAuth.js)
- [ ] API de busca (Algolia)
- [ ] Sistema de avaliações real
- [ ] Painel admin

---

## PALETA DE CORES

| Função | Nome | HEX |
|--------|------|-----|
| Background Primary | Alabaster White | #FAFAFA |
| Background Secondary | Warm Gray | #F5F3F0 |
| Background Tertiary | Soft Linen | #EDE9E3 |
| Accent Primary | Sacred Blue | #2C5282 |
| Accent Primary Hover | Deep Blue | #1A365D |
| Accent Secondary | Warm Gold | #D4A843 |
| Accent Tertiary | Marian Blue | #4A90D9 |
| Text Primary | Dark Charcoal | #1A1A2E |
| Text Secondary | Medium Gray | #4A5568 |
| Text Tertiary | Light Gray | #A0AEC0 |
| Success | Holy Green | #38A169 |
| Warning | Amber | #D69E2E |
| Error | Cardinal Red | #C53030 |
| Sale | Liturgical Red | #E53E3E |
| Dark Header | Navy Catholic | #1A202C |

---

## TIPOGRAFIA

| Função | Fonte | Uso |
|--------|-------|-----|
| Logo | Cinzel | Logo "MERCADO SACRO" |
| Headings | Merriweather | H1-H3, nomes de produto |
| Body / UI | Inter | Texto corrido, UI, botões |
| Accent | Cormorant Garamond | Citações bíblicas |

---

## ESTRUTURA DE PASTAS

```
mercado-sacro/
├── public/img/{products,categories,banners,brand}/
├── src/
│   ├── app/          # App Router pages
│   ├── components/   # ui, layout, home, product, catalog, cart
│   ├── contexts/     # CartContext, FavoritesContext
│   ├── hooks/        # useCart, useFavorites
│   ├── lib/          # utils, constants, animations
│   ├── data/         # products, categories, banners, reviews
│   └── types/        # product, category, cart, review
```

---

## PADRÕES DE CÓDIGO

- TypeScript strict mode
- "use client" apenas quando necessário
- Props tipadas com interface
- Tailwind para 95% dos estilos
- Mobile-first responsive
- next/image para todas as imagens
- Skeleton loading (não spinners)
- cn() utility para classes condicionais
