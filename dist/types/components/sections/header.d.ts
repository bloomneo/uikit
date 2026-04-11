/**
 * Header component with proper responsive behavior and light hover colors
 * @module @bloomneo/uikit
 * @file src/components/sections/header.tsx
 */
import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { NavigationItem, Size } from '@/types';
/**
 * Header variants with tone-based semantic colors
 */
declare const headerVariants: (props?: ({
    tone?: "clean" | "subtle" | "brand" | "contrast" | null | undefined;
    position?: "fixed" | "relative" | "sticky" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Container variants for responsive sizing
 */
declare const containerVariants: (props?: ({
    size?: "sm" | "lg" | "md" | "xl" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Header component props
 */
export interface HeaderProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof headerVariants> {
    /** Visual styling tone */
    tone?: 'clean' | 'subtle' | 'brand' | 'contrast';
    /** Header size (width + height + padding) */
    size?: Size;
    /** Header positioning */
    position?: 'sticky' | 'fixed' | 'relative';
    /** Header content */
    children: React.ReactNode;
}
/**
 * Header Logo section props
 */
export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Logo content */
    children: React.ReactNode;
}
/**
 * Header Logo section (always on the left)
 */
declare const HeaderLogo: React.ForwardRefExoticComponent<HeaderLogoProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Header Navigation props
 */
export interface HeaderNavProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Navigation items */
    navigation?: NavigationItem[];
    /** Current path for active states */
    currentPath?: string;
    /** Navigation handler */
    onNavigate?: (href: string, item: NavigationItem) => void;
}
/**
 * Header Navigation with proper responsive behavior
 */
declare const HeaderNav: React.ForwardRefExoticComponent<HeaderNavProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Header with compound components
 */
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLElement>> & {
    Logo: React.ForwardRefExoticComponent<HeaderLogoProps & React.RefAttributes<HTMLDivElement>>;
    Nav: React.ForwardRefExoticComponent<HeaderNavProps & React.RefAttributes<HTMLDivElement>>;
};
/**
 * Export Header with compound components and individual components
 */
export { Header, HeaderLogo, HeaderNav, headerVariants, containerVariants };
//# sourceMappingURL=header.d.ts.map