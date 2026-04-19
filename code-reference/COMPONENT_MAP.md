# TruSynth Global Landing Page - Component Map

**Project Location:** `/Users/gtrush/Downloads/tru-synth (2)`
**Dev Server:** `npm run dev` → localhost:3002
**Last Updated:** 2026-01-17

---

## 🗂️ File Structure

```
tru-synth (2)/
├── App.tsx                          # Main app component (view state machine)
├── index.html                       # HTML shell
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Top navigation with logo
│   │   ├── Sidebar.tsx             # Desktop left sidebar navigation
│   │   ├── BottomHUD.tsx           # Bottom card selector (3 tabs)
│   │   ├── GridBackground.tsx      # Animated grid background
│   │   └── MobileNavbar.tsx        # Mobile navigation
│   ├── carousel/
│   │   ├── Carousel.tsx            # Card swipe container
│   │   └── Card.tsx                # Individual product cards with SVG visuals
│   ├── views/
│   │   ├── LandingView.tsx         # VIEW -1: "Autonomous Business..." page
│   │   ├── SynthOSView.tsx         # VIEW 1 (index 1): Finance/Gov/Enterprise tabs
│   │   ├── FoundryView.tsx         # VIEW 1 (index 2): Foundry product catalog
│   │   ├── SimulationCTA.tsx       # VIEW 2: "Try it yourself" page
│   │   └── SimulationModal.tsx     # Modal for simulation scenarios
│   └── ui/
│       ├── flickering-grid.tsx     # Animated background grid
│       └── text-marquee.tsx        # Scrolling text component
├── data/
│   └── cards.ts                    # Card data (TRU Spend, Agentic OS, Foundry)
├── types/
│   └── index.ts                    # TypeScript types
└── copy_dump.md                    # Original copy reference
```

---

## 🎯 View State Machine

```
currentView State:
  -1 = LANDING VIEW      → "Autonomous Business Runs on TRUTH"
   0 = DASHBOARD         → Carousel with 3 cards
   1 = DEEP DIVE         → Product-specific view (TRU Spend redirects, SynthOS tabs, or Foundry)
   2 = SIMULATION CTA    → "Try it yourself" page (not shown for Foundry)

activeIndex State (Carousel):
   0 = TRU Spend         → Redirects to spend.trusynth.com
   1 = Agentic OS        → Opens SynthOSView with 3 tabs
   2 = Foundry           → Opens FoundryView
```

**Navigation Flow:**
```
Landing (-1)
    ↓ scroll down
Dashboard (0) with Carousel
    ↓ select card / scroll down
Deep Dive (1) - Product View
    ↓ scroll down (if not Foundry)
Simulation CTA (2)
```

---

## 📝 ALL TEXT CONTENT BY LOCATION

### 🏠 VIEW -1: LANDING VIEW
**File:** `components/views/LandingView.tsx`

#### Main Hero Text (Lines 52-78)
```javascript
const textLines = [
  [
    { text: "Autonomous", highlight: false },
    { text: "Business", highlight: false },
    { text: "Runs", highlight: false },
    { text: "on", highlight: false },
  ],
  [
    { text: "TRUTH", highlight: true, special: true },
  ],
  [
    { text: "We", highlight: false },
    { text: "build", highlight: false },
    { text: "operational", highlight: false },
    { text: "ontologies", highlight: false },
  ],
  [
    { text: "for", highlight: false },
    { text: "AI", highlight: false },
    { text: "agents", highlight: false },
  ],
  [
    { text: "to", highlight: false },
    { text: "navigate", highlight: false },
    { text: "and", highlight: false },
    { text: "execute.", highlight: false },
  ]
];
```

**Rendered as:**
```
Autonomous Business Runs on
TRUTH
We build operational ontologies
for AI agents
to navigate and execute.
```

