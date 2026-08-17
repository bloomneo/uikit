/**
 * `base.js` is plain JavaScript, so `tsc` emits no declaration for it and
 * `dist/types/themes/index.d.ts` was left importing a module that does not
 * exist — breaking the `./themes` subpath's types for consumers.
 */
import type { ThemePreset } from '../index';
declare const baseTheme: ThemePreset;
export default baseTheme;
