# Component tests

DOM tests run under `happy-dom` in a separate vitest project from the node
suites (`tests/*.test.ts`), which shell out to the real Tailwind CLI and would
only be slowed by a DOM. Configuration lives in `vite.config.ts` under
`test.projects`.

> jsdom rather than happy-dom would be the more common choice, but jsdom 27
> fails to load on Node 20.17 — a transitive CJS/ESM conflict in
> `@asamuzakjp/css-color`.

## What these cover, and why these things

The library's stated defence against agent mistakes is *educational runtime
errors* and *documented prop contracts*. Both were previously unverified: 4.0's
134 tests were 60 export-surface assertions and 74 CSS assertions, and not one
rendered a component.

The gap was not theoretical. Building the 4.0 demo I wrote `{ key: 'id' }`
instead of `{ id: 'id' }` and `cell: (row) => …` when the signature is
`(value, row, index)`. Vite built it without complaint — esbuild strips types
without checking them — and the only symptom was a React key warning in a
browser console that happened to be open.

| File | Covers |
|---|---|
| `controlled-props.test.tsx` | The contract AGENTS.md calls the #1 agent failure mode: `onChange` (native) vs `onCheckedChange` (Radix checkables) vs `onValueChange` (pickers). Each asserted by driving the component and checking which callback fires with what. |
| `data-table.test.tsx` | The column contract (`id` required, `cell` receives value-first, `accessor` beats `accessorKey`), plus sorting, search, empty/loading/error states, and the educational throw on non-array `data`. |
| `providers-and-guards.test.tsx` | Duplicate-provider warnings, required-prop errors naming the fix, `PermissionGate` failing closed, `useConfirm` resolving true/false, and `ThemeProvider` owning the `theme-*` class on `<html>`. |

## These were mutation-tested

Every behavioural assertion here was checked by breaking the source and
confirming the test fails — a green test proves nothing until you have seen it
go red.

That exercise paid for itself twice. Swapping `handleSort` for a no-op was
caught; but swapping the search's `includes` for `startsWith` was **not**,
because every search assertion happened to query a prefix. `search matches a
substring, not just a prefix` exists because of that miss.

If you add a test here, mutate the code it covers and watch it fail before you
commit it.

## Deliberately not asserted

That a missing column `id` also triggers React's own "unique key" warning.
React dedupes that per call site, so whether it fires depends on which test ran
first — an assertion about React's internals rather than this library's
contract.
