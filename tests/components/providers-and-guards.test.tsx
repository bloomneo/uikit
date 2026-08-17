/**
 * tests/components/providers-and-guards.test.tsx
 *
 * The library's stated defence against agent mistakes is "educational runtime
 * errors" — misuse a component and you get a message that names the fix. That
 * promise was never tested, so this file asserts it holds for the mistakes
 * AGENTS.md actually lists: duplicate providers, missing required props, and
 * role gates that must fail closed.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import {
  ToastProvider,
  ConfirmProvider,
  ThemeProvider,
  PermissionProvider,
  PermissionGate,
  PageHeader,
  EmptyState,
  Button,
  useConfirm,
  useTheme,
} from '@bloomneo/uikit';

let warnSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => warnSpy.mockRestore());

const warned = () => warnSpy.mock.calls.map((c) => String(c[0])).join('\n');

describe('duplicate providers warn instead of silently doubling behaviour', () => {
  it('two <ToastProvider>s warn', () => {
    render(
      <>
        <ToastProvider />
        <ToastProvider />
      </>,
    );
    expect(warned()).toMatch(/ToastProvider/);
  });

  it('one <ToastProvider> does not warn', () => {
    render(<ToastProvider />);
    expect(warned()).not.toMatch(/ToastProvider/);
  });

  it('two <ConfirmProvider>s warn', () => {
    render(
      <ConfirmProvider>
        <ConfirmProvider>
          <span>x</span>
        </ConfirmProvider>
      </ConfirmProvider>,
    );
    expect(warned()).toMatch(/ConfirmProvider/);
  });
});

describe('required props are enforced with a message that names the fix', () => {
  it('<PageHeader> without a title', () => {
    expect(() => render(<PageHeader title={undefined as never} />)).toThrow(/title/i);
  });

  it('<EmptyState> without a title', () => {
    expect(() => render(<EmptyState title={undefined as never} />)).toThrow(/title/i);
  });

  it('the message identifies the library and the component', () => {
    let msg = '';
    try {
      render(<PageHeader title={undefined as never} />);
    } catch (e) {
      msg = (e as Error).message;
    }
    expect(msg).toContain('@bloomneo/uikit');
    expect(msg).toContain('PageHeader');
  });
});

describe('PageHeader renders what a page owns', () => {
  it('renders title, description, breadcrumbs and actions', () => {
    render(
      <PageHeader
        title="Users"
        description="All accounts"
        breadcrumbs={[{ label: 'Acme', href: '/' }, { label: 'Users' }]}
        actions={<Button>Invite</Button>}
      />,
    );
    // "Users" is deliberately both the title and the trailing crumb, so query
    // by role rather than text — getByText would find two nodes.
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument();
    expect(screen.getByText('All accounts')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Acme' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: 'Invite' })).toBeInTheDocument();
  });

  it('the current crumb is plain text, not a link', () => {
    render(<PageHeader title="Users" breadcrumbs={[{ label: 'Acme', href: '/' }, { label: 'Users' }]} />);
    expect(screen.queryByRole('link', { name: 'Users' })).toBeNull();
  });
});

describe('PermissionGate fails closed', () => {
  const renderGate = (userRole: string | undefined, required: string) =>
    render(
      <PermissionProvider value={{ role: userRole } as never}>
        <PermissionGate permission={required} fallback={<span>denied</span>}>
          <span>secret</span>
        </PermissionGate>
      </PermissionProvider>,
    );

  it('hides content when no permission is present', () => {
    renderGate(undefined, 'admin.tenant');
    expect(screen.queryByText('secret')).toBeNull();
  });

  it('renders the fallback rather than nothing', () => {
    renderGate(undefined, 'admin.tenant');
    expect(screen.getByText('denied')).toBeInTheDocument();
  });
});

describe('useConfirm resolves a promise', () => {
  function Subject() {
    const confirm = useConfirm();
    const [result, setResult] = React.useState<string>('pending');
    return (
      <>
        <button onClick={async () => setResult(String(await confirm({ title: 'Delete?' })))}>ask</button>
        <span data-testid="result">{result}</span>
      </>
    );
  }

  it('resolves true when confirmed', async () => {
    render(
      <ConfirmProvider>
        <Subject />
      </ConfirmProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ask' }));
    expect(await screen.findByText('Delete?')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /confirm|ok|yes|delete/i }));
    expect(await screen.findByText('true')).toBeInTheDocument();
  });

  it('resolves false when cancelled', async () => {
    render(
      <ConfirmProvider>
        <Subject />
      </ConfirmProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'ask' }));
    await userEvent.click(await screen.findByRole('button', { name: /cancel/i }));
    expect(await screen.findByText('false')).toBeInTheDocument();
  });
});

describe('ThemeProvider owns the theme class on <html>', () => {
  function ModeToggle() {
    const { mode, setMode, theme, setTheme } = useTheme();
    return (
      <>
        <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>toggle</button>
        <button onClick={() => setTheme('ops')}>custom</button>
        <span data-testid="state">{`${theme}/${mode}`}</span>
      </>
    );
  }

  it('applies theme-<id> and the mode class to the document element', () => {
    render(
      <ThemeProvider theme="base" mode="light">
        <ModeToggle />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('theme-base')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('accepts a custom theme id (4.0 widened the Theme type for this)', async () => {
    render(
      <ThemeProvider theme="base" mode="light">
        <ModeToggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'custom' }));
    expect(document.documentElement.classList.contains('theme-ops')).toBe(true);
    expect(document.documentElement.classList.contains('theme-base')).toBe(false);
  });

  it('toggles mode', async () => {
    render(
      <ThemeProvider theme="base" mode="light">
        <ModeToggle />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
