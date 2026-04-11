/**
 * Ultra-simple theme provider with pre-bundled themes - CONFIG PRIORITY VERSION
 * @module @bloomneo/uikit
 * @file src/themes/theme-provider.tsx
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
 * @llm-defaults Tone defaults by component type
 * Smart contextual defaults for LLM predictability
 */
const TONE_DEFAULTS: Record<string, Tone> = {
  AdminLayout: 'subtle',       // Professional admin interfaces
  PageLayout: 'clean',         // Clean public websites
  AuthLayout: 'clean',         // Focused authentication
  PopupLayout: 'clean',        // Clean extensions
  BlankLayout: 'clean',        // Simple pages
  Header: 'clean',             // Clean headers
  Footer: 'contrast',          // Bold footers
  AdminSidebar: 'subtle',      // Subtle sidebars
  AdminHeader: 'clean',        // Clean admin headers
  PopupHeader: 'brand',        // Branded popup headers
};

/**
 * @llm-rule Tone CSS class mapping
 * CSS variables automatically handle light/dark mode switching
 */
const TONE_CLASSES: Record<Tone, string> = {
  clean: 'bg-background text-foreground border-border',
  subtle: 'bg-muted/30 text-foreground border-border/50',
  brand: 'bg-primary text-primary-foreground border-primary/20',
  contrast: 'bg-foreground text-background border-foreground/20'  // Automatically flips with mode
};

/**
 * @llm-rule Available pre-bundled themes
 * All themes ship as CSS with the package
 */
export const AVAILABLE_THEMES: Theme[] = [
  'base',      // Sky blue theme - clean & professional (DEFAULT)
  'elegant',   // Minimal blue - clean & professional
  'metro',     // Dark teal - admin dashboards
  'studio',    // Designer grays - creative tools
  'vivid'      // Premium cursive - luxury/creative portfolios
];

// Theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * ✅ ENHANCED: Get initial theme state with configuration priority
 */
function getInitialThemeState(
  defaultTheme: Theme, 
  defaultMode: Mode, 
  detectSystem: boolean,
  forceConfig: boolean = false,
  storageKey: string | null = 'uikit-theme'
): { theme: Theme; mode: Mode } {
  // Server-side rendering - use props
  if (typeof window === 'undefined') {
    return { theme: defaultTheme, mode: defaultMode };
  }

  // 🔧 NEW: If forceConfig is true, ignore storage and use props
  if (forceConfig) {
    console.log(`🎨 Config priority: ${defaultTheme} (${defaultMode} mode)`);
    return { theme: defaultTheme, mode: defaultMode };
  }

  // 🔧 NEW: If storageKey is null, skip storage entirely
  if (storageKey === null) {
    if (detectSystem) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemMode = prefersDark ? 'dark' : 'light';
      console.log(`🎨 System preference (no storage): ${defaultTheme} (${systemMode} mode)`);
      return { theme: defaultTheme, mode: systemMode };
    }
    console.log(`🎨 Props only (no storage): ${defaultTheme} (${defaultMode} mode)`);
    return { theme: defaultTheme, mode: defaultMode };
  }

  try {
    // Try to load saved preferences from storage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Validate saved theme format (allow any theme name, just check mode)
      if (parsed.theme && typeof parsed.theme === 'string' &&
          ['light', 'dark'].includes(parsed.mode)) {
        console.log(`🎨 Restored from storage: ${parsed.theme} (${parsed.mode} mode)`);
        return parsed;
      }
    }
    
    // No saved preference - check system preference if enabled
    if (detectSystem) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemMode = prefersDark ? 'dark' : 'light';
      console.log(`🎨 System preference: ${defaultTheme} (${systemMode} mode)`);
      return { theme: defaultTheme, mode: systemMode };
    }
    
    // Use props as fallback
    console.log(`🎨 Props fallback: ${defaultTheme} (${defaultMode} mode)`);
    return { theme: defaultTheme, mode: defaultMode };
    
  } catch (e) {
    console.warn('Failed to load theme preferences, using defaults:', e);
    return { theme: defaultTheme, mode: defaultMode };
  }
}

