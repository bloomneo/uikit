/**
 * tests/components/data-table.test.tsx
 *
 * DataTable is the most complex thing this library ships and, until now, the
 * least verified. Building a demo against 4.0 I wrote `{ key: 'id', ... }`
 * instead of `{ id: 'id', ... }` and passed `cell: (row) => …` when the
 * signature is `(value, row, index)`. Vite built it happily — esbuild strips
 * types without checking them — and the only symptom was a React key warning
 * in a browser console I happened to have open.
 *
 * These assert the column contract and the interactive behaviour, so that
 * class of mistake fails in CI instead.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { DataTable } from '@bloomneo/uikit';

type Row = { id: string; name: string; amount: number };

const rows: Row[] = [
  { id: 'r1', name: 'Charlie', amount: 30 },
  { id: 'r2', name: 'alice', amount: 10 },
  { id: 'r3', name: 'Bob', amount: 20 },
];

const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name' as const, sortable: true },
  { id: 'amount', header: 'Amount', accessorKey: 'amount' as const, sortable: true },
];

function bodyRows() {
  // The header lives in its own <thead>; grab only data rows.
  const table = screen.getByRole('table');
  const tbody = table.querySelector('tbody')!;
  return within(tbody).getAllByRole('row');
}

describe('column contract', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    // React key warnings go to console.error; the library's own educational
    // messages go through warnInDev -> console.warn. Both matter here.
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('renders one row per datum and one cell per column', () => {
    render(<DataTable<Row> data={rows} columns={columns} />);
    expect(bodyRows()).toHaveLength(3);
    expect(within(bodyRows()[0]).getAllByRole('cell')).toHaveLength(2);
  });

  it('produces NO React key warning for well-formed columns', () => {
    render(<DataTable<Row> data={rows} columns={columns} />);
    const keyWarnings = errorSpy.mock.calls.filter((c) => String(c[0]).includes('unique "key"'));
    expect(keyWarnings).toEqual([]);
  });

  it('warns educationally when a column is missing `id`', () => {
    render(<DataTable<Row> data={rows} columns={[{ header: 'Name', accessorKey: 'name' } as never]} />);
    const warned = warnSpy.mock.calls.map((c) => String(c[0])).join('\n');
    expect(warned).toMatch(/unique .id./i);
    expect(warned).toContain('@bloomneo/uikit');
    // And it links to the docs entry, which is the point of warnInDev.
    expect(warned).toMatch(/See: http/);
  });

  // Deliberately NOT asserted: that a missing `id` also triggers React's own
  // "unique key" warning. React dedupes that per call site, so whether it fires
  // depends on which test ran first — an order-dependent assertion about
  // React's internals rather than about this library's contract. The pair above
  // (no warning when correct, educational warning when not) is the real guard.

  it('`cell` receives (value, row, index) — value FIRST', () => {
    const cell = vi.fn((value: unknown) => <span>{String(value)}</span>);
    render(
      <DataTable<Row>
        data={[rows[0]]}
        columns={[{ id: 'amount', header: 'Amount', accessorKey: 'amount', cell: cell as never }]}
      />,
    );
    const [value, row, index] = cell.mock.calls[0] as unknown as [number, Row, number];
    expect(value).toBe(30);
    expect(row).toEqual(rows[0]);
    expect(index).toBe(0);
  });

  it('`accessor` wins over `accessorKey` for computed columns', () => {
    render(
      <DataTable<Row>
        data={[rows[0]]}
        columns={[{ id: 'calc', header: 'Double', accessor: (r: Row) => r.amount * 2 }]}
      />,
    );
    expect(screen.getByText('60')).toBeInTheDocument();
  });
});

describe('behaviour', () => {
  it('sorts by a sortable column and reverses on second click', async () => {
    render(<DataTable<Row> data={rows} columns={columns} />);
    const amountHeader = screen.getByText('Amount');

    await userEvent.click(amountHeader);
    let cells = bodyRows().map((r) => within(r).getAllByRole('cell')[1].textContent);
    expect(cells).toEqual(['10', '20', '30']);

    await userEvent.click(amountHeader);
    cells = bodyRows().map((r) => within(r).getAllByRole('cell')[1].textContent);
    expect(cells).toEqual(['30', '20', '10']);
  });

  it('does not sort a column that opted out', async () => {
    const cols = [{ id: 'name', header: 'Name', accessorKey: 'name' as const }];
    render(<DataTable<Row> data={rows} columns={cols} />);
    const before = bodyRows().map((r) => r.textContent);
    await userEvent.click(screen.getByText('Name'));
    expect(bodyRows().map((r) => r.textContent)).toEqual(before);
  });

  it('filters rows through the search box', async () => {
    render(<DataTable<Row> data={rows} columns={columns} searchable />);
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'Bob');
    expect(bodyRows()).toHaveLength(1);
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('search is case-insensitive', async () => {
    render(<DataTable<Row> data={rows} columns={columns} searchable />);
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'ALICE');
    expect(bodyRows()).toHaveLength(1);
  });

  it('search matches a substring, not just a prefix', async () => {
    // Added after mutation testing: swapping `includes` for `startsWith` left
    // every other search assertion green, because they all happened to query
    // prefixes. "harl" only matches "Charlie" mid-word.
    render(<DataTable<Row> data={rows} columns={columns} searchable />);
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'harl');
    expect(bodyRows()).toHaveLength(1);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders the empty state rather than an empty grid', () => {
    render(<DataTable<Row> data={[]} columns={columns} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('honours a custom emptyState', () => {
    render(<DataTable<Row> data={[]} columns={columns} emptyState={<span>nothing yet</span>} />);
    expect(screen.getByText('nothing yet')).toBeInTheDocument();
  });

  it('shows a loading state instead of rows', () => {
    render(<DataTable<Row> data={[]} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('surfaces an error string', () => {
    render(<DataTable<Row> data={[]} columns={columns} error="Fetch failed" />);
    expect(screen.getByText('Fetch failed')).toBeInTheDocument();
  });
});

describe('the documented failure mode', () => {
  it('throws an educational error when `data` is not an array', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // AGENTS.md's top "common mistake": `data={users}` while users is undefined.
    expect(() => render(<DataTable<Row> data={undefined as never} columns={columns} />)).toThrow(
      /expects .*data.* to be an array/i,
    );
    spy.mockRestore();
  });
});
