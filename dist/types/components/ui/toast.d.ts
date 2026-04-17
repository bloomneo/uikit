/**
 * Toast system — transient notifications via `toast.*` and `<ToastProvider>`.
 * @module @bloomneo/uikit
 * @file src/components/ui/toast.tsx
 *
 * @llm-rule WHEN: Transient success/error/info notifications (save success, API error, copy confirmation)
 * @llm-rule AVOID: Using for persistent messages — use <Alert> instead. Never build custom toast UI
 * @llm-rule NOTE: Mount <ToastProvider /> once at app root. Call `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`
 * @llm-rule NOTE: `toast.promise(asyncFn, { loading, success, error })` for async operations
 * @llm-rule NOTE: `useToast()` hook returns the same `toast` object for components that prefer hooks
 * @llm-rule NOTE: Custom component — wraps sonner library. Do not import from 'sonner' directly
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
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