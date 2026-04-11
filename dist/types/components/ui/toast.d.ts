/**
 * Toast system for @voilajsx/uikit.
 *
 * Thin wrapper over `sonner` (already installed) that exposes a stable,
 * discoverable API:
 *
 *   • <ToastProvider />        — drop once at the app root (re-exports Toaster)
 *   • toast.success(message)   — green check
 *   • toast.error(message)     — red x
 *   • toast.info(message)      — neutral
 *   • toast.warning(message)   — yellow
 *   • toast.promise(promise, { loading, success, error })
 *   • toast(message, options)  — generic
 *   • useToast()               — returns the same object as a hook
 *
 * Why a wrapper at all? Two reasons:
 *
 *   1. Discovery — `useToast` is the convention agents and humans expect.
 *      Sonner's "import { toast } from 'sonner'" is invisible to anything
 *      reading UIKit's surface area.
 *   2. Theme parity — sonner reads next-themes; we re-bind it to UIKit's
 *      theme provider so dark mode is always correct.
 */
import * as React from 'react';
import { type ToasterProps } from 'sonner';
export type ToastPosition = ToasterProps['position'];
export interface ToastProviderProps extends Omit<ToasterProps, 'theme'> {
    /** Override the auto-detected theme. Default: follows <ThemeProvider mode>. */
    theme?: ToasterProps['theme'];
}
/**
 * Drop one of these at the root of your app (inside <ThemeProvider>):
 *
 *   <ThemeProvider><ToastProvider /><App /></ThemeProvider>
 */
export declare function ToastProvider({ position, theme, ...rest }: ToastProviderProps): React.JSX.Element;
export interface ToastAction {
    label: string;
    onClick: () => void;
}
export interface ToastOptions {
    description?: React.ReactNode;
    duration?: number;
    action?: ToastAction;
    cancel?: ToastAction;
    /** ARIA live region. Default: 'polite' for info/success, 'assertive' for error. */
    ariaLive?: 'polite' | 'assertive';
}
export interface ToastPromiseMessages<T> {
    loading: React.ReactNode;
    success: React.ReactNode | ((data: T) => React.ReactNode);
    error: React.ReactNode | ((error: unknown) => React.ReactNode);
}
interface ToastApi {
    (message: React.ReactNode, options?: ToastOptions): void;
    success: (message: React.ReactNode, options?: ToastOptions) => void;
    error: (message: React.ReactNode, options?: ToastOptions) => void;
    info: (message: React.ReactNode, options?: ToastOptions) => void;
    warning: (message: React.ReactNode, options?: ToastOptions) => void;
    promise: <T>(promise: Promise<T>, messages: ToastPromiseMessages<T>) => void;
    dismiss: (id?: string | number) => void;
}
export declare const toast: ToastApi;
/**
 * Hook form: returns the same `toast` object. Exists for discoverability —
 * `useToast()` is what agents look for first.
 */
export declare function useToast(): ToastApi;
export {};
//# sourceMappingURL=toast.d.ts.map