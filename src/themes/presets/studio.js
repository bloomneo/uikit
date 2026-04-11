/**
 * Studio theme preset - Sophisticated designer grays (OPTIMIZED)
 * @description Professional creative theme for design tools and portfolios
 * @package @bloomneo/uikit
 * @file /src/themes/presets/studio-optimized.js
 */

// Studio theme - self-contained

/**
 * Studio theme preset - Only overrides what's different from default
 * Uses the new modular system for dramatically reduced file size
 */
const studioTheme = {
  id: 'studio',
  name: 'Studio',
  description: 'Sophisticated designer grays with strategic color accents for creative professionals',

  // Only override design tokens that differ from default
  design: {
    // Studio-specific fonts
    fontPrimary: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontDisplay: "'Merriweather', serif",
    
    // Studio-specific gradients
    gradientPrimary: 'rgb(37, 41, 49)', // Flat primary color
    gradientSubtle: 'linear-gradient(135deg, oklch(0.97 0.002 270) 0%, oklch(0.90 0.003 270) 100%)',
    gradientHover: 'linear-gradient(135deg, oklch(0.60 0.08 260) 0%, rgb(37, 41, 49) 100%)',
    gradientText: 'linear-gradient(135deg, rgb(37, 41, 49) 0%, oklch(0.65 0.15 45) 50%, oklch(0.97 0.002 270) 100%)',
    gradientBackground: 'linear-gradient(135deg, oklch(0.08 0.005 270) 0%, oklch(0.15 0.01 270) 100%)',
    gradientBackgroundLight: 'linear-gradient(135deg, oklch(0.97 0.002 270) 0%, oklch(0.99 0.001 270) 70%, oklch(0.90 0.003 270) 100%)',
  },

  // Only studio-specific styles
  customStyles: `
    /* Studio theme - Only 4 unified classes */
    .theme-studio {
      font-family: 'Source Serif Pro', serif;
      font-weight: 400;
      line-height: 1.6;
    }
    
    .theme-studio .voila-heading {
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
    
    .theme-studio .voila-subheading {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      letter-spacing: -0.02em;
      line-height: 1.3;
      font-size: clamp(1.25rem, 3vw, 2rem);
    }
    
    .theme-studio .voila-brand-logo {
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 600;
      letter-spacing: -0.01em;
      font-size: 1.25rem;
    }
    
    /* Studio-specific button hover */
    .theme-studio .btn-primary:hover,
    .theme-studio button[data-variant="primary"]:hover,
    .theme-studio [data-slot="button"][data-variant="primary"]:hover {
      background: var(--voila-gradient-hover);
    }
    
    
    /* Body text enhancements */
    .theme-studio strong, .theme-studio b {
      font-weight: 600;
    }
    
    /* Cursor styles for interactive elements */
    .theme-studio button,
    .theme-studio .btn,
    .theme-studio [data-slot="button"],
    .theme-studio input[type="button"],
    .theme-studio input[type="submit"],
    .theme-studio input[type="reset"],
    .theme-studio a,
    .theme-studio [role="button"],
    .theme-studio [tabindex="0"]:not(input):not(textarea):not(select) {
      cursor: pointer;
    }
    
    /* Disabled buttons get not-allowed cursor */
    .theme-studio button:disabled,
    .theme-studio .btn:disabled,
    .theme-studio [data-slot="button"]:disabled,
    .theme-studio input:disabled {
      cursor: not-allowed;
    }
    
    /* Studio focus style override */
    .theme-studio *:focus-visible {
      outline: 2px solid rgb(37, 41, 49);
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgb(37, 41, 49, 0.2);
    }
  `,

  light: {
    // Only override colors that are different from default
    background: 'oklch(0.99 0.001 270)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.97 0.002 270) 0%, oklch(0.99 0.001 270) 70%, oklch(0.90 0.003 270) 100%)',
    foreground: 'oklch(0.08 0.005 270)',
    card: 'oklch(0.98 0.002 270)',
    cardForeground: 'oklch(0.08 0.005 270)',
    popover: 'oklch(0.98 0.002 270)',
    popoverForeground: 'oklch(0.08 0.005 270)',

    // Studio color palette - 50% lighter for visibility
    primary: 'rgb(56, 61, 73)',
    primaryForeground: 'oklch(0.98 0.002 270)',
    secondary: 'oklch(0.85 0.003 270)',
    secondaryForeground: 'oklch(0.15 0.008 270)',
    muted: 'oklch(0.97 0.002 270)',
    mutedForeground: 'oklch(0.38 0.005 270)',
    accent: 'oklch(0.65 0.15 45)',
    accentForeground: 'oklch(0.98 0.002 270)',

    // Border colors
    border: 'oklch(0.9 0.003 270)',
    input: 'oklch(0.9 0.003 270)',
    ring: 'rgb(37, 41, 49)',

    // Chart colors - creative palette
    chart1: 'rgb(37, 41, 49)',
    chart2: 'oklch(0.65 0.15 45)',
    chart3: 'oklch(0.45 0.12 200)',
    chart4: 'oklch(0.5 0.1 320)',
    chart5: 'oklch(0.4 0.08 120)',

    // Sidebar colors
    sidebar: 'oklch(0.98 0.002 270)',
    sidebarForeground: 'oklch(0.08 0.005 270)',
    sidebarPrimary: 'rgb(37, 41, 49)',
    sidebarPrimaryForeground: 'oklch(0.98 0.002 270)',
    sidebarAccent: 'oklch(0.65 0.15 45)',
    sidebarAccentForeground: 'oklch(0.38 0.005 270)',
    sidebarBorder: 'oklch(0.9 0.003 270)',
    sidebarRing: 'rgb(37, 41, 49)',
  },

  dark: {
    // Dark mode studio colors
    background: 'oklch(0.05 0.003 270)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.05 0.003 270) 0%, oklch(0.15 0.01 270) 100%)',
    foreground: 'oklch(0.95 0.005 270)',
    card: 'oklch(0.20 0.01 270)',
    cardForeground: 'oklch(0.95 0.005 270)',
    popover: 'oklch(0.20 0.01 270)',
    popoverForeground: 'oklch(0.95 0.005 270)',

    primary: 'rgb(78, 84, 96)',
    primaryForeground: 'oklch(0.08 0.005 270)',
    secondary: 'oklch(0.10 0.008 270)',
    secondaryForeground: 'oklch(0.94 0.005 270)',
    muted: 'oklch(0.08 0.006 270)',
    mutedForeground: 'oklch(0.74 0.005 270)',
    accent: 'oklch(0.85 0.18 45)',
    accentForeground: 'oklch(0.04 0.005 270)',

    // Border colors
    border: 'oklch(0.18 0.008 270)',
    input: 'oklch(0.18 0.008 270)',
    ring: 'rgb(37, 41, 49)',

    // Chart colors - brightened for dark mode
    chart1: 'rgb(37, 41, 49)',
    chart2: 'oklch(0.85 0.18 45)',
    chart3: 'oklch(0.7 0.15 200)',
    chart4: 'oklch(0.72 0.12 320)',
    chart5: 'oklch(0.68 0.1 120)',

    // Sidebar colors
    sidebar: 'oklch(0.20 0.01 270)',
    sidebarForeground: 'oklch(0.95 0.005 270)',
    sidebarPrimary: 'rgb(37, 41, 49)',
    sidebarPrimaryForeground: 'oklch(0.98 0.003 270)',
    sidebarAccent: 'oklch(0.85 0.18 45)',
    sidebarAccentForeground: 'oklch(0.74 0.005 270)',
    sidebarBorder: 'oklch(0.18 0.008 270)',
    sidebarRing: 'rgb(37, 41, 49)',
  },
};

export default studioTheme;