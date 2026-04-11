/**
 * TabBar Section - Mobile bottom navigation tabs
 * @module @bloomneo/uikit
 * @file src/components/sections/tab-bar.tsx
 */

import * as React from 'react';
import { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { NavigationItem, Size, Tone } from '@/types';

/**
 * TabBar variant styles
 */
export type TabBarVariant = 'default' | 'floating' | 'minimal';

/**
 * TabBar container variants
 */
const tabBarVariants = cva(
  'fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
  {
    variants: {
      tone: {
        clean: 'border-border',
        subtle: 'border-muted bg-muted/10',
        brand: 'border-primary/20 bg-primary/5',
        contrast: 'border-zinc-700 bg-zinc-900 text-zinc-100'
      },
      variant: {
        default: '',
        floating: 'bottom-4 left-4 right-4 rounded-2xl border-2 shadow-lg',
        minimal: 'border-0 bg-transparent backdrop-blur-none'
      }
    },
    defaultVariants: {
      tone: 'clean',
      variant: 'default'
    }
  }
);

/**
 * Tab button variants based on size
 */
const tabButtonVariants = cva(
  'flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'px-2 py-1.5 text-[10px] min-w-[50px]',
        md: 'px-2.5 py-2 text-xs min-w-[60px]',
        lg: 'px-3 py-2 text-xs min-w-[70px]',
        xl: 'px-4 py-2.5 text-sm min-w-[80px]',
        full: 'px-4 py-3 text-sm min-w-[90px]'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

/**
 * TabBar Component Props
 */
export interface TabBarProps {
  /** REQUIRED: Navigation tabs */
  tabs: NavigationItem[];
  /** OPTIONAL: Currently active tab ID */
  activeTab?: string;
  /** OPTIONAL: Default active tab ID */
  defaultActiveTab?: string;
  /** OPTIONAL: Tab click handler */
  onTabClick?: (tabId: string) => void;
  /** OPTIONAL: Visual styling tone (default: "clean") */
  tone?: Tone;
  /** OPTIONAL: Tab size (default: "md") */
  size?: Size;
  /** OPTIONAL: Tab bar variant (default: "default") */
  variant?: TabBarVariant;
  /** OPTIONAL: Show labels (default: true) */
  showLabels?: boolean;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
}

/**
 * TabBar - Mobile bottom navigation tabs
 * Supports icons, badges, and multiple visual variants
 *
 * @llm-usage
 * <TabBar
 *   tabs={[
 *     { id: 'home', label: 'Home', icon: <HomeIcon />, badge: 3 },
 *     { id: 'profile', label: 'Profile', icon: <UserIcon /> }
 *   ]}
 *   activeTab="home"
 *   onTabClick={(id) => navigate(`/${id}`)}
 *   tone="clean"
 *   size="md"
 * />
 *
 * @example Default tab bar
 * <TabBar tabs={tabs} activeTab="home" onTabClick={handleTabClick} />
 *
 * @example Floating variant
 * <TabBar tabs={tabs} variant="floating" tone="brand" />
 *
 * @example Minimal (icons only)
 * <TabBar tabs={tabs} variant="minimal" showLabels={false} />
 */
export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(({
  tabs,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onTabClick,
  tone = 'clean',
  size = 'md',
  variant = 'default',
  showLabels = true,
  className,
}, ref) => {
  // Controlled or uncontrolled state
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab || tabs[0]?.key);
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onTabClick?.(tabId);
  };

  return (
    <div ref={ref} className={cn(tabBarVariants({ tone, variant }), className)}>
      <div className={cn(
        'flex items-center',
        variant === 'floating' ? 'justify-around px-2 h-14' : 'justify-around h-16 px-2'
      )}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={cn(
                tabButtonVariants({ size }),
                'relative font-medium',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground active:scale-95'
              )}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon */}
              {tab.icon && (
                <span className={cn(
                  'relative transition-transform',
                  isActive && 'scale-110',
                  size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'
                )}>
                  {React.createElement(tab.icon, {
                    className: size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'
                  })}

                  {/* Badge */}
                  {tab.badge && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-2 -top-2 h-4 min-w-[16px] px-1 text-[10px] font-bold"
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </span>
              )}

              {/* Label */}
              {showLabels && (
                <span className={cn(
                  'truncate max-w-full transition-all',
                  isActive && 'font-semibold'
                )}>
                  {tab.label}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* Safe area for iOS home indicator */}
      {variant !== 'floating' && (
        <div className="h-safe-bottom" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      )}
    </div>
  );
});

TabBar.displayName = 'TabBar';
