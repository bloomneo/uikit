/**
 * Shared setup for DOM-based tests.
 *
 * `jest-dom` matchers are only registered when a DOM exists — the node-env
 * suites (styles, public surface) load this file too, and importing the
 * matchers there would fail on a missing `document`.
 */
import { afterEach, expect } from 'vitest';

if (typeof document !== 'undefined') {
  const matchers = await import('@testing-library/jest-dom/matchers');
  const { cleanup } = await import('@testing-library/react');
  expect.extend(matchers.default ?? matchers);
  afterEach(() => cleanup());

  // Radix components measure and observe; jsdom ships neither.
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as never;
  globalThis.matchMedia ??= ((q: string) => ({
    matches: false,
    media: q,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  })) as never;
  Element.prototype.scrollIntoView ??= function () {};
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= function () {};
  Element.prototype.releasePointerCapture ??= function () {};
}
