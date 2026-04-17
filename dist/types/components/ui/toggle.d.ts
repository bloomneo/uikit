/**
 * <Toggle> — a pressable button that toggles between on/off states.
 * @module @bloomneo/uikit
 * @file src/components/ui/toggle.tsx
 *
 * @llm-rule WHEN: Toolbar-style toggles (bold, italic, view mode), binary icon buttons
 * @llm-rule AVOID: Using for settings persistence — use <Switch> instead (Switch implies "save")
 * @llm-rule NOTE: Controlled: `pressed` + `onPressedChange={(pressed: boolean) => ...}`. Uncontrolled: `defaultPressed`
 * @llm-rule NOTE: Variants: 'default' (no border) | 'outline' (with border). Sizes: 'default' | 'sm' | 'lg'
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-toggle
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps } from "class-variance-authority";
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): import("react/jsx-runtime").JSX.Element;
export { Toggle, toggleVariants };
//# sourceMappingURL=toggle.d.ts.map