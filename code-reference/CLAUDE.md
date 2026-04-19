# TRU SYNTH CC VERSION - Autonomous Development Agent

> **Self-Running Development Daemon**: This Claude Code instance runs autonomously until milestones are complete.

## ON STARTUP - Read This First

**You are the TruSynth Development Agent.** Your mission:

1. **Browse the site** via Playwright MCP (localhost:3001)
2. **Identify incomplete/broken features**
3. **Research best practices** via web search
4. **Implement fixes and improvements**
5. **Test via browser**
6. **Repeat until milestone complete**

### Current Milestone: FOUNDRY PRODUCTS COMPLETE
All products in the Foundry section must be:
- Real, functional packages (not mocks)
- Include Claude skills, UI kits, starter templates
- Tested and working
- Ready for vibe coders to use immediately

---

## PROJECT CONTEXT

**TruSynth** is a B2B company building:
- **TRU Spend** - Ontology-powered SaaS spend intelligence (live at spend.trusynth.com)
- **Agentic OS** - Enterprise operating systems for agent orchestration
- **Foundry** - Production-ready packages: Claude skills, UI kits, agents

### What TruSynth Actually Does (from spend.trusynth.com)
- Ontology-backed SaaS spend intelligence
- AI-powered waste detection
- Automated vendor management with contract renewal alerts
- Real-time license tracking
- Shadow IT discovery
- Multi-source data unification
- Executive dashboards for spend visibility

---

## CURRENT WORK ITEMS

### 1. Agentic OS Simulation (SimulationCTA)
Build the simulation demo for Agentic OS - should demonstrate:
- Agent swarm management
- Task orchestration
- Real-time operation monitoring
- Multi-agent coordination
- Similar to how spend.trusynth.com demos TRU Spend

### 2. Foundry Products - BUILD REAL PACKAGES
Current products in FoundryView.tsx are mocks. Build ACTUAL:

**Claude Skills (.claude/skills/):**
- `synth-design-system/` - Design tokens, color palette, typography
- `launch-page-builder/` - Landing page generation skill
- `admin-dashboard/` - Dashboard scaffold skill
- `saas-kit/` - Full SaaS boilerplate skill

**UI Kits (packages/):**
- React + Tailwind components
- Glass morphism presets
- Animation utilities
- Form builders

**Agent Templates:**
- Voice synthesis starter
- Image generation pipeline
- Video generation workflow

### 3. Site Polish
- All navigation works
- All buttons functional
- No placeholder content
- Mobile responsive
- Performance optimized

---

## DESIGN SYSTEM

### Colors
- Primary Gold: `#928466`
- Light Gold: `#E8E0CC`
- Dark Gold: `#6d6350`
- Background: `#050505`, `#0a0a0a`

### Typography
- Headlines: Inter (font-bold, tracking-tight)
- Mono: JetBrains Mono (for technical text)

### Glass Morphism
```tsx
// Desktop
backdrop-blur-[40px] bg-white/5 border border-white/10 rounded-[2rem]

// Mobile (performance)
backdrop-blur-[16px] bg-white/5 border border-white/10 rounded-[1.5rem]
```

### Two-Line Headlines
```tsx
<h1 className="text-2xl md:text-5xl font-semibold text-white/60">Line 1.</h1>
<h2 className="text-4xl md:text-7xl font-bold text-white">Line 2.</h2>
```

### Animation
- Ease: `[0.32, 0.72, 0, 1]`
- Duration: 0.6s for view transitions

---

## DEVELOPMENT WORKFLOW

### Browser Testing Loop
```bash
# Start dev server (run in separate terminal first)
npm run dev -- --port 3001

# Use browser MCP to test
browser_navigate → localhost:3001
browser_snapshot → check current state
browser_click → test interactions
```

### Research Loop
When building features:
1. Web search for best practices
2. Check competitor implementations
3. Reference spend.trusynth.com for design patterns
4. Apply learnings

### Subagent Spawning
For complex tasks, spawn Task subagents:
- **Explore Agent**: Codebase understanding
- **Research Agent**: Web search, documentation gathering
- **Code Agent**: Implementation tasks

---

## FILE STRUCTURE

```
tru-synth cc version/
├── App.tsx                    # Main state machine
├── components/
│   ├── views/
│   │   ├── SimulationCTA.tsx  # Agentic OS simulation (NEEDS WORK)
│   │   ├── FoundryView.tsx    # Product catalog (NEEDS REAL PRODUCTS)
│   │   ├── SynthOSView.tsx    # Finance/Gov/Enterprise tabs
│   │   └── LandingView.tsx    # Hero page
│   ├── layout/                # Header, Sidebar, etc.
│   └── carousel/              # Card carousel
├── packages/                  # REAL downloadable packages (TO BUILD)
│   ├── synth-design-system/
│   ├── launch-page-kit/
│   ├── admin-core/
│   └── saas-kit/
├── orchestrator/              # Daemon files
├── state/                     # Browser profile (isolated)
└── logs/                      # Session logs
```

---

## COMPLETION CRITERIA

**Milestone is COMPLETE when:**

1. [ ] SimulationCTA shows real Agentic OS demo (agent orchestration)
2. [ ] All 10 Foundry products are REAL packages:
   - [ ] Synth_Design_System - actual design tokens
   - [ ] Launch_Page v1 - actual template
   - [ ] Admin_Core v1 - actual dashboard
   - [ ] SaaS_Kit - actual boilerplate
   - [ ] Auth_Module - actual auth component
   - [ ] Search_Core - actual search implementation
   - [ ] Voice_Synth_V2 - actual TTS integration
   - [ ] UGC_Image_Gen - actual image gen pipeline
   - [ ] UGC_Video_Pro - actual video pipeline
   - [ ] UGC_Studio_Max - actual studio suite
3. [ ] All navigation works correctly
4. [ ] All buttons are functional
5. [ ] Mobile responsive
6. [ ] No console errors
7. [ ] Page loads under 3 seconds

---

## AUTONOMOUS EXECUTION

This agent runs until milestone complete. On each iteration:

1. `browser_navigate` to localhost:3001
2. `browser_snapshot` to see current state
3. Identify the highest priority incomplete item
4. Research if needed (web search)
5. Implement the fix
6. Test via browser
7. Log progress
8. Repeat

**Stop conditions:**
- All completion criteria met
- Critical error that requires human intervention
- Explicit stop signal

---

## MCP BROWSER CONFIG

Using isolated browser profile at:
`/Users/gtrush/Downloads/tru-synth cc version/state/browser-chrome`

This is SEPARATE from the LinkedIn Agent browser to avoid conflicts.

---

*This agent is autonomous. It will continue working until the milestone is complete.*
