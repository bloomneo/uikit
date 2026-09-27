# Theming — @bloomneo/uikit

Rules for customizing and switching themes. Theming is the most common place agents break uikit apps. Read this before editing any color or writing CSS.

## When to do what

| User asks for | Do this |
|---|---|
| "Switch to dark mode" | Call `useTheme().setMode('dark')`. No CSS edits. |
| "Use our brand theme" / "Match our brand color" | Override the `base` tokens once in the app's CSS (see [Custom theme workflow](#custom-theme-workflow)). Components pick it up; no component edits. |
| "Make the button blue" | **Don't.** Components take brand color from the theme's `primary`. If they want one-off color, use `variant` — never override via className with raw colors. |
| "Create a custom theme" | Same: token overrides on `.theme-base` and `.theme-base.dark`. There is no theme CLI (6.0 removed it). |

## Built-in themes

`base` is the only bundled theme (4.0 removed `elegant`, `metro`, `studio` and `vivid`). Brand it by overriding its tokens in CSS; switch light/dark at runtime with `useTheme().setMode()`.

## The token contract

Every theme defines the same set of CSS variables (`--color-*`, declared in
`@bloomneo/uikit/theme`). Components consume them via semantic Tailwind
classes.

**In 3.0 raw palette classes are not merely discouraged — they produce no CSS.**
`@bloomneo/uikit/styles` removes Tailwind's default palette, so `bg-blue-500`
and `text-gray-900` compile to nothing and the element renders unstyled. That
is deliberate: a rule that only lives in documentation gets bypassed, and one
production app accumulated 1,547 hardcoded palette classes against 196 semantic
ones before this change.

Migrating a 2.x app? `@bloomneo/uikit/styles/permissive` restores the old
behaviour while you convert.