#### Bottom Marquee Layers (Lines 170-180)
```javascript
// Line 1 (slow)
"SYNTHETIC INTELLIGENCE ORCHESTRATION LAYER NEURAL FABRIC"

// Line 2 (reverse)
"ONTOLOGY STRUCTURED DATA INTELLIGENCE ENTITY RESOLUTION KNOWLEDGE GRAPH"

// Line 3 (fast, blurred)
"TRUTH TRUTH TRUTH TRUTH TRUTH TRUTH TRUTH TRUTH"
```

**Visual Elements:**
- Flickering gold grid background (FlickeringGrid component)
- Word-by-word animated reveal with blur effect
- Gold gradient on "TRUTH": `linear-gradient(180deg, #FFFFFF 10%, #E8E0CC 40%, #928466 50%, #6B5F4A 51%, #928466 90%)`

---

### 🎴 VIEW 0: DASHBOARD (Carousel)
**File:** `App.tsx` (lines 196-214)

#### Hero Headlines Above Carousel
**Current Setting:** `heroDesignOption = 3` (Gemini Design)

**Option 3: Gemini-Designed Premium Copy** (ACTIVE)
```javascript
const heroHeadlinesV3 = [
  {
    line1: "Vendor identity.",
    line2: "Radically Unified.",
    subtitle: "ONTOLOGY-POWERED SPEND INTELLIGENCE"
  },  // Shows for TRU Spend (index 0)
  {
    line1: "Enterprise AI.",
    line2: "Production Ready.",
    subtitle: "AGENTIC OPERATING SYSTEMS FOR INSTITUTIONS"
  },  // Shows for Agentic OS (index 1)
  {
    line1: "Architected for speed.",
    line2: "Deploy Day One.",
    subtitle: "HEADLESS AGENTS & HIGH-FIDELITY KITS"
  }   // Shows for Foundry (index 2)
];
```

**Visual Styling:**
- Line 1: Lighter descriptor (text-2xl md:text-5xl, 50% opacity for dark/gold themes)
- Line 2: Bold statement (text-4xl md:text-7xl, full opacity/gradient)
- Subtitle: All caps, mono font, 30% opacity

---

### 🃏 CAROUSEL CARDS
**File:** `data/cards.ts`

#### Card 0: TRU Spend
```javascript
{
  id: 'truspend',
  label: 'TRU Spend',                    // Top left label with icon
  title: 'Spend Management',             // Card heading
  systemName: 'TRU SPEND',               // Brand name below heading
  subtitle: 'AI-Powered Expense Intelligence.',  // Not used on card (legacy)
  desc: 'Autonomous receipt processing, policy enforcement, and real-time spend visibility.',
  theme: 'dark',
  externalUrl: 'https://spend.trusynth.com'  // Redirects here on scroll down
}
```

**Card Visual:** SpendVisual SVG
- Central hexagonal core (gold)
- 4 satellite nodes: RECEIPTS, POLICY, ANALYTICS, INTEGRATIONS
- Bottom label: "SPEND_INTELLIGENCE"

#### Card 1: Agentic OS
```javascript
{
  id: 'synthos',
  label: 'Agentic OS',
  title: 'Agentic OS',
  systemName: 'SYNTH',
  subtitle: 'OS for Autonomous Operations.',
  desc: 'Enterprise-grade operating systems for institutions, governments, and commercial scale.',
  theme: 'gold',
  subCards: [
    {
      id: 'finance',
      label: 'Finance',
      title: 'Private Capital',
      subtitle: 'OS for Capital Allocation.',
      desc: 'Algorithmic due diligence, investment compliance protocols, and strategic deployment.'
    },
    {
      id: 'government',
      label: 'Government',
      title: 'National Operations',
      subtitle: 'OS for Sovereign Operations.',
      desc: 'Civil service agents, fiscal oversight, and policy execution.'
    },
    {
      id: 'enterprise',
      label: 'Enterprise',
      title: 'Commercial Scale',
      subtitle: 'OS for Agentic Operations.',
      desc: 'Infrastructure for the AI-ready enterprise: synthetic workforces and cognitive orchestration.'
    }
  ]
}
```

