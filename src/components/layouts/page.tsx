/**
 * Page Layout - COMPOUND-ONLY with scheme for consistency
 * @module @bloomneo/uikit
 * @file src/components/layouts/page.tsx
 */

import * as React from 'react';
import { forwardRef, createContext, useContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Header, HeaderLogo, HeaderNav } from '@/components/sections/header';
import { Footer } from '@/components/sections/footer';
import { Container } from '@/components/sections/container';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { NavigationItem, Size, Tone } from '@/types';

/**
 * PageLayout schemes - consistent with other layouts
 * default: Simple header + content + footer
 * sidebar: Header + content with sidebar + footer
 */
export type PageLayoutScheme = 'default' | 'sidebar';

/**
 * Page context for sharing configuration across compound components
 */
const PageContext = createContext<{
  scheme: PageLayoutScheme;
  tone: Tone;
  size: Size;
}>({
  scheme: 'default',
  tone: 'brand',
  size: 'xl',
});

/**
 * Page layout container variants
 */
const pageVariants = cva(
  'min-h-screen flex flex-col',
  {
    variants: {
      tone: {
        clean: 'bg-background text-foreground',
        subtle: 'bg-background text-foreground',
        brand: 'bg-background text-foreground',
        contrast: 'bg-zinc-900 text-zinc-100'
      }
    },
    defaultVariants: {
      tone: 'clean'
    }
  }
);

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
 * PageLayout Root Component - COMPOUND-ONLY with scheme
 */
const PageLayoutRoot = forwardRef<HTMLDivElement, PageLayoutProps>(({
  scheme = 'default',
  tone = 'clean',
  size = 'xl',
  className,
  children,
}, ref) => {
  return (
    <PageContext.Provider value={{ scheme, tone, size }}>
      <div
        ref={ref}
        className={cn(pageVariants({ tone }), className)}
      >
        {children}
      </div>
    </PageContext.Provider>
  );
});

PageLayoutRoot.displayName = 'PageLayout';

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

const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(({
  tone,
  size,
  position = 'sticky',
  navigation = [],
  currentPath = '',
  onNavigate,
  logo,
  title,
  actions,
  className,
}, ref) => {
  const { tone: pageTone, size: pageSize } = usePage();
  
  return (
    <Header
      ref={ref}
      tone={tone || pageTone}
      size={size || pageSize}
      position={position}
      className={className}
    >
      {/* Logo */}
      <HeaderLogo>
        {logo || (title && (
          <span className="text-xl font-bold">{title}</span>
        ))}
      </HeaderLogo>

      {/* Navigation */}
      {navigation.length > 0 && (
        <HeaderNav
          navigation={navigation}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      )}

      {/* Actions */}
      {actions && (
        <div className="ml-auto flex items-center gap-2">
          {actions}
        </div>
      )}
    </Header>
  );
});

PageHeader.displayName = 'PageHeader';

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
  breadcrumbs?: { label: string; href?: string }[];
  /** OPTIONAL: Breadcrumb navigation handler */
  onBreadcrumbNavigate?: (href: string) => void;
  /** OPTIONAL: Page title (shown above breadcrumbs) */
  title?: string;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** REQUIRED: Page content */
  children: React.ReactNode;
}

