'use client';

/**
 * <EmptyState> — the canonical "no data yet" affordance.
 * @module @bloomneo/uikit
 * @file src/components/ui/empty-state.tsx
 *
 * @llm-rule WHEN: No results, no data, first-time empty state (empty table, search with 0 hits)
 * @llm-rule AVOID: Using for loading states — use <Skeleton> instead
 * @llm-rule NOTE: `title` is required. `size`: 'sm' | 'md' | 'lg'. `action` renders below description
 * @llm-rule NOTE: `icon` accepts any ReactNode (Lucide icon, SVG). Renders with `role="status"` and `aria-live="polite"`
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 *
 * @example
 *   <EmptyState
 *     icon={<Inbox />}
 *     title="No designs yet"
 *     description="Create your first design to get started."
 *     action={<Button onClick={create}>Create design</Button>}
 *   />
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { requireProp } from '@/lib/errors';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon shown above the title. Pass any ReactNode (a Lucide icon, an svg, …). */
  icon?: React.ReactNode;
  /** Required: short headline. */
  title: string;
  /** Optional one-line explanation underneath the title. */
  description?: React.ReactNode;
  /** Optional CTA — usually a single Button or a small button group. */
  action?: React.ReactNode;
  /** Visual size. Defaults to "md". */
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<NonNullable<EmptyStateProps['size']>, string> = {
  sm: 'py-6 gap-2',
  md: 'py-12 gap-3',
  lg: 'py-20 gap-4',
};

const ICON_SIZE: Record<NonNullable<EmptyStateProps['size']>, string> = {
  sm: 'size-8',
  md: 'size-12',
  lg: 'size-16',
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  size = 'md',
  className,
  ...rest
}: EmptyStateProps): React.JSX.Element {
  requireProp('EmptyState', 'title', title, 'Pass a short headline like "No invoices yet".');

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        SIZE_CLASSES[size],
        className
      )}
      {...rest}
    >
      {icon && (
        <div
          className={cn(
            'flex items-center justify-center text-muted-foreground [&>svg]:h-full [&>svg]:w-full',
            ICON_SIZE[size]
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
