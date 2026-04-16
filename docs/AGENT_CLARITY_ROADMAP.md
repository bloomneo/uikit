# Agent Clarity Roadmap — UIKit 74 → 90+

> Goal: push `@bloomneo/uikit` from **🟡 Agent-friendly (74/100)** to
> **🟢 Agent-native (90+/100)** by the next minor release.
>
> North star: an AI coding agent should feel the library is
> **consistent, easy, predictable, and non-ambiguous** at every touch point.
>
> Benchmark: [`AGENT_CLARITY_BENCHMARK.md`](./AGENT_CLARITY_BENCHMARK.md) v2
>
> Baseline audit: 2026-04-16 (see audit notes in session log).

## Guiding principles

Every change must push at least one of these:

1. **Consistency** — a pattern that works in one place works the same way in every similar place
2. **Ease** — the path from task to correct JSX is the shortest possible
3. **Predictability** — an agent can guess the next API correctly from analogy
4. **Non-ambiguity** — for each task, exactly one obvious answer

If a proposed change doesn't push one of the four, drop it.

---

## Phase 1 — Documentation wins (no code changes) · +10 pts

*Fastest ROI. Ship these first.*

### Create agent-facing docs
- [ ] **Create `AGENTS.md`** with always-do / never-do rules (D17, +3 pts)
  - Always use flat import from `@bloomneo/uikit`
  - Always wrap app with `ThemeProvider` + `ToastProvider` + `ConfirmProvider`
  - Always import `@bloomneo/uikit/styles` once at entry
  - Always include FOUC script in `<head>`
  - Never deep-import as primary (`@bloomneo/uikit/button`)
  - Never hardcode colors; use semantic classes
  - Never `throw new Error` for prop validation; use `requireProp()`
  - Never forget `'use client'` on Dialog / Sheet / Popover / Tooltip / HoverCard / DropdownMenu / ConfirmDialog

- [ ] **Create `.cursor/rules/uikit.mdc`** mirroring AGENTS.md in Cursor format (D17, +1 pt)

- [ ] **Add Agent Clarity score block to README** — published score + link to benchmark (D17, +0.5 pts)

### Decision guidance
- [ ] **Add "When to use / When NOT to use" block to top-20 components** (D2, +5 pts)
  - Dialog, Sheet, Drawer (when each)
  - Tooltip vs HoverCard vs Popover (hover trigger, content complexity, interactivity)
  - Select vs Combobox vs DropdownMenu (static vs searchable vs action-menu)
  - Toast vs Alert vs Banner (transient vs inline vs page-level)
  - FormField vs Form (react-hook-form integration vs vanilla)
  - Skeleton vs EmptyState vs loading overlay
  - Card vs Section vs Container
  - DataTable vs DataList vs Table (row count, sort/filter need)

- [ ] **Add "Sibling Showdown" matrix** at end of llms.txt comparing overlap families (D2, +1 pt)

### Setup explicitness
- [ ] **Create monolithic "Setup Checklist" block** at top of llms.txt (D10, +2 pts)
  - All 6 steps in order: install, styles, fonts, providers, FOUC, Tailwind v4 config
  - Peer deps list (required vs optional)
  - TypeScript paths (`@/*` alias requirement)
  - Next.js notes (client-only components list)

### Prop documentation
- [ ] **Add controlled/uncontrolled declaration** to every stateful component in llms.txt (D6, +3 pts)
  - Format: `**Controlled:** value + onChange` / `**Uncontrolled:** defaultValue` / `**Managed:** state in provider`
  - 18 components × 1 line each

- [ ] **Add "Canonical pattern" marker** to each primary snippet (D8, +2 pts)
  - 10 top tasks × 1 label each

- [ ] **Complete variant enumeration** for Badge, Alert, Pagination in llms.txt (D5, +1 pt)
  - Add variant matrix table at bottom of llms.txt

### Example diversity
- [ ] **Add 3 shapes per top-15 primitive**: basic / stateful / error (D7, +3 pts)
  - Priority: EmptyState, PageHeader, Combobox, Tabs, Accordion, Skeleton, Select, Alert, Input, Card, Badge, Textarea, Checkbox, Switch, RadioGroup
  - Each shape ≤10 lines

**Phase 1 total: +20 pts potential. Realistic: +10 pts with audit strictness.**

---

## Phase 2 — API normalization (non-breaking) · +5 pts

*Alias + deprecate. No major version bump.*

### Prop predictability
- [ ] **Expose `open` + `onOpenChange` on Tooltip + HoverCard wrappers** (D3, +2 pts)
  - Currently only `defaultOpen` surfaces; Radix supports controlled mode
  - Add top-level props on our wrapper components

- [ ] **Alias `onValueChange` → `onChange` on Select** (D3, +1 pt)
  - Keep `onValueChange` for Radix consistency but document `onChange` as canonical for UIKit
  - OR pick one and deprecate the other with console warning

- [ ] **Standardize disabled / required / error props** across all form inputs (D3, +0.5 pts)
  - Audit: does every form input accept these 3 props with identical behavior?

### Runtime quality
- [ ] **Add `'use client'` directive** to Dialog, Popover, Tooltip, HoverCard, DropdownMenu, ConfirmDialog, Toast, Command (D9, +2 pts)

- [ ] **Add `displayName` to every forwardRef'd component** (D13, +1 pt)
  - Grep `React.forwardRef` in src/components; ensure `.displayName` set on each
  - Prevents `ForwardRef(Anonymous)` in React DevTools

- [ ] **Verify Combobox has focus trap** (D11, +0.5 pts)
  - If missing, wrap content in Radix FocusScope

