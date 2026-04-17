/**
 * <Tooltip> — text-only hint shown on hover, built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/tooltip.tsx
 *
 * @llm-rule WHEN: Short text hint on hover (icon button label, truncated text explanation)
 * @llm-rule AVOID: Using for rich/interactive content — use <HoverCard> or <Popover> instead
 * @llm-rule NOTE: Nesting: Tooltip > TooltipTrigger + TooltipContent. Props on content: `side`, `align`, `sideOffset`
 * @llm-rule NOTE: Each Tooltip self-wraps with TooltipProvider — no need to add one manually
 * @llm-rule NOTE: `delayDuration` on TooltipProvider controls hover delay (default: 0ms)
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-tooltip
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
declare function TooltipProvider({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): import("react/jsx-runtime").JSX.Element;
declare function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function TooltipContent({ className, sideOffset, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
//# sourceMappingURL=tooltip.d.ts.map