/**
 * `useDataTable` — headless table state for @bloomneo/uikit.
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
import type { DataTableColumn, DataTableFilterValue, FilterConfig, SortConfig } from '@/components/ui/data-table';
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
    search: string;
    setSearch: (value: string) => void;
    sort: SortConfig[];
    setSort: (value: SortConfig[]) => void;
    toggleSort: (columnId: string) => void;
    filters: FilterConfig;
    setFilter: (columnId: string, value: DataTableFilterValue | null) => void;
    clearFilters: () => void;
    page: number;
    pageSize: number;
    pageCount: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    canNextPage: boolean;
    canPrevPage: boolean;
}
export declare function useDataTable<T>(options: UseDataTableOptions<T>): UseDataTableReturn<T>;
//# sourceMappingURL=useDataTable.d.ts.map