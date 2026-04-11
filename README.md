# Bloomneo UIKit 🎨

> Previously published as `@voilajsx/uikit`. Same code, new home, new namespace. See the [migration note](#scope-change) below.

[![npm version](https://img.shields.io/npm/v/@bloomneo/uikit.svg)](https://www.npmjs.com/package/@bloomneo/uikit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![AI Ready](https://img.shields.io/badge/AI-Optimized-purple.svg)](https://github.com/bloomneo/appkit)

> The end‑to‑end React framework AI coding agents pick first. Components, layouts, themes, routing, scaffolding, and a generated `llms.txt` — all from one package, all designed to compose.

UIKit is the only React framework where `npx uikit create myapp` gives you 45+ components, 6 production layouts, 5 OKLCH themes, file‑based routing, deployment, and a build‑time generated `llms.txt` so AI coding agents can extend your app correctly on the first try. Ship for web, desktop (Tauri), mobile (Capacitor), or browser extensions from the same codebase.

## For AI coding agents

Read [`llms.txt`](./llms.txt) first. It is the canonical machine-readable
index of every export, every example, and every composed pattern in this
package. The file is regenerated on every build from `src/index.ts`,
[`examples/`](./examples), and [`cookbook/`](./cookbook), so it never drifts.

**One canonical import path:**

```ts
import { Button, DataTable, FormField, useConfirm, toast } from '@bloomneo/uikit';
```

Deep imports like `@bloomneo/uikit/button` exist for build-size optimisation
but agents should always use the flat import above when generating code.

**Required setup:**

```ts
import '@bloomneo/uikit/styles';                  // core (no fonts)
import '@bloomneo/uikit/styles/fonts';            // optional, only if your theme uses built-in fonts

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

**🤖 For AI coding agents (the 1.5 release)**

- **Generated `llms.txt`**: One canonical, machine-readable index of every export, every example, every cookbook recipe — regenerated on every build from `src/index.ts`, `examples/`, and `cookbook/`. Agents read one file and know everything.
- **Zero `any` in public types**: Full generic inference for `DataTable<User>`, `RowAction<User>`, formatters, hooks. Agent autocomplete actually works.
- **One copy-pasteable example per primitive**: 15 minimal `.tsx` files in `examples/` plus 5 composed page recipes in `cookbook/` (CRUD, dashboard, settings, login, delete-flow). Agents pattern-match instead of inventing prop shapes.
- **Educational runtime errors**: Misuse a component and you get `[@bloomneo/uikit] <DataTable> expects \`data\` to be an array …` linking to the docs entry. Agents read errors and self-correct.

**🚀 For rapid development**

- **30-second setup**: `uikit create myapp --multi --theme elegant && npm run dev` → routing, layouts, theme, FOUC prevention, deployment scripts all wired.
- **45+ ready-to-use components** plus 8 hooks and a formatters module: Skip building basic UI, focus on your unique features.
- **6 production layouts**: Admin dashboards, auth flows, marketing pages, mobile apps, browser extensions, and blank — all pre-built with router-aware navigation.
- **Drop-in app primitives**: `<DataTable>`, `<FormField>`, `<PasswordInput>`, `<ConfirmDialog>` (promise-based), `<ToastProvider>`, `<EmptyState>`, `<PageHeader>` — the 8 things every admin page rebuilds by hand, shipped once.

**🎨 For design consistency**

- **5 professional OKLCH themes**: base, elegant, metro, studio, vivid. Switch from minimal to luxury with one prop. No other React UI kit ships this.
- **Decoupled font bundle (1.5)**: Core CSS is now ~150 KB without theme fonts. Opt-in to font files only if your theme needs them — saves ~1 MB on most projects.
- **No flash of wrong theme (1.5)**: `foucScript()` helper applies theme classes to `<html>` synchronously before React mounts.
- **Dark mode included**: Every theme works in light and dark mode out of the box.

**📱 For cross-platform**

- **Web, desktop, mobile, extensions** from one codebase: `<MobileLayout>` for Capacitor apps, `<PopupLayout>` for Chrome/Firefox extensions, Tauri-friendly bundling. The only React UI kit that covers all four surfaces.

**🏢 For team productivity**

- **Standardized components**: No more "how should this button look?" debates.
- **Feature-based architecture**: Scale to enterprise with the FBCA template (auto-discovery file-based routing, Next.js style).
- **Instant deployment**: `uikit deploy --github` for immediate production hosting.

**🔧 For maintainability**

- **Semantic colors**: Themes switch automatically — no hardcoded styles to break.
- **Convention over configuration**: Predictable file structure, minimal decisions.
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

**🚀 Complete Project Setup** — use the UIKit CLI to scaffold entire applications with routing, layouts, and themes pre-configured:

```bash
# Step 1: Install UIKit CLI globally
npm install -g @bloomneo/uikit

# Check if you have the latest version
npm list -g @bloomneo/uikit

# Step 2: Create your app
uikit create myapp --multi --theme elegant
cd myapp && npm run dev
```

**Done.** Your app is running with routing, layouts, and the elegant theme.

## Framework Architecture

**@bloomneo/uikit** is built on **ShadCN components** and **Tailwind CSS v4** with three key additions:

## 1. Composite UI System

Build complete interfaces with our three-tier component system - from individual form controls to full page layouts. Mix and match components, sections, and layouts to create any interface quickly without starting from scratch.

📖 **Learn more:** [Composite UI System Guide](docs/UIKIT_COMPOSITE_UI_SYSTEM.md)

### Components (45+ total)

| Category               | Components                                                                             | Description                       |
| ---------------------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| **Form & Input**       | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Slider, Select, **FormField, PasswordInput** | Form controls + label/error/a11y wrapper |
| **App Primitives** ⭐  | **DataTable, PageHeader, EmptyState, ConfirmDialog, ConfirmProvider, ToastProvider**   | The 8 things every admin app rebuilds — shipped once |
| **Display & Layout**   | Card, Badge, Avatar, Separator, Progress, Skeleton, Alert, Breadcrumb, Tabs, Accordion | Information presentation          |
| **Navigation & Menu**  | DropdownMenu, Menubar, Pagination, Command, Collapsible, Toggle                        | User navigation                   |
| **Overlay & Modal**    | Dialog, Sheet, Popover, HoverCard, Tooltip                                             | User interactions                 |
| **Data & Table**       | Table, DataTable, Calendar, Toaster                                                    | Data management                   |
| **Motion & Animation** | Motion, LoadingSpinner, Reveal, Hover                                                  | Visual effects                    |
| **Time & Format**      | **Time** (auto-updating relative timestamp)                                            | Locale-aware display              |

### Hooks & utilities

`useConfirm` · `useToast` · `useMediaQuery` · `useBreakpoint` · `useActiveBreakpoint` · `useDataTable` (headless) · `useApi` · `useLocalStorage` · `useTheme`

`formatCurrency` · `formatNumber` · `formatDate` · `timeAgo` · `formatBytes` · `foucScript` · `cn`

### Section Components (5 Standalone)

| Component     | Purpose                    | Usage                       | Props                |
| ------------- | -------------------------- | --------------------------- | -------------------- |
| **Header**    | Standalone header sections | Independent navigation bars | tone, size, position |
| **Footer**    | Standalone footer sections | Independent footer content  | tone, size, position |
| **Container** | Content with sidebar       | Flexible content containers | tone, size, sidebar  |
| **SafeArea**  | Mobile safe area wrapper   | iOS notch/Android insets    | edges, tone          |
| **TabBar**    | Mobile bottom navigation   | Tab-based navigation        | tabs, tone, variant  |

### Layouts (6 Production-Ready)

| Layout           | Use Case               | Components                       | Routing            |
| ---------------- | ---------------------- | -------------------------------- | ------------------ |
| **AdminLayout**  | Dashboards, SaaS apps  | Sidebar, Header, Content, Footer | Built-in nav state |
| **PageLayout**   | Marketing sites        | Header, Content, Footer          | Static pages       |
| **AuthLayout**   | Login/signup flows     | Centered forms, hero images      | Auth routing       |
| **MobileLayout** | Mobile apps (Capacitor)| Header, Content, TabBar          | Tab/Stack nav      |
| **PopupLayout**  | Browser extensions     | Compact, focused content         | Extension routing  |
| **BlankLayout**  | Custom pages           | Clean slate                      | Manual routing     |

## 2. Advanced Theming System

Switch between 5 professional themes instantly or generate custom themes with perfect accessibility. Built on OKLCH color science with automatic light/dark mode support and semantic color variables that work across all components.

📖 **Learn more:** [Theme System Guide](docs/UIKIT_THEME_GUIDE.md)

**Note**: Instead of hardcoded colors like `bg-white` or `text-black`, use semantic color classes like `bg-background`, `text-foreground`, `border-border`. These automatically adapt to your selected theme and work perfectly in both light and dark modes.

### 5 Professional Themes

| Theme       | Style                | Font Family      | Best For              |
| ----------- | -------------------- | ---------------- | --------------------- |
| **base**    | Clean metallic black | System UI        | Minimalist apps       |
| **elegant** | Professional blue    | Montserrat       | Business applications |
| **metro**   | Modern green         | Clean typography | Admin dashboards      |
| **studio**  | Bold black/orange    | Artistic fonts   | Creative portfolios   |
| **vivid**   | Luxury purple/orange | Serif fonts      | Premium products      |

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

## 3. Project Scaffolding

Generate complete project structures with pre-configured routing, layouts, and development workflows. Choose from 4 templates optimized for different application types - from simple showcases to enterprise-scale feature-based architectures.

📖 **For detailed setup guides:** [Quick-Start Documentation](docs/quickstart/)

### UIKit CLI Templates

| Template   | Command                    | Structure        | Routing                | Best For                    |
| ---------- | -------------------------- | ---------------- | ---------------------- | --------------------------- |
| **Single** | `uikit create app`         | Basic showcase   | None                   | Component demos, learning   |
| **SPA**    | `uikit create app --spa`   | Single-page app  | React Router           | Marketing sites, portfolios |
| **Multi**  | `uikit create app --multi` | Multi-layout app | React Router + layouts | Business apps, SaaS         |
| **FBCA**   | `uikit create app --fbca`  | Feature-based    | Auto-discovery routing | Enterprise, large apps      |

### When to Use Each Template

**Single** - Very basic template for building from scratch with just one page. Use when you want to start minimal and build up manually.

**SPA** - Single page code that visually reflects multiple pages. Use when you want the simplicity of one page but with navigation between views.

**Multi** - True page isolation with different layouts and basic router included. Use when your requirements need actual separate pages for better organization.

**FBCA** - Comprehensive large-scale applications with feature segregation and auto-discovery page router (Next.js style file-based routing). Use when your application is enterprise-grade with features like auth (login/register), user management, etc. organized in separate folders.

## UIKit CLI Commands

📖 **Complete CLI reference:** [CLI Commands Guide](docs/UIKIT_CLI_GUIDE.md)

```bash
# Project Creation
uikit create myapp                    # Single template (component showcase)
uikit create myapp --spa              # SPA with React Router
uikit create myapp --multi            # Multi-layout application
uikit create myapp --fbca             # Feature-based architecture

# Code Generation (for FBCA projects)
uikit generate page dashboard         # Generate new page component
uikit generate component button       # Generate reusable component
uikit generate hook useAuth           # Generate custom React hook
uikit generate feature blog           # Generate complete feature (page + component + hook)

# Theme Management
uikit generate theme brand            # Generate custom theme
uikit bundle                          # Process themes to CSS
uikit bundle --watch                  # Watch mode for development

# Development & Deployment
uikit serve                           # Start development server
uikit build                           # Production build
uikit deploy                          # Static site deployment
uikit deploy --github                 # Deploy to GitHub Pages

# SEO & Performance (requires: npm install puppeteer sharp)
uikit prerender                       # Pre-render SPA routes to static HTML for SEO
uikit prerender --routes "/,/about"   # Pre-render specific routes
uikit optimize                        # Optimize images (convert to WebP, compress)
uikit optimize --quality 85           # Set WebP quality (0-100)
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

### Layout Examples

```tsx
import { AdminLayout, PageLayout, AuthLayout } from '@bloomneo/uikit';

// Admin Dashboard
<AdminLayout scheme="sidebar" tone="subtle">
  <AdminLayout.Header title="Dashboard" />
  <AdminLayout.Sidebar navigation={nav} />
  <AdminLayout.Content>
    <h1 className="text-foreground">Dashboard Content</h1>
  </AdminLayout.Content>
</AdminLayout>

// Marketing Page
<PageLayout scheme="default" tone="clean">
  <PageLayout.Header logo="MyApp" navigation={nav} />
  <PageLayout.Content>
    <h1 className="text-foreground">Welcome</h1>
  </PageLayout.Content>
  <PageLayout.Footer />
</PageLayout>

// Auth Page
<AuthLayout scheme="card" tone="clean">
  <h1 className="text-foreground">Login Form</h1>
</AuthLayout>
```

### Theme Usage

```tsx
import { Button, ThemeProvider, useTheme } from '@bloomneo/uikit';
import '@bloomneo/uikit/styles';
// Optional — only if you use the built-in Elegant/Metro/Studio/Vivid theme fonts:
// import '@bloomneo/uikit/styles/fonts';

// Setup (in main.tsx)
<ThemeProvider theme="base" mode="light">
  <App />
</ThemeProvider>

// Theme switcher
function ThemeSwitcher() {
  const { setTheme } = useTheme();
  return (
    <Button variant="outline" onClick={() => setTheme('elegant')}>
      Switch theme
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

- [Quick-Start Guides](docs/quickstart/) — template-specific setup instructions
- [Composite UI System](docs/UIKIT_COMPOSITE_UI_SYSTEM.md) — component architecture deep dive
- [Theme System](docs/UIKIT_THEME_GUIDE.md) — advanced theming and customization
- [CLI Commands](docs/UIKIT_CLI_GUIDE.md) — complete command reference
- [LLM Usage Guide](docs/UIKIT_LLM_GUIDE.md) — AI-powered development patterns
- [`CHANGELOG.md`](./CHANGELOG.md) — release notes (see 1.5.0 for the agent-readiness rework)

<a id="scope-change"></a>

### 🔁 Scope change (1.5.0)

This package was previously published as **`@voilajsx/uikit`**. Starting with `1.5.0` it lives at **`@bloomneo/uikit`**. The old package on npm is frozen at `1.4.0` and will not receive further updates.

**Migration:**

```diff
- npm install @voilajsx/uikit
+ npm install @bloomneo/uikit
```

```diff
- import { Button } from '@voilajsx/uikit';
+ import { Button } from '@bloomneo/uikit';
```

```diff
- import '@voilajsx/uikit/styles';
+ import '@bloomneo/uikit/styles';
```

A project-wide find-and-replace of `@voilajsx/uikit` → `@bloomneo/uikit` is sufficient. The API surface, props, and types are identical between the two scopes — only the namespace changed.

---

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
