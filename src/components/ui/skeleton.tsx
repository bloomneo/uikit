/**
 * <Skeleton> — placeholder loading animation.
 * @module @bloomneo/uikit
 * @file src/components/ui/skeleton.tsx
 *
 * @llm-rule WHEN: Content is loading — show skeleton shapes that match the expected layout
 * @llm-rule AVOID: Using when there's no data at all — use <EmptyState> for "no results" states
 * @llm-rule NOTE: Style with className to match the shape of what's loading: `h-4 w-[250px]` for text, `h-12 w-12 rounded-full` for avatar
 * @llm-rule NOTE: Animates with `pulse` by default. Stack multiple Skeletons to approximate a full card/row
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
