/**
 * tests/public-surface.test.ts
 *
 * Top-level consumer-surface assertions: import every thing a consumer
 * would import and assert its public shape.
 *
 * Catches in one place:
 *   - Missing re-exports from src/index.ts
 *   - Accidentally-removed components, hooks, or utilities
 *   - Broken class-vs-function type (e.g. forwardRef that lost its generic)
 *   - UIKitError base class drift
 *
 * These bugs are not caught by the per-component test files (which don't
 * exist yet) and bypass the drift-check script (which only scans text).
 */

import { describe, expect, it } from 'vitest';
import * as root from '../src/index';

/**
 * Every public export the flat `@bloomneo/uikit` entry must ship.
 * If this list grows or shrinks, something changed in src/index.ts —
 * update here AND document in CHANGELOG.
 *
 * Organised by category to make diffs readable. Type-only exports are
 * NOT listed here (they're erased at runtime and `import * as root` only
 * sees values).
 */
const COMPONENTS = [
  // Form primitives
  'Button', 'Input', 'Textarea', 'Label', 'Checkbox',
  'RadioGroup', 'RadioGroupItem', 'Switch', 'Slider',
  // Form wrappers
  'FormField', 'FormController',   // FormController = legacy alias
  'PasswordInput',
  // Select family
  'Combobox',
  // Display
  'Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter',
  'Badge', 'Avatar', 'AvatarFallback', 'AvatarImage',
  'Separator', 'Progress', 'Skeleton',
  'Alert', 'AlertDescription', 'AlertTitle',
  // Nav
  'Tabs', 'TabsContent', 'TabsList', 'TabsTrigger',
  'Toggle',
  'Popover', 'PopoverContent', 'PopoverTrigger',
  // Data
  'DataTable', 'Calendar',
  // Overlay
  'Toaster',
  // App primitives
  'EmptyState', 'PageHeader',
  // Provider / feedback
  'ThemeProvider', 'ToastProvider', 'ConfirmProvider',
  // Permission / auth-UI
  'PermissionProvider', 'PermissionGate',
];

const HOOKS = [
  'useApi',
  'useBackendStatus',
  'useLocalStorage',
  'useMediaQuery',
  'useBreakpoint',
  'useActiveBreakpoint',
  'useDataTable',
  'usePagination',
  'useTheme',
  'useToast',
  'useConfirm',
  'usePermission',
];

const UTILITIES = [
  'cn',           // className merge (clsx + tailwind-merge)
  'toast',        // flat toast API
  'foucScript',   // FOUC-prevention JS string factory
];

describe('Flat entry — @bloomneo/uikit', () => {
  // Every component export must exist at runtime.
  describe('Components', () => {
    for (const name of COMPONENTS) {
      it(`exports ${name}`, () => {
        expect(
          (root as any)[name],
          `${name} missing from src/index.ts`,
        ).toBeDefined();
      });
    }
  });

  // Every hook must exist and be a function.
  describe('Hooks', () => {
    for (const name of HOOKS) {
      it(`exports ${name} as a function`, () => {
        const fn = (root as any)[name];
        expect(fn, `${name} missing`).toBeDefined();
        expect(typeof fn).toBe('function');
      });
    }
  });

  // Utilities — function or object (toast is a flat object).
  describe('Utilities', () => {
    it('cn is a function', () => expect(typeof (root as any).cn).toBe('function'));
    it('toast is callable and has .success / .error / .info / .warning', () => {
      // sonner's toast is a function (shorthand for info()) with named methods
      // attached. Both typeof 'function' and the .success method must work.
      const t = (root as any).toast;
      expect(typeof t).toBe('function');
      expect(typeof t.success).toBe('function');
      expect(typeof t.error).toBe('function');
      expect(typeof t.info).toBe('function');
      expect(typeof t.warning).toBe('function');
    });
    it('foucScript is a function', () => {
      expect(typeof (root as any).foucScript).toBe('function');
    });
  });

  it('exports no unexpected *Provider without a matching hook', () => {
    // Drift trap: if a new Provider gets added, a matching hook should
    // usually accompany it (or it's orphaned context). This doesn't hard-fail,
    // just documents the expected pattern.
    const providers = Object.keys(root).filter((k) => k.endsWith('Provider'));
    const knownOk = new Set([
      'ThemeProvider',      // paired with useTheme
      'ToastProvider',      // paired with useToast / toast
      'ConfirmProvider',    // paired with useConfirm
      'PermissionProvider', // paired with usePermission / PermissionGate
      'TooltipProvider',    // Radix tooltip — required parent for <Tooltip> subtree
    ]);
    for (const p of providers) {
      expect(knownOk.has(p), `Unexpected provider: ${p} — add to knownOk if intentional`).toBe(true);
    }
  });
});

describe('Error taxonomy — UIKitError', () => {
  it('UIKitError extends Error and carries component + docsUrl', () => {
    const { UIKitError } = root as any;
    expect(typeof UIKitError).toBe('function');
    const e = new UIKitError('TestComponent', 'requires foo');
    expect(e).toBeInstanceOf(Error);
    expect(e.name).toBe('UIKitError');
    expect(e.component).toBe('TestComponent');
    expect(typeof e.docsUrl).toBe('string');
    expect(e.docsUrl).toContain('bloomneo.github.io/uikit/llms#');
  });

  it('requireProp throws UIKitError for undefined/null', () => {
    const { requireProp, UIKitError } = root as any;
    expect(() => requireProp('Button', 'label', undefined)).toThrow(UIKitError);
    expect(() => requireProp('Button', 'label', null)).toThrow(UIKitError);
  });

  it('requireArrayProp rejects non-arrays including undefined', () => {
    const { requireArrayProp, UIKitError } = root as any;
    expect(() => requireArrayProp('DataTable', 'data', undefined)).toThrow(UIKitError);
    expect(() => requireArrayProp('DataTable', 'data', {})).toThrow(UIKitError);
    expect(() => requireArrayProp('DataTable', 'data', [])).not.toThrow();
  });

  // Every typed subclass extends UIKitError, so one instanceof catches all.
  it.each([
    'DataTableError',
    'FormFieldError',
    'ThemeError',
    'ConfirmError',
    'ToastError',
    'PermissionError',
  ])('%s extends UIKitError', (cls) => {
    const { UIKitError } = root as any;
    const Cls = (root as any)[cls];
    expect(typeof Cls).toBe('function');
    const e = new Cls('test');
    expect(e).toBeInstanceOf(UIKitError);
    expect(e).toBeInstanceOf(Error);
    expect(e.name).toBe(cls);
    expect(e.docsUrl).toContain('bloomneo.github.io/uikit/llms#');
  });
});

describe('Provider chain — ordering contract', () => {
  // Documented canonical order: ThemeProvider > ToastProvider (sibling) +
  // ConfirmProvider (wraps children). These tests don't render — they just
  // assert the exports are callable components so consumers can assemble
  // the tree without surprise.
  it('every provider is a function (component)', () => {
    expect(typeof (root as any).ThemeProvider).toBe('function');
    expect(typeof (root as any).ToastProvider).toBe('function');
    expect(typeof (root as any).ConfirmProvider).toBe('function');
    expect(typeof (root as any).PermissionProvider).toBe('function');
  });

  it('every hook paired with a provider is a function', () => {
    expect(typeof (root as any).useTheme).toBe('function');
    expect(typeof (root as any).useToast).toBe('function');
    expect(typeof (root as any).useConfirm).toBe('function');
    expect(typeof (root as any).usePermission).toBe('function');
  });
});
