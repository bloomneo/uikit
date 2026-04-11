/**
 * @fileoverview Updated layout wrapper with proper type safety and consistency
 * @description Uses VITE__ environment variables with zero ambiguity
 * @package @bloomneo/uikit
 * @file /src/components/layouts/layout-wrapper.tsx
 */

/// <reference types="vite/client" />

import React from 'react';
import { ThemeProvider } from '../../themes/theme-provider';
import { AdminLayout } from './admin';
import { PageLayout } from './page';
import { AuthLayout } from './auth';
import { BlankLayout } from './blank';
import { PopupLayout } from './popup';
import type { 
  NavigationItem, 
  Size, 
  Tone,
  Theme,
  Mode,
  AdminLayoutScheme, 
  PageLayoutScheme,
  AuthLayoutScheme, 
  BlankLayoutScheme, 
  PopupLayoutScheme 
} from '../../types';

/**
 * Parse JSON string safely
 */
function parseJSON<T>(jsonString?: string, fallback: T = [] as T): T {
  if (!jsonString) return fallback;
  
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON:', jsonString);
    return fallback;
  }
}

/**
 * Ultra-simple layout configuration - zero ambiguity
 */
interface LayoutConfig {
  // Theme system
  theme: Theme;
  mode: Mode;
  detectSystem: boolean;
  
  // Layout selection
  layout: string;
  title: string;
  logo?: string;
  navigation: NavigationItem[];
  
  // Admin layout
  adminLayout: {
    scheme: AdminLayoutScheme;
    tone: Tone;
    size: Size;
    defaultSidebarOpen: boolean;
    position: 'relative' | 'sticky' | 'fixed';
  };
  
  // Page layout
  pageLayout: {
    scheme: PageLayoutScheme;
    tone: Tone;
    size: Size;
    position: 'sticky' | 'fixed' | 'relative';
  };
  
  // Auth layout
  authLayout: {
    scheme: AuthLayoutScheme;
    tone: Tone;
    size: Size;
    imageUrl?: string;
    imageOverlay: 'light' | 'dark' | 'none';
  };
  
  // Blank layout
  blankLayout: {
    scheme: BlankLayoutScheme;
    tone: Tone;
    size: Size;
  };
  
  // Popup layout
  popupLayout: {
    scheme: PopupLayoutScheme;
    tone: Tone;
    size: Size;
    position: 'sticky' | 'fixed' | 'relative';
    showClose: boolean;
  };
}

/**
 * Read layout configuration from VITE__ environment variables
 */
