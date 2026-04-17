/**
 * <Badge> — small status label or tag.
 * @module @bloomneo/uikit
 * @file src/components/ui/badge.tsx
 *
 * @llm-rule WHEN: Status indicators, tags, counts (e.g. "Active", "3 new", "Pro")
 * @llm-rule AVOID: Using for interactive actions — use <Button size="sm"> instead
 * @llm-rule NOTE: Variants: 'default' (primary bg) | 'secondary' | 'destructive' | 'outline'
 * @llm-rule NOTE: `asChild` merges props onto child element (Radix Slot pattern) — rarely needed
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export { Badge, badgeVariants };
//# sourceMappingURL=badge.d.ts.map