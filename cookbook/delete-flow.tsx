/**
 * Destructive action recipe.
 *
 * Demonstrates the high-stakes deletion pattern: a button that opens a
 * confirm dialog where the user has to type the resource name before the
 * delete button enables. On success a toast confirms the action.
 *
 * Use this for irreversible operations: deleting users, dropping databases,
 * cancelling subscriptions, etc.
 */

import {
  Button,
  ConfirmProvider,
  ToastProvider,
  toast,
  useConfirm,
} from '@voilajsx/uikit';

const RESOURCE_NAME = 'production-db';

function DeleteResource() {
  const confirm = useConfirm();

  async function onDelete() {
    const ok = await confirm.destructive({
      title: 'Delete production database',
      description:
        'This will permanently destroy the database and all of its data. There is no undo.',
      verifyText: RESOURCE_NAME,
      confirmLabel: 'I understand, delete it',
    });
    if (!ok) return;
    // → call your delete API here
    toast.success(`${RESOURCE_NAME} deleted`);
  }

  return (
    <Button variant="destructive" onClick={onDelete}>
      Delete database
    </Button>
  );
}

export default function DeleteFlowRecipe() {
  return (
    <ConfirmProvider>
      <ToastProvider />
      <div className="flex flex-col items-start gap-4 p-6">
        <p className="max-w-md text-sm text-muted-foreground">
          The button below opens a confirmation dialog. The user must type
          <code className="mx-1 rounded bg-muted px-1">{RESOURCE_NAME}</code>
          before the delete button enables.
        </p>
        <DeleteResource />
      </div>
    </ConfirmProvider>
  );
}
