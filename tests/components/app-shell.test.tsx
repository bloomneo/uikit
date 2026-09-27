/**
 * tests/components/app-shell.test.tsx
 *
 * AppShell replaced a sidebar that each production app had rebuilt by hand.
 * These tests pin what those copies got wrong or had to rediscover: which
 * item is active, index routes that must not stay active below them, the
 * collapsed rail keeping accessible names, and routers plugging in links.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { AppShell } from '@bloomneo/uikit';

const nav = [
  { href: '/dashboard', label: 'Dashboard', end: true },
  { href: '/dashboard/users', label: 'Users', section: 'Admin' },
  { href: '/dashboard/settings', label: 'Settings' },
];

function renderShell(props: Partial<React.ComponentProps<typeof AppShell>> = {}) {
  return render(
    <AppShell brand={{ name: 'Acme' }} nav={nav} currentPath="/dashboard/users/42" {...props}>
      <p>page body</p>
    </AppShell>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('AppShell', () => {
  it('renders the page and the navigation', () => {
    renderShell();
    expect(screen.getByText('page body')).toBeTruthy();
    const main = screen.getAllByRole('navigation', { name: 'Main' })[0];
    expect(within(main).getByText('Users')).toBeTruthy();
    expect(within(main).getByText('Admin')).toBeTruthy();
  });

  it('marks the item that contains the current path as the page', () => {
    renderShell();
    const main = screen.getAllByRole('navigation', { name: 'Main' })[0];
    const users = within(main).getByText('Users').closest('a')!;
    expect(users.getAttribute('aria-current')).toBe('page');
  });

  it('does not keep an `end` index route active below it', () => {
    renderShell();
    const main = screen.getAllByRole('navigation', { name: 'Main' })[0];
    const dashboard = within(main).getByText('Dashboard').closest('a')!;
    expect(dashboard.getAttribute('aria-current')).toBeNull();
  });

  it('collapses to an icon rail that keeps accessible names, and remembers it', async () => {
    renderShell();
    await userEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    const rail = screen.getAllByRole('navigation', { name: 'Main' })[0];
    expect(within(rail).queryByText('Users')).toBeNull();
    expect(within(rail).getByRole('link', { name: 'Users' })).toBeTruthy();
    expect(window.localStorage.getItem('uikit:sidebar:collapsed')).toBe('1');
  });

  it('uses the router link component when one is given', () => {
    const RouterLink = ({ href, ...rest }: any) => <a data-router="yes" href={`#${href}`} {...rest} />;
    renderShell({ linkComponent: RouterLink });
    const main = screen.getAllByRole('navigation', { name: 'Main' })[0];
    const settings = within(main).getByText('Settings').closest('a')!;
    expect(settings.getAttribute('data-router')).toBe('yes');
    expect(settings.getAttribute('href')).toBe('#/dashboard/settings');
  });
});