function getLayoutConfig(): LayoutConfig {
  const env = import.meta.env;
  
  return {
    // Theme system
    theme: (env.VITE__LAYOUT__THEME as Theme) || 'base',
    mode: (env.VITE__LAYOUT__MODE as Mode) || 'light',
    detectSystem: env.VITE__LAYOUT__DETECT_SYSTEM === 'true',
    
    // Layout selection
    layout: env.VITE__LAYOUT__TYPE || 'admin',
    title: env.VITE__LAYOUT__TITLE || env.VITE__APP__NAME || 'Platform',
    logo: env.VITE__LAYOUT__LOGO,
    navigation: parseJSON<NavigationItem[]>(env.VITE__LAYOUT__NAVIGATION, []),
    
    // Admin layout
    adminLayout: {
      scheme: (env.VITE__LAYOUT__ADMIN__SCHEME as AdminLayoutScheme) || 'sidebar',
      tone: (env.VITE__LAYOUT__ADMIN__TONE as Tone) || 'subtle',
      size: (env.VITE__LAYOUT__ADMIN__SIZE as Size) || 'lg',
      defaultSidebarOpen: env.VITE__LAYOUT__ADMIN__SIDEBAR_OPEN !== 'false',
      position: (env.VITE__LAYOUT__ADMIN__POSITION as 'relative' | 'sticky' | 'fixed') || 'relative',
    },
    
    // Page layout
    pageLayout: {
      scheme: (env.VITE__LAYOUT__PAGE__SCHEME as PageLayoutScheme) || 'default',
      tone: (env.VITE__LAYOUT__PAGE__TONE as Tone) || 'clean',
      size: (env.VITE__LAYOUT__PAGE__SIZE as Size) || 'xl',
      position: (env.VITE__LAYOUT__PAGE__POSITION as 'sticky' | 'fixed' | 'relative') || 'sticky',
    },
    
    // Auth layout
    authLayout: {
      scheme: (env.VITE__LAYOUT__AUTH__SCHEME as AuthLayoutScheme) || 'card',
      tone: (env.VITE__LAYOUT__AUTH__TONE as Tone) || 'clean',
      size: (env.VITE__LAYOUT__AUTH__SIZE as Size) || 'md',
      imageUrl: env.VITE__LAYOUT__AUTH__IMAGE_URL,
      imageOverlay: (env.VITE__LAYOUT__AUTH__IMAGE_OVERLAY as 'light' | 'dark' | 'none') || 'dark',
    },
    
    // Blank layout
    blankLayout: {
      scheme: (env.VITE__LAYOUT__BLANK__SCHEME as BlankLayoutScheme) || 'simple',
      tone: (env.VITE__LAYOUT__BLANK__TONE as Tone) || 'clean',
      size: (env.VITE__LAYOUT__BLANK__SIZE as Size) || 'lg',
    },
    
    // Popup layout
    popupLayout: {
      scheme: (env.VITE__LAYOUT__POPUP__SCHEME as PopupLayoutScheme) || 'modal',
      tone: (env.VITE__LAYOUT__POPUP__TONE as Tone) || 'clean',
      size: (env.VITE__LAYOUT__POPUP__SIZE as Size) || 'md',
      position: (env.VITE__LAYOUT__POPUP__POSITION as 'sticky' | 'fixed' | 'relative') || 'relative',
      showClose: env.VITE__LAYOUT__POPUP__SHOW_CLOSE !== 'false',
    },
  };
}

/**
 * Layout wrapper props - ultra-simple
 */
export interface LayoutWrapperProps {
  /** App content */
  children: React.ReactNode;
  /** Override layout type */
  layout?: string;
  /** Override navigation items */
  navigation?: NavigationItem[];
  /** Manual config overrides */
  overrides?: Partial<LayoutConfig>;
}

/**
 * Ultra-simple layout wrapper - zero ambiguity
 */
export function LayoutWrapper({ 
  children, 
  layout, 
  navigation, 
  overrides = {} 
}: LayoutWrapperProps): React.JSX.Element {
  const config = { ...getLayoutConfig(), ...overrides };
  
  // Allow prop overrides
  const finalLayout = layout || config.layout;
  const finalNavigation = navigation || config.navigation;
  
  return (
    <ThemeProvider 
      theme={config.theme} 
      mode={config.mode}
      detectSystem={config.detectSystem}
    >
      {renderLayout(children, finalLayout, finalNavigation, config)}
    </ThemeProvider>
  );
}

/**
 * Render layout based on type - UPDATED for compound components
 */
