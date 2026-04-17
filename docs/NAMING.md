# Naming Policy — `@bloomneo/uikit`

**Status:** stable within the 1.x line. Any rename after 1.5.1 without an
alias requires a major version bump.

This document defines the conventions every component, hook, and utility
in `@bloomneo/uikit` follows. The goal is **predictability for LLM agents
and human developers**: when an agent reads one component's API, the
patterns it learns transfer cleanly to the next one. Inconsistency is
the #1 source of agent misuse.

This is the React-library companion to `@bloomneo/appkit`'s
[`docs/NAMING.md`](../../appkit/docs/NAMING.md). Backend and frontend
naming rules are kept separately because the idioms differ (React uses
PascalCase components; Node uses camelCase entry classes).

---

## Table of Contents

- [Component Exports](#component-exports)
- [Hook Exports](#hook-exports)
- [Controlled Prop Convention](#controlled-prop-convention)
- [Callback Naming](#callback-naming)
- [Variant / Size Props](#variant--size-props)
- [Ref Forwarding](#ref-forwarding)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Forbidden Patterns](#forbidden-patterns)
- [Component Picker (Decision Tree)](#component-picker-decision-tree)

---

## Component Exports

- **PascalCase** for every component: `Button`, `DataTable`, `ThemeProvider`.
- **One component per file** under `src/components/ui/<kebab-name>.tsx`.
  `src/components/ui/data-table.tsx` exports `DataTable`.
- **Re-exported from `src/index.ts`** as named exports — never default.
- **Compound components** export their subparts alongside the root:
  `Card, CardHeader, CardTitle, CardContent, CardFooter`. Always PascalCase.
- **No bare-noun utility names.** A file named `toast.tsx` may export the
  `<Toaster>` component + the `toast.*` function API + the `useToast()`
  hook — all three identifiable, none ambiguous.

**Forbidden:**
- Default exports in new components (breaks tree-shaking + agent predictability)
- Lowercase component names (`button` → must be `Button`)
- Prefixes like `UIButton` / `BloomButton` — the package scope is the namespace

---

## Hook Exports

- Every hook name starts with `use` and the first letter after it is
  uppercase: `useApi`, `useConfirm`, `useBreakpoint`.
- **One hook per file** under `src/hooks/<use-name>.ts`.
- **Return shape is an object when >1 value**, a single value when the
  hook returns only one thing:
  ```ts
  useMediaQuery('(min-width: 768px)')   // → boolean (single value)
  useApi<User>()                         // → { data, loading, error, get, post, ... }
  useBreakpoint()                        // → 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  ```
  Never return tuples (`[value, setValue]`) for new hooks — object keys
  are self-documenting and let agents destructure what they need.
- **`is`/`has`/`can` prefixes** for boolean predicates inside hook returns:
  `{ isLoading, hasError, canSubmit }`. Not `{ loading, error }` unless the
  value is the error itself, not a boolean flag.

**Forbidden:**
- Tuple-return hooks in NEW code (existing `useLocalStorage` is grandfathered)
- Non-pure hooks that write to DOM at render time (must be in useEffect)

---

## Controlled Prop Convention

Every form-input component follows one of these shapes:

| Pattern | Applies to | Example |
|---|---|---|
| `value` + `onChange` | Custom components | `Input`, `Textarea`, `Combobox` |
| `value` + `onValueChange` | Radix-backed | `Select`, `Slider`, `Tabs`, `Accordion` |
| `checked` + `onCheckedChange` | Radix booleans | `Checkbox`, `Switch`, `Toggle` |
| `open` + `onOpenChange` | Radix overlays | `Dialog`, `Sheet`, `Popover`, `HoverCard` |

**The `onChange` vs `onValueChange` split is deliberate** — Radix
components inherit `onValueChange` from the underlying Radix primitive;
custom components use `onChange` because that's the React-DOM idiom for
input-like elements. When in doubt:

- Wrapping a Radix primitive? Use whatever Radix uses.
- Building from scratch or from cmdk? Use `onChange`.

---

## Callback Naming

- **`on<Event>`** — fires when something happens: `onClick`, `onSubmit`,
  `onValueChange`, `onBlur`.
- **`on<Event>Change`** — fires when a state changes: `onValueChange`,
  `onOpenChange`, `onCheckedChange`. Present tense, not past.
- **No `handle<Event>` / `get<Event>` callback names** — those are
  local variable names, not props.

---

## Variant / Size Props

Every visual variant uses `variant`. Every size uses `size`.
Values are kebab-case strings (not enums, not numbers):

```tsx
<Button variant="default" size="sm" />
<Button variant="destructive" size="lg" />
<Badge variant="outline" />
```

Allowed `variant` values per component are defined in the component's
CVA config. If you need a new variant, extend the CVA config — don't
ship a parallel prop.

**Forbidden:**
- `kind`, `type`, `appearance`, `style` as variant synonyms
- `small` / `medium` / `large` — use `sm` / `md` / `lg`
- Numeric sizes (`size={3}`)

---

## Ref Forwarding

Every component that renders an underlying DOM element forwards the ref
to that element:

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)
export const Input = forwardRef<HTMLInputElement, InputProps>(...)
```

- **The ref always targets the OUTER DOM element** (the one a consumer
  would want to focus, scroll, or measure).
- **Generic components** (e.g. `DataTable<T>`) must preserve the generic
  through the forwardRef — see `src/components/ui/data-table.tsx` for
  the canonical generic-forwardRef recipe.

---

## Error Handling

- Every runtime error thrown from a component uses `UIKitError` (from
  `src/lib/errors.ts`). Never `new Error(...)`, never `throw 'string'`.
- Format is enforced by the `UIKitError` constructor:
  ```
  [@bloomneo/uikit] <Component> <message>
  See: https://bloomneo.github.io/uikit/llms#<component-slug>
  ```
- `scripts/check-readme-anchors.ts` verifies every slug resolves to a
  real heading in `llms.txt`.
- Use `requireProp()` / `requireArrayProp()` at the top of component
  bodies to validate inputs before any render work.
- Use `warnInDev()` for soft validation (development-only console.warn).
  Never `console.warn` directly — consumers can't filter that.

**Forbidden:**
- Throwing bare `Error` / `TypeError`
- Silent prop validation (just logging or ignoring)
- Errors pointing at docs URLs that aren't validated

---

## Environment Variables

UIKit components read very few env vars. When they do, the convention is:

- `VITE_*` for Vite-specific (build-time) config read via `import.meta.env`
- Never read `process.env.*` at component render time — SSR breaks
- Every env var the package reads must be documented in both `llms.txt`
  and the relevant component's JSDoc

---

## Forbidden Patterns

1. **Default exports on components.** Always named exports. Default
   exports break tree-shaking and make agent imports ambiguous.
2. **Module-import side effects beyond CSS.** `import '@bloomneo/uikit'`
   must not open connections, register globals, or do DOM work. CSS
   imports are the ONE exception (they're marked in `"sideEffects"`).
3. **Bare `console.warn` / `console.error` at runtime.** Use
   `warnInDev()` / `UIKitError` so consumers can filter or catch.
4. **Mixing `onChange` and `onValueChange` for the same component.**
   Pick one based on the rule above and stick with it.
5. **Components that throw at render time from hooks.** Use
   `useEffect` + state for async work; throwing from render crashes
   the error boundary.

---

## Component Picker (Decision Tree)

When an agent needs to pick a component, this tree resolves the choice:

### Overlay with a "close" affordance?
- **Full-height side drawer** → `Sheet`
- **Centred modal with a form inside** → `Dialog`
- **Content triggered on hover, no interaction** → `HoverCard`
- **Short text bubble on hover** → `Tooltip`
- **Interactive content anchored to a trigger** → `Popover`
- **List of actions from a ⋯ / ▼ button** → `DropdownMenu`

### Confirmation (user must click Yes/No)?
- **Destructive or high-stakes** → `useConfirm()` — promise-based
- **Low-stakes custom UI** → `Dialog` with your own buttons

### Notification?
- **One-shot success / failure** → `toast.success` / `toast.error`
- **Persistent banner at top of page** → `Alert`
- **Empty state within a list / page** → `EmptyState`

### Form input?
- **Wrap in `FormField`** (supplies label, error message, a11y wiring)
- **Single-value select** → `Select` (onValueChange) or `Combobox` (onChange, with search)
- **Multi-line** → `Textarea`
- **Boolean** → `Checkbox` or `Switch`
- **Range** → `Slider`

### Data display?
- **Rows with sort/filter/paginate/actions** → `DataTable`
- **Just a table with no features** → `Table` primitives
- **Statistic card** → `Card` + `CardContent`
- **Loading placeholder** → `Skeleton`

### Role-based UI?
- **Gate a subtree** → `PermissionGate when="admin">…</PermissionGate>`
- **Gate an event handler** → `usePermission()("admin") ? handler() : null`

### Responsive logic?
- **Named breakpoints** → `useBreakpoint()` returns `'sm'|'md'|...`
- **Arbitrary media query** → `useMediaQuery('(min-width: 900px)')`
- **Never** write your own `window.addEventListener('resize', ...)`

---

## Version

- **v1.0** — 2026-04-17. Initial naming policy, adapted from
  `@bloomneo/appkit@4.0.0`'s NAMING.md + documented observed
  conventions in the uikit source.

Any rename after this point that breaks the `@bloomneo/uikit@1.5.1`
public API requires a major version bump.
