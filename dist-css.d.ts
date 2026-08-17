/**
 * Type declarations for the CSS subpaths.
 *
 * TypeScript 5 with `moduleResolution: bundler` reports TS2882 on a
 * side-effect import of a module with no declaration:
 *
 *     import '@bloomneo/uikit/styles';
 *     // Cannot find module or type declarations for side-effect import
 *
 * The shipped `examples/theme-provider.tsx` does exactly that, so the
 * canonical setup example did not typecheck in a strict consumer.
 */
declare module '@bloomneo/uikit/styles';
declare module '@bloomneo/uikit/styles/permissive';
declare module '@bloomneo/uikit/theme';
