/**
 * <Alert> — inline banner for persistent messages (info, warnings, errors).
 * @module @bloomneo/uikit
 * @file src/components/ui/alert.tsx
 *
 * @llm-rule WHEN: Inline, persistent messages the user needs to see (validation summary, warning banner)
 * @llm-rule AVOID: Using for transient notifications — use `toast.*` instead
 * @llm-rule NOTE: Variants: 'default' | 'destructive'. Pass an SVG icon as first child for icon support
 * @llm-rule NOTE: Nesting: Alert > optional SVG icon + AlertTitle + AlertDescription
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>): import("react/jsx-runtime").JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertTitle, AlertDescription };
//# sourceMappingURL=alert.d.ts.map