/**
 * Blank Layout with simplified scheme system - simple, card, and empty
 * @module @bloomneo/uikit
 * @file src/components/layouts/blank.tsx
 */
import * as React from 'react';
import type { Size, Tone } from '@/types';
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
 * BlankLayout - Minimal and essential
 */
declare const BlankLayout: React.ForwardRefExoticComponent<BlankLayoutProps & React.RefAttributes<HTMLDivElement>>;
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
//# sourceMappingURL=blank.d.ts.map