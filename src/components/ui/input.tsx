'use client';

/**
 * <Input> — single-line text input with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/input.tsx
 *
 * @llm-rule WHEN: Single-line text entry (name, email, search, number)
 * @llm-rule AVOID: Using for multi-line text — use <Textarea>. For validated forms — wrap in <FormField>
 * @llm-rule NOTE: Standard React: `value` + `onChange`. Supports `type`, `placeholder`, `disabled`, `aria-invalid`
 * @llm-rule NOTE: Wrap in <FormField> for automatic label, error message, and a11y wiring
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
