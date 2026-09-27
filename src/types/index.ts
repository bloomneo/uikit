/**
 * LLM-optimized type definitions for @bloomneo/uikit - COMPLETE & CONSISTENT
 * @module @bloomneo/uikit
 * @file src/types/index.ts
 */

import type {
  ComponentType,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';


/**
 * Standardized size variants - CONSISTENT across ALL components
 * @llm-rule Use same sizes everywhere for predictability
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * System color scheme preference
 * @llm-rule mode: System-level light/dark preference
 */
export type Mode = 'light' | 'dark';

/**
 * Pre-bundled theme options
 * @llm-rule theme: Pre-bundled CSS themes included in package
 */
/**
 * Theme id. `base` is the only bundled theme; any other string is a custom
 * theme you generated with `uikit generate theme <name>`, which is why this
 * is not a closed union.
 */
export type Theme = 'base' | (string & {});

/**
 * Semantic tone system for component emphasis
 * @llm-rule tone: Component-level visual emphasis
 * clean → Pure, minimal, white/light backgrounds (most websites)
 * subtle → Muted, supporting, gray areas (admin panels)
 * brand → Primary colored, branded elements (headers, CTAs)
 * contrast → High emphasis, dark/bold areas (footers, emphasis)
 */
export type Tone = 'clean' | 'subtle' | 'brand' | 'contrast';



/**
 * Enhanced DataTable Types
 * @llm-usage Professional data tables with sorting, filtering, pagination
 */

/**
 * Cell value extracted from a row by `accessor` / `accessorKey`. Defaults to
 * `unknown` so consumers must narrow the type before using it — this is the
 * point of the generic.
 */
export type DataTableCellValue = unknown;

/**
 * Filter primitive value used by `FilterConfig`. Kept narrow enough to round-
 * trip through URL params and `Intl` formatters without losing information.
 */
export type DataTableFilterValue = string | number | boolean | Date | null;

/**
 * DataTable column definition
 */
export interface DataTableColumn<TRow = unknown, TValue = DataTableCellValue> {
  /** REQUIRED: Unique column identifier */
  id: string;
  /** REQUIRED: Column header text */
  header: string;
  /** OPTIONAL: Data accessor key (a property of the row) */
  accessorKey?: keyof TRow & (string | number);
  /** OPTIONAL: Data accessor function (computed value) */
  accessor?: (row: TRow) => TValue;
  /** OPTIONAL: Cell renderer function */
  cell?: (value: TValue, row: TRow, index: number) => React.ReactNode;
  /** OPTIONAL: Column width */
  width?: string | number;
  minWidth?: number;
  maxWidth?: number;
  /** OPTIONAL: Enable sorting */
  sortable?: boolean;
  /** OPTIONAL: Enable filtering */
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number' | 'boolean';
  filterOptions?: Array<{ label: string; value: DataTableFilterValue }>;
  /** OPTIONAL: Enable column resizing */
  resizable?: boolean;
  /** OPTIONAL: Hide column by default */
  hidden?: boolean;
  /** OPTIONAL: Pin column to left or right */
  pinned?: 'left' | 'right';
  /** OPTIONAL: Data type for sorting */
  dataType?: 'string' | 'number' | 'date' | 'boolean';
  /** OPTIONAL: Custom sort function */
  sortFn?: (a: TValue, b: TValue) => number;
  /** OPTIONAL: Column group */
  group?: string;
  /** OPTIONAL: Additional CSS classes */
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
  /** REQUIRED: Action identifier */
  id: string;
  /** REQUIRED: Action label */
  label: string;
  /** OPTIONAL: Action icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** REQUIRED: Action handler */
  onClick: (row: TRow, index: number) => void;
  /** OPTIONAL: Conditional visibility */
  visible?: (row: TRow, index: number) => boolean;
  /** OPTIONAL: Action variant */
  variant?: 'default' | 'destructive' | 'secondary';
  /** OPTIONAL: Confirmation required */
  confirmation?: {
    title: string;
    description: string;
  };
}

/**
 * Legacy theme config interface for backward compatibility
 */
export interface ThemeConfig {
  id: Theme;
  name: string;
  description?: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

/**
 * Re-export commonly used types for convenience
 */
export type {
  ComponentType,
  ReactNode,
  ReactElement,
  HTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
