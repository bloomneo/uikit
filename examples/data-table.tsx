import { DataTable, type DataTableColumn } from '@voilajsx/uikit';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
};

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin', createdAt: '2026-01-15' },
  { id: '2', name: 'Bob',   email: 'bob@example.com',   role: 'user',  createdAt: '2026-02-03' },
  { id: '3', name: 'Carol', email: 'carol@example.com', role: 'user',  createdAt: '2026-03-22' },
];

const columns: DataTableColumn<User>[] = [
  { id: 'name',      header: 'Name',  accessorKey: 'name',  sortable: true },
  { id: 'email',     header: 'Email', accessorKey: 'email' },
  { id: 'role',      header: 'Role',  accessorKey: 'role',  sortable: true },
  { id: 'createdAt', header: 'Joined', accessorKey: 'createdAt', sortable: true, dataType: 'date' },
];

export default function DataTableExample() {
  return (
    <DataTable<User>
      data={users}
      columns={columns}
      searchable
      pagination
      pageSize={10}
      getRowId={(row) => row.id}
    />
  );
}
