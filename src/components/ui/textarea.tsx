/**
 * <Textarea> — multi-line text input with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/textarea.tsx
 *
 * @llm-rule WHEN: Multi-line free text (comments, descriptions, notes)
 * @llm-rule AVOID: Using for single-line input — use <Input> instead
 * @llm-rule NOTE: Wrap in <FormField> for label + error message + a11y wiring
 * @llm-rule NOTE: Standard React: `value` + `onChange`. Supports `aria-invalid` for error styling
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
