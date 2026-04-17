/**
 * <Checkbox> — boolean checkbox built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/checkbox.tsx
 *
 * @llm-rule WHEN: Boolean selection in forms (terms acceptance, feature toggles, multi-select lists)
 * @llm-rule AVOID: Using for mutually exclusive options — use <RadioGroup> instead
 * @llm-rule NOTE: Controlled: `checked` + `onCheckedChange={(checked: boolean | 'indeterminate') => ...}`
 * @llm-rule NOTE: Always pair with a <Label htmlFor={id}> for accessibility
 * @llm-rule NOTE: Supports `checked="indeterminate"` for parent checkboxes in hierarchical lists
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-checkbox
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
declare function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Checkbox };
//# sourceMappingURL=checkbox.d.ts.map