**Card Visual:** BusinessVisual SVG (gold swarm)
- Central hexagonal ontology core
- 6 hexagonal agent nodes (primary layer, rotating)
- 3 circular specialist nodes (secondary layer, counter-rotating)
- Bottom label: "AGENTIC_OPS"

#### Card 2: Foundry
```javascript
{
  id: 'foundry',
  label: 'Foundry',
  title: 'Immediate Deployment',
  systemName: 'FOUNDRY',
  subtitle: 'Plug & Play Resources.',
  desc: 'A curated library of internal tools, headless agents, and high-fidelity UI kits.',
  theme: 'dark'
}
```

**Card Visual:** FoundryVisual SVG
- 3 floating module layers: UI_CORE, AGENT_LOGIC, READY_ASSET
- Breathing animation (vertical float)
- Bottom label: "MODULE_INVENTORY"

---

### 🔄 BOTTOM HUD (Card Selector)
**File:** `components/layout/BottomHUD.tsx`

**Auto-generated from CARDS array:**
- Tab 0: "TRU Spend" (dark theme indicator)
- Tab 1: "Agentic OS" (gold theme indicator)
- Tab 2: "Foundry" (dark theme indicator)

**Visual:** Glass pill with active indicator sliding between tabs

---

### 🖥️ VIEW 1: SYNTH OS VIEW (Agentic OS Deep Dive)
**File:** `components/views/SynthOSView.tsx`

#### Tab Bar (Fixed at top)
```javascript
const tabs = [
  { id: 'finance', label: 'Finance' },
  { id: 'government', label: 'Government' },
  { id: 'enterprise', label: 'Enterprise' }
];
```

---

#### FINANCE TAB (Dark Theme)
**Header Section** (Lines 286-290)
```javascript
Subheading: "Private Equity & Investment Banking"
Heading: "INTELLIGENT INFRASTRUCTURE"
Status: "SECURE ENV" (green pulsing dot)
```

**Feature Cards Grid** (4 cards)

**Card 1: DEAL FLOW ENGINE** (Large left, particle sphere)
```javascript
{
  title: "DEAL FLOW ENGINE",
  subtitle: "SYNTH OS - CORE SYSTEM",
  desc: "Central relationship intelligence that sorts pipeline, predicts closings, and serves your deal team."
}
```

**Card 2: DUE DILIGENCE OPS** (Top right, wide)
```javascript
{
  title: "DUE DILIGENCE OPS",
  desc: "Agents that parse VDRs, normalize financial spreads, and verify corporate entities 24/7."
}
```

**Card 3: Capital Formation** (Bottom left)
```javascript
{
  title: "Capital Formation",
  desc: "Identify and scale portfolio companies using predictive models."
}
```

**Card 4: LP Portals** (Bottom right)
```javascript
{
  title: "LP Portals",
  desc: "Secure, real-time dashboards for limited partners."
}
```

**Detail View Content** (when card clicked):
```javascript
FINANCE_FEATURES = {
  core: {
    title: "DEAL FLOW ENGINE",
    subtitle: "SYNTH OS - CORE SYSTEM",
    desc: [
      "Central relationship intelligence that sorts pipeline, predicts closings, and serves your deal team.",
      "Integrates with all major CRMs to provide a unified layer of intelligence.",
      "Automated contact enrichment and interaction tracking."
    ]
  },
  auto: {
    title: "DUE DILIGENCE OPS",
    subtitle: "AUTONOMOUS AGENT WORKFORCE",
    desc: [
      "Agents that parse VDRs, normalize financial spreads, and verify corporate entities 24/7.",
      "Reduces manual analyst workload by 80% through intelligent document processing.",
      "Real-time risk flagging and compliance checks."
    ]
  },
  growth: {
    title: "CAPITAL FORMATION",
    subtitle: "MARKET SCANNING & PREDICTION",
    desc: [
      "Identify and scale portfolio companies using predictive models and market scanning.",
      "Algorithmic sourcing of high-alpha targets before they hit the market.",
      "Deep-dive competitive landscape analysis generated in seconds."
    ]
  },
  ui: {
    title: "LP PORTALS",
    subtitle: "SECURE REPORTING INFRASTRUCTURE",
    desc: [
      "Secure, real-time dashboards for limited partners and investment committees.",
      "Transparent performance tracking and document repository.",
      "Bank-grade security with granular permission controls."
    ]
  }
}
```

