/**
 * Optimized theme system exports for @bloomneo/uikit
 * @module @bloomneo/uikit
 * @file src/themes/index.ts
 */

// Theme provider exports
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type Mode,
  type Tone,
  type ThemeContextValue,
  type ThemeProviderProps,
} from './theme-provider';

// Import optimized theme presets from JavaScript files
import baseTheme from './presets/base.js';
import elegantTheme from './presets/elegant.js';
import metroTheme from './presets/metro.js';
import studioTheme from './presets/studio.js';
import vividTheme from './presets/vivid.js';

// Re-export with both default and named patterns
export { default as baseTheme } from './presets/base.js';
export { default as elegantTheme } from './presets/elegant.js';
export { default as metroTheme } from './presets/metro.js';
export { default as studioTheme } from './presets/studio.js';
export { default as vividTheme } from './presets/vivid.js';

// Named aliases for convenience
export { baseTheme as base };
export { elegantTheme as elegant };
export { metroTheme as metro };
export { studioTheme as studio };
export { vividTheme as vivid };

// Type definitions for themes (inferred from JavaScript objects)
export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  
  // Interactive colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  
  // State colors
  destructive: string;
  destructiveForeground: string;
  
  // Border colors
  border: string;
  input: string;
  ring: string;
  
  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  
  // Sidebar colors
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface ThemePreset {
  /** Theme identifier (must match filename) */
  id: string;
  /** Human-readable theme name */
  name: string;
  /** Theme description */
  description: string;
  /** Light mode colors */
  light: ThemeColors;
  /** Dark mode colors */
  dark: ThemeColors;
}

/**
 * @llm-rule Available theme presets
 * All themes that can be used with setTheme()
 */
export const AVAILABLE_THEMES = [
  'base',
  'elegant',
  'metro',
  'studio',
  'vivid'
] as const;

/**
 * @llm-rule All optimized theme presets for build tools
 * Used by build scripts to generate CSS
 * Now with dramatically reduced file sizes!
 */
export const ALL_THEME_PRESETS = {
  base: baseTheme,
  elegant: elegantTheme,
  metro: metroTheme,
  studio: studioTheme,
  vivid: vividTheme,
};

/**
 * @llm-pattern Basic theme usage (same as before)
 * import { ThemeProvider, useTheme } from '@bloomneo/uikit/themes';
 * 
 * <ThemeProvider theme="elegant" mode="dark">
 *   <App />
 * </ThemeProvider>
 * 
 * const { setTheme, setMode, getToneClasses } = useTheme();
 */

/**
 * @llm-pattern Build tool usage (same API, smaller files!)
 * import { ALL_THEME_PRESETS } from '@bloomneo/uikit/themes';
 * 
 * // Generate CSS for all themes
 * Object.values(ALL_THEME_PRESETS).forEach(theme => {
 *   generateCSS(theme);
 * });
 */

/**
 * @llm-pattern Individual theme access (same as before)
 * import { vivid, studioTheme } from '@bloomneo/uikit/themes';
 * 
 * console.log(vivid.name); // "Vivid"
 * console.log(studioTheme.light.primary); // Theme color
 */