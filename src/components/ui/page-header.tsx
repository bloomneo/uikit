'use client';

/**
 * <PageHeader> — the standard top-of-page block with icon, title, breadcrumbs, and actions.
 * @module @bloomneo/uikit
 * @file src/components/ui/page-header.tsx
 *
 * @llm-rule WHEN: Top of admin/settings/detail pages (title + optional description + optional actions)
 * @llm-rule AVOID: Using for navigation bars — use Layout headers or <Header> section component
 * @llm-rule NOTE: `title` is required. Optional: `description`, `icon`, `breadcrumbs`, `actions`
 * @llm-rule NOTE: `renderLink` prop for router-agnostic breadcrumb links (pass Next.js Link or React Router Link)
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
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
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { requireProp } from '@/lib/errors';

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
  renderLink?: (props: { href: string; children: React.ReactNode }) => React.ReactNode;
}

function defaultRenderLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="hover:text-foreground">
      {children}
    </a>
  );
}

export function PageHeader({
  title,
  description,
  icon,
  breadcrumbs,
  actions,
  renderLink = defaultRenderLink,
  className,
  ...rest
}: PageHeaderProps): React.JSX.Element {
  requireProp('PageHeader', 'title', title, 'Every page header needs a title.');

  return (
    <div
      className={cn('flex flex-col gap-3 border-b border-border pb-4', className)}
      {...rest}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            {breadcrumbs.map((crumb, i) => {
              const isLast = i === breadcrumbs.length - 1;
              return (
                <li key={i} className="flex items-center gap-1">
                  {crumb.href && !isLast
                    ? renderLink({ href: crumb.href, children: crumb.label })
                    : (
                      <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-foreground' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  {!isLast && <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          {icon && (
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&>svg]:size-5" aria-hidden="true">
              {icon}
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
