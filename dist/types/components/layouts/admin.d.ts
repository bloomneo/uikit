/**
 * Admin Layout - FIXED sidebar flash with minimal FOUC prevention
 * @module @bloomneo/uikit
 * @file src/components/layouts/admin.tsx
 */
import * as React from 'react';
import type { NavigationItem, Size, Tone } from '@/types';
/**
 * AdminLayout schemes - meaningful admin variations
 * sidebar: Full navigation with icons + labels (classic)
 * compact: Icon-only navigation with click-to-expand (mobile-first)
 */
export type AdminLayoutScheme = 'sidebar' | 'compact';
/**
 * AdminLayout Root - Container with context
 */
export interface AdminLayoutProps {
    /** RECOMMENDED: Layout scheme (default: "sidebar") */
    scheme?: AdminLayoutScheme;
    /** RECOMMENDED: Visual styling tone (default: "subtle") */
    tone?: Tone;
    /** OPTIONAL: Layout size (default: "lg") */
    size?: Size;
    /** OPTIONAL: Sidebar positioning */
    position?: 'relative' | 'sticky' | 'fixed';
    /** OPTIONAL: Default sidebar state (default: true) */
    defaultSidebarOpen?: boolean;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Admin structure (Header, Sidebar, Content) */
    children: React.ReactNode;
}
/**
 * AdminLayout.Sidebar - Navigation sidebar with FOUC prevention
 */
export interface AdminSidebarProps {
    /** OPTIONAL: Sidebar tone (inherits from AdminLayout if not set) */
    tone?: Tone;
    /** OPTIONAL: Navigation items */
    navigation?: NavigationItem[];
    /** OPTIONAL: Current path for active states */
    currentPath?: string;
    /** OPTIONAL: Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** OPTIONAL: Logo component */
    logo?: React.ReactNode;
    /** OPTIONAL: Sidebar positioning */
    position?: 'relative' | 'sticky' | 'fixed';
    /** OPTIONAL: Sidebar footer content */
    footer?: React.ReactNode;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
}
declare const AdminSidebar: React.ForwardRefExoticComponent<AdminSidebarProps & React.RefAttributes<HTMLElement>>;
/**
 * AdminLayout.Header - Top header with proper z-index for mobile
 */
export interface AdminHeaderProps {
    /** OPTIONAL: Header tone (inherits from AdminLayout if not set) */
    tone?: Tone;
    /** OPTIONAL: Header size (inherits from AdminLayout if not set) */
    size?: Size;
    /** OPTIONAL: Page title */
    title?: string;
    /** OPTIONAL: Header positioning (default: "sticky") */
    position?: 'sticky' | 'fixed' | 'relative';
    /** OPTIONAL: Breadcrumb items */
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    /** OPTIONAL: Breadcrumb navigation handler */
    onBreadcrumbNavigate?: (href: string) => void;
    /** OPTIONAL: Header actions (buttons, user menu, etc.) */
    actions?: React.ReactNode;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
}
declare const AdminHeader: React.ForwardRefExoticComponent<AdminHeaderProps & React.RefAttributes<HTMLElement>>;
/**
 * AdminLayout.Content - Main content area with PROPER flex layout
 */
export interface AdminContentProps {
    /** OPTIONAL: Content tone (inherits from AdminLayout if not set) */
    tone?: Tone;
    /** OPTIONAL: Content size (inherits from AdminLayout if not set) */
    size?: Size;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Admin content */
    children: React.ReactNode;
}
declare const AdminContent: React.ForwardRefExoticComponent<AdminContentProps & React.RefAttributes<HTMLElement>>;
/**
 * Hook to access admin configuration
 */
declare const useAdmin: () => {
    scheme: AdminLayoutScheme;
    tone: Tone;
    size: Size;
    sidebarExpanded: boolean;
    setSidebarExpanded: (expanded: boolean) => void;
    isMobile: boolean;
};
/**
 * AdminLayout - COMPOUND-ONLY Component
 */
declare const AdminLayout: React.ForwardRefExoticComponent<AdminLayoutProps & React.RefAttributes<HTMLDivElement>> & {
    Sidebar: React.ForwardRefExoticComponent<AdminSidebarProps & React.RefAttributes<HTMLElement>>;
    Header: React.ForwardRefExoticComponent<AdminHeaderProps & React.RefAttributes<HTMLElement>>;
    Content: React.ForwardRefExoticComponent<AdminContentProps & React.RefAttributes<HTMLElement>>;
};
/**
 * Export FIXED AdminLayout
 */
export { AdminLayout, AdminSidebar, AdminHeader, AdminContent, useAdmin };
//# sourceMappingURL=admin.d.ts.map