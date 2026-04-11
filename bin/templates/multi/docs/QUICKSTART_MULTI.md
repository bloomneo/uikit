# Quick Start: Multi-Layout Application

**Build professional applications with automatic layout switching: AdminLayout, PageLayout, AuthLayout, and more.**

## 🎯 What is Multi Template?

The Multi template provides intelligent layout switching based on routes. Each page component chooses its own layout, allowing you to mix admin dashboards, marketing pages, and authentication flows seamlessly.

**Perfect for:**
- Business applications with admin areas
- SaaS platforms with user/admin roles
- E-commerce sites with management panels
- Applications requiring authentication flows
- Sites with 10+ pages needing different layouts

## ⚡ 30-Second Setup

### Step 1: Install UIKit CLI Globally
```bash
npm install -g @bloomneo/uikit
```

### Step 2: Create Multi Project
```bash
uikit create my-multi-app --multi --theme elegant
cd my-multi-app && npm run dev
```

### Step 3: Project Structure
```
src/
├── components/
│   ├── Header.tsx             # Site header with navigation
│   ├── Footer.tsx             # Site footer
│   └── index.ts               # Component exports
├── pages/
│   ├── Home.tsx               # Homepage (PageLayout)
│   ├── About.tsx              # About page (PageLayout)
│   ├── Contact.tsx            # Contact page (PageLayout)
│   ├── Components.tsx         # Component showcase (PageLayout)
│   ├── Themes.tsx             # Theme switcher (PageLayout)
│   ├── Login.tsx              # Login page (AuthLayout)
│   ├── Dashboard.tsx          # Dashboard (AdminLayout)
│   └── ErrorPage.tsx          # Error page (BlankLayout)
├── App.tsx                    # Layout wrapper and router
├── router.tsx                 # Route configuration
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🏗️ How Multi Template Works

### App.tsx - Smart Layout Wrapper
**Why:** Automatically chooses the right layout based on route
**When:** Need different layouts for different page types
**How:** Uses React Router location to determine layout

```jsx
const LayoutWrapper = () => {
  const location = useLocation();

  // Login page uses AuthLayout (handled in Login.tsx)
  if (location.pathname === '/login') {
    return <AppRouter />;
  }

  // Dashboard uses AdminLayout (handled in Dashboard.tsx)
  if (location.pathname.startsWith('/dashboard')) {
    return <AppRouter />;
  }

  // Default: PageLayout for marketing pages
  return (
    <PageLayout scheme="default" tone="clean" size="xl">
      <Header />
      <PageLayout.Content>
        <AppRouter />
      </PageLayout.Content>
      <Footer />
    </PageLayout>
  );
};
```

### Router.tsx - Simple Route Configuration
**Why:** Easy to add/remove routes
**When:** Adding new pages to your app
**How:** Just add to the routes array

```jsx
export const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
];
```

## 📄 Page Component Examples

### AdminLayout Example (Dashboard.tsx)
**Why:** For admin panels with sidebar navigation
**When:** Dashboards, data management, admin tools
**How:** Page component handles its own AdminLayout

```jsx
const DashboardPage = () => {
  const adminNavigation = [
    { key: 'home', label: 'Home', href: '/', icon: Home },
    { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Layout },
  ];

  return (
    <AdminLayout scheme="sidebar" tone="subtle" size="lg">
      <AdminLayout.Header title="Dashboard" />
      <AdminLayout.Sidebar
        navigation={adminNavigation}
        onNavigate={(href) => navigate(href)}
      />
      <AdminLayout.Content>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
            </CardContent>
          </Card>
          {/* More dashboard cards */}
        </div>
      </AdminLayout.Content>
    </AdminLayout>
  );
};
```

### AuthLayout Example (Login.tsx)
**Why:** Centered login forms without distractions
**When:** Login, signup, password reset pages
**How:** Clean, focused authentication UI

```jsx
const LoginPage = () => {
  return (
    <AuthLayout scheme="centered" tone="clean">
      <AuthLayout.Content>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </AuthLayout.Content>
    </AuthLayout>
  );
};
```

### PageLayout Example (Home.tsx)
**Why:** Marketing pages with shared header/footer
**When:** Homepage, about, contact, marketing content
**How:** Content only - Header/Footer handled by App.tsx

```jsx
const HomePage = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-16">
        <h1 className="voila-heading text-4xl mb-6">Welcome to MyApp</h1>
        <p className="voila-subheading text-xl text-muted-foreground">
          Build amazing applications with UIKit
        </p>
        <Button size="lg" className="mt-6">Get Started</Button>
      </section>
      {/* More content sections */}
    </div>
  );
};
```

## 🎯 When to Use Multi Template

**Perfect for:**
- Business applications with admin areas
- SaaS platforms with user/admin roles
- E-commerce sites with management panels
- Applications requiring authentication flows
- Sites with 10+ pages needing different layouts

**Layout Decision Guide:**
- **Marketing pages** (home, about, contact) → PageLayout (automatic)
- **Admin/Dashboard** → AdminLayout (in page component)
- **Login/Signup** → AuthLayout (in page component)
- **Error pages** → BlankLayout (in page component)

**Key Benefits:**
- Automatic layout switching based on route
- Separate page files for better organization
- Shared Header/Footer for marketing pages
- Professional layouts out of the box

**Not ideal for:**
- Simple websites (use SPA template)
- Single layout applications (use SPA template)
- Complex feature-based apps (use FBCA template)

## ⚡ Adding New Pages

### Step 1: Create Page Component
**Why:** Each page chooses its own layout
**When:** Adding new functionality or content areas
**How:** Create file in `/pages/` with appropriate layout

```jsx
// pages/Settings.tsx - Admin page example
const SettingsPage = () => {
  return (
    <AdminLayout scheme="sidebar" tone="subtle" size="lg">
      <AdminLayout.Header title="Settings" />
      <AdminLayout.Sidebar navigation={adminNav} />
      <AdminLayout.Content>
        {/* Settings content */}
      </AdminLayout.Content>
    </AdminLayout>
  );
};

