/**
 * Essential utility functions for @bloomneo/uikit.
 * @module @bloomneo/uikit
 * @file src/lib/utils.ts
 *
 * @llm-rule WHEN: Merging Tailwind class names — always use `cn()` to avoid class conflicts
 * @llm-rule AVOID: Raw `className={...}` concatenation — `cn()` handles Tailwind merge + conditional classes
 * @llm-rule NOTE: `cn()` = `twMerge(clsx(...inputs))`. Accepts strings, arrays, objects, and falsy values
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names using clsx and tailwind-merge
 * This allows for proper handling of Tailwind CSS class conflicts
 * @param inputs - Class names to merge
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}