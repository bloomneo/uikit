import { jsxs as l, jsx as a } from "react/jsx-runtime";
import * as Ae from "react";
import { forwardRef as Ve, useState as j, useMemo as R, useCallback as T } from "react";
import { c as ee } from "./index-Bke1qZdk.js";
import { c as o } from "./utils-CwJPJKOE.js";
import { Button as b } from "./button.js";
import { Input as Ee } from "./input.js";
import { Badge as Fe } from "./badge.js";
import { Checkbox as G } from "./checkbox.js";
import { Select as Ke, SelectTrigger as Re, SelectValue as qe, SelectContent as Ie, SelectItem as A } from "./select.js";
import { DropdownMenu as J, DropdownMenuTrigger as Q, DropdownMenuContent as X, DropdownMenuItem as Y } from "./dropdown-menu.js";
import { requireArrayProp as Z, warnInDev as Pe } from "./errors.js";
import { S as Ue } from "./search-CpUwRnG-.js";
import { c as C } from "./createLucideIcon-B45kRl5r.js";
import { E as He } from "./ellipsis-BhAoKPVk.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Be = C("ArrowDownWideNarrow", [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = C("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _e = C("ArrowUpNarrowWide", [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ge = C("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = C("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $ = C("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]), Qe = ee(
  "w-full border-collapse",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      },
      bordered: {
        true: "border border-border",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      bordered: !0
    }
  }
), x = ee(
  "text-left border-b border-border transition-colors",
  {
    variants: {
      density: {
        compact: "px-2 py-1",
        normal: "px-3 py-2",
        comfortable: "px-4 py-3"
      },
      pinned: {
        left: "sticky left-0 z-10 bg-background",
        right: "sticky right-0 z-10 bg-background",
        none: ""
      }
    },
    defaultVariants: {
      density: "normal",
      pinned: "none"
    }
  }
), Xe = Ve((S, te) => {
  Z(
    "DataTable",
    "data",
    S.data,
    "Pass an array (use [] while loading instead of undefined)."
  ), Z(
    "DataTable",
    "columns",
    S.columns,
    "Pass an array of DataTableColumn definitions."
  ), S.columns && S.columns.some((e) => !e.id) && Pe(
    "DataTable",
    "Every column needs a unique `id` (used for sort/filter/render keys)."
  );
  const {
    data: u = [],
    columns: h = [],
    virtualized: Ye = !1,
    rowHeight: Ze = 40,
    height: ae,
    selectable: d = !1,
    selectionMode: V = "multiple",
    selectedRows: re = [],
    onSelectionChange: M,
    getRowId: D = (e, n) => n.toString(),
    sortable: q = !0,
    sortConfig: ne = [],
    onSortChange: I,
    filterable: $e = !0,
    filterConfig: se = {},
    onFilterChange: P,
    searchable: ie = !0,
    searchPlaceholder: le = "Search...",
    searchValue: ce = "",
    onSearchChange: oe,
    pagination: E = !0,
    currentPage: c = 0,
    pageSize: y = 10,
    totalRows: F,
    onPageChange: K,
    onPageSizeChange: de,
    actions: v = [],
    bulkActions: U = [],
    expandable: he = !1,
    expandedRows: me = [],
    onExpandChange: et,
    renderExpanded: H,
    loading: ue = !1,
    emptyState: pe,
    error: B,
    exportable: ge = !1,
    exportFormats: fe = ["csv", "json"],
    onExport: be,
    size: ye = "md",
    density: N = "normal",
    striped: ve = !1,
    bordered: we = !0,
    hoverable: Ne = !0,
    className: ke,
    style: xe
  } = S, [k, Ce] = j(ne), [z, Se] = j(se), [W, Me] = j(ce), [m, O] = j(re), p = R(
    () => h.filter((e) => !e.hidden),
    [h]
  ), De = T((e) => {
    if (!q || !h.find((i) => i.id === e)?.sortable) return;
    const t = [...k], s = t.findIndex((i) => i.key === e);
    s >= 0 ? t[s].direction === "asc" ? t[s].direction = "desc" : t.splice(s, 1) : t.push({ key: e, direction: "asc" }), Ce(t), I?.(t);
  }, [q, h, k, I]);
  T((e, n, t = "contains") => {
    const s = { ...z };
    if (n === "" || n == null)
      delete s[e];
    else {
      const i = h.find((r) => r.id === e);
      s[e] = {
        type: i?.filterType || "text",
        value: n,
        operator: t
      };
    }
    Se(s), P?.(s);
  }, [h, z, P]);
  const ze = T((e) => {
    if (!d) return;
    const n = e ? u.map((t, s) => D(t, s)) : [];
    O(n), M?.(n);
  }, [d, u, D, M]), We = T((e, n) => {
    if (!d) return;
    let t = [...m];
    V === "single" ? t = n ? [e] : [] : n ? t.push(e) : t = t.filter((s) => s !== e), O(t), M?.(t);
  }, [d, V, m, M]), w = R(() => {
    let e = [...u];
    return W && (e = e.filter((n) => p.some((t) => {
      const s = t.accessor ? t.accessor(n) : t.accessorKey ? n[t.accessorKey] : "";
      return String(s).toLowerCase().includes(W.toLowerCase());
    }))), Object.entries(z).forEach(([n, t]) => {
      const s = h.find((i) => i.id === n);
      s && (e = e.filter((i) => {
        const r = s.accessor ? s.accessor(i) : s.accessorKey ? i[s.accessorKey] : "";
        switch (t.operator) {
          case "equals":
            return r === t.value;
          case "contains":
            return String(r).toLowerCase().includes(String(t.value).toLowerCase());
          case "startsWith":
            return String(r).toLowerCase().startsWith(String(t.value).toLowerCase());
          case "endsWith":
            return String(r).toLowerCase().endsWith(String(t.value).toLowerCase());
          case "gt":
            return Number(r) > Number(t.value);
          case "lt":
            return Number(r) < Number(t.value);
          case "gte":
            return Number(r) >= Number(t.value);
          case "lte":
            return Number(r) <= Number(t.value);
          default:
            return String(r).toLowerCase().includes(String(t.value).toLowerCase());
        }
      }));
    }), k.length > 0 && e.sort((n, t) => {
      for (const s of k) {
        const i = h.find((Te) => Te.id === s.key);
        if (!i) continue;
        const r = i.accessor ? i.accessor(n) : i.accessorKey ? n[i.accessorKey] : "", g = i.accessor ? i.accessor(t) : i.accessorKey ? t[i.accessorKey] : "";
        let f = 0;
        if (i.sortFn)
          f = i.sortFn(r, g);
        else
          switch (i.dataType) {
            case "number":
              f = Number(r) - Number(g);
              break;
            case "date":
              f = new Date(r).getTime() - new Date(g).getTime();
              break;
            case "boolean":
              f = (r ? 1 : 0) - (g ? 1 : 0);
              break;
            default:
              f = String(r).localeCompare(String(g));
          }
        if (f !== 0)
          return s.direction === "asc" ? f : -f;
      }
      return 0;
    }), e;
  }, [u, W, z, k, h, p]), _ = R(() => {
    if (!E) return w;
    const e = c * y, n = e + y;
    return w.slice(e, n);
  }, [w, E, c, y]), L = Math.ceil((F || w.length) / y), Le = (e) => {
    const n = k.find((i) => i.key === e.id), t = !!n, s = n?.direction;
    return /* @__PURE__ */ a(
      "th",
      {
        className: o(
          x({
            density: N,
            pinned: e.pinned || "none"
          }),
          "bg-muted/50 font-medium text-muted-foreground",
          e.sortable && "cursor-pointer hover:bg-muted",
          e.className
        ),
        style: {
          width: e.width,
          minWidth: e.minWidth,
          maxWidth: e.maxWidth
        },
        onClick: () => e.sortable && De(e.id),
        children: /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ a("span", { children: e.header }),
          e.sortable && /* @__PURE__ */ l("div", { className: "flex flex-col", children: [
            !t && /* @__PURE__ */ a(Oe, { className: "h-3 w-3" }),
            t && s === "asc" && /* @__PURE__ */ a(_e, { className: "h-3 w-3" }),
            t && s === "desc" && /* @__PURE__ */ a(Be, { className: "h-3 w-3" })
          ] }),
          e.filterable && /* @__PURE__ */ a(
            b,
            {
              variant: "ghost",
              size: "sm",
              className: "h-6 w-6 p-0",
              onClick: (i) => {
                i.stopPropagation();
              },
              children: /* @__PURE__ */ a(Je, { className: "h-3 w-3" })
            }
          )
        ] })
      },
      e.id
    );
  }, je = (e, n) => {
    const t = D(e, n), s = m.includes(t), i = me.includes(t);
    return /* @__PURE__ */ l(Ae.Fragment, { children: [
      /* @__PURE__ */ l(
        "tr",
        {
          className: o(
            "transition-colors",
            Ne && "hover:bg-muted/50",
            ve && n % 2 === 0 && "bg-muted/20",
            s && "bg-primary/10"
          ),
          children: [
            d && /* @__PURE__ */ a("td", { className: o(x({ density: N })), children: /* @__PURE__ */ a(
              G,
              {
                checked: s,
                onCheckedChange: (r) => We(t, r)
              }
            ) }),
            p.map((r) => {
              const g = r.accessor ? r.accessor(e) : r.accessorKey ? e[r.accessorKey] : "";
              return /* @__PURE__ */ a(
                "td",
                {
                  className: o(
                    x({
                      density: N,
                      pinned: r.pinned || "none"
                    }),
                    r.className
                  ),
                  style: {
                    width: r.width,
                    minWidth: r.minWidth,
                    maxWidth: r.maxWidth
                  },
                  children: r.cell ? r.cell(g, e, n) : String(g)
                },
                r.id
              );
            }),
            v.length > 0 && /* @__PURE__ */ a("td", { className: o(x({ density: N })), children: /* @__PURE__ */ l(J, { children: [
              /* @__PURE__ */ a(Q, { asChild: !0, children: /* @__PURE__ */ a(b, { variant: "ghost", size: "sm", children: /* @__PURE__ */ a(He, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ a(X, { align: "end", children: v.filter((r) => !r.visible || r.visible(e, n)).map((r) => /* @__PURE__ */ l(
                Y,
                {
                  onClick: () => r.onClick(e, n),
                  className: o(
                    r.variant === "destructive" && "text-destructive"
                  ),
                  children: [
                    r.icon && /* @__PURE__ */ a(r.icon, { className: "h-4 w-4 mr-2" }),
                    r.label
                  ]
                },
                r.id
              )) })
            ] }) })
          ]
        }
      ),
      he && i && H && /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a("td", { colSpan: p.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0), children: H(e, n) }) })
    ] }, t);
  };
  return /* @__PURE__ */ l("div", { className: o("space-y-4", ke), style: xe, children: [
    /* @__PURE__ */ l("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        ie && /* @__PURE__ */ l("div", { className: "relative", children: [
          /* @__PURE__ */ a(Ue, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ a(
            Ee,
            {
              placeholder: le,
              value: W,
              onChange: (e) => {
                Me(e.target.value), oe?.(e.target.value);
              },
              className: "pl-8 w-64"
            }
          )
        ] }),
        U.length > 0 && m.length > 0 && /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ l(Fe, { variant: "secondary", children: [
            m.length,
            " selected"
          ] }),
          U.map((e) => /* @__PURE__ */ l(
            b,
            {
              variant: e.variant || "default",
              size: "sm",
              onClick: () => {
                const n = u.filter(
                  (t, s) => m.includes(D(t, s))
                );
                e.onClick(n);
              },
              children: [
                e.icon && /* @__PURE__ */ a(e.icon, { className: "h-4 w-4 mr-2" }),
                e.label
              ]
            },
            e.id
          ))
        ] })
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        ge && /* @__PURE__ */ l(J, { children: [
          /* @__PURE__ */ a(Q, { asChild: !0, children: /* @__PURE__ */ l(b, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ a(Ge, { className: "h-4 w-4 mr-2" }),
            "Export"
          ] }) }),
          /* @__PURE__ */ a(X, { children: fe.map((e) => /* @__PURE__ */ l(
            Y,
            {
              onClick: () => be?.(e, w),
              children: [
                "Export as ",
                e.toUpperCase()
              ]
            },
            e
          )) })
        ] }),
        /* @__PURE__ */ a(b, { variant: "outline", size: "sm", onClick: () => window.location.reload(), children: /* @__PURE__ */ a($, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "border border-border rounded-lg overflow-auto",
        style: { height: ae },
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: te,
            className: o(Qe({ size: ye, bordered: we })),
            children: [
              /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ l("tr", { children: [
                d && /* @__PURE__ */ a("th", { className: o(x({ density: N }), "bg-muted/50"), children: V === "multiple" && /* @__PURE__ */ a(
                  G,
                  {
                    checked: m.length === u.length && u.length > 0,
                    className: o(
                      m.length > 0 && m.length < u.length && "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground [&>svg]:opacity-50"
                    ),
                    onCheckedChange: ze
                  }
                ) }),
                p.map(Le),
                v.length > 0 && /* @__PURE__ */ a("th", { className: o(x({ density: N }), "bg-muted/50 w-16"), children: "Actions" })
              ] }) }),
              /* @__PURE__ */ a("tbody", { children: ue ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: p.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8",
                  children: /* @__PURE__ */ l("div", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ a($, { className: "h-4 w-4 animate-spin" }),
                    "Loading..."
                  ] })
                }
              ) }) : B ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: p.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8 text-destructive",
                  children: B
                }
              ) }) : _.length === 0 ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: p.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8",
                  children: pe || /* @__PURE__ */ a("div", { className: "text-muted-foreground", children: "No data available" })
                }
              ) }) : _.map(je) })
            ]
          }
        )
      }
    ),
    E && L > 1 && /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ l("div", { className: "text-sm text-muted-foreground", children: [
        "Showing ",
        c * y + 1,
        " to",
        " ",
        Math.min((c + 1) * y, F || w.length),
        " of",
        " ",
        F || w.length,
        " results"
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ l(
          Ke,
          {
            value: y.toString(),
            onValueChange: (e) => de?.(Number(e)),
            children: [
              /* @__PURE__ */ a(Re, { className: "w-20", children: /* @__PURE__ */ a(qe, {}) }),
              /* @__PURE__ */ l(Ie, { children: [
                /* @__PURE__ */ a(A, { value: "10", children: "10" }),
                /* @__PURE__ */ a(A, { value: "25", children: "25" }),
                /* @__PURE__ */ a(A, { value: "50", children: "50" }),
                /* @__PURE__ */ a(A, { value: "100", children: "100" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ a(
            b,
            {
              variant: "outline",
              size: "sm",
              disabled: c === 0,
              onClick: () => K?.(c - 1),
              children: "Previous"
            }
          ),
          Array.from({ length: Math.min(5, L) }, (e, n) => {
            const t = c < 3 ? n : c - 2 + n;
            return t >= L ? null : /* @__PURE__ */ a(
              b,
              {
                variant: t === c ? "default" : "outline",
                size: "sm",
                onClick: () => K?.(t),
                children: t + 1
              },
              t
            );
          }),
          /* @__PURE__ */ a(
            b,
            {
              variant: "outline",
              size: "sm",
              disabled: c === L - 1,
              onClick: () => K?.(c + 1),
              children: "Next"
            }
          )
        ] })
      ] })
    ] })
  ] });
});
Xe.displayName = "DataTable";
export {
  Xe as DataTable
};
//# sourceMappingURL=data-table.js.map
