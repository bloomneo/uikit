"use client"

/**
 * <Label> — accessible form label built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/label.tsx
 *
 * @llm-rule WHEN: Labeling form inputs (always pair every Input/Textarea/Select with a Label)
 * @llm-rule AVOID: Using bare HTML <label> — this component handles disabled state propagation
 * @llm-rule NOTE: Use `htmlFor={id}` to associate with an input. Auto-dims when parent is disabled
 * @llm-rule NOTE: <FormField> wraps Label automatically — only use Label directly for custom layouts
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
