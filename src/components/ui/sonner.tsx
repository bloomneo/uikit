'use client';

/**
 * <Toaster> — thin wrapper around Sonner that inherits the active UIKit theme.
 * @module @bloomneo/uikit
 * @file src/components/ui/sonner.tsx
 *
 * @llm-rule WHEN: You need the toast container — mount once at app root alongside <ToastProvider>
 * @llm-rule AVOID: Using this directly for triggering toasts — use `toast.success()` / `toast.error()` from toast.tsx
 * @llm-rule AVOID: Mounting more than one <Toaster> in the component tree
 * @llm-rule NOTE: This is an internal rendering component; the public API is `toast.*` and `<ToastProvider>`
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
