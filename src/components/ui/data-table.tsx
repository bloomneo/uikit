/**
 * <DataTable> — professional data grid with sort, filter, search, pagination, and row actions.
 * @module @bloomneo/uikit
 * @file src/components/ui/data-table.tsx
 *
 * @llm-rule WHEN: Displaying tabular data with sorting, filtering, pagination, or row actions
 * @llm-rule AVOID: Using for simple static tables — use <Table> instead. Never pass `undefined` to `data` — use `[]`
 * @llm-rule NOTE: Every column needs a unique `id`. Pass `data` as `[]` while loading, not `undefined`
 * @llm-rule NOTE: Row actions via `rowActions` prop: `{ label, icon?, onClick, variant? }[]`
 * @llm-rule NOTE: Use `useDataTable()` hook for controlled state, or pass props directly for uncontrolled
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import * as React from 'react';
import { forwardRef, useState, useMemo, useCallback, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Download,
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { requireArrayProp, warnInDev } from '@/lib/errors';

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
  filterOptions?: Array<{ label: string; value: DataTableFilterValue }>;
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
  icon?: React.ComponentType<{ className?: string }>;
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
    icon?: React.ComponentType<{ className?: string }>;
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
 * Table variants
 */
const tableVariants = cva(
  'w-full border-collapse',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
      },
      bordered: {
        true: 'border border-border',
        false: ''
      }
    },
    defaultVariants: {
      size: 'md',
      bordered: true
    }
  }
);

const cellVariants = cva(
  'text-left border-b border-border transition-colors',
  {
    variants: {
      density: {
        compact: 'px-2 py-1',
        normal: 'px-3 py-2',
        comfortable: 'px-4 py-3'
      },
      pinned: {
        left: 'sticky left-0 z-10 bg-background',
        right: 'sticky right-0 z-10 bg-background',
        none: ''
      }
    },
    defaultVariants: {
      density: 'normal',
      pinned: 'none'
    }
  }
);

/**
 * Enhanced DataTable component
 */
