/**
 * SafeArea Section - Safe area wrapper for mobile notch/home indicator
 * @module @bloomneo/uikit
 * @file src/components/sections/safe-area.tsx
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { Tone } from '@/types';

/**
 * SafeArea edges to apply insets
 */
export type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right';

/**
 * SafeArea variants
 */
const safeAreaVariants = cva(
  'w-full',
  {
    variants: {
      tone: {
        clean: '',
        subtle: 'bg-muted/5',
        brand: 'bg-primary/5',
        contrast: 'bg-zinc-900'
      }
    },
    defaultVariants: {
      tone: 'clean'
    }
  }
);

/**
 * SafeArea Component Props
 */
export interface SafeAreaProps {
  /** OPTIONAL: Edges to apply safe area insets (default: all edges) */
  edges?: SafeAreaEdge[];
  /** OPTIONAL: Visual styling tone (default: "clean") */
  tone?: Tone;
  /** OPTIONAL: Use margin instead of padding (default: false) */
  useMargin?: boolean;
  /** OPTIONAL: Additional CSS classes */
  className?: string;
  /** REQUIRED: Content to wrap */
  children: React.ReactNode;
}

/**
 * SafeArea - Wraps content with safe area insets for mobile devices
 * Handles iOS notch, Android punch-hole, and home indicators
 *
 * @llm-usage
 * <SafeArea edges={['top', 'bottom']}>
 *   <AppContent />
 * </SafeArea>
 *
 * @example Full safe area (all edges)
 * <SafeArea>{children}</SafeArea>
 *
 * @example Only top and bottom (common for main content)
 * <SafeArea edges={['top', 'bottom']}>{children}</SafeArea>
 *
 * @example With background tone
 * <SafeArea tone="subtle" edges={['top']}>{children}</SafeArea>
 */
export const SafeArea = forwardRef<HTMLDivElement, SafeAreaProps>(({
  edges = ['top', 'bottom', 'left', 'right'],
  tone = 'clean',
  useMargin = false,
  className,
  children,
}, ref) => {
  // Build inline styles for safe area insets
  const safeAreaStyles: React.CSSProperties = {};
  const property = useMargin ? 'margin' : 'padding';

  if (edges.includes('top')) {
    safeAreaStyles[`${property}Top` as keyof React.CSSProperties] = 'env(safe-area-inset-top)' as any;
  }
  if (edges.includes('bottom')) {
    safeAreaStyles[`${property}Bottom` as keyof React.CSSProperties] = 'env(safe-area-inset-bottom)' as any;
  }
  if (edges.includes('left')) {
    safeAreaStyles[`${property}Left` as keyof React.CSSProperties] = 'env(safe-area-inset-left)' as any;
  }
  if (edges.includes('right')) {
    safeAreaStyles[`${property}Right` as keyof React.CSSProperties] = 'env(safe-area-inset-right)' as any;
  }

  return (
    <div
      ref={ref}
      className={cn(safeAreaVariants({ tone }), className)}
      style={safeAreaStyles}
    >
      {children}
    </div>
  );
});

SafeArea.displayName = 'SafeArea';
