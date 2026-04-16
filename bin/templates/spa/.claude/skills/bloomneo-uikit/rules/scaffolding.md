# Scaffolding & project structure

How the `uikit` CLI scaffolds projects and where code lives in each template. Use this when creating new projects or navigating a scaffolded app.

## Picking a template

| Template | Command | When to use |
|----------|---------|-------------|
| **single** | `npx uikit create <name>` | Learning, component demos, single-page prototypes. No router. |
| **spa** | `npx uikit create <name> --spa` | Marketing sites, portfolios. React Router, all pages in one `App.tsx`. |
| **multi** | `npx uikit create <name> --multi` | Business apps / SaaS. Separate layouts (Admin, Auth, Page), pages split into files. |
| **fbca** | `npx uikit create <name> --fbca` | Enterprise / large teams. Feature-based folders with auto-discovery routing. |

Optional: `--theme <name>` to pick a starting theme (base, elegant, metro, studio, vivid).

## Where to edit

### single

```
src/
├── App.tsx      # the whole app — edit this
├── main.tsx     # ThemeProvider mounts here
└── index.css
```

### spa

```
src/
├── App.tsx      # all page components + router config
├── main.tsx     # ThemeProvider mounts here
└── index.css
```

### multi

```
src/
├── App.tsx              # layout switcher (chooses layout by route)
├── router.tsx           # route → component map
├── main.tsx             # ThemeProvider mounts here
├── pages/               # one file per page
├── components/          # shared Header, Footer, etc.
└── index.css
```

### fbca

```
src/web/
├── App.tsx                              # root router with <PageRouter />
├── main.tsx                             # ThemeProvider mounts here
├── lib/page-router.tsx                  # auto-discovery engine — do not edit
├── features/<feature>/pages/*.tsx       # auto-routed (see below)
├── features/<feature>/components/       # feature-local components
├── features/<feature>/hooks/            # feature-local hooks
└── shared/{components,hooks,utils}/     # cross-feature
```

## FBCA auto-routing

File structure maps directly to URL. No route config needed.

| File | Route |
|------|-------|
| `features/main/pages/index.tsx` | `/` |
| `features/main/pages/about.tsx` | `/about` |
| `features/auth/pages/index.tsx` | `/auth` |
| `features/gallery/pages/[id].tsx` | `/gallery/:id` (dynamic) |
| `features/docs/pages/[...slug].tsx` | `/docs/*` (catch-all) |

**Rule:** adding a new page = creating a file in `features/<feature>/pages/`. Never hand-edit the router.

## Adding things (fbca)

```bash
npx uikit generate feature <name>       # scaffold full feature folder
npx uikit generate page <name>          # single page component
npx uikit generate component <Name>     # reusable component
npx uikit generate hook use<Name>       # custom hook
npx uikit generate theme <name>         # custom theme preset
```

The generator enforces the folder convention — prefer it over hand-creating files.

## Dev / build / deploy

```bash
npx uikit serve              # dev server (handles port conflicts, bundles themes)
npx uikit serve --port 3001  # explicit port
npx uikit build              # production build → /dist
npx uikit build --analyze    # with bundle analysis
npx uikit preview            # serve production build locally
npx uikit bundle             # compile custom themes to CSS
npx uikit bundle --watch     # watch mode for theme dev
npx uikit deploy             # build + prepare /dist for any static host
npx uikit deploy --github    # automated GitHub Pages (creates .nojekyll, pushes gh-pages)
npx uikit deploy --github --domain example.com  # with CNAME
```

For other hosts: `npx uikit build` then upload `/dist/` (Netlify drop, `vercel --prod`, `aws s3 sync`, etc.).

## Common gotchas

- **Port in use** → `npx kill-port 3000` or `npx uikit serve --port 3001`
- **Module errors after upgrade** → `rm -rf node_modules package-lock.json && npm install`
- **Theme changes not showing** → `npx uikit bundle` then restart `serve`
- **FBCA route not picked up** → file must be under `features/<feature>/pages/`; `index.tsx` = feature root
