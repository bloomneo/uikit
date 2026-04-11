/**
 * `useMediaQuery` — subscribe a component to a CSS media query.
 *
 * SSR-safe (returns `false` on the server, hydrates correctly on the client).
 * Cleans up its listener on unmount. No external dependencies.
 *
 * @example
 *   const isWide = useMediaQuery('(min-width: 1024px)');
 *   const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export declare function useMediaQuery(query: string): boolean;
//# sourceMappingURL=useMediaQuery.d.ts.map