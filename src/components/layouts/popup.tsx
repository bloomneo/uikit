/**
 * Popup Layout with standardized scheme + tone system
 * @module @bloomneo/uikit
 * @file src/components/layouts/popup.tsx
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, ChevronLeft, MoreVertical, Settings } from 'lucide-react';
import type { Size, PopupLayoutScheme, Tone } from '@/types';

/**
 * Popup layout scheme variants - structural arrangements
 */
const popupVariants = cva(
  'flex flex-col border rounded-lg overflow-hidden',
  {
    variants: {
      scheme: {
        modal: 'shadow-lg',
        drawer: 'shadow-md h-full rounded-none',
        floating: 'shadow-xl',
      },
      tone: {
        clean: 'bg-background border-border',
        subtle: 'bg-muted/30 border-border/50',
        brand: 'bg-primary/5 border-primary/20',
        contrast: 'bg-zinc-900 border-zinc-700 text-zinc-100'
      },
      size: {
        sm: 'w-72 max-h-80',      // 288px × 320px - Ultra compact
        md: 'w-80 max-h-96',      // 320px × 384px - Standard popup
        lg: 'w-96 max-h-[32rem]', // 384px × 512px - Large popup
        xl: 'w-[28rem] max-h-[36rem]', // 448px × 576px - Extra large
        full: 'min-w-72 max-w-lg max-h-[80vh]' // Responsive
      },
      position: {
        sticky: 'sticky top-0 z-50',
        fixed: 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
        relative: 'relative'
      }
    },
    defaultVariants: {
      scheme: 'modal',
      tone: 'clean',
      size: 'md',
      position: 'relative'
    }
  }
);

/**
 * Header variants based on popup tone
 */
const headerVariants = cva(
  'flex items-center gap-3',
  {
    variants: {
      tone: {
        clean: '',
        subtle: '',
        brand: '',
        contrast: ''
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
        xl: 'p-4',
        full: 'p-4'
      }
    },
    defaultVariants: {
      tone: 'clean',
      size: 'md'
    }
  }
);

/**
 * Content variants based on popup tone and size
 */
const contentVariants = cva(
  'flex-1',
  {
    variants: {
      tone: {
        clean: '',
        subtle: '',
        brand: '',
        contrast: ''
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
        xl: 'p-4',
        full: 'p-4'
      },
      scrollable: {
        true: 'overflow-y-auto overflow-x-hidden',
        false: ''
      }
    },
    defaultVariants: {
      tone: 'clean',
      size: 'md',
      scrollable: true
    }
  }
);

/**
 * Footer variants
 */
const footerVariants = cva(
  'border-t',
  {
    variants: {
      tone: {
        clean: 'border-border',
        subtle: 'border-border/50',
        brand: 'border-primary/20',
        contrast: 'border-zinc-700'
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
        xl: 'p-4',
        full: 'p-4'
      }
    },
    defaultVariants: {
      tone: 'clean',
      size: 'md'
    }
  }
);

/**
 * Button variants for popup actions
 */
const buttonVariants = cva(
  'h-8 w-8 p-0 shrink-0',
  {
    variants: {
      tone: {
        clean: 'text-muted-foreground hover:text-foreground hover:bg-muted',
        subtle: 'text-muted-foreground hover:text-foreground hover:bg-background/50',
        brand: 'text-primary/80 hover:text-primary hover:bg-primary/10',
        contrast: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
      }
    },
    defaultVariants: {
      tone: 'clean'
    }
  }
);

/**
 * Title variants based on size
 */
const titleVariants = cva(
  'font-semibold truncate',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-base',
        full: 'text-base'
      },
      tone: {
        clean: 'text-foreground',
        subtle: 'text-foreground',
        brand: 'text-foreground',
        contrast: 'text-zinc-100'
      }
    },
    defaultVariants: {
      size: 'md',
      tone: 'clean'
    }
  }
);

/**
 * Subtitle variants
 */
const subtitleVariants = cva(
  'truncate mt-0.5',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-sm',
        full: 'text-sm'
      },
      tone: {
        clean: 'text-muted-foreground',
        subtle: 'text-muted-foreground',
        brand: 'text-muted-foreground',
        contrast: 'text-zinc-400'
      }
    },
    defaultVariants: {
      size: 'md',
      tone: 'clean'
    }
  }
);

/**
 * Popup Layout props with standardized system
 */
export interface PopupLayoutProps {
  /** Layout structure/arrangement */
  scheme?: PopupLayoutScheme;
  /** Visual styling tone */
  tone?: Tone;
  /** Popup size */
  size?: Size;
  /** Popup positioning */
  position?: 'sticky' | 'fixed' | 'relative';
  /** Header title text */
  title?: string;
  /** Header subtitle text */
  subtitle?: string;
  /** Logo/icon component */
  logo?: React.ReactNode;
  /** Status badge */
  badge?: React.ReactNode;
  /** Header action buttons */
  headerActions?: React.ReactNode;
  /** Show back button */
  showBack?: boolean;
  /** Show close button */
  showClose?: boolean;
  /** Show header divider */
  showDivider?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Close button handler */
  onClose?: () => void;
  /** Footer content */
  footer?: React.ReactNode;
  /** Enable content scrolling */
  scrollable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Main content */
  children: React.ReactNode;
}

