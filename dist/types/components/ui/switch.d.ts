/**
 * <Switch> — boolean toggle built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/switch.tsx
 *
 * @llm-rule WHEN: Binary on/off setting (enable notifications, dark mode, feature flag)
 * @llm-rule AVOID: Using for selecting between options — use <RadioGroup> instead
 * @llm-rule NOTE: Controlled: `checked` + `onCheckedChange={(checked: boolean) => ...}`. Uncontrolled: `defaultChecked`
 * @llm-rule NOTE: Renders as `role="switch"` — always pair with a <Label> for accessibility
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-switch
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
declare function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Switch };
//# sourceMappingURL=switch.d.ts.map