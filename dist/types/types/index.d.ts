/**
 * LLM-optimized type definitions for @bloomneo/uikit - COMPLETE & CONSISTENT
 * @module @bloomneo/uikit
 * @file src/types/index.ts
 */
import type { FieldValues, FieldPath } from 'react-hook-form';
import type { ZodSchema } from 'zod';
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
    filterOptions?: Array<{
        label: string;
        value: DataTableFilterValue;
    }>;
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
    icon?: React.ComponentType<{
        className?: string;
    }>;
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
 * Enhanced Form Types
 * @llm-usage React Hook Form + Zod validation system
 */
/**
 * Enhanced Form props with Zod validation
 */
export interface EnhancedFormProps<T extends FieldValues = FieldValues> {
    /** REQUIRED: Zod schema for validation */
    schema: ZodSchema<T>;
    /** OPTIONAL: Default values */
    defaultValues?: Partial<T>;
    /** REQUIRED: Form submission handler */
    onSubmit: (data: T) => void | Promise<void>;
    /** OPTIONAL: Error handler — receives react-hook-form's FieldErrors */
    onError?: (errors: import('react-hook-form').FieldErrors<T>) => void;
    /** OPTIONAL: Loading state */
    loading?: boolean;
    /** OPTIONAL: Form mode */
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
    /** OPTIONAL: Revalidate mode */
    reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
    /** OPTIONAL: Auto-save functionality */
    autoSave?: {
        enabled: boolean;
        debounceMs?: number;
        onSave?: (data: Partial<T>) => void;
    };
    /** OPTIONAL: Form layout */
    layout?: 'vertical' | 'horizontal' | 'inline';
    /** OPTIONAL: Form size */
    size?: 'sm' | 'md' | 'lg';
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Form content */
    children: React.ReactNode;
}
/**
 * Form field props
 */
export interface FormFieldProps<T extends FieldValues = FieldValues> {
    /** REQUIRED: Field name */
    name: FieldPath<T>;
    /** OPTIONAL: Field label */
    label?: string;
    /** OPTIONAL: Field description */
    description?: string;
    /** OPTIONAL: Field is required */
    required?: boolean;
    /** OPTIONAL: Field variant */
    variant?: 'default' | 'inline' | 'stacked';
    /** OPTIONAL: Additional CSS classes */
    className?: string;
    /** REQUIRED: Field content */
    children: React.ReactNode;
}
/**
 * Input field props
 */
export interface InputFieldProps<T extends FieldValues = FieldValues> {
    /** REQUIRED: Field name */
    name: FieldPath<T>;
    /** OPTIONAL: Input type */
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
    /** OPTIONAL: Placeholder text */
    placeholder?: string;
    /** OPTIONAL: Input is disabled */
    disabled?: boolean;
    /** OPTIONAL: Input is readonly */
    readOnly?: boolean;
    /** OPTIONAL: Show password toggle (for password type) */
    showPasswordToggle?: boolean;
    /** OPTIONAL: Input prefix icon */
    prefixIcon?: React.ComponentType<{
        className?: string;
    }>;
    /** OPTIONAL: Input suffix icon */
    suffixIcon?: React.ComponentType<{
        className?: string;
    }>;
    /** OPTIONAL: Additional props */
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
/**
 * Select field props
 */
export interface SelectFieldProps<T extends FieldValues = FieldValues> {
    /** REQUIRED: Field name */
    name: FieldPath<T>;
    /** OPTIONAL: Placeholder text */
    placeholder?: string;
    /** REQUIRED: Select options */
    options: Array<{
        label: string;
        value: string | number;
        disabled?: boolean;
    }>;
    /** OPTIONAL: Select is disabled */
    disabled?: boolean;
    /** OPTIONAL: Allow clearing selection */
    clearable?: boolean;
}
/**
 * Platform detection types
 */
export type Platform = 'web' | 'native' | 'tauri' | 'unknown';
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
export type { ComponentType, ReactNode, ReactElement, HTMLAttributes, ForwardRefExoticComponent, RefAttributes, } from 'react';
export type { FieldValues, FieldPath, UseFormReturn, SubmitHandler, SubmitErrorHandler, } from 'react-hook-form';
export type { ZodSchema } from 'zod';
//# sourceMappingURL=index.d.ts.map