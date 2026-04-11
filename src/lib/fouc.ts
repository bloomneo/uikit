/**
 * FOUC (Flash of Unstyled Content) prevention helper for @bloomneo/uikit themes.
 *
 * The problem: <ThemeProvider> can only apply theme classes once React mounts.
 * On first paint the page briefly renders with the default theme (sky blue),
 * then snaps to the user's theme. Visible flash on every load.
 *
 * The fix: run a tiny script BEFORE the React bundle parses, reading the
 * persisted theme out of localStorage and writing the matching classes onto
 * <html> synchronously. By the time React mounts, the DOM is already correct.
 *
 * Usage in plain Vite / CRA:
 *
 *   // index.html
 *   <head>
 *     <script>{`__BLOOMNEO_UIKIT_FOUC__`}</script>
 *   </head>
 *
 *   Or copy the output of `foucScript()` directly into a literal <script> tag.
 *
 * Usage in Next.js (app router):
 *
 *   // app/layout.tsx
 *   import { foucScript } from '@bloomneo/uikit/fouc';
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <head>
 *           <script dangerouslySetInnerHTML={{ __html: foucScript() }} />
 *         </head>
 *         <body>{children}</body>
 *       </html>
 *     );
 *   }
 *
 * Both forms must be passed the same `storageKey` and `defaultTheme` /
 * `defaultMode` you give to <ThemeProvider>, otherwise the inline script and
 * the React provider will disagree on first paint.
 */

export interface FoucScriptOptions {
  /** Storage key used by ThemeProvider. Default: "uikit-theme" */
  storageKey?: string;
  /** Theme to fall back to when nothing is stored. Default: "base" */
  defaultTheme?: string;
  /** Mode to fall back to when nothing is stored. Default: "light" */
  defaultMode?: 'light' | 'dark';
  /** Whether to honor `prefers-color-scheme` when no value is stored. Default: true */
  detectSystem?: boolean;
}

/**
 * Returns a self-contained JavaScript snippet (no imports, no globals) that
 * applies the persisted theme + mode classes onto <html> synchronously.
 *
 * The snippet is intentionally tiny (~600 bytes minified) and uses no template
 * literals so it can be safely embedded in HTML without escaping pitfalls.
 */
export function foucScript(options: FoucScriptOptions = {}): string {
  const storageKey = options.storageKey ?? 'uikit-theme';
  const defaultTheme = options.defaultTheme ?? 'base';
  const defaultMode = options.defaultMode ?? 'light';
  const detectSystem = options.detectSystem ?? true;

  // Build the script as a string. Avoid template literals inside the snippet
  // so it can be embedded in HTML without escaping.
  return [
    '(function(){try{',
    'var k=' + JSON.stringify(storageKey) + ';',
    'var dt=' + JSON.stringify(defaultTheme) + ';',
    'var dm=' + JSON.stringify(defaultMode) + ';',
    'var ds=' + (detectSystem ? 'true' : 'false') + ';',
    'var t=dt,m=dm;',
    'var s=null;try{s=localStorage.getItem(k);}catch(e){}',
    'if(s){try{var p=JSON.parse(s);if(p&&p.theme)t=p.theme;if(p&&(p.mode==="light"||p.mode==="dark"))m=p.mode;}catch(e){}}',
    'else if(ds&&window.matchMedia){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}',
    'var r=document.documentElement;',
    'var cl=r.classList;',
    'cl.remove("light","dark");',
    'for(var i=cl.length-1;i>=0;i--){var c=cl[i];if(c.indexOf("theme-")===0)cl.remove(c);}',
    'cl.add(m);cl.add("theme-"+t);',
    '}catch(e){}})();',
  ].join('');
}

/**
 * Convenience: returns the full <script> tag string. Use when concatenating
 * into raw HTML rather than via React's `dangerouslySetInnerHTML`.
 */
export function foucScriptTag(options: FoucScriptOptions = {}): string {
  return '<script>' + foucScript(options) + '</script>';
}