// pages/Services.tsx - Marketing page example
const ServicesPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="voila-heading text-4xl">Our Services</h1>
      {/* Content - Header/Footer handled by App.tsx */}
    </div>
  );
};
```

### Step 2: Add to Router
**Why:** Make pages accessible via URL
**When:** After creating page components
**How:** Add to routes array in router.tsx

```jsx
// router.tsx
export const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings },
  { path: '/services', component: Services },
  // ... other routes
];
```

### Step 3: Add Navigation (Optional)
**Why:** Make pages discoverable to users
**When:** Page should appear in navigation
**How:** Add to Header.tsx or page-specific navigation

```jsx
// components/Header.tsx - For marketing pages
const navigationItems = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'services', label: 'Services', href: '/services' },
];

// In Dashboard.tsx - For admin pages
const adminNavigation = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'settings', label: 'Settings', href: '/settings' },
];
```

## 🔧 Customization

### Shared Components
**Why:** Consistent header/footer across PageLayout pages
**When:** Want to modify site-wide navigation or branding
**How:** Edit components/Header.tsx and components/Footer.tsx

```jsx
// components/Header.tsx
export const Header = () => {
  const navigationItems = [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'about', label: 'About', href: '/about' },
    // Add your navigation items
  ];

  return (
    <PageLayout.Header
      navigation={navigationItems}
      logo={<YourLogo />}
      actions={<YourActions />}
    />
  );
};
```

### Layout Switching Logic
**Why:** Different pages need different layouts automatically
**When:** Want to understand or modify layout selection
**How:** App.tsx handles routing-based layout switching

```jsx
// App.tsx - How layout switching works
const LayoutWrapper = () => {
  const location = useLocation();

  // Login and dashboard pages handle their own layouts
  if (location.pathname === '/login' || location.pathname.startsWith('/dashboard')) {
    return <AppRouter />;
  }

  // Default: PageLayout for marketing pages
  return (
    <PageLayout>
      <Header />
      <PageLayout.Content><AppRouter /></PageLayout.Content>
      <Footer />
    </PageLayout>
  );
};
```

---

**Built with @bloomneo/uikit** ✨