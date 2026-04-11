/**
 * <EmptyState> — the canonical "no data yet" affordance.
 *
 * Every list / table / search result needs one. Shipping a primitive prevents
 * each page from rolling its own ad-hoc layout, and gives screen-reader users
 * a consistent landmark.
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