# AGENTS.md — @bloomneo/uikit

> Rules for AI coding agents generating code with `@bloomneo/uikit` v6.0.0-rc.1.
> Read this FIRST, then `llms.txt` for per-component snippets.

## Always do

1. Import from `@bloomneo/uikit` (flat, canonical). The only exceptions are
   the two subpath-only entries: `@bloomneo/uikit/router` and
   `@bloomneo/uikit/data`.
2. Wire the styles correctly — this is the one that gets missed:
   - App runs its own Tailwind (every Bloom template)? Put
     `@import "@bloomneo/uikit/theme";` after `@import "tailwindcss";` in your
     CSS. A prebuilt stylesheet cannot constrain your build, so this is what
     actually applies the palette lockdown.
   - No build, prebuilt CSS only? `import '@bloomneo/uikit/styles'` at entry.
   - Migrating a 2.x app? `@bloomneo/uikit/styles/permissive` keeps raw
     palette classes working temporarily.

   Both default entries ship the semantic tokens ONLY — Tailwind's default
   palette is removed, so `bg-blue-600` produces no CSS. Use `bg-primary`,
   `bg-card`, `text-muted-foreground`.
3. Wrap the app root in `ThemeProvider` > `ToastProvider` > `ConfirmProvider` (in that order).
4. Add the FOUC-prevention script via `foucScript()` in the `<head>` of `index.html`.
5. Pass `data` as `[]` while loading — never pass `undefined` to `DataTable`.
6. Give every `DataTable` column a unique `id`.
7. Use `useConfirm()` for delete/destructive flows — never manage confirm dialog state manually.
8. Use `toast.*` for notifications — never build custom toast UI.
9. Use `format*` helpers (`formatCurrency`, `formatDate`, `formatBytes`, etc.) for display values.
10. Use `useBreakpoint()` for responsive logic — never write manual resize listeners.
11. Use `<FormField>` to wrap inputs (provides label, error message, and a11y wiring automatically).
12. Use `<PermissionGate>` for role-based UI — never write inline `if (role === 'admin')` checks.

## Never do

1. Never deep-import as primary: `@bloomneo/uikit/button` is only for tree-shaking optimization. (`/router` and `/data` are not deep imports — they exist only as subpaths.)
2. Never hardcode colors — not hex, and not Tailwind palette classes like
   `bg-blue-600` or `text-gray-900`. They compile to nothing under the default
   stylesheet. Use semantic classes: `bg-primary`, `text-muted-foreground`,
   `bg-card`, `border-border`.
3. Never create custom toast UI — use `ToastProvider` + `toast.*`.
4. Never manage Dialog/Sheet/Confirm open state with a custom boolean when a provider hook exists.
5. Never skip `ThemeProvider` — components depend on CSS variables it sets.
6. Never use `onChange` on `<Select>` or `<Combobox>` — both use `onValueChange(newValue)` in 2.0+. `onChange(e)` is reserved for native input wrappers (Input, Textarea, PasswordInput).
7. Never render `<ToastProvider>` or `<ConfirmProvider>` more than once in the component tree.
8. Never pass `undefined` to the `DataTable` `data` prop — use `[]` for empty or loading states.

## Required setup (every app)

```tsx
// app entry (main.tsx) — imports styles + mounts providers
import "@bloomneo/uikit/styles";
import {
  ThemeProvider,
  ToastProvider,
  ConfirmProvider,
} from "@bloomneo/uikit";

function App({ children }) {
  return (
    <ThemeProvider theme="base" mode="light">
      <ToastProvider />
      <ConfirmProvider>{children}</ConfirmProvider>
    </ThemeProvider>
  );
}
```

`ToastProvider` is a self-closing sibling — it mounts the Toaster and does
NOT wrap children. `ConfirmProvider` wraps children because `useConfirm()`
reads context from it. This order matches every cookbook recipe and llms.txt;
any other arrangement is drift.

