import { Button, usePagination } from '@bloomneo/uikit';

const ALL_ITEMS = Array.from({ length: 234 }, (_, i) => `Item ${i + 1}`);

export default function UsePaginationExample() {
  const pagination = usePagination({ total: ALL_ITEMS.length, pageSize: 10 });
  const visible = ALL_ITEMS.slice(pagination.startIndex, pagination.endIndex);

  return (
    <div className="flex flex-col gap-3">
      <ul className="grid grid-cols-2 gap-1 text-sm">
        {visible.map((item) => (
          <li key={item} className="rounded bg-muted px-2 py-1">{item}</li>
        ))}
      </ul>

      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" onClick={pagination.prev} disabled={!pagination.hasPrev}>
          Prev
        </Button>
        {pagination.pages.map((p, idx) =>
          p === 'ellipsis-start' || p === 'ellipsis-end' ? (
            <span key={`${p}-${idx}`} className="px-2 text-muted-foreground">…</span>
          ) : (
            <Button
              key={p}
              variant={p === pagination.page ? 'default' : 'outline'}
              size="sm"
              onClick={() => pagination.goTo(p)}
            >
              {p}
            </Button>
          )
        )}
        <Button variant="outline" size="sm" onClick={pagination.next} disabled={!pagination.hasNext}>
          Next
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Page {pagination.page} of {pagination.pageCount} ·{' '}
        showing {pagination.startIndex + 1}–{pagination.endIndex} of {pagination.total}
      </p>
    </div>
  );
}
