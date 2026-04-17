/**
 * <Slider> — numeric range input built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/slider.tsx
 *
 * @llm-rule WHEN: Numeric value selection (volume, price range, percentage)
 * @llm-rule AVOID: Using for on/off — use <Switch> instead
 * @llm-rule NOTE: Pass `value={[n]}` for single thumb, `value={[min, max]}` for range
 * @llm-rule NOTE: Controlled: `value` + `onValueChange`. Uncontrolled: `defaultValue`
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-slider
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
declare function Slider({ className, defaultValue, value, min, max, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Slider };
//# sourceMappingURL=slider.d.ts.map