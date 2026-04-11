/**
 * CRUD page recipe.
 *
 * Searchable, sortable user list with row actions and a delete-with-confirm
 * flow. The whole thing is ~80 lines instead of the usual 600 because every
 * piece (PageHeader, DataTable, ConfirmProvider/useConfirm, ToastProvider/toast)
 * is a UIKit primitive.
 */

import { useState } from 'react';
import { Pencil, Trash2, Users } from 'lucide-react';
import {
  Button,
  ConfirmProvider,
  DataTable,
  PageHeader,
  ToastProvider,
  toast,
  useConfirm,
  type DataTableColumn,
  type RowAction,
} from '@bloomneo/uikit';

type User = { id: string; name: string; email: string; role: 'admin' | 'user' };

const initialUsers: User[] = [
  { id: '1', name: 'Alice',  email: 'alice@example.com',  role: 'admin' },
  { id: '2', name: 'Bob',    email: 'bob@example.com',    role: 'user' },
  { id: '3', name: 'Carol',  email: 'carol@example.com',  role: 'user' },
  { id: '4', name: 'Dawud',  email: 'dawud@example.com',  role: 'user' },
];

function UserListInner() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const confirm = useConfirm();

  const columns: DataTableColumn<User>[] = [
    { id: 'name',  header: 'Name',  accessorKey: 'name',  sortable: true },
    { id: 'email', header: 'Email', accessorKey: 'email' },
    { id: 'role',  header: 'Role',  accessorKey: 'role',  sortable: true },
  ];

  const actions: RowAction<User>[] = [
    {
      id: 'edit',
      label: 'Edit',
      icon: Pencil,
      onClick: (row) => toast(`Editing ${row.name}`),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      onClick: async (row) => {
        const ok = await confirm({
          title: `Delete ${row.name}?`,
          description: 'This cannot be undone.',
          confirmLabel: 'Delete',
          tone: 'destructive',
        });
        if (!ok) return;
        setUsers((prev) => prev.filter((u) => u.id !== row.id));
        toast.success(`${row.name} deleted`);
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        icon={<Users />}
        title="User management"
        description="View and manage all users in your workspace"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
        actions={<Button onClick={() => toast.info('Open add-user dialog')}>Add user</Button>}
      />

      <DataTable<User>
        data={users}
        columns={columns}
        actions={actions}
        searchable
        pagination
        pageSize={10}
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default function CrudPageRecipe() {
  return (
    <ConfirmProvider>
      <ToastProvider />
      <UserListInner />
    </ConfirmProvider>
  );
}
