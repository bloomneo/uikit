/**
 * Enhanced DataTable - Professional grade with virtual scrolling, advanced filtering
 * @module @voilajsx/uikit
 * @file src/components/ui/data-table.tsx
 */
import * as React from 'react';
/**
 * Cell value type. Defaults to `unknown` so consumers must narrow before use.
 */
export type DataTableCellValue = unknown;
/**
 * Filter primitive value used by `FilterConfig`.
 */
export type DataTableFilterValue = string | number | boolean | Date | null;
/**
 * Column definition with enhanced features
 */
export interface DataTableColumn<TRow = unknown, TValue = DataTableCellValue> {
    /** Unique column identifier */
    id: string;
    /** Column header text */
    header: string;
    /** Data accessor key (a property of the row) */
    accessorKey?: keyof TRow & (string | number);
    /** Data accessor function (computed value) */
    accessor?: (row: TRow) => TValue;
    /** Cell renderer function */
    cell?: (value: TValue, row: TRow, index: number) => React.ReactNode;
    /** Column width (px or %) */
    width?: string | number;
    /** Minimum column width */
    minWidth?: number;
    /** Maximum column width */
    maxWidth?: number;
    /** Enable sorting */
    sortable?: boolean;
    /** Enable filtering */
    filterable?: boolean;
    /** Filter type */
    filterType?: 'text' | 'select' | 'date' | 'number' | 'boolean';
    /** Filter options for select type */
    filterOptions?: Array<{
        label: string;
        value: DataTableFilterValue;
    }>;
    /** Enable column resizing */
    resizable?: boolean;
    /** Hide column by default */
    hidden?: boolean;
    /** Pin column to left or right */
    pinned?: 'left' | 'right';
    /** Data type for sorting */
    dataType?: 'string' | 'number' | 'date' | 'boolean';
    /** Custom sort function */
    sortFn?: (a: TValue, b: TValue) => number;
    /** Column group */
    group?: string;
    /** Additional CSS classes */
    className?: string;
}
/**
 * Sort configuration
 */
export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
}
/**
 * Filter configuration
 */
export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
export interface FilterConfig {
    [key: string]: {
        type: 'text' | 'select' | 'date' | 'number' | 'boolean';
        value: DataTableFilterValue;
        operator?: FilterOperator;
    };
}
/**
 * Row action definition
 */
export interface RowAction<TRow = unknown> {
    /** Action identifier */
    id: string;
    /** Action label */
    label: string;
    /** Action icon */
    icon?: React.ComponentType<{
        className?: string;
    }>;
    /** Action handler */
    onClick: (row: TRow, index: number) => void;
    /** Conditional visibility */
    visible?: (row: TRow, index: number) => boolean;
    /** Action variant */
    variant?: 'default' | 'destructive' | 'secondary';
    /** Confirmation required */
    confirmation?: {
        title: string;
        description: string;
    };
}
/**
 * DataTable component props
 */
export interface DataTableProps<T = unknown> {
    /** Table data */
    data: T[];
    /** Column definitions */
    columns: DataTableColumn<T>[];
    /** Enable virtual scrolling for large datasets */
    virtualized?: boolean;
    /** Row height for virtualization */
    rowHeight?: number;
    /** Table height (triggers virtualization) */
    height?: number | string;
    /** Enable row selection */
    selectable?: boolean;
    /** Selection mode */
    selectionMode?: 'single' | 'multiple';
    /** Selected row keys */
    selectedRows?: string[];
    /** Selection change handler */
    onSelectionChange?: (selectedKeys: string[]) => void;
    /** Row key extractor */
    getRowId?: (row: T, index: number) => string;
    /** Enable sorting */
    sortable?: boolean;
    /** Current sort configuration */
    sortConfig?: SortConfig[];
    /** Sort change handler */
    onSortChange?: (sortConfig: SortConfig[]) => void;
    /** Enable filtering */
    filterable?: boolean;
    /** Current filter configuration */
    filterConfig?: FilterConfig;
    /** Filter change handler */
    onFilterChange?: (filterConfig: FilterConfig) => void;
    /** Enable search */
    searchable?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Search value */
    searchValue?: string;
    /** Search change handler */
    onSearchChange?: (value: string) => void;
    /** Enable pagination */
    pagination?: boolean;
    /** Current page (0-indexed) */
    currentPage?: number;
    /** Page size */
    pageSize?: number;
    /** Total rows (for server-side pagination) */
    totalRows?: number;
    /** Page change handler */
    onPageChange?: (page: number) => void;
    /** Page size change handler */
    onPageSizeChange?: (pageSize: number) => void;
    /** Row actions */
    actions?: RowAction<T>[];
    /** Bulk actions */
    bulkActions?: Array<{
        id: string;
        label: string;
        icon?: React.ComponentType<{
            className?: string;
        }>;
        onClick: (selectedRows: T[]) => void;
        variant?: 'default' | 'destructive' | 'secondary';
    }>;
    /** Enable row expansion */
    expandable?: boolean;
    /** Expanded rows */
    expandedRows?: string[];
    /** Expand change handler */
    onExpandChange?: (expandedKeys: string[]) => void;
    /** Row expansion renderer */
    renderExpanded?: (row: T, index: number) => React.ReactNode;
    /** Loading state */
    loading?: boolean;
    /** Empty state */
    emptyState?: React.ReactNode;
    /** Error state */
    error?: string | React.ReactNode;
    /** Enable export */
    exportable?: boolean;
    /** Export formats */
    exportFormats?: Array<'csv' | 'json' | 'excel'>;
    /** Export handler */
    onExport?: (format: string, data: T[]) => void;
    /** Table size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Table density */
    density?: 'compact' | 'normal' | 'comfortable';
    /** Striped rows */
    striped?: boolean;
    /** Border style */
    bordered?: boolean;
    /** Hover effect */
    hoverable?: boolean;
    /** Additional CSS classes */
    className?: string;
    /** Custom styles */
    style?: React.CSSProperties;
}
/**
 * Enhanced DataTable component
 */
declare const DataTable: React.ForwardRefExoticComponent<DataTableProps<unknown> & React.RefAttributes<HTMLTableElement>>;
export { DataTable };
//# sourceMappingURL=data-table.d.ts.map