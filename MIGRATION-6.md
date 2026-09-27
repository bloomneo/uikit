# Migrating to @bloomneo/uikit 6

> Work in progress on the `next` branch (6.0.0-alpha). Filled in as each change lands.
> The plan: `~/vc/production/BLOOMNEO-6-CHECKLIST.md` (Phase 5).

Every component the production apps import keeps its name and props.

## Versioning

appkit, uikit and bloom now release together on one version number. uikit
jumps from 4.x to 6.0.0 to join that line; there is no uikit 5.

## Removed

None of these were imported by any of the four production apps (counted
2026-09-26). Each is banned by the drift check.

| Removed | Use instead |
|---|---|
| `Form`, `FormController`, `FormItem`, `FormLabel`, `FormMessage`, `FormControl`, `FormDescription` (the react-hook-form + Zod wrapper) | `FormField` for label, error and a11y wiring. If you use react-hook-form, depend on it directly |
| `HoverCard`, `HoverCardContent`, `HoverCardTrigger` | `Tooltip` for hints, `Popover` for interactive content |
| `Command*` exports (still used inside `Combobox`) | `Combobox` for searchable selects |
| Platform detection (`detectPlatform`, `isTauri`, `isNative`, `isMobile`, `getPlatformCapabilities`, …) | `useBreakpoint` for layout; Capacitor's own `Capacitor.isNativePlatform()` in a native build |
| `useLocalStorage`, `useBackendStatus`, `usePagination` | a small local hook; `DataTable` paginates on its own |
| The `uikit` CLI (`uikit generate`, `uikit bundle`) | create files directly; there is one theme, `base` |

## Added

_None yet._
