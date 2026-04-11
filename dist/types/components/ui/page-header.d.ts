/**
 * <PageHeader> — the standard top-of-page block.
 *
 * Replaces the hand-rolled "icon + title + description + actions" combo that
 * appears on every admin/settings/detail page. Optionally renders a back link
 * and breadcrumbs above the title.
 *
 * @example
 *   <PageHeader
 *     icon={<Users />}
 *     title="User management"
 *     description="View and manage all users"
 *     breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
 *     actions={<Button>Add user</Button>}
 *   />
 */
import * as React from 'react';
export interface PageHeaderCrumb {
    label: string;
    /** When omitted the crumb renders as plain text (current page). */
    href?: string;
}
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Required headline. */
    title: string;
    /** Optional supporting copy. */
    description?: React.ReactNode;
    /** Optional icon shown to the left of the title. */
    icon?: React.ReactNode;
    /** Optional breadcrumb list rendered above the title. */
    breadcrumbs?: PageHeaderCrumb[];
    /** Optional action area, typically buttons. */
    actions?: React.ReactNode;
    /**
     * If provided, the breadcrumb anchors and the icon link to this prop. This
     * lets the component stay router-agnostic — pass a Next.js / React Router
     * Link as a render prop, or just a string href.
     */
    renderLink?: (props: {
        href: string;
        children: React.ReactNode;
    }) => React.ReactNode;
}
export declare function PageHeader({ title, description, icon, breadcrumbs, actions, renderLink, className, ...rest }: PageHeaderProps): React.JSX.Element;
//# sourceMappingURL=page-header.d.ts.map