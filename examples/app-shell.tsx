import { LayoutDashboard, Settings, Users } from 'lucide-react';
import { AppShell, Button } from '@bloomneo/uikit';

// In an app, pass your router's pathname and link component:
//   currentPath={useLocation().pathname}
//   linkComponent={({ href, ...rest }) => <Link to={href} {...rest} />}
export default function AppShellExample() {
  return (
    <AppShell
      brand={{ name: 'Acme', href: '/dashboard' }}
      nav={[
        // `end` keeps the index route from staying active on /dashboard/users.
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { href: '/dashboard/users', label: 'Users', icon: Users, section: 'Admin' },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
      ]}
      currentPath="/dashboard/users"
      headerActions={<Button variant="ghost" size="sm">Sign out</Button>}
    >
      <h1 className="text-xl font-semibold">Users</h1>
    </AppShell>
  );
}
