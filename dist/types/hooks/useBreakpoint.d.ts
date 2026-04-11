/**
 * `useBreakpoint` — read responsive breakpoints from React.
 *
 * Mirrors Tailwind v4's default breakpoint scale (sm/md/lg/xl/2xl) so that
 * `useBreakpoint('md')` and the `md:` Tailwind utility class always agree
 * about what "medium" means. If you customize Tailwind's screens, also pass
 * the override map via `BREAKPOINTS` (see below).
 *
 * @example
 *   const isAtLeastMd = useBreakpoint('md');         // true when ≥ 768px
 *   const isMobile = useBreakpoint('md', 'down');    // true when < 768px
 *   const isExactly = useBreakpoint('lg', 'only');   // true on lg, not xl+
 */
export declare const BREAKPOINTS: {
    readonly sm: 640;
    readonly md: 768;
    readonly lg: 1024;
    readonly xl: 1280;
    readonly '2xl': 1536;
};
export type Breakpoint = keyof typeof BREAKPOINTS;
export type BreakpointDirection = 'up' | 'down' | 'only';
/**
 * Resolve a breakpoint to a media query string. Exposed so consumers can
 * compose it with `useMediaQuery` directly when they need exotic queries.
 */
export declare function breakpointQuery(breakpoint: Breakpoint, direction?: BreakpointDirection): string;
export declare function useBreakpoint(breakpoint: Breakpoint, direction?: BreakpointDirection): boolean;
/**
 * Returns the largest matching breakpoint, or `null` for screens narrower
 * than `sm`. Handy for switching layouts based on the active breakpoint
 * without composing five separate `useBreakpoint` calls.
 */
export declare function useActiveBreakpoint(): Breakpoint | null;
//# sourceMappingURL=useBreakpoint.d.ts.map