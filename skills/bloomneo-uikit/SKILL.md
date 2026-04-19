---
name: bloomneo-uikit
description: Rules for generating React code with @bloomneo/uikit — components, layouts, themes, and forms. Applies when the project's package.json has "@bloomneo/uikit" as a dependency, or when the user mentions uikit, bloomneo, voilajsx, or files import from "@bloomneo/uikit". Also triggers for "uikit init", "uikit generate", or any `npx uikit` command.
version: 2.1.1
user-invocable: false
allowed-tools: Bash(npx uikit *), Bash(pnpm dlx uikit *), Bash(bunx --bun uikit *)
---

# @bloomneo/uikit (v2.1.1)

React component library with components, layouts, themes, routing, and
scaffolding. Built on Radix + Tailwind + cva. Web-first (React DOM); ships
platform-detection helpers (`isTauri()`, `isNative()`, etc.) but not full
native/Tauri/extension component adapters. Previously published as `@voilajsx/uikit`.

> **IMPORTANT:** Read `node_modules/@bloomneo/uikit/llms.txt` for the full component API reference. Read `AGENTS.md` in the project root for do/don't rules. This skill is the fastest way in; those two files are canonical.

## Critical Rules

These are always enforced. Violating them produces broken apps.

### Setup

- **Exactly one import path.** `import { X } from '@bloomneo/uikit'`. Never `@bloomneo/uikit/button` in hand-written code (only bundlers use deep imports).
- **Exactly one CSS import.** `import '@bloomneo/uikit/styles'` once at app entry.
- **Exactly one provider tree.** Mount `ThemeProvider` > `ToastProvider` (self-closing, sibling) + `ConfirmProvider` (wraps children). `ToastProvider` and `ConfirmProvider` must each appear exactly once — duplicates fire dev-only `warnInDev` and produce doubled behavior in prod.
- **FOUC script required.** Inject `<script>{foucScript()}</script>` from `@bloomneo/uikit/fouc` into `index.html` `<head>` or themes flash on load.
- **Never `@voilajsx/uikit`.** Old deprecated scope, frozen at 1.4.0.

### Controlled props — the #1 agent failure mode

Every stateful component uses a specific value + handler pair. Using the wrong handler = silent failure. The cheat sheet in `llms.txt` ("Controlled prop cheat sheet" section) is canonical. Shortcut:

| Component family | Value prop | Change handler |
|---|---|---|
| Native inputs (`Input`, `Textarea`, `PasswordInput`) | `value` | `onChange` (ChangeEvent) |
| Radix form (`Select`) | `value` | `onValueChange` (string) |
| Radix checkable (`Checkbox`, `Switch`, `RadioGroup`) | `checked` / `value` | `onCheckedChange` / `onValueChange` |
| Overlays (`Dialog`, `Sheet`, `Popover`) | `open` | `onOpenChange` |
| Searchable (`Combobox`) | `value` | `onValueChange` (string \| undefined) |

### Component picking

- **Forms:** wrap inputs in `<FormField>` — never raw `<Label>` + `<Input>`.
- **Tables:** `<DataTable>` for sort/search/pagination; raw `<Table>` only for fully custom layouts.
- **Confirms:** `useConfirm()` (promise-based) for delete flows — never manage `<Dialog>` open state manually.
- **Toasts:** `toast.success()` / `toast.error()` — never custom toast UI.
- **Slide-in panels:** `<Sheet side="right">` — no `<Drawer>` component exists.
- **Empty lists:** `<EmptyState>` — not ad-hoc placeholder divs.
- **Password fields:** `<PasswordInput>` — not `<Input type="password">`.

### Layouts (one per route)

| Use case | Component |
|---|---|
| Dashboard / SaaS | `<AdminLayout>` with `.Header`, `.Sidebar`, `.Content` |
| Marketing / landing | `<PageLayout>` with `.Header`, `.Content`, `.Footer` |
| Login / signup | `<AuthLayout scheme="card">` |
| Mobile (Capacitor) | `<MobileLayout>` |
| Browser extension | `<PopupLayout>` |
| Custom / blank | `<BlankLayout>` |

### Styling

- **Semantic tokens only.** `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`. Never raw colors (`bg-blue-500`, `text-white`) — they break when the theme changes.
- **`cn()`** from `@bloomneo/uikit` for conditional classes — not template literal ternaries.
- **No manual `z-index`** on overlays — Dialog, Sheet, Popover manage their own stacking.
- **Theme customization** → see [rules/theming.md](./rules/theming.md) for OKLCH, custom theme CLI, dark-mode rules, and FBCA paths.
- **Scaffolding, folder structure, FBCA routing, deploy** → see [rules/scaffolding.md](./rules/scaffolding.md).

### DataTable — the other #1 agent failure mode

- **`data` prop never undefined.** Pass `[]` while loading: `data={users ?? []}`. Passing undefined throws `UIKitError` with a doc URL.
- **Every column needs a unique `id`.** React key warnings compound otherwise.
- **Generic signature:** `<DataTable<User> data={users} columns={cols} />`.

## Key Patterns

```tsx
// Setup — correct provider tree
<ThemeProvider theme="base" mode="light">
  <ToastProvider />        {/* self-closing, sibling */}
  <ConfirmProvider>        {/* wraps children */}
    <App />
  </ConfirmProvider>
</ThemeProvider>

// Form field — always wrap inputs
<FormField label="Email" required error={errors.email}>
  <Input value={email} onChange={e => setEmail(e.target.value)} />
</FormField>

// Confirm before destructive action
const confirm = useConfirm();
const ok = await confirm({
  title: 'Delete user?',
  description: 'This cannot be undone.',
  tone: 'destructive',
});
if (ok) await deleteUser(id);

// DataTable with loading guard
<DataTable<User>
  data={users ?? []}
  columns={[
    { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
    { id: 'email', header: 'Email', accessorKey: 'email' },
  ]}
/>

// Combobox — same onValueChange as Select (unified in 2.0.0)
<Combobox
  value={country}
  onValueChange={setCountry}
  options={countries}
/>
```

