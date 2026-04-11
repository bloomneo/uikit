/**
 * Educational runtime errors for @voilajsx/uikit.
 *
 * Components throw these instead of generic TypeErrors so that both humans
 * and AI coding agents get an actionable message naming the missing prop and
 * pointing at the canonical doc entry. The format is intentionally consistent:
 *
 *   [@voilajsx/uikit] <Component> requires `<prop>`. <reason>.
 *   See: https://voilajsx.github.io/uikit/llms#<slug>
 *
 * The trailing URL is the entry inside the generated `llms.txt`. Agents that
 * read tool errors and self-correct will fetch that link and recover on the
 * next iteration.
 */

const DOCS_BASE = 'https://voilajsx.github.io/uikit/llms#';

export class UIKitError extends Error {
  readonly component: string;
  readonly docsUrl: string;

  constructor(component: string, message: string, slug?: string) {
    const url = DOCS_BASE + (slug ?? component.toLowerCase());
    super('[@voilajsx/uikit] <' + component + '> ' + message + '\nSee: ' + url);
    this.name = 'UIKitError';
    this.component = component;
    this.docsUrl = url;
  }
}

/**
 * Throw if a required prop is missing or wrongly typed. Designed to fire at
 * the very top of a component's render so consumers see the message before
 * any downstream null-deref.
 */
export function requireProp<T>(
  component: string,
  prop: string,
  value: T | undefined | null,
  hint?: string
): T {
  if (value === undefined || value === null) {
    const reason = hint
      ? 'requires `' + prop + '` prop. ' + hint
      : 'requires `' + prop + '` prop (missing or null).';
    throw new UIKitError(component, reason);
  }
  return value;
}

/**
 * Throw if `value` is not an array. Catches the most common DataTable misuse:
 * passing a single object or `undefined` while data is loading.
 */
export function requireArrayProp<T>(
  component: string,
  prop: string,
  value: unknown,
  hint?: string
): T[] {
  if (!Array.isArray(value)) {
    const got = value === undefined ? 'undefined' : value === null ? 'null' : typeof value;
    const reason = hint
      ? 'expects `' + prop + '` to be an array (got ' + got + '). ' + hint
      : 'expects `' + prop + '` to be an array (got ' + got + ').';
    throw new UIKitError(component, reason);
  }
  return value as T[];
}

/**
 * Lighter-weight version that only warns in development. Use for nice-to-have
 * conventions (e.g. "every column should have a unique id") that shouldn't
 * crash a production app.
 */
export function warnInDev(component: string, message: string, slug?: string): void {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
    return;
  }
  const url = DOCS_BASE + (slug ?? component.toLowerCase());
  // eslint-disable-next-line no-console
  console.warn('[@voilajsx/uikit] <' + component + '> ' + message + '\nSee: ' + url);
}