---

#### GOVERNMENT TAB (Light Theme)
**Header Section**
```javascript
Subheading: "Sovereign Infrastructure"
Heading: "INTELLIGENT INFRASTRUCTURE"
Status: "ONLINE" (black pulsing dot)
```

**Feature Cards Grid**

**Card 1: SOVEREIGN DATA CORE** (Large left, particle sphere - light theme)
```javascript
{
  title: "SOVEREIGN DATA CORE",
  subtitle: "SYNTH OS - NATIONAL REGISTRY",
  desc: "Central intelligence for secure citizen identity, registry management, and national archives."
}
```

**Card 2: CIVIL SERVICE AGENTS** (Top right, wide)
```javascript
{
  title: "CIVIL SERVICE AGENTS",
  desc: "Agents that automate crisis response, fiscal audits, and high-volume vetting workflows."
}
```

**Card 3: Centralized Command** (Bottom left)
```javascript
{
  title: "Centralized Command",
  desc: "Real-time data fusion from all agencies."
}
```

**Card 4: Citizen Portals** (Bottom right)
```javascript
{
  title: "Citizen Portals",
  desc: "Unified, accessible digital services."
}
```

**Detail View Content:**
```javascript
GOVERNMENT_FEATURES = {
  core: {
    title: "SOVEREIGN DATA CORE",
    subtitle: "SYNTH OS - NATIONAL REGISTRY",
    desc: [
      "Central intelligence for secure citizen identity, registry management, and national archives.",
      "Immutable ledger technology ensures data integrity across all ministries.",
      "High-availability architecture designed for population-scale loads."
    ]
  },
  auto: {
    title: "CIVIL SERVICE AGENTS",
    subtitle: "AUTOMATED BUREAUCRACY",
    desc: [
      "Agents that automate crisis response, fiscal audits, and high-volume vetting workflows.",
      "Reduces administrative backlog by autonomously handling routine approvals.",
      "Inter-agency coordination protocols embedded in agent logic."
    ]
  },
  command: {
    title: "CENTRALIZED COMMAND",
    subtitle: "TOTAL INFORMATION AWARENESS",
    desc: [
      "Real-time data fusion from all agencies into a single source of truth.",
      "Predictive modeling for resource allocation and emergency response.",
      "Secure, air-gapped visualization for top-level decision makers."
    ]
  },
  ui: {
    title: "CITIZEN PORTALS",
    subtitle: "UNIFIED DIGITAL SERVICES",
    desc: [
      "Unified, accessible digital services for the entire population.",
      "Mobile-first design ensuring equitable access to government resources.",
      "Zero-knowledge proof authentication for maximum privacy."
    ]
  }
}
```

---

#### ENTERPRISE TAB (Gold Theme)
**Header Section**
```javascript
Subheading: "Forward Deployed Intelligence"
Heading: "INTELLIGENT INFRASTRUCTURE"
Status: "OPERATIONAL" (gold pulsing dot)
```

**Feature Cards Grid**

**Card 1: COGNITIVE CRM** (Large left, gold particle sphere)
```javascript
{
  title: "COGNITIVE CRM",
  subtitle: "SYNTH OS - IDENTITY GRAPH",
  desc: "We build enterprise-grade backends that understand your data."
}
```

**Card 2: AUTONOMOUS OPS** (Top right, wide)
```javascript
{
  title: "AUTONOMOUS OPS",
  desc: "Deploying custom LLM logic to handle complex workflows."
}
```

