/**
 * Optimized theme system exports for @bloomneo/uikit
 * @module @bloomneo/uikit
 * @file src/themes/index.ts
 */
export { ThemeProvider, useTheme, type Theme, type Mode, type Tone, type ThemeContextValue, type ThemeProviderProps, } from './theme-provider';
import baseTheme from './presets/base.js';
export { default as baseTheme } from './presets/base.js';
export { baseTheme as base };
export interface ThemeColors {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    chart1: string;
    chart2: string;
    chart3: string;
    chart4: string;
    chart5: string;
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
export declare const AVAILABLE_THEMES: readonly ["base"];
/**
 * @llm-rule All optimized theme presets for build tools
 * Used by build scripts to generate CSS
 * Now with dramatically reduced file sizes!
 */
export declare const ALL_THEME_PRESETS: {
    base: ThemePreset;
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
 * import { base, baseTheme } from '@bloomneo/uikit/themes';
 *
 * console.log(vivid.name); // "Vivid"
 * console.log(baseTheme.light.primary); // Theme color
 */ 
//# sourceMappingURL=index.d.ts.map