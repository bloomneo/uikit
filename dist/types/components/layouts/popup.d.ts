/**
 * Popup Layout with standardized scheme + tone system
 * @module @bloomneo/uikit
 * @file src/components/layouts/popup.tsx
 */
import * as React from 'react';
import type { Size, PopupLayoutScheme, Tone } from '@/types';
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
declare const PopupHeader: React.ForwardRefExoticComponent<PopupHeaderProps & React.RefAttributes<HTMLDivElement>>;
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
declare const PopupContent: React.ForwardRefExoticComponent<PopupContentProps & React.RefAttributes<HTMLDivElement>>;
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
declare const PopupFooter: React.ForwardRefExoticComponent<PopupFooterProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PopupLayout with compound components
 */
declare const PopupLayout: React.ForwardRefExoticComponent<PopupLayoutProps & React.RefAttributes<HTMLDivElement>> & {
    Header: React.ForwardRefExoticComponent<PopupHeaderProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<PopupContentProps & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<PopupFooterProps & React.RefAttributes<HTMLDivElement>>;
};
export { PopupLayout, PopupHeader, PopupContent, PopupFooter };
//# sourceMappingURL=popup.d.ts.map