/**
 * @bloomneo/uikit/router — file-based page routing for Bloom apps.
 *
 * @llm-rule WHEN: Wiring page routes in a Bloom (FBCA) web app
 * @llm-rule AVOID: Copying a page router into the app — pass the app's glob to <PageRouter> instead
 * @llm-rule NOTE: import.meta.glob must be written in the APP (Vite resolves it relative to that file); pass the result as `pages`
 * @llm-rule NOTE: Needs react-router-dom (optional peer) and a <BrowserRouter> above it
 *
 * Every Bloom app used to carry its own ~390-line copy of this router, and
 * three of the four production apps had edited theirs in the same ways (lazy
 * loading, eager pages, 404, error boundary). The logic lives here now; the
 * app keeps one line, the glob:
 *
 * ```tsx
 * import { PageRouter } from '@bloomneo/uikit/router';
 *
 * const pages = import.meta.glob([
 *   './features/* /pages/** /*.{tsx,jsx}',   // (no spaces)
 *   '!** /_*.{tsx,jsx}',
 *   '!** /_* /**',
 * ]);
 *
 * <BrowserRouter><PageRouter pages={pages} layouts={layouts} /></BrowserRouter>
 * ```
 *
 * File → route:
 *   features/users/pages/index.tsx      → /users
 *   features/users/pages/[id].tsx       → /users/:id
 *   features/docs/pages/[...path].tsx   → /docs/*
 *   features/main/pages/about.tsx       → /about   (`main` maps to '/')
 *   files or folders starting with `_`  → not routes (co-located helpers)
 */
import * as React from 'react';
import { Component, Suspense, useEffect, useMemo, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

type PageModule = { default: ComponentType<unknown> };

/** What `import.meta.glob(...)` returns without `{ eager: true }`. */
export type PageGlob = Record<string, () => Promise<unknown>>;

export interface DiscoveredRoute {
  path: string;
  /** The file it came from, e.g. `./features/users/pages/[id].tsx`. */
  file: string;
  component: ComponentType<unknown>;
}

/**
 * Map a page file to its route, or null when the file is not a page.
 *
 * `routeBase` lets a feature own any URL prefix instead of its folder name
 * (`{ billing: '/account' }` puts features/billing/pages/plan.tsx at
 * /account/plan). `main` defaults to '/'.
 */
export function pathFromFile(filePath: string, routeBase: Record<string, string> = {}): string | null {
  const match = filePath.match(/(?:^|\/)features\/([^/]+)\/pages\/(.+)\.[jt]sx?$/);
  if (!match) return null;
  const [, feature, nested] = match;
  const segments = nested.split('/');

  // Co-located helpers (`_shared.tsx`, `_parts/…`) are never routes.
  if (segments.some((s) => s.startsWith('_'))) return null;

  // Whole segments are lowercased, dynamic ones included — `[userId]` gives
  // `:userid` — because every earlier copy of this router did, and pages read
  // their params by those names.
  const toRoute = (s: string) => {
    if (s.startsWith('[...') && s.endsWith(']')) return '*';
    if (s.startsWith('[') && s.endsWith(']')) return `:${s.slice(1, -1)}`;
    return s;
  };
  const rest = segments
    .filter((s) => s !== 'index')
    .map((s) => toRoute(s.toLowerCase()))
    .join('/');

  const bases: Record<string, string> = { main: '/', ...routeBase };
  const base = feature in bases ? bases[feature] : `/${feature}`;
  const prefix = base === '/' ? '' : base.replace(/\/+$/, '');
  return `${prefix}/${rest}`.replace(/\/{2,}/g, '/').replace(/(.)\/$/, '$1') || '/';
}

/** Longer (more specific) paths first; '/' last. */
function sortRoutes(routes: DiscoveredRoute[]): DiscoveredRoute[] {
  return routes.sort((a, b) => {
    if (a.path === '/') return 1;
    if (b.path === '/') return -1;
    return b.path.length - a.path.length;
  });
}

/** Turn a page glob into lazily loaded routes. Exposed for tests and tooling. */
export function discoverRoutes(pages: PageGlob, routeBase: Record<string, string> = {}): DiscoveredRoute[] {
  const routes: DiscoveredRoute[] = [];
  const seen = new Map<string, string>();
  for (const [file, load] of Object.entries(pages)) {
    const path = pathFromFile(file, routeBase);
    if (!path) continue;
    const clash = seen.get(path);
    if (clash && process.env.NODE_ENV !== 'production') {
      // Two files, one URL: the second silently wins in react-router. Say so.
      console.warn(`[@bloomneo/uikit/router] ${file} and ${clash} both map to ${path}`);
    }
    seen.set(path, file);
    routes.push({ path, file, component: React.lazy(load as () => Promise<PageModule>) });
  }
  return sortRoutes(routes);
}

const DefaultNotFound = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
    <p className="text-sm font-medium text-muted-foreground">404</p>
    <h1 className="text-3xl font-semibold tracking-tight text-foreground">Page not found</h1>
    <p className="max-w-md text-sm text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
    <a
      href="/"
      className="mt-2 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Back to home
    </a>
  </div>
);

