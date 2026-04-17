/**
 * <Calendar> — date picker built on react-day-picker with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/calendar.tsx
 *
 * @llm-rule WHEN: Date selection (single date, date range, multiple dates)
 * @llm-rule AVOID: Using alone for date input — wrap in a <Popover> for a dropdown date picker
 * @llm-rule NOTE: `mode="single"` for one date, `mode="range"` for start/end, `mode="multiple"` for many
 * @llm-rule NOTE: Controlled: `selected` + `onSelect`. Props pass through to react-day-picker
 * @llm-rule NOTE: `captionLayout="dropdown"` for month/year dropdowns instead of arrows
 * @llm-rule NOTE: Custom component — wraps react-day-picker (not Radix). Props pass through to DayPicker
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import { DayButton, DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}): import("react/jsx-runtime").JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>): import("react/jsx-runtime").JSX.Element;
export { Calendar, CalendarDayButton };
//# sourceMappingURL=calendar.d.ts.map