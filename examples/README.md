# UIKit Examples

One file per component. Each file is the **minimum runnable snippet** —
nothing extra, nothing fancy. Designed to be copy-pasted into a real project
and tweaked.

These files are also indexed by the `llms.txt` generator so AI coding agents
can pattern-match against a known-good snippet for every component.

For composed patterns (CRUD pages, dashboards, login flows), see
[`../cookbook/`](../cookbook/) instead.

## Conventions

- Always import from `@bloomneo/uikit` (the canonical entry point).
- One default export per file: a working component you can drop into any app.
- No router, no API calls — all data is inline so the example stays runnable.
- Comments explain *why* a prop is set, not what TypeScript already says.