/**
 * PopupLayout - Compact layout with standardized scheme + tone system
 */
const PopupLayoutComponent = forwardRef<HTMLDivElement, PopupLayoutProps>(({
  scheme = 'modal',
  tone = 'clean',
  size = 'md',
  position = 'relative',
  title,
  subtitle,
  logo,
  badge,
  headerActions,
  showBack = false,
  showClose = false,
  showDivider = true,
  onBack,
  onClose,
  footer,
  scrollable = true,
  className,
  style,
  children,
}, ref) => {

  const hasHeader = title || subtitle || logo || badge || headerActions || showBack || showClose;

  return (
    <div
      ref={ref}
      className={cn(popupVariants({ scheme, tone, size, position }), className)}
      style={style}
    >
      {/* Header */}
      {hasHeader && (
        <>
          <div className={cn(headerVariants({ tone, size }))}>
            {/* Back Button */}
            {showBack && (
              <Button
                variant="ghost"
                className={cn(buttonVariants({ tone }))}
                onClick={onBack}
                aria-label="Go back"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}

            {/* Logo */}
            {logo && (
              <div className="shrink-0">
                {logo}
              </div>
            )}

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              {title && (
                <div className="flex items-center gap-2">
                  <h1 className={cn(titleVariants({ size, tone }))}>
                    {title}
                  </h1>
                  {badge && badge}
                </div>
              )}
              {subtitle && (
                <p className={cn(subtitleVariants({ size, tone }))}>
                  {subtitle}
                </p>
              )}
            </div>

            {/* Header Actions */}
            {headerActions && (
              <div className="shrink-0 flex items-center gap-1">
                {headerActions}
              </div>
            )}

            {/* Close Button */}
            {showClose && (
              <Button
                variant="ghost"
                className={cn(buttonVariants({ tone }))}
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {showDivider && <Separator className={cn(
            tone === 'subtle' && 'bg-border/50',
            tone === 'brand' && 'bg-primary/20',
            tone === 'contrast' && 'bg-zinc-700'
          )} />}
        </>
      )}

      {/* Content */}
      <div
        className={cn(
          contentVariants({ tone, size, scrollable }),
          !hasHeader && headerVariants({ tone, size })
        )}
      >
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <>
          <Separator className={cn(
            tone === 'subtle' && 'bg-border/50',
            tone === 'brand' && 'bg-primary/20',
            tone === 'contrast' && 'bg-zinc-700'
          )} />
          <div className={cn(footerVariants({ tone, size }))}>
            {footer}
          </div>
        </>
      )}
    </div>
  );
});

PopupLayoutComponent.displayName = 'PopupLayout';

/**
 * PopupHeader - Standalone header component
 */
export interface PopupHeaderProps {
  tone?: Tone;
  size?: Size;
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  showBack?: boolean;
  showClose?: boolean;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

const PopupHeader = forwardRef<HTMLDivElement, PopupHeaderProps>(({
  tone = 'clean',
  size = 'md',
  title,
  subtitle,
  logo,
  badge,
  actions,
  showBack = false,
  showClose = false,
  onBack,
  onClose,
  className,
}, ref) => {
  return (
    <div ref={ref} className={cn(headerVariants({ tone, size }), className)}>
      {showBack && (
        <Button variant="ghost" className={cn(buttonVariants({ tone }))} onClick={onBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {logo && <div className="shrink-0">{logo}</div>}

      <div className="flex-1 min-w-0">
        {title && (
          <div className="flex items-center gap-2">
            <h1 className={cn(titleVariants({ size, tone }))}>{title}</h1>
            {badge && badge}
          </div>
        )}
        {subtitle && (
          <p className={cn(subtitleVariants({ size, tone }))}>{subtitle}</p>
        )}
      </div>

      {actions && <div className="shrink-0">{actions}</div>}

      {showClose && (
        <Button variant="ghost" className={cn(buttonVariants({ tone }))} onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
});

PopupHeader.displayName = 'PopupHeader';

/**
 * PopupContent - Scrollable content container
 */
export interface PopupContentProps {
  tone?: Tone;
  size?: Size;
  scrollable?: boolean;
  className?: string;
  children: React.ReactNode;
}

const PopupContent = forwardRef<HTMLDivElement, PopupContentProps>(({
  tone = 'clean',
  size = 'md',
  scrollable = true,
  className,
  children,
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(contentVariants({ tone, size, scrollable }), className)}
    >
      {children}
    </div>
  );
});

PopupContent.displayName = 'PopupContent';

/**
 * PopupFooter - Footer actions container
 */
export interface PopupFooterProps {
  tone?: Tone;
  size?: Size;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const PopupFooter = forwardRef<HTMLDivElement, PopupFooterProps>(({
  tone = 'clean',
  size = 'md',
  actions,
  className,
  children,
}, ref) => {
  return (
    <div ref={ref} className={cn(footerVariants({ tone, size }), className)}>
      {actions || children}
    </div>
  );
});

PopupFooter.displayName = 'PopupFooter';

/**
 * PopupLayout with compound components
 */
const PopupLayout = Object.assign(PopupLayoutComponent, {
  Header: PopupHeader,
  Content: PopupContent,
  Footer: PopupFooter,
});

export { 
  PopupLayout,
  PopupHeader,
  PopupContent,
  PopupFooter
};