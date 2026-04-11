/**
 * Admin Layout - FIXED sidebar flash with minimal FOUC prevention
 * @module @bloomneo/uikit
 * @file src/components/layouts/admin.tsx
 */

import * as React from 'react';
import { forwardRef, createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Menu, X, ChevronRight } from 'lucide-react';
import type { NavigationItem, Size, Tone } from '@/types';

/**
 * AdminLayout schemes - meaningful admin variations
 * sidebar: Full navigation with icons + labels (classic)
 * compact: Icon-only navigation with click-to-expand (mobile-first)
 */
export type AdminLayoutScheme = 'sidebar' | 'compact';

/**
 * Detect if we're on mobile - synchronous detection to prevent flash
 */
function getInitialMobileState(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 1024;
}

/**
 * Get initial sidebar state based on mobile detection
 */
function getInitialSidebarState(defaultOpen: boolean): boolean {
  if (typeof window === 'undefined') return defaultOpen;
  const isMobile = getInitialMobileState();
  return isMobile ? false : defaultOpen;
}

/**
 * Admin context for sharing configuration across compound components
 */
const AdminContext = createContext<{
  scheme: AdminLayoutScheme;
  tone: Tone;
  size: Size;
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}>({
  scheme: 'sidebar',
  tone: 'subtle',
  size: 'lg',
  sidebarExpanded: true,
  setSidebarExpanded: () => {},
  isMobile: false,
});

/**
 * Admin layout container variants - FLEX LAYOUT
 */
const adminVariants = cva(
  'min-h-screen flex bg-background',
  {
    variants: {
      tone: {
        clean: '',
        subtle: '',
        brand: '',
        contrast: ''
      }
    },
    defaultVariants: {
      tone: 'subtle'
    }
  }
);

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
 * AdminLayout Root Component - BACK TO ORIGINAL WORKING VERSION
 */
const AdminLayoutRoot = forwardRef<HTMLDivElement, AdminLayoutProps>(({
  scheme = 'sidebar',
  tone = 'subtle',
  size = 'lg',
  position = 'relative',
  defaultSidebarOpen = true,
  className,
  children,
}, ref) => {
  // ✅ RESTORED: Original working state management
  const [isMobile, setIsMobile] = useState(getInitialMobileState);
  const [sidebarExpanded, setSidebarExpanded] = useState(() => 
    getInitialSidebarState(defaultSidebarOpen)
  );

  // ✅ RESTORED: Original mobile detection logic
  useLayoutEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      const wasMobile = isMobile;
      
      setIsMobile(mobile);
      
      // Only auto-close sidebar when transitioning TO mobile
      if (mobile && !wasMobile && sidebarExpanded) {
        setSidebarExpanded(false);
      }
      // When transitioning FROM mobile to desktop, respect defaultSidebarOpen
      else if (!mobile && wasMobile) {
        setSidebarExpanded(defaultSidebarOpen);
      }
    };

    // Check immediately in case window size changed
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile, sidebarExpanded, defaultSidebarOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, sidebarExpanded]);

  // Auto-wrap Header + Content in main area
  const childrenArray = React.Children.toArray(children);
  const sidebar = childrenArray.find(child => 
    React.isValidElement(child) && child.type === AdminSidebar
  );
  const header = childrenArray.find(child => 
    React.isValidElement(child) && child.type === AdminHeader
  );
  const content = childrenArray.find(child => 
    React.isValidElement(child) && child.type === AdminContent
  );

  return (
    <AdminContext.Provider value={{ 
      scheme, 
      tone, 
      size, 
      sidebarExpanded, 
      setSidebarExpanded,
      isMobile
    }}>
      <div
        ref={ref}
        className={cn(adminVariants({ tone }), className)}
      >
        {/* ✅ RESTORED: Original sidebar container */}
        <div className={cn(
          'flex-shrink-0 transition-all duration-200 ease-out overflow-hidden',
          // Desktop: smooth width transition
          !isMobile && sidebarExpanded && (
            size === 'sm' ? 'w-48' :
            size === 'md' ? 'w-56' :
            size === 'lg' ? 'w-64' :
            size === 'xl' ? 'w-72' :
            'w-80'
          ),
          !isMobile && !sidebarExpanded && 'w-0',
          // Mobile: don't affect layout
          isMobile && 'w-0',
          position === 'sticky' && isMobile && 'top-0 max-h-screen',
          position === 'sticky' && !isMobile && 'sticky top-0 max-h-screen'
        )}>
          {sidebar}
        </div>
        
        {/* ✅ RESTORED: Original main area */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out">
          {header}
          {content}
        </div>
      </div>
    </AdminContext.Provider>
  );
});

