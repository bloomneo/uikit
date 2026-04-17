# Changelog

All notable changes to UIKit will be documented in this file.

## [1.6.0] - 2026-04-17

Governance + agent-friendliness audit. Closes the gap between uikit and
`@bloomneo/appkit@4.0.0`'s drift-gate discipline. Pure additive — no
breaking changes, no migration needed.

### Added — drift gates

- **`scripts/check-doc-drift.ts`** — scans docs, examples, cookbook,
  skills, scaffolding templates, and `src/` for stale scope references
  (`@voilajsx/uikit`), hallucinated callback names (`<Combobox onValueChange>`,
  `<Select onChange>`), renamed legacy names (`FormController`), and wrong
  `<DataTable data={undefined}>` usage. Handles `❌`/`✅` teaching pairs and
  diff-block (`-`/`+`) migration lines without false-positives.
- **`scripts/check-readme-anchors.ts`** — verifies every `UIKitError`
  docs URL (implicit or explicit) resolves to a real heading in
  `llms.txt`. Catches errors pointing at dead anchors.
- **`tests/public-surface.test.ts`** — 74 assertions over every expected
  export in `src/index.ts` (components, hooks, utilities, error types,
  provider pairings). Catches removed exports and broken re-exports in
  one file.
- **`.github/workflows/ci.yml`** — runs `check:docs` + `check:anchors` +
  `test:unit` + `typecheck` + `build` on Node 18/20/22 for every push
  and pull request.
- **`npm test`** now runs the drift-check + anchor-check + vitest in
  order. `npm run test:unit` is vitest-only. `npm run test:watch` is the
  old interactive mode.

### Added — error taxonomy

- `UIKitError` re-exports every typed subclass so a consumer can catch
  `instanceof UIKitError` and match every uikit error in one clause:
  `DataTableError`, `FormFieldError`, `ThemeError`, `ConfirmError`,
  `ToastError`, `PermissionError`.

### Added — Next.js App Router compatibility

- **`'use client';` directive** added to every file in
  `src/components/ui/` (44 components). uikit components all use React
  hooks, refs, and event handlers; the directive marks them correctly as
  client boundaries so Next.js 13+ App Router consumers no longer need
  to write their own wrappers.

### Added — docs

- **`docs/NAMING.md`** — codifies the React-library naming conventions
  (PascalCase components, `use`-prefixed hooks, `onValueChange` vs
  `onChange` rules, variant/size props, ref-forwarding pattern, error
  handling, and a component-picker decision tree).
- **`examples/use-api.tsx`** — the missing example for `useApi<T>()`.
  Shows GET-on-mount + POST with error handling + loading skeleton +
  toast feedback.

### Changed

- **`package.json` description** no longer claims "Cross-platform (web,
  desktop, mobile, extensions) with OKLCH color science." That was
  aspirational; reality is web-first React DOM with detection helpers.
  New: *"React component library AI coding agents pick first... Web-first
  (React DOM); ships platform-detection utilities for Tauri/React
  Native/extensions but not yet full adapters."* `react-native`, `tauri`,
  `expo`, `chrome-extension`, `popup-layout`, `oklch`, and
  `cross-platform` keywords removed to match.
- **`AGENTS.md` provider order** now matches the canonical cookbook and
  `llms.txt` ordering: `<ThemeProvider> > <ToastProvider /> (sibling) +
  <ConfirmProvider>{children}</ConfirmProvider>`. Previous AGENTS.md
  example had the Confirm/Toast order swapped.
- **`package.json` `files:`** now includes `AGENTS.md` and `skills/` so
  both ship in the npm tarball. Consumers previously installed
  `@bloomneo/uikit` and never got the AGENTS.md that the README tells
  them to read first.

### Known — queued for a future major

- Combobox uses `onChange` while Select uses `onValueChange`. The split
  is documented in AGENTS.md + SKILL.md and caught by drift-check, but
  unifying them is breaking. Queued for 2.0.
- Real per-component behavior tests under `src/**/*.test.tsx` — 1.6.0
  adds the shape-level gate (`tests/public-surface.test.ts`) but not
  component-behavior tests. Start with DataTable, Form primitives, and
  ThemeProvider as the highest-value three.

### Removed

- Stale `pages/` directory (487MB bloomneo.github.io docs-site nested
  subproject). Was git-ignored, not shipped to npm, no references from
  build or library code. Cleanup only — no observable change for
  consumers.

## [1.5.1] - 2026-04-11

