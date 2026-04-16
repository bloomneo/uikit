# UIKit Cookbook

Whole-page patterns assembled from UIKit primitives. These are the recipes
agents and humans should reach for when starting a new feature, instead of
designing the layout from scratch.

Each file is a single drop-in component with realistic but minimal data.
Copy, rename, swap the data source, and ship.

## Prerequisite: app-root providers

Every recipe assumes this provider tree is mounted at your app root. Recipes
do NOT re-mount providers — doing so would trigger UIKit's duplicate-mount
warnings in dev and cause duplicate toasts/dialogs in prod.

```tsx
// app entry (e.g. main.tsx / App.tsx)
import '@bloomneo/uikit/styles';
import {
  ThemeProvider,
  ToastProvider,
  ConfirmProvider,
} from '@bloomneo/uikit';

function Root({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme="base" mode="light">
      <ToastProvider />
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </ThemeProvider>
  );
}
```

Also add `<script>{foucScript()}</script>` (from `@bloomneo/uikit/fouc`) to
your `index.html` `<head>` to prevent flash-of-default-theme on load.

## Recipes

| File | Pattern | Needs |
|---|---|---|
| [`crud-page.tsx`](./crud-page.tsx) | List → search/sort → row actions → delete with confirmation → toast | `ToastProvider`, `ConfirmProvider` |
| [`dashboard.tsx`](./dashboard.tsx) | Stats grid + recent activity table inside page shell | — (ThemeProvider only) |
| [`settings.tsx`](./settings.tsx) | Tabs + form sections + save toast | `ToastProvider` |
| [`login.tsx`](./login.tsx) | Centered card + email/password form + validation errors | `ToastProvider` |
| [`delete-flow.tsx`](./delete-flow.tsx) | Destructive action with type-to-confirm + toast | `ToastProvider`, `ConfirmProvider` |

For single-component snippets see [`../examples/`](../examples/).
