/**
 * <ConfirmDialog> + useConfirm() — promise-based confirmation prompts.
 * @module @bloomneo/uikit
 * @file src/components/ui/confirm-dialog.tsx
 *
 * @llm-rule WHEN: Delete/destructive confirmations, any action that needs user sign-off
 * @llm-rule AVOID: Using <Dialog> with manual state for confirmations — use `useConfirm()` instead
 * @llm-rule NOTE: Mount <ConfirmProvider> once at app root. Call `useConfirm()` anywhere inside it
 * @llm-rule NOTE: `confirm.destructive({ verifyText })` forces user to type exact text before confirming
 * @llm-rule NOTE: Returns `Promise<boolean>` — `true` = confirmed, `false` = cancelled
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 *
 * @example
 *   const confirm = useConfirm();
 *   const ok = await confirm({ title: 'Delete?', tone: 'destructive' });
 *   if (!ok) return;
 *
 * @example High-stakes:
 *   await confirm.destructive({ title: 'Delete user', verifyText: user.name });
 */
import * as React from 'react';
export interface ConfirmOptions {
    title: string;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    tone?: 'default' | 'destructive';
}
export interface DestructiveConfirmOptions extends Omit<ConfirmOptions, 'tone'> {
    /**
     * If set, the user must type this exact string into the input before the
     * confirm button enables. Used for high-stakes deletions.
     */
    verifyText?: string;
}
/**
 * Mount once at the root. All useConfirm() calls inside go through this.
 */
export declare function ConfirmProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export interface UseConfirmReturn {
    (options: ConfirmOptions): Promise<boolean>;
    destructive: (options: DestructiveConfirmOptions) => Promise<boolean>;
}
/**
 * Returns a callable. Use the call form for normal confirmations and the
 * `.destructive` method for high-stakes ones.
 */
export declare function useConfirm(): UseConfirmReturn;
/**
 * Optional: a controlled <ConfirmDialog /> for users who don't want the
 * provider/promise pattern. Useful inside a single page that already has
 * dialog state management.
 */
export interface ConfirmDialogProps extends ConfirmOptions {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    verifyText?: string;
}
export declare function ConfirmDialog({ open, onOpenChange, onConfirm, title, description, confirmLabel, cancelLabel, tone, verifyText, }: ConfirmDialogProps): React.JSX.Element;
//# sourceMappingURL=confirm-dialog.d.ts.map