/**
 * <Separator> — visual divider line (horizontal or vertical).
 * @module @bloomneo/uikit
 * @file src/components/ui/separator.tsx
 *
 * @llm-rule WHEN: Visually separating content sections, menu groups, sidebar items
 * @llm-rule NOTE: `orientation="horizontal"` (default) for full-width line. `orientation="vertical"` for height line
 * @llm-rule NOTE: `decorative={true}` (default) hides from screen readers. Set `false` for semantic separation
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-separator
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
