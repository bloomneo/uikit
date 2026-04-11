import { Users } from 'lucide-react';
import { Button, PageHeader } from '@bloomneo/uikit';

export default function PageHeaderExample() {
  return (
    <PageHeader
      icon={<Users />}
      title="User management"
      description="View and manage all users in your workspace"
      breadcrumbs={[
        { label: 'Admin', href: '/admin' },
        { label: 'Users' },
      ]}
      actions={<Button>Add user</Button>}
    />
  );
}