/**
 * ✅ FIX: Apply theme immediately on document (before React renders)
 */
function applyThemeImmediately(theme: Theme, mode: Mode) {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  // Remove existing theme and mode classes
  root.classList.remove('light', 'dark');

  // Remove all theme-* classes (including custom themes)
  const classesToRemove = Array.from(root.classList).filter(className =>
    className.startsWith('theme-')
  );
  classesToRemove.forEach(className => {
    root.classList.remove(className);
  });
  
  // Add new classes immediately
  root.classList.add(mode);
  root.classList.add(`theme-${theme}`);
}

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
export function ThemeProvider({
  children,
  theme = 'base',
  mode = 'light',
  detectSystem = true,
  forceConfig = false,        // 🔧 NEW: Force config over storage
  storageKey = 'uikit-theme'  // 🔧 NEW: Configurable storage key
}: ThemeProviderProps): React.JSX.Element {
  
  // ✅ ENHANCED: Initialize with configuration priority logic
  const [themeState, setThemeState] = useState(() => {
    const initialState = getInitialThemeState(theme, mode, detectSystem, forceConfig, storageKey);
    
    // ✅ CRITICAL: Apply theme immediately before React renders
    applyThemeImmediately(initialState.theme, initialState.mode);
    
    return initialState;
  });

  // ✅ ENHANCED: Apply theme classes when state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const { theme: currentTheme, mode: currentMode } = themeState;
    
    // Apply theme classes
    applyThemeImmediately(currentTheme, currentMode);
    
    // 🔧 NEW: Save preferences only if storage is enabled and not forcing config
    if (storageKey && !forceConfig) {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ theme: currentTheme, mode: currentMode }));
      } catch (e) {
        console.warn('Failed to save theme preferences:', e);
      }
    }
    
    console.log(`🎨 Applied theme: ${currentTheme} (${currentMode} mode)`);
  }, [themeState, storageKey, forceConfig]);
  
  // ✅ ENHANCED: Listen for system preference changes (respects forceConfig)
  useEffect(() => {
    if (!detectSystem || typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // 🔧 NEW: Don't auto-switch if forcing config or manual preference was saved
      if (forceConfig) return;
      
      try {
        const saved = storageKey ? localStorage.getItem(storageKey) : null;
        if (!saved) {
          setThemeState(prev => ({
            ...prev,
            mode: e.matches ? 'dark' : 'light'
          }));
        }
      } catch (e) {
        console.warn('Failed to handle system preference change:', e);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [detectSystem, forceConfig, storageKey]);

  /**
   * @llm-rule Set theme from pre-bundled options or custom themes
   * Accepts built-in themes and custom themes (no validation needed for custom themes)
   */
  const setTheme = (newTheme: Theme) => {
    // Allow all themes - both built-in and custom
    setThemeState(prev => ({ ...prev, theme: newTheme }));
  };

  /**
   * @llm-rule Set system color mode
   * Only accepts 'light' or 'dark'
   */
  const setMode = (newMode: Mode) => {
    if (newMode !== 'light' && newMode !== 'dark') {
      console.warn(`Invalid mode: ${newMode}. Expected 'light' or 'dark'.`);
      return;
    }
    
    setThemeState(prev => ({ ...prev, mode: newMode }));
  };

  /**
   * @llm-rule Toggle between light and dark modes
   */
  const toggleMode = () => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };

  /**
   * @llm-rule Get CSS classes for tone styling
   * CSS variables automatically handle light/dark mode
   */
  const getToneClasses = (tone: Tone): string => {
    return TONE_CLASSES[tone];
  };

  /**
   * @llm-rule Get default tone for component type
   * Returns smart contextual defaults for LLM predictability
   */
  const getDefaultTone = (component: string): Tone => {
    return TONE_DEFAULTS[component] || 'clean';
  };
  
  // Create context value
  const contextValue: ThemeContextValue = {
    theme: themeState.theme,
    mode: themeState.mode,
    availableThemes: AVAILABLE_THEMES,
    setTheme,
    setMode,
    toggleMode,
    getToneClasses,
    getDefaultTone
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

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
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

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