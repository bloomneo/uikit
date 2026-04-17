/**
 * <Command> — searchable command palette built on cmdk.
 * @module @bloomneo/uikit
 * @file src/components/ui/command.tsx
 *
 * @llm-rule WHEN: Keyboard-driven search/command palette (Cmd+K pattern), or as the search engine inside <Combobox>
 * @llm-rule AVOID: Using for form selects — use <Combobox> (wraps Command with form semantics) or <Select>
 * @llm-rule NOTE: CommandDialog wraps Command in a Dialog for the Cmd+K overlay pattern
 * @llm-rule NOTE: Nesting: Command > CommandInput + CommandList > CommandEmpty + CommandGroup > CommandItem
 * @llm-rule NOTE: `showCloseButton` on CommandDialog controls the X button (default: true)
 * @llm-rule NOTE: Custom component — wraps cmdk library (not Radix). CommandDialog combines Command + Dialog
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog } from "@/components/ui/dialog";
declare function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): import("react/jsx-runtime").JSX.Element;
declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): import("react/jsx-runtime").JSX.Element;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
//# sourceMappingURL=command.d.ts.map