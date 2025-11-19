# VoilaJSX UIKit 🎨

[![npm version](https://img.shields.io/npm/v/@voilajsx/uikit.svg)](https://www.npmjs.com/package/@voilajsx/uikit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![AI Ready](https://img.shields.io/badge/AI-Optimized-purple.svg)](https://github.com/voilajsx/appkit)

> AI‑ready React component toolkit for rapid frontend development, powered by Tailwind CSS v4 and ShadCN.

Create visually stunning applications in seconds with 37 components, 6 layouts, and 5 themes — all zero‑configuration and minimal complexity. Build instantly, customize effortlessly, and deploy for web, desktop, and mobile in seconds.

## Why Choose @voilajsx/uikit?

**🚀 For Rapid Development**

- **30-second setup**: From `npm install` to running app with routing, themes, and layouts
- **37 ready-to-use components**: Skip building basic UI - focus on your unique features
- **6 production layouts**: Admin dashboards, auth flows, marketing pages, mobile apps - all pre-built

**🎨 For Design Consistency**

- **5 professional themes**: Switch from minimal to luxury instantly - no design skills needed
- **OKLCH color science**: Perfect accessibility and contrast ratios automatically
- **Dark mode included**: Every theme works in light and dark mode out of the box

**⚡ For Developer Experience**

- **AI-optimized**: Generate consistent code with LLMs - predictable patterns, fewer errors
- **TypeScript-first**: Full type safety with intelligent autocomplete
- **Zero configuration**: Works immediately, customize only what you need

**🏢 For Team Productivity**

- **Standardized components**: No more "how should this button look?" debates
- **Feature-based architecture**: Scale to enterprise with FBCA project structure
- **Instant deployment**: `uikit deploy --github` for immediate production hosting

**🔧 For Maintainability**

- **Semantic colors**: Themes switch automatically - no hardcoded styles to break
- **Convention over configuration**: Predictable file structure, minimal decisions
- **Future-proof**: Built on Tailwind CSS v4 and Radix UI - modern foundation

## Quick Start

**Two Ways to Use UIKit:**

**📦 As a Library** - Install UIKit components into your existing React projects (Next.js, Vite, CRA, NestJS with React frontend, etc.):

```bash
npm install @voilajsx/uikit
```

Import components directly: `import { Button } from '@voilajsx/uikit/button'` and `import { Card } from '@voilajsx/uikit/card'`

**🚀 Complete Project Setup** - Use UIKit CLI to scaffold entire applications with routing, layouts, and themes pre-configured:

```bash
# Step 1: Install UIKit CLI globally
npm install -g @voilajsx/uikit

# Check if you have the latest version
npm list -g @voilajsx/uikit

# Step 2: Create your app
uikit create myapp --multi --theme elegant
cd myapp && npm run dev
```

**Done.** Your app is running with routing, layouts, and the elegant theme.

## Framework Architecture

**@voilajsx/uikit** is built on **ShadCN components** and **Tailwind CSS v4** with three key additions:

## 1. Composite UI System

Build complete interfaces with our three-tier component system - from individual form controls to full page layouts. Mix and match components, sections, and layouts to create any interface quickly without starting from scratch.

📖 **Learn more:** [Composite UI System Guide](docs/UIKIT_COMPOSITE_UI_SYSTEM.md)

### Components (37 Total)

| Category               | Components                                                                             | Description                   |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------------------- |
| **Form & Input**       | Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Slider, Select           | Form controls with validation |
| **Display & Layout**   | Card, Badge, Avatar, Separator, Progress, Skeleton, Alert, Breadcrumb, Tabs, Accordion | Information presentation      |
| **Navigation & Menu**  | DropdownMenu, Menubar, Pagination, Command, Collapsible, Toggle                        | User navigation               |
| **Overlay & Modal**    | Dialog, Sheet, Popover, HoverCard, Tooltip                                             | User interactions             |
| **Data & Table**       | Table, DataTable, Calendar, Toaster                                                    | Data management               |
| **Motion & Animation** | Motion, LoadingSpinner, Reveal, Hover                                                  | Visual effects                |

### Section Components (5 Standalone)

| Component     | Purpose                    | Usage                       | Props                |
| ------------- | -------------------------- | --------------------------- | -------------------- |
| **Header**    | Standalone header sections | Independent navigation bars | tone, size, position |
| **Footer**    | Standalone footer sections | Independent footer content  | tone, size, position |
| **Container** | Content with sidebar       | Flexible content containers | tone, size, sidebar  |
| **SafeArea**  | Mobile safe area wrapper   | iOS notch/Android insets    | edges, tone          |
| **TabBar**    | Mobile bottom navigation   | Tab-based navigation        | tabs, tone, variant  |

### Layouts (6 Production-Ready)

| Layout           | Use Case               | Components                       | Routing            |
| ---------------- | ---------------------- | -------------------------------- | ------------------ |
| **AdminLayout**  | Dashboards, SaaS apps  | Sidebar, Header, Content, Footer | Built-in nav state |
| **PageLayout**   | Marketing sites        | Header, Content, Footer          | Static pages       |
| **AuthLayout**   | Login/signup flows     | Centered forms, hero images      | Auth routing       |
| **MobileLayout** | Mobile apps (Capacitor)| Header, Content, TabBar          | Tab/Stack nav      |
| **PopupLayout**  | Browser extensions     | Compact, focused content         | Extension routing  |
| **BlankLayout**  | Custom pages           | Clean slate                      | Manual routing     |

## 2. Advanced Theming System

Switch between 5 professional themes instantly or generate custom themes with perfect accessibility. Built on OKLCH color science with automatic light/dark mode support and semantic color variables that work across all components.

📖 **Learn more:** [Theme System Guide](docs/UIKIT_THEME_GUIDE.md)

**Note**: Instead of hardcoded colors like `bg-white` or `text-black`, use semantic color classes like `bg-background`, `text-foreground`, `border-border`. These automatically adapt to your selected theme and work perfectly in both light and dark modes.

### 5 Professional Themes

| Theme       | Style                | Font Family      | Best For              |
| ----------- | -------------------- | ---------------- | --------------------- |
| **base**    | Clean metallic black | System UI        | Minimalist apps       |
| **elegant** | Professional blue    | Montserrat       | Business applications |
| **metro**   | Modern green         | Clean typography | Admin dashboards      |
| **studio**  | Bold black/orange    | Artistic fonts   | Creative portfolios   |
| **vivid**   | Luxury purple/orange | Serif fonts      | Premium products      |

### Custom Theme Generation

```bash
# Generate custom theme automatically
uikit generate theme <name>

# Bundle themes to CSS
uikit bundle
```

**What Happens Automatically:**

1. **Creates theme preset** with generic values for 29 semantic colors (light + dark modes)
2. **Compiles globals.css** with optimized CSS variables
3. **Updates main.tsx** to use your new theme instantly
4. **Theme visible immediately** - ready to customize for your brand needs

**Development Workflow:**

- **Customize preset**: Modify the generic values in `src/themes/presets/theme-<name>.js` to match your brand
- **Rebundle**: Run `uikit bundle` to regenerate CSS
- **See changes instantly**: Theme updates appear immediately in your app

**Best Practices:**

- **Avoid custom CSS files** - work within the preset system for consistency
- **No separate stylesheets** - keeps theme coherence undisturbed
- **Easy maintenance** - all theme changes in one centralized file

## 3. Project Scaffolding

Generate complete project structures with pre-configured routing, layouts, and development workflows. Choose from 4 templates optimized for different application types - from simple showcases to enterprise-scale feature-based architectures.

📖 **For detailed setup guides:** [Quick-Start Documentation](docs/quickstart/)

### UIKit CLI Templates

| Template   | Command                    | Structure        | Routing                | Best For                    |
| ---------- | -------------------------- | ---------------- | ---------------------- | --------------------------- |
| **Single** | `uikit create app`         | Basic showcase   | None                   | Component demos, learning   |
| **SPA**    | `uikit create app --spa`   | Single-page app  | React Router           | Marketing sites, portfolios |
| **Multi**  | `uikit create app --multi` | Multi-layout app | React Router + layouts | Business apps, SaaS         |
| **FBCA**   | `uikit create app --fbca`  | Feature-based    | Auto-discovery routing | Enterprise, large apps      |

### When to Use Each Template

**Single** - Very basic template for building from scratch with just one page. Use when you want to start minimal and build up manually.

**SPA** - Single page code that visually reflects multiple pages. Use when you want the simplicity of one page but with navigation between views.

**Multi** - True page isolation with different layouts and basic router included. Use when your requirements need actual separate pages for better organization.

**FBCA** - Comprehensive large-scale applications with feature segregation and auto-discovery page router (Next.js style file-based routing). Use when your application is enterprise-grade with features like auth (login/register), user management, etc. organized in separate folders.

## UIKit CLI Commands

📖 **Complete CLI reference:** [CLI Commands Guide](docs/UIKIT_CLI_GUIDE.md)

```bash
# Project Creation
uikit create myapp                    # Single template (component showcase)
uikit create myapp --spa              # SPA with React Router
uikit create myapp --multi            # Multi-layout application
uikit create myapp --fbca             # Feature-based architecture

# Code Generation (for FBCA projects)
uikit generate page dashboard         # Generate new page component
uikit generate component button       # Generate reusable component
uikit generate hook useAuth           # Generate custom React hook
uikit generate feature blog           # Generate complete feature (page + component + hook)

# Theme Management
uikit generate theme brand            # Generate custom theme
uikit bundle                          # Process themes to CSS
uikit bundle --watch                  # Watch mode for development

# Development & Deployment
uikit serve                           # Start development server
uikit build                           # Production build
uikit deploy                          # Static site deployment
uikit deploy --github                 # Deploy to GitHub Pages
```

## Example Codes

📖 **AI-powered development:** [LLM Usage Guide](docs/UIKIT_LLM_GUIDE.md)

**Note**: As mentioned above, UIKit is built on ShadCN components but with our own import paths. Instead of `@/components/ui/button`, use `@voilajsx/uikit/button`. The semantic color classes like `bg-background`, `text-foreground`, `border-border` etc. work exactly the same and automatically adapt to your selected theme.

**Important**: Not all components have `variant` and `size` props. Use individual imports and check component documentation for available props. For layouts, PageLayout uses `scheme="default|sidebar"` (not "base").

### UI Component Examples

#### Card Component

```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@voilajsx/uikit/card';

<Card>
  <CardHeader>
    <CardTitle>Product Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Product description here</p>
  </CardContent>
</Card>;
```

#### Alert Component

```jsx
import { Alert, AlertTitle, AlertDescription } from '@voilajsx/uikit/alert';

<Alert variant="default">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>;
```

#### Form Component

```jsx
import { Button } from '@voilajsx/uikit/button';
import { Input } from '@voilajsx/uikit/input';
import { Label } from '@voilajsx/uikit/label';

<div className="space-y-4">
  <div>
    <Label>Email</Label>
    <Input placeholder="Enter email" />
  </div>
  <Button variant="default" size="default">
    Submit
  </Button>
</div>;
```

### Layout Examples

```jsx
// Admin Dashboard
<AdminLayout scheme="sidebar" tone="subtle">
  <AdminLayout.Header title="Dashboard" />
  <AdminLayout.Sidebar navigation={nav} />
  <AdminLayout.Content>
    <h1 className="text-foreground">Dashboard Content</h1>
  </AdminLayout.Content>
</AdminLayout>

// Marketing Page
<PageLayout scheme="default" tone="clean">
  <PageLayout.Header logo="MyApp" navigation={nav} />
  <PageLayout.Content>
    <h1 className="text-foreground">Welcome</h1>
  </PageLayout.Content>
  <PageLayout.Footer />
</PageLayout>

// Auth Page
<AuthLayout scheme="card" tone="clean">
  <h1 className="text-foreground">Login Form</h1>
</AuthLayout>
```

### Theme Usage

```jsx
import { ThemeProvider, useTheme } from '@voilajsx/uikit/theme-provider';
import { Button } from '@voilajsx/uikit/button';
import '@voilajsx/uikit/styles';

// Setup (in main.tsx)
<ThemeProvider theme="base" mode="light">
  <App />
</ThemeProvider>

// Theme Switcher
const { setTheme } = useTheme();
<Button variant="outline" size="default" onClick={() => setTheme('elegant')}>
  Switch Theme
</Button>

// Semantic Colors (still work with variants)
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Heading</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

## Resources

### 📚 Documentation

- [Quick-Start Guides](docs/quickstart/) - Template-specific setup instructions
- [Composite UI System](docs/UIKIT_COMPOSITE_UI_SYSTEM.md) - Component architecture deep dive
- [Theme System](docs/UIKIT_THEME_GUIDE.md) - Advanced theming and customization
- [CLI Commands](docs/UIKIT_CLI_GUIDE.md) - Complete command reference
- [LLM Usage Guide](docs/UIKIT_LLM_GUIDE.md) - AI-powered development patterns

---

## 📄 License

MIT © [VoilaJSX](https://github.com/voilajsx) - See [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>🚀 Built for the AI-first future of frontend development</strong><br>
  <strong>Where beautiful applications are generated, not written</strong><br><br>
  <a href="https://github.com/voilajsx/uikit">⭐ Star us on GitHub</a>
</p>

---

### **🔖 Tags**

`react` `typescript` `uikit` `ai-ready` `shadcn` `tailwind` `themes`
`components` `layouts` `zero-config` `production-ready`
`agentic-ai` `llm-optimized` `rapid-development` `design-system`
`developer-experience`
