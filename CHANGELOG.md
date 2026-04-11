# Changelog

All notable changes to UIKit will be documented in this file.

## [1.5.0] - 2026-04-11

> **🔁 Scope change.** Starting with this release the package lives at
> **`@bloomneo/uikit`**. The previous `@voilajsx/uikit` package on npm is
> frozen at `1.4.0` and will not receive further updates. To migrate, run a
> project-wide find-and-replace of `@voilajsx/uikit` → `@bloomneo/uikit`.
> The API surface, props, types, and behavior are identical — only the
> namespace changed.

This release reworks UIKit around two goals: **shrink consumer codebases** by
shipping the primitives every app rebuilds by hand, and **make the library
discoverable to AI coding agents** by generating a canonical machine-readable
index from the source of truth.

### Added — App primitives (Ship 2)

The eight items below replace ~500 LOC of bespoke glue code per typical admin
app. Every primitive is fully typed, theme-aware, and accessible by default.

- **`<DataTable>` + `useDataTable()`** — the existing `<DataTable>` is now
  generic-safe (`DataTableColumn<TRow, TValue>`, no `any` defaults) and
  validates required props at render-time with educational error messages.
  The new `useDataTable()` hook exposes the search / sort / filter /
  pagination state machine for custom-rendered tables.
- **`<FormField>` + `<PasswordInput>`** — wraps any input with label, error,
  helper text, and ARIA wiring (`htmlFor`, `aria-describedby`,
  `aria-invalid`, `role="alert"`). PasswordInput ships a built-in show/hide
  toggle with `aria-pressed`.
- **Toast system** — `<ToastProvider>`, `toast.success/error/info/warning/promise/dismiss`,
  and `useToast()`. Thin wrapper over the existing `sonner` dependency, with
  a fully-typed `ToastApi` interface and theme parity via `useTheme()`.
- **`<EmptyState>`** — the canonical "no data yet" affordance. Three sizes,
  `role="status"` + `aria-live="polite"` baked in.
- **`<ConfirmDialog>` + `<ConfirmProvider>` + `useConfirm()`** — promise-based
  confirmation prompts. `confirm()` for normal flows, `confirm.destructive({ verifyText })`
  for type-to-confirm deletions. No more managing open/close state by hand.
- **`<PageHeader>`** — icon + title + description + breadcrumbs + actions
  in one composable component. Router-agnostic via a `renderLink` prop.
- **`useMediaQuery` + `useBreakpoint` + `useActiveBreakpoint`** — SSR-safe
  responsive hooks that reuse Tailwind v4's default breakpoint scale, so
  `useBreakpoint('md')` and the `md:` utility class always agree.
- **Formatters** — `formatCurrency`, `formatNumber`, `formatDate`, `timeAgo`,
  `formatBytes` (zero-dependency `Intl.*` wrappers), plus a `<Time />`
  component that auto-updates relative timestamps on an interval.

### Added — Trust fixes (Ship 1)

- **Decoupled font bundle** — fonts are no longer baked into `dist/styles.css`.
  Projects with custom themes save ~66 KB of CSS and ~1 MB of woff files.
  - `import '@bloomneo/uikit/styles'` → core stylesheet, **no fonts**
  - `import '@bloomneo/uikit/styles/fonts'` → opt-in `@font-face` declarations
    for the built-in Elegant / Metro / Studio / Vivid themes
- **FOUC prevention** — new `@bloomneo/uikit/fouc` module exports `foucScript()`
  and `foucScriptTag()` helpers. Drop the snippet into your `index.html`
  `<head>` (or via `dangerouslySetInnerHTML` in Next.js) to apply theme
  classes synchronously before React mounts. Eliminates the flash-of-default-theme
  on first paint. The included demo `index.html` ships the snippet as a
  reference.
- **`@bloomneo/uikit/errors`** — exports `UIKitError`, `requireProp`,
  `requireArrayProp`, `warnInDev`. Components throw these instead of generic
  `TypeError`s, so consumers (and AI agents) get an actionable message
  naming the missing prop and linking to the docs entry. Wired into
  `<DataTable>` and `useDataTable()` first.

### Added — Agent enablement (Ship 3)

- **`llms.txt`** — canonical machine-readable index of every export, every
  example, and every cookbook pattern. Generated at build time by
  `scripts/build-llms.mjs` from `src/index.ts` + `examples/` + `cookbook/`
  so it never drifts. Shipped at the package root and via the
  `@bloomneo/uikit/llms.txt` export. AI coding agents (Claude Code, Cursor,
  v0, etc) read this file first when generating code that uses the library.
- **`examples/`** — 13 minimal, copy-pasteable example files (one per
  primitive: button, data-table, form-field, toast, empty-state,
  confirm-dialog, page-header, format, use-breakpoint, theme-provider,
  dialog, skeleton). Each is a single self-contained `.tsx` file showing
  the smallest runnable usage.
- **`cookbook/`** — 5 composed page recipes assembled from the primitives:
  - `crud-page.tsx` — list + search + sort + row actions + delete with
    confirmation + success toast
  - `dashboard.tsx` — stats grid + recent activity table
  - `settings.tsx` — tabs + profile/security/notifications forms + save toasts
  - `login.tsx` — centered card with validated email/password form
  - `delete-flow.tsx` — type-to-confirm destructive action
