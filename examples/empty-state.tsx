import { Inbox } from 'lucide-react';
import { Button, EmptyState } from '@bloomneo/uikit';

export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={<Inbox />}
      title="No designs yet"
      description="Create your first design to get started."
      action={<Button onClick={() => alert('create')}>Create design</Button>}
    />
  );
}