AdminLayoutRoot.displayName = 'AdminLayout';

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

const AdminSidebar = forwardRef<HTMLElement, AdminSidebarProps>(({
  tone,
  navigation = [],
  currentPath = '',
  onNavigate,
  logo,
  position,
  footer,
  className,
}, ref) => {
  const { scheme, tone: adminTone, size, sidebarExpanded, setSidebarExpanded, isMobile } = useAdmin();
  const [expandedMenus, setExpandedMenus] = useState(new Set<string>());
  const [compactExpanded, setCompactExpanded] = useState(false);

  const finalTone = tone || adminTone;
  const isCompact = scheme === 'compact';
  const showLabels = !isCompact || compactExpanded;

  // Handle compact mode expansion
  const handleCompactToggle = () => {
    if (isCompact) {
      setCompactExpanded(!compactExpanded);
    }
  };

  // Handle menu expansion
  const toggleMenu = (menuKey: string) => {
    const newExpanded = new Set(expandedMenus);
    if (newExpanded.has(menuKey)) {
      newExpanded.delete(menuKey);
    } else {
      newExpanded.add(menuKey);
    }
    setExpandedMenus(newExpanded);
  };

  // Get menu item styles
  const getMenuItemStyles = (isActive: boolean, isSubmenu = false) => {
    const baseStyles = isSubmenu 
      ? 'w-[92%] flex items-center group text-left font-medium rounded-lg cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02]'
      : 'w-full flex items-center group text-left font-medium rounded-lg cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02]';
    const padding = isSubmenu 
      ? (showLabels ? 'ml-4 px-3 py-2' : 'px-2 py-2') 
      : (showLabels ? 'px-3 py-2.5' : 'px-2 py-2.5 justify-center');
    
    let toneStyles = '';
    switch (finalTone) {
      case 'clean':
        toneStyles = isActive 
          ? 'bg-muted text-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50';
        break;
      case 'subtle':
        toneStyles = isActive 
          ? 'bg-background text-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-background/60';
        break;
      case 'brand':
        toneStyles = isActive 
          ? 'bg-primary-foreground/20 text-primary-foreground shadow-sm' 
          : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10';
        break;
      case 'contrast':
        toneStyles = isActive 
          ? 'bg-muted/20 dark:bg-muted/20 text-white shadow-sm' 
          : 'text-white hover:bg-muted/20';
        break;
      default:
        toneStyles = isActive 
          ? 'bg-muted/10 text-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50';
    }
    
    return cn(baseStyles, padding, toneStyles);
  };

  // Menu item component
  const MenuItem = ({ item, isSubmenu = false }: { item: NavigationItem; isSubmenu?: boolean }) => {
    const hasSubmenu = !isSubmenu && item.items && item.items.length > 0;
    const isExpanded = expandedMenus.has(item.key);
    const isActive = item.href ? currentPath === item.href : Boolean(item.isActive);

    const handleClick = () => {
      if (isCompact && !compactExpanded) {
        setCompactExpanded(true);
        return;
      }

      if (hasSubmenu) {
        toggleMenu(item.key);
      } else if (item.href && onNavigate) {
        onNavigate(item.href, item);
        // Close mobile sidebar after navigation
        if (isMobile) {
          setSidebarExpanded(false);
        }
      } else if (item.onClick) {
        item.onClick();
        // Close mobile sidebar after action
        if (isMobile) {
          setSidebarExpanded(false);
        }
      }
    };

    const menuButton = (
      <button
        onClick={handleClick}
        className={getMenuItemStyles(isActive, isSubmenu)}
      >
        {!isSubmenu && item.icon && (
          <item.icon className={cn(
            'flex-shrink-0',
            showLabels ? 'h-4 w-4 mr-3' : 'h-5 w-5'
          )} />
        )}
        
        {showLabels && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>
            
            {item.badge && (
              <Badge 
                variant={isActive ? 'secondary' : 'outline'} 
                className={cn(
                  "text-xs h-4 px-1 ml-1 flex-shrink-0",
                  finalTone === 'brand' && !isActive && 'bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20',
                  finalTone === 'brand' && isActive && 'bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30',
                  finalTone === 'contrast' && !isActive && 'bg-zinc-700 text-zinc-300 border-zinc-600',
                  finalTone === 'contrast' && isActive && 'bg-zinc-600 text-zinc-100 border-zinc-500'
                )}
              >
                {item.badge}
              </Badge>
            )}
            
            {hasSubmenu && (
              <ChevronRight className={cn(
                'h-4 w-4 flex-shrink-0 transition-transform duration-200',
                isExpanded && 'rotate-90'
              )} />
            )}
          </>
        )}
      </button>
    );

    // In compact mode without labels, wrap in tooltip
    if (isCompact && !compactExpanded && !isSubmenu && item.icon) {
      return (
        <div key={item.key} className="w-full">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                {menuButton}
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-white text-black border border-gray-200 shadow-md"
              >
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {hasSubmenu && isExpanded && showLabels && item.items && (
            <div className="overflow-hidden transition-all duration-300 mt-1">
              <div className="space-y-1 pb-2">
                {item.items.map((subItem) => (
                  <MenuItem key={subItem.key} item={subItem} isSubmenu={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={item.key} className="w-full">
        {menuButton}
        
        {hasSubmenu && isExpanded && showLabels && item.items && (
          <div className="overflow-hidden transition-all duration-400 ease-out mt-1">
            <div className="space-y-1 pb-2 animate-in slide-in-from-top-2">
              {item.items.map((subItem, subIndex) => (
                <div
                  key={subItem.key}
                  className="transition-all duration-300 ease-out"
                  style={{ transitionDelay: `${subIndex * 75}ms` }}
                >
                  <MenuItem item={subItem} isSubmenu={true} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* ✅ FIXED: Mobile Overlay with higher z-index */}
      {isMobile && sidebarExpanded && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarExpanded(false)}
          aria-hidden="true"
        />
      )}
  
      {/* ✅ RESTORED: Original sidebar with working mobile behavior */}
      <aside 
        ref={ref}
        className={cn(
          'border-r flex flex-col bg-background overflow-hidden',
          // ✅ RESTORED: Original smooth transitions
          'transition-all duration-200 ease-out',
          // ✅ FIXED: Proper z-index layering for mobile
          // Mobile: Higher z-index than header (z-[70] > z-[10])
          isMobile ? 'fixed left-0 top-0 z-[70] h-full' : 'relative h-screen',
          // Mobile: slide animation
          isMobile && (sidebarExpanded ? 'translate-x-0' : '-translate-x-full'),
          // Desktop: always visible but container controls width
          !isMobile && 'translate-x-0',
          // Fixed widths for consistent animation
          scheme === 'sidebar' && size === 'sm' && 'w-48',
          scheme === 'sidebar' && size === 'md' && 'w-56', 
          scheme === 'sidebar' && size === 'lg' && 'w-64',
          scheme === 'sidebar' && size === 'xl' && 'w-72',
          scheme === 'sidebar' && size === 'full' && 'w-80',
          scheme === 'compact' && !compactExpanded && size === 'sm' && 'w-12',
          scheme === 'compact' && !compactExpanded && size === 'md' && 'w-14',
          scheme === 'compact' && !compactExpanded && size === 'lg' && 'w-16',
          scheme === 'compact' && !compactExpanded && size === 'xl' && 'w-18',
          scheme === 'compact' && !compactExpanded && size === 'full' && 'w-20',
          scheme === 'compact' && compactExpanded && size === 'sm' && 'w-48',
          scheme === 'compact' && compactExpanded && size === 'md' && 'w-56',
          scheme === 'compact' && compactExpanded && size === 'lg' && 'w-64',
          scheme === 'compact' && compactExpanded && size === 'xl' && 'w-72',
          scheme === 'compact' && compactExpanded && size === 'full' && 'w-80',
          // Tone colors
          finalTone === 'clean' && 'bg-background/90 backdrop-blur-sm border-border/40 text-foreground',
          finalTone === 'subtle' && 'bg-muted/90 backdrop-blur-sm border-border/30 text-foreground',
          finalTone === 'brand' && 'bg-primary border-primary-foreground/20 text-primary-foreground',
          finalTone === 'contrast' && 'bg-zinc-900 border-zinc-700/40 text-zinc-100',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header with smooth transitions */}
          <div className={cn(
            'flex items-center shadow-sm flex-shrink-0 border-b transition-all duration-300 ease-out',
            finalTone === 'clean' && 'border-border/40',
            finalTone === 'subtle' && 'border-border/30', 
            finalTone === 'brand' && 'border-primary-foreground/20',
            finalTone === 'contrast' && 'border-zinc-700/40',
            showLabels ? 'justify-between h-16 px-4' : 'justify-center h-16 px-2'
          )}>
            {showLabels ? (
              <>
                {logo && (
                  <div className={cn(
                    "flex-shrink-0",
                    finalTone === 'brand' && '[&_*]:text-primary-foreground',
                    finalTone === 'contrast' && '[&_*]:text-zinc-100'
                  )}>
                    {logo}
                  </div>
                )}
                {/* Close button for mobile OR compact expanded */}
                {(isMobile || (isCompact && compactExpanded)) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (isMobile) {
                        setSidebarExpanded(false);
                      } else if (isCompact) {
                        setCompactExpanded(false);
                      }
                    }}
                    className="flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCompactToggle}
                className="flex-shrink-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation with staggered animations */}
          <div className="flex-1 overflow-y-auto">
            <nav className={cn(
              'space-y-1 transition-all duration-300 ease-out', 
              showLabels ? 'p-4' : 'p-2'
            )}>
              {navigation.map((item, index) => (
                <div 
                  key={item.key}
                  className={cn(
                    "transition-all duration-300 ease-out",
                    showLabels ? "opacity-100 translate-x-0" : "opacity-100"
                  )}
                  style={{ 
                    transitionDelay: showLabels ? `${index * 50}ms` : '0ms' 
                  }}
                >
                  <MenuItem item={item} />
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          {footer && showLabels && (
            <>
              <Separator className={cn(
                finalTone === 'clean' && 'bg-border/40',
                finalTone === 'subtle' && 'bg-border/30', 
                finalTone === 'brand' && 'bg-primary-foreground/20',
                finalTone === 'contrast' && 'bg-zinc-700/40'
              )} />
              <div className="flex-shrink-0 p-4">
                {footer}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
});

AdminSidebar.displayName = 'AdminSidebar';

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
  breadcrumbs?: { label: string; href?: string }[];
  /** OPTIONAL: Breadcrumb navigation handler */
  onBreadcrumbNavigate?: (href: string) => void;
  /** OPTIONAL: Header actions (buttons, user menu, etc.) */
  actions?: React.ReactNode;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
}

const AdminHeader = forwardRef<HTMLElement, AdminHeaderProps>(({
  tone,
  size,
  title,
  position = 'sticky',
  breadcrumbs = [],
  onBreadcrumbNavigate,
  actions,
  className,
}, ref) => {
  const { sidebarExpanded, setSidebarExpanded, isMobile } = useAdmin();

  return (
    <header 
      ref={ref}
      className={cn(
        'w-full shadow-sm bg-background/95 backdrop-blur-md text-foreground flex-shrink-0 border-b border-border/50',
        'transition-all duration-200 ease-out',
        // ✅ FIXED: Sticky on desktop, lower z-index for mobile sidebar layering
        position === 'sticky' && 'sticky top-0',
        position === 'fixed' && 'fixed top-0 left-0 right-0',
        // Always use lower z-index so mobile sidebar appears above
        'z-[10]',
        position === 'relative' && 'relative',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Toggle button with smooth icon transition */}
          <button
            className={cn(
              "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300 ease-out",
              "transform hover:scale-105 active:scale-95",
              // Always show on mobile
              isMobile && "block",
              // Show on desktop for toggle functionality  
              !isMobile && "block"
            )}
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            aria-label={sidebarExpanded ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className={cn(
              "h-5 w-5 transition-transform duration-300 ease-out",
              sidebarExpanded && !isMobile && "rotate-180"
            )} />
          </button>
          
          {/* Title and Breadcrumbs */}
          <div className="min-w-0 flex-1">
            {/* Title */}
            {title && !breadcrumbs.length && (
              <h1 className="text-lg font-semibold text-foreground truncate">
                {title}
              </h1>
            )}
            
            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink
                            asChild={!!onBreadcrumbNavigate}
                            {...(onBreadcrumbNavigate 
                              ? {
                                  onClick: (e: React.MouseEvent) => {
                                    e.preventDefault();
                                    onBreadcrumbNavigate(crumb.href!);
                                  }
                                }
                              : { href: crumb.href }
                            )}
                          >
                            {onBreadcrumbNavigate ? (
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
            )}
          </div>
        </div>
        
        {/* Header Actions */}
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
});

AdminHeader.displayName = 'AdminHeader';

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

const AdminContent = forwardRef<HTMLElement, AdminContentProps>(({
  tone,
  size,
  className,
  children,
}, ref) => {
  const { isMobile } = useAdmin();

  return (
    <main 
      ref={ref}
      className={cn(
        'flex-1 min-w-0 overflow-auto',
        className
      )}
    >
      <div className="">
        <div className="w-full mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
});

AdminContent.displayName = 'AdminContent';

/**
 * Hook to access admin configuration
 */
const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminLayout component');
  }
  return context;
};

/**
 * AdminLayout - COMPOUND-ONLY Component
 */
const AdminLayout = Object.assign(AdminLayoutRoot, {
  Sidebar: AdminSidebar,
  Header: AdminHeader,
  Content: AdminContent,
});

/**
 * Export FIXED AdminLayout
 */
export { 
  AdminLayout,
  AdminSidebar,
  AdminHeader,
  AdminContent,
  useAdmin
};