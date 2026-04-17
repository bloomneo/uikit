/**
 * Locale-aware formatters — `formatCurrency`, `formatDate`, `formatNumber`, `formatBytes`, `timeAgo`.
 * @module @bloomneo/uikit
 * @file src/lib/format.ts
 *
 * @llm-rule WHEN: Displaying currency, dates, file sizes, numbers, or relative time in the UI
 * @llm-rule AVOID: Inline formatting (`${val}`, `new Date().toLocaleString()`) — always use these helpers
 * @llm-rule NOTE: All formatters are null-safe — `null` / `undefined` input returns `""`, never throws
 * @llm-rule NOTE: Uses `Intl.*` APIs — zero external dependencies. Pass `locale` option to override default
 * @llm-rule NOTE: `<Time>` component renders a <time> element with relative "X ago" display
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from 'react';
export type Nullable<T> = T | null | undefined;
export interface FormatCurrencyOptions {
    /** ISO 4217 currency code. Default: "USD". */
    currency?: string;
    /** BCP 47 locale tag. Default: "en-US". */
    locale?: string;
    /** Minimum fraction digits. Default: 2. */
    minimumFractionDigits?: number;
    /** Maximum fraction digits. Default: 2. */
    maximumFractionDigits?: number;
}
/** Format a number as currency. Returns "" for null/undefined/NaN. */
export declare function formatCurrency(value: Nullable<number>, options?: FormatCurrencyOptions): string;
export interface FormatNumberOptions {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    /** Render as percentage (multiplies by 100). Default: false. */
    percent?: boolean;
}
/** Format a plain number with locale grouping. */
export declare function formatNumber(value: Nullable<number>, options?: FormatNumberOptions): string;
export type DateInput = Nullable<Date | string | number>;
export interface FormatDateOptions {
    locale?: string;
    /** Intl.DateTimeFormat options, or one of the named presets. */
    preset?: 'short' | 'medium' | 'long' | 'full' | 'datetime' | 'time';
}
/** Format a date with a sensible preset. */
export declare function formatDate(input: DateInput, options?: FormatDateOptions): string;
export interface TimeAgoOptions {
    locale?: string;
    /** Reference point. Default: Date.now(). */
    now?: Date | number;
}
/**
 * Returns a relative time string like "3 minutes ago" or "in 2 days".
 * Uses Intl.RelativeTimeFormat for proper locale support.
 */
export declare function timeAgo(input: DateInput, options?: TimeAgoOptions): string;
export interface FormatBytesOptions {
    /** Number of decimal places. Default: 1. */
    decimals?: number;
    /** Use binary (1024) or decimal (1000) base. Default: decimal. */
    binary?: boolean;
}
/** Format a byte count as a human-readable string ("1.4 MB", "512 KB"). */
export declare function formatBytes(value: Nullable<number>, options?: FormatBytesOptions): string;
export interface TimeProps extends Omit<React.HTMLAttributes<HTMLTimeElement>, 'children'> {
    /** Timestamp to format. */
    date: DateInput;
    /** "relative" → "3 minutes ago"; "absolute" → "Jan 5, 2026". Default: "relative". */
    mode?: 'relative' | 'absolute';
    /** Update interval in milliseconds for relative mode. Default: 60_000. */
    updateInterval?: number;
    /** Locale tag. */
    locale?: string;
    /** Preset for absolute mode. */
    preset?: FormatDateOptions['preset'];
}
/**
 * `<Time />` renders a `<time>` element whose contents update on an interval
 * (relative mode) or once (absolute mode). Use this in chat threads, activity
 * feeds, dashboards — anywhere you want "5 minutes ago" to become "6 minutes
 * ago" without re-rendering the parent.
 */
export declare function Time({ date, mode, updateInterval, locale, preset, ...rest }: TimeProps): React.JSX.Element;
//# sourceMappingURL=format.d.ts.map