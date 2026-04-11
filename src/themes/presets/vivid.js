/**
 * Vivid theme preset - Premium cursive design (OPTIMIZED)
 * @description Sophisticated theme featuring cursive hero fonts perfect for luxury brands and creative portfolios
 * @package @bloomneo/uikit
 * @file /src/themes/presets/vivid-optimized.js
 */

// Vivid theme - self-contained

/**
 * Vivid theme preset - Only overrides what's different from default
 * Uses the new modular system for dramatically reduced file size
 */
const vividTheme = {
  id: 'vivid',
  name: 'Vivid',
  description: 'Premium cursive theme with sophisticated typography for luxury brands and creative portfolios',

  // Only override design tokens that differ from default
  design: {
    // Vivid-specific fonts
    fontPrimary: "'Libre Baskerville', 'Merriweather', 'Times New Roman', serif",
    fontDisplay: "'Playfair Display', 'Crimson Text', 'Times New Roman', serif",
    fontScript: "'Caveat', 'Amatic SC', cursive",
    
    // More elegant spacing and radius for luxury feel
    radiusEnhance: '1.2rem',
    spacingEnhance: '1.2',
    
    // Enhanced shadows for premium feel
    shadowEnhance: '0 4px 20px rgb(0 0 0 / 0.08), 0 1px 3px rgb(0 0 0 / 0.05)',
    shadowLg: '0 8px 30px rgb(0 0 0 / 0.12), 0 2px 6px rgb(0 0 0 / 0.08)',
    shadowXl: '0 12px 40px rgb(0 0 0 / 0.15), 0 4px 12px rgb(0 0 0 / 0.1)',
    
  },

  // Only vivid-specific styles
  customStyles: `
    /* Vivid theme - Only 4 unified classes */
    .theme-vivid {
      font-family: 'Libre Baskerville', serif;
      font-weight: 400;
      line-height: 1.7;
      font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'onum' 1;
    }
    
    .theme-vivid .voila-heading {
      font-family: 'Caveat', cursive;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.1;
      font-size: clamp(2.5rem, 6vw, 4rem);
    }
    
    .theme-vivid .voila-subheading {
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      font-style: italic;
      letter-spacing: -0.01em;
      line-height: 1.3;
      font-size: clamp(1.25rem, 3vw, 2rem);
    }
    
    .theme-vivid .voila-brand-logo {
      font-family: 'Caveat', cursive;
      font-weight: 700;
      letter-spacing: -0.01em;
      font-size: 1.5rem;
    }
    
    /* Clean gradient for bg-primary in Vivid theme only */
    .theme-vivid .bg-primary {
      background: linear-gradient(135deg, oklch(0.25 0.12 280) 0%, rgb(111, 103, 244) 100%) !important;
    }
    
    .theme-vivid.dark .bg-primary {
      background: linear-gradient(135deg, oklch(0.45 0.18 280) 0%, rgb(151, 143, 255) 100%) !important;
    }
    
    /* Premium typography */
    .theme-vivid p, .theme-vivid div, .theme-vivid span {
      font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'onum' 1;
      line-height: 1.7;
    }
    
    /* Elegant button effects */
    .theme-vivid .btn-primary,
    .theme-vivid button[data-variant="primary"],
    .theme-vivid [data-slot="button"][data-variant="primary"] {
      background: linear-gradient(135deg, oklch(0.25 0.12 280) 0%, rgb(111, 103, 244) 100%);
      letter-spacing: 0.025em;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 1.2rem;
    }
    
    .theme-vivid button,
    .theme-vivid [data-slot="button"] {
      border-radius: 1.2rem;
    }
    
    .theme-vivid .btn-primary:hover,
    .theme-vivid button[data-variant="primary"]:hover,
    .theme-vivid [data-slot="button"][data-variant="primary"]:hover {
      background: linear-gradient(135deg, oklch(0.22 0.14 315) 0%, oklch(0.25 0.12 280) 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgb(0 0 0 / 0.15), 0 3px 10px rgb(0 0 0 / 0.1);
    }
    
    /* Premium cards */
    .theme-vivid [data-slot="card"] {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid oklch(from var(--color-border) l c h / 0.3);
    }
    
    .theme-vivid [data-slot="card"]:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgb(0 0 0 / 0.12), 0 4px 12px rgb(0 0 0 / 0.08);
    }
    
    /* Darker shadows for dark mode cards */
    .theme-vivid.dark [data-slot="card"] {
      box-shadow: 0 4px 20px rgb(0 0 0 / 0.25), 0 1px 3px rgb(0 0 0 / 0.15);
      border: 1px solid oklch(from var(--color-border) l c h / 0.4);
    }
    
    .theme-vivid.dark [data-slot="card"]:hover {
      box-shadow: 0 12px 40px rgb(0 0 0 / 0.35), 0 4px 12px rgb(0 0 0 / 0.20);
    }
    
    /* Cursor styles for interactive elements */
    .theme-vivid button,
    .theme-vivid .btn,
    .theme-vivid [data-slot="button"],
    .theme-vivid input[type="button"],
    .theme-vivid input[type="submit"],
    .theme-vivid input[type="reset"],
    .theme-vivid a,
    .theme-vivid [role="button"],
    .theme-vivid [tabindex="0"]:not(input):not(textarea):not(select) {
      cursor: pointer;
    }
    
    /* Disabled buttons get not-allowed cursor */
    .theme-vivid button:disabled,
    .theme-vivid .btn:disabled,
    .theme-vivid [data-slot="button"]:disabled,
    .theme-vivid input:disabled {
      cursor: not-allowed;
    }
    
    /* Refined focus styles */
    .theme-vivid *:focus-visible {
      outline-offset: 3px;
      box-shadow: 0 0 0 6px oklch(0.45 0.08 290 / 0.15);
    }
  `,

  light: {
    // Only override colors that are different from default
    background: 'oklch(1.00 0.000 0)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.45 0.08 290 / 0.02) 0%, oklch(1.00 0.000 0) 70%, oklch(0.98 0.005 60 / 0.01) 100%)',
    foreground: 'oklch(0.18 0.02 290)',
    card: 'oklch(0.99 0.002 290)',
    cardForeground: 'oklch(0.18 0.02 290)',
    popover: 'oklch(0.99 0.002 290)',
    popoverForeground: 'oklch(0.18 0.02 290)',

    // Vivid color palette - blue-dominant elegant with custom rgb gradient
    primary: 'oklch(0.50 0.18 280)',
    primaryForeground: 'oklch(0.98 0.005 60)',
    secondary: 'oklch(0.58 0.20 15)',
    secondaryForeground: 'oklch(0.98 0.005 60)',
    muted: 'oklch(0.97 0.02 70)',
    mutedForeground: 'oklch(0.42 0.05 290)',
    accent: 'oklch(0.75 0.12 40)',
    accentForeground: 'oklch(0.08 0.02 290)',

    // Border colors
    border: 'oklch(0.90 0.02 290)',
    input: 'oklch(0.90 0.02 290)',
    ring: 'oklch(0.45 0.08 290)',

    // Chart colors - vibrant elegant spectrum  
    chart1: 'oklch(0.25 0.12 280)',
    chart2: 'oklch(0.58 0.20 15)',
    chart3: 'oklch(0.75 0.12 40)',
    chart4: 'oklch(0.22 0.14 315)',
    chart5: 'oklch(0.45 0.08 290)',

    // Sidebar colors
    sidebar: 'oklch(0.98 0.005 60)',
    sidebarForeground: 'oklch(0.18 0.02 290)',
    sidebarPrimary: 'oklch(0.45 0.08 290)',
    sidebarPrimaryForeground: 'oklch(0.98 0.005 60)',
    sidebarAccent: 'oklch(0.95 0.015 290)',
    sidebarAccentForeground: 'oklch(0.42 0.05 290)',
    sidebarBorder: 'oklch(0.90 0.02 290)',
    sidebarRing: 'oklch(0.45 0.08 290)',
  },

  dark: {
    // Dark mode vivid colors
    background: 'oklch(0.08 0.02 290)',
    backgroundGradient: 'linear-gradient(135deg, oklch(0.08 0.02 290) 0%, oklch(0.06 0.015 320) 100%)',
    foreground: 'oklch(0.92 0.01 60)',
    card: 'oklch(0.20 0.04 290)',
    cardForeground: 'oklch(0.92 0.01 60)',
    popover: 'oklch(0.16 0.03 290)',
    popoverForeground: 'oklch(0.92 0.01 60)',

    // Brightened colors for dark mode with custom rgb gradient
    primary: 'oklch(0.68 0.25 280)',
    primaryForeground: 'oklch(0.08 0.02 290)',
    secondary: 'oklch(0.70 0.25 15)',
    secondaryForeground: 'oklch(0.08 0.02 290)',
    muted: 'oklch(0.10 0.02 290)',
    mutedForeground: 'oklch(0.70 0.05 290)',
    accent: 'oklch(0.80 0.15 40)',
    accentForeground: 'oklch(0.08 0.02 290)',

    // Border colors
    border: 'oklch(0.28 0.05 290)',
    input: 'oklch(0.25 0.04 290)',
    ring: 'oklch(0.62 0.12 290)',

    // Chart colors - brightened for dark mode
    chart1: 'oklch(0.45 0.18 280)',
    chart2: 'oklch(0.70 0.25 15)',
    chart3: 'oklch(0.80 0.15 40)',
    chart4: 'oklch(0.42 0.20 315)',
    chart5: 'oklch(0.65 0.12 290)',

    // Sidebar colors
    sidebar: 'oklch(0.10 0.02 290)',
    sidebarForeground: 'oklch(0.92 0.01 60)',
    sidebarPrimary: 'oklch(0.62 0.12 290)',
    sidebarPrimaryForeground: 'oklch(0.08 0.02 290)',
    sidebarAccent: 'oklch(0.18 0.03 290)',
    sidebarAccentForeground: 'oklch(0.70 0.05 290)',
    sidebarBorder: 'oklch(0.28 0.05 290)',
    sidebarRing: 'oklch(0.62 0.12 290)',
  },
};

export default vividTheme;