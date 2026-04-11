/**
 * Essential utility functions for @bloomneo/uikit
 * @module @bloomneo/uikit
 * @file src/lib/utils.ts
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