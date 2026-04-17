/**
 * <Input> — single-line text input with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/input.tsx
 *
 * @llm-rule WHEN: Single-line text entry (name, email, search, number)
 * @llm-rule AVOID: Using for multi-line text — use <Textarea>. For validated forms — wrap in <FormField>
 * @llm-rule NOTE: Standard React: `value` + `onChange`. Supports `type`, `placeholder`, `disabled`, `aria-invalid`
 * @llm-rule NOTE: Wrap in <FormField> for automatic label, error message, and a11y wiring
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
declare function Input({ className, type, ...props }: React.ComponentProps<"input">): import("react/jsx-runtime").JSX.Element;
export { Input };
//# sourceMappingURL=input.d.ts.map