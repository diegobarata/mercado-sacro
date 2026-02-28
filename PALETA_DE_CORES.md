# 🎨 Paleta de Cores — Sacra Heritage

> Sistema de Design Visual baseado em elegância tradicional, sofisticação litúrgica e modernidade minimalista.

---

## 📋 Índice
- [Backgrounds](#backgrounds)
- [Cores de Ouro (Gold Accent)](#cores-de-ouro-gold-accent)
- [Tipografia](#tipografia)
- [Cores de Acento](#cores-de-acento)
- [Aplicações por Contexto](#aplicações-por-contexto)
- [Diretrizes de Uso](#diretrizes-de-uso)

---

## Backgrounds

### `--bg-primary: #FAF7F2`
**Bege Cálido Claro**

- **Tom:** Neutro cálido, levemente off-white
- **RGB:** rgb(250, 247, 242)
- **Aplicações:**
  - Background principal de todo o site
  - Fundo de seções principais
  - Base para conteúdo de leitura
  - Arrière-plan de cards e containers
  
**Contexto:** Transmite calor, acolhimento e tradição. Evoca pergaminho antigo e papel de alta qualidade.

---

### `--bg-secondary: #F0EBE1`
**Bege Médio**

- **Tom:** Neutro cálido, ligeiramente mais escuro que o primário
- **RGB:** rgb(240, 235, 225)
- **Aplicações:**
  - Fundos de seções alternadas
  - Hover states em botões brancos
  - Backgrounds de cards secundários
  - Separação visual sutil entre seções

**Contexto:** Contraste suave para criação de hierarquia visual sem quebrar a harmonia.

---

### `--bg-dark: #0D0D0D`
**Preto Profundo**

- **Tom:** Quase preto puro
- **RGB:** rgb(13, 13, 13)
- **Aplicações:**
  - Hero sections escuras
  - Fundos de destaque dramático
  - Contraste máximo para texto branco
  - Seções premium ou exclusivas

**Contexto:** Sofisticação máxima, luxo contemporâneo, foco total no conteúdo.

---

### `--bg-dark-surface: #1C1C1E`
**Cinza Escuro Elevado**

- **Tom:** Cinza muito escuro (levemente mais claro que bg-dark)
- **RGB:** rgb(28, 28, 30)
- **Aplicações:**
  - Cards sobre fundos escuros
  - Elevação de superfícies em modo dark
  - Contraste sutil em interfaces escuras

**Contexto:** Hierarquia em fundos escuros, profundidade sem perder legibilidade.

---

### `--bg-white: #FFFFFF`
**Branco Puro**

- **Tom:** Branco absoluto
- **RGB:** rgb(255, 255, 255)
- **Aplicações:**
  - Botões de alto contraste
  - Cards destacados
  - Overlays e modais
  - Texto sobre fundos escuros

---

## Cores de Ouro (Gold Accent)

### `--gold: #C9A84C`
**Ouro Litúrgico**

- **Tom:** Dourado cálido e elegante
- **RGB:** rgb(201, 168, 76)
- **Aplicações:**
  - Botões primários (CTAs principais)
  - Links e elementos interativos
  - Ícones de destaque
  - Bordas e separadores premium
  - Acentos em badges de "destaque"
  - Navbar hover states

**Contexto:** A cor de identidade da marca. Representa sacralidade, luxo discreto, tradição litúrgica católica (paramentos dourados).

---

### `--gold-hover: #B8923A`
**Ouro Escurecido**

- **Tom:** Dourado mais escuro e intenso
- **RGB:** rgb(184, 146, 58)
- **Aplicações:**
  - Hover state de botões dourados
  - Estados ativos de links
  - Realce de interação

**Contexto:** Feedback visual de interatividade, mantendo a elegância do dourado.

---

### `--gold-light: #E8D5A0`
**Ouro Claro**

- **Tom:** Dourado suave e luminoso
- **RGB:** rgb(232, 213, 160)
- **Aplicações:**
  - Seleção de texto (::selection)
  - Scrollbar thumb
  - Bordas sutis (ex: navbar border)
  - Gradientes suaves
  - Backgrounds de highlight delicados

**Contexto:** Toque luxuoso sem sobrecarregar. Usado para detalhes e micro-interações.

---

## Tipografia

### `--text-primary: #1A1A1A`
**Preto Suave**

- **Tom:** Quase preto, levemente suavizado
- **RGB:** rgb(26, 26, 26)
- **Aplicações:**
  - Títulos principais
  - Corpo de texto
  - Conteúdo de alta hierarquia

**Contexto:** Mais confortável para leitura prolongada que preto puro (#000000).

---

### `--text-secondary: #4A4A4A`
**Cinza Médio**

- **Tom:** Cinza neutro
- **RGB:** rgb(74, 74, 74)
- **Aplicações:**
  - Subtítulos
  - Descrições de produtos
  - Textos complementares
  - Metadados

**Contexto:** Hierarquia clara sem perder legibilidade.

---

### `--text-tertiary: #8A8A8A`
**Cinza Claro**

- **Tom:** Cinza suave
- **RGB:** rgb(138, 138, 138)
- **Aplicações:**
  - Labels auxiliares
  - Timestamps
  - Placeholders
  - Informações terciárias

**Contexto:** Informação presente mas menos prioritária.

---

### `--text-white: #FFFFFF`
**Branco Puro**

- **Tom:** Branco absoluto
- **RGB:** rgb(255, 255, 255)
- **Aplicações:**
  - Texto sobre fundos escuros (bg-dark)
  - Texto em botões dourados
  - Overlays e hero sections escuras

---

## Cores de Acento

### `--burgundy: #6B1D2A`
**Vinho Litúrgico**

- **Tom:** Vermelho vinho profundo
- **RGB:** rgb(107, 29, 42)
- **Aplicações:**
  - Badges de "limitado" ou "edição especial"
  - Elementos de urgência ou exclusividade
  - Detalhes sazonais (Quaresma, Advento)

**Contexto:** Representa as cores litúrgicas católicas (vermelho/roxo), tradição e solenidade.

---

### `--sacred-green: #2D5A3D`
**Verde Sacro**

- **Tom:** Verde escuro, profundo
- **RGB:** rgb(45, 90, 61)
- **Aplicações:**
  - Badges de "novo" ou "lançamento"
  - Elementos de natureza ou tempo comum
  - Indicadores de sucesso suaves

**Contexto:** Verde litúrgico (Tempo Comum na Igreja), conexão com natureza, renovação.

---

## Aplicações por Contexto

### 🔘 Botões

| Tipo | Background | Texto | Hover | Uso |
|------|-----------|-------|-------|-----|
| **Primary** | `--gold` | `--text-white` | `--gold-hover` | CTAs principais, ações primárias |
| **Outline** | `transparent` | `--gold` | `bg: --gold, text: white` | Ações secundárias |
| **Ghost** | `transparent` | `--gold` | `--gold-hover` (text) | Links estilizados, ações terciárias |
| **White** | `--bg-white` | `--bg-dark` | `--bg-secondary` | Botões sobre fundos escuros |

### 🏷️ Badges

| Tipo | Background | Texto | Uso |
|------|-----------|-------|-----|
| **Novo** | `--sacred-green` | `--text-white` | Produtos recém-lançados |
| **Limitado** | `--burgundy` | `--text-white` | Edições limitadas, urgência |
| **Destaque** | `--gold` | `--text-white` | Produtos em evidência |

### 🔗 Links e Navegação

- **Estado padrão:** `text-secondary` ou `text-primary`
- **Hover:** `text-gold` com `transition-colors duration-300`
- **Active/Current:** `text-gold` mantido

### 📊 Hierarquia de Seções

- **Seção principal:** `bg-primary`
- **Seção alternada:** `bg-secondary`
- **Seção de destaque/hero:** `bg-dark` com texto branco
- **Cards elevados:** `bg-white` com sombra sutil

---

## Diretrizes de Uso

### ✅ Boas Práticas

1. **Contraste de Leitura**
   - Sempre usar `text-primary` sobre `bg-primary/secondary`
   - Sempre usar `text-white` sobre `bg-dark`

2. **Hierarquia Dourada**
   - Usar dourado com moderação para manter seu impacto
   - Ouro é para ações primárias e destaques estratégicos
   - Não usar mais de 1-2 elementos dourados por viewport

3. **Transições Suaves**
   - Todas as mudanças de cor devem ter `transition-colors duration-300`
   - Animações devem ser sutis e elegantes

4. **Acessibilidade**
   - Manter contraste mínimo de 4.5:1 para texto normal
   - 3:1 para texto grande (18pt+)
   - Testar legibilidade em todas as combinações

### ❌ Evitar

- Não usar `#000000` puro — sempre preferir `text-primary`
- Não misturar burgundy e sacred-green na mesma seção
- Não usar dourado como fundo de grandes áreas
- Não criar novos tons sem documentar

---

## 🎭 Inspiração e Conceito

A paleta foi desenvolvida para transmitir:

- **Tradição Católica:** Cores litúrgicas (ouro, vinho, verde)
- **Elegância Atemporal:** Tons neutros cálidos, dourado discreto
- **Modernidade Sofisticada:** Pretos profundos, brancos puros
- **Acolhimento:** Beges cálidos que confortam o olhar
- **Sacralidade:** Referências a paramentos, cálices, missais

**Referências visuais:**
- Paramentos litúrgicos católicos
- Iluminuras medievais
- Design editorial de luxo
- Apple's design language (espaçamento, suavidade)
- Lojas conceito de artigos religiosos europeus

---

## 🔧 Implementação Técnica

As cores estão definidas em [src/app/globals.css](src/app/globals.css) usando CSS Custom Properties:

```css
:root {
  --bg-primary: #FAF7F2;
  --gold: #C9A84C;
  /* ... */
}
```

E mapeadas para Tailwind via `@theme inline`:

```css
@theme inline {
  --color-bg-primary: var(--bg-primary);
  --color-gold: var(--gold);
  /* ... */
}
```

**Uso no código:**
```tsx
<div className="bg-bg-primary text-text-primary">
<button className="bg-gold hover:bg-gold-hover">
```

---

*Documentação criada em 28/02/2026*  
*Sacra Heritage — Tradição em cada detalhe*
