# AGENT_CLARITY_BENCHMARK

> A reproducible scoring rubric for how **agent-friendly** a React component
> library is across the **entire agent workflow** — discovery → generation →
> validation → debug → evolution.
>
> Every metric resolves to a count, a ratio, or a boolean. Two reviewers
> applying the rubric to the same package land within ±3 points. Applied by an
> LLM reading the package's files, not by an executable script.

## Philosophy

A UI library is **agent-friendly** if an AI coding agent (Claude, Cursor,
Copilot, Windsurf) can:

1. **Discover** the right component for a task (without guessing)
2. **Generate** correct JSX (props, variants, nesting, providers)
3. **Validate** that generated code typechecks and renders
4. **Debug** via error messages when generation is wrong
5. **Evolve** code as the library version shifts, and integrate with the
   surrounding ecosystem (forms, state, routing, SSR, testing)

v1 of this rubric covered only stage 2 (generation). v2 covers all five —
because in real agent sessions, friction at **any stage** breaks the loop.

The rubric measures **only** what can be observed by reading files and
counting. No vibes. No "feel."

## How to use this rubric

1. Give an LLM access to the package tree (`src/`, `dist/types/`,
   `llms.txt`, `AGENTS.md`, `README.md`, `examples/`, `cookbook/`, `CHANGELOG.md`).
2. Point it at this file.
3. Ask: *"Apply AGENT_CLARITY_BENCHMARK v2 to package X. Walk through every
   dimension, show the count, and produce a final weighted score out of 100."*
4. Re-running on the same package reproduces within ±3 points.

This rubric is **not** an executable script. The LLM is the runtime.

---

## The 5 stages & 17 dimensions

```
STAGE A — DISCOVERY          (14%)  — can the agent find what to use
  D1  Component pickability        7%
  D2  Decision guidance            4%
                              (+ 3% uncounted buffer for future)

STAGE B — GENERATION         (37%)  — can the agent write correct JSX
  D3  Prop predictability          8%
  D4  Composition tree clarity     6%
  D5  Variant/size/tone enum       5%
  D6  Controlled/uncontrolled      5%
  D7  Example diversity            6%
  D8  Single canonical pattern     7%

STAGE C — VALIDATION & RUNTIME (25%) — does the code work
  D9  Type inference + SSR markers 6%
  D10 Setup explicitness           6%
  D11 A11y defaults                5%
  D12 Copy-paste runnability       8%

STAGE D — DEBUG & ITERATE    (13%)  — can the agent self-correct
  D13 Error legibility             8%
  D14 Customization escape hatches 5%

STAGE E — EVOLVE & INTEGRATE (14%)  — longevity of agent-generated code
  D15 Evolution discipline         5%
  D16 Ecosystem integration        5%
  D17 Agent-native assets          4%
```

Each dimension scores 0–10 by a concrete count. Final score =
Σ (dim × weight%) then × 10 to land on 0–100.

---

# STAGE A — DISCOVERY

## D1. Component pickability ⚖️ 7%

Given a common UI task, exactly **one** component surfaces as the obvious
answer in `llms.txt`. No overlap, no agent coin-flip between similar names.

**Recipe.** Take the canonical 20-task list (confirm prompt, modal, slide-in,
toast, dropdown, searchable select, static select, date picker, date-range,
table, key-value detail, empty state, skeleton, badge, form field,
permission gate, page header, card, alert inline, tooltip). For each, grep
`llms.txt` + `AGENTS.md`: does exactly one component surface?

**Score.** 10 = ≥18/20 · 7 = 14–17 · 5 = 10–13 · 2 = 5–9 · 0 = <5.

## D2. Decision guidance ⚖️ 4%

Each component section declares **when to use** and **when NOT to use**.
Without this, agents apply the wrong primitive (e.g. `Dialog` for a
non-modal flyout).

**Recipe.** For the top-20 components, check if the doc (`llms.txt`,
`AGENTS.md`, or component page) has a "Use when / Don't use when" block
OR a comparison line to a sibling (`Popover` vs `Tooltip` vs `HoverCard`).
Ratio = documented / total.

**Score.** `round(ratio × 10)`.

