/**
 * Blank Layout with simplified scheme system - simple, card, and empty
 * @module @bloomneo/uikit
 * @file src/components/layouts/blank.tsx
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { Size, BlankLayoutScheme, Tone } from '@/types';

/**
 * Blank layout scheme variants - with empty scheme for no layout
 */
const blankVariants = cva(
  '',
  {
    variants: {
      scheme: {
        simple: 'min-h-screen flex items-center justify-center p-4 flex-col',     // Simple centered layout
        card: 'min-h-screen flex items-center justify-center p-4 flex-col',       // Card-based layout
        empty: ''  // No layout styling at all - complete freedom
      },
      tone: {
        clean: 'bg-background',
        subtle: 'bg-muted/20',
        brand: 'bg-primary/5',
        contrast: 'bg-zinc-400'
      }
    },
    defaultVariants: {
      scheme: 'simple',
      tone: 'clean'
    },
    compoundVariants: [
      {
        scheme: 'empty',
        class: '' // Override any tone styles for empty scheme
      }
    ]
  }
);

/**
 * Content container variants based on scheme and size
 */
const contentVariants = cva(
  '',
  {
    variants: {
      scheme: {
        simple: 'w-full space-y-6 text-center',                    // No container styling
        card: 'w-full space-y-6 text-center bg-card border border-border rounded-lg shadow-lg p-8',  // Card styling
        empty: ''  // No content container styling
      },
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-6xl'
      }
    },
    defaultVariants: {
      scheme: 'simple',
      size: 'lg'
    },
    compoundVariants: [
      {
        scheme: 'empty',
        class: '' // Override any size styles for empty scheme
      }
    ]
  }
);

/**
 * Title variant styles based on size and tone
 */
const titleVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-2xl sm:text-3xl',
        md: 'text-3xl sm:text-4xl',
        lg: 'text-4xl sm:text-5xl',
        xl: 'text-5xl sm:text-6xl',
        full: 'text-6xl sm:text-7xl'
      },
      tone: {
        clean: 'text-foreground',
        subtle: 'text-foreground',
        brand: 'text-foreground',
        contrast: 'text-zinc-100'
      }
    },
    defaultVariants: {
      size: 'lg',
      tone: 'clean'
    }
  }
);

/**
 * Subtitle variant styles based on size and tone
 */
const subtitleVariants = cva(
  'max-w-md mx-auto',
  {
    variants: {
      size: {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl',
        xl: 'text-2xl',
        full: 'text-3xl'
      },
      tone: {
        clean: 'text-muted-foreground',
        subtle: 'text-muted-foreground',
        brand: 'text-muted-foreground',
        contrast: 'text-zinc-300'
      }
    },
    defaultVariants: {
      size: 'lg',
      tone: 'clean'
    }
  }
);

/**
 * Footer variant styles based on tone
 */
const footerVariants = cva(
  'text-center mt-8',
  {
    variants: {
      tone: {
        clean: 'text-muted-foreground',
        subtle: 'text-muted-foreground',
        brand: 'text-muted-foreground', 
        contrast: 'text-zinc-400'
      }
    },
    defaultVariants: {
      tone: 'clean'
    }
  }
);

/**
 * Blank Layout props - minimal but essential
 */
export interface BlankLayoutProps {
  /** RECOMMENDED: Layout scheme - simple, card, or empty */
  scheme?: 'simple' | 'card' | 'empty';
  /** RECOMMENDED: Visual styling tone */
  tone?: Tone;
  /** OPTIONAL: Content container size */
  size?: Size;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** REQUIRED: All content goes here */
  children: React.ReactNode;
}

/**
 * BlankLayout - Minimal but essential layout
 */
const BlankLayoutComponent = forwardRef<HTMLDivElement, BlankLayoutProps>(({
  scheme = 'simple',
  tone = 'clean',
  size = 'lg',
  className,
  children,
}, ref) => {

  // For empty scheme, return children with minimal wrapper
  if (scheme === 'empty') {
    return (
      <div ref={ref} className={cn(className)}>
        {children}
      </div>
    );
  }

  // For simple and card schemes, use the layout system
  return (
    <div ref={ref} className={cn(blankVariants({ scheme, tone }), className)}>
      <div className={cn(contentVariants({ scheme, size }))}>
        {children}
      </div>
    </div>
  );
});

BlankLayoutComponent.displayName = 'BlankLayout';

/**
 * BlankLayout - Minimal and essential
 */
const BlankLayout = BlankLayoutComponent;

export { BlankLayout };

/**
 * @llm-rule BlankLayout Usage - Minimal but essential
 * 
 * Simple error page:
 * <BlankLayout scheme="simple" tone="clean">
 *   <h1 className="text-4xl font-bold text-foreground mb-4">404 Not Found</h1>
 *   <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
 *   <Button>Go Home</Button>
 * </BlankLayout>
 * 
 * Card-based maintenance page:
 * <BlankLayout scheme="card" tone="subtle" size="md">
 *   <WrenchIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
 *   <h1 className="text-3xl font-bold mb-2">Under Maintenance</h1>
 *   <p className="text-muted-foreground mb-6">We'll be back soon!</p>
 *   <Button>Notify Me</Button>
 * </BlankLayout>
 * 
 * Empty scheme for complete custom control:
 * <BlankLayout scheme="empty">
 *   <div className="min-h-screen flex">
 *     <div className="w-1/2 bg-blue-600">Custom left side</div>
 *     <div className="w-1/2 bg-white">Custom right side</div>
 *   </div>
 * </BlankLayout>
 * 
 * About page:
 * <BlankLayout scheme="simple" size="xl">
 *   <Logo className="mb-6" />
 *   <h1 className="text-5xl font-bold mb-4">About Us</h1>
 *   <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
 *     Company description and mission statement goes here.
 *   </p>
 * </BlankLayout>
 */