/**
 * AuthLayout Split Scheme Examples
 * @file examples/layouts/auth-split.tsx
 *
 * This file demonstrates all the ways to customize the split scheme layout
 */

import { AuthLayout } from '@voilajsx/uikit/auth';
import { Button } from '@voilajsx/uikit/button';
import { Input } from '@voilajsx/uikit/input';
import { Label } from '@voilajsx/uikit/label';
import { ThemeProvider } from '@voilajsx/uikit/theme-provider';
import '@voilajsx/uikit/styles';

// ============================================================================
// EXAMPLE 1: Default Split (Built-in Primary Gradient)
// ============================================================================
export function DefaultSplitExample() {
  return (
    <ThemeProvider theme="base" mode="light">
      <AuthLayout scheme="split" title="Welcome Back" subtitle="Sign in to continue">
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 2: Custom Solid Color Background
// ============================================================================
export function SolidColorSplitExample() {
  return (
    <ThemeProvider theme="base" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-blue-600"
        title="Create Account"
        subtitle="Join us today"
      >
        <form className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" placeholder="John Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Create password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign Up
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 3: Custom Gradient Background
// ============================================================================
export function CustomGradientSplitExample() {
  return (
    <ThemeProvider theme="vivid" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500"
        title="Welcome Back"
        subtitle="We missed you!"
        logo={
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 4: Background Image (Local SVG with inline style)
// ============================================================================
export function BackgroundImageSplitExample() {
  return (
    <ThemeProvider theme="elegant" mode="light">
      <AuthLayout
        scheme="split"
        splitContent={
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/auth-bg.svg')" }}
          />
        }
        title="Sign In"
        subtitle="Access your dashboard"
      >
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 5: Mesh Gradient Background
// ============================================================================
export function MeshGradientSplitExample() {
  return (
    <ThemeProvider theme="metro" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600"
        title="Reset Password"
        subtitle="Enter your email to reset"
      >
        <form className="space-y-4">
          <div>
            <Label>Email Address</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Send Reset Link
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Remember your password?{' '}
            <a href="#" className="text-primary hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 6: Dark Gradient with Pattern
// ============================================================================
export function DarkGradientSplitExample() {
  return (
    <ThemeProvider theme="studio" mode="dark">
      <AuthLayout
        scheme="split"
        splitBackground="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
        title="Admin Login"
        subtitle="Secure access portal"
        logo={
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <Label className="text-foreground">Admin Email</Label>
            <Input type="email" placeholder="admin@company.com" className="bg-background" />
          </div>
          <div>
            <Label className="text-foreground">Password</Label>
            <Input type="password" placeholder="Enter secure password" className="bg-background" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Access Dashboard
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 7: Custom Split Content (Full JSX Control)
// ============================================================================
export function CustomContentSplitExample() {
  return (
    <ThemeProvider theme="base" mode="light">
      <AuthLayout
        scheme="split"
        splitContent={
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-12 bg-gradient-to-br from-indigo-600 to-purple-700">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-6">
                Build amazing things
              </h1>
              <p className="text-xl mb-8 text-indigo-100">
                Join thousands of developers creating the future with our platform.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-lg">Fast deployment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-lg">99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-lg">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        }
        title="Get Started"
        subtitle="Create your account in seconds"
      >
        <form className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input type="text" placeholder="John Doe" />
          </div>
          <div>
            <Label>Work Email</Label>
            <Input type="email" placeholder="you@company.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Create a strong password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Create Account
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 8: Animated Gradient Background
// ============================================================================
export function AnimatedGradientSplitExample() {
  return (
    <ThemeProvider theme="vivid" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 animate-gradient-x"
        title="Welcome Back"
        subtitle="Sign in to your account"
        logo={
          <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <span className="text-3xl">🎨</span>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 9: Minimal Light Background
// ============================================================================
export function MinimalLightSplitExample() {
  return (
    <ThemeProvider theme="base" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-gray-50"
        title="Sign In"
        subtitle="Continue to your workspace"
      >
        <form className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Sign In
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// EXAMPLE 10: Multi-Color Gradient
// ============================================================================
export function MultiColorGradientSplitExample() {
  return (
    <ThemeProvider theme="metro" mode="light">
      <AuthLayout
        scheme="split"
        splitBackground="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-rose-400 via-fuchsia-500 to-indigo-500"
        title="Join Our Community"
        subtitle="Create your free account"
        logo={
          <div className="w-16 h-16 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-4xl">🌈</span>
          </div>
        }
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        }
      >
        <form className="space-y-4">
          <div>
            <Label>Username</Label>
            <Input type="text" placeholder="Choose a username" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Create a password" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground">
            Create Account
          </Button>
        </form>
      </AuthLayout>
    </ThemeProvider>
  );
}

// ============================================================================
// USAGE SUMMARY
// ============================================================================

/**
 * SPLIT SCHEME CUSTOMIZATION OPTIONS:
 *
 * 1. Default (no props):
 *    - Uses built-in primary gradient with dot pattern
 *
 * 2. splitBackground (string):
 *    - Any Tailwind or CSS classes
 *    - Examples:
 *      - Solid: "bg-blue-600"
 *      - Gradient: "bg-gradient-to-br from-purple-600 to-pink-500"
 *      - Image: "bg-cover bg-center bg-[url('/image.jpg')]"
 *      - Pattern: "bg-slate-900 bg-grid-pattern"
 *
 * 3. splitContent (ReactNode):
 *    - Full JSX control over left side
 *    - Override everything with custom content
 *
 * PRIORITY:
 * splitContent > splitBackground > default gradient
 *
 * TIPS:
 * - Use semantic color classes when possible (bg-primary, etc.)
 * - Combine multiple Tailwind classes for complex effects
 * - Test in both light and dark modes
 * - Keep text readable with proper contrast
 */
