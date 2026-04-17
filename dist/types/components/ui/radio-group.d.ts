/**
 * <RadioGroup> — mutually exclusive option selection built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/radio-group.tsx
 *
 * @llm-rule WHEN: Choosing exactly one option from a small set (payment method, plan, priority)
 * @llm-rule AVOID: Using for boolean toggles — use <Switch> or <Checkbox>. For many options — use <Select> or <Combobox>
 * @llm-rule NOTE: Controlled: `value` + `onValueChange={(value: string) => ...}`. Uncontrolled: `defaultValue`
 * @llm-rule NOTE: Nesting: RadioGroup > (RadioGroupItem + Label) per option. Each RadioGroupItem needs a unique `value`
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-radio-group
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
declare function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
export { RadioGroup, RadioGroupItem };
//# sourceMappingURL=radio-group.d.ts.map