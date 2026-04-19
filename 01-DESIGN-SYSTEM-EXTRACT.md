# TRU SYNTH — Design System Extract

Source: `/Users/gtrush/Downloads/tru-synth cc version/` (Apr 6, 2026 — most recent canonical codebase)

---

## Tech Stack

**Framework & Build:**
- React 19.2.0
- Vite 6.2.0
- TypeScript 5.8.2
- Tailwind CSS 4.1.18 (with PostCSS)

**Key Dependencies:**
- Framer Motion 12.23.24 (animations)
- Lucide React 0.554.0 (icons)
- Supabase JS 2.90.1 (backend/auth)
- clsx 2.1.1 + tailwind-merge 3.4.0 (class utilities)

**Styling Approach:** Tailwind-first utility classes + CSS-in-JS for dynamic values + custom `@keyframes` in `index.css` for complex animations.

---

## Color Palette

| Token | Hex / Value | Use Case | Tailwind Class |
|---|---|---|---|
| **Primary Black** | `#050505` | Main background | `bg-[#050505]` / `synth-bg` |
| **Secondary Black** | `#0a0a0a` | Panels, cards, elevated surfaces | `bg-[#0a0a0a]` |
| **Tertiary Black** | `#0c0c0c` | Subtle contrast | `bg-[#0c0c0c]` |
| **Warm Dark** | `#100e08` | Gold-tinted backgrounds | `bg-[#100e08]` |
| **Signature Gold** | `#928466` | Primary accent, borders, glows | `synth-gold` |
| **Light Gold** | `#E8E0CC` | Highlights, premium text | `synth-gold-light` |
| **Gold Dim** | `rgba(146, 132, 102, 0.4)` | Soft backgrounds, borders | `synth-gold-dim` |
| **Cream / Pale Gold** | `#FCF6BA` | Bright button-glow highlights | gradient only |
| **Gold Brown** | `#786a4e` | Darker gold variant | gradient only |
| **Darker Gold** | `#6d6350` | Deep gold tone | shadow/shade |
| **Glass White** | `rgba(255, 255, 255, 0.03)` | Glass morphism base | `tru-glass` |
| **Glass Border** | `rgba(255, 255, 255, 0.08)` | Subtle borders | `tru-border` |
| **Glass Glow** | `rgba(255, 255, 255, 0.15)` | Glow accents | `tru-glow` |

### Signature Gold Gradients
```css
/* Header CTA button */
linear-gradient(135deg, #928466, #E8E0CC, #786a4e)

/* Card shine sweep */
linear-gradient(90deg, #FCF6BA 30%, #0000 50%, #E8E0CC 70%)

/* SynthOS metallic card */
linear-gradient(155deg, #c9a84c 0%, #f5e6a3 18%, #b8942f 42%, #f0dfa0 68%, #8c6210 100%)
```

---

## Typography

| Font | Weights | Source | Usage |
|---|---|---|---|
| **Inter** | 400 / 600 / 700 | Google Fonts | Default sans, body, UI labels |
| **JetBrains Mono** | 400 / 500 | Google Fonts | Code, agent names, technical text |
| **Satoshi** | 400 / 500 / 700 | FontShare | Headlines, product names, display |
| **Instrument Serif** | Regular / Italic | Google Fonts | Serif accent (minimal use) |

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
  satoshi: ['Satoshi', 'sans-serif'],
  'instrument-serif': ['Instrument Serif', 'Georgia', 'serif'],
}
```

### Headline Pattern (signature two-line)
```tsx
<h1 className="text-2xl md:text-5xl font-semibold text-white/60">Line 1.</h1>
<h2 className="text-4xl md:text-7xl font-bold text-white">Line 2.</h2>
```

- **Product names:** `text-[26px] md:text-[30px] lg:text-[34px] leading-[1.15] tracking-[-0.04em]` (Satoshi)
- **Category tags:** `text-[8px] md:text-[9px] font-semibold tracking-[0.2em] uppercase`
- **Body:** `text-[10.5px] md:text-[12px] leading-[1.55] tracking-[-0.005em]`

---

## Spacing & Radius

| Token | Value | Context |
|---|---|---|
| Panel padding | `p-6` / `p-5` | 24 / 20 px |
| Glass radius | `rounded-2xl` / `rounded-[1.5rem]` / `rounded-[2rem]` | 16 / 24 / 32 px |
| Card radius | `rounded-[1.25rem]` (mobile) → `rounded-[1.75rem]` / `rounded-[2rem]` (desktop) | Carousel cards |
| Button radius | `rounded-[17px]` (GlowButton), `rounded-full` (segmented) | Button-specific |
| Card aspect | `aspect-[3/4]` | Product carousel |

---

## Glass Morphism

**Desktop canonical glass panel:**
```tsx
bg-[#0a0a0a]/95 backdrop-blur-xl [contain:paint]
border border-[#928466]/40 rounded-2xl p-6
shadow-2xl shadow-black/50
```

**Blur scale:**
- `backdrop-blur-xl` → 40px
- `backdrop-blur-md` → 12px
- `backdrop-blur` → 4px
- Explicit: `backdrop-blur-[40px]`, `backdrop-blur-[16px]` (mobile)

**Mobile performance override:**
```css
@media (max-width: 768px) {
  .backdrop-blur-xl,
  .backdrop-blur-3xl,
  .backdrop-blur-md,
  .backdrop-blur-[40px] {
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
  }
}
```

**Glass borders:**
- Dark gold: `border-[#928466]/40` (also `/30`, `/25`)
- Light gold: `border-[#E8E0CC]/30`
- White: `border-white/10` / `/15`

**Glows & shadows:**
- Gold glow: `shadow-[0_0_8px_rgba(232,224,204,0.6)]`
- Subtle gold: `shadow-[0_0_4px_rgba(146,132,102,0.5)]`
- Depth: `shadow-2xl shadow-black/50`
- Gold card outer glow: `0 40px 100px -25px rgba(200,168,76,0.45)`

---

## Signature Components

### GlowButton (`components/ui/shiny-button.tsx`)
SVG-filter-based glow, 3-layer blur, animated gold gradient sweep on hover, curved SVG clipPath. Text: `text-[8px] font-bold uppercase tracking-[0.2em] text-[#E8E0CC]`.

```css
@keyframes speen {
  0% { transform: rotate(10deg); }
  50% { transform: rotate(190deg); }
  100% { transform: rotate(370deg); }
}
@keyframes woah {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.75); }
}
```

### Product Cards (`components/carousel/Card.tsx`)
3D perspective (`perspective: 1200`, `transformStyle: preserve-3d`), animated metal-border shimmer, multi-layer glass (outer ring → inner ring → bevel highlight → depth shadow → noise overlay → shine sweep).

```css
@keyframes border-shimmer {
  0% { background-position: 0% 0%; }
  50% { background-position: 200% 200%; }
  100% { background-position: 0% 0%; }
}
```

### Ontology Tooltips (`components/ui/agentic-ontology-diagram.tsx`)
```tsx
bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#928466]/40
rounded-2xl p-6 shadow-2xl shadow-black/50 w-[220px]
```
- Title: `text-[#E8E0CC] font-bold text-xl`
- Divider: `w-10 h-0.5 bg-[#928466]/50`
- Label: `text-[#928466]/60 text-[10px] uppercase tracking-wider`
- Bullet: `w-1.5 h-1.5 rounded-full bg-[#928466]`

### Header CTA
```tsx
bg-[linear-gradient(135deg,#928466,#E8E0CC,#786a4e)]
text-white border border-[#928466]/20 hover:scale-105
```

### Segmented Control
```tsx
inline-flex backdrop-blur-md border rounded-full p-1
bg-white/5 border-white/10
```

---

## Animation & Motion

```js
animation: {
  'shine': 'shine 8s ease-in-out infinite',
  'fade-slide-in-1..4': 'fadeSlideIn 0.6s ease-out 0.1..0.4s forwards',
}
```

**Framer Motion easing:** `[0.32, 0.72, 0, 1]` (aggressive ease-out, snappy).
**Global transition:** `cubic-bezier(0.4, 0, 0.2, 1)`.

Durations: 0.3s hover · 0.5s opacity/transform · 0.6s view transitions · 1s smooth scroll · 4–12s ambient background loops.

---

## Tailwind Custom Tokens (canonical names)

```js
colors: {
  'tru-black':       '#050505',
  'tru-glass':       'rgba(255, 255, 255, 0.03)',
  'tru-border':      'rgba(255, 255, 255, 0.08)',
  'tru-glow':        'rgba(255, 255, 255, 0.15)',
  'synth-gold':      '#928466',
  'synth-gold-light':'#E8E0CC',
  'synth-gold-dim':  'rgba(146, 132, 102, 0.4)',
  'synth-bg':        '#050505',
}
```

---

## Logo Reference (in code)

- Primary logo URL in Header: `https://i.imgur.com/p6POhEa.png` (h-5 md:h-6, theme-aware invert)
- Local logo data: `/logo-data-batch1.json`, `/logo-data-batch2.json`
- Favicon: `/favicon.png`, `/apple-touch-icon.png`

---

## Brand Voice (from CLAUDE.md)

- **Obsidian & Gold** — near-black + sparing gold accents.
- **Agentic Operating System** visual language — structural, orchestrated, sophisticated.
- Positioning: "Autonomous agent infrastructure for enterprises / Ontology-powered spend unification / Production-ready packages & high-fidelity UI kits."
- Professional, technical, institutional. Every value is intentional — gold is a signal of value, not decoration.
