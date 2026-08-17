# Bloomneo UIKit 🎨

[![npm version](https://img.shields.io/npm/v/@bloomneo/uikit.svg)](https://www.npmjs.com/package/@bloomneo/uikit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![AI Ready](https://img.shields.io/badge/AI-Optimized-purple.svg)](https://github.com/bloomneo/appkit)

> A React component library AI coding agents can use correctly on the first try. 30 components, one token palette, and a generated `llms.txt`.

UIKit is a **library, not a framework**. It ships the components and the design
tokens; your app owns its own chrome. Tailwind's default palette is removed, so
the only colours that compile are the semantic ones — which is what keeps a
generated codebase looking like one product instead of thirty.

For scaffolding a whole application, use
[`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom).

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
but agents should always use the flat import above when generating code.

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
- **Custom themes** via `uikit generate theme <name>` + `uikit bundle`.

**🚀 For rapid development**

- **Drop-in app primitives**: `<DataTable>`, `<FormField>`, `<ConfirmDialog>` (promise-based), `<ToastProvider>`, `<EmptyState>`, `<PageHeader>`, `<PermissionGate>` — the things every admin page rebuilds by hand, shipped once.
- **12 hooks and a formatters module** so pages stay declarative.

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

**@bloomneo/uikit** is built on **ShadCN components** and **Tailwind CSS v4** with three key additions:

## 1. Composite UI System

Build complete interfaces with our three-tier component system - from individual form controls to full page layouts. Mix and match components, sections, and layouts to create any interface quickly without starting from scratch.

### Components (30 total)

| Category               | Components                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| **Form & Input**       | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Combobox, **Form, FormField** |
| **App primitives** ⭐  | **DataTable, PageHeader, EmptyState, ConfirmDialog, ConfirmProvider, ToastProvider, PermissionGate** |
| **Display**            | Card, Badge, Alert, Tabs, Table                                            |
| **Navigation & menu**  | DropdownMenu, Command                                                      |
| **Overlay & modal**    | Dialog, Sheet, Popover, HoverCard, Tooltip                                 |
| **Feedback**           | Toast, Toaster (Sonner)                                                    |

### Hooks & utilities

`useConfirm` · `useToast` · `useTheme` · `useMediaQuery` · `useBreakpoint` ·
`useActiveBreakpoint` · `useDataTable` (headless) · `usePagination` · `useApi` ·
`useBackendStatus` · `useLocalStorage` · `usePermission`

`formatCurrency` · `formatNumber` · `formatDate` · `timeAgo` · `formatBytes` ·
`foucScript` · `foucScriptTag` · `cn`

### Layouts and sections were removed in 4.0

`AdminLayout`, `PageLayout`, `AuthLayout`, `BlankLayout`, `PopupLayout`,
`MobileLayout`, `Header`, `Footer`, `Container`, `SafeArea` and `TabBar` are
gone. Every application built on this library replaced them within weeks: app
chrome is where product identity lives, and a generic sidebar is the first
thing anyone rewrites. Shipping it cost maintenance and bought nothing.

What replaced them is a **layout route** that renders pages through an
`<Outlet />`, with pages owning their own headers — see
[Layouts — build your own](#layouts--build-your-own). `@bloomneo/bloom`
scaffolds that shell for you.

## 2. Advanced Theming System

One bundled theme (`base`) plus a generator for your own. Built on OKLCH color science with automatic light/dark mode support and semantic color variables that work across all components.

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
generator below covers the real case, which is one brand palette per product.

### Custom Theme Generation

```bash
# Generate custom theme automatically
uikit generate theme <name>

# Bundle themes to CSS
uikit bundle
```

**What Happens Automatically:**

1. **Creates theme preset** with generic values for 29 semantic colors (light + dark modes)
2. **Compiles globals.css** with optimized CSS variables
3. **Updates main.tsx** to use your new theme instantly
4. **Theme visible immediately** - ready to customize for your brand needs

**Development Workflow:**

- **Customize preset**: Modify the generic values in `src/themes/presets/theme-<name>.js` to match your brand
- **Rebundle**: Run `uikit bundle` to regenerate CSS
- **See changes instantly**: Theme updates appear immediately in your app

**Best Practices:**

- **Avoid custom CSS files** - work within the preset system for consistency
- **No separate stylesheets** - keeps theme coherence undisturbed
- **Easy maintenance** - all theme changes in one centralized file

## 3. Project scaffolding — see @bloomneo/bloom

UIKit stopped scaffolding applications in 4.0. The `uikit create` command and
its `single` / `spa` / `multi` / `fbca` templates were removed: they duplicated
[`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom), and they were
built on the very layout chrome this release deleted.

```bash
npx @bloomneo/bloom create myapp
```

## UIKit CLI Commands

The CLI is theme tooling and per-piece generation. Whole-app scaffolding, dev
server, build, deploy, prerender and image optimisation were removed in 4.0 —
your app's own toolchain (Vite, Next) already does those, and `@bloomneo/bloom`
wires them.

```bash
# Code generation (into an existing app)
uikit generate page dashboard         # page component
uikit generate component button       # reusable component
uikit generate hook useAuth           # custom React hook
uikit generate feature blog           # complete feature (page + component + hook)

# Theme management
uikit generate theme brand            # generate a custom theme
uikit bundle                          # process themes to CSS
uikit bundle --watch                  # watch mode for development
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

#### Form (with the new FormField + PasswordInput primitives)

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

### Layouts — build your own

UIKit ships **no layout components**. 4.0.0 removed `AdminLayout`, `PageLayout`,
`AuthLayout`, `BlankLayout` and `PopupLayout` because every real app replaced
them within weeks: app chrome is where product identity lives, and a generic
sidebar is the first thing anyone rewrites.

The pattern that replaced them is a **layout route** that renders its pages
through an `<Outlet />`, and pages that own their own header:

```tsx
// AdminLayoutRoute.tsx — the shell, written once, in your app
export function AdminLayoutRoute() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />                {/* yours */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

// Any page — owns its header, returns plain content
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

For a scaffolded app that already has this wired, use
[`@bloomneo/bloom`](https://www.npmjs.com/package/@bloomneo/bloom).

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
- [`CHANGELOG.md`](./CHANGELOG.md) — release history, including the 4.0 removals
- [`CHANGELOG.md`](./CHANGELOG.md) — release notes (see 2.0.0 for the current API; 1.5.0 for the agent-readiness rework)

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
`components` `layouts` `zero-config` `production-ready`
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
