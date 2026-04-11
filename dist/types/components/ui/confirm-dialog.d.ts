/**
 * <ConfirmDialog> + useConfirm() — promise-based confirmation prompts.
 *
 * Replaces the open/close-state choreography that every page reinvents:
 *
 *   const confirm = useConfirm();
 *
 *   async function onDelete() {
 *     const ok = await confirm({
 *       title: 'Delete this design?',
 *       description: 'This cannot be undone.',
 *       confirmLabel: 'Delete',
 *       tone: 'destructive',
 *     });
 *     if (!ok) return;
 *     await api.deleteDesign(id);
 *   }
 *
 * Or for the high-stakes case:
 *
 *   await confirm.destructive({
 *     title: 'Delete user',
 *     verifyText: user.name,   // user must type the name to confirm
 *     description: 'This will permanently delete the account.',
 *   });
 *
 * Mount <ConfirmProvider /> once at the root of your app, then call
 * useConfirm() from anywhere inside it.
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