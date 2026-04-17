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
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
declare function Separator({ className, orientation, decorative, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Separator };
//# sourceMappingURL=separator.d.ts.map