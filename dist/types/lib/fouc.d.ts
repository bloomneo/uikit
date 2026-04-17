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
export declare function foucScript(options?: FoucScriptOptions): string;
/**
 * Convenience: returns the full <script> tag string. Use when concatenating
 * into raw HTML rather than via React's `dangerouslySetInnerHTML`.
 */
export declare function foucScriptTag(options?: FoucScriptOptions): string;
//# sourceMappingURL=fouc.d.ts.map