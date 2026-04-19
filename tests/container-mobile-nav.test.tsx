/**
 * tests/container-mobile-nav.test.tsx
 *
 * Smoke test for the PageLayout sidebar → bottom-nav mobile swap. Uses
 * `renderToStaticMarkup` so we don't need a real DOM (uikit's test setup
 * has no jsdom). The assertions target the *structure* that makes the
 * responsive swap work:
 *
 *   - Sidebar has `hidden md:block` so it paints only ≥ md
 *   - Bottom-nav has `md:hidden` so it paints only < md
 *   - First 4 items render as tab buttons
 *   - Items beyond #4 go into the "More" sheet (not the bar itself)
 *   - `env(safe-area-inset-bottom)` is applied so notched devices clear
 *   - Plain `navigation` array is honored (not just custom JSX)
 *
 * These are CSS-driven, so the SSR output is enough — no state transitions
 * to simulate. Behavioral tests (sheet open/close on tap) would need a real
 * DOM and @testing-library, which is out of scope for this release.
 */

import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Container } from '../src/components/sections/container';
import type { NavigationItem } from '../src/types';

function render(navigation: NavigationItem[]): string {
  return renderToStaticMarkup(
    React.createElement(
      Container,
      {
        sidebar: 'left',
        navigation,
        currentPath: '/a',
      },
      React.createElement('p', null, 'content'),
    ),
  );
}

const sevenItems: NavigationItem[] = [
  { key: 'a', label: 'Alpha', href: '/a' },
  { key: 'b', label: 'Beta', href: '/b' },
  { key: 'c', label: 'Gamma', href: '/c' },
  { key: 'd', label: 'Delta', href: '/d' },
  { key: 'e', label: 'Epsilon', href: '/e' },
  { key: 'f', label: 'Zeta', href: '/f' },
  { key: 'g', label: 'Eta', href: '/g' },
];

describe('Container responsive sidebar', () => {
  it('sidebar block is hidden below md, visible at md+', () => {
    const html = render(sevenItems);
    expect(html).toMatch(/class="[^"]*\bhidden md:block\b/);
  });

  it('bottom-nav block is visible below md, hidden at md+', () => {
    const html = render(sevenItems);
    // The fixed bottom nav itself:
    expect(html).toMatch(/<nav[^>]*class="[^"]*\bmd:hidden\b[^"]*"/);
    // And the spacer div that pushes page content above the bar:
    expect(html).toMatch(/<div[^>]*class="md:hidden h-\[60px\]"/);
  });

  it('renders first 4 items as tab buttons in the bar', () => {
    const html = render(sevenItems);
    // Scope to just the bottom-nav <nav aria-label="Primary navigation">
    // section, since the desktop sidebar (hidden via CSS) still renders all
    // 7 items in the same markup. Inside the bottom nav, only the first 4
    // labels should appear in tab buttons — items 5+ go to the "More" sheet.
    const bottomNavStart = html.indexOf('aria-label="Primary navigation"');
    const bottomNavEnd = html.indexOf('aria-label="More navigation items"');
    expect(bottomNavStart).toBeGreaterThan(-1);
    expect(bottomNavEnd).toBeGreaterThan(bottomNavStart);
    const barSection = html.slice(bottomNavStart, bottomNavEnd);
    expect(barSection).toContain('Alpha');
    expect(barSection).toContain('Beta');
    expect(barSection).toContain('Gamma');
    expect(barSection).toContain('Delta');
    expect(barSection).not.toContain('Epsilon');
    expect(barSection).not.toContain('Zeta');
    expect(barSection).not.toContain('Eta');
  });

  it('renders a "More" overflow trigger when navigation has more than 4 items', () => {
    const html = render(sevenItems);
    expect(html).toContain('aria-label="More navigation items"');
    // The label text in the button:
    expect(html).toMatch(/>More<\/span>/);
  });

  it('does NOT render "More" when navigation has 4 or fewer items', () => {
    const html = render(sevenItems.slice(0, 4));
    expect(html).not.toContain('aria-label="More navigation items"');
  });

  it('applies safe-area-inset-bottom on the bottom nav', () => {
    const html = render(sevenItems);
    expect(html).toMatch(/pb-\[env\(safe-area-inset-bottom\)\]/);
  });

  it('sets aria-current="page" on the active tab', () => {
    const html = render(sevenItems); // currentPath: '/a' → Alpha
    const primarySection = html.split('aria-label="More navigation items"')[0];
    expect(primarySection).toMatch(/aria-current="page"[^>]*>[^<]*<\/button>|<button[^>]*aria-current="page"/);
  });

  it('skips bottom-nav entirely when sidebar="none"', () => {
    const html = renderToStaticMarkup(
      React.createElement(
        Container,
        { sidebar: 'none' },
        React.createElement('p', null, 'content'),
      ),
    );
    expect(html).not.toContain('aria-label="Primary navigation"');
  });
});
