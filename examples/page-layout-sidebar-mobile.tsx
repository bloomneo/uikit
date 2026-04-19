/**
 * Example: PageLayout with sidebar that becomes a bottom-nav on mobile.
 *
 * Desktop (≥ md / 768px): fixed 220-ish px left sidebar with labels.
 * Mobile (< md):           fixed bottom bar with the first 4 items + a
 *                          "More" button that opens a slide-up sheet.
 *
 * The API is intentionally identical to the old sidebar usage — you pass a
 * `navigation` array and a `currentPath`. The mobile swap is automatic, no
 * extra props, no JS breakpoint code in your app. Resize the browser to
 * cross 768px and watch the nav change.
 *
 * This file is the canonical copy-paste example indexed by llms.txt — keep
 * it minimal and self-contained (no router, no API calls). For a richer
 * playground with providers + theme switcher, see `src/demo-sidebar.tsx`
 * in the uikit dev app.
 */

import * as React from 'react';
import {
  PageLayout,
  type NavigationItem,
} from '@bloomneo/uikit';
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

export default function PageLayoutSidebarMobileExample() {
  // Start on Dashboard. In a real app this comes from your router
  // (react-router's `useLocation().pathname`, Next.js `usePathname()`, etc.).
  const [currentPath, setCurrentPath] = React.useState('/admin');

  // 7 items — deliberately more than 4 so the mobile bar shows 4 tabs plus
  // a "More" button. The first 4 become the bottom tabs; items 5+ land in
  // the overflow sheet. Keep labels short — the mobile bar renders only
  // the first word.
  const navigation: NavigationItem[] = [
    { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { key: 'users', label: 'Users', href: '/admin/users', icon: Users },
    { key: 'content', label: 'Content', href: '/admin/content', icon: FileText },
    { key: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    // Items below this line go into the "More" sheet on mobile.
    { key: 'notifications', label: 'Notifications', href: '/admin/notifications', icon: Bell, badge: '3' },
    { key: 'security', label: 'Security', href: '/admin/security', icon: ShieldCheck },
    { key: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
    { key: 'signout', label: 'Sign out', onClick: () => alert('sign out'), icon: LogOut },
  ];

  return (
    <PageLayout scheme="sidebar" tone="clean" size="xl">
      <PageLayout.Header
        logo={<span className="text-xl font-bold">Admin</span>}
        actions={<span className="text-sm text-muted-foreground">kt@bloomneo.com</span>}
      />
      <PageLayout.Content
        sidebar="left"
        navigation={navigation}
        currentPath={currentPath}
        onNavigate={(href) => setCurrentPath(href)}
        title="Dashboard"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Dashboard' }]}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Current path: <code className="font-mono text-foreground">{currentPath}</code>
          </p>
          <p>
            Resize the browser below 768px — the left sidebar disappears and a
            bottom tab bar with <strong>Dashboard · Users · Content · Analytics</strong>
            {' '}appears. Tap <strong>More</strong> to reach Notifications, Security,
            Settings, and Sign out.
          </p>
        </div>
      </PageLayout.Content>
      <PageLayout.Footer copyright="© 2026 bloomneo" />
    </PageLayout>
  );
}
