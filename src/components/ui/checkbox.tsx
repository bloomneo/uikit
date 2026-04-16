"use client"

/**
 * <Checkbox> — boolean checkbox built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/checkbox.tsx
 *
 * @llm-rule WHEN: Boolean selection in forms (terms acceptance, feature toggles, multi-select lists)
 * @llm-rule AVOID: Using for mutually exclusive options — use <RadioGroup> instead
 * @llm-rule NOTE: Controlled: `checked` + `onCheckedChange={(checked: boolean | 'indeterminate') => ...}`
 * @llm-rule NOTE: Always pair with a <Label htmlFor={id}> for accessibility
 * @llm-rule NOTE: Supports `checked="indeterminate"` for parent checkboxes in hierarchical lists
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