const DataTable = forwardRef<HTMLTableElement, DataTableProps>((rawProps, ref) => {
  // Educational validation: catch the two most common misuses with messages
  // that name the prop and link to the docs entry, instead of crashing inside
  // a .map() call ten frames deep.
  requireArrayProp('DataTable', 'data', rawProps.data,
    'Pass an array (use [] while loading instead of undefined).');
  requireArrayProp('DataTable', 'columns', rawProps.columns,
    'Pass an array of DataTableColumn definitions.');
  if (rawProps.columns && rawProps.columns.some((c) => !c.id)) {
    warnInDev('DataTable',
      'Every column needs a unique `id` (used for sort/filter/render keys).');
  }

  const {
  data = [],
  columns = [],
  virtualized = false,
  rowHeight = 40,
  height,
  selectable = false,
  selectionMode = 'multiple',
  selectedRows = [],
  onSelectionChange,
  getRowId = (row, index) => index.toString(),
  sortable = true,
  sortConfig = [],
  onSortChange,
  filterable = true,
  filterConfig = {},
  onFilterChange,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  pagination = true,
  currentPage = 0,
  pageSize = 10,
  totalRows,
  onPageChange,
  onPageSizeChange,
  actions = [],
  bulkActions = [],
  expandable = false,
  expandedRows = [],
  onExpandChange,
  renderExpanded,
  loading = false,
  emptyState,
  error,
  exportable = false,
  exportFormats = ['csv', 'json'],
  onExport,
  size = 'md',
  density = 'normal',
  striped = false,
  bordered = true,
  hoverable = true,
  className,
  style,
  } = rawProps;

  // Internal state
  const [internalSort, setInternalSort] = useState<SortConfig[]>(sortConfig);
  const [internalFilters, setInternalFilters] = useState<FilterConfig>(filterConfig);
  const [internalSearch, setInternalSearch] = useState(searchValue);
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedRows);

  // Compute visible columns
  const visibleColumns = useMemo(() => 
    columns.filter(col => !col.hidden),
    [columns]
  );

  // Handle sorting
  const handleSort = useCallback((columnId: string) => {
    if (!sortable) return;

    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;

    const newSort = [...internalSort];
    const existingIndex = newSort.findIndex(s => s.key === columnId);

    if (existingIndex >= 0) {
      if (newSort[existingIndex].direction === 'asc') {
        newSort[existingIndex].direction = 'desc';
      } else {
        newSort.splice(existingIndex, 1);
      }
    } else {
      newSort.push({ key: columnId, direction: 'asc' });
    }

    setInternalSort(newSort);
    onSortChange?.(newSort);
  }, [sortable, columns, internalSort, onSortChange]);

  // Handle filtering
  const handleFilter = useCallback((columnId: string, value: DataTableFilterValue, operator: FilterOperator = 'contains') => {
    const newFilters = { ...internalFilters };
    
    if (value === '' || value == null) {
      delete newFilters[columnId];
    } else {
      const column = columns.find(col => col.id === columnId);
      newFilters[columnId] = {
        type: column?.filterType || 'text',
        value,
        operator
      };
    }

    setInternalFilters(newFilters);
    onFilterChange?.(newFilters);
  }, [columns, internalFilters, onFilterChange]);

  // Handle selection
  const handleSelectAll = useCallback((checked: boolean) => {
    if (!selectable) return;

    const newSelection = checked 
      ? data.map((row, index) => getRowId(row, index))
      : [];

    setInternalSelection(newSelection);
    onSelectionChange?.(newSelection);
  }, [selectable, data, getRowId, onSelectionChange]);

  const handleSelectRow = useCallback((rowId: string, checked: boolean) => {
    if (!selectable) return;

    let newSelection = [...internalSelection];
    
    if (selectionMode === 'single') {
      newSelection = checked ? [rowId] : [];
    } else {
      if (checked) {
        newSelection.push(rowId);
      } else {
        newSelection = newSelection.filter(id => id !== rowId);
      }
    }

    setInternalSelection(newSelection);
    onSelectionChange?.(newSelection);
  }, [selectable, selectionMode, internalSelection, onSelectionChange]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (internalSearch) {
      result = result.filter(row => {
        return visibleColumns.some(column => {
          const value = column.accessor 
            ? column.accessor(row)
            : column.accessorKey 
              ? (row as any)[column.accessorKey]
              : '';
          return String(value).toLowerCase().includes(internalSearch.toLowerCase());
        });
      });
    }

    // Apply filters
    Object.entries(internalFilters).forEach(([columnId, filter]) => {
      const column = columns.find(col => col.id === columnId);
      if (!column) return;

      result = result.filter(row => {
        const value = column.accessor 
          ? column.accessor(row)
          : column.accessorKey 
            ? (row as any)[column.accessorKey]
            : '';

        switch (filter.operator) {
          case 'equals':
            return value === filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
          case 'startsWith':
            return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
          case 'endsWith':
            return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
          case 'gt':
            return Number(value) > Number(filter.value);
          case 'lt':
            return Number(value) < Number(filter.value);
          case 'gte':
            return Number(value) >= Number(filter.value);
          case 'lte':
            return Number(value) <= Number(filter.value);
          default:
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
        }
      });
    });

    // Apply sorting
    if (internalSort.length > 0) {
      result.sort((a, b) => {
        for (const sort of internalSort) {
          const column = columns.find(col => col.id === sort.key);
          if (!column) continue;

          const aValue = column.accessor 
            ? column.accessor(a)
            : column.accessorKey 
              ? (a as any)[column.accessorKey]
              : '';
          
          const bValue = column.accessor 
            ? column.accessor(b)
            : column.accessorKey 
              ? (b as any)[column.accessorKey]
              : '';

          let comparison = 0;

          if (column.sortFn) {
            comparison = column.sortFn(aValue, bValue);
          } else {
            switch (column.dataType) {
              case 'number':
                comparison = Number(aValue) - Number(bValue);
                break;
              case 'date':
                comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
                break;
              case 'boolean':
                comparison = (aValue ? 1 : 0) - (bValue ? 1 : 0);
                break;
              default:
                comparison = String(aValue).localeCompare(String(bValue));
            }
          }

          if (comparison !== 0) {
            return sort.direction === 'asc' ? comparison : -comparison;
          }
        }
        return 0;
      });
    }

    return result;
  }, [data, internalSearch, internalFilters, internalSort, columns, visibleColumns]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return processedData.slice(start, end);
  }, [processedData, pagination, currentPage, pageSize]);

  const totalPages = Math.ceil((totalRows || processedData.length) / pageSize);

  // Render column header
  const renderColumnHeader = (column: DataTableColumn) => {
    const sortState = internalSort.find(s => s.key === column.id);
    const isSorted = !!sortState;
    const sortDirection = sortState?.direction;

    return (
      <th
        key={column.id}
        className={cn(
          cellVariants({ 
            density, 
            pinned: column.pinned || 'none' 
          }),
          'bg-muted/50 font-medium text-muted-foreground',
          column.sortable && 'cursor-pointer hover:bg-muted',
          column.className
        )}
        style={{ 
          width: column.width,
          minWidth: column.minWidth,
          maxWidth: column.maxWidth 
        }}
        onClick={() => column.sortable && handleSort(column.id)}
      >
        <div className="flex items-center gap-2">
          <span>{column.header}</span>
          {column.sortable && (
            <div className="flex flex-col">
              {!isSorted && <ArrowUpDown className="h-3 w-3" />}
              {isSorted && sortDirection === 'asc' && <SortAsc className="h-3 w-3" />}
              {isSorted && sortDirection === 'desc' && <SortDesc className="h-3 w-3" />}
            </div>
          )}
          {column.filterable && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                // Filter dropdown logic here
              }}
            >
              <Filter className="h-3 w-3" />
            </Button>
          )}
        </div>
      </th>
    );
  };

  // Render table row
  // Internal: rows pass through as `unknown` and accessors narrow them.
  // Public consumers see the generic `T` from `DataTableProps<T>`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderRow = (row: any, index: number) => {
    const rowId = getRowId(row, index);
    const isSelected = internalSelection.includes(rowId);
    const isExpanded = expandedRows.includes(rowId);

    return (
      <React.Fragment key={rowId}>
        <tr
          className={cn(
            'transition-colors',
            hoverable && 'hover:bg-muted/50',
            striped && index % 2 === 0 && 'bg-muted/20',
            isSelected && 'bg-primary/10'
          )}
        >
          {selectable && (
            <td className={cn(cellVariants({ density }))}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => 
                  handleSelectRow(rowId, checked as boolean)
                }
              />
            </td>
          )}
          
          {visibleColumns.map((column) => {
            const value = column.accessor 
              ? column.accessor(row)
              : column.accessorKey 
                ? row[column.accessorKey]
                : '';

            return (
              <td
                key={column.id}
                className={cn(
                  cellVariants({ 
                    density, 
                    pinned: column.pinned || 'none' 
                  }),
                  column.className
                )}
                style={{ 
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth 
                }}
              >
                {column.cell ? column.cell(value, row, index) : String(value)}
              </td>
            );
          })}

          {actions.length > 0 && (
            <td className={cn(cellVariants({ density }))}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actions
                    .filter(action => !action.visible || action.visible(row, index))
                    .map((action) => (
                      <DropdownMenuItem
                        key={action.id}
                        onClick={() => action.onClick(row, index)}
                        className={cn(
                          action.variant === 'destructive' && 'text-destructive'
                        )}
                      >
                        {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                        {action.label}
                      </DropdownMenuItem>
                    ))
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          )}
        </tr>

        {expandable && isExpanded && renderExpanded && (
          <tr>
            <td colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
              {renderExpanded(row, index)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={cn('space-y-4', className)} style={style}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={internalSearch}
                onChange={(e) => {
                  setInternalSearch(e.target.value);
                  onSearchChange?.(e.target.value);
                }}
                className="pl-8 w-64"
              />
            </div>
          )}

          {bulkActions.length > 0 && internalSelection.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {internalSelection.length} selected
              </Badge>
              {bulkActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant || 'default'}
                  size="sm"
                  onClick={() => {
                    const selectedData = data.filter((row, index) => 
                      internalSelection.includes(getRowId(row, index))
                    );
                    action.onClick(selectedData);
                  }}
                >
                  {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {exportable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {exportFormats.map((format) => (
                  <DropdownMenuItem
                    key={format}
                    onClick={() => onExport?.(format, processedData)}
                  >
                    Export as {format.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div 
        className="border border-border rounded-lg overflow-auto"
        style={{ height }}
      >
        <table
          ref={ref}
          className={cn(tableVariants({ size, bordered }))}
        >
          <thead>
            <tr>
              {selectable && (
                <th className={cn(cellVariants({ density }), 'bg-muted/50')}>
                  {selectionMode === 'multiple' && (
                    <Checkbox
                      checked={internalSelection.length === data.length && data.length > 0}
                      // Note: indeterminate styling handled via CSS classes since Checkbox doesn't support indeterminate prop
                      className={cn(
                        internalSelection.length > 0 && internalSelection.length < data.length && 
                        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground [&>svg]:opacity-50'
                      )}
                      onCheckedChange={handleSelectAll}
                    />
                  )}
                </th>
              )}
              {visibleColumns.map(renderColumnHeader)}
              {actions.length > 0 && (
                <th className={cn(cellVariants({ density }), 'bg-muted/50 w-16')}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8 text-destructive"
                >
                  {error}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td 
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-8"
                >
                  {emptyState || (
                    <div className="text-muted-foreground">
                      No data available
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map(renderRow)
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {currentPage * pageSize + 1} to{' '}
            {Math.min((currentPage + 1) * pageSize, totalRows || processedData.length)} of{' '}
            {totalRows || processedData.length} results
          </div>

          <div className="flex items-center gap-2">
            <Select 
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange?.(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => onPageChange?.(currentPage - 1)}
              >
                Previous
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = currentPage < 3 ? i : currentPage - 2 + i;
                if (page >= totalPages) return null;
                
                return (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange?.(page)}
                  >
                    {page + 1}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange?.(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

DataTable.displayName = 'DataTable';

/**
 * Generic-preserving wrapper.
 *
 * `forwardRef<HTMLTableElement, DataTableProps>` erases the row generic at the
 * VALUE level — even though `DataTableProps<T>` is generic at the TYPE level.
 * Consumers writing `<DataTable<User> data={users} columns={cols} />` would
 * get `TS2558: Expected 0 type arguments, but got 1`.
 *
 * Casting the forwardRef result to a generic call signature lets TypeScript
 * propagate `T` from the JSX type argument back into `data`, `columns`, `actions`,
 * `getRowId`, and the cell renderers — same runtime behavior, type-safe consumer API.
 *
 * Pattern lifted from the canonical TS+React generic-forwardRef recipe.
 */
type DataTableComponent = <T = unknown>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => React.ReactElement | null;

const DataTableTyped = DataTable as unknown as DataTableComponent;

export { DataTableTyped as DataTable };