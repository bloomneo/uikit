/**
 * <Label> — accessible form label built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/label.tsx
 *
 * @llm-rule WHEN: Labeling form inputs (always pair every Input/Textarea/Select with a Label)
 * @llm-rule AVOID: Using bare HTML <label> — this component handles disabled state propagation
 * @llm-rule NOTE: Use `htmlFor={id}` to associate with an input. Auto-dims when parent is disabled
 * @llm-rule NOTE: <FormField> wraps Label automatically — only use Label directly for custom layouts
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-label
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
declare function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
export { Label };
//# sourceMappingURL=label.d.ts.map