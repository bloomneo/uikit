/**
 * <Collapsible> — show/hide content section built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/collapsible.tsx
 *
 * @llm-rule WHEN: Single expandable section (sidebar group, advanced settings)
 * @llm-rule AVOID: Using for multiple expand/collapse — use <Accordion> instead
 * @llm-rule NOTE: Controlled: `open` + `onOpenChange`. Uncontrolled: `defaultOpen`
 * @llm-rule NOTE: Nesting: Collapsible > CollapsibleTrigger + CollapsibleContent
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-collapsible
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
declare function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>): import("react/jsx-runtime").JSX.Element;
declare function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>): import("react/jsx-runtime").JSX.Element;
export { Collapsible, CollapsibleTrigger, CollapsibleContent };
//# sourceMappingURL=collapsible.d.ts.map