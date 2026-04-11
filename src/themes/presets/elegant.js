/**
 * Elegant theme preset - Clean professional blue design
 * @description Fresh, minimal sky blue theme perfect for business and professional applications
 * @package @bloomneo/uikit
 * @file /src/themes/presets/elegant.js
 */

/**
 * Elegant theme preset - Clean professional blue design
 * Perfect for business applications with fresh, minimal aesthetic
 */
const elegantTheme = {
  id: 'elegant',
  name: 'Elegant',
  description: 'Fresh, minimal sky blue theme perfect for business and professional applications',

  // Elegant theme with Playfair Display headings and Montserrat body
  customStyles: `
    /* Elegant theme - Only 4 unified classes */
    .theme-elegant {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-weight: 400;
      line-height: 1.6;
      font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
    }
    
    .theme-elegant .voila-heading {
      font-family: 'DM Serif Display', serif;
      font-weight: 400;
      letter-spacing: -0.02em;
      line-height: 1.1;
      font-size: clamp(2.5rem, 6vw, 4rem);
      color: var(--color-foreground);
    }
    
    .theme-elegant .voila-subheading {
      font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.3;
      font-size: clamp(1.25rem, 3vw, 2rem);
      color: var(--color-muted-foreground);
    }
    
    .theme-elegant .voila-brand-logo {
      font-family: 'DM Serif Display', serif;
      font-weight: 400;
      letter-spacing: -0.01em;
      font-size: 1.25rem;
    }
    
    /* Body text enhancements */
    .theme-elegant strong, .theme-elegant b {
      font-weight: 600;
    }
    
    /* Cursor styles for interactive elements */
    .theme-elegant button,
    .theme-elegant .btn,
    .theme-elegant [data-slot="button"],
    .theme-elegant input[type="button"],
    .theme-elegant input[type="submit"],
    .theme-elegant input[type="reset"],
    .theme-elegant a,
    .theme-elegant [role="button"],
    .theme-elegant [tabindex="0"]:not(input):not(textarea):not(select) {
      cursor: pointer;
    }
    
    /* Disabled buttons get not-allowed cursor */
    .theme-elegant button:disabled,
    .theme-elegant .btn:disabled,
    .theme-elegant [data-slot="button"]:disabled,
    .theme-elegant input:disabled {
      cursor: not-allowed;
    }
    
    /* Elegant focus ring with blue accent */
    .theme-elegant *:focus-visible {
      outline: 2px solid #003285;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgb(0, 50, 133, 0.1);
    }
  `,

  light: {
    // Clean blue color palette
    background: '#FFFFFF',
    foreground: '#1F2937',
    card: '#F8FAFC',
    cardForeground: '#1F2937',
    popover: '#FFFFFF',
    popoverForeground: '#1F2937',

    // Blue accent system with yellow secondary - 50% lighter for visibility
    primary: '#2C5688',
    primaryForeground: '#FFFFFF',
    secondary: '#FAA533',
    secondaryForeground: '#FFFFFF',
    muted: '#F8FAFC',
    mutedForeground: '#6B7280',
    accent: '#E0F2FE',
    accentForeground: '#1F2937',

    // State colors
    destructive: '#DC2626',
    destructiveForeground: '#FFFFFF',

    // Border colors
    border: '#E2E8F0',
    input: '#CBD5E1',
    ring: '#003285',

    // Chart colors - blue progression
    chart1: '#003285',
    chart2: '#1E40AF',
    chart3: '#3B82F6',
    chart4: '#60A5FA',
    chart5: '#93C5FD',

    // Sidebar colors
    sidebar: '#F8FAFC',
    sidebarForeground: '#1F2937',
    sidebarPrimary: '#003285',
    sidebarPrimaryForeground: '#FFFFFF',
    sidebarAccent: '#E0F2FE',
    sidebarAccentForeground: '#6B7280',
    sidebarBorder: '#E2E8F0',
    sidebarRing: '#003285',
  },

  dark: {
    // Dark blue palette
    background: '#0F172A',
    foreground: '#F8FAFC',
    card: '#1E293B',
    cardForeground: '#F8FAFC',
    popover: '#1E293B',
    popoverForeground: '#F8FAFC',

    // Dark blue accents with yellow secondary - 50% lighter for visibility
    primary: '#3A6498',
    primaryForeground: '#0F172A',
    secondary: '#FAA533',
    secondaryForeground: '#000000',
    muted: '#1E293B',
    mutedForeground: '#94A3B8',
    accent: '#1E40AF',
    accentForeground: '#F8FAFC',

    // State colors
    destructive: '#EF4444',
    destructiveForeground: '#FFFFFF',

    // Border colors
    border: '#334155',
    input: '#475569',
    ring: '#2563EB',

    // Chart colors - bright blues for dark mode
    chart1: '#2563EB',
    chart2: '#3B82F6',
    chart3: '#60A5FA',
    chart4: '#93C5FD',
    chart5: '#DBEAFE',

    // Sidebar colors
    sidebar: '#1E293B',
    sidebarForeground: '#F8FAFC',
    sidebarPrimary: '#2563EB',
    sidebarPrimaryForeground: '#F8FAFC',
    sidebarAccent: '#1E40AF',
    sidebarAccentForeground: '#94A3B8',
    sidebarBorder: '#475569',
    sidebarRing: '#2563EB',
  },
};

export default elegantTheme;