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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

type Resolver = (value: boolean) => void;
type PendingOptions = (ConfirmOptions | DestructiveConfirmOptions) & {
  tone: 'default' | 'destructive';
  verifyText?: string;
};

interface ConfirmContextValue {
  open: (options: PendingOptions) => Promise<boolean>;
}

const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

/**
 * Mount once at the root. All useConfirm() calls inside go through this.
 */
export function ConfirmProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [pending, setPending] = React.useState<PendingOptions | null>(null);
  const resolverRef = React.useRef<Resolver | null>(null);
  const [verifyValue, setVerifyValue] = React.useState('');

  const open = React.useCallback((options: PendingOptions) => {
    setVerifyValue('');
    setPending(options);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const close = (result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setPending(null);
    setVerifyValue('');
  };

  const verifyMismatch = pending?.verifyText
    ? verifyValue !== pending.verifyText
    : false;

  return (
    <ConfirmContext.Provider value={{ open }}>
      {children}
      <Dialog open={pending !== null} onOpenChange={(o) => !o && close(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{pending?.title}</DialogTitle>
            {pending?.description && (
              <DialogDescription>{pending.description}</DialogDescription>
            )}
          </DialogHeader>

          {pending?.verifyText && (
            <div className="flex flex-col gap-2 py-2">
              <Label htmlFor="confirm-verify">
                Type{' '}
                <span className="font-mono font-semibold text-foreground">
                  {pending.verifyText}
                </span>{' '}
                to confirm
              </Label>
              <Input
                id="confirm-verify"
                value={verifyValue}
                onChange={(e) => setVerifyValue(e.target.value)}
                autoComplete="off"
                autoFocus
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => close(false)}>
              {pending?.cancelLabel ?? 'Cancel'}
            </Button>
            <Button
              variant={pending?.tone === 'destructive' ? 'destructive' : 'default'}
              disabled={verifyMismatch}
              onClick={() => close(true)}
            >
              {pending?.confirmLabel ?? (pending?.tone === 'destructive' ? 'Delete' : 'Confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export interface UseConfirmReturn {
  (options: ConfirmOptions): Promise<boolean>;
  destructive: (options: DestructiveConfirmOptions) => Promise<boolean>;
}

/**
 * Returns a callable. Use the call form for normal confirmations and the
 * `.destructive` method for high-stakes ones.
 */
export function useConfirm(): UseConfirmReturn {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) {
    throw new Error(
      '[@voilajsx/uikit] useConfirm() called outside <ConfirmProvider>. Wrap your app root in <ConfirmProvider>.'
    );
  }

  const fn = React.useCallback(
    (options: ConfirmOptions) =>
      ctx.open({ ...options, tone: options.tone ?? 'default' }),
    [ctx]
  );

  const destructive = React.useCallback(
    (options: DestructiveConfirmOptions) =>
      ctx.open({ ...options, tone: 'destructive' }),
    [ctx]
  );

  return Object.assign(fn, { destructive }) as UseConfirmReturn;
}

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

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel,
  tone = 'default',
  verifyText,
}: ConfirmDialogProps): React.JSX.Element {
  const [verifyValue, setVerifyValue] = React.useState('');
  React.useEffect(() => {
    if (!open) setVerifyValue('');
  }, [open]);

  const verifyMismatch = verifyText ? verifyValue !== verifyText : false;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {verifyText && (
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="confirm-verify-controlled">
              Type{' '}
              <span className="font-mono font-semibold text-foreground">{verifyText}</span>{' '}
              to confirm
            </Label>
            <Input
              id="confirm-verify-controlled"
              value={verifyValue}
              onChange={(e) => setVerifyValue(e.target.value)}
              autoComplete="off"
              autoFocus
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel ?? 'Cancel'}
          </Button>
          <Button
            variant={tone === 'destructive' ? 'destructive' : 'default'}
            disabled={verifyMismatch}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel ?? (tone === 'destructive' ? 'Delete' : 'Confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
