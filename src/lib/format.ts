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
export function formatCurrency(
  value: Nullable<number>,
  options: FormatCurrencyOptions = {}
): string {
  if (value == null || Number.isNaN(value)) return '';
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  /** Render as percentage (multiplies by 100). Default: false. */
  percent?: boolean;
}

/** Format a plain number with locale grouping. */
export function formatNumber(
  value: Nullable<number>,
  options: FormatNumberOptions = {}
): string {
  if (value == null || Number.isNaN(value)) return '';
  const {
    locale = 'en-US',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    percent = false,
  } = options;
  return new Intl.NumberFormat(locale, {
    style: percent ? 'percent' : 'decimal',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export type DateInput = Nullable<Date | string | number>;

export interface FormatDateOptions {
  locale?: string;
  /** Intl.DateTimeFormat options, or one of the named presets. */
  preset?: 'short' | 'medium' | 'long' | 'full' | 'datetime' | 'time';
}

const DATE_PRESETS: Record<NonNullable<FormatDateOptions['preset']>, Intl.DateTimeFormatOptions> = {
  short: { year: 'numeric', month: 'numeric', day: 'numeric' },
  medium: { year: 'numeric', month: 'short', day: 'numeric' },
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  datetime: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  },
  time: { hour: 'numeric', minute: 'numeric' },
};

function toDate(input: DateInput): Date | null {
  if (input == null) return null;
  const d = input instanceof Date ? input : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Format a date with a sensible preset. */
export function formatDate(input: DateInput, options: FormatDateOptions = {}): string {
  const date = toDate(input);
  if (!date) return '';
  const { locale = 'en-US', preset = 'medium' } = options;
  return new Intl.DateTimeFormat(locale, DATE_PRESETS[preset]).format(date);
}

const RELATIVE_THRESHOLDS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

export interface TimeAgoOptions {
  locale?: string;
  /** Reference point. Default: Date.now(). */
  now?: Date | number;
}

/**
 * Returns a relative time string like "3 minutes ago" or "in 2 days".
 * Uses Intl.RelativeTimeFormat for proper locale support.
 */
export function timeAgo(input: DateInput, options: TimeAgoOptions = {}): string {
  const date = toDate(input);
  if (!date) return '';
  const { locale = 'en-US', now = Date.now() } = options;
  const nowMs = typeof now === 'number' ? now : now.getTime();
  const diffSeconds = Math.round((date.getTime() - nowMs) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  for (const [unit, secondsInUnit] of RELATIVE_THRESHOLDS) {
    if (absSeconds >= secondsInUnit || unit === 'second') {
      const value = Math.round(diffSeconds / secondsInUnit);
      return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
    }
  }
  return '';
}

const BYTE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export interface FormatBytesOptions {
  /** Number of decimal places. Default: 1. */
  decimals?: number;
  /** Use binary (1024) or decimal (1000) base. Default: decimal. */
  binary?: boolean;
}

/** Format a byte count as a human-readable string ("1.4 MB", "512 KB"). */
export function formatBytes(value: Nullable<number>, options: FormatBytesOptions = {}): string {
  if (value == null || Number.isNaN(value)) return '';
  const { decimals = 1, binary = false } = options;
  const base = binary ? 1024 : 1000;
  if (value === 0) return '0 B';
  const i = Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(base)), BYTE_UNITS.length - 1);
  const scaled = value / Math.pow(base, i);
  return scaled.toFixed(decimals) + ' ' + BYTE_UNITS[i];
}

/* ------------------------------------------------------------------------- */
/* <Time /> — auto-updating relative timestamp                                */
/* ------------------------------------------------------------------------- */

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
export function Time({
  date,
  mode = 'relative',
  updateInterval = 60_000,
  locale,
  preset,
  ...rest
}: TimeProps): React.JSX.Element {
  const [, force] = React.useReducer((n: number) => n + 1, 0);

  React.useEffect(() => {
    if (mode !== 'relative') return;
    const id = window.setInterval(() => force(), updateInterval);
    return () => window.clearInterval(id);
  }, [mode, updateInterval]);

  const text =
    mode === 'relative'
      ? timeAgo(date, locale ? { locale } : undefined)
      : formatDate(date, { locale, preset });

  const iso = (() => {
    const d = toDate(date);
    return d ? d.toISOString() : undefined;
  })();

  return React.createElement('time', { dateTime: iso, ...rest }, text);
}
