import { useActiveBreakpoint, useBreakpoint, useMediaQuery } from '@bloomneo/uikit';

export default function UseBreakpointExample() {
  const isAtLeastMd = useBreakpoint('md');               // true when ≥ 768px
  const isMobile    = useBreakpoint('md', 'down');       // true when < 768px
  const active      = useActiveBreakpoint();             // 'sm' | 'md' | 'lg' | …
  const reduced     = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <ul className="space-y-1 text-sm">
      <li>active: <code>{active ?? '< sm'}</code></li>
      <li>≥ md: <code>{String(isAtLeastMd)}</code></li>
      <li>mobile: <code>{String(isMobile)}</code></li>
      <li>reduced motion: <code>{String(reduced)}</code></li>
    </ul>
  );
}
