"use client"

/**
 * <Switch> — boolean toggle built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/switch.tsx
 *
 * @llm-rule WHEN: Binary on/off setting (enable notifications, dark mode, feature flag)
 * @llm-rule AVOID: Using for selecting between options — use <RadioGroup> instead
 * @llm-rule NOTE: Controlled: `checked` + `onCheckedChange={(checked: boolean) => ...}`. Uncontrolled: `defaultChecked`
 * @llm-rule NOTE: Renders as `role="switch"` — always pair with a <Label> for accessibility
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