## Incorrect / Correct pairs

```tsx
// ❌ Select with onChange (silent failure)
<Select value={v} onChange={setV} />
// ✅ Select with onValueChange
<Select value={v} onValueChange={setV} />

// ❌ Combobox with onChange (pre-2.0 API — removed in 2.0.0, no alias)
<Combobox value={v} onChange={setV} />
// ✅ Combobox with onValueChange (same shape as Select)
<Combobox value={v} onValueChange={setV} />

// ❌ Input / Textarea / PasswordInput with onValueChange (React-DOM expects onChange)
<Input value={email} onValueChange={setEmail} />
// ✅ Input with onChange (ChangeEvent)
<Input value={email} onChange={e => setEmail(e.target.value)} />

// ❌ ToastProvider wrapping children (ToastProvider accepts no children)
<ThemeProvider>
  <ToastProvider>
    <App />
  </ToastProvider>
</ThemeProvider>
// ✅ ToastProvider as self-closing sibling
<ThemeProvider>
  <ToastProvider />
  <App />
</ThemeProvider>

// ❌ DataTable with undefined during loading
<DataTable data={users} columns={cols} />  // users may be undefined
// ✅ DataTable with [] fallback
<DataTable data={users ?? []} columns={cols} />

// ❌ Manual dialog for confirmation
const [open, setOpen] = useState(false);
<Dialog open={open} onOpenChange={setOpen}>…</Dialog>
// ✅ Promise-based useConfirm
const ok = await confirm({ title: 'Sure?', tone: 'destructive' });

// ❌ Hardcoded theme color
<div className="bg-blue-500 text-white">…</div>
// ✅ Semantic tokens
<div className="bg-primary text-primary-foreground">…</div>
```

## Component Selection

| Need | Use |
|---|---|
| Button / action | `Button` with `variant` (`default` / `destructive` / `outline` / `secondary` / `ghost` / `link`) |
| Text input | `Input` inside `FormField` |
| Password input | `PasswordInput` |
| Dropdown (static short) | `Select` |
| Dropdown (searchable / 10+ options) | `Combobox` |
| Action menu from button | `DropdownMenu` |
| Command palette (Cmd+K) | `CommandDialog` |
| Yes/No confirmation | `useConfirm()` |
| Centered modal | `Dialog` |
| Slide-in panel | `Sheet side="right"` |
| Hover preview (rich) | `HoverCard` |
| Hover hint (text) | `Tooltip` |
| Click popover | `Popover` |
| Transient notification | `toast.success()` / `toast.error()` |
| Persistent banner | `Alert` |
| Table with sort/filter/paginate | `DataTable` |
| Empty state | `EmptyState` |
| Loading placeholder | `Skeleton` |
| Page header w/ breadcrumbs | `PageHeader` |
| Role-gated UI | `PermissionGate` |

## CLI

```bash
npx uikit create <name>              # scaffold new project
npx uikit generate theme <name>      # create custom theme
npx uikit generate feature <name>    # scaffold feature folder (FBCA)
npx uikit bundle                     # compile custom themes to CSS
npx uikit serve                      # dev server
npx uikit build                      # production build
npx uikit deploy --github            # GitHub Pages
```

Full reference (templates, folder structure, FBCA auto-routing, deploy options): [rules/scaffolding.md](./rules/scaffolding.md).

Substitute `pnpm dlx uikit` or `bunx --bun uikit` based on the project's `packageManager`.

## Hooks & Utilities

- `useTheme()` — get/set theme and mode
- `useConfirm()` — promise-based confirmation
- `useMediaQuery()`, `useBreakpoint()`, `useActiveBreakpoint()` — responsive
- `useApi()` — data fetching
- `useLocalStorage()` — persistent state
- `formatCurrency()`, `formatNumber()`, `formatDate()`, `timeAgo()`, `formatBytes()`

## Client-only components

In Next.js App Router, add `"use client"` to files that use:
Dialog, Sheet, Popover, Tooltip, HoverCard, DropdownMenu, ConfirmDialog, Toast / ToastProvider, Command / CommandDialog, Combobox, Tabs, Accordion, Collapsible, Calendar, ThemeProvider.

## Workflow

1. **Read canonical docs first.** `node_modules/@bloomneo/uikit/llms.txt` has full per-component API + controlled-prop cheat sheet. Repo `AGENTS.md` has do/don't rules.
2. **Check providers.** Before adding `toast.*` or `useConfirm()`, verify `<ToastProvider />` / `<ConfirmProvider>` are mounted at app root.
3. **Check component source.** Every component in `src/components/ui/*.tsx` opens with `@llm-rule WHEN:` / `@llm-rule AVOID:` / `@llm-rule NOTE:` JSDoc. Read the header before guessing API shape.
4. **Trust runtime errors.** `UIKitError` messages embed `docsUrl` — follow it. Don't catch and ignore.
5. **Check cookbook.** `cookbook/` has end-to-end feature recipes (settings page, dashboard, auth flow).

## Full docs

- API reference: `node_modules/@bloomneo/uikit/llms.txt` (or `llms.txt` in repo root)
- Do/don't rules: `AGENTS.md` (repo root)
- Theming (OKLCH, CLI, dark mode): [rules/theming.md](./rules/theming.md)
- Cursor rules: `.cursor/rules/uikit.mdc`
- Recipes: `cookbook/` folder
- Examples: `examples/` folder
- GitHub: https://github.com/bloomneo/uikit
