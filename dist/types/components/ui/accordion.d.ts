/**
 * <Accordion> — collapsible content sections built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/accordion.tsx
 *
 * @llm-rule WHEN: FAQ lists, settings groups, expandable sections
 * @llm-rule AVOID: Using for tabbed views — use <Tabs> instead
 * @llm-rule NOTE: `type="single" collapsible` for one-at-a-time (most common). `type="multiple"` for many open at once
 * @llm-rule NOTE: Controlled: `value` + `onValueChange`. Uncontrolled: `defaultValue`
 * @llm-rule NOTE: Nesting: Accordion > AccordionItem(value) > AccordionTrigger + AccordionContent
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-accordion
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
//# sourceMappingURL=accordion.d.ts.map