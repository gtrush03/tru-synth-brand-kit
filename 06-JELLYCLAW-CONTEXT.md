# Jellyclaw Context (for TRU SYNTH company description)

Jellyclaw is TRU SYNTH's foundational agent-runtime layer — a Claude Code replacement written in TypeScript. It's **infrastructure**, not a product: engineers use it directly, and TRU SYNTH's own surfaces (Genie, jelly-claw) are built on top of it.

---

## A · Product one-liner

Open-source Claude Code runtime — an embeddable, auditable, transparent agent loop you can read, own, and ship.

## B · Who it's for

Engineers, agent-builders, and teams shipping Claude-powered products who need the UX surface of Claude Code without the proprietary binary — whether embedding into their own apps, running it headless on their infra, or shipping it as a library inside a product they sell.

## C · Most quotable lines (verbatim)

> **"Open-source Claude Code runtime. Swap the closed proprietary agent loop for a transparent TypeScript one. Same tools, same schema, your infra."**  — `README.md`

> **"jellyclaw is a calm, curious, quietly capable collaborator. Senior-engineer energy, not customer-service energy."**  — `SOUL.md`

> **"jellyclaw is infrastructure, not a product. Users see Genie or jelly-claw; jellyclaw is the engine underneath."**  — `MASTER-PLAN.md`

> **"Jellyclaw is the same organism with a grip — a soft body with a precise tool."**  — `jellyclaw-brand-brief.md`

> **"jellyclaw isn't trying to be a better Claude Code. It's trying to be a Claude Code you can own, audit, and embed."**  — `jellyclaw-vs-claude-code-architecture.md`

## D · How it connects to TRU SYNTH

Jellyclaw sits **below** the four TRU SYNTH pillars (ALPHA / COMMAND / VELOCITY / FOUNDRY) as the agent runtime they all ultimately call. It's the first TRU SYNTH product shipped as open source (MIT). Surfaces built on top:

- **Genie** — internal agent dispatcher / CLI (ships in FOUNDRY).
- **jelly-claw** — macOS video-calling app with in-call AI voice triggers.
- **Third parties** — embed via `npm i jellyclaw` or `brew install jellyclaw`.

## E · Surfaces it ships on

| Surface | Form |
|---|---|
| CLI | `jellyclaw run`, `jellyclaw serve`, `jellyclaw tui` |
| TUI | Ink-based terminal UI: gradient wordmark, jellyfish spinner, slash-command palette, live streaming |
| HTTP server | Loopback SSE streaming with bearer auth |
| Library | `import { createEngine } from 'jellyclaw'` — Node / Bun / embeddable in Swift |
| Desktop | Tauri 2 signed `.dmg` (Phase 15–16) |
| Distribution | npm + Homebrew + Docker |

## F · What makes it different from Claude Code

- **Source-code transparency:** full MIT TypeScript, not a closed binary. Every boundary emits a typed event — permission engine, hook runners, and session logic are all auditable.
- **Embeddability:** ships as library / CLI / HTTP server / TUI. Drop it into Swift, Node, or Rust — Claude Code is a single binary.
- **Multi-provider economics:** Anthropic direct + OpenRouter failover, own retry loop, explicit prompt-cache control.

## G · Tagline

> **"Jellyclaw is a jellyfish with a grip."**
>
> *"A cyan bell pulsing against blue-black ink, violet glow in the tentacles, one amber heartbeat per cycle. The wordmark is stencil-cut steel, not bubble letters, because the soft body carries a precise tool."*

Short form: *open-source agent runtime · same tools, same schema, your infra.*

## H · Stack

TypeScript (strict) · Node 20+ / Bun 1.1+ · Commander CLI · Hono server · Ink TUI · OpenCode `>=1.4.4` agent loop (patched) · Anthropic SDK + OpenRouter · `@modelcontextprotocol/sdk` v1 (stdio/HTTP/SSE, OAuth+PKCE) · 11 built-in tools (Bash, Read, Write, Edit, Glob, Grep, WebFetch, TodoWrite, Task, NotebookEdit, WebSearch) · Playwright MCP · `better-sqlite3` session index + JSONL event log · Vitest + fast-check property tests (1300+) · Tauri 2 (future desktop).

---

## ✅ Ready-to-paste "Jellyclaw append"

These are the extra sentences to fold into the TRU SYNTH blurb after the FOUNDRY line.

**Long form (3 sentences, 62 words):**
```
Underneath all four pillars runs Jellyclaw — our open-source, MIT-licensed
Claude Code replacement written in TypeScript. It's an embeddable agent
runtime that engineers can read, audit, and ship inside their own products,
and it powers both Genie (our CLI agent dispatcher) and jelly-claw (our
macOS video-calling app). Same tools, same schema, your infrastructure.
```

**Short form (2 sentences, 34 words):**
```
Underneath it all runs Jellyclaw — our open-source, MIT-licensed Claude
Code replacement. A transparent TypeScript agent runtime that powers
Genie and jelly-claw, and that engineers can embed in their own products.
```

**One-liner (1 sentence, 22 words):**
```
And underneath it all: Jellyclaw — our open-source TypeScript agent
runtime, the engine behind Genie, jelly-claw, and every TRU SYNTH surface.
```
