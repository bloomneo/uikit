/**
 * Header component with proper responsive behavior and light hover colors
 * @module @bloomneo/uikit
 * @file src/components/sections/header.tsx
 */

import * as React from 'react';
import { forwardRef, createContext, useContext, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { NavigationItem, Size } from '@/types';

/**
 * Header context for sharing configuration
 */
const HeaderContext = createContext<{
  tone: 'clean' | 'subtle' | 'brand' | 'contrast';
  size: Size;
}>({
  tone: 'clean',
  size: 'xl',
});

/**
 * Header variants with tone-based semantic colors
 */
const headerVariants = cva(
  'w-full border-b transition-all duration-200 z-40',
  {
    variants: {
      tone: {
        clean: [
          'bg-background/80 backdrop-blur-sm border-border/40 supports-[backdrop-filter]:bg-background/60',
          'text-foreground'
        ],
        subtle: [
          'bg-muted/50 backdrop-blur-sm border-border/30',
          'text-foreground'
        ],
        brand: [
          'bg-primary border-primary-foreground/20',
          'text-primary-foreground'
        ],
        contrast: [
          'bg-zinc-900 border-zinc-700/40',
          'text-zinc-100'
        ]
      },
      position: {
        sticky: 'sticky top-0',
        fixed: 'fixed top-0 left-0 right-0',
        relative: 'relative'
      }
    },
    defaultVariants: {
      tone: 'clean',
      position: 'sticky'
    }
  }
);

/**
 * Container variants for responsive sizing
 */
const containerVariants = cva(
  'mx-auto flex items-center justify-between',
  {
    variants: {
      size: {
        sm: 'max-w-2xl h-12 px-4',
        md: 'max-w-4xl h-14 px-4 sm:px-6',
        lg: 'max-w-6xl h-16 px-4 sm:px-6 lg:px-8',
        xl: 'max-w-7xl h-16 px-4 sm:px-6 lg:px-8',
        full: 'max-w-full h-16 px-4 sm:px-6 lg:px-8'
      }
    },
    defaultVariants: {
      size: 'xl'
    }
  }
);

/**
 * Header component props
 */
export interface HeaderProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  /** Visual styling tone */
  tone?: 'clean' | 'subtle' | 'brand' | 'contrast';
  /** Header size (width + height + padding) */
  size?: Size;
  /** Header positioning */
  position?: 'sticky' | 'fixed' | 'relative';
  /** Header content */
  children: React.ReactNode;
}

/**
 * Main Header component
 */
const HeaderComponent = forwardRef<HTMLElement, HeaderProps>(({ 
  className,
  tone = 'clean',
  size = 'xl',
  position = 'sticky',
  children,
  ...props 
}, ref) => {
  return (
    <HeaderContext.Provider value={{ tone, size }}>
      <header
        ref={ref}
        className={cn(headerVariants({ tone, position }), className)}
        {...props}
      >
        <div className={cn(containerVariants({ size }))}>
          {children}
        </div>
      </header>
    </HeaderContext.Provider>
  );
});

HeaderComponent.displayName = 'Header';

/**
 * Header Logo section props
 */
export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Logo content */
  children: React.ReactNode;
}

/**
 * Header Logo section (always on the left)
 */
const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>(({ 
  className, 
  children, 
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center flex-shrink-0', className)}
    {...props}
  >
    {children}
  </div>
));

HeaderLogo.displayName = 'HeaderLogo';

/**
 * Header Navigation props
 */
export interface HeaderNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Navigation items */
  navigation?: NavigationItem[];
  /** Current path for active states */
  currentPath?: string;
  /** Navigation handler */
  onNavigate?: (href: string, item: NavigationItem) => void;
}

/**
 * Header Navigation with proper responsive behavior
 */
