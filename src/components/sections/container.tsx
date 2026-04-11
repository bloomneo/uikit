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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
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
  'flex-shrink-0 rounded-lg m-4 max-md:hidden', // ✅ OPTIMIZED: Added m-4 for consistent outer margin
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

  // ✅ ADD: Flatten navigation for mobile dropdown
  const flattenNavigation = (navItems: NavigationItem[], prefix = ''): Array<{key: string, label: string, item: NavigationItem}> => {
    const flattened: Array<{key: string, label: string, item: NavigationItem}> = [];
    
    navItems.forEach((item) => {
      const label = prefix ? `${prefix} > ${item.label}` : item.label;
      
      if (item.href || item.onClick) {
        flattened.push({ key: item.key, label, item });
      }
      
      if (item.items && item.items.length > 0) {
        flattened.push(...flattenNavigation(item.items, label));
      }
    });
    
    return flattened;
  };

  // ✅ ADD: Mobile dropdown handler
  const handleMobileNavigation = (key: string) => {
    if (!Array.isArray(finalSidebarContent)) return;
    
    const flattenedNav = flattenNavigation(finalSidebarContent);
    const selectedItem = flattenedNav.find(item => item.key === key);
    
    if (selectedItem && onNavigate) {
      if (selectedItem.item.href) {
        onNavigate(selectedItem.item.href, selectedItem.item);
      } else if (selectedItem.item.onClick) {
        selectedItem.item.onClick();
      }
    }
  };

  return (
    <div 
      ref={ref}
      className={cn(containerVariants({ layout, size, position }), className)}
      style={style}
    >
      {/* Left Sidebar */}
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
      
      {/* Main Content with Mobile Dropdown */}
      <ContainerMain size={size}>
        {/* ✅ ADD: Mobile Navigation Dropdown */}
        {hasSidebar && Array.isArray(finalSidebarContent) && (
          <div className="md:hidden mb-4">
            <Select value={flattenNavigation(finalSidebarContent).find(item => item.item.href === currentPath)?.key} onValueChange={handleMobileNavigation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Navigate to..." />
              </SelectTrigger>
              <SelectContent>
                {flattenNavigation(finalSidebarContent).map(({ key, label, item }) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{label}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {children}
      </ContainerMain>
      
      {/* Right Sidebar */}
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