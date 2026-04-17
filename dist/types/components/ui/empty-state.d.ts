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
export declare function EmptyState({ icon, title, description, action, size, className, ...rest }: EmptyStateProps): React.JSX.Element;
//# sourceMappingURL=empty-state.d.ts.map