---

# STAGE B — GENERATION

## D3. Prop predictability across siblings ⚖️ 8%

Sibling components must use identical names for identical concepts.
`Dialog.open` implies `Sheet.open`, `Drawer.open`, `Popover.open`.

**Recipe.**
1. Group components by family: **overlays** (`Dialog`, `Sheet`, `Drawer`,
   `Popover`, `Tooltip`, `DropdownMenu`, `ContextMenu`, `HoverCard`,
   `AlertDialog`), **form inputs** (`Input`, `Textarea`, `Select`,
   `Combobox`, `DatePicker`, `Checkbox`, `Switch`, `Radio`), **data display**
   (`DataTable`, `DataList`, `StatCard`).
2. For each family, list the prop name used by each component for:
   open-bool, open-change handler, default-open, value, onChange, disabled,
   required, error, loading, empty.
3. Count **sibling divergences** (concepts where ≥2 distinct names appear in
   the same family).

**Score.** 10 = 0 · 8 = 1 · 6 = 2–3 · 3 = 4–6 · 0 = ≥7.

## D4. Composition tree clarity ⚖️ 6%

Compound components (`Card` > `CardHeader` > `CardTitle`, `Dialog` >
`DialogContent` > `DialogFooter`) must have documented nesting rules.

**Recipe.** List compound families (any component exporting multiple pieces
sharing a name prefix). For each, check `llms.txt` for: (a) an annotated
tree or nesting snippet, (b) each sub-component's required parent, (c)
whether siblings can be rearranged. Ratio = families documented / total.

**Score.** `round(ratio × 10)`.

## D5. Variant/size/tone enumeration ⚖️ 5%

Every constrained-set prop has its complete value list in `llms.txt` — no
"and others."

**Recipe.** Grep `dist/types/*.d.ts` for enum/literal-union props on
exported components. For each enum, find the `llms.txt` section and verify
every value appears. Ratio = fully documented / total.

**Score.** `round(ratio × 10)`.

## D6. Controlled/uncontrolled clarity ⚖️ 5%

Each stateful component (takes `value`, `open`, `checked`, `selected`…)
declares explicitly: "controlled: pass `X` + `onXChange`" / "uncontrolled:
pass `defaultX`" / "controlled-only."

**Recipe.** List stateful components. For each, check for one of the three
explicit statements in `llms.txt`. Ratio = explicit / total.

**Score.** `round(ratio × 10)`.

## D7. Example diversity ⚖️ 6%

Each primitive ships **≥3 example shapes** — `basic`, `stateful`, and
`error / edge case`. One happy-path snippet teaches agents one pattern and
they apply it wrong elsewhere.

**Recipe.** For each primitive in `src/index.ts`, count distinct shapes in
`llms.txt` + `examples/` + `cookbook/`. Shape counts if it demonstrates a
materially different prop combination (not just different text).

**Score.** 10 = ≥90% of primitives have ≥3 shapes · 7 = 70% · 5 = 50% ·
0 = <30%.

## D8. Single canonical pattern per task ⚖️ 7%

Each common task has exactly one canonical way. Two valid ways without a
canonical marker = agent coin-flip.

**Recipe.** For the top-10 tasks from D1, count distinct snippets achieving
the task across all docs. For tasks with >1, check whether one is
explicitly marked canonical and others as "advanced" or "alternative".
Score = (tasks with exactly-one-canonical) / 10.

**Score.** `round(ratio × 10)`.

---

# STAGE C — VALIDATION & RUNTIME

## D9. Type inference + SSR markers ⚖️ 6%

Generics propagate through `forwardRef` and callbacks. Server-only and
client-only components are marked (`'use client'` directive or named
export convention).

**Recipe.**
1. List generic components. For each, write a 3-line scratch test —
   does `<DataTable<U>>` narrow `columns[].accessorKey` to `keyof U`?
2. List components touching browser-only APIs (`window`, `document`,
   portals, `useLayoutEffect` at module load). Do their files have
   `'use client'` at the top? Is it documented in `llms.txt` which
   components are client-only?
3. Ratio = (passing generics + marked client-only) / total required.