- **Single canonical import path** — documented at the top of `llms.txt` and
  in the README: `import { X } from '@bloomneo/uikit'` is the only form
  agents should generate. Subpaths (`@bloomneo/uikit/button` etc.) remain
  available for build-size optimisation but are explicitly marked as
  non-canonical.

### Changed

- **`build:css` is now cross-platform.** The old shell pipeline
  (`tailwindcss ... && cat ... > ... && rm ...`) was replaced with
  `node scripts/build-styles.mjs`, a Node script that uses `fs` + `execSync`
  via `npx`. Builds now work on Windows / WSL without Git Bash.
- **`build` script chains a new `build:llms` step** so `dist/llms.txt` and
  the root `llms.txt` are regenerated on every release.
- **Renamed export**: the react-hook-form controller previously exported as
  `FormField` is now `FormController` to free the `FormField` name for the
  new wrapper primitive (which is what most consumers actually want). This
  is a **breaking change** for users importing the controller directly —
  see Migration below.
- **`<DataTable>` validates required props at render-time** with educational
  errors instead of crashing inside `.map()` ten frames deep. Passing
  `data={undefined}` or omitting `columns` now throws a message that names
  the prop and links to the docs.
- **Cleaned up `vite.config.ts`** — removed dead asset-name logic that
  checked for files Vite never emits, removed the commented-out `adapters`
  entry, added the new `format` / `fouc` / `errors` lib entries.
- **Removed unused `tw-animate-css` devDependency** (~60 KB in node_modules,
  zero imports in source).
- **README has a new "For AI coding agents" section** documenting `llms.txt`,
  the canonical import path, and the required setup snippet.

### Fixed

- **Eliminated every `any` from public types**, the largest source of broken
  IDE autocomplete and silent agent guesses. Affected:
  - `DataTableColumn<TRow, TValue>` (was `<T = any>` with `any` accessors)
  - `RowAction<TRow>` (was `<T = any>`)
  - `FilterConfig.value` (now `DataTableFilterValue = string | number | boolean | Date | null`)
  - `EnhancedFormProps.onError` (now properly typed as
    `(errors: FieldErrors<T>) => void`)
- **`src/App.tsx`** — removed the `as any` cast on the theme `<select>` change
  handler. Agents will no longer cargo-cult the cast elsewhere.

### Migration

Most consumers do not need to change anything. The two breaking changes:

1. **`FormField` was renamed to `FormController`.** If you were using the
   react-hook-form controller component:

   ```diff
   - import { Form, FormField } from '@bloomneo/uikit';
   + import { Form, FormController } from '@bloomneo/uikit';
   ```

   The new `<FormField>` is the label/error/helper wrapper documented in
   [`examples/form-field.tsx`](./examples/form-field.tsx).

2. **Theme fonts are now opt-in.** If your project uses one of the built-in
   Elegant / Metro / Studio / Vivid themes, add a second import:

   ```diff
     import '@bloomneo/uikit/styles';
   + import '@bloomneo/uikit/styles/fonts';
   ```

   Projects using the default `base` theme or a custom theme need no change
   and benefit from a smaller CSS bundle automatically.

### Numbers

| Metric | Before | After |
|---|---|---|
| `any` in public types | ~12 sites | 0 |
| Bundled CSS (no theme fonts needed) | 214 KB | 148 KB |
| Font files shipped to projects that don't use them | ~30 woff | 0 |
| Documented examples per component | 0 | 13 + 5 composed recipes |
| Indexed exports in `llms.txt` | n/a | 236 |
| First-paint theme flash (FOUC) | yes | no |
| Cross-platform CSS build | broken on Windows | yes |

## [1.4.0] - 2025-12-17

### Added
- **`npx uikit prerender`** - Pre-render SPA routes to static HTML for SEO optimization
  - Uses Puppeteer for headless rendering
  - Supports custom SEO config via `seo.config.json`
  - Auto-generates canonical URLs and meta tags
- **`npx uikit optimize`** - Optimize images for web
  - Converts PNG/JPG to WebP format
  - Compresses and resizes images
  - Generates PNG fallbacks for older browsers

### Changed
- Standardized all template package.json scripts across single/spa/multi/fbca
- Updated dependency versions across all templates (vite ^7.0.0, tailwindcss ^4.1.8)
- Added `prerender` and `optimize` scripts to all project templates

### Fixed
- Template inconsistencies where single/fbca were missing bundle/serve/deploy scripts
- Removed unused dependencies (path, url) from templates

## [1.3.0] - 2025-11-XX

### Added
- **MobileLayout** - New layout for Capacitor/mobile apps with safe areas and tab bars
- **PopupLayout** - Layout for browser extensions (Chrome/Firefox)
- Cross-platform support (Web, Mobile via Capacitor, Desktop via Tauri, Extensions)

### Changed
- Updated to React 19 support
- Improved TypeScript types across all components

## [1.2.0] - 2025-10-XX

### Added
- **FBCA Template** - Feature-Based Component Architecture with auto-discovery routing
- CLI code generation (`npx uikit generate feature/page/component`)
- Theme bundling with watch mode

## [1.1.0] - 2025-09-XX

### Added
- **5 Professional Themes** - base, elegant, metro, studio, vivid
- OKLCH color system for better color manipulation
- Dark mode support with automatic switching

## [1.0.0] - 2025-08-XX

### Added
- Initial release with 37+ components
- 6 layouts (Admin, Page, Auth, Mobile, Popup, Blank)
- CLI tools for project creation
- Tailwind CSS v4 integration
