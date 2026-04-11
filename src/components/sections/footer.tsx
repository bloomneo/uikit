/**
 * Footer component with standardized prop naming and tone system
 * @module @bloomneo/uikit
 * @file src/components/sections/footer.tsx
 */

import * as React from 'react';
import { forwardRef, createContext, useContext } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Size, NavigationItem } from '@/types';

/**
 * Footer context for sharing configuration
 */
const FooterContext = createContext<{
  tone: 'clean' | 'subtle' | 'brand' | 'contrast';
  size: Size;
}>({
  tone: 'contrast',
  size: 'xl',
});

/**
 * Footer variants with tone-based semantic colors
 */
const footerVariants = cva(
  'w-full border-t transition-all duration-200',
  {
    variants: {
      tone: {
      clean: 'bg-background/80 backdrop-blur-sm border-border/40 text-foreground',
      subtle: 'bg-muted/50 backdrop-blur-sm border-border/30 text-foreground', 
      brand: 'bg-primary border-primary-foreground/20 text-primary-foreground',
      contrast: 'bg-zinc-900 border-zinc-700/40 text-zinc-100'
    },
      position: {
        sticky: 'sticky bottom-0 z-30',
        fixed: 'fixed bottom-0 left-0 right-0 z-30',
        relative: 'relative'
      }
    },
    defaultVariants: {
      tone: 'contrast',
      position: 'relative'
    }
  }
);

/**
 * Container variants for responsive sizing
 */
const containerVariants = cva(
  'mx-auto',
  {
    variants: {
      size: {
        sm: 'max-w-2xl py-4 px-4',
        md: 'max-w-4xl py-5 px-4 sm:px-6',
        lg: 'max-w-6xl py-6 px-4 sm:px-6 lg:px-8',
        xl: 'max-w-7xl py-6 px-4 sm:px-6 lg:px-8',
        full: 'max-w-full py-8 px-4 sm:px-6 lg:px-8'
      }
    },
    defaultVariants: {
      size: 'xl'
    }
  }
);

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
 * Main Footer component with standardized props
 */
const FooterComponent = forwardRef<HTMLElement, FooterProps>(({ 
  className,
  tone = 'contrast',
  size = 'xl',
  position = 'relative',
  navigation = [],
  currentPath = '',
  onNavigate,
  children,
  ...props 
}, ref) => {
  return (
    <FooterContext.Provider value={{ tone, size }}>
      <footer
        ref={ref}
        className={cn(footerVariants({ tone, position }), className)}
        {...props}
      >
        <div className={cn(containerVariants({ size }))}>
          {/* Auto-render navigation if provided */}
          {navigation.length > 0 && !children && (
            <FooterBasic 
              navigation={navigation}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          )}
          {children}
        </div>
      </footer>
    </FooterContext.Provider>
  );
});

