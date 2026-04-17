/**
 * <HoverCard> — rich preview popup shown on hover, built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/hover-card.tsx
 *
 * @llm-rule WHEN: Rich preview on hover (user profile card, link preview, entity details)
 * @llm-rule AVOID: Using for text-only hints — use <Tooltip> instead. For click-triggered content — use <Popover>
 * @llm-rule NOTE: Controlled: `open` + `onOpenChange`. Props: `openDelay` (default 700ms), `closeDelay` (default 300ms)
 * @llm-rule NOTE: Nesting: HoverCard > HoverCardTrigger + HoverCardContent
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-hover-card
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
declare function HoverCard({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function HoverCardTrigger({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function HoverCardContent({ className, align, sideOffset, ...props }: React.ComponentProps<typeof HoverCardPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { HoverCard, HoverCardTrigger, HoverCardContent };
//# sourceMappingURL=hover-card.d.ts.map