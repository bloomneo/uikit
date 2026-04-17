/**
 * <Sheet> — slide-in side panel built on Radix Dialog.
 * @module @bloomneo/uikit
 * @file src/components/ui/sheet.tsx
 *
 * @llm-rule WHEN: Side panels, mobile navigation drawers, detail panels, filters panel
 * @llm-rule AVOID: Using for centered modals — use <Dialog>. There is no separate Drawer component — use Sheet with `side`
 * @llm-rule NOTE: Controlled: `open` + `onOpenChange`. `side` on SheetContent: 'top' | 'bottom' | 'left' | 'right' (default: 'right')
 * @llm-rule NOTE: Nesting: Sheet > SheetTrigger + SheetContent > SheetHeader(SheetTitle + SheetDescription) + children + SheetFooter
 * @llm-rule NOTE: SheetTitle is required for accessibility — screen readers announce it
 * @llm-rule NOTE: Radix wrapper — built on @radix-ui/react-dialog with slide-in animation
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
declare function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare function SheetContent({ className, children, side, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left";
}): import("react/jsx-runtime").JSX.Element;
declare function SheetHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function SheetFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
//# sourceMappingURL=sheet.d.ts.map