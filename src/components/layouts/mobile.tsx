/**
 * Mobile Layout - Native mobile app layout with tabs/stack navigation
 * @module @bloomneo/uikit
 * @file src/components/layouts/mobile.tsx
 */

import * as React from 'react';
import { forwardRef, createContext, useContext, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Menu } from 'lucide-react';
import type { NavigationItem, Size, Tone } from '@/types';

/**
 * MobileLayout schemes - mobile navigation patterns
 * tabbed: Bottom tab navigation (iOS/Android standard)
 * stack: Stack navigation with back button (detail pages)
 * drawer: Side drawer navigation (hamburger menu)
 */
export type MobileLayoutScheme = 'tabbed' | 'stack' | 'drawer';

/**
 * Mobile context for sharing configuration across compound components
 */
const MobileContext = createContext<{
  scheme: MobileLayoutScheme;
  tone: Tone;
  size: Size;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}>({
  scheme: 'tabbed',
  tone: 'clean',
  size: 'lg',
});

/**
 * Mobile layout container variants
 */
const mobileVariants = cva(
  'min-h-screen flex flex-col bg-background',
  {
    variants: {
      tone: {
        clean: 'bg-background text-foreground',
        subtle: 'bg-muted/5 text-foreground',
        brand: 'bg-primary/5 text-foreground',
        contrast: 'bg-zinc-900 text-zinc-100'
      }
    },
    defaultVariants: {
      tone: 'clean'
    }
  }
);

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
 * MobileLayout Root Component
 * @llm-usage
 * <MobileLayout scheme="tabbed" tone="clean" tabs={[...]}>
 *   <MobileLayout.Header title="Home" />
 *   <MobileLayout.Content>{children}</MobileLayout.Content>
 * </MobileLayout>
 */
const MobileLayoutRoot = forwardRef<HTMLDivElement, MobileLayoutProps>(({
  scheme = 'tabbed',
  tone = 'clean',
  size = 'lg',
  tabs = [],
  defaultTab,
  className,
  children,
}, ref) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  return (
    <MobileContext.Provider value={{ scheme, tone, size, activeTab, setActiveTab }}>
      <div
        ref={ref}
        className={cn(mobileVariants({ tone }), className)}
      >
        {children}
      </div>
    </MobileContext.Provider>
  );
});
MobileLayoutRoot.displayName = 'MobileLayout';

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

const MobileHeader = forwardRef<HTMLDivElement, MobileHeaderProps>(({
  title,
  onBack,
  onMenu,
  actions,
  className,
  children,
}, ref) => {
  const { scheme, tone } = useContext(MobileContext);

  const headerVariants = cva(
    'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    {
      variants: {
        tone: {
          clean: 'border-border',
          subtle: 'border-muted bg-muted/10',
          brand: 'border-primary/20 bg-primary/5',
          contrast: 'border-zinc-700 bg-zinc-900'
        }
      }
    }
  );

  return (
    <div ref={ref} className={cn(headerVariants({ tone }), className)}>
      {/* Safe area for iOS notch */}
      <div className="h-safe-top" style={{ paddingTop: 'env(safe-area-inset-top)' }} />

      <div className="flex h-14 items-center px-4">
        {/* Left section */}
        <div className="flex items-center gap-2">
          {scheme === 'stack' && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          {scheme === 'drawer' && onMenu && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenu}
              className="h-9 w-9 p-0"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>

        {/* Center - Title */}
        <div className="flex-1 text-center">
          {title && (
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          )}
          {children}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </div>
    </div>
  );
});
MobileHeader.displayName = 'MobileLayout.Header';

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

const MobileContent = forwardRef<HTMLDivElement, MobileContentProps>(({
  className,
  noScroll = false,
  children,
}, ref) => {
  const { scheme } = useContext(MobileContext);

  return (
    <div
      ref={ref}
      className={cn(
        'flex-1 w-full',
        !noScroll && 'overflow-y-auto',
        scheme === 'tabbed' && 'pb-16', // Space for tab bar
        className
      )}
    >
      {children}
    </div>
  );
});
MobileContent.displayName = 'MobileLayout.Content';

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

const MobileTabBar = forwardRef<HTMLDivElement, MobileTabBarProps>(({
  tabs,
  onTabClick,
  className,
}, ref) => {
  const { tone, activeTab, setActiveTab } = useContext(MobileContext);

  const handleTabClick = (tabId: string) => {
    setActiveTab?.(tabId);
    onTabClick?.(tabId);
  };

  const tabBarVariants = cva(
    'fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
    {
      variants: {
        tone: {
          clean: 'border-border',
          subtle: 'border-muted bg-muted/10',
          brand: 'border-primary/20 bg-primary/5',
          contrast: 'border-zinc-700 bg-zinc-900'
        }
      }
    }
  );

  return (
    <div ref={ref} className={cn(tabBarVariants({ tone }), className)}>
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors min-w-[60px]',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.icon && (
                <span className="h-5 w-5">
                  {React.createElement(tab.icon, { className: 'h-5 w-5' })}
                </span>
              )}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {/* Safe area for iOS home indicator */}
      <div className="h-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
    </div>
  );
});
MobileTabBar.displayName = 'MobileLayout.TabBar';

/**
 * MobileLayout compound component export
 */
export const MobileLayout = Object.assign(MobileLayoutRoot, {
  Header: MobileHeader,
  Content: MobileContent,
  TabBar: MobileTabBar,
});

/**
 * Hook to access mobile layout context
 */
export const useMobileLayout = () => useContext(MobileContext);
