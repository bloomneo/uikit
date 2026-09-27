/**
 * tests/components/router.test.tsx
 *
 * The page router every Bloom app used to copy. These pin the file → URL
 * rules pages depend on, and the failure modes each copy had to fix on its
 * own: pages rendering inside layouts, a lazy page without a Suspense
 * boundary, one throwing page blanking the app, and the 404.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter, Outlet } from 'react-router-dom';
import { PageRouter, pathFromFile, discoverRoutes } from '@bloomneo/uikit/router';

describe('pathFromFile', () => {
  const cases: Array<[string, string | null]> = [
    ['./features/users/pages/index.tsx', '/users'],
    ['./features/users/pages/[id].tsx', '/users/:id'],
    ['./features/users/pages/[userId]/edit.tsx', '/users/:userid/edit'],
    ['./features/docs/pages/[...path].tsx', '/docs/*'],
    ['./features/main/pages/index.tsx', '/'],
    ['./features/main/pages/About.tsx', '/about'],
    ['../features/admin/pages/settings/index.tsx', '/admin/settings'],
    ['./features/users/pages/_shared.tsx', null],
    ['./features/users/pages/_parts/table.tsx', null],
    ['./features/users/components/list.tsx', null],
  ];
  for (const [file, route] of cases) {
    it(`${file} → ${route}`, () => expect(pathFromFile(file)).toBe(route));
  }

  it('honours a per-feature route base', () => {
    expect(pathFromFile('./features/billing/pages/plan.tsx', { billing: '/account' })).toBe('/account/plan');
    expect(pathFromFile('./features/students/pages/index.tsx', { students: '/' })).toBe('/');
  });
});

describe('discoverRoutes', () => {
  it('orders specific paths first and "/" last', () => {
    const load = () => Promise.resolve({ default: () => null });
    const paths = discoverRoutes({
      './features/main/pages/index.tsx': load,
      './features/users/pages/index.tsx': load,
      './features/users/pages/[id]/edit.tsx': load,
    }).map((r) => r.path);
    expect(paths[paths.length - 1]).toBe('/');
    expect(paths[0]).toBe('/users/:id/edit');
  });

  it('warns when two files map to one URL', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const load = () => Promise.resolve({ default: () => null });
    discoverRoutes({ './features/main/pages/users.tsx': load, './features/users/pages/index.tsx': load });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('both map to /users'));
    warn.mockRestore();
  });
});

const page = (text: string) => () => Promise.resolve({ default: () => <p>{text}</p> });

function renderAt(path: string, props: Partial<React.ComponentProps<typeof PageRouter>> = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PageRouter
        pages={{
          './features/main/pages/index.tsx': page('home page'),
          './features/admin/pages/index.tsx': page('admin page'),
          './features/broken/pages/index.tsx': () =>
            Promise.resolve({
              default: () => {
                throw new Error('boom');
              },
            }),
        }}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe('PageRouter', () => {
  it('lazy-loads the page for the URL', async () => {
    renderAt('/');
    expect(await screen.findByText('home page')).toBeTruthy();
  });

  it('renders matching pages inside their layout, even when the layout has no Suspense', async () => {
    const Layout = () => (
      <div>
        <p>admin chrome</p>
        <Outlet />
      </div>
    );
    renderAt('/admin', { layouts: [{ match: (p) => p.startsWith('/admin'), Layout }] });
    expect(await screen.findByText('admin page')).toBeTruthy();
    expect(screen.getByText('admin chrome')).toBeTruthy();
  });

  it('shows the 404 for an unknown URL', async () => {
    renderAt('/nope');
    expect(await screen.findByText('Page not found')).toBeTruthy();
  });

  it('contains a throwing page and reports it', async () => {
    const onError = vi.fn();
    const quiet = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderAt('/broken', { onError });
    expect(await screen.findByText('An error occurred')).toBeTruthy();
    expect(onError).toHaveBeenCalled();
    quiet.mockRestore();
  });
});
