import { Skeleton } from '@voilajsx/uikit';

export default function SkeletonExample() {
  return (
    <div className="flex max-w-md flex-col gap-3">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