function renderLayout(
  children: React.ReactNode, 
  layout: string, 
  navigation: NavigationItem[], 
  config: LayoutConfig
): React.JSX.Element {
  
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const logoComponent = config.logo ? <img src={config.logo} alt="Logo" className="h-8 w-auto" /> : undefined;

  switch (layout) {
    case 'admin':
      return (
        <AdminLayout
          scheme={config.adminLayout.scheme}
          tone={config.adminLayout.tone}
          size={config.adminLayout.size}
          defaultSidebarOpen={config.adminLayout.defaultSidebarOpen}
          position={config.adminLayout.position}
        >
          <AdminLayout.Header 
            title={config.title}
          />
          <AdminLayout.Sidebar 
            navigation={navigation}
            currentPath={currentPath}
            onNavigate={handleNavigation}
            logo={logoComponent}
          />
          <AdminLayout.Content>
            {children}
          </AdminLayout.Content>
        </AdminLayout>
      );
      
    case 'page':
      return (
        <PageLayout 
          scheme={config.pageLayout.scheme}
          tone={config.pageLayout.tone}
          size={config.pageLayout.size}
        >
          <PageLayout.Header 
            navigation={navigation}
            currentPath={currentPath}
            onNavigate={handleNavigation}
            logo={logoComponent}
            title={config.title}
            position={config.pageLayout.position}
          />
          <PageLayout.Content>
            {children}
          </PageLayout.Content>
          <PageLayout.Footer 
            copyright={`© ${new Date().getFullYear()} ${config.title}. All rights reserved.`}
          />
        </PageLayout>
      );
      
    case 'auth':
      return (
        <AuthLayout 
          scheme={config.authLayout.scheme}
          tone={config.authLayout.tone}
          size={config.authLayout.size}
          title={config.title}
          logo={logoComponent}
          imageUrl={config.authLayout.imageUrl}
          imageOverlay={config.authLayout.imageOverlay}
        >
          {children}
        </AuthLayout>
      );
      
    case 'blank':
      return (
        <BlankLayout 
          scheme={config.blankLayout.scheme}
          tone={config.blankLayout.tone}
          size={config.blankLayout.size}
        >
          {logoComponent && (
            <div className="flex justify-center mb-6">
              {logoComponent}
            </div>
          )}
          {children}
        </BlankLayout>
      );
      
    case 'popup':
      return (
        <PopupLayout 
          scheme={config.popupLayout.scheme}
          tone={config.popupLayout.tone}
          size={config.popupLayout.size}
          position={config.popupLayout.position}
          title={config.title}
          showClose={config.popupLayout.showClose}
          onClose={() => typeof window !== 'undefined' && window.close?.()}
        >
          {children}
        </PopupLayout>
      );
      
    case 'none':
    default:
      // No layout wrapper - just theme provider
      return <>{children}</>;
  }
}

/**
 * Handle navigation events - ultra-simple logic
 */
function handleNavigation(href: string, item: NavigationItem): void {
  if (typeof window === 'undefined') return;
  
  // Execute onClick handler if present
  if (item.onClick) {
    item.onClick();
    return;
  }
  
  // Navigate to href
  if (href) {
    if (href.startsWith('http') || href.startsWith('//')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  }
}

/**
 * Hook to access layout configuration
 */
export function useLayoutConfig(): LayoutConfig {
  return getLayoutConfig();
}

/**
 * @llm-usage Environment Variable Configuration
 * 
 * Basic setup in .env:
 * VITE__LAYOUT__TYPE=admin
 * VITE__LAYOUT__THEME=base
 * VITE__LAYOUT__MODE=light
 * VITE__LAYOUT__TITLE="My App"
 * 
 * Admin layout config:
 * VITE__LAYOUT__ADMIN__SCHEME=sidebar
 * VITE__LAYOUT__ADMIN__TONE=subtle
 * VITE__LAYOUT__ADMIN__SIZE=lg
 * VITE__LAYOUT__ADMIN__SIDEBAR_OPEN=true
 * 
 * Page layout config:
 * VITE__LAYOUT__PAGE__SCHEME=default
 * VITE__LAYOUT__PAGE__TONE=clean
 * VITE__LAYOUT__PAGE__SIZE=xl
 * 
 * Auth layout config:
 * VITE__LAYOUT__AUTH__SCHEME=card
 * VITE__LAYOUT__AUTH__TONE=clean
 * VITE__LAYOUT__AUTH__SIZE=md
 * 
 * Navigation (JSON string):
 * VITE__LAYOUT__NAVIGATION='[{"key":"home","label":"Home","href":"/","icon":"Home"},{"key":"about","label":"About","href":"/about"}]'
 */

/**
 * @llm-pattern Usage Examples
 * 
 * Basic usage with env vars:
 * <LayoutWrapper>
 *   <YourAppContent />
 * </LayoutWrapper>
 * 
 * Override layout type:
 * <LayoutWrapper layout="page">
 *   <YourPageContent />
 * </LayoutWrapper>
 * 
 * Override navigation:
 * <LayoutWrapper navigation={customNav}>
 *   <YourContent />
 * </LayoutWrapper>
 * 
 * Manual config override:
 * <LayoutWrapper 
 *   overrides={{
 *     adminLayout: { tone: 'brand', size: 'xl' }
 *   }}
 * >
 *   <YourContent />
 * </LayoutWrapper>
 */