/**
 * <Motion> — pure CSS entrance animations with zero JS complexity.
 * @module @bloomneo/uikit
 * @file src/components/ui/motion.tsx
 *
 * @llm-rule WHEN: Entrance animations (page load, section reveal, hero animation)
 * @llm-rule AVOID: Using for complex orchestrated animations — use framer-motion directly
 * @llm-rule NOTE: Presets: 'fadeIn' | 'slideInUp' | 'scaleIn' | 'slideInDown' | 'pulse'
 * @llm-rule NOTE: Duration: 'fast' (200ms) | 'normal' (400ms) | 'slow' (700ms). Delay: number (ms)
 * @llm-rule NOTE: `as` prop changes the rendered element (default: 'div'). Supports ref forwarding
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from 'react';
type HTMLElementTagName = keyof React.JSX.IntrinsicElements;
/**
 * Animation presets - maps to CSS classes
 */
export type AnimationPreset = 'fadeIn' | 'slideInUp' | 'scaleIn' | 'slideInDown' | 'pulse';
/**
 * Animation duration options
 */
export type AnimationDuration = 'fast' | 'normal' | 'slow';
/**
 * Animation trigger options
 */
export type AnimationTrigger = 'immediate' | 'hover' | 'inView';
/**
 * Motion component props - ultra-simple
 */
export interface MotionProps extends React.HTMLAttributes<HTMLElement> {
    /** HTML element to render */
    as?: HTMLElementTagName;
    /** Animation preset */
    preset?: AnimationPreset;
    /** Animation duration */
    duration?: AnimationDuration;
    /** Animation delay in milliseconds */
    delay?: number;
    /** Animation trigger */
    trigger?: AnimationTrigger;
    /** Children */
    children: React.ReactNode;
}
/**
 * Ultra-Simple Motion Component - 10/10 LLM Rating
 * Pure CSS animations, zero JavaScript complexity
 */
export declare const Motion: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLElement>>;
/**
 * Loading Spinner - Pure CSS
 */
export interface LoadingSpinnerProps {
    /** Spinner size */
    size?: 'sm' | 'md' | 'lg';
    /** Custom className */
    className?: string;
}
export declare const LoadingSpinner: React.FC<LoadingSpinnerProps>;
/**
 * Reveal component for scroll-triggered animations
 * Uses Intersection Observer with CSS classes
 */
export interface RevealProps {
    /** Animation preset */
    preset?: AnimationPreset;
    /** Animation duration */
    duration?: AnimationDuration;
    /** Animation delay */
    delay?: number;
    /** Container element */
    as?: HTMLElementTagName;
    /** Additional className */
    className?: string;
    /** Children */
    children: React.ReactNode;
}
export declare const Reveal: React.FC<RevealProps>;
/**
 * Hover Animation Component - Pure CSS
 */
export interface HoverProps {
    /** Hover animation effect */
    effect?: 'scale' | 'lift' | 'glow' | 'rotate';
    /** Container element */
    as?: HTMLElementTagName;
    /** Additional className */
    className?: string;
    /** Children */
    children: React.ReactNode;
}
export declare const Hover: React.FC<HoverProps>;
export {};
/**
 * @llm-usage Ultra-Simple Motion Examples (10/10 LLM Rating)
 *
 * Basic animations:
 * <Motion preset="fadeIn" duration="normal">
 *   <div>Fades in immediately</div>
 * </Motion>
 *
 * <Motion preset="slideInUp" duration="slow" delay={200}>
 *   <Card>Slides up after 200ms delay</Card>
 * </Motion>
 *
 * Hover effects:
 * <Motion preset="scaleIn" trigger="hover">
 *   <Button>Scales on hover</Button>
 * </Motion>
 *
 * Scroll-triggered reveal:
 * <Reveal preset="slideInUp" duration="normal">
 *   <div>Animates when scrolled into view</div>
 * </Reveal>
 *
 * Hover animations:
 * <Hover effect="scale">
 *   <Card>Scales on hover</Card>
 * </Hover>
 *
 * <Hover effect="lift">
 *   <Button>Lifts on hover</Button>
 * </Hover>
 *
 * Loading spinner:
 * <LoadingSpinner size="md" />
 *
 * Different elements:
 * <Motion as="button" preset="scaleIn" duration="fast">
 *   Click me
 * </Motion>
 *
 * <Motion as="img" preset="fadeIn" delay={500}>
 *   <img src="image.jpg" alt="Delayed fade" />
 * </Motion>
 */ 
//# sourceMappingURL=motion.d.ts.map