FooterComponent.displayName = 'Footer';

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
const FooterBasic = forwardRef<HTMLDivElement, FooterBasicProps>(({
  className,
  navigation = [],
  currentPath = '',
  onNavigate,
  logo,
  social,
  copyright,
  ...props
}, ref) => {
  const { tone } = useContext(FooterContext);

  // Handle navigation click
  const handleItemClick = (item: NavigationItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href, item);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  // Get tone-specific link styles
  const getLinkStyles = (isActive = false) => {
    const baseStyles = 'text-sm transition-colors cursor-pointer';
    
    switch (tone) {
      case 'subtle':
        return cn(baseStyles, isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground');
      case 'brand':
        return cn(baseStyles, isActive ? 'text-primary-foreground' : 'text-primary-foreground/80 hover:text-primary-foreground');
      case 'contrast':
        return cn(baseStyles, isActive ? 'text-zinc-100' : 'text-zinc-300 hover:text-zinc-100');
      default:
        return cn(baseStyles, isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground');
    }
  };

  return (
    <div 
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    >
      {/* Main row with logo, links, and social */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        {logo && (
          <div className="flex-shrink-0">
            {logo}
          </div>
        )}

        {/* Navigation Links */}
        {navigation.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navigation.map((item) => {
              const isActive = item.href ? currentPath === item.href : item.isActive;
              
              return (
                <button
                  key={item.key}
                  onClick={() => handleItemClick(item)}
                  className={cn(getLinkStyles(isActive), item.className)}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Social Links */}
        {social && (
          <div className="flex-shrink-0">
            {social}
          </div>
        )}
      </div>

      {/* Copyright */}
      {copyright && (
        <>
          <Separator className={cn(
            tone === 'brand' && 'bg-primary-foreground/20',
            tone === 'contrast' && 'bg-zinc-700'
          )} />
          <div className="text-center">
          <p className={cn(
            'text-sm',
            tone === 'contrast' && 'text-zinc-400',
            tone === 'brand' && 'text-primary-foreground/80',
            (tone === 'clean' || tone === 'subtle') && 'text-muted-foreground'
          )}>
            {copyright}
          </p>
        </div>
        </>
      )}
    </div>
  );
});

FooterBasic.displayName = 'FooterBasic';

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
const FooterAdvanced = forwardRef<HTMLDivElement, FooterAdvancedProps>(({
  className,
  brand,
  columns = [],
  newsletter,
  social,
  legal = [],
  currentPath = '',
  onNavigate,
  copyright,
  ...props
}, ref) => {
  const { tone } = useContext(FooterContext);

  // Handle navigation click
  const handleItemClick = (item: NavigationItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href, item);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  // Get tone-specific styles
  const getTextStyles = () => {
    switch (tone) {
      case 'subtle':
        return {
          heading: 'text-foreground',
          text: 'text-muted-foreground',
          link: 'text-muted-foreground hover:text-foreground'
        };
      case 'brand':
        return {
          heading: 'text-primary-foreground',
          text: 'text-primary-foreground/70',
          link: 'text-primary-foreground/70 hover:text-primary-foreground'
        };
      case 'contrast':
        return {
          heading: 'text-zinc-100',
          text: 'text-zinc-300',
          link: 'text-zinc-300 hover:text-zinc-100'
        };
      default:
        return {
          heading: 'text-foreground',
          text: 'text-muted-foreground',
          link: 'text-muted-foreground hover:text-foreground'
        };
    }
  };

  const styles = getTextStyles();

  return (
    <div 
      ref={ref}
      className={cn('space-y-8', className)}
      {...props}
    >
      {/* LEVEL 1: Brand (30%) + Menu Container (70%) Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-6">
        
        {/* Brand Section - 30% width on md+ */}
        {brand && (
           <div className="col-span-2"> {brand}</div>
        )}

        {/* Menu Container - 70% width on md+ */}
          <div className="col-span-4">
            {/* LEVEL 2: Intelligent Menu Columns Grid (0-4 columns) */}
          {columns.length > 0 && (
            <div className={cn(
              "grid gap-6",
              // No columns: hidden
              columns.length === 0 && "hidden",
              // 1 column: single column
              columns.length === 1 && "grid-cols-1",
              // 2 columns: responsive 1→2
              columns.length === 2 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3",
              // 3 columns: responsive 1→2→3
              columns.length === 3 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
              // 4+ columns: responsive 1→2→4
              columns.length >= 4 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            )}>
              {columns.slice(0, 4).map((column) => (
                <div key={column.key} className="space-y-3">
                  <h4 className={cn('text-sm font-semibold', styles.heading)}>
                    {column.title}
                  </h4>
                  <ul className="space-y-2">
                    {column.items?.map((item) => {
                      const isActive = item.href ? currentPath === item.href : item.isActive;
                      
                      return (
                        <li key={item.key}>
                          <button
                            onClick={() => handleItemClick(item)}
                            className={cn(
                              'text-sm transition-colors cursor-pointer block',
                              isActive ? styles.heading : styles.link,
                              item.className
                            )}
                          >
                            {item.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
          </div>
          

         
        </div>

      {/* Bottom Section - Legal + Copyright + Social */}
      <div className="space-y-4">
        <Separator className={cn(
          tone === 'brand' && 'bg-primary-foreground/20',
          tone === 'contrast' && 'bg-zinc-700'
        )} />
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          {copyright && (
            <p className={cn('text-sm', styles.text)}>
              {copyright}
            </p>
          )}

          {/* Legal Links */}
          {legal.length > 0 && (
            <div className="flex items-center gap-4">
              {legal.map((item) => {
                const isActive = item.href ? currentPath === item.href : item.isActive;
                
                return (
                  <button
                    key={item.key}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      'text-sm transition-colors cursor-pointer',
                      isActive ? styles.heading : styles.link,
                      item.className
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Social Links */}
          {social && (
            <div className="flex items-center gap-2">
              {social}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

FooterAdvanced.displayName = 'FooterAdvanced';

/**
 * Social link interface
 */
export interface SocialLink {
  /** Unique key */
  key: string;
  /** Accessibility label */
  label: string;
  /** Icon component */
  icon: React.ComponentType<{ className?: string }>;
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
const FooterSocial = forwardRef<HTMLDivElement, FooterSocialProps>(({
  className,
  links = [],
  ...props
}, ref) => {
  const { tone } = useContext(FooterContext);

  const getButtonStyles = () => {
    switch (tone) {
      case 'subtle':
        return 'text-muted-foreground hover:text-foreground hover:bg-background/50';
      case 'brand':
        return 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10';
      case 'contrast':
        return 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50';
      default:
        return 'text-muted-foreground hover:text-foreground hover:bg-muted';
    }
  };

  return (
    <div 
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {links.map((link) => (
        <Button
          key={link.key}
          variant="ghost"
          size="icon"
          className={cn('h-8 w-8 cursor-pointer', getButtonStyles(), link.className)}
          onClick={link.onClick}
          title={link.label}
        >
          <link.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
});

FooterSocial.displayName = 'FooterSocial';

/**
 * Footer with compound components
 */
const Footer = Object.assign(FooterComponent, {
  Basic: FooterBasic,
  Advanced: FooterAdvanced,
  Social: FooterSocial,
});

/**
 * Export Footer with compound components and individual components
 */
export { 
  Footer,
  FooterBasic,
  FooterAdvanced,
  FooterSocial
};