**Card 3: Network Effects** (Bottom left)
```javascript
{
  title: "Network Effects",
  desc: "Viral loops and organic user acquisition."
}
```

**Card 4: Consumer Apps** (Bottom right)
```javascript
{
  title: "Consumer Apps",
  desc: "Fluid, reactive interfaces for millions of users."
}
```

**Detail View Content:**
```javascript
ENTERPRISE_FEATURES = {
  core: {
    title: "COGNITIVE CRM",
    subtitle: "SYNTH OS - IDENTITY GRAPH",
    desc: [
      "We build enterprise-grade backends that understand your data.",
      "Unified identity resolution across fragmented data sources.",
      "Behavioral prediction engines for user retention."
    ]
  },
  auto: {
    title: "AUTONOMOUS OPS",
    subtitle: "AGENTIC WORKFLOWS",
    desc: [
      "Deploying custom LLM logic to handle complex workflows.",
      "Automated customer support at infinite scale.",
      "Self-healing infrastructure that predicts downtime before it happens."
    ]
  },
  network: {
    title: "NETWORK EFFECTS",
    subtitle: "VIRAL GROWTH ENGINE",
    desc: [
      "Viral loops and organic user acquisition modeling.",
      "Incentive structure optimization using game theory simulations.",
      "Real-time graph analysis to identify super-connectors."
    ]
  },
  apps: {
    title: "CONSUMER APPS",
    subtitle: "HIGH-FIDELITY INTERFACES",
    desc: [
      "Fluid, reactive interfaces designed for millions of concurrent users.",
      "Latency-free edge rendering for global accessibility.",
      "Adaptive UX that personalizes itself to user behavior."
    ]
  }
}
```

---

### 🏭 VIEW 1: FOUNDRY VIEW (Foundry Deep Dive)
**File:** `components/views/FoundryView.tsx`

**Note:** This view exists but is not in the files I've read. Based on the PRD, it should display a catalog of ready-to-deploy products. Referencing `copy_dump.md` for content.

**Expected Content (from copy_dump.md):**

**Header:**
```
THE FOUNDRY | Agents | UI Kits | Ready Products | Get Access
```

**Hero:**
```
Immediate Deployment
Inventory / Assets
```

**Description:**
```
A curated library of internal tools, headless agents, and high-fidelity UI kits available for immediate integration into your stack.
```

**Products Catalog (10 items):**

**UI KITS:**
1. Synth_Design_System
2. Launch_Page v1
3. Admin_Core v1
4. SaaS_Kit

**MODULES:**
5. Auth_Module
6. Search_Core

**AGENTS:**
7. Voice_Synth_V2
8. UGC_Image_Gen
9. UGC_Video_Pro
10. UGC_Studio_Max

**Custom Section:**
```
"Custom Implementation"
"Need bespoke logic? Our engineering team forks these modules for your specific requirements."
Button: "CONTACT ENGINEERING"
```

---

### 🚀 VIEW 2: SIMULATION CTA
**File:** `components/views/SimulationCTA.tsx`

**Common Text (all themes):**
```javascript
"We engineer platforms tailored to your specific operational mandates."
"We leverage our base architecture on a forward-deployed basis."
"Engineers deploy alongside your team. We iterate on the core OS to solve unique problems in real-time."
"We have prepared simulations for you to experience using SynthOS."
"Ready for Deployment"
"You will be taken to an external window for this simulation."
"We recommend a quiet environment • Mac M1 or higher."
"*Simulations not available on mobile"
```

**Theme-Specific CTAs:**

**Dark Theme (Institutions/Finance):**
```javascript
Title: "SYNTHESIZE ALPHA"
Description: "Test our high-frequency execution engines and risk modeling protocols in a risk-free sandbox environment."
Button: "LAUNCH TERMINAL"
Widgets: Market Maker, Risk Audit, VDR Analysis
```

