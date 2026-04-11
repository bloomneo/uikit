/**
 * FOUC (Flash of Unstyled Content) prevention helper for @voilajsx/uikit themes.
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
 *     <script>{`__VOILAJSX_UIKIT_FOUC__`}</script>
 *   </head>
 *
 *   Or copy the output of `foucScript()` directly into a literal <script> tag.
 *
 * Usage in Next.js (app router):
 *
 *   // app/layout.tsx
 *   import { foucScript } from '@voilajsx/uikit/fouc';
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
export declare function foucScript(options?: FoucScriptOptions): string;
/**
 * Convenience: returns the full <script> tag string. Use when concatenating
 * into raw HTML rather than via React's `dangerouslySetInnerHTML`.
 */
export declare function foucScriptTag(options?: FoucScriptOptions): string;
//# sourceMappingURL=fouc.d.ts.map