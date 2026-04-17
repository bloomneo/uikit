/**
 * <Textarea> — multi-line text input with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/textarea.tsx
 *
 * @llm-rule WHEN: Multi-line free text (comments, descriptions, notes)
 * @llm-rule AVOID: Using for single-line input — use <Input> instead
 * @llm-rule NOTE: Wrap in <FormField> for label + error message + a11y wiring
 * @llm-rule NOTE: Standard React: `value` + `onChange`. Supports `aria-invalid` for error styling
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
declare function Textarea({ className, ...props }: React.ComponentProps<"textarea">): import("react/jsx-runtime").JSX.Element;
export { Textarea };
//# sourceMappingURL=textarea.d.ts.map