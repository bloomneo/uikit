/**
 * Base theme preset - Clean default configuration
 * @description Basic black & white theme showcasing the default base configuration
 * @package @bloomneo/uikit
 * @file /src/themes/presets/base.js
 */

// Base theme - self-contained

/**
 * Base theme preset - Shows the default configuration with minimal overrides
 * Perfect for demonstrating the base system and as a starting point for new themes
 */
const baseTheme = {
  id: 'base',
  name: 'Base',
  description: 'Clean sky blue theme with modern styling and professional appearance',

  // Base theme with system fonts only
  customStyles: `
    /* Base theme - Only 4 unified classes */
    .theme-base {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
      line-height: 1.6;
      font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
    }
    
    .theme-base .voila-heading {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      font-size: clamp(2.5rem, 6vw, 4rem);
      color: var(--color-foreground);
    }
    
    .theme-base .voila-subheading {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.3;
      font-size: clamp(1.25rem, 3vw, 2rem);
      color: var(--color-muted-foreground);
    }
    
    .theme-base .voila-brand-logo {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 700;
      letter-spacing: -0.03em;
      font-size: 1.25rem;
    }
    
    /* Body text enhancements */
    .theme-base strong, .theme-base b {
      font-weight: 600;
    }
    
    /* Cursor styles for interactive elements */
    .theme-base button,
    .theme-base .btn,
    .theme-base [data-slot="button"],
    .theme-base input[type="button"],
    .theme-base input[type="submit"],
    .theme-base input[type="reset"],
    .theme-base a,
    .theme-base [role="button"],
    .theme-base [tabindex="0"]:not(input):not(textarea):not(select) {
      cursor: pointer;
    }
    
    /* Disabled buttons get not-allowed cursor */
    .theme-base button:disabled,
    .theme-base .btn:disabled,
    .theme-base [data-slot="button"]:disabled,
    .theme-base input:disabled {
      cursor: not-allowed;
    }

    /* Clean focus ring */
    .theme-base *:focus-visible {
      outline: 2px solid var(--color-foreground);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgb(from var(--color-foreground) r g b / 0.1);
    }
  `,

  // Sky blue themed colors
  light: {
    // Base clean colors with sky blue tint
    background: '#FFFFFF',
    foreground: '#1E293B',
    card: '#F8FAFC',
    cardForeground: '#1E293B',
    popover: '#FFFFFF',
    popoverForeground: '#1E293B',

    // Sky blue interactive colors
    primary: '#0EA5E9',
    primaryForeground: '#FFFFFF',
    secondary: '#F5E6D3',
    secondaryForeground: '#92400E',
    muted: '#F0F9FF',
    mutedForeground: '#64748B',
    accent: '#E0F2FE',
    accentForeground: '#0C4A6E',

    // State colors
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    // Border colors with sky blue tint
    border: '#E2E8F0',
    input: '#CBD5E1',
    ring: '#0EA5E9',

    // Chart colors - sky blue progression
    chart1: '#0EA5E9',
    chart2: '#38BDF8',
    chart3: '#7DD3FC',
    chart4: '#BAE6FD',
    chart5: '#E0F2FE',

    // Sidebar colors
    sidebar: '#F8FAFC',
    sidebarForeground: '#1E293B',
    sidebarPrimary: '#0EA5E9',
    sidebarPrimaryForeground: '#FFFFFF',
    sidebarAccent: '#F5E6D3',
    sidebarAccentForeground: '#92400E',
    sidebarBorder: '#E2E8F0',
    sidebarRing: '#0EA5E9',
  },

  dark: {
    // Dark colors with sky blue accents
    background: '#0F172A',
    foreground: '#F1F5F9',
    card: '#1E293B',
    cardForeground: '#F1F5F9',
    popover: '#1E293B',
    popoverForeground: '#F1F5F9',

    // Sky blue interactive colors for dark mode
    primary: '#38BDF8',
    primaryForeground: '#0F172A',
    secondary: '#44403C',
    secondaryForeground: '#FEF7ED',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    accent: '#334155',
    accentForeground: '#F1F5F9',

    // State colors
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',

    // Border colors with sky blue tint
    border: '#334155',
    input: '#475569',
    ring: '#38BDF8',

    // Chart colors - sky blue progression for dark mode
    chart1: '#38BDF8',
    chart2: '#0EA5E9',
    chart3: '#0284C7',
    chart4: '#0369A1',
    chart5: '#075985',

    // Sidebar colors
    sidebar: '#1E293B',
    sidebarForeground: '#F1F5F9',
    sidebarPrimary: '#38BDF8',
    sidebarPrimaryForeground: '#0F172A',
    sidebarAccent: '#44403C',
    sidebarAccentForeground: '#FEF7ED',
    sidebarBorder: '#475569',
    sidebarRing: '#38BDF8',
  },
};

export default baseTheme;