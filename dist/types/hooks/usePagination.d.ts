/**
 * `usePagination` — pagination state machine.
 *
 * The `<Pagination>` UI component already ships, but the state (current page,
 * total pages, hasNext, hasPrev, ellipsis logic) gets reinvented in every list
 * page. This hook provides the canonical state shape so the loop can be:
 *
 *   const pagination = usePagination({ total: 1234, pageSize: 25 });
 *   const items = data.slice(pagination.startIndex, pagination.endIndex);
 *
 *   {pagination.pages.map((p) =>
 *     p === 'ellipsis'
 *       ? <PaginationEllipsis key={...} />
 *       : <PaginationLink key={p} isActive={p === pagination.page} onClick={() => pagination.goTo(p)}>{p}</PaginationLink>
 *   )}
 *
 * @example Server-side pagination
 *   const pagination = usePagination({ total: serverTotal, pageSize: 25 });
 *   useEffect(() => { fetchPage(pagination.page); }, [pagination.page]);
 */
export interface UsePaginationOptions {
    /** Total number of items across all pages. */
    total: number;
    /** Number of items per page. Default: 10. */
    pageSize?: number;
    /** Initial page (1-indexed). Default: 1. */
    initialPage?: number;
    /** Maximum number of page links to render around the active page. Default: 5. */
    siblingCount?: number;
}
export type PaginationPage = number | 'ellipsis-start' | 'ellipsis-end';
export interface UsePaginationReturn {
    /** Current page (1-indexed). */
    page: number;
    /** Items per page. */
    pageSize: number;
    /** Total items. */
    total: number;
    /** Total number of pages. Always >= 1. */
    pageCount: number;
    /** Zero-indexed start of the current page slice (use with array.slice). */
    startIndex: number;
    /** Zero-indexed exclusive end of the current page slice. */
    endIndex: number;
    /** Whether there's a next page. */
    hasNext: boolean;
    /** Whether there's a previous page. */
    hasPrev: boolean;
    /**
     * Page numbers to render in the pagination UI, with `'ellipsis-start'` and
     * `'ellipsis-end'` markers where compression occurs. Already filtered for
     * edge cases (single page, near start/end, etc).
     */
    pages: PaginationPage[];
    /** Set page directly (clamped to [1, pageCount]). */
    goTo: (page: number) => void;
    /** Advance to the next page if possible. */
    next: () => void;
    /** Go back to the previous page if possible. */
    prev: () => void;
    /** Jump to the first page. */
    first: () => void;
    /** Jump to the last page. */
    last: () => void;
}
export declare function usePagination(options: UsePaginationOptions): UsePaginationReturn;
//# sourceMappingURL=usePagination.d.ts.map