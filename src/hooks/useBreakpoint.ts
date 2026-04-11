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

import { useMediaQuery } from './useMediaQuery';

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;
export type BreakpointDirection = 'up' | 'down' | 'only';

/**
 * Resolve a breakpoint to a media query string. Exposed so consumers can
 * compose it with `useMediaQuery` directly when they need exotic queries.
 */
export function breakpointQuery(
  breakpoint: Breakpoint,
  direction: BreakpointDirection = 'up'
): string {
  const min = BREAKPOINTS[breakpoint];
  const order: Breakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  const next = order[order.indexOf(breakpoint) + 1];

  if (direction === 'up') return '(min-width: ' + min + 'px)';
  if (direction === 'down') return '(max-width: ' + (min - 1) + 'px)';
  // 'only': inclusive lower, exclusive upper.
  if (!next) return '(min-width: ' + min + 'px)';
  return '(min-width: ' + min + 'px) and (max-width: ' + (BREAKPOINTS[next] - 1) + 'px)';
}

export function useBreakpoint(
  breakpoint: Breakpoint,
  direction: BreakpointDirection = 'up'
): boolean {
  return useMediaQuery(breakpointQuery(breakpoint, direction));
}

/**
 * Returns the largest matching breakpoint, or `null` for screens narrower
 * than `sm`. Handy for switching layouts based on the active breakpoint
 * without composing five separate `useBreakpoint` calls.
 */
export function useActiveBreakpoint(): Breakpoint | null {
  const sm = useBreakpoint('sm');
  const md = useBreakpoint('md');
  const lg = useBreakpoint('lg');
  const xl = useBreakpoint('xl');
  const xxl = useBreakpoint('2xl');

  if (xxl) return '2xl';
  if (xl) return 'xl';
  if (lg) return 'lg';
  if (md) return 'md';
  if (sm) return 'sm';
  return null;
}