### Error legibility
- [ ] **Add `requireProp` / `warnInDev` usage to 10 hottest misuse paths** (D13, +1 pt)
  - Dialog without DialogContent child
  - DataTable with non-array data (already exists, verify)
  - Combobox options prop shape check
  - FormField without child input
  - Toast called before ToastProvider mounted

**Phase 2 total: +7 pts potential. Realistic: +5 pts.**

---

## Phase 3 — Composition & escape hatches · +3 pts

### Composition
- [ ] **Add nesting-tree diagrams** for DropdownMenu and Command families in llms.txt (D4, +1 pt)

- [ ] **Document `asChild` support** for every Radix-based trigger in llms.txt (D14, +1 pt)

### Customization
- [ ] **Add `forwardRef` to Button** so agents can `useRef` it (D14, +0.5 pts)
  - Add displayName

- [ ] **Expose CSS var overrides** per component (D14, +0.5 pts)
  - Document tokens like `--btn-radius`, `--card-padding` so consumers can theme without rewriting

**Phase 3 total: +3 pts.**

---

## Phase 4 — Ecosystem recipes · +3 pts

*Must-haves for agent ecosystem fit.*

- [ ] **Next.js App Router recipe** showing `'use client'` boundaries (D16, +0.5 pts)

- [ ] **React Hook Form + Zod recipe** wiring FormField to useForm + zodResolver (D16, +0.5 pts)

- [ ] **TanStack Query + DataTable recipe** fetch → loading → data → error states (D16, +1 pt)

- [ ] **React Testing Library test examples** for Button, Dialog, DataTable, FormField (D16, +0.5 pts)

- [ ] **i18n recipe** for formatCurrency / formatDate / Time with locale switching (D16, +0.5 pts)

**Phase 4 total: +3 pts.**

---

## Phase 5 — Evolution discipline · +2 pts

- [ ] **Write `DEPRECATION_POLICY.md`** stating: removed exports live as aliases ≥1 minor, breaking changes require codemod or sed recipe (D15, +1 pt)

- [ ] **Add jscodeshift codemod for `@voilajsx/uikit` → `@bloomneo/uikit`** scope migration (D15, +0.5 pts)
  - Even though 1.5 is shipped; useful for pending migrations

- [ ] **Add "Migration Guide" template** to docs/ for future breaking changes (D15, +0.5 pts)

**Phase 5 total: +2 pts.**

---

## Phase 6 — Agent-native tooling · +2 pts

*Nice to have; pushes 90 → 95.*

- [ ] **Publish MCP server** exposing component metadata (schema, snippets, variants) over MCP (D17, +1 pt)
  - Agents can query `listComponents`, `getComponentSchema`, `getSnippet` at runtime

- [ ] **Claude Code skill** with uikit commands (`/uikit-list`, `/uikit-add`, `/uikit-score`) (D17, +0.5 pts)

- [ ] **Figma Code Connect mappings** for core components (D17, +0.5 pts)

**Phase 6 total: +2 pts.**

---

## Phase 7 — External validation · credibility, not score

*Can't move the score, but makes the 90 believable.*

- [ ] **Independent reviewer runs the benchmark** against uikit (variance check)
- [ ] **Publish comparison scores** for shadcn / MUI / Chakra / Radix / AntD in a public post
- [ ] **Automated drift check in CI** — diff llms.txt references against `src/index.ts` exports on every PR
- [ ] **Add Agent Clarity score to each release note**

---

## Score projection

| Phase | Effort | Dims affected | Pts gained | Running score |
|---|---|---|---:|---:|
| Baseline | — | — | — | **74** |
| Phase 1 — Documentation | 3–4 h | D2, D5, D6, D7, D8, D10, D17 | +10 | **84** |
| Phase 2 — API normalization | 3–4 h | D3, D9, D11, D13 | +5 | **89** |
| Phase 3 — Composition | 1–2 h | D4, D14 | +3 | **92** |
| Phase 4 — Ecosystem | 2–3 h | D16 | +3 | **95** |
| Phase 5 — Evolution | 1 h | D15 | +2 | **97** |
| Phase 6 — Tooling | 4–6 h | D17 | +2 | **99** |

**Realistic v2 target: 92/100 (🟢 Agent-native) after Phases 1–3.**

Phases 4–6 are stretch goals for v2.1+ — they deliver the last 7 points but take more time than they save.

---

## Success criteria

We've hit "agents feel consistent, easy, predictable, non-ambiguous" when:

1. **Prop-prediction test**: a fresh agent, given only `Dialog` docs, correctly predicts `Sheet` and `Popover` prop names ≥90% of the time
2. **Task-pick test**: given the 20 canonical tasks, an agent picks the right component on the first try ≥18/20 times
3. **Copy-paste test**: every `llms.txt` snippet renders in a fresh scaffold with zero edits (only data substitution)
4. **Self-correction test**: given a broken snippet, the UIKitError message alone is enough for the agent to fix it on the next turn without consulting docs
5. **Benchmark reproducibility**: two reviewers score uikit within ±3 points on the v2 benchmark

If all five pass, we can drop the "friendly" qualifier and call it **agent-native**.

---

## Open questions

- **Do we gate the "agent-native" claim behind independent scoring, or self-score?** (Credibility vs velocity.)
- **Should the benchmark become a GitHub Action that runs on every PR?** (Drift prevention vs tooling cost.)
- **Do we publish the comparison scores for shadcn / MUI?** (Marketing leverage vs contentious claims without their cooperation.)
- **What's the cadence for re-running the audit?** (Proposed: every minor release.)

---

*Created 2026-04-16. Owner: @krishnateja. Status: backlog.*