const HeaderNav = forwardRef<HTMLDivElement, HeaderNavProps>(({ 
  navigation = [],
  currentPath = '',
  onNavigate,
  className, 
  ...props 
}, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobileItems, setExpandedMobileItems] = useState(new Set<string>());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { tone } = useContext(HeaderContext);

  // Ensure component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMounted) return;
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setExpandedMobileItems(new Set());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isMounted) return;
    
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen, isMounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    
    if (openDropdown !== null) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [openDropdown]);

  // Handle mobile dropdown toggle
  const toggleMobileDropdown = (key: string) => {
    const newExpanded = new Set(expandedMobileItems);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedMobileItems(newExpanded);
  };

  // Handle navigation click
  const handleItemClick = (item: NavigationItem) => {
    setMobileOpen(false);
    setExpandedMobileItems(new Set());
    setOpenDropdown(null);
    
    if (item.href && onNavigate) {
      onNavigate(item.href, item);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  // Desktop button styles with light hover colors only
  const getDesktopButtonStyles = (isActive = false) => {
    const baseStyles = 'px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center gap-2';
    
    switch (tone) {
  case 'subtle':
    return cn(
      baseStyles,
      'cursor-pointer',
      isActive 
        ? 'bg-background text-foreground shadow-sm' 
        : 'text-muted-foreground hover:text-foreground hover:bg-background/60' // ← CHANGED
    );
  case 'brand':
    return cn(
      baseStyles,
      'cursor-pointer',
      isActive 
        ? 'bg-primary-foreground/20 text-primary-foreground shadow-sm' 
        : 'text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10'
    );
  case 'contrast':
    return cn(
      baseStyles,
      'cursor-pointer', 
      isActive 
        ? 'bg-muted text-foreground shadow-sm' 
        : 'text-muted-background/50 dark:text-muted-foreground hover:text-foreground hover:bg-muted/50' // ← CHANGED
    );
  default: // clean
    return cn(
      baseStyles,
      'cursor-pointer',
      isActive 
        ? 'bg-muted text-foreground shadow-sm' 
        : 'text-foreground hover:text-foreground hover:bg-muted/50'
    );
}
  };

  // Mobile button styles
  const getMobileButtonStyles = (isActive = false) => {
    return cn(
      'w-full flex items-center px-3 py-2 text-left transition-colors duration-200 rounded-lg',
      isActive 
        ? 'bg-secondary text-secondary-foreground' 
        : 'text-foreground hover:text-foreground hover:bg-muted'
    );
  };

  // Mobile toggle button styles
  const getMobileToggleStyles = () => {
    switch (tone) {
      case 'subtle':
        return 'text-muted-foreground hover:text-foreground hover:bg-muted/50';
      case 'brand':
        return 'text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10';
      case 'contrast':
        return 'text-foreground hover:text-foreground hover:bg-muted/50';
      default: // clean
        return 'text-foreground hover:text-foreground hover:bg-muted/50';
    }
  };

  return (
    <div className="flex items-center ml-auto">
      {/* Desktop Navigation - Hidden on mobile, visible on desktop */}
      <nav className={cn('hidden md:flex items-center space-x-1', className)} ref={ref} {...props}>
        {navigation.map((item) => {
          const hasDropdown = item.items && item.items.length > 0;
          const isOpen = openDropdown === item.key;
          const isActive = item.href ? currentPath === item.href : item.isActive;

          return (
            <div key={item.key} className="relative">
              <button
                type="button"
                className={cn(getDesktopButtonStyles(isActive), item.className)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasDropdown) {
                    setOpenDropdown(isOpen ? null : item.key);
                  } else {
                    setOpenDropdown(null);
                    handleItemClick(item);
                  }
                }}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
                {hasDropdown && (
                  <ChevronDown className={cn(
                    'h-3 w-3 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )} />
                )}
              </button>
              
              {/* Desktop Dropdown Menu */}
              {hasDropdown && isOpen && (
                <div 
                  className="absolute top-full left-0 w-48 bg-background border border-border rounded-lg shadow-lg z-50 mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    {item.items?.map((subItem) => {
                      const subIsActive = subItem.href ? currentPath === subItem.href : subItem.isActive;
                      
                      return (
                        <button
                          key={subItem.key}
                          type="button"
                          className={cn(
                            'w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2',
                            'hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none',
                            subIsActive 
                              ? 'bg-muted text-foreground font-medium' 
                              : 'text-foreground'
                          )}
                          onClick={() => {
                            setOpenDropdown(null);
                            handleItemClick(subItem);
                          }}
                        >
                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                          <span>{subItem.label}</span>
                          {subItem.badge && (
                            <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {subItem.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Mobile Toggle Button - Hidden on desktop, visible on mobile */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('md:hidden', getMobileToggleStyles())}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Mobile Navigation Menu - Hidden on desktop, shows on mobile when toggled */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden bg-background border-b border-border/40 shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;
                const isExpanded = expandedMobileItems.has(item.key);
                const isActive = item.href ? currentPath === item.href : item.isActive;

                return (
                  <div key={item.key} className="space-y-1">
                    <button 
                      type="button"
                      className={cn(getMobileButtonStyles(isActive), item.className)}
                      onClick={() => hasSubItems ? toggleMobileDropdown(item.key) : handleItemClick(item)}
                    >
                      {item.icon && <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />}
                      <span className="flex-1 text-sm">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mr-2">
                          {item.badge}
                        </span>
                      )}
                      {hasSubItems && (
                        <ChevronDown className={cn(
                          'h-4 w-4 transition-transform duration-200 flex-shrink-0',
                          isExpanded && 'rotate-180'
                        )} />
                      )}
                    </button>
                    
                    {/* Mobile Submenu */}
                    {hasSubItems && isExpanded && (
                      <div className="ml-6 space-y-1 border-l border-border/30 pl-4">
                        {item.items?.map((subItem) => {
                          const subIsActive = subItem.href ? currentPath === subItem.href : subItem.isActive;
                          
                          return (
                            <button
                              key={subItem.key}
                              type="button"
                              className={cn(
                                'w-full flex items-center px-3 py-2 text-left transition-colors rounded-lg',
                                subIsActive 
                                  ? 'bg-secondary text-secondary-foreground' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                              )}
                              onClick={() => handleItemClick(subItem)}
                            >
                              {subItem.icon && <subItem.icon className="h-3 w-3 mr-3 flex-shrink-0" />}
                              <span className="flex-1 text-sm">{subItem.label}</span>
                              {subItem.badge && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                  {subItem.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

HeaderNav.displayName = 'HeaderNav';

/**
 * Header with compound components
 */
const Header = Object.assign(HeaderComponent, {
  Logo: HeaderLogo,
  Nav: HeaderNav,
});

/**
 * Export Header with compound components and individual components
 */
export { 
  Header,
  HeaderLogo,
  HeaderNav,
  headerVariants,
  containerVariants
};