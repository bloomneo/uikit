/**
 * <Button> — primary interactive element for actions and submissions.
 * @module @bloomneo/uikit
 * @file src/components/ui/button.tsx
 *
 * @llm-rule WHEN: Any clickable action (submit, navigate, delete, toggle)
 * @llm-rule AVOID: Using for navigation links — use <a> or router Link with `asChild`. For toggles — use <Toggle>
 * @llm-rule NOTE: Variants: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
 * @llm-rule NOTE: Sizes: 'default' (h-10) | 'sm' (h-8) | 'lg' (h-12) | 'icon' (square 36px)
 * @llm-rule NOTE: `asChild` merges props onto child element — use for wrapping router <Link> as a button
 * @llm-rule NOTE: Supports `ref` via forwardRef for programmatic focus/scroll
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Button: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map