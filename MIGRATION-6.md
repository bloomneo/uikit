# Migrating to @bloomneo/uikit 6

Every component the production apps import keeps its name and props. If your
app only uses the components, hooks and helpers that are still listed in
`llms.txt`, upgrading is a version bump.

## Versioning

appkit, uikit and bloom now release together on one version number. uikit
jumps from 4.x to 6.0.0 to join that line; there is no uikit 5.

## Removed

None of these were imported by any of the four production apps (counted
2026-09-26). The drift check bans the names in docs, examples and source.

### Exports from `@bloomneo/uikit`

| Removed | Use instead |
|---|---|
| `Form`, `FormController`, `FormItem`, `FormLabel`, `FormMessage`, `FormControl`, `FormDescription` (the react-hook-form + Zod wrapper; `FormController` was its alias for react-hook-form's field controller) | `FormField` for label, error, helper text and a11y wiring. If you use react-hook-form, depend on it directly and render `FormField` inside its `Controller` |
| `HoverCard`, `HoverCardContent`, `HoverCardTrigger` | `Tooltip` for hints, `Popover` for interactive content |
| `Command`, `CommandDialog`, `CommandEmpty`, `CommandGroup`, `CommandInput`, `CommandItem`, `CommandList`, `CommandSeparator`, `CommandShortcut` | `Combobox` for searchable selects (it still uses cmdk inside). For a Cmd+K palette, depend on `cmdk` directly |
| Platform detection: `detectPlatform`, `isBrowser`, `isNative`, `isTauri`, `isNode`, `isSSR`, `isMobile`, `isTablet`, `isDesktop`, `getDeviceType`, `getBrowserInfo`, `getOperatingSystem`, `getPlatformCapabilities`, `supportsFeature`, `PLATFORMS`, `platform` | `useBreakpoint` / `useMediaQuery` for layout; `Capacitor.isNativePlatform()` in a Capacitor build; `typeof window === 'undefined'` for SSR |
| `useLocalStorage` | a small local hook around `localStorage` |
| `useBackendStatus` | `useApi().get('/health')`, or `useQuery` from `@bloomneo/uikit/data` |
| `usePagination` | `DataTable` paginates on its own; `useDataTable` for a headless table |

### Types

| Removed | Use instead |
|---|---|
| `EnhancedFormProps`, `InputFieldProps`, `SelectFieldProps`, and the react-hook-form generic `FormFieldProps<T>` in `src/types` | `FormFieldProps` (still exported; it is the `FormField` component's props) |
| Re-exported third-party types: `FieldValues`, `FieldPath`, `UseFormReturn`, `SubmitHandler`, `SubmitErrorHandler` (react-hook-form), `ZodSchema` (zod) | import them from `react-hook-form` / `zod` |
| `Platform` | none |
| `UseLocalStorageReturn`, `UsePaginationOptions`, `UsePaginationReturn`, `PaginationPage` | none |

### Subpath entries

| Removed | Use instead |
|---|---|
| `@bloomneo/uikit/form` | `FormField` from `@bloomneo/uikit` (or `@bloomneo/uikit/form-field`) |
| `@bloomneo/uikit/hover-card` | `@bloomneo/uikit/tooltip` or `@bloomneo/uikit/popover` |
| `@bloomneo/uikit/command` | `@bloomneo/uikit/combobox` |
| `@bloomneo/uikit/platform` | see platform detection above |

`@bloomneo/uikit/hooks` loses the same three hooks as the root entry.

### The `uikit` CLI

The package no longer has a `bin`. `uikit generate page|component|hook|feature`
and `uikit bundle` are gone: create files directly, and scaffold apps with
`@bloomneo/bloom`.

`uikit generate theme <name>` is replaced by CSS. `base` is the only bundled
theme; to brand it, override its tokens in your own stylesheet after the uikit
import:

```css
@import "tailwindcss";
@import "@bloomneo/uikit/theme";

.theme-base      { --color-primary: #7c3aed; --color-ring: #7c3aed; }
.theme-base.dark { --color-primary: #a78bfa; --color-ring: #a78bfa; }
```

### Dependencies

Dropped: `react-hook-form`, `@hookform/resolvers`, `zod`,
`@radix-ui/react-hover-card`, `commander`. If your app imported any of these
without declaring them itself, add them to your own `package.json`.

## Added

| Added | Replaces |
|---|---|
| `AppShell` (also `@bloomneo/uikit/app-shell`), with types `AppShellProps`, `AppShellNavItem`, `AppShellLinkProps`: sidebar (collapsible to an icon rail, remembered per browser), header, mobile navigation in a sheet, active item from `currentPath`, router-agnostic via `linkComponent` | uikit 2.x `PageLayout` / `Header` / `HeaderNav` (removed in 4.0), and the hand-built shells in apps created since |
| `@bloomneo/uikit/router`: `PageRouter` (pass the app's `import.meta.glob`), `pathFromFile`, `discoverRoutes`, and types `RouteLayout`, `PageRouterProps`, `PageGlob`, `DiscoveredRoute` | the ~390-line `src/web/lib/page-router.tsx` copied into every Bloom app |
| `@bloomneo/uikit/data`: `useQuery(client, contract, input?, { enabled? })`, `useMutation(client, contract)`, and types `QueryState`, `QueryOptions`, `MutationState`, `ContractLike`, `ClientLike`, `ResponseOf` | per-page `useEffect` + fetch (or `useApi`) for routes that have contracts |

### Adopting `@bloomneo/uikit/router`

Replace the app's copy of the router with the package's. The glob stays in
the app, because Vite resolves `import.meta.glob` relative to the file that
calls it:

```tsx
import { PageRouter, type RouteLayout } from '@bloomneo/uikit/router';

const pages = import.meta.glob(['./features/*/pages/**/*.{tsx,jsx}', '!**/_*.{tsx,jsx}', '!**/_*/**']);
const layouts: RouteLayout[] = [{ match: (p) => p.startsWith('/dashboard'), Layout: DashboardLayout }];

<BrowserRouter>
  <PageRouter pages={pages} layouts={layouts} />
</BrowserRouter>
```

File-to-URL rules are the ones the copied router used, including lowercased
segments: `[userId].tsx` gives `:userid`, so pages keep reading their params by
the same names. Then delete `src/web/lib/page-router.tsx`.

`react-router-dom` (>= 6.20) is a new optional peer dependency: install it if
you use `@bloomneo/uikit/router`. Nothing else in uikit needs it.

### Adopting `@bloomneo/uikit/data`

```tsx
import { createClient } from '@bloomneo/bloom';
import { useQuery, useMutation } from '@bloomneo/uikit/data';

const api = createClient({ baseUrl: import.meta.env.VITE_API_URL, getToken });

const invoices = useQuery(api, listInvoices, { query: { page } });
const create = useMutation(api, createInvoice);
await create.mutate({ body: { total } });
```

uikit reads the contract and client structurally, so it has no dependency on
bloom; the types come from the contract's `response` schema.

## Changed

- **Build output is no longer in git.** `dist/` is built in CI and by
  `prepublishOnly`, which now builds before it tests. The npm package is
  unchanged; installing uikit straight from a GitHub URL no longer gives you a
  built package.
- **Package description** no longer claims platform-detection utilities.
- **Tooltip and Popover** guidance (`@llm-rule` headers) no longer points at
  `HoverCard`.
- `next-themes` stays a dependency: `Toaster` uses it.
