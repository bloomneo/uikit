/**
 * <Pagination> — page navigation controls for paged content.
 * @module @bloomneo/uikit
 * @file src/components/ui/pagination.tsx
 *
 * @llm-rule WHEN: Navigating between pages of content (table pages, search results)
 * @llm-rule AVOID: Using for DataTable — DataTable has built-in pagination via `usePagination()`
 * @llm-rule NOTE: Nesting: Pagination > PaginationContent > PaginationItem > (PaginationPrevious | PaginationLink | PaginationEllipsis | PaginationNext)
 * @llm-rule NOTE: PaginationLink accepts `isActive` for current page. All items render as buttons by default
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { Button } from "@/components/ui/button";
declare function Pagination({ className, ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
declare function PaginationContent({ className, ...props }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
declare function PaginationItem({ ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> & React.ComponentProps<"a">;
declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): import("react/jsx-runtime").JSX.Element;
declare function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
//# sourceMappingURL=pagination.d.ts.map