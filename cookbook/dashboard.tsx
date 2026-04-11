/**
 * Dashboard recipe.
 *
 * Stats grid + recent activity table inside a standard page shell.
 * Drop into any admin layout — works inside <AdminLayout> or alone.
 */

import { Activity, DollarSign, Package, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  PageHeader,
  formatCurrency,
  type DataTableColumn,
} from '@bloomneo/uikit';

type Stat = { label: string; value: string; delta: string; icon: React.ReactNode };
type Order = { id: string; customer: string; amount: number; status: 'paid' | 'pending' };

const stats: Stat[] = [
  { label: 'Revenue',  value: formatCurrency(48230), delta: '+12.4%', icon: <DollarSign /> },
  { label: 'Users',    value: '1,284',                delta: '+3.1%',  icon: <Users /> },
  { label: 'Orders',   value: '342',                  delta: '+8.0%',  icon: <Package /> },
  { label: 'Sessions', value: '12,932',               delta: '+22.0%', icon: <Activity /> },
];

const orders: Order[] = [
  { id: '#1023', customer: 'Alice', amount: 199.0, status: 'paid' },
  { id: '#1024', customer: 'Bob',   amount: 49.5,  status: 'pending' },
  { id: '#1025', customer: 'Carol', amount: 320.0, status: 'paid' },
];

const orderColumns: DataTableColumn<Order>[] = [
  { id: 'id',       header: 'Order',    accessorKey: 'id' },
  { id: 'customer', header: 'Customer', accessorKey: 'customer' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => formatCurrency(row.amount),
    sortable: true,
    dataType: 'number',
  },
  { id: 'status', header: 'Status', accessorKey: 'status' },
];

export default function DashboardRecipe() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Dashboard" description="Overview for the last 30 days" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <div className="text-muted-foreground [&>svg]:size-4">{s.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.delta} vs last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent orders</CardTitle>
          <CardDescription>The latest activity across your store</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable<Order>
            data={orders}
            columns={orderColumns}
            searchable={false}
            pagination={false}
            getRowId={(row) => row.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
