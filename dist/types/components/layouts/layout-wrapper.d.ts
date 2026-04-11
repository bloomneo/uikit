/**
 * @fileoverview Updated layout wrapper with proper type safety and consistency
 * @description Uses VITE__ environment variables with zero ambiguity
 * @package @bloomneo/uikit
 * @file /src/components/layouts/layout-wrapper.tsx
 */
import React from 'react';
import type { NavigationItem, Size, Tone, Theme, Mode, AdminLayoutScheme, PageLayoutScheme, AuthLayoutScheme, BlankLayoutScheme, PopupLayoutScheme } from '../../types';
/**
 * Ultra-simple layout configuration - zero ambiguity
 */
interface LayoutConfig {
    theme: Theme;
    mode: Mode;
    detectSystem: boolean;
    layout: string;
    title: string;
    logo?: string;
    navigation: NavigationItem[];
    adminLayout: {
        scheme: AdminLayoutScheme;
        tone: Tone;
        size: Size;
        defaultSidebarOpen: boolean;
        position: 'relative' | 'sticky' | 'fixed';
    };
    pageLayout: {
        scheme: PageLayoutScheme;
        tone: Tone;
        size: Size;
        position: 'sticky' | 'fixed' | 'relative';
    };
    authLayout: {
        scheme: AuthLayoutScheme;
        tone: Tone;
        size: Size;
        imageUrl?: string;
        imageOverlay: 'light' | 'dark' | 'none';
    };
    blankLayout: {
        scheme: BlankLayoutScheme;
        tone: Tone;
        size: Size;
    };
    popupLayout: {
        scheme: PopupLayoutScheme;
        tone: Tone;
        size: Size;
        position: 'sticky' | 'fixed' | 'relative';
        showClose: boolean;
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
export declare function LayoutWrapper({ children, layout, navigation, overrides }: LayoutWrapperProps): React.JSX.Element;
/**
 * Hook to access layout configuration
 */
export declare function useLayoutConfig(): LayoutConfig;
export {};
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
//# sourceMappingURL=layout-wrapper.d.ts.map