Core variables (the ones you'll touch when customizing):

| Variable | Class | When to change |
|---|---|---|
| `--color-primary` / `--color-primary-foreground` | `bg-primary` | Brand color. This is usually the only one to customize. Controls buttons, links, focus rings, active states, charts. |
| `--color-background` / `--color-foreground` | `bg-background` | Page background + primary text. Light mode: near-white bg, dark text. Dark mode: near-black bg, light text. |
| `--color-destructive` / `--color-destructive-foreground` | `bg-destructive` | Error/delete actions. Red family. |
| `--color-muted` / `--color-muted-foreground` | `bg-muted`, `text-muted-foreground` | Secondary text, subtle sections. |
| `--color-border`, `--color-input`, `--color-ring` | `border-border` | Borders, form inputs, focus rings. |
| `--color-chart1` … `--color-chart5` | `var(--color-chart1)` | Data visualization. Change if charts clash with brand. |
| `--color-sidebar` … `--color-sidebar-ring` | `bg-sidebar` | `AppShell`'s sidebar (8 vars). The active nav item uses `--color-sidebar-primary`, so set it with `--color-primary`. |

Hierarchy (for choosing the right class):
- **Backgrounds:** `bg-background` → `bg-card` → `bg-muted` → `bg-accent` (lightest to most-interactive)
- **Text:** `text-foreground` → `text-muted-foreground` → `text-primary` (primary to emphasis)

## OKLCH primer

Prefer OKLCH (`oklch(L C H)`) for new values; `base` itself is written in hex, and both work. Why OKLCH: is perceptually uniform — equal L values look equally bright regardless of hue. Fixes the classic "my blue primary looks darker than my green one" problem.

- `L` = Lightness (0–1). `0.5` = mid, `0.7` = light button bg, `0.3` = dark text.
- `C` = Chroma (saturation). `0` = gray, `0.2+` = vivid.
- `H` = Hue (0–360°). 0 = red, 120 = green, 240 = blue.

When converting from hex: use an OKLCH converter (e.g. `culori`), don't eyeball it.

## Custom theme workflow

In the app's CSS, after the uikit import, override only the tokens you change.
Light values go on `.theme-base`, dark values on `.theme-base.dark`:

```css
/* src/web/index.css (or your app's main stylesheet) */
@import "tailwindcss";
@import "@bloomneo/uikit/theme";

.theme-base {
  --color-primary: oklch(0.55 0.2 290);
  --color-primary-foreground: oklch(1 0 0);
  --color-ring: oklch(0.55 0.2 290);
  --color-sidebar-primary: oklch(0.55 0.2 290);
}
.theme-base.dark {
  --color-primary: oklch(0.75 0.14 290);
  --color-primary-foreground: oklch(0.2 0.05 290);
  --color-ring: oklch(0.75 0.14 290);
  --color-sidebar-primary: oklch(0.75 0.14 290);
}
```

Keep `theme="base"` on `ThemeProvider`. Base's typography and cursor rules are
scoped to `.theme-base`, so overriding it keeps them; a new `.theme-<name>`
class would have to repeat them, and `ThemeProvider` warns in development when
the applied `theme-*` class is not defined by any stylesheet.

## Dark mode rule

**Primary color must lighten in dark mode.** A dark-blue primary (`#1E40AF`) over a dark background is unreadable. Rule of thumb: dark-mode `primary` should be 2-3 lightness steps higher than light-mode `primary`.

- Light mode: `#1E40AF` (indigo-800) → Dark mode: `#60A5FA` (blue-400)
- Light mode: `#047857` (emerald-700) → Dark mode: `#34D399` (emerald-400)

Also: **dark mode backgrounds should never be pure `#000000`.** Use `#0A0A0A` or slightly tinted dark. Pure black flares against OLED/LCD glass.

## Incorrect / Correct

```tsx
// ❌ Hardcoded brand color — breaks on theme switch
<Button className="bg-blue-500 text-white">Save</Button>
// ✅ Uses the theme's primary
<Button>Save</Button>

// ❌ Inline color style — invisible to theming
<div style={{ backgroundColor: '#1E40AF' }}>…</div>
// ✅ Semantic token
<div className="bg-primary">…</div>

// ❌ Hardcoded text color
<p className="text-gray-500">Subtitle</p>
// ✅ Semantic muted token
<p className="text-muted-foreground">Subtitle</p>

// ❌ Styling one component with its own colour
// src/styles/brand.css → .my-button { background: #1E40AF; }
// ✅ Overriding the token every component reads
// .theme-base { --color-primary: #1E40AF; }

// ❌ Raw border color
<div className="border border-gray-200">…</div>
// ✅ Theme border
<div className="border border-border">…</div>

// ❌ Setting tokens from JavaScript at runtime
document.documentElement.style.setProperty('--color-primary', '#1E40AF');
// ✅ Token overrides in the stylesheet; useTheme for light/dark
useTheme().setMode('dark');
```

## Troubleshooting

| Problem | Fix |
|---|---|
| Theme changes not showing | Put the overrides AFTER `@import "@bloomneo/uikit/theme"`, on `.theme-base` / `.theme-base.dark`, and check the dev-server CSS reloaded |
| Colors look washed out in dark mode | Lighten `primary` — see dark mode rule above |
| Chart colors clash with brand | Override `--color-chart1` … `--color-chart5` |
| Sidebar looks wrong | `AppShell`'s sidebar reads the `--color-sidebar*` tokens separately; override them alongside `--color-primary` |
| FOUC (flash of default theme) on load | Ensure `<script>{foucScript()}</script>` is in `index.html` `<head>`, not body |

## Don't do

- Don't write per-component CSS for brand colors. Override the tokens once.
- Don't use Tailwind palette classes (`bg-blue-500`, `text-red-600`). Under the default stylesheet they emit no CSS at all — the element just has no colour.
- Don't edit compiled CSS in `node_modules/@bloomneo/uikit/dist/` — override tokens in your own CSS.
- Don't set `primary` to a color with low contrast against white — button text becomes unreadable.
