import { Button, ToastProvider, toast } from '@bloomneo/uikit';

// Mount <ToastProvider /> ONCE at the root of your app (inside <ThemeProvider>).
// Then call `toast.*` from anywhere — no React context plumbing needed.

export default function ToastExample() {
  return (
    <>
      <ToastProvider position="bottom-right" />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success('Saved')}>Success</Button>
        <Button onClick={() => toast.error('Something went wrong')} variant="destructive">
          Error
        </Button>
        <Button onClick={() => toast.info('Heads up')} variant="outline">
          Info
        </Button>
        <Button
          onClick={() =>
            toast('Saved', {
              description: 'Your changes are live',
              action: { label: 'Undo', onClick: () => toast.info('Undone') },
            })
          }
          variant="outline"
        >
          With action
        </Button>
      </div>
    </>
  );
}
