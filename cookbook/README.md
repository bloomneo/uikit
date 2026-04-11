# UIKit Cookbook

Whole-page patterns assembled from UIKit primitives. These are the recipes
agents and humans should reach for when starting a new feature, instead of
designing the layout from scratch.

Each file is a single drop-in component with realistic but minimal data.
Copy, rename, swap the data source, and ship.

## Recipes

| File | Pattern |
|---|---|
| [`crud-page.tsx`](./crud-page.tsx) | List → search/sort → row actions → delete with confirmation → toast |
| [`dashboard.tsx`](./dashboard.tsx) | Sidebar layout + header + stats grid + recent activity table |
| [`settings.tsx`](./settings.tsx) | Tabs + form sections + save toast |
| [`login.tsx`](./login.tsx) | Centered card + email/password form + validation errors |
| [`delete-flow.tsx`](./delete-flow.tsx) | Destructive action with type-to-confirm + toast |

For single-component snippets see [`../examples/`](../examples/).
