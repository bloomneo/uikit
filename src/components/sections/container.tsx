/**
 * Container component with FIXED sidebar layout - properly side-by-side
 * @module @bloomneo/uikit
 * @file src/components/sections/container.tsx
 */

import * as React from 'react';
import { forwardRef, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import type { NavigationItem, Size } from '@/types';

/**
 * Container variants - FIXED layout for proper side-by-side positioning
 */
const containerVariants = cva(
  'w-full mx-auto bg-background text-foreground',
  {
    variants: {
      layout: {
        none: 'block',
        'sidebar-left': 'block md:flex', // ✅ FIXED: Always flex for side-by-side
        'sidebar-right': 'block md:flex', // ✅ FIXED: Always flex for side-by-side
      },
      size: {
        sm: 'max-w-2xl',
        md: 'max-w-4xl', 
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        full: 'max-w-full',
      },
      position: {
        sticky: 'relative',
        fixed: 'relative',
        relative: 'relative'
      }
    },
    defaultVariants: {
      layout: 'none',
      size: 'xl',
      position: 'relative'
    },
  }
);

/**
 * Sidebar variants - OPTIMIZED spacing and alignment
 */
const sidebarVariants = cva(
  // `hidden md:block` — on small screens the sidebar is swapped for the
  // `<BottomTabSheet>` rendered below. Below the `md` breakpoint the desktop
  // sidebar is not rendered visibly, and the bottom-nav (which renders the
  // same `NavigationItem[]`) takes its place. Both components are always
  // present in the DOM so the swap is pure CSS — no hydration flash and no
  // JS breakpoint check needed at render time.
  'hidden md:block flex-shrink-0 rounded-lg m-4',
  {
    variants: {
      position: {
        left: 'order-first',
        right: 'order-last',
      },
      size: {
        sm: 'w-48', // ✅ FIXED: Removed responsive prefixes for consistent width
        md: 'w-56',
        lg: 'w-64', 
        xl: 'w-64',
        full: 'w-64',
      },
      sidebarPosition: {
        sticky: 'sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto', // ✅ FIXED: Added self-start
        fixed: 'sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto', // ✅ FIXED: Added self-start  
        relative: 'self-start', // ✅ FIXED: Added self-start
      },
      tone: {
        clean: 'bg-muted/10 border border-border/60 dark:bg-muted/20 dark:border-border/50',
        subtle: 'bg-muted/50 border border-border/20 dark:bg-muted/60 dark:border-border/30',
        brand: 'bg-primary/10 border border-primary/15 dark:bg-primary/15 dark:border-primary/20',
        contrast: 'bg-muted/70 border border-border/50 dark:bg-muted/80 dark:border-border/60'
      }
    },
    defaultVariants: {
      position: 'left',
      size: 'md',
      sidebarPosition: 'relative',
      tone: 'clean'
    },
  }
);

/**
 * Main content variants - OPTIMIZED for consistent padding and reduced gap
 */
const mainVariants = cva(
  'flex-1 min-w-0 p-4', // ✅ OPTIMIZED: Constant p-4 padding, removed min-w-0 conflict
  {
    variants: {
      size: {
        sm: '', // ✅ OPTIMIZED: Removed size-based padding, using constant p-4
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
      hasGap: {
        true: '', // ✅ OPTIMIZED: Removed ml-6, using sidebar m-4 instead
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      hasGap: false
    },
  }
);

/**
 * Size configuration for navigation
 */
const getSizeConfig = (size: Size = 'md') => {
  const configs = {
    sm: {
      button: 'text-xs py-1.5 px-2 min-h-[28px]',
      icon: 'h-3 w-3 mr-2 flex-shrink-0',
      spacing: 'space-y-0.5',
      showBadges: false,
    },
    md: {
      button: 'text-sm py-2 px-3 min-h-[32px]',
      icon: 'h-4 w-4 mr-2 flex-shrink-0',
      spacing: 'space-y-1',
      showBadges: true,
    },
    lg: {
      button: 'text-sm py-2.5 px-4 min-h-[36px]',
      icon: 'h-4 w-4 mr-3 flex-shrink-0',
      spacing: 'space-y-1.5',
      showBadges: true,
    },
    xl: {
      button: 'text-sm py-2.5 px-4 min-h-[36px]',
      icon: 'h-4 w-4 mr-3 flex-shrink-0',
      spacing: 'space-y-1.5',
      showBadges: true,
    },
    full: {
      button: 'text-sm py-2.5 px-4 min-h-[36px]',
      icon: 'h-4 w-4 mr-3 flex-shrink-0',
      spacing: 'space-y-1.5',
      showBadges: true,
    },
  };
  
  return configs[size] || configs.md;
};

/**
 * Navigation renderer props
 */
interface NavigationRendererProps {
  navigation: NavigationItem[];
  size: Size;
  tone: 'clean' | 'subtle' | 'brand' | 'contrast';
  currentPath?: string;
  onNavigate?: (href: string, item: NavigationItem) => void;
}

/**
 * Navigation renderer component
 */
function NavigationRenderer({ 
  navigation, 
  size = 'md',
  tone,
  currentPath = '',
  onNavigate 
}: NavigationRendererProps) {
  const [expandedItems, setExpandedItems] = useState(new Set<string>());
  const config = getSizeConfig(size);

  // Initialize with all expandable items open
  useEffect(() => {
    const expanded = new Set<string>();
    
    const addExpandableItems = (navItems: NavigationItem[]) => {
      navItems.forEach((item) => {
        if (item.items && item.items.length > 0) {
          expanded.add(item.key);
          addExpandableItems(item.items);
        }
      });
    };
    
    addExpandableItems(navigation);
    setExpandedItems(expanded);
  }, [navigation]);

  const toggleExpanded = (itemKey: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemKey)) {
      newExpanded.delete(itemKey);
    } else {
      newExpanded.add(itemKey);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.items && item.items.length > 0) {
      toggleExpanded(item.key);
    } else if (item.href && onNavigate) {
      onNavigate(item.href, item);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const renderNavItem = (item: NavigationItem, depth = 0): React.ReactNode => {
    const hasSubItems = item.items && item.items.length > 0;
    const isExpanded = expandedItems.has(item.key);
    const isActive = item.href ? currentPath === item.href : item.isActive;

    return (
      <div key={item.key} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start transition-all items-center cursor-pointer',
            config.button,
            depth > 0 && 'ml-4 w-[calc(100%-1rem)]',
            // Tone-aware styling
            tone === 'clean' && (isActive 
              ? 'bg-muted text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'),
            tone === 'subtle' && (isActive 
              ? 'bg-background text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-background/60'),
            tone === 'brand' && (isActive 
              ? 'bg-primary/10 text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'),
            tone === 'contrast' && (isActive 
              ? 'bg-muted text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'),
            item.className
          )}
          onClick={() => handleItemClick(item)}
        >
          {item.icon && <item.icon className={config.icon} />}
          <span className="flex-1 text-left truncate">{item.label}</span>
          
          {item.badge && config.showBadges && (
            <Badge variant="secondary" className="text-xs ml-auto">
              {item.badge}
            </Badge>
          )}
          
          {hasSubItems && (
            <ChevronRight 
              className={cn(
                'h-4 w-4 ml-2 transition-transform duration-200 text-muted-foreground',
                isExpanded && 'rotate-90'
              )} 
            />
          )}
        </Button>
        
        {hasSubItems && isExpanded && item.items && (
          <div className="mt-1 space-y-1">
            {item.items.map((subItem) =>
              renderNavItem(subItem, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn('w-full p-3', config.spacing)}>
      {navigation.map((item) => renderNavItem(item))}
    </nav>
  );
}

/**
 * Container Sidebar props
 */
interface ContainerSidebarProps {
  content?: React.ReactNode | NavigationItem[];
  position?: 'left' | 'right';
  size?: Size;
  sidebarPosition?: 'sticky' | 'fixed' | 'relative';
  tone?: 'clean' | 'subtle' | 'brand' | 'contrast';
  currentPath?: string;
  onNavigate?: (href: string, item: NavigationItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Container Sidebar component
 */
const ContainerSidebar = forwardRef<HTMLDivElement, ContainerSidebarProps>(({ 
  content,
  position = 'left',
  size = 'md',
  sidebarPosition = 'relative',
  tone = 'clean',
  currentPath = '',
  onNavigate,
  className,
  style,
}, ref) => {
  
  if (!content) return null;

  // Render content based on type
  const renderContent = () => {
    if (Array.isArray(content)) {
      return (
        <NavigationRenderer 
          navigation={content} 
          size={size}
          tone={tone}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      );
    }
    return <div className="p-3">{content}</div>;
  };

  return (
    <aside 
      ref={ref}
      className={cn(
        sidebarVariants({ position, size, sidebarPosition, tone }),
        className
      )}
      style={style}
    >
      {renderContent()}
    </aside>
  );
});

ContainerSidebar.displayName = 'ContainerSidebar';

/**
 * Props for the mobile bottom-tab navigation. Internal helper — not exported.
 */
interface BottomTabSheetProps {
  navigation: NavigationItem[];
  currentPath?: string;
  onNavigate?: (href: string, item: NavigationItem) => void;
  tone: 'clean' | 'subtle' | 'brand' | 'contrast';
  size: Size;
}

/**
 * `<BottomTabSheet>` — mobile-only replacement for the desktop sidebar.
 *
 * Renders the same `NavigationItem[]` the sidebar uses, but as:
 *   - a fixed bottom bar showing the first 4 items (icon + short label)
 *   - a "More" tab that opens a slide-up `<Sheet side="bottom">` with the
 *     full navigation tree (reuses `NavigationRenderer`, so submenus and
 *     badges behave exactly the same as the desktop sidebar)
 *
 * Visibility is CSS-driven (`md:hidden`) so the swap between sidebar and
 * bottom-nav happens purely on the CSS breakpoint — no JS-media-query
 * state, no hydration flash. Both components live in the DOM; only one
 * paints at a time.
 *
 * Safe-area insets: `padding-bottom: env(safe-area-inset-bottom)` so the
 * bar clears the home-indicator on notched iOS devices. The content
 * spacer below matches.
 */
function BottomTabSheet({
  navigation,
  currentPath,
  onNavigate,
  tone,
  size,
}: BottomTabSheetProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  // First 4 items become tabs in the bar. Anything beyond (or any items at
  // all if we have more than 4) gets folded into the "More" sheet along with
  // every submenu. This mirrors rrdplanners' UX and matches how iOS TabBars
  // typically cap at 5 slots.
  const MAX_TABS = 4;
  const primary = navigation.slice(0, MAX_TABS);
  const overflow = navigation.slice(MAX_TABS);
  const hasOverflow = overflow.length > 0;

  const handlePrimaryClick = (item: NavigationItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href, item);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  const renderTab = (item: NavigationItem) => {
    const isActive = item.href ? currentPath === item.href : Boolean(item.isActive);
    const Icon = item.icon;
    // First word only in the bar — keeps labels short enough to not wrap at
    // narrow widths (320px / 4 tabs = 80px each). Callers who need a richer
    // label can still use the full one in the overflow sheet.
    const shortLabel = item.label.split(' ')[0];
    return (
      <button
        key={item.key}
        type="button"
        onClick={() => handlePrimaryClick(item)}
        className={cn(
          'flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 px-1',
          'transition-colors duration-150',
          isActive
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        <span className="text-[10px] font-medium truncate w-full text-center">
          {shortLabel}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Fixed bottom bar — swapped in for the sidebar below `md`. */}
      <nav
        className={cn(
          'fixed bottom-0 inset-x-0 z-40 md:hidden',
          'flex items-stretch bg-background border-t border-border',
          'pb-[env(safe-area-inset-bottom)]',
        )}
        aria-label="Primary navigation"
      >
        <div className="flex items-stretch w-full h-[60px]">
          {primary.map(renderTab)}
          {hasOverflow && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    'flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 px-1',
                    'text-muted-foreground hover:text-foreground transition-colors duration-150',
                  )}
                  aria-label="More navigation items"
                >
                  <MoreHorizontal className="h-5 w-5 flex-shrink-0" />
                  <span className="text-[10px] font-medium">More</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="max-h-[85vh] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="pb-6">
                  {/* Reuse NavigationRenderer so submenus, badges, and
                      active-state styling match the desktop sidebar exactly.
                      Wrap onNavigate to also close the sheet after routing. */}
                  <NavigationRenderer
                    navigation={overflow}
                    size={size}
                    tone={tone}
                    currentPath={currentPath}
                    onNavigate={(href, item) => {
                      onNavigate?.(href, item);
                      setSheetOpen(false);
                    }}
                  />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
      {/* Spacer so page content isn't obscured by the fixed bar. Matches the
          bar's height + safe-area padding. Hidden at `md+` where the bar is
          itself hidden. */}
      <div
        aria-hidden="true"
        className="md:hidden h-[60px]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      />
    </>
  );
}

/**
 * Container Main props
 */
interface ContainerMainProps {
  size?: Size;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Container Main content area
 */
const ContainerMain = forwardRef<HTMLDivElement, ContainerMainProps>(({ 
  size = 'md',
  children,
  className,
  style,
}, ref) => (
  <main 
    ref={ref}
    className={cn(mainVariants({ size }), className)}
    style={style}
  >
    {children}
  </main>
));

ContainerMain.displayName = 'ContainerMain';

/**
 * Container component props with standardized system
 */
export interface ContainerProps {
  /** Visual styling tone (applies to sidebar only) */
  tone?: 'clean' | 'subtle' | 'brand' | 'contrast';
  /** Container positioning */
  position?: 'sticky' | 'fixed' | 'relative';
  /** Sidebar position */
  sidebar?: 'none' | 'left' | 'right';
  /** Navigation items (takes priority over sidebarContent) */
  navigation?: NavigationItem[];
  /** Custom sidebar content (for JSX content) */
  sidebarContent?: React.ReactNode;
  /** Current path for active states */
  currentPath?: string;
  /** Navigation handler */
  onNavigate?: (href: string, item: NavigationItem) => void;
  /** Whether sidebar should be sticky */
  sidebarPosition?: 'sticky' | 'fixed' | 'relative';
  /** Container size */
  size?: Size;
  /** Container content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Main Container component with FIXED layout
 */
const ContainerComponent = forwardRef<HTMLDivElement, ContainerProps>(({ 
  className,
  style,
  tone = 'clean',
  position = 'relative',
  sidebar = 'none',
  navigation = [],
  sidebarContent,
  currentPath = '',
  onNavigate,
  sidebarPosition = 'relative',
  size = 'xl',
  children,
}, ref) => {
  
  // Determine layout
  const layout = sidebar === 'left' ? 'sidebar-left' : 
                sidebar === 'right' ? 'sidebar-right' : 'none';
  
  const hasSidebar = sidebar !== 'none' && (navigation.length > 0 || sidebarContent);

  // Determine sidebar content: navigation takes priority
  const finalSidebarContent = navigation.length > 0 ? navigation : sidebarContent;

  // Navigation-array case: we can render the mobile bottom-nav. When the
  // caller passes custom JSX via `sidebarContent` instead of an items array,
  // there's no structured data to flatten into tabs, so the mobile swap
  // is skipped and the custom JSX stays hidden below `md` (same as before).
  const mobileNavItems: NavigationItem[] | null =
    hasSidebar && Array.isArray(finalSidebarContent) ? finalSidebarContent : null;

  return (
    <div
      ref={ref}
      className={cn(containerVariants({ layout, size, position }), className)}
      style={style}
    >
      {/* Left Sidebar — hidden below `md`; bottom-nav below takes over there. */}
      {hasSidebar && sidebar === 'left' && (
        <ContainerSidebar
          content={finalSidebarContent}
          position="left"
          size={size}
          sidebarPosition={sidebarPosition}
          tone={tone}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      )}

      {/* Main Content */}
      <ContainerMain size={size}>
        {children}
      </ContainerMain>
      
      {/* Right Sidebar — same story as left: hidden below `md`. */}
      {hasSidebar && sidebar === 'right' && (
        <ContainerSidebar
          content={finalSidebarContent}
          position="right"
          size={size}
          sidebarPosition={sidebarPosition}
          tone={tone}
          currentPath={currentPath}
          onNavigate={onNavigate}
        />
      )}

      {/* Mobile bottom-tab navigation — CSS-swapped in below the `md`
          breakpoint (sidebar is `hidden md:block`, this is `md:hidden`).
          Only renders when navigation is an items array; custom JSX
          sidebarContent is not lifted into tabs. */}
      {mobileNavItems && (
        <BottomTabSheet
          navigation={mobileNavItems}
          currentPath={currentPath}
          onNavigate={onNavigate}
          tone={tone}
          size={size}
        />
      )}
    </div>
  );
});

ContainerComponent.displayName = 'Container';

/**
 * Container with compound components
 */
const Container = Object.assign(ContainerComponent, {
  Sidebar: ContainerSidebar,
  Main: ContainerMain,
});

/**
 * Export Container with compound components and individual components
 */
export { Container, ContainerSidebar, ContainerMain };