**Light Theme (Government):**
```javascript
Title: "MOBILIZE COMMAND"
Description: "Simulate crisis coordination, fiscal oversight, and multi-agency data fusion in real-time."
Button: "INITIALIZE OPS"
Widgets: Threat Response, Fiscal Oversight, Disaster Map
```

**Gold Theme (Enterprise):**
```javascript
Title: "SCALE VELOCITY"
Description: "Experience autonomous workforce orchestration. Watch agents handle complex customer workflows at scale."
Button: "START ENGINE"
Widgets: Retention Engine, Viral Simulator, Identity Resolution
```

---

### 🎭 SIMULATION MODAL
**File:** `components/views/SimulationModal.tsx`

**Header:**
```
SYNTH_OS // SIMULATION_ENV
```

**Status Messages:**
```
INITIALIZING KERNEL...
RUNNING...
COMPLETE
```

**Scenarios by Theme:**

**Dark (Finance):**
- Market Maker (HFT Volatility Response)
- Risk Audit (Portfolio Stress Test)
- VDR Analysis (Automated Diligence)

**Light (Government):**
- Threat Response (Crisis Protocol Alpha)
- Fiscal Audit (Tax Evasion Detection)
- Disaster Map (Resource Allocation)

**Gold (Enterprise):**
- Customer Churn (Retention Engine)
- Viral Loop (Growth Simulation)
- Identity Res (Graph Unification)

---

## 🎨 Theme System

**3 Themes:** `dark` | `gold` | `light`

### Theme Application by Component

| Component | Theme Source | Dark | Gold | Light |
|-----------|--------------|------|------|-------|
| Card 0 (TRU Spend) | `cards.ts` | ✅ | - | - |
| Card 1 (Agentic OS) | `cards.ts` | - | ✅ | - |
| Card 2 (Foundry) | `cards.ts` | ✅ | - | - |
| SynthOS Finance Tab | Hardcoded | ✅ | - | - |
| SynthOS Government Tab | Hardcoded | - | - | ✅ |
| SynthOS Enterprise Tab | Hardcoded | - | ✅ | - |

### Color Palette

**Dark Theme:**
```css
Background: #050505, #0a0a0a
Text: white, white/40 (muted)
Accent: white/80
Border: white/10
Glass: white/5 backdrop-blur
```

**Gold Theme:**
```css
Primary: #928466
Light: #E8E0CC
Dark: #6d6350
Gradient: linear-gradient(135deg, #997b34 0%, #fcf6ba 25%, #aa771c 50%, #fbf5b7 75%, #8c6210 100%)
Text: black, black/60 (muted)
Border: #FCF6BA/60
```

**Light Theme:**
```css
Background: #F5F5F5, white
Text: black, text-neutral-500 (muted)
Border: black/10, white/80
Glass: white backdrop-blur
```

---

## 🎬 Animation & Interaction Patterns

### Global Animation Ease
```javascript
[0.32, 0.72, 0, 1]  // Used throughout for smooth transitions
```

### View Transitions
```javascript
duration: 0.6s  // View slides (Landing ↔ Dashboard ↔ Deep Dive)
duration: 0.5s  // Header/HUD fade in/out
duration: 0.8s  // Landing View word reveals
```

### Card Carousel
```javascript
scale: [0.85, 1, 0.85]      // Active card scales to 1
opacity: [0.3, 0.6, 1, 0.6, 0.3]
rotateY: [15, 0, -15]        // 3D rotation effect
```

### Particle Spheres
```javascript
rotation: 0.002 rad/frame (Y-axis), 0.001 rad/frame (X-axis)
expansion: 0 → 1.0 on hover (breathing effect)
particleCount: 2800
```

### SVG Animations (Card Visuals)
```javascript
Orbital rotations: 60-120s duration
Node breathing: 4-6s float cycles
Pulse dots: 2-3s opacity cycles
Data flow: 3s motion paths
```

