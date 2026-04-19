/**
 * Dev-only demo for the new PageLayout sidebar → bottom-nav mobile swap.
 *
 * Wired up by `/demo-sidebar.html` (see repo root). Run `npm run dev` and
 * open http://localhost:5173/demo-sidebar.html to try it. Resize the
 * window across 768px to see the sidebar become a bottom tab bar with a
 * "More" sheet for overflow items.
 *
 * Not shipped to npm — lives under src/ for the vite dev server only.
 */

import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  PageLayout,
  ThemeProvider,
  ToastProvider,
  ConfirmProvider,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Alert,
  AlertTitle,
  AlertDescription,
  Input,
  type NavigationItem,
} from './index';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ShieldCheck,
  Bell,
  BarChart3,
  LogOut,
} from 'lucide-react';
import './styles/globals.css';

type SidebarMode = 'left' | 'right' | 'none';

function DemoAdminShell() {
  const [currentPath, setCurrentPath] = React.useState('/admin');
  // Flip through the three Container sidebar modes so we can verify all
  // behave sensibly on desktop + mobile. `none` means full-width content
  // with no sidebar and no bottom-nav (nav lives in the header instead).
  const [sidebarMode, setSidebarMode] = React.useState<SidebarMode>('left');

  const navigation: NavigationItem[] = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { key: 'users', label: 'Users', href: '/admin/users', icon: Users },
    { key: 'content', label: 'Content', href: '/admin/content', icon: FileText },
    { key: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { key: 'notifications', label: 'Notifications', href: '/admin/notifications', icon: Bell, badge: '3' },
    { key: 'security', label: 'Security', href: '/admin/security', icon: ShieldCheck },
    { key: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
    { key: 'signout', label: 'Sign out', onClick: () => alert('sign out'), icon: LogOut },
  ];

  const pageForPath: Record<string, { title: string; body: React.ReactNode }> = {
    '/admin': {
      title: 'Dashboard',
      body: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Users" value="1,248" />
            <MetricCard label="Signups (30d)" value="42" />
            <MetricCard label="Audit events today" value="187" />
          </div>
          {/* Border showcase — every naked `border`, `border-b`, `border-t`
              should render as soft gray, not near-black. This block exists
              to make that change visually obvious at a glance. */}
          <Card>
            <CardHeader>
              <CardTitle>Borders &amp; separators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>Alert with border</AlertTitle>
                <AlertDescription>
                  The outline of this alert should be soft gray, matching the card outline.
                </AlertDescription>
              </Alert>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Separator (horizontal):</p>
                <Separator />
                <p className="text-sm text-muted-foreground mt-2">...above line should be gray.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Input field:</p>
                <Input placeholder="Type here — border should be subtle gray" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Alice</TableCell>
                    <TableCell>alice@example.com</TableCell>
                    <TableCell>admin</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>user</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carol</TableCell>
                    <TableCell>carol@example.com</TableCell>
                    <TableCell>user</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ),
    },
    '/admin/users': { title: 'Users', body: <Placeholder label="User list placeholder" /> },
    '/admin/content': { title: 'Content', body: <Placeholder label="Content list placeholder" /> },
    '/admin/analytics': { title: 'Analytics', body: <Placeholder label="Chart placeholder" /> },
    '/admin/notifications': { title: 'Notifications', body: <Placeholder label="Inbox placeholder" /> },
    '/admin/security': { title: 'Security', body: <Placeholder label="Sessions placeholder" /> },
    '/admin/settings': { title: 'Settings', body: <Placeholder label="Settings form placeholder" /> },
  };
  const page = pageForPath[currentPath] ?? pageForPath['/admin'];

  // When sidebar is 'none' we expect full-width content, no bottom-nav, and
  // the top-level nav items to appear in the header instead (since there's
  // no sidebar/bottom-nav to host them).
  const scheme = sidebarMode === 'none' ? 'default' : 'sidebar';

  return (
    <PageLayout scheme={scheme} tone="clean" size="xl">
      <PageLayout.Header
        logo={<span className="text-xl font-bold">Admin Demo</span>}
        navigation={sidebarMode === 'none' ? navigation.slice(0, 4) : undefined}
        currentPath={currentPath}
        onNavigate={(href) => setCurrentPath(href)}
        actions={
          <div className="flex items-center gap-2">
            <ModeSwitcher value={sidebarMode} onChange={setSidebarMode} />
            <Button size="sm" variant="outline">
              Account
            </Button>
          </div>
        }
      />
      <PageLayout.Content
        sidebar={sidebarMode}
        navigation={sidebarMode === 'none' ? undefined : navigation}
        currentPath={currentPath}
        onNavigate={(href) => setCurrentPath(href)}
        title={page.title}
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: page.title }]}
      >
        <div className="mb-6 p-4 rounded-lg border border-dashed border-border text-sm text-muted-foreground space-y-1">
          <div>
            <strong className="text-foreground">Mode:</strong>{' '}
            <code className="font-mono text-foreground">sidebar="{sidebarMode}"</code>
          </div>
          <div>
            {sidebarMode === 'left' && (
              <>Resize below <code className="font-mono">768px</code> — left sidebar becomes a bottom tab bar.</>
            )}
            {sidebarMode === 'right' && (
              <>Resize below <code className="font-mono">768px</code> — right sidebar also collapses into the same bottom tab bar.</>
            )}
            {sidebarMode === 'none' && (
              <>No sidebar. Full-width content, no bottom-nav on mobile. Primary nav lives in the header.</>
            )}
          </div>
        </div>
        {page.body}
      </PageLayout.Content>
      <PageLayout.Footer copyright="© 2026 bloomneo — PageLayout sidebar demo" />
    </PageLayout>
  );
}

function ModeSwitcher({
  value,
  onChange,
}: {
  value: SidebarMode;
  onChange: (m: SidebarMode) => void;
}) {
  const modes: SidebarMode[] = ['left', 'right', 'none'];
  return (
    <div className="hidden sm:flex rounded-md border border-border overflow-hidden">
      {modes.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(m)}
          className={
            'px-2.5 py-1 text-xs font-medium transition-colors ' +
            (value === m
              ? 'bg-primary text-primary-foreground'
              : 'bg-background text-muted-foreground hover:text-foreground')
          }
        >
          {m}
        </button>
      ))}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <Card>
      <CardContent className="py-12 text-center text-muted-foreground">
        {label}
      </CardContent>
    </Card>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme="base" mode="light">
      <ToastProvider />
      <ConfirmProvider>
        <DemoAdminShell />
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