**Score.** `round(ratio × 10)`.

## D10. Setup explicitness ⚖️ 6%

Every required setup step (stylesheet, fonts, providers, FOUC script,
Tailwind config, peer deps) enumerated in one block.

**Recipe.** Read the source for every `import`, every required provider,
every head-level side effect. Cross-reference with `AGENTS.md` / top of
`llms.txt`. Ratio = documented / required.

**Score.** `round(ratio × 10)`. **Cap: any missing step → max 5.**

## D11. A11y defaults ⚖️ 5%

Interactive components set their own `role`, `aria-*`, focus trap,
`aria-live` — without consumer intervention.

**Recipe.** List interactive components. Read source: are attributes set
automatically? Any modal-class component needs focus trap by default.
Ratio = a11y-complete / total interactive.

**Score.** `round(ratio × 10)`. **Cap: any modal without focus trap → max 6.**

## D12. Copy-paste runnability ⚖️ 8%

Every `llms.txt` snippet renders verbatim in a fresh app (post-setup).
No pseudocode, no `...`, no hallucinated exports.

**Recipe.** Extract every code block. Check imports resolve against
`src/index.ts`. Check no `...` placeholder. Check method names exist.
Ratio = runnable / total.

**Score.** `round(ratio × 10)`. **Cap: any hallucinated export → max 40.**

---

# STAGE D — DEBUG & ITERATE

## D13. Error legibility & self-correction ⚖️ 8%

Runtime errors name (a) the component, (b) the missing/wrong prop, and
(c) a fix link. Generic React errors (`Cannot read 'map' of undefined`)
burn an agent iteration.

**Recipe.**
1. Grep source for `throw new Error(...)`, `throw new TypeError(...)`,
   `invariant(...)`, `assert(...)`.
2. For each, does the message contain module name, specific input/prop
   name, and a fix suggestion or doc link?
3. Ratio = good errors / total explicit throws.
4. Additionally: check component `displayName`. Every `forwardRef` /
   `memo` export should have `.displayName` set. Anonymous
   `ForwardRef(Anonymous)` in React DevTools hurts agent debugging.

**Score.** `round(ratio × 10)`.

## D14. Customization escape hatches ⚖️ 5%

Interactive components expose **standard** escape hatches:
- `className` passthrough
- `asChild` / slot override
- `ref` forwarded
- Style tokens as CSS vars (for theme-level overrides)

**Recipe.** For each interactive component, check how many of the four
escape hatches are supported. Average per component. Score =
(total supported hatches) / (4 × component count).

**Score.** `round(ratio × 10)`.

---

# STAGE E — EVOLVE & INTEGRATE

## D15. Evolution discipline ⚖️ 5%

Semver respected. Deprecated exports live as aliases for ≥1 minor.
Major bumps ship a codemod (`jscodeshift` script or written migration
guide with exact sed commands). Training-data stability: code generated
against version N still works against version N+1.

**Recipe.**
1. Read `CHANGELOG.md`. For each major bump, is there a migration guide?
2. For each minor bump, are removed exports preserved as deprecated
   aliases?
3. Any `codemod/` or `migrations/` folder? Ratio = breaking changes with
   migration path / total breaking changes.

**Score.** `round(ratio × 10)`.

## D16. Ecosystem integration ⚖️ 5%

Explicit examples or guides for:
- React Hook Form (or form library)
- TanStack Query / SWR (data fetching)
- Next.js App Router ('use client' boundaries)
- React Testing Library / Playwright
- i18n library (e.g. next-intl, react-i18next)
- Zod / Yup (validation)

**Recipe.** For each of the six, find one working example or guide.
Ratio = covered / 6.

**Score.** `round(ratio × 10)`.

## D17. Agent-native assets ⚖️ 4%

Artifacts that exist specifically for agents:
- `llms.txt` present, current, **≤15k tokens** (fits in context)
- `AGENTS.md` with always-do / never-do rules
- Cursor rules / `.cursor/rules/*.mdc`
- Claude Code skill or slash command
- MCP server (e.g. for live component metadata)
- Figma Code Connect mappings (if design system exists)

**Recipe.** Count which of the six exist and are current. Ratio =
present / 6.

