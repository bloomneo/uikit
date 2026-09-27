/**
 * AppShell — the frame for the signed-in part of an app: a sidebar that owns
 * the full height, a header row, and the page.
 *
 * @llm-rule WHEN: Laying out the authenticated area of a business app (dashboard, admin, settings)
 * @llm-rule AVOID: Hand-rolling a sidebar + header per app — every app that did drifted into its own copy
 * @llm-rule NOTE: Router-agnostic. Pass `currentPath` and a `linkComponent` from your router
 * @llm-rule NOTE: Guard the route that renders AppShell (e.g. an AuthGuard around it), not each page
 *
 * Lifted from the Bloom template's dashboard shell, which had been rebuilt by
 * hand in each production app after uikit 4.0 removed its layouts.
 *
 * Behaviour:
 * - Desktop (lg+): a sidebar that collapses to an icon rail. The choice
 *   persists per browser under `storageKey`.
 * - Below lg: the same navigation opens in a Sheet from the header's menu
 *   button, never collapsed, and closes when `currentPath` changes.
 * - The active item is derived from `currentPath`; it gets `aria-current="page"`.
 *
 * ```tsx
 * <AppShell
 *   brand={{ name: 'Acme', href: '/dashboard' }}
 *   nav={[{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }]}
 *   currentPath={useLocation().pathname}
 *   linkComponent={({ href, ...rest }) => <Link to={href} {...rest} />}
 *   headerActions={<UserMenu />}
 * >
 *   <Outlet />
 * </AppShell>
 * ```
 */
import * as React from 'react';
import { Menu, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export interface AppShellNavItem {
  /** REQUIRED: Where the item goes. */
  href: string;
  /** REQUIRED: Visible label; also the accessible name when collapsed. */
  label: string;
  /** OPTIONAL: Icon component (e.g. from lucide-react). */
  icon?: React.ComponentType<{ className?: string }>;
  /** OPTIONAL: Active only on an exact path match (use for index routes like /dashboard). */
  end?: boolean;
  /** OPTIONAL: Starts a labelled group above this item. */
  section?: string;
}

export interface AppShellLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
  'aria-current'?: 'page';
}

export interface AppShellProps {
  /** REQUIRED: Name shown at the top of the sidebar; `mark` defaults to its first letter. */
  brand: { name: string; href?: string; mark?: React.ReactNode };
  /** REQUIRED: Sidebar items, in display order. */
  nav: AppShellNavItem[];
  /** REQUIRED: The current pathname, used to mark the active item. */
  currentPath: string;
  /** OPTIONAL: Link element from your router. Defaults to a plain `<a>`. */
  linkComponent?: React.ComponentType<AppShellLinkProps>;
  /** OPTIONAL: Right side of the header — user menu, theme toggle. */
  headerActions?: React.ReactNode;
  /** OPTIONAL: Bottom of the sidebar — typically sign out. Receives the collapsed state. */
  sidebarFooter?: (collapsed: boolean) => React.ReactNode;
  /** OPTIONAL: Allow the desktop sidebar to collapse to icons. Default true. */
  collapsible?: boolean;
  /** OPTIONAL: localStorage key for the collapsed state. Default 'uikit:sidebar:collapsed'. */
  storageKey?: string;
  /** OPTIONAL: Accessible name of the navigation landmark. Default 'Main'. */
  navLabel?: string;
  /** REQUIRED: The page. */
  children: React.ReactNode;
  className?: string;
}

const DefaultLink = ({ href, ...rest }: AppShellLinkProps) => <a href={href} {...rest} />;

/** Active when the path is the item's href, or (unless `end`) below it. */
function isActive(item: AppShellNavItem, currentPath: string): boolean {
  const path = currentPath.replace(/\/+$/, '') || '/';
  const href = item.href.replace(/\/+$/, '') || '/';
  if (path === href) return true;
  if (item.end || href === '/') return false;
  return path.startsWith(`${href}/`);
}

function useCollapsed(storageKey: string, enabled: boolean) {
  const [collapsed, setCollapsed] = React.useState<boolean>(() => {
    if (!enabled || typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(storageKey) === '1';
    } catch {
      return false;
    }
  });
  const toggle = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(storageKey, next ? '1' : '0');
      } catch {
        // Storage blocked: the toggle still works for this session.
      }
      return next;
    });
  }, [storageKey]);
  return { collapsed: enabled && collapsed, toggle };
}

