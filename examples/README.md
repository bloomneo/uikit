# @voilajsx/uikit Examples

This is a **standalone React application** showcasing all the features and variations of the UIKit library.

## 📁 Directory Structure

```
examples/
├── src/
│   ├── components/
│   │   └── auth-split.tsx      # 10 AuthLayout split scheme examples
│   ├── App.tsx                 # Main app with navigation
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind 4 styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md                   # This file
```

## 🚀 Quick Start

### Installation

```bash
# Navigate to examples folder
cd examples

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open automatically at http://localhost:3000

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 What's Included

### Interactive Example Browser

- **10 Split Scheme Examples** with live preview
- **Sidebar Navigation** to switch between examples
- **Full-screen Mode** to see layouts without UI
- **Live Code Reference** for each example

### Available Examples

#### `layouts/auth-split.tsx` - 10 Split Scheme Examples

1. **DefaultSplitExample** - Built-in primary gradient with dot pattern
2. **SolidColorSplitExample** - Solid color background
3. **CustomGradientSplitExample** - Custom gradient colors
4. **BackgroundImageSplitExample** - Background image with cover
5. **MeshGradientSplitExample** - Multi-color mesh gradient
6. **DarkGradientSplitExample** - Dark theme with gradient
7. **CustomContentSplitExample** - Full JSX control with features list
8. **AnimatedGradientSplitExample** - Animated gradient effect
9. **MinimalLightSplitExample** - Minimal light background
10. **MultiColorGradientSplitExample** - Conic gradient with rainbow colors

## 📖 Usage Patterns

### Basic Split Layout

```tsx
import { AuthLayout } from '@voilajsx/uikit/auth';

<AuthLayout scheme="split" title="Welcome" subtitle="Sign in">
  <LoginForm />
</AuthLayout>
```

### Custom Background Color

```tsx
<AuthLayout
  scheme="split"
  splitBackground="bg-blue-600"
  title="Welcome"
>
  <LoginForm />
</AuthLayout>
```

### Custom Gradient

```tsx
<AuthLayout
  scheme="split"
  splitBackground="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"
  title="Welcome"
>
  <LoginForm />
</AuthLayout>
```

### Background Image

```tsx
<AuthLayout
  scheme="split"
  splitBackground="bg-cover bg-center bg-[url('/hero.jpg')]"
  title="Welcome"
>
  <LoginForm />
</AuthLayout>
```

### Custom Content

```tsx
<AuthLayout
  scheme="split"
  splitContent={
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="text-white">
        <h1 className="text-4xl font-bold">Custom Content</h1>
        <p>Full control over the left side</p>
      </div>
    </div>
  }
  title="Welcome"
>
  <LoginForm />
</AuthLayout>
```

## 🎨 Customization Priority

The split scheme uses this priority order:

1. **`splitContent`** - Full JSX override (highest priority)
2. **`splitBackground`** - CSS classes for background
3. **Default** - Built-in primary gradient with pattern (fallback)

## 💡 Tips

1. **Use semantic colors** when possible (`bg-primary`, `bg-secondary`)
2. **Test in both modes** - Light and dark themes
3. **Combine classes** - Mix multiple Tailwind utilities
4. **Keep contrast** - Ensure text is readable
5. **Test responsive** - Check on mobile and desktop

## 🔗 Related Documentation

- [UIKit LLM Guide](../docs/UIKIT_LLM_GUIDE.md)
- [Component Documentation](../README.md)
- [Theme System](../docs/UIKIT_THEME_GUIDE.md)

## 📝 Contributing Examples

To add a new example:

1. Create a new file in the appropriate subfolder
2. Export individual example components
3. Add clear comments and JSDoc
4. Update this README with the new example
5. Follow the existing naming convention
