/**
 * FOUC (Flash of Unstyled Content) prevention helper for @bloomneo/uikit themes.
 * @module @bloomneo/uikit
 * @file src/lib/fouc.ts
 *
 * @llm-rule WHEN: Setting up a new app — ALWAYS add the FOUC script to index.html <head>
 * @llm-rule AVOID: Skipping this step — users will see a flash of default theme on every page load
 * @llm-rule NOTE: `foucScript()` returns a string to inject into a <script> tag in <head>
 * @llm-rule NOTE: `foucScriptTag()` returns the full `<script>...</script>` HTML string
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 *
 * Reads persisted theme from localStorage and applies classes to <html>
 * synchronously before React mounts, preventing the flash.
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