**Score.** `round(ratio × 10)`.

---

## Weighted summary

| # | Dimension | Stage | Weight |
|---|---|---|---:|
| 1  | Component pickability           | A | 7% |
| 2  | Decision guidance               | A | 4% |
| 3  | Prop predictability             | B | 8% |
| 4  | Composition tree clarity        | B | 6% |
| 5  | Variant enumeration             | B | 5% |
| 6  | Controlled/uncontrolled         | B | 5% |
| 7  | Example diversity               | B | 6% |
| 8  | Single canonical pattern        | B | 7% |
| 9  | Type inference + SSR markers    | C | 6% |
| 10 | Setup explicitness              | C | 6% |
| 11 | A11y defaults                   | C | 5% |
| 12 | Copy-paste runnability          | C | 8% |
| 13 | Error legibility                | D | 8% |
| 14 | Escape hatches                  | D | 5% |
| 15 | Evolution discipline            | E | 5% |
| 16 | Ecosystem integration           | E | 5% |
| 17 | Agent-native assets             | E | 4% |
|    | **Total**                       |   | **100%** |

**Final score** = `Σ(score × weight%) × 10` → 0–100 scale.

---

## Score bands

| Band | Range | Meaning |
|---|---|---|
| 🔴 Not agent-ready | 0–40 | Agent-generated JSX breaks on most tasks. Manual correction every time. |
| 🟠 Agent-usable with babysitting | 40–65 | Common tasks work. Specialized components need manual lookup. |
| 🟡 Agent-friendly | 65–85 | Most generated JSX works first try. Edge cases need supervision. |
| 🟢 Agent-native | 85–100 | Reference-grade. Agents produce correct code end-to-end. |

---

## Anti-pattern caps

| Anti-pattern | Cap |
|---|---:|
| Any `llms.txt` snippet references a non-existent export | 40 |
| Any required setup step undocumented | 50 |
| Any modal-class component ships without focus trap | 60 |
| Two valid ways to do a top-5 task without canonical marker | 70 |
| Generic component whose `T` doesn't propagate to callbacks | 75 |
| Interactive component missing baseline a11y | 80 |
| `llms.txt` absent OR >30k tokens | 70 |
| No `displayName` on forwardRef'd components | 85 |

---

## How to apply

1. Read this file in full.
2. Read the package source + all docs.
3. Score each dimension — show the count, show the math.
4. Apply anti-pattern caps **after** the weighted sum.
5. Report: `<weighted>/100` with any cap noted separately.
6. Same package, re-run → ±3 points.

---

## Score block (for package README)

Every package README should end with:

```markdown
## Agent Clarity Benchmark

**Score: 78/100 — 🟡 Agent-friendly**
*Last scored: 2026-04-16 (by Claude)*
*Rubric: AGENT_CLARITY_BENCHMARK.md v2*

| Stage | Score | Weight |
|---|---:|---:|
| A. Discovery     | 7.5/10 | 11% |
| B. Generation    | 6.8/10 | 37% |
| C. Validation    | 8.0/10 | 25% |
| D. Debug         | 5.0/10 | 13% |
| E. Evolution     | 6.2/10 | 14% |

**Gaps to 90+:**
- Add "when to use / when not to use" blocks (D2)
- Rename `Combobox.onSelect` → `onChange` w/ alias (D3)
- Add codemod for 1.5→2.0 rename (D15)
```

---

## How to extend

When a new agent failure mode surfaces, add a dimension. Requirements:

- Name + 1-line description
- How-to-measure recipe resolving to count/ratio
- The real UI bug it catches (past-tense, concrete)
- Which stage it belongs to (A–E)
- A weight that comes out of the existing 100%

Don't add dimensions that score "general code quality" (test coverage,
linting, bundle size). This rubric is only about **agent consumability
of the public surface, across the full workflow loop**.

---

*Version 2.0 — 2026-04-16*
*v1 (10 dims, generation-stage only) superseded.*
*Sibling to `@bloomneo/appkit/docs/AGENT_DEV_SCORING_ALGORITHM.md` —
that rubric scores backend packages; this one scores UI packages.*