---

## 🔧 Configuration Variables

### App.tsx
```javascript
Line 197: heroDesignOption: 1 | 2 | 3
  1 = Original ("WE BUILD AGENTIC OPERATING SYSTEMS FOR..")
  2 = Version 2 (Research-based)
  3 = Gemini Design (CURRENT - Premium copy)

Line 189: heroSubtitle logic
  "TOOLS" for Foundry (index 2)
  "OPERATING SYSTEMS" for others
```

### Design Tokens
```
Font Sans: Inter, Satoshi
Font Mono: JetBrains Mono
Backdrop Blur: 16px (mobile), 40px (desktop)
Border Radius: 1.5rem (mobile), 2rem (desktop)
```

---

## 📱 Responsive Breakpoints

```css
Mobile:    < 768px     (md breakpoint)
Tablet:    768-1024px  (md to lg)
Desktop:   > 1024px    (lg+)
```

**Key Responsive Behaviors:**
- Card width: 80vw → 360px → 400px
- Backdrop blur: 16px → 40px
- Font sizes: scale up with breakpoints
- Grid layouts: 1 column → 3 columns

---

## 🧭 Navigation Reference

### Scroll-Based Navigation
```javascript
// Wheel/Touch thresholds (App.tsx)
DEBOUNCE_MS = 600
SWIPE_THRESHOLD = 60px
VELOCITY_THRESHOLD = 0.3 px/ms
```

### View Transitions
```
Landing → Dashboard:     Scroll down from -1 to 0
Dashboard → Deep Dive:   Scroll down from 0 to 1 (or tap card)
                        (If TRU Spend: redirect to external URL)
Deep Dive → Sim CTA:     Scroll down from 1 to 2 (not for Foundry)
Back navigation:         Scroll up reverses (with boundary detection)
```

### Sidebar States
```javascript
currentView === -1: opacity 0 (hidden)
currentView === 0:  "Dashboard" active
currentView === 1:  "[Product Name]" active (TRU Spend/Agentic OS/Foundry)
currentView === 2:  "Simulation" active
```

---

## 🎯 Quick Reference: Text Change Locations

| What to Change | File | Line Range | Variable/Constant |
|----------------|------|------------|-------------------|
| Landing hero text | `LandingView.tsx` | 52-78 | `textLines` array |
| Landing marquees | `LandingView.tsx` | 170-180 | TextMarquee children |
| Dashboard headlines | `App.tsx` | 206-211 | `heroHeadlinesV3` |
| Card data (all 3) | `data/cards.ts` | 5-60 | `CARDS` array |
| Finance tab features | `SynthOSView.tsx` | 257-262 | `FINANCE_FEATURES` |
| Government features | `SynthOSView.tsx` | 264-269 | `GOVERNMENT_FEATURES` |
| Enterprise features | `SynthOSView.tsx` | 271-276 | `ENTERPRISE_FEATURES` |
| Simulation CTA copy | `SimulationCTA.tsx` | - | Theme-specific blocks |

---

## 📊 Component Tree (Visual Hierarchy)

