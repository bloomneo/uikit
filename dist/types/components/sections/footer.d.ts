/**
 * Footer component with standardized prop naming and tone system
 * @module @bloomneo/uikit
 * @file src/components/sections/footer.tsx
 */
import * as React from 'react';
import type { Size, NavigationItem } from '@/types';
/**
 * Footer component props with standardized system
 */
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    /** Visual styling tone */
    tone?: 'clean' | 'subtle' | 'brand' | 'contrast';
    /** Footer size (width + padding + spacing) */
    size?: Size;
    /** Footer positioning */
    position?: 'sticky' | 'fixed' | 'relative';
    /** Navigation items */
    navigation?: NavigationItem[];
    /** Current path for active states */
    currentPath?: string;
    /** Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** Footer content */
    children: React.ReactNode;
}
/**
 * Basic Footer props
 */
export interface FooterBasicProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Navigation items (standardized) */
    navigation?: NavigationItem[];
    /** Current path for active states */
    currentPath?: string;
    /** Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** Footer logo/brand */
    logo?: React.ReactNode;
    /** Social media links */
    social?: React.ReactNode;
    /** Copyright text */
    copyright?: React.ReactNode;
}
/**
 * Basic Footer - Simple row layout with navigation
 */
declare const FooterBasic: React.ForwardRefExoticComponent<FooterBasicProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Footer column interface
 */
export interface FooterColumn {
    /** Unique key */
    key: string;
    /** Column title */
    title: string;
    /** Column navigation items */
    items: NavigationItem[];
}
/**
 * Advanced Footer props
 */
export interface FooterAdvancedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Brand section (logo + description) */
    brand?: React.ReactNode;
    /** Footer columns with navigation items (up to 5) */
    columns?: FooterColumn[];
    /** Newsletter signup */
    newsletter?: React.ReactNode;
    /** Social media links */
    social?: React.ReactNode;
    /** Legal navigation items */
    legal?: NavigationItem[];
    /** Current path for active states */
    currentPath?: string;
    /** Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** Copyright text */
    copyright?: React.ReactNode;
}
/**
 * Advanced Footer - Multi-column layout with organized sections
 */
/**
 * Advanced Footer - Multi-column layout with organized sections
 * Two-level grid: Brand (30%) + Menu Container (70%) with intelligent 0-4 columns
 */
declare const FooterAdvanced: React.ForwardRefExoticComponent<FooterAdvancedProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Social link interface
 */
export interface SocialLink {
    /** Unique key */
    key: string;
    /** Accessibility label */
    label: string;
    /** Icon component */
    icon: React.ComponentType<{
        className?: string;
    }>;
    /** Click handler */
    onClick: () => void;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Footer Social props
 */
export interface FooterSocialProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Social media links */
    links?: SocialLink[];
}
/**
 * Footer Social component
 */
declare const FooterSocial: React.ForwardRefExoticComponent<FooterSocialProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Footer with compound components
 */
declare const Footer: React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>> & {
    Basic: React.ForwardRefExoticComponent<FooterBasicProps & React.RefAttributes<HTMLDivElement>>;
    Advanced: React.ForwardRefExoticComponent<FooterAdvancedProps & React.RefAttributes<HTMLDivElement>>;
    Social: React.ForwardRefExoticComponent<FooterSocialProps & React.RefAttributes<HTMLDivElement>>;
};
/**
 * Export Footer with compound components and individual components
 */
export { Footer, FooterBasic, FooterAdvanced, FooterSocial };
//# sourceMappingURL=footer.d.ts.map