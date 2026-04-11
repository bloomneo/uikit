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

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);

    // Sync once in case the initial render value is stale (StrictMode, hydration).
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // `addEventListener` is the modern API; the older `addListener` is kept for
    // Safari < 14 compatibility, which UIKit still supports.
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql as any).addListener(handler);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).removeListener(handler);
    };
  }, [query]);

  return matches;
}
