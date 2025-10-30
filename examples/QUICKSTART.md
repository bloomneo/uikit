# Quick Start - UIKit Examples App

## 🎯 Run the Examples

```bash
# 1. Navigate to examples folder
cd examples

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

That's it! The app will automatically open at http://localhost:3000

## 🎨 What You'll See

- **Left Sidebar**: Navigate through 10 different split layout examples
- **Main Area**: Live preview of the selected example
- **Bottom Right**: Info about the current example
- **Top Left**: Toggle button to hide/show navigation

## 📝 Features

### 10 AuthLayout Split Examples

1. **Default Split** - Built-in primary gradient
2. **Solid Color** - Simple blue background
3. **Custom Gradient** - Purple to pink
4. **Background Image** - Unsplash cover image
5. **Mesh Gradient** - Emerald to blue
6. **Dark Gradient** - Dark purple theme
7. **Custom Content** - Full JSX with features list
8. **Animated Gradient** - Pink to yellow animation
9. **Minimal Light** - Clean gray background
10. **Multi-Color** - Rainbow conic gradient

### Controls

- **Menu Button** (top-left): Toggle sidebar visibility
- **Example Cards**: Click to switch between examples
- **Full-screen**: Hide sidebar for authentic view

## 🔧 Customization

All example code is in `src/components/auth-split.tsx`

Each example shows different ways to use the `splitBackground` prop:

```tsx
// Solid color
<AuthLayout splitBackground="bg-blue-600" />

// Gradient
<AuthLayout splitBackground="bg-gradient-to-br from-purple-600 to-pink-500" />

// Image
<AuthLayout splitBackground="bg-cover bg-center bg-[url('/image.jpg')]" />

// Custom JSX
<AuthLayout splitContent={<YourComponent />} />
```

## 📦 Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **Tailwind CSS 4** - Styling (native CSS)
- **TypeScript** - Type safety
- **@voilajsx/uikit** - Component library (from parent package)

## 🐛 Troubleshooting

### Port already in use?
Edit `vite.config.ts` and change the port:
```ts
server: {
  port: 3001, // Change this
}
```

### Components not found?
The examples import directly from the parent package source via path alias:
```
@voilajsx/uikit → ../src
```

### Build errors?
Make sure you're in the examples folder and node_modules is installed:
```bash
cd examples
rm -rf node_modules package-lock.json
npm install
```

## 💡 Tips

- Use the sidebar to quickly compare different styles
- Hide the sidebar to see the full layout as users will
- Check the info overlay for details about each example
- All examples use real, working forms you can interact with

Enjoy exploring! 🚀
