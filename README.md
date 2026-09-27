# Bloomneo UIKit

[![npm version](https://img.shields.io/npm/v/@bloomneo/uikit.svg)](https://www.npmjs.com/package/@bloomneo/uikit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![AI Ready](https://img.shields.io/badge/AI-Optimized-purple.svg)](https://github.com/bloomneo/appkit)

> Bloomneo makes business apps safe, consistent and maintainable, however much
> of the code AI writes. UIKit is its curated component library for business
> apps.

A deliberately small set of typed React components, one locked token palette,
the signed-in app frame (`AppShell`), file-based page routing
(`@bloomneo/uikit/router`) and data hooks for route contracts
(`@bloomneo/uikit/data`), with a generated `llms.txt` that agents read first.
Tailwind's default palette is removed, so the only colours that compile are the
semantic ones — which is what keeps a generated codebase looking like one
product instead of thirty.

UIKit is a **library, not a framework**: it does not scaffold apps. For that,
use [`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom), which
wires UIKit and AppKit together. Upgrading from 4.x? Read
[`MIGRATION-6.md`](./MIGRATION-6.md).

## For AI coding agents

Read [`AGENTS.md`](./AGENTS.md) first (always-do / never-do rules), then
[`llms.txt`](./llms.txt) for per-component snippets. The llms.txt is the
canonical machine-readable index of every export, every example, and every
composed pattern in this package. It is regenerated on every build from
`src/index.ts`, [`examples/`](./examples), and [`cookbook/`](./cookbook),
so it never drifts.

**One canonical import path:**

```ts
import { Button, DataTable, FormField, useConfirm, toast } from '@bloomneo/uikit';
```

Deep imports like `@bloomneo/uikit/button` exist for build-size optimisation
but agents should always use the flat import above when generating code. The
two exceptions are entries that exist only as subpaths, so the flat entry never
pulls in a router:

```ts
import { PageRouter } from '@bloomneo/uikit/router';       // needs react-router-dom
import { useQuery, useMutation } from '@bloomneo/uikit/data';
```

**Required setup:**

```ts
import '@bloomneo/uikit/styles';                  // the themed palette

import {
  ThemeProvider,
  ToastProvider,
  ConfirmProvider,
} from '@bloomneo/uikit';

<ThemeProvider theme="base" mode="light">
  <ToastProvider />
  <ConfirmProvider>
    <App />
  </ConfirmProvider>
</ThemeProvider>
```

For SSR / FOUC prevention, drop the inline script from
`@bloomneo/uikit/fouc → foucScript()` into your `index.html` `<head>` so the
theme classes are on `<html>` before React mounts.

## Why Choose @bloomneo/uikit?

**🤖 For AI coding agents**

- **Generated `llms.txt`**: one canonical, machine-readable index of every export and every example — regenerated on every build from `src/index.ts`, `examples/`, and `cookbook/`, so it cannot drift.
- **Zero `any` in public types**: full generic inference for `DataTable<User>`, `RowAction<User>`, formatters, hooks.
- **One copy-pasteable example per primitive**: minimal `.tsx` files in `examples/` plus 5 composed page recipes in `cookbook/`. Agents pattern-match instead of inventing prop shapes.
- **Educational runtime errors**: misuse a component and you get `[@bloomneo/uikit] <DataTable> expects \`data\` to be an array …`. Agents read errors and self-correct.

**🎨 For design consistency**

- **The palette is the enforcement.** `bg-blue-600` compiles to nothing; `bg-primary` works. A rule that only lives in documentation gets bypassed at the rate the codebase grows — see [The palette is locked to your theme](#the-palette-is-locked-to-your-theme-30).
- **Dark mode included**, driven by the same tokens.
- **Custom themes** are a few CSS token overrides — see [Custom themes](#custom-themes).

**🚀 For rapid development**

- **Drop-in app primitives**: `<AppShell>`, `<DataTable>`, `<FormField>`, `<ConfirmDialog>` (promise-based), `<ToastProvider>`, `<EmptyState>`, `<PageHeader>`, `<PermissionGate>` — the things every business app rebuilds by hand, shipped once.
- **Page routing and contract data hooks**: `PageRouter` maps `features/*/pages/**` to URLs; `useQuery` / `useMutation` call bloom route contracts with types taken from the contract.
- **Hooks and a formatters module** so pages stay declarative.

**🔧 For maintainability**

- **Semantic colors**: themes switch automatically — no hardcoded styles to break.
- **Future-proof**: Tailwind CSS v4, Radix UI, React 19 ready.

## Quick Start

**Two Ways to Use UIKit:**

**📦 As a Library** — install into an existing React project (Next.js, Vite, Remix, CRA, etc):

```bash
npm install @bloomneo/uikit
```

Then import everything from the canonical entry point:

```ts
import { Button, Card, DataTable, FormField, useConfirm, toast } from '@bloomneo/uikit';
import '@bloomneo/uikit/styles';
```

> **Canonical import path:** always `from '@bloomneo/uikit'`. Deep imports like `@bloomneo/uikit/button` exist for build-size optimisation but are non-canonical — humans and AI agents should use the flat form. This is documented as the rule in [`llms.txt`](./llms.txt).

**🚀 Complete Project Setup** — UIKit does not scaffold applications. Use
[`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom), which wires
UIKit, AppKit and the FBCA convention into one CLI:

```bash
npx @bloomneo/bloom create myapp
cd myapp && npm run dev
```

## Framework Architecture

**@bloomneo/uikit** is built on **ShadCN components** and **Tailwind CSS v4**, curated for business apps: one component per job, plus the app frame, routing and data hooks every app used to rebuild.

## 1. Components

### Components

| Category               | Components                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| **Form & Input**       | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Combobox, **FormField, PasswordInput** |
| **App primitives** ⭐  | **AppShell, DataTable, PageHeader, EmptyState, ConfirmDialog, ConfirmProvider, ToastProvider, PermissionGate** |
| **Display**            | Card, Badge, Alert, Tabs, Table                                            |
| **Navigation & menu**  | DropdownMenu                                                               |
| **Overlay & modal**    | Dialog, Sheet, Popover, Tooltip                                            |
| **Feedback**           | Toast, Toaster (Sonner)                                                    |

### Hooks & utilities

`useConfirm` · `useToast` · `useTheme` · `useMediaQuery` · `useBreakpoint` ·
`useActiveBreakpoint` · `useDataTable` (headless) · `useApi` · `usePermission`

`formatCurrency` · `formatNumber` · `formatDate` · `timeAgo` · `formatBytes` ·
`Time` · `foucScript` · `foucScriptTag` · `cn`

### Subpath entries

| Entry | Exports |
|---|---|
| `@bloomneo/uikit/router` | `PageRouter`, `pathFromFile`, `discoverRoutes`, types `RouteLayout`, `PageRouterProps`, `PageGlob`, `DiscoveredRoute` |
| `@bloomneo/uikit/data` | `useQuery`, `useMutation`, types `QueryState`, `QueryOptions`, `MutationState`, `ContractLike`, `ClientLike`, `ResponseOf` |

See [App shell, routing and data](#app-shell-routing-and-data).

### Layouts

UIKit's old layout components were removed in 4.0 and are not coming back. For the
signed-in part of an app, use `AppShell`; everything else is a layout route in
your app that renders pages through an `<Outlet />`, with each page owning its
`<PageHeader>`.

## 2. Advanced Theming System

One bundled theme (`base`), which you brand with a few CSS token overrides. Built on OKLCH color science with automatic light/dark mode support and semantic color variables that work across all components.

**Note**: Instead of hardcoded colors like `bg-white` or `text-black`, use semantic color classes like `bg-background`, `text-foreground`, `border-border`. These automatically adapt to your selected theme and work perfectly in both light and dark modes.

### The palette is locked to your theme (3.0)

`@bloomneo/uikit/styles` ships **only** the semantic tokens. Tailwind's default
palette is removed, so `bg-blue-600` compiles to nothing while `bg-primary`
works normally.

| Class | `/styles` (default) | `/styles/permissive` |
|---|:--:|:--:|
| `bg-primary`, `text-muted-foreground`, `bg-card` | ✅ | ✅ |
| `bg-blue-600`, `text-gray-900`, `border-red-400` | 🚫 | ✅ |

**Why this is the default.** The theme system was this library's headline
feature and its least-used part. One production app accumulated **1,547
hardcoded palette classes against 196 semantic ones**; another 209 against 74.
Not carelessness — both were equally available and the raw palette needed no
lookup. A rule that lives only in documentation gets bypassed at the rate the
codebase grows.

Removing the alternative is the only version of the rule that holds, and it
asks very little: not "adopt our component library", just "use the one class
that exists". A mistake surfaces immediately as an unstyled element instead of
drift nobody notices until the brand stops matching itself.

### Which import do you need?

This matters, and it is easy to get wrong: **a prebuilt stylesheet cannot
constrain your build.** If your app runs its own `@import "tailwindcss"` — every
Bloom template does — then your Tailwind generates whatever utilities your
source uses, `bg-blue-600` included, regardless of what uikit ships. The reset
only takes effect when it participates in the build that scans your code.

**If your app runs Tailwind (the normal case):**

```css
/* your index.css */
@import "tailwindcss";
@import "@bloomneo/uikit/theme";     /* tokens + the palette lockdown */
```

**If your app ships no build and just wants the prebuilt CSS:**

```ts
import "@bloomneo/uikit/styles";
```

**Migrating from 2.x?** Keep your existing colours working while you convert:

```ts
import "@bloomneo/uikit/styles/permissive";   // 2.x behaviour, temporary
```

Treat it as a migration aid with an end date.

### Themes

| Theme    | Style                | Font Family | Best For        |
| -------- | -------------------- | ----------- | --------------- |
| **base** | Clean metallic black | System UI   | Everything      |

4.0 removed the `elegant`, `metro`, `studio` and `vivid` presets. They were four
more palettes to keep consistent and near-zero projects switched to them — the
real case is one brand palette per product.

### Custom themes

Override the `base` theme's tokens in your own stylesheet, after the uikit
import. Light values go on `.theme-base`, dark values on `.theme-base.dark`:

```css
/* your index.css */
@import "tailwindcss";
@import "@bloomneo/uikit/theme";

.theme-base {
  --color-primary: #7c3aed;
  --color-primary-foreground: #ffffff;
  --color-ring: #7c3aed;
  --color-sidebar-primary: #7c3aed;
}
.theme-base.dark {
  --color-primary: #a78bfa;
  --color-primary-foreground: #1e1b4b;
  --color-ring: #a78bfa;
  --color-sidebar-primary: #a78bfa;
}
```

Every token is listed in `@bloomneo/uikit/theme` (`--color-background`,
`--color-card`, `--color-muted`, `--color-border`, `--color-chart1` …
`--color-chart5`, `--color-sidebar*`, and so on). Components pick the new
values up through the semantic classes; nothing else changes. (6.0 removed the
`uikit` CLI that used to generate theme presets.)

## 3. Project scaffolding — see @bloomneo/bloom

UIKit stopped scaffolding applications in 4.0. The `uikit create` command and
its `single` / `spa` / `multi` / `fbca` templates were removed: they duplicated
[`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom), and they were
built on the very layout chrome this release deleted.

```bash
npx @bloomneo/bloom create myapp
```

## Example Codes

📖 **For AI coding agents:** read [`llms.txt`](./llms.txt) — every export, every example, and every cookbook recipe in one machine-readable file.
📖 **For humans:** browse [`examples/`](./examples) for one-file-per-component snippets and [`cookbook/`](./cookbook) for whole-page recipes.

**Convention:** always import from `@bloomneo/uikit` (the canonical entry). Semantic Tailwind classes (`bg-background`, `text-foreground`, `border-border`) automatically adapt to the active theme — never hardcode colors.

### UI Component Examples

#### Card

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@bloomneo/uikit';

<Card>
  <CardHeader>
    <CardTitle>Product Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Product description here</p>
  </CardContent>
</Card>
```

#### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from '@bloomneo/uikit';

<Alert variant="default">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>
```

#### Form (FormField + PasswordInput)

```tsx
import { Button, FormField, Input, PasswordInput } from '@bloomneo/uikit';

<form className="flex max-w-sm flex-col gap-4">
  <FormField label="Email" required helper="We'll never share it">
    <Input type="email" />
  </FormField>
  <FormField label="Password" required>
    <PasswordInput />
  </FormField>
  <Button type="submit">Sign in</Button>
</form>
```

#### DataTable (type-safe, generic)

```tsx
import { DataTable, type DataTableColumn } from '@bloomneo/uikit';

type User = { id: string; name: string; email: string; role: 'admin' | 'user' };

const columns: DataTableColumn<User>[] = [
  { id: 'name',  header: 'Name',  accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role',  header: 'Role',  accessorKey: 'role' },
];

<DataTable<User> data={users} columns={columns} searchable pagination />
```

#### Confirmation (promise-based)

```tsx
import { Button, ConfirmProvider, useConfirm } from '@bloomneo/uikit';

function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const ok = await confirm({
          title: 'Delete this design?',
          description: 'This cannot be undone.',
          tone: 'destructive',
        });
        if (ok) /* delete */;
      }}
    >
      Delete
    </Button>
  );
}

// Wrap your app once:
// <ConfirmProvider><App /></ConfirmProvider>
```

#### Toast notifications

```tsx
import { Button, ToastProvider, toast } from '@bloomneo/uikit';

<ToastProvider position="bottom-right" />
<Button onClick={() => toast.success('Saved')}>Save</Button>
```

## App shell, routing and data

### AppShell — the signed-in app frame

A sidebar that collapses to an icon rail (remembered per browser), a header,
and the same navigation in a sheet on small screens. It is router-agnostic:
pass the current pathname and your router's link component.

```tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { AppShell, Button } from '@bloomneo/uikit';

export function DashboardLayout() {
  return (
    <AppShell
      brand={{ name: 'Acme', href: '/dashboard' }}
      nav={[
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { href: '/dashboard/users', label: 'Users', icon: Users, section: 'Admin' },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
      ]}
      currentPath={useLocation().pathname}
      linkComponent={({ href, ...rest }) => <Link to={href} {...rest} />}
      headerActions={<Button variant="ghost" size="sm">Sign out</Button>}
    >
      <Outlet />
    </AppShell>
  );
}
```

| Prop | |
|---|---|
| `brand` | `{ name, href?, mark? }` — `mark` defaults to the first letter of `name` |
| `nav` | `{ href, label, icon?, end?, section? }[]` — `end` for index routes; `section` starts a labelled group |
| `currentPath` | the current pathname; the matching item gets `aria-current="page"` |
| `linkComponent` | your router's link, receiving `{ href, className, children, onClick, aria-label, aria-current }`; defaults to `<a>` |
| `headerActions` | right side of the header |
| `sidebarFooter` | `(collapsed) => ReactNode`, bottom of the sidebar |
| `collapsible` | default `true` |
| `storageKey` | localStorage key for the collapsed state, default `'uikit:sidebar:collapsed'` |
| `navLabel` | accessible name of the nav landmark, default `'Main'` |

Guard the route that renders `AppShell`, not each page. Pages inside it own
their header:

```tsx
import { PageHeader, Button } from '@bloomneo/uikit';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users" actions={<Button>Invite</Button>} />
      <UsersTable />
    </div>
  );
}
```

### Page routing — `@bloomneo/uikit/router`

Files under `features/<name>/pages/` become URLs. The app passes its own
`import.meta.glob` (Vite resolves globs relative to the calling file, so it
cannot live in a library); the package owns the rest. Needs `react-router-dom`
(optional peer dependency, >= 6.20) and a `<BrowserRouter>` above it.

```tsx
import { BrowserRouter } from 'react-router-dom';
import { PageRouter, type RouteLayout } from '@bloomneo/uikit/router';

const pages = import.meta.glob(['./features/*/pages/**/*.{tsx,jsx}', '!**/_*.{tsx,jsx}', '!**/_*/**']);

const layouts: RouteLayout[] = [
  { match: (path) => path.startsWith('/dashboard'), Layout: DashboardLayout },
];

<BrowserRouter>
  <PageRouter pages={pages} layouts={layouts} onError={(error) => reportError(error)} />
</BrowserRouter>
```

| File | URL |
|---|---|
| `features/users/pages/index.tsx` | `/users` |
| `features/users/pages/[id].tsx` | `/users/:id` |
| `features/docs/pages/[...path].tsx` | `/docs/*` |
| `features/main/pages/about.tsx` | `/about` (`main` maps to `/`) |
| `_helpers.tsx`, `_parts/…` | not routes |

Segments are lowercased, dynamic ones included (`[userId]` → `:userid`).
`PageRouter` props: `pages` (required), `routeBase` (e.g. `{ billing: '/account' }`),
`layouts` (first match wins; each `Layout` renders `<Outlet />`), `notFound`,
`errorElement`, `onError`, `fallback`. Every page gets its own Suspense
boundary; the error boundary resets on navigation; a 404 is built in; two
files mapping to one URL log a warning in development. `pathFromFile(file,
routeBase?)` and `discoverRoutes(pages, routeBase?)` expose the same rules for
tests and tooling.

### Data from route contracts — `@bloomneo/uikit/data`

For routes declared with `defineRoute` in `@bloomneo/bloom`, these hooks
replace per-page `useEffect` + fetch. Pass the client from bloom's
`createClient()`; `data` is typed from the contract's `response` schema.

```tsx
import { createClient } from '@bloomneo/bloom';
import { useQuery, useMutation } from '@bloomneo/uikit/data';
import { listInvoices, createInvoice } from '../contracts';

const api = createClient({ baseUrl: import.meta.env.VITE_API_URL, getToken });

function Invoices({ page }: { page: number }) {
  const { data, loading, error, refetch } = useQuery(api, listInvoices, { query: { page } });
  const create = useMutation(api, createInvoice);

  async function add() {
    await create.mutate({ body: { total: 5 } });   // resolves with the response, rejects on error
    await refetch();
  }
  // …
}
```

- `useQuery(client, contract, input?, { enabled? })` → `{ data, error, loading, refetch }`.
  It refetches when `input` changes by value, waits while `enabled` is false,
  and only the latest request writes state.
- `useMutation(client, contract)` → `{ mutate, data, error, loading }`.
- uikit reads contracts structurally, so it does not depend on bloom.

### Theme Usage

```tsx
import { Button, ThemeProvider, useTheme } from '@bloomneo/uikit';
import '@bloomneo/uikit/styles';

// Setup (in main.tsx)
<ThemeProvider theme="base" mode="light">
  <App />
</ThemeProvider>

// Theme switcher
function ModeToggle() {
  const { mode, setMode } = useTheme();
  return (
    <Button variant="outline" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      Toggle dark mode
    </Button>
  );
}

// Semantic colors automatically follow the active theme + mode
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Heading</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

> **No more flash of wrong theme.** Drop the snippet from `@bloomneo/uikit/fouc` (`foucScript()`) into your `index.html` `<head>` so theme classes apply to `<html>` synchronously before React mounts.

## Resources

### 🤖 For AI coding agents (start here)

- **[`llms.txt`](./llms.txt)** — canonical machine-readable index of every export, every example, and every cookbook recipe. Generated on every build from source. Read this first.
- **[`examples/`](./examples)** — one minimal `.tsx` file per primitive (Button, DataTable, FormField, Toast, ConfirmDialog, …). Copy and modify the data.
- **[`cookbook/`](./cookbook)** — composed page recipes (CRUD, dashboard, settings, login, delete-flow). Start here when building a new feature.

### 📚 Human documentation

- [Naming conventions](docs/NAMING.md) — how exports and props are named, and why
- [Agent clarity benchmark](docs/AGENT_CLARITY_BENCHMARK.md) — how this package is scored for agent usability
- [`MIGRATION-6.md`](./MIGRATION-6.md) — upgrading from 4.x: every removal with its replacement, and what 6.0 adds
- [`CHANGELOG.md`](./CHANGELOG.md) — release history

## 📄 License

MIT © [Bloomneo](https://github.com/bloomneo) — See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>🚀 Built for the AI-first future of frontend development</strong><br>
  <strong>Where beautiful applications are generated, not written</strong><br><br>
  <a href="https://github.com/bloomneo/uikit">⭐ Star us on GitHub</a>
</p>

---

### **🔖 Tags**

`react` `typescript` `uikit` `ai-ready` `shadcn` `tailwind` `themes`
`components` `business-apps` `zero-config` `production-ready`
`agentic-ai` `llm-optimized` `rapid-development` `design-system`
`developer-experience`

---

## Agent Clarity Benchmark

**Baseline: 74/100 — 🟡 Agent-friendly**
*Scored: 2026-04-16 (by Claude) · Rubric: [AGENT_CLARITY_BENCHMARK.md](./docs/AGENT_CLARITY_BENCHMARK.md) v2*

| Stage | Score | Weight |
|---|---:|---:|
| A. Discovery | 6.5/10 | 11% |
| B. Generation | 6.2/10 | 37% |
| C. Validation | 7.8/10 | 25% |
| D. Debug | 6.0/10 | 13% |
| E. Evolution | 7.0/10 | 14% |

**Gaps to reach 90+ (🟢 Agent-native):** see [AGENT_CLARITY_ROADMAP.md](./docs/AGENT_CLARITY_ROADMAP.md)