const PageContent = forwardRef<HTMLDivElement, PageContentProps>(({
  tone,
  size,
  sidebar = 'none',
  navigation = [],
  sidebarContent,
  currentPath = '',
  onNavigate,
  sidebarPosition = 'relative',
  breadcrumbs = [],
  onBreadcrumbNavigate,
  title,
  className,
  children,
}, ref) => {
  const { scheme, tone: pageTone, size: pageSize } = usePage();
  
  // Auto-detect sidebar from scheme if not explicitly set
  const finalSidebar = sidebar !== 'none' ? sidebar : (scheme === 'sidebar' ? 'left' : 'none');
  
  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (href: string) => {
    if (onBreadcrumbNavigate) {
      onBreadcrumbNavigate(href);
    } else if (onNavigate) {
      // Create a navigation item for the breadcrumb
      const navItem: NavigationItem = {
        key: href,
        label: href,
        href: href
      };
      onNavigate(href, navItem);
    }
  };

  // Render breadcrumbs component using UI breadcrumb components
  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null;

    return (
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink
                      asChild={!!(onBreadcrumbNavigate || onNavigate)}
                      {...((onBreadcrumbNavigate || onNavigate) 
                        ? {
                            onClick: (e: React.MouseEvent) => {
                              e.preventDefault();
                              handleBreadcrumbClick(crumb.href!);
                            }
                          }
                        : { href: crumb.href }
                      )}
                    >
                      {(onBreadcrumbNavigate || onNavigate) ? (
                        <button type="button">
                          {crumb.label}
                        </button>
                      ) : (
                        crumb.label
                      )}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  };

  // Render page title
  const renderTitle = () => {
    if (!title) return null;
    
    return (
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
        {title}
      </h1>
    );
  };

  if (finalSidebar === 'none') {
    // Simple content without sidebar
    return (
      <main 
        ref={ref}
        className={cn('flex-1', className)}
      >
        <div className={cn(
          'mx-auto',
          (size || pageSize) === 'sm' && 'max-w-2xl px-4 py-6',
          (size || pageSize) === 'md' && 'max-w-4xl px-4 sm:px-6 py-8',
          (size || pageSize) === 'lg' && 'max-w-6xl px-4 sm:px-6 lg:px-8 py-8',
          (size || pageSize) === 'xl' && 'max-w-7xl px-4 sm:px-6 lg:px-8 py-8',
          (size || pageSize) === 'full' && 'max-w-full px-4 sm:px-6 lg:px-8 py-8'
        )}>
          {/* Page header section with title and breadcrumbs */}
          {(title || breadcrumbs.length > 0) && (
            <div className="mb-8">
              {renderBreadcrumbs()}
              {renderTitle()}
            </div>
          )}
          
          {/* Main content */}
          {children}
        </div>
      </main>
    );
  }

  // Content with sidebar - use Container
  return (
    <div ref={ref} className={cn('flex-1', className)}>
      <Container
        sidebar={finalSidebar}
        navigation={navigation}
        sidebarContent={sidebarContent}
        currentPath={currentPath}
        onNavigate={onNavigate}
        sidebarPosition={sidebarPosition}
        tone={tone || pageTone}
        size={size || pageSize}
      >
        {/* Page header section with title and breadcrumbs */}
        {(title || breadcrumbs.length > 0) && (
          <div className="mb-8">
            {renderBreadcrumbs()}
            {renderTitle()}
          </div>
        )}
        
        {/* Main content */}
        {children}
      </Container>
    </div>
  );
});

PageContent.displayName = 'PageContent';

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

const PageFooter = forwardRef<HTMLElement, PageFooterProps>(({
  tone,
  size,
  position = 'relative',
  navigation = [],
  currentPath = '',
  onNavigate,
  copyright,
  className,
  children,
}, ref) => {
  const { tone: pageTone, size: pageSize } = usePage();
  
  // Default footer tone is contrast for better visual separation
  const footerTone = tone || (pageTone === 'brand' ? 'subtle' : pageTone);
  
  return (
    <Footer
      ref={ref}
      tone={footerTone}
      size={size || pageSize}
      position={position}
      className={className}
    >
      {children || (
        <>
          {/* Footer Navigation */}
          {navigation.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    if (item.href && onNavigate) {
                      onNavigate(item.href, item);
                    } else if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Copyright */}
          {copyright && (
            <div className="text-center py-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {copyright}
              </p>
            </div>
          )}
        </>
      )}
    </Footer>
  );
});

PageFooter.displayName = 'PageFooter';

/**
 * Hook to access page configuration
 */
const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageLayout component');
  }
  return context;
};

/**
 * PageLayout - COMPOUND-ONLY Component
 */
const PageLayout = Object.assign(PageLayoutRoot, {
  Header: PageHeader,
  Content: PageContent,
  Footer: PageFooter,
});

/**
 * Export COMPOUND-ONLY PageLayout
 */
export { 
  PageLayout,
  PageHeader,
  PageContent,
  PageFooter,
  usePage
};

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