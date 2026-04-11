# Quick Start: SPA (Single Page Application)

**Build modern single-page applications with React Router and UIKit components.**

## 🎯 What is SPA Template?

The SPA template provides a complete single-page application setup with React Router, navigation, and UIKit components. Perfect for applications that need client-side routing without complex layouts.

**Perfect for:**
- Marketing websites with multiple pages
- Portfolio sites
- Documentation sites
- Content-heavy applications
- Applications with simple navigation

## ⚡ 30-Second Setup

### Step 1: Install UIKit CLI Globally
```bash
# Install globally
npm install -g @bloomneo/uikit

# Check if you have the latest version
npm list -g @bloomneo/uikit

# Update if needed
npm update -g @bloomneo/uikit
```

### Step 2: Create SPA Project
```bash
uikit create my-spa-app --spa --theme elegant
cd my-spa-app && npm run dev
```

This creates a complete SPA with:
- ✅ React Router v6 setup
- ✅ Navigation with active states
- ✅ Clean page transitions
- ✅ Responsive design
- ✅ Theme integration

### Step 2: Project Structure
```
src/
├── App.tsx                 # All page components and router setup
├── main.tsx               # Entry point with theme provider
└── index.css              # Global styles with Tailwind + UIKit
```

## 🧭 React Router Integration

### App.tsx Structure
The SPA template contains everything in `App.tsx`:
- Page components (HomePage, ComponentsPage, ThemesPage, DocsPage)
- Router configuration with React Router v6
- PageLayout integration with navigation
- Theme actions and logo components

```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@bloomneo/uikit/button';
import { useTheme } from '@bloomneo/uikit/theme-provider';
import { PageLayout } from '@bloomneo/uikit/page';

// Page Components are defined in App.tsx
const HomePage = () => {
  return (
    <div className="space-y-12">
      <h1 className="voila-heading text-4xl">Welcome to UIKit SPA</h1>
      {/* Your homepage content */}
    </div>
  );
};

// More page components...

function App() {
  return (
    <Router>
      <PageLayout scheme="default" tone="subtle" size="xl">
        <PageLayout.Header
          navigation={navigationItems}
          logo={<Logo />}
          actions={<ThemeActions />}
        />
        <PageLayout.Content>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/themes" element={<ThemesPage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </PageLayout.Content>
        <PageLayout.Footer />
      </PageLayout>
    </Router>
  );
}
```

### How to Add New Pages
**Why:** All pages are in App.tsx for simplicity
**When:** Add pages for different routes (e.g., /about, /contact)
**How:** Define page component in App.tsx and add route

```jsx
// Add your page component
const AboutPage = () => (
  <div className="space-y-6">
    <h1 className="voila-heading text-4xl">About Us</h1>
    <p>Your about content here</p>
  </div>
);

// Add to navigation
const navigationItems = [
  { key: 'home', label: 'Home', href: '/', icon: Home },
  { key: 'about', label: 'About', href: '/about', icon: Info },
];

// Add to routes
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

## 📄 Page Component Examples

### Simple Page Pattern
**Why:** Keep pages focused and reusable
**When:** For each route in your SPA
**How:** Follow this pattern for consistent structure

```jsx
const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="voila-heading text-4xl text-accent mb-6">
          Welcome to UIKit SPA
        </h1>
        <p className="voila-subheading text-xl text-muted-foreground">
          Build beautiful single-page applications
        </p>
        <Button size="lg" className="mt-6">
          Get Started
        </Button>
      </section>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fast Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get started in seconds</p>
          </CardContent>
        </Card>
        {/* More cards... */}
      </div>
    </div>
  );
};
```

### Content Page Pattern
**Why:** For informational pages like About, Services
**When:** Need structured content with sections
**How:** Use cards and semantic sections

```jsx
const AboutPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="voila-heading text-4xl mb-4">About Us</h1>
        <p className="voila-subheading text-muted-foreground max-w-2xl mx-auto">
          Learn about our mission and values
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Building better web experiences for everyone.</p>
        </CardContent>
      </Card>
    </div>
  );
};
```

### Interactive Page Pattern
**Why:** For pages with forms or user interactions
**When:** Contact forms, settings, user input
**How:** Use state management and form components

```jsx
const ContactPage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message:', message);
  };

  return (
    <div className="space-y-8">
      <h1 className="voila-heading text-4xl">Contact Us</h1>

      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your email" type="email" required />
            <Textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
```

## 🎯 SPA Best Practices

### Theme Integration
**Why:** Built-in theme switching and persistence
**When:** Want users to customize appearance
**How:** Use the included ThemeActions component

```jsx
const ThemeActions = () => {
  const { theme, setTheme, availableThemes, toggleMode } = useTheme();
  return (
    <div className="flex items-center gap-3">
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        {availableThemes.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      <Button onClick={toggleMode} variant="outline" size="sm">
        {mode === 'dark' ? '☀️' : '🌙'}
      </Button>
    </div>
  );
};
```

### Navigation Setup
**Why:** Consistent navigation with icons and active states
**When:** Setting up main site navigation
**How:** Configure navigationItems array

```jsx
const navigationItems = [
  { key: 'home', label: 'Home', href: '/', icon: Home },
  { key: 'about', label: 'About', href: '/about', icon: Info },
  { key: 'contact', label: 'Contact', href: '/contact', icon: Mail },
];
```

## ✅ When to Use SPA Template

**Perfect for:**
- Marketing websites (5-10 pages)
- Portfolio sites
- Documentation sites
- Simple business websites
- Landing pages with navigation

**Not ideal for:**
- Complex admin dashboards (use Multi template)
- Large applications (use FBCA template)
- Single component showcase (use Basic template)

**Key Benefits:**
- All code in one file for simplicity
- Built-in PageLayout with navigation
- Theme switching out of the box
- Perfect for small to medium sites

---

**Built with @bloomneo/uikit** ✨