A focused follow-up to 1.5.0. Fixes the one publicly-documented type bug from
the AI-ready release, plus lands four small "production reliability + missing
primitives" items from real-world feedback. Pure additive — no breaking
changes, no migration needed.

### Fixed

- **`<DataTable<T>>` generic erasure** — `DataTable` was exported via
  `forwardRef<HTMLTableElement, DataTableProps>`, which erases the row
  generic at the value level. Consumers writing `<DataTable<User> data={...} />`
  (the exact pattern from `examples/data-table.tsx`) hit
  `TS2558: Expected 0 type arguments, but got 1`. The fix is the canonical
  generic-forwardRef recipe: cast the forwardRef result to a generic call
  signature so `T` propagates from the JSX type argument back into `data`,
  `columns`, `actions`, `getRowId`, and the cell renderers. Same runtime
  behavior, type-safe consumer API.
- **README example count** — README claimed 13 example files; `examples/`
  actually shipped 12. Updated to match reality (now 15 with the new files
  added below).

### Added — production reliability (FBCA template)

These three fixes apply to the `bin/templates/fbca/.../page-router.tsx`
template that gets copied into newly-scaffolded projects. Existing scaffolded
projects need to either re-scaffold or apply the diff manually.

- **Default branded 404 page** — the old fallback rendered a debug message
  that **leaked the full route map to end users** (a security smell on every
  scaffolded site). Replaced with a theme-aware 404 page (logo-friendly, "back
  to home" CTA, uses CSS variables so it follows the active theme). Pass
  `<PageRouter notFound={<Custom404 />}>` to override.
- **Default error boundary** — a single page throwing a runtime error used
  to white-screen the entire SPA. The router now wraps every route in a
  default error boundary that shows a branded "Something went wrong / reload"
  page. Override with `<PageRouter errorBoundary={<MyError />} onError={(err) => sendToSentry(err)} />`.
- **Code splitting per route by default** — `import.meta.glob` now uses
  lazy mode (`{ eager: false }`), each page is wrapped in `React.lazy()` +
  `Suspense`, and the router supplies a default loading fallback. Tiny apps
  that prefer the old eager behavior can opt out with `<PageRouter eager />`.

### Added — runtime primitives

- **`<PermissionGate>` + `<PermissionProvider>` + `usePermission()`** —
  unopinionated role-gating primitive for multi-role apps. Bring your own
  auth source via a `check(permission: string) => boolean` function on the
  provider; `<PermissionGate when="admin">`, `when={['admin', 'mod']}` (OR),
  or `when={() => predicate}` are all supported. Replaces the
  `{user.roles.includes('admin') && <Button />}` pattern that gets repeated
  dozens of times in any admin app. See `examples/permission-gate.tsx`.
- **`usePagination()` hook** — pagination state machine. The
  `<Pagination>` UI component already shipped, but the state (current page,
  total, hasNext, hasPrev, ellipsis logic, page-link compression) was DIY in
  every list view. Returns `page`, `pageCount`, `startIndex`, `endIndex`,
  `hasNext`, `hasPrev`, `pages` (with `'ellipsis-start'` / `'ellipsis-end'`
  markers), and `goTo` / `next` / `prev` / `first` / `last` callbacks.
  See `examples/use-pagination.tsx`.
- **`<Combobox>` searchable Select** — for dropdowns with more than ~20
  options where typing-to-filter beats scrolling. Built on the existing
  `Command` (cmdk) + `Popover` primitives so no new dependencies. API is
  intentionally close to `<Select>`: `value` / `onChange` / `options` with
  `{ value, label }` shape. Supports `clearable`, `disabled`, custom
  `renderOption`, and configurable popover width. See `examples/combobox.tsx`.

### Verified, not changed

- **HeaderNav mobile hamburger** (1.5 feedback #17) — verified the existing
  v1.5.0 implementation already ships a working hamburger menu with body
  scroll lock, dropdown handling, and a `<md` breakpoint. The original
  feedback was based on outdated source. A `collapseAt` prop for
  configurable breakpoints is a nice-to-have for a future release; it's
  not closing a real production gap today.

### Numbers

| Metric | 1.5.0 | 1.5.1 |
|---|---|---|
| Public exports | 236 | ~248 |
| Example files | 12 | 15 |
| New UI components | — | 2 (PermissionGate, Combobox) |
| New hooks | — | 1 (usePagination) |
| Template fixes | — | 3 (404, error boundary, code splitting) |
| Type bugs fixed | — | 1 (DataTable generic erasure) |

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
