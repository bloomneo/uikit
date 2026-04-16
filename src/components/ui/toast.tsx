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
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps } from 'sonner';
import { useTheme } from '@/themes/theme-provider';

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
export function ToastProvider({
  position = 'bottom-right',
  theme,
  ...rest
}: ToastProviderProps): React.JSX.Element {
  // Read mode from UIKit's theme provider when one is mounted; fall back to
  // 'system' so this still works in storybooks / isolated tests.
  let mode: ToasterProps['theme'] = 'system';
  try {
    mode = useTheme().mode;
  } catch {
    /* not inside a ThemeProvider — that's fine */
  }
  return (
    <SonnerToaster
      position={position}
      theme={theme ?? mode}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}

/* ------------------------------------------------------------------------- */
/* toast() — flat callable API                                                */
/* ------------------------------------------------------------------------- */

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

function callToast(
  kind: 'success' | 'error' | 'info' | 'warning' | 'message',
  message: React.ReactNode,
  options: ToastOptions = {}
) {
  const fn =
    kind === 'success'
      ? sonnerToast.success
      : kind === 'error'
        ? sonnerToast.error
        : kind === 'info'
          ? sonnerToast.info
          : kind === 'warning'
            ? sonnerToast.warning
            : sonnerToast;
  return fn(message, options);
}

export interface ToastPromiseMessages<T> {
  loading: React.ReactNode;
  success: React.ReactNode | ((data: T) => React.ReactNode);
  error: React.ReactNode | ((error: unknown) => React.ReactNode);
}

function promiseToast<T>(promise: Promise<T>, messages: ToastPromiseMessages<T>): void {
  // Sonner's `toast.promise` return type references an internal type that
  // cannot be re-exported. We don't expose the return value — UIKit consumers
  // never need it — so we wrap it in a void-returning function.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (sonnerToast.promise as any)(promise, messages);
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

const toastImpl = ((message: React.ReactNode, options?: ToastOptions) => {
  callToast('message', message, options);
}) as ToastApi;

toastImpl.success = (message, options) => { callToast('success', message, options); };
toastImpl.error = (message, options) => { callToast('error', message, options); };
toastImpl.info = (message, options) => { callToast('info', message, options); };
toastImpl.warning = (message, options) => { callToast('warning', message, options); };
toastImpl.promise = promiseToast;
toastImpl.dismiss = (id?: string | number) => { sonnerToast.dismiss(id); };

export const toast: ToastApi = toastImpl;

/**
 * Hook form: returns the same `toast` object. Exists for discoverability —
 * `useToast()` is what agents look for first.
 */
export function useToast(): ToastApi {
  return toast;
}
