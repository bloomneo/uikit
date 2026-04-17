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
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function PopoverContent({ className, align, sideOffset, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
//# sourceMappingURL=popover.d.ts.map