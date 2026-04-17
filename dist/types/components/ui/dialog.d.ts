/**
 * <Dialog> — centered modal overlay built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/dialog.tsx
 *
 * @llm-rule WHEN: Centered modal for forms, confirmations, detail views
 * @llm-rule AVOID: Using for side panels — use <Sheet> instead. For delete confirmations — use <ConfirmDialog> or `useConfirm()`
 * @llm-rule NOTE: Controlled: `open` + `onOpenChange`. Trigger-based: wrap trigger element in <DialogTrigger>
 * @llm-rule NOTE: Nesting: Dialog > DialogTrigger + DialogContent > DialogHeader(DialogTitle + DialogDescription) + children + DialogFooter
 * @llm-rule NOTE: `showCloseButton={false}` on DialogContent hides the X button
 * @llm-rule NOTE: DialogTitle is required for accessibility — screen readers announce it
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-dialog
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): import("react/jsx-runtime").JSX.Element;
declare function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
declare function DialogContent({ className, children, showCloseButton, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function DialogHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, };
//# sourceMappingURL=dialog.d.ts.map