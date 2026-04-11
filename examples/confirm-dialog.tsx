import { Button, ConfirmProvider, useConfirm } from '@voilajsx/uikit';

// Wrap your app once in <ConfirmProvider>, then call useConfirm() anywhere.
// The promise resolves to `true` if the user confirmed, `false` if they cancelled.

function DeleteButton() {
  const confirm = useConfirm();

  async function handleDelete() {
    const ok = await confirm({
      title: 'Delete this design?',
      description: 'This cannot be undone.',
      confirmLabel: 'Delete',
      tone: 'destructive',
    });
    if (!ok) return;
    // …perform the delete here
  }

  async function handleHardDelete() {
    // High-stakes: user must type "alice" before the confirm button enables.
    const ok = await confirm.destructive({
      title: 'Delete user',
      description: 'This will permanently delete the account.',
      verifyText: 'alice',
    });
    if (!ok) return;
  }

  return (
    <div className="flex gap-2">
      <Button variant="destructive" onClick={handleDelete}>Delete design</Button>
      <Button variant="destructive" onClick={handleHardDelete}>Delete user</Button>
    </div>
  );
}

export default function ConfirmDialogExample() {
  return (
    <ConfirmProvider>
      <DeleteButton />
    </ConfirmProvider>
  );
}
