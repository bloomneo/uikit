"use client"

/**
 * <Progress> — determinate progress bar built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/progress.tsx
 *
 * @llm-rule WHEN: Showing completion progress (file upload, step wizard, loading percentage)
 * @llm-rule AVOID: Using for indeterminate loading — use <Skeleton> or a spinner instead
 * @llm-rule NOTE: `value` is 0–100. Omit value for indeterminate state (no fill shown)
 * @llm-rule NOTE: Accessible: renders with `role="progressbar"` and `aria-valuenow` automatically
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-progress
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
