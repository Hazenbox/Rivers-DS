# Jio Design System — New Adoption Channels (Cursor Rules, CLI, Updated MCP)

Hi team,

We've shipped a major update to how you access and use the Jio Design System. The goal: make it work reliably for AI agents and developers alike, with zero setup friction.

---

## What changed (TL;DR)

| Channel | What it does | How to use it |
|---------|-------------|---------------|
| **Cursor Rules** | Auto-loads full component catalog into every AI conversation | Just pull `main` — it's already in the repo |
| **CLI** | Sets up new projects in one command | `npx @marcelinodzn/ds-cli init` |
| **NPM Packages** | Runtime components and tokens | `npm install @marcelinodzn/ds-react @marcelinodzn/ds-tokens` |
| **MCP** | Token resolution, validation, accessibility checks | Same as before, refined role |

---

## 1. Cursor Rules (biggest change)

There's a new file in the repo: `.cursor/rules/jio-design-system.mdc`

This file is **auto-loaded by Cursor** into every AI conversation. It contains:

- All 56 components with import paths and key props
- Token patterns (spacing, colors, typography, shape, motion)
- Setup instructions and DsProvider boilerplate
- Hard constraints (no hex colors, use tokens, etc.)

**You don't need to do anything.** Pull `main` and your Cursor AI will already know every component, every prop, and every token pattern. No MCP connection required.

---

## 2. CLI Tool

We published `@marcelinodzn/ds-cli` to npm. For new projects:

```bash
# Set up a project (detects Next.js/Vite/CRA, installs deps, scaffolds DsProvider)
npx @marcelinodzn/ds-cli init

# Quick reference for any component
npx @marcelinodzn/ds-cli add Button
npx @marcelinodzn/ds-cli add Accordion
npx @marcelinodzn/ds-cli add Select
```

The `add` command shows you the import statement, key props, and a usage example instantly.

---

## 3. Correct Package Names (important!)

We've consolidated all references. Please use these going forward:

```
@marcelinodzn/ds-react        → Components
@marcelinodzn/ds-tokens       → Design tokens
@marcelinodzn/ds-react/icons  → 1,600+ icons
```

The old `@jio/ds-react` scope no longer exists in any docs or code.

---

## 4. MCP Updates

The MCP still works but its role is now focused on **runtime intelligence**:

- **resolve-token** — Get exact token values for a specific context
- **validate-token-usage** — Catch hard-coded values in your code
- **validate-component-usage** — Check props against component schemas
- **check-accessibility** — WCAG AA compliance checks

The `setup-project` tool is deprecated — use the CLI instead.

---

## Quick Start for Existing Projects

```bash
# 1. Pull latest
git pull origin main

# 2. That's it — Cursor rules are already active

# 3. (Optional) If starting a new consumer project:
npx @marcelinodzn/ds-cli init
```

## Quick Start for AI Agents

Just ask Cursor to build with the design system. It already knows the components, props, and token patterns from the auto-loaded rules. For token resolution or validation, it will call MCP tools as needed.

---

Let me know if you run into any issues. The full adoption strategy is documented in the repo if you want the details behind these changes.

Best,
Nuno
