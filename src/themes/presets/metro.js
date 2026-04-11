/**
 * Metro theme preset - Clean, systematic design (OPTIMIZED)
 * @description Modern, systematic theme for dashboards, admin panels, and professional applications
 * @package @bloomneo/uikit
 * @file /src/themes/presets/metro-optimized.js
 */

// Metro theme - self-contained

/**
 * Metro theme preset - Only overrides what's different from default
 * Uses the new modular system for dramatically reduced file size
 */
const metroTheme = {
  id: 'metro',
  name: 'Metro',
  description: 'Clean, systematic design inspired by modern transit systems for professional applications',

  // Only override design tokens that differ from default
  design: {
    // Metro-specific fonts
    fontDisplay: "'Crimson Text', serif",
    
    // Metro-specific gradients
    gradientPrimary: '#0f3a36', // Flat primary color
    gradientSubtle: 'linear-gradient(135deg, oklch(0.96 0.005 240) 0%, oklch(0.88 0.008 240) 100%)',
    gradientHover: 'linear-gradient(135deg, oklch(0.55 0.12 220) 0%, #0f3a36 100%)',
    gradientText: 'linear-gradient(135deg, #0f3a36 0%, oklch(0.55 0.12 200) 50%, oklch(0.96 0.005 240) 100%)',
    gradientBackground: 'linear-gradient(135deg, oklch(0.09 0.01 240) 0%, oklch(0.15 0.015 220) 100%)',
    gradientBackgroundLight: 'linear-gradient(135deg, oklch(0.96 0.005 240) 0%, oklch(0.99 0.002 240) 70%, oklch(0.88 0.008 240) 100%)',
  },

  // Only metro-specific styles
  customStyles: `
    /* Metro theme - Only 4 unified classes */
    .theme-metro {
      font-family: 'Libre Baskerville', serif;
      font-weight: 400;
      line-height: 1.6;
    }
    
    .theme-metro .voila-heading {
      font-family: 'Crimson Text', serif;
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1.1;
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
    
    .theme-metro .voila-subheading {
      font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.3;
      font-size: clamp(1.25rem, 3vw, 2rem);
    }
    
    .theme-metro .voila-brand-logo {
      font-family: 'Crimson Text', serif;
      font-weight: 700;
      letter-spacing: -0.03em;
      font-size: 1.25rem;
    }
    
    /* Body text enhancements */
    .theme-metro strong, .theme-metro b {
      font-weight: 600;
    }
    
    /* Cursor styles for interactive elements */
    .theme-metro button,
    .theme-metro .btn,
    .theme-metro [data-slot="button"],
    .theme-metro input[type="button"],
    .theme-metro input[type="submit"],
    .theme-metro input[type="reset"],
    .theme-metro a,
    .theme-metro [role="button"],
    .theme-metro [tabindex="0"]:not(input):not(textarea):not(select) {
      cursor: pointer;
    }
    
    /* Disabled buttons get not-allowed cursor */
    .theme-metro button:disabled,
    .theme-metro .btn:disabled,
    .theme-metro [data-slot="button"]:disabled,
    .theme-metro input:disabled {
      cursor: not-allowed;
    }
    
    /* Metro focus style override */
    .theme-metro *:focus-visible {
      outline: 2px solid #0f3a36;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgb(15, 58, 54, 0.2);
    }
  `,

  light: {
    // Only override colors that are different from default
    background: 'oklch(0.99 0.002 240)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.96 0.005 240) 0%, oklch(0.99 0.002 240) 70%, oklch(0.88 0.008 240) 100%)',
    foreground: 'oklch(0.09 0.01 240)',
    card: 'oklch(0.98 0.003 240)',
    cardForeground: 'oklch(0.09 0.01 240)',
    popover: 'oklch(0.98 0.003 240)',
    popoverForeground: 'oklch(0.09 0.01 240)',

    // Metro color palette - 50% lighter for visibility
    primary: '#1B4942',
    primaryForeground: 'oklch(0.98 0.003 240)',
    secondary: '#FAA533',
    secondaryForeground: '#000000',
    muted: 'oklch(0.96 0.005 240)',
    mutedForeground: 'oklch(0.35 0.01 240)',
    accent: 'oklch(0.55 0.12 200)',
    accentForeground: 'oklch(0.98 0.003 240)',

    // Border colors
    border: 'oklch(0.88 0.008 240)',
    input: 'oklch(0.88 0.008 240)',
    ring: '#0f3a36',

    // Chart colors - transit-inspired
    chart1: '#0f3a36',
    chart2: 'oklch(0.55 0.12 200)',
    chart3: 'oklch(0.5 0.1 160)',
    chart4: 'oklch(0.6 0.15 60)',
    chart5: 'oklch(0.45 0.25 25)',

    // Sidebar colors
    sidebar: 'oklch(0.98 0.003 240)',
    sidebarForeground: 'oklch(0.09 0.01 240)',
    sidebarPrimary: '#0f3a36',
    sidebarPrimaryForeground: 'oklch(0.98 0.003 240)',
    sidebarAccent: 'oklch(0.55 0.12 200)',
    sidebarAccentForeground: 'oklch(0.35 0.01 240)',
    sidebarBorder: 'oklch(0.88 0.008 240)',
    sidebarRing: '#0f3a36',
  },

  dark: {
    // Dark mode metro colors
    background: 'oklch(0.05 0.005 220)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.05 0.005 220) 0%, oklch(0.15 0.015 220) 100%)',
    foreground: 'oklch(0.95 0.01 220)',
    card: 'oklch(0.20 0.015 220)',
    cardForeground: 'oklch(0.95 0.01 220)',
    popover: 'oklch(0.20 0.015 220)',
    popoverForeground: 'oklch(0.95 0.01 220)',

    primary: '#2F625C',
    primaryForeground: 'oklch(0.05 0.005 220)',
    secondary: '#FAA533',
    secondaryForeground: '#000000',
    muted: 'oklch(0.08 0.01 240)',
    mutedForeground: 'oklch(0.75 0.01 240)',
    accent: 'oklch(0.75 0.18 200)',
    accentForeground: 'oklch(0.04 0.01 240)',

    // Border colors
    border: 'oklch(0.18 0.015 240)',
    input: 'oklch(0.18 0.015 240)',
    ring: '#0f3a36',

    // Chart colors - brightened for dark mode
    chart1: '#0f3a36',
    chart2: 'oklch(0.75 0.18 200)',
    chart3: 'oklch(0.7 0.15 160)',
    chart4: 'oklch(0.75 0.2 60)',
    chart5: 'oklch(0.65 0.25 25)',

    // Sidebar colors
    sidebar: 'oklch(0.20 0.015 220)',
    sidebarForeground: 'oklch(0.95 0.01 220)',
    sidebarPrimary: '#0f3a36',
    sidebarPrimaryForeground: 'oklch(0.98 0.005 220)',
    sidebarAccent: 'oklch(0.75 0.18 200)',
    sidebarAccentForeground: 'oklch(0.75 0.01 240)',
    sidebarBorder: 'oklch(0.18 0.015 240)',
    sidebarRing: '#0f3a36',
  },
};

export default metroTheme;