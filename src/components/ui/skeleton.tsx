'use client';

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
  // Uses `bg-foreground/10` — a 10% overlay of the text color — so the
  // placeholder reads as a neutral darkening of the current background
  // across every theme. `bg-muted` isn't reliable here because brand
  // themes (e.g. the sky-tinted base theme) define muted as a pale
  // theme color, which produces a visible color flash on load.
  // Callers can override via className for themed skeletons.
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-foreground/10 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