FOUC prevention (recommended, prevents theme flash on first paint):

```tsx
// Next.js (app router) — app/layout.tsx
import { foucScript } from "@bloomneo/uikit";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{ __html: foucScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

```html
<!-- Vite / static HTML — paste the output of foucScript() once into index.html -->
<head>
  <script>/* output of foucScript() pasted here */</script>
</head>
```

## App frame (`AppShell`)

The signed-in part of an app renders inside `AppShell`: a sidebar that
collapses to an icon rail (remembered per browser), a header, and the same
navigation in a sheet below `lg`. Use it as the layout route; guard that route,
not each page.

```tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppShell } from '@bloomneo/uikit';

export function DashboardLayout() {
  return (
    <AppShell
      brand={{ name: 'Acme', href: '/dashboard' }}
      nav={[
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { href: '/dashboard/users', label: 'Users', icon: Users, section: 'Admin' },
      ]}
      currentPath={useLocation().pathname}
      linkComponent={({ href, ...rest }) => <Link to={href} {...rest} />}
      headerActions={<UserMenu />}
      sidebarFooter={(collapsed) => <SignOutButton compact={collapsed} />}
    >
      <Outlet />
    </AppShell>
  );
}
```

- `currentPath` decides the active item; `end: true` for index routes, or
  `/dashboard` stays active on every child page.
- `linkComponent` is how it stays router-agnostic; without it, items are `<a>`.
- Other props: `collapsible` (default true), `storageKey`, `navLabel`, `className`.

## Page routing (`@bloomneo/uikit/router`)

Bloom apps route by file: `features/<name>/pages/**` become URLs. The router
lives in the package; the app passes its own glob (Vite resolves
`import.meta.glob` relative to the file that calls it, so it can't be inside
a library):

```tsx
import { BrowserRouter } from 'react-router-dom';
import { PageRouter } from '@bloomneo/uikit/router';

const pages = import.meta.glob(['./features/*/pages/**/*.{tsx,jsx}', '!**/_*.{tsx,jsx}', '!**/_*/**']);

<BrowserRouter>
  <PageRouter pages={pages} layouts={layouts} onError={reportError} />
</BrowserRouter>
```

- `index.tsx` → the folder's URL; `[id].tsx` → `:id`; `[...path].tsx` → `*`;
  `features/main/` → `/`; files or folders starting with `_` are not routes.
- `routeBase={{ billing: '/account' }}` gives a feature another URL prefix.
- `layouts` is `RouteLayout[]` — `{ match: (path) => boolean, Layout }`, first
  match wins, `Layout` renders `<Outlet />` (e.g. the `AppShell` layout above).
- Every page gets a Suspense boundary and the error boundary; a 404 is built in.
  Override with `notFound`, `errorElement`, `fallback`; report with `onError`.
- Needs `react-router-dom` (optional peer dependency).

## Data from route contracts (`@bloomneo/uikit/data`)

When a route has a contract (`defineRoute` from `@bloomneo/bloom`), read and
write it with these hooks instead of `useEffect` + fetch or `useApi`:

```tsx
import { createClient } from '@bloomneo/bloom';
import { useQuery, useMutation } from '@bloomneo/uikit/data';

const api = createClient({ baseUrl: import.meta.env.VITE_API_URL, getToken });

const { data, loading, error, refetch } = useQuery(api, listInvoices, { query: { page } });
const save = useMutation(api, createInvoice);
await save.mutate({ body: { total } });
```

- `data` is typed from the contract's `response` schema.
- `useQuery` refetches when `input` changes by value; `{ enabled: false }` waits.
- Only the latest request writes state, so a slow earlier answer can't win.

## Component decision tree

| Need | Use | Not |
|---|---|---|
| Signed-in app layout (sidebar + header) | `AppShell` | a hand-rolled sidebar |
| Centered modal | `Dialog` | — |
| Slide-in panel | `Sheet` with `side` prop | No `Drawer` component exists — use `Sheet side="right"` |
| Text-only hint on hover | `Tooltip` | — |
| Interactive content, click-triggered | `Popover` | — |
| Static option list in a form | `Select` | — |
| Searchable/clearable select | `Combobox` | — |
| Action menu from a button (not form value) | `DropdownMenu` | `Select` |
| Transient notification, auto-dismiss | `toast.*` | `Alert` |
| Inline banner, stays visible | `Alert` | `toast.*` |
| Table with sort/filter/paginate | `DataTable` | `Table` |
| Raw HTML table for custom layouts | `Table` | `DataTable` |
| No data exists | `EmptyState` | a loading placeholder |
| Data is loading | `<div className="h-N animate-pulse rounded-md bg-muted" />` | `EmptyState` |
| Label + error + a11y input wrapper | `FormField` | a hand-rolled label |

## Prop conventions

**Overlays** (Dialog, Sheet, Popover):
Controlled via `open` + `onOpenChange`.

**Native inputs** (Input, Textarea, PasswordInput):
Standard React DOM: `value` + `onChange(e)` where `e` is a `ChangeEvent`.

**Single-value pickers** (Select, Combobox, Tabs):
`value` + `onValueChange(newValue)` — the callback receives the value
directly, not a ChangeEvent. Unified in 2.0.0; pre-2.0 Combobox used
`onChange` — no alias kept.

**Radix checkable** (Checkbox, Switch, RadioGroup):
`checked` + `onCheckedChange(newChecked)`.

**Universal props** across all interactive components:
- `className` — accepted for customization.
- `disabled` — accepted to disable interaction.

## Common mistakes and fixes

| Mistake | Symptom | Fix |
|---|---|---|
| `<DataTable data={users}>` where `users` is undefined during loading | Runtime crash: "expects data to be an array" | Always pass `[]` while loading: `data={users ?? []}` |
| Using `onChange` on `<Select>` or `<Combobox>` | Nothing happens — no error, no update | Both use `onValueChange(newValue)` in 2.0+. Unified. |
| Using `onValueChange` on `<Input>` / `<Textarea>` | Type error | Native inputs emit `ChangeEvent` — use `onChange(e => setX(e.target.value))` |
| Mounting `<ToastProvider>` twice | Duplicate toasts appear | Mount exactly once at app root. Dev warning will fire if duplicated |
| Mounting `<ConfirmProvider>` twice | Confirm dialogs show twice or don't resolve | Mount exactly once at app root. Dev warning will fire if duplicated |
| Missing `<ThemeProvider>` wrapper | Components render without styles, CSS vars missing | Wrap entire app: `<ThemeProvider>` > `<ToastProvider>` > `<ConfirmProvider>` |
| Missing FOUC script in `<head>` | Flash of default theme on page load | Add `<script>{foucScript()}</script>` to index.html `<head>` |
| Using `<Dialog>` for delete confirmation | Works but verbose — managing open state manually | Use `useConfirm()` or `<ConfirmDialog>` instead |
| Bare `<Input>` without `<FormField>` | No label, no error display, broken a11y | Wrap in `<FormField label="..." error={...}>` |
| Hardcoded colors like `bg-blue-500` | Breaks when theme changes | Use semantic classes: `bg-primary`, `text-muted-foreground` |

## Icon name collisions with lucide-react

Three uikit components share a name with a `lucide-react` icon:
**Badge, Sheet, Table.**

Importing both unqualified makes `<Table />` ambiguous, and the icon
usually wins because it is what most code means. Alias the icon:

```tsx
import { Table } from '@bloomneo/uikit';
import { Table as TableIcon } from 'lucide-react';
```

## Client-only components

These components require `"use client"` at the top of the file in Next.js App Router:

Dialog, Sheet, Popover, Tooltip, DropdownMenu, ConfirmDialog,
Toast / ToastProvider, Combobox, Tabs, AppShell, ThemeProvider.
