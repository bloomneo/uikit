'use client';

"use client"

/**
 * <Popover> — click-triggered floating panel, built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/popover.tsx
 *
 * @llm-rule WHEN: Interactive floating content triggered by click (color picker, date picker wrapper, filter panel)
 * @llm-rule AVOID: Using for hover hints — use <Tooltip>. For hover previews — use <HoverCard>. For centered modals — use <Dialog>
 * @llm-rule NOTE: Controlled: `open` + `onOpenChange`. Trigger-based: wrap in <PopoverTrigger>
 * @llm-rule NOTE: Nesting: Popover > PopoverTrigger + PopoverContent. Props on content: `side`, `align`, `sideOffset`
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-popover
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
