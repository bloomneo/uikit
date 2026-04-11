/**
 * Ultra-simple theme provider with pre-bundled themes - CONFIG PRIORITY VERSION
 * @module @bloomneo/uikit
 * @file src/themes/theme-provider.tsx
 */
import React, { ReactNode } from 'react';
/**
 * @llm-rule Pre-bundled themes - CSS included in package
 * Simple selection from 8 built-in themes
 */
export type Theme = string;
/**
 * @llm-rule System color scheme preference
 * light: Light system theme
 * dark: Dark system theme
 */
export type Mode = 'light' | 'dark';
/**
 * @llm-rule Component visual emphasis system
 * clean → Pure, minimal, white/light backgrounds
 * subtle → Muted, supporting, gray areas
 * brand → Primary colored, branded elements
 * contrast → High emphasis, dark/bold areas
 */
export type Tone = 'clean' | 'subtle' | 'brand' | 'contrast';
/**
 * @llm-props ThemeProvider context - Zero complexity
 * REQUIRED: children
 * RECOMMENDED: theme, mode
 * OPTIONAL: detectSystem
 */
export interface ThemeContextValue {
    /** Current theme from pre-bundled options */
    theme: Theme;
    /** System color mode */
    mode: Mode;
    /** Available themes */
    availableThemes: Theme[];
    /** Set theme from pre-bundled options */
    setTheme: (theme: Theme) => void;
    /** Set system color mode */
    setMode: (mode: Mode) => void;
    /** Toggle between light and dark modes */
    toggleMode: () => void;
    /** Get CSS classes for tone */
    getToneClasses: (tone: Tone) => string;
    /** Get default tone for component */
    getDefaultTone: (component: string) => Tone;
}
/**
 * @llm-props ThemeProvider props - ENHANCED WITH CONFIG PRIORITY
 * REQUIRED: children
 * RECOMMENDED: theme="base", mode="light"
 * OPTIONAL: detectSystem, forceConfig, storageKey
 * @llm-defaults theme="base", mode="light", detectSystem=true, forceConfig=false
 */
export interface ThemeProviderProps {
    /** REQUIRED: Child components */
    children: ReactNode;
    /** RECOMMENDED: Theme from pre-bundled options (default: "base") */
    theme?: Theme;
    /** RECOMMENDED: System color mode (default: "light") */
    mode?: Mode;
    /** OPTIONAL: Auto-detect system preference (default: true) */
    detectSystem?: boolean;
    /** NEW: Force configuration over storage (default: false) */
    forceConfig?: boolean;
    /** NEW: Storage key to use (default: "uikit-theme", set to null to disable storage) */
    storageKey?: string | null;
}
/**
 * @llm-rule Available pre-bundled themes
 * All themes ship as CSS with the package
 */
export declare const AVAILABLE_THEMES: Theme[];
/**
 * 🔧 ENHANCED: Ultra-simple theme provider with configuration priority
 * @llm-pattern Basic usage (default behavior - storage first)
 * <ThemeProvider theme="elegant" mode="dark">
 *   <App />
 * </ThemeProvider>
 *
 * @llm-pattern Force configuration (ignore storage completely)
 * <ThemeProvider theme="elegant" mode="dark" forceConfig={true}>
 *   <App />
 * </ThemeProvider>
 *
 * @llm-pattern Disable storage entirely
 * <ThemeProvider theme="elegant" mode="dark" storageKey={null}>
 *   <App />
 * </ThemeProvider>
 *
 * @llm-pattern Custom storage key
 * <ThemeProvider theme="elegant" mode="dark" storageKey="my-app-theme">
 *   <App />
 * </ThemeProvider>
 */
export declare function ThemeProvider({ children, theme, mode, detectSystem, forceConfig, // 🔧 NEW: Force config over storage
storageKey }: ThemeProviderProps): React.JSX.Element;
/**
 * Hook to access theme context
 * @llm-pattern Basic theme usage
 * const { theme, mode, setTheme, setMode, toggleMode } = useTheme();
 *
 * @llm-pattern Component styling
 * const { getToneClasses, getDefaultTone } = useTheme();
 * const tone = getDefaultTone('AdminLayout');
 * const classes = getToneClasses(tone); // Works automatically in both modes
 */
export declare function useTheme(): ThemeContextValue;
/**
 * @llm-pattern Theme switcher component example
 * const ThemeSwitcher = () => {
 *   const { theme, availableThemes, setTheme } = useTheme();
 *   return (
 *     <select value={theme} onChange={e => setTheme(e.target.value as Theme)}>
 *       {availableThemes.map(t => <option key={t} value={t}>{t}</option>)}
 *     </select>
 *   );
 * };
 */ 
//# sourceMappingURL=theme-provider.d.ts.map