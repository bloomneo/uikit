/**
 * <Breadcrumb> — navigation path showing the user's location in the app.
 * @module @bloomneo/uikit
 * @file src/components/ui/breadcrumb.tsx
 *
 * @llm-rule WHEN: Multi-level navigation to show current page context
 * @llm-rule AVOID: Using for tab-style navigation — use <Tabs> or a router
 * @llm-rule NOTE: Nesting: Breadcrumb > BreadcrumbList > BreadcrumbItem > (BreadcrumbLink | BreadcrumbPage)
 * @llm-rule NOTE: Use BreadcrumbPage for the last (current) item, BreadcrumbLink for clickable ancestors
 * @llm-rule NOTE: BreadcrumbSeparator is auto-inserted between items. BreadcrumbEllipsis for collapsed middle items
 * @llm-rule NOTE: `asChild` on BreadcrumbLink lets you use Next.js <Link> or React Router <Link>
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
declare function Breadcrumb({ ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React.ComponentProps<"a"> & {
    asChild?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };
//# sourceMappingURL=breadcrumb.d.ts.map