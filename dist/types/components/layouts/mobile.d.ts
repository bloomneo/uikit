/**
 * Mobile Layout - Native mobile app layout with tabs/stack navigation
 * @module @bloomneo/uikit
 * @file src/components/layouts/mobile.tsx
 */
import * as React from 'react';
import type { NavigationItem, Size, Tone } from '@/types';
/**
 * MobileLayout schemes - mobile navigation patterns
 * tabbed: Bottom tab navigation (iOS/Android standard)
 * stack: Stack navigation with back button (detail pages)
 * drawer: Side drawer navigation (hamburger menu)
 */
export type MobileLayoutScheme = 'tabbed' | 'stack' | 'drawer';
/**
 * MobileLayout Root - Container with context
 */
export interface MobileLayoutProps {
    /** RECOMMENDED: Layout scheme (default: "tabbed") */
    scheme?: MobileLayoutScheme;
    /** RECOMMENDED: Visual styling tone (default: "clean") */
    tone?: Tone;
    /** OPTIONAL: Layout size (default: "lg") */
    size?: Size;
    /** OPTIONAL: Tabs for tabbed scheme */
    tabs?: NavigationItem[];
    /** OPTIONAL: Default active tab */
    defaultTab?: string;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Mobile layout structure */
    children: React.ReactNode;
}
/**
 * Mobile Header Component
 */
export interface MobileHeaderProps {
    /** OPTIONAL: Header title */
    title?: string;
    /** OPTIONAL: Back button handler (for stack scheme) */
    onBack?: () => void;
    /** OPTIONAL: Show menu button (for drawer scheme) */
    onMenu?: () => void;
    /** OPTIONAL: Actions on the right */
    actions?: React.ReactNode;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** OPTIONAL: Children for custom header content */
    children?: React.ReactNode;
}
/**
 * Mobile Content Component
 */
export interface MobileContentProps {
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** OPTIONAL: Disable scroll */
    noScroll?: boolean;
    /** REQUIRED: Page content */
    children: React.ReactNode;
}
/**
 * Mobile TabBar Component (for tabbed scheme)
 */
export interface MobileTabBarProps {
    /** REQUIRED: Navigation tabs */
    tabs: NavigationItem[];
    /** OPTIONAL: Tab click handler */
    onTabClick?: (tabId: string) => void;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
}
/**
 * MobileLayout compound component export
 */
export declare const MobileLayout: React.ForwardRefExoticComponent<MobileLayoutProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<MobileHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<MobileContentProps & React.RefAttributes<HTMLDivElement>>;
    TabBar: React.ForwardRefExoticComponent<MobileTabBarProps & React.RefAttributes<HTMLDivElement>>;
};
/**
 * Hook to access mobile layout context
 */
export declare const useMobileLayout: () => {
    scheme: MobileLayoutScheme;
    tone: Tone;
    size: Size;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
};
//# sourceMappingURL=mobile.d.ts.map