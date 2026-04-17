/**
 * <Select> — static option list dropdown built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/select.tsx
 *
 * @llm-rule WHEN: Choosing from a static list of options in a form (country, role, status)
 * @llm-rule AVOID: Using for searchable lists — use <Combobox>. For action menus — use <DropdownMenu>
 * @llm-rule NOTE: Controlled: `value` + `onValueChange={(value: string) => ...}`. NOT `onChange`
 * @llm-rule NOTE: Nesting: Select > SelectTrigger(SelectValue) + SelectContent > SelectGroup(SelectLabel) > SelectItem(value)
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-select
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
declare function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>): import("react/jsx-runtime").JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
}): import("react/jsx-runtime").JSX.Element;
declare function SelectContent({ className, children, position, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>): import("react/jsx-runtime").JSX.Element;
declare function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): import("react/jsx-runtime").JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): import("react/jsx-runtime").JSX.Element;
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, };
//# sourceMappingURL=select.d.ts.map