```
App.tsx (State Machine)
│
├── GridBackground (animated, theme-aware)
├── Header (logo, always visible except Foundry mode)
├── Sidebar (desktop nav, 4 states)
├── BottomHUD (3 card tabs)
│
├── VIEW -1: LandingView
│   ├── FlickeringGrid (gold, animated)
│   ├── Hero Text Block (word-by-word reveal)
│   └── Triple Marquee (bottom overlay)
│
├── VIEW 0: Dashboard (Carousel)
│   ├── Hero Headlines (changes with active card)
│   └── Carousel
│       ├── Card 0: TRU Spend (SpendVisual SVG)
│       ├── Card 1: Agentic OS (BusinessVisual SVG)
│       └── Card 2: Foundry (FoundryVisual SVG)
│
├── VIEW 1: Deep Dive (Product-Specific)
│   ├── IF index === 0: REDIRECT to spend.trusynth.com
│   ├── IF index === 1: SynthOSView
│   │   ├── Tab Bar (Finance | Government | Enterprise)
│   │   ├── Background (theme-specific gradients)
│   │   ├── FinanceContent (dark theme, 4 feature cards)
│   │   │   └── DetailView Modal (on card click)
│   │   ├── GovernmentContent (light theme, 4 feature cards)
│   │   │   └── DetailView Modal
│   │   └── EnterpriseContent (gold theme, 4 feature cards)
│   │       └── DetailView Modal
│   └── IF index === 2: FoundryView
│       └── Product Catalog (10 items)
│
└── VIEW 2: SimulationCTA (Not shown for Foundry)
    ├── Theme-specific CTA (Dark/Light/Gold variants)
    └── SimulationModal (launched on CTA click)
        └── Scenario Selection (theme-specific widgets)
```

---

## 🔍 Component Communication

### Props Flow
```javascript
App.tsx
  → currentView (state)
  → activeIndex (state)
  → theme (derived from CARDS[activeIndex].theme)

  ↓ passes to children:

Header
  ← theme (for logo styling)
  ← onLogoClick (navigation handler)

Sidebar
  ← theme
  ← activeId (currentView)
  ← onNavigate (setCurrentView)
  ← deepDiveLabel (product name)

BottomHUD
  ← activeIndex
  ← setActiveIndex
  ← theme

Carousel
  ← activeIndex
  ← onChange (setActiveIndex)
  ← onEnter (() => setCurrentView(1))
  ← theme

SynthOSView / FoundryView
  ← isActive (currentView === 1)

SimulationCTA
  ← isActive (currentView === 2)
  ← theme
  ← onLaunch (() => setShowSimulation(true))
```

---

## 💡 Key Implementation Notes

1. **External Redirect:** TRU Spend card has `externalUrl` in data, scroll handler checks this and redirects instead of changing view

2. **Foundry Special Mode:** When `currentView === 1 && activeIndex === 2`, header/background fade out (isFoundryMode check)

3. **Simulation CTA:** Only shows for indices 0 and 1, not for Foundry (index 2)

4. **Theme Inheritance:** All child components derive theme from the active card via `CARDS[activeIndex].theme`

5. **Scroll Boundary Detection:** Each scrollable view (Deep Dive, Sim CTA) has `id="view-scroll-container"` or `id="sim-scroll-container"` for boundary checks

6. **Tab State:** SynthOSView maintains its own internal tab state (finance/government/enterprise) independent of parent

---

## 📦 Data Structures

### CardData Interface
```typescript
{
  id: string              // 'truspend' | 'synthos' | 'foundry'
  label: string          // Display name
  icon: LucideIcon       // Icon component
  title: string          // Card heading
  systemName: string     // Brand name
  subtitle: string       // Tagline
  desc: string          // Description
  theme: 'dark' | 'light' | 'gold'
  externalUrl?: string   // Optional redirect URL
  subCards?: SubCardData[]  // For Agentic OS tabs
}
```

### SubCardData Interface (Agentic OS only)
```typescript
{
  id: string       // 'finance' | 'government' | 'enterprise'
  label: string   // Tab label
  title: string   // Tab heading
  subtitle: string
  desc: string
}
```

---

## 🚀 Development Commands

```bash
# Start dev server
cd "/Users/gtrush/Downloads/tru-synth (2)"
npm run dev
# → http://localhost:3002

# View hierarchy
# Landing (scroll down) → Dashboard (select card) → Deep Dive (scroll down) → Simulation

# Test external redirect
# Select TRU Spend card, scroll down → redirects to spend.trusynth.com

# Switch hero design option
# Edit App.tsx line 197: heroDesignOption = 1 | 2 | 3
```

---

**END OF MAP**

---

*This map is your source of truth for all components, text, and structure in the TruSynth global landing page. Use component names and line numbers from this document when requesting changes.*
