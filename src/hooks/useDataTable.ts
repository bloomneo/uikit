/**
 * `useDataTable` — headless table state for @voilajsx/uikit.
 *
 * Provides the search / sort / filter / pagination state machine that the
 * built-in `<DataTable>` component uses internally, in case you want to ship
 * a custom-rendered table (treegrid, virtualized, gantt) but still benefit
 * from the standard state shape.
 *
 * @example
 *   const table = useDataTable({
 *     data: users,
 *     columns: [{ id: 'name', accessorKey: 'name' }],
 *     pageSize: 25,
 *   });
 *
 *   <Input value={table.search} onChange={(e) => table.setSearch(e.target.value)} />
 *   {table.rows.map((row) => <CustomRow key={row.id} row={row} />)}
 */

import { useCallback, useMemo, useState } from 'react';
import { requireArrayProp } from '@/lib/errors';
import type {
  DataTableColumn,
  DataTableFilterValue,
  FilterConfig,
  SortConfig,
} from '@/components/ui/data-table';

export interface UseDataTableOptions<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  /** Initial page (0-indexed). Default: 0. */
  initialPage?: number;
  /** Page size. Default: 10. */
  pageSize?: number;
  /** Initial search string. Default: "". */
  initialSearch?: string;
  /** Initial sort config. */
  initialSort?: SortConfig[];
  /** Row id extractor. Default: index.toString(). */
  getRowId?: (row: T, index: number) => string;
}

export interface UseDataTableReturn<T> {
  /** The visible rows for the current page after search/filter/sort. */
  rows: T[];
  /** All rows after search/filter/sort but before pagination. */
  filteredRows: T[];
  /** Stable string id for each visible row. */
  getRowId: (row: T, index: number) => string;

  // search
  search: string;
  setSearch: (value: string) => void;

  // sort
  sort: SortConfig[];
  setSort: (value: SortConfig[]) => void;
  toggleSort: (columnId: string) => void;

  // filter
  filters: FilterConfig;
  setFilter: (columnId: string, value: DataTableFilterValue | null) => void;
  clearFilters: () => void;

  // pagination
  page: number;
  pageSize: number;
  pageCount: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
}

export function useDataTable<T>(options: UseDataTableOptions<T>): UseDataTableReturn<T> {
  const {
    columns,
    initialPage = 0,
    pageSize = 10,
    initialSearch = '',
    initialSort = [],
    getRowId = (_row, index) => String(index),
  } = options;
  const data = requireArrayProp<T>('useDataTable', 'data', options.data,
    'Pass an array (use [] while loading instead of undefined).');

  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<SortConfig[]>(initialSort);
  const [filters, setFilters] = useState<FilterConfig>({});
  const [page, setPage] = useState(initialPage);

  const readCell = useCallback(
    (row: T, column: DataTableColumn<T>): unknown => {
      if (column.accessor) return column.accessor(row);
      if (column.accessorKey) return (row as Record<string, unknown>)[column.accessorKey as string];
      return undefined;
    },
    []
  );

  const filteredRows = useMemo(() => {
    let result = data;

    if (search) {
      const needle = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((column) => {
          const value = readCell(row, column);
          return String(value ?? '').toLowerCase().includes(needle);
        })
      );
    }

    Object.entries(filters).forEach(([columnId, filter]) => {
      const column = columns.find((c) => c.id === columnId);
      if (!column) return;
      result = result.filter((row) => {
        const value = readCell(row, column);
        const fv = filter.value;
        switch (filter.operator) {
          case 'equals':
            return value === fv;
          case 'startsWith':
            return String(value ?? '').toLowerCase().startsWith(String(fv ?? '').toLowerCase());
          case 'endsWith':
            return String(value ?? '').toLowerCase().endsWith(String(fv ?? '').toLowerCase());
          case 'gt':
            return Number(value) > Number(fv);
          case 'lt':
            return Number(value) < Number(fv);
          case 'gte':
            return Number(value) >= Number(fv);
          case 'lte':
            return Number(value) <= Number(fv);
          case 'contains':
          default:
            return String(value ?? '').toLowerCase().includes(String(fv ?? '').toLowerCase());
        }
      });
    });

    if (sort.length > 0) {
      const sorted = [...result];
      sorted.sort((a, b) => {
        for (const s of sort) {
          const column = columns.find((c) => c.id === s.key);
          if (!column) continue;
          const av = readCell(a, column);
          const bv = readCell(b, column);
          let cmp = 0;
          if (column.sortFn) cmp = column.sortFn(av, bv);
          else if (column.dataType === 'number') cmp = Number(av) - Number(bv);
          else if (column.dataType === 'date') cmp = new Date(av as string).getTime() - new Date(bv as string).getTime();
          else cmp = String(av ?? '').localeCompare(String(bv ?? ''));
          if (cmp !== 0) return s.direction === 'asc' ? cmp : -cmp;
        }
        return 0;
      });
      result = sorted;
    }

    return result;
  }, [data, search, sort, filters, columns, readCell]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const rows = useMemo(
    () => filteredRows.slice(safePage * pageSize, (safePage + 1) * pageSize),
    [filteredRows, safePage, pageSize]
  );

  const toggleSort = useCallback(
    (columnId: string) =>
      setSort((prev) => {
        const existing = prev.find((s) => s.key === columnId);
        if (!existing) return [...prev, { key: columnId, direction: 'asc' }];
        if (existing.direction === 'asc')
          return prev.map((s) => (s.key === columnId ? { ...s, direction: 'desc' } : s));
        return prev.filter((s) => s.key !== columnId);
      }),
    []
  );

  const setFilter = useCallback(
    (columnId: string, value: DataTableFilterValue | null) =>
      setFilters((prev) => {
        if (value === null || value === '' || value === undefined) {
          const next = { ...prev };
          delete next[columnId];
          return next;
        }
        const column = columns.find((c) => c.id === columnId);
        return {
          ...prev,
          [columnId]: { type: column?.filterType ?? 'text', value, operator: 'contains' },
        };
      }),
    [columns]
  );

  return {
    rows,
    filteredRows,
    getRowId,
    search,
    setSearch,
    sort,
    setSort,
    toggleSort,
    filters,
    setFilter,
    clearFilters: () => setFilters({}),
    page: safePage,
    pageSize,
    pageCount,
    setPage,
    nextPage: () => setPage((p) => Math.min(p + 1, pageCount - 1)),
    prevPage: () => setPage((p) => Math.max(p - 1, 0)),
    canNextPage: safePage < pageCount - 1,
    canPrevPage: safePage > 0,
  };
}
