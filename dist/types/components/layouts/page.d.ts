/**
 * Page Layout - COMPOUND-ONLY with scheme for consistency
 * @module @bloomneo/uikit
 * @file src/components/layouts/page.tsx
 */
import * as React from 'react';
import type { NavigationItem, Size, Tone } from '@/types';
/**
 * PageLayout schemes - consistent with other layouts
 * default: Simple header + content + footer
 * sidebar: Header + content with sidebar + footer
 */
export type PageLayoutScheme = 'default' | 'sidebar';
/**
 * PageLayout Root - Just a container with context
 */
export interface PageLayoutProps {
    /** RECOMMENDED: Layout scheme for consistency (default: "default") */
    scheme?: PageLayoutScheme;
    /** RECOMMENDED: Visual styling tone (default: "clean") */
    tone?: Tone;
    /** OPTIONAL: Page size for child components (default: "xl") */
    size?: Size;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Page structure (Header, Content, Footer) */
    children: React.ReactNode;
}
/**
 * PageLayout.Header - Header with page context
 */
export interface PageHeaderProps {
    /** OPTIONAL: Header tone (inherits from PageLayout if not set) */
    tone?: Tone;
    /** OPTIONAL: Header size (inherits from PageLayout if not set) */
    size?: Size;
    /** OPTIONAL: Header positioning (default: "sticky") */
    position?: 'sticky' | 'fixed' | 'relative';
    /** OPTIONAL: Navigation items */
    navigation?: NavigationItem[];
    /** OPTIONAL: Current path for active states */
    currentPath?: string;
    /** OPTIONAL: Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** OPTIONAL: Logo component */
    logo?: React.ReactNode;
    /** OPTIONAL: Page title (used if no logo) */
    title?: string;
    /** OPTIONAL: Header actions (buttons, theme toggle, etc.) */
    actions?: React.ReactNode;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLElement>>;
/**
 * PageLayout.Content - Content area with optional sidebar
 */
export interface PageContentProps {
    /** OPTIONAL: Content tone (inherits from PageLayout if not set) */
    tone?: Tone;
    /** OPTIONAL: Content size (inherits from PageLayout if not set) */
    size?: Size;
    /** OPTIONAL: Sidebar position (default: "none") */
    sidebar?: 'none' | 'left' | 'right';
    /** OPTIONAL: Sidebar navigation items */
    navigation?: NavigationItem[];
    /** OPTIONAL: Custom sidebar content (overrides navigation) */
    sidebarContent?: React.ReactNode;
    /** OPTIONAL: Current path for active states */
    currentPath?: string;
    /** OPTIONAL: Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** OPTIONAL: Whether sidebar should be sticky */
    sidebarPosition?: 'sticky' | 'fixed' | 'relative';
    /** OPTIONAL: Breadcrumb items */
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    /** OPTIONAL: Breadcrumb navigation handler */
    onBreadcrumbNavigate?: (href: string) => void;
    /** OPTIONAL: Page title (shown above breadcrumbs) */
    title?: string;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Page content */
    children: React.ReactNode;
}
declare const PageContent: React.ForwardRefExoticComponent<PageContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PageLayout.Footer - Footer with page context
 */
export interface PageFooterProps {
    /** OPTIONAL: Footer tone (default: "contrast") */
    tone?: Tone;
    /** OPTIONAL: Footer size (inherits from PageLayout if not set) */
    size?: Size;
    /** OPTIONAL: Footer positioning (default: "relative") */
    position?: 'sticky' | 'fixed' | 'relative';
    /** OPTIONAL: Footer navigation items */
    navigation?: NavigationItem[];
    /** OPTIONAL: Current path for active states */
    currentPath?: string;
    /** OPTIONAL: Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
    /** OPTIONAL: Copyright text */
    copyright?: React.ReactNode;
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** OPTIONAL: Custom footer content */
    children?: React.ReactNode;
}
declare const PageFooter: React.ForwardRefExoticComponent<PageFooterProps & React.RefAttributes<HTMLElement>>;
/**
 * Hook to access page configuration
 */
declare const usePage: () => {
    scheme: PageLayoutScheme;
    tone: Tone;
    size: Size;
};
/**
 * PageLayout - COMPOUND-ONLY Component
 */
declare const PageLayout: React.ForwardRefExoticComponent<PageLayoutProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLElement>>;
    Content: React.ForwardRefExoticComponent<PageContentProps & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<PageFooterProps & React.RefAttributes<HTMLElement>>;
};
/**
 * Export COMPOUND-ONLY PageLayout
 */
export { PageLayout, PageHeader, PageContent, PageFooter, usePage };
/**
 * @llm-rule PageLayout Usage - COMPOUND-ONLY with scheme
 *
 * Basic website:
 * <PageLayout scheme="default" tone="clean" size="xl">
 *   <PageLayout.Header navigation={nav} logo={<Logo />} />
 *   <PageLayout.Content>
 *     <YourContent />
 *   </PageLayout.Content>
 *   <PageLayout.Footer copyright="© 2024" />
 * </PageLayout>
 *
 * Website with sidebar:
 * <PageLayout scheme="sidebar">
 *   <PageLayout.Header navigation={nav} title="My Site" />
 *   <PageLayout.Content navigation={docsNav}>
 *     <YourContent />
 *   </PageLayout.Content>
 *   <PageLayout.Footer navigation={footerNav} />
 * </PageLayout>
 *
 * Custom layout (override scheme):
 * <PageLayout scheme="default" tone="brand">
 *   <PageLayout.Header tone="brand" navigation={nav} actions={<ThemeToggle />} />
 *   <PageLayout.Content sidebar="right" sidebarContent={<CustomSidebar />}>
 *     <YourContent />
 *   </PageLayout.Content>
 *   <PageLayout.Footer tone="contrast" navigation={legalNav} />
 * </PageLayout>
 *
 * With breadcrumbs and title:
 * <PageLayout scheme="default" tone="clean">
 *   <PageLayout.Header navigation={nav} logo={<Logo />} />
 *   <PageLayout.Content
 *     title="User Profile"
 *     breadcrumbs={[
 *       { label: 'Home', href: '/' },
 *       { label: 'Users', href: '/users' },
 *       { label: 'John Doe' }
 *     ]}
 *     onBreadcrumbNavigate={(href) => navigate(href)}
 *   >
 *     <UserProfileContent />
 *   </PageLayout.Content>
 *   <PageLayout.Footer copyright="© 2024" />
 * </PageLayout>
 */ 
//# sourceMappingURL=page.d.ts.map