function Brand({
  brand,
  collapsed,
  Link,
}: {
  brand: AppShellProps['brand'];
  collapsed?: boolean;
  Link: React.ComponentType<AppShellLinkProps>;
}) {
  // h-14 matches the header, so the two bottom borders form one line.
  return (
    <Link
      href={brand.href ?? '/'}
      aria-label={collapsed ? brand.name : undefined}
      className={cn(
        'flex h-14 items-center border-b border-sidebar-border',
        collapsed ? 'justify-center px-0' : 'gap-2.5 px-4',
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
        {brand.mark ?? brand.name.charAt(0)}
      </span>
      {!collapsed && (
        <span className="truncate font-semibold tracking-tight text-sidebar-foreground">{brand.name}</span>
      )}
    </Link>
  );
}

function NavList({
  nav,
  currentPath,
  collapsed,
  Link,
  label,
  onNavigate,
}: {
  nav: AppShellNavItem[];
  currentPath: string;
  collapsed?: boolean;
  Link: React.ComponentType<AppShellLinkProps>;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1 p-3" aria-label={label}>
      {nav.map((item) => {
        const Icon = item.icon;
        const active = isActive(item, currentPath);
        // className is always a string: Radix Slot (TooltipTrigger asChild)
        // concatenates className, and a function would be stringified.
        const row = (
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-label={collapsed ? item.label : undefined}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center rounded-md py-2 text-sm transition-colors',
              collapsed ? 'w-full justify-center px-0' : 'gap-3 px-3',
              active
                ? 'bg-sidebar-primary font-medium text-sidebar-primary-foreground'
                : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
          >
            {Icon && <Icon className="size-4 shrink-0" />}
            {/* Collapsed, the label leaves the DOM so it isn't read twice; the tooltip names it. */}
            {!collapsed && item.label}
          </Link>
        );
        return (
          <React.Fragment key={item.href}>
            {item.section && !collapsed && (
              <span className="mt-4 px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/45">
                {item.section}
              </span>
            )}
            {item.section && collapsed && <span aria-hidden className="mx-2 mt-3 mb-1 border-t border-sidebar-border" />}
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>{row}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              row
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export function AppShell({
  brand,
  nav,
  currentPath,
  linkComponent,
  headerActions,
  sidebarFooter,
  collapsible = true,
  storageKey = 'uikit:sidebar:collapsed',
  navLabel = 'Main',
  children,
  className,
}: AppShellProps): React.JSX.Element {
  const Link = linkComponent ?? DefaultLink;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { collapsed, toggle } = useCollapsed(storageKey, collapsible);

  // The shell persists across navigation; don't leave the sheet open behind the new page.
  React.useEffect(() => setMobileOpen(false), [currentPath]);

  return (
    <div className={cn('flex min-h-screen bg-background text-foreground', className)}>
      <aside
        className={cn(
          'hidden shrink-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out lg:block',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        <div className="sticky top-0 flex h-screen flex-col">
          <Brand brand={brand} collapsed={collapsed} Link={Link} />
          <NavList nav={nav} currentPath={currentPath} collapsed={collapsed} Link={Link} label={navLabel} />
          {sidebarFooter && <div className="mt-auto border-t border-sidebar-border p-3">{sidebarFooter(collapsed)}</div>}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation" className="size-8 lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-64 flex-col bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <Brand brand={brand} Link={Link} />
              <NavList
                nav={nav}
                currentPath={currentPath}
                Link={Link}
                label={navLabel}
                onNavigate={() => setMobileOpen(false)}
              />
              {sidebarFooter && <div className="mt-auto border-t border-sidebar-border p-3">{sidebarFooter(false)}</div>}
            </SheetContent>
          </Sheet>

          {collapsible && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggle}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  aria-pressed={collapsed}
                  className="hidden size-8 lg:inline-flex"
                >
                  <PanelLeft className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{collapsed ? 'Expand sidebar' : 'Collapse sidebar'}</TooltipContent>
            </Tooltip>
          )}

          {headerActions && <div className="ml-auto flex items-center gap-1.5">{headerActions}</div>}
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