const DefaultError = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
    <p className="text-sm font-medium text-destructive">Something went wrong</p>
    <h1 className="text-3xl font-semibold tracking-tight text-foreground">An error occurred</h1>
    <p className="max-w-md text-sm text-muted-foreground">Please refresh the page. If the problem persists, contact support.</p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-2 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Reload page
    </button>
  </div>
);

const DefaultFallback = () => (
  <div className="flex min-h-[30vh] items-center justify-center" aria-label="Loading">
    <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
  </div>
);

class RouteErrorBoundary extends Component<
  { fallback: ReactNode; onError?: (error: Error, info: ErrorInfo) => void; resetKey: string; children: ReactNode },
  { failedAt: string | null }
> {
  state = { failedAt: null as string | null };

  static getDerivedStateFromError() {
    return { failedAt: '__pending__' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ failedAt: this.props.resetKey });
    this.props.onError?.(error, info);
    if (process.env.NODE_ENV !== 'production') console.error('[@bloomneo/uikit/router] Page threw:', error);
  }

  render() {
    // Navigating away clears the error, so one broken page doesn't take the
    // rest of the app down with it.
    const { failedAt } = this.state;
    if (failedAt && (failedAt === '__pending__' || failedAt === this.props.resetKey)) return this.props.fallback;
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Pages whose path matches `match` render inside `Layout`, which renders
 * <Outlet /> and stays mounted while its child routes change. First match
 * wins, so put specific matchers (`/admin`) before broad ones (`/`).
 */
export interface RouteLayout {
  match: (path: string) => boolean;
  Layout: ComponentType;
}

export interface PageRouterProps {
  /** REQUIRED: The app's `import.meta.glob(...)` of page files. */
  pages: PageGlob;
  /** OPTIONAL: Per-feature URL prefixes, e.g. `{ billing: '/account' }`. `main` is '/'. */
  routeBase?: Record<string, string>;
  /** OPTIONAL: Layout groups. */
  layouts?: RouteLayout[];
  /** OPTIONAL: 404 element. */
  notFound?: ReactNode;
  /** OPTIONAL: Shown when a page throws. */
  errorElement?: ReactNode;
  /** OPTIONAL: Called when a page throws — report it to the server log. */
  onError?: (error: Error, info: ErrorInfo) => void;
  /** OPTIONAL: Shown while a page's code loads. */
  fallback?: ReactNode;
}

export function PageRouter({
  pages,
  routeBase,
  layouts = [],
  notFound,
  errorElement,
  onError,
  fallback,
}: PageRouterProps): React.JSX.Element {
  const { pathname } = useLocation();
  // The glob is resolved at build time, so the route list never changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routes = useMemo(() => discoverRoutes(pages, routeBase), []);

  const { grouped, bare } = useMemo(() => {
    const byLayout = new Map<RouteLayout, DiscoveredRoute[]>();
    const rest: DiscoveredRoute[] = [];
    for (const route of routes) {
      const layout = layouts.find((l) => l.match(route.path));
      if (layout) byLayout.set(layout, [...(byLayout.get(layout) ?? []), route]);
      else rest.push(route);
    }
    return { grouped: byLayout, bare: rest };
  }, [routes, layouts]);

  const loading = fallback ?? <DefaultFallback />;
  // Every page is lazy, so every page gets a Suspense boundary here. Leaving it
  // to layouts meant a layout without one rendered a blank screen, no error.
  const page = (Page: ComponentType<unknown>) => (
    <Suspense fallback={loading}>
      <Page />
    </Suspense>
  );

  return (
    <RouteErrorBoundary fallback={errorElement ?? <DefaultError />} onError={onError} resetKey={pathname}>
      <ScrollToTop />
      <Routes>
        {Array.from(grouped.entries()).map(([layout, layoutRoutes], i) => (
          <Route key={`layout-${i}`} element={<layout.Layout />}>
            {layoutRoutes.map(({ path, component }) => (
              <Route key={path} path={path} element={page(component)} />
            ))}
          </Route>
        ))}
        {bare.length > 0 && (
          <Route element={<Outlet />}>
            {bare.map(({ path, component }) => (
              <Route key={path} path={path} element={page(component)} />
            ))}
          </Route>
        )}
        <Route path="*" element={notFound ?? <DefaultNotFound />} />
      </Routes>
    </RouteErrorBoundary>
  );
}
