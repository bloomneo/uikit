/**
 * <Table> — raw HTML table primitives with UIKit styling.
 * @module @bloomneo/uikit
 * @file src/components/ui/table.tsx
 *
 * @llm-rule WHEN: Custom table layouts where you control every cell
 * @llm-rule AVOID: Using for sortable/filterable data — use <DataTable> instead
 * @llm-rule NOTE: Nesting order: Table > TableHeader > TableRow > TableHead, Table > TableBody > TableRow > TableCell
 * @llm-rule NOTE: Wraps in a scrollable container automatically — no need for overflow wrappers
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
declare function Table({ className, ...props }: React.ComponentProps<"table">): import("react/jsx-runtime").JSX.Element;
declare function TableHeader({ className, ...props }: React.ComponentProps<"thead">): import("react/jsx-runtime").JSX.Element;
declare function TableBody({ className, ...props }: React.ComponentProps<"tbody">): import("react/jsx-runtime").JSX.Element;
declare function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">): import("react/jsx-runtime").JSX.Element;
declare function TableRow({ className, ...props }: React.ComponentProps<"tr">): import("react/jsx-runtime").JSX.Element;
declare function TableHead({ className, ...props }: React.ComponentProps<"th">): import("react/jsx-runtime").JSX.Element;
declare function TableCell({ className, ...props }: React.ComponentProps<"td">): import("react/jsx-runtime").JSX.Element;
declare function TableCaption({ className, ...props }: React.ComponentProps<"caption">): import("react/jsx-runtime").JSX.Element;
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
//# sourceMappingURL=table.d.ts.map