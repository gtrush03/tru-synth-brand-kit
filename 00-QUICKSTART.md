# TRU SYNTH — Claude Design System Setup — QUICKSTART

Paste the values below into the Claude "Set up your design system" form. Upload the files listed.

---

## 1️⃣ Company name and blurb

```
TRU SYNTH: autonomous agent infrastructure for enterprise operations, with production-ready UI kits and Claude skills available through The Foundry.
```

*(Alternatives in `03-COMPANY-BLURB-AND-VOICE.md` if you want shorter.)*

---

## 2️⃣ Link code on GitHub

Not required — skip, or if you want one, use:
```
https://github.com/gtrush03/genie-2.0
```
*(No public trusynth repo exists yet. The newest canonical codebase lives locally at `tru-synth cc version`, snapshot copied in step 3.)*

---

## 3️⃣ Link code from your computer (drag folder)

Drag this folder into the upload zone:
```
/Users/gtrush/Downloads/TRU-SYNTH-DESIGN-KIT/code-reference/
```

Contains: `index.css`, `index.html`, `tailwind.config.js`, `package.json`, `CLAUDE.md`, `COMPONENT_MAP.md`, and the 6 signature components (GlowButton, Ontology diagram, Header, NavMenu, SegmentedControl, Card). This is the slim frontend-focused subfolder Claude asks for.

---

## 4️⃣ Upload a .fig file

None available. Skip. *(If you generate one later, drop it at `TRU-SYNTH-DESIGN-KIT/trusynth.fig`.)*

---

## 5️⃣ Add fonts, logos and assets (drag files)

Drag these files from `TRU-SYNTH-DESIGN-KIT/logos/` + `brand-assets/`:

**Must upload (Tier 1):**
- `logos/01-SYnTh-primary-2250.png` — main wordmark (2250×2250)
- `logos/04-icon-mesh-432.png` — brand icon (gold mesh)
- `logos/05-favicon-animated.svg` — scalable favicon
- `logos/06-apple-touch-icon.png` — app/home-screen icon
- `brand-assets/TRU-SYNTH-BRAND-KIT.pdf` — official brand guide

**Recommended (Tier 2):**
- `brand-assets/hero-intelligent-solutions.png` — vertical hero
- `brand-assets/hero-golden-sphere.png` — 2912×1632 signature imagery
- `logos/02-SYnTh-square-1000.png` — alt size wordmark

Fonts are Google Fonts / FontShare — **no file upload needed**; they load at runtime from `index.css` / `index.html` in the code bundle.

---

## 6️⃣ Any other notes?

```
TRU SYNTH's visual identity is "Obsidian & Gold": near-black backgrounds
(#050505 → #0A0A0A) with signature champagne gold accents (#928466 highlight
#E8E0CC) used sparingly — gold leaf, not gold paint. Typography is Inter for
body/UI, JetBrains Mono for code and agent identifiers, and Satoshi for
display headlines; headlines follow a two-line pattern with faded first line
and solid second line. Glass morphism panels use backdrop-blur-xl (40px) with
subtle white/gold borders and rounded-2xl corners. Motion is slow and
deliberate — cubic-bezier(0.32, 0.72, 0, 1), no bounce, 0.3–0.6s durations.
Voice is direct, confident, technical; treats AI complexity as already solved.
Do: keep backgrounds dark, use gold as accent, favor institutional sophistication.
Don't: use gradients as primary, neon colors, tech-startup blue, or bouncy
animations. Museum-grade, nocturnal, inevitable.
```

---

## 📁 Kit Folder Map

```
TRU-SYNTH-DESIGN-KIT/
├── 00-QUICKSTART.md                 ← you are here
├── 01-DESIGN-SYSTEM-EXTRACT.md      ← colors, fonts, tokens, component recipes
├── 02-ASSET-INVENTORY.md            ← full 45-file logo/asset catalogue
├── 03-COMPANY-BLURB-AND-VOICE.md    ← blurb + notes copy-paste options
├── 04-DESIGN-TOKEN-CROSSCHECK.md    ← canonical values confirmed across projects
├── logos/                           ← 7 primary logos + favicons (upload these)
├── brand-assets/                    ← hero imagery + brand kit PDF + PSD source
├── code-reference/                  ← slim code snapshot (upload this folder)
├── fonts/                           ← empty (Google/FontShare CDN)
└── screenshots/                     ← empty (add if you screenshot trusynth.com)
```

---

## 🎨 Canonical Values (for reference)

| | |
|---|---|
| **Primary black** | `#050505` |
| **Elevated black** | `#0a0a0a` |
| **Signature gold** | `#928466` |
| **Highlight gold** | `#E8E0CC` |
| **Dark gold** | `#6d6350` |
| **Body / UI font** | Inter (400, 600, 700) |
| **Display font** | Satoshi (400, 500, 700) |
| **Mono font** | JetBrains Mono (400, 500) |
| **Glass blur** | `backdrop-blur-xl` = 40px (desktop), 12–16px (mobile) |
| **Ease curve** | `cubic-bezier(0.32, 0.72, 0, 1)` |
| **Panel radius** | `rounded-2xl` → `rounded-[2rem]` (16–32px) |
