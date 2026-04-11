/**
 * SafeArea Section - Safe area wrapper for mobile notch/home indicator
 * @module @bloomneo/uikit
 * @file src/components/sections/safe-area.tsx
 */
import * as React from 'react';
import type { Tone } from '@/types';
/**
 * SafeArea edges to apply insets
 */
export type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right';
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
export declare const SafeArea: React.ForwardRefExoticComponent<SafeAreaProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=safe-area.d.ts.map