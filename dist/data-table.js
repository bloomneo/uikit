import { jsxs as l, jsx as a } from "react/jsx-runtime";
import * as Ke from "react";
import { forwardRef as Ve, useState as L, useMemo as R, useCallback as j } from "react";
import { c as ee } from "./index-CNax7gLk.js";
import { c as o } from "./utils-D7gXXjDs.js";
import { Button as y } from "./button.js";
import { Input as Ee } from "./input.js";
import { Badge as Fe } from "./badge.js";
import { Checkbox as G } from "./checkbox.js";
import { Select as Re, SelectTrigger as qe, SelectValue as Pe, SelectContent as Ue, SelectItem as A } from "./select.js";
import { DropdownMenu as J, DropdownMenuTrigger as Q, DropdownMenuContent as X, DropdownMenuItem as Y } from "./dropdown-menu.js";
import { requireArrayProp as Z, warnInDev as He } from "./errors.js";
import { S as Ie } from "./search-BUthbViq.js";
import { c as k } from "./createLucideIcon-DKEW4wQE.js";
const Be = k("ArrowDownWideNarrow", [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
]);
const Oe = k("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
const _e = k("ArrowUpNarrowWide", [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
]);
const Ge = k("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
const Je = k("Ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
const Qe = k("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);
const $ = k("RefreshCw", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]), Xe = ee(
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
), C = ee(
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
), te = Ve((S, ae) => {
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
  ), S.columns && S.columns.some((e) => !e.id) && He(
    "DataTable",
    "Every column needs a unique `id` (used for sort/filter/render keys)."
  );
  const {
    data: p = [],
    columns: m = [],
    virtualized: Ye = !1,
    rowHeight: Ze = 40,
    height: re,
    selectable: d = !1,
    selectionMode: K = "multiple",
    selectedRows: se = [],
    onSelectionChange: D,
    getRowId: M = (e, n) => n.toString(),
    sortable: q = !0,
    sortConfig: ne = [],
    onSortChange: P,
    filterable: $e = !0,
    filterConfig: ie = {},
    onFilterChange: U,
    searchable: le = !0,
    searchPlaceholder: ce = "Search...",
    searchValue: oe = "",
    onSearchChange: de,
    pagination: V = !0,
    currentPage: c = 0,
    pageSize: b = 10,
    totalRows: E,
    onPageChange: F,
    onPageSizeChange: he,
    actions: v = [],
    bulkActions: H = [],
    expandable: me = !1,
    expandedRows: ue = [],
    onExpandChange: et,
    renderExpanded: I,
    loading: pe = !1,
    emptyState: ge,
    error: B,
    exportable: fe = !1,
    exportFormats: ye = ["csv", "json"],
    onExport: be,
    size: ve = "md",
    density: x = "normal",
    striped: we = !1,
    bordered: Ne = !0,
    hoverable: ke = !0,
    className: xe,
    style: Ce
  } = S, [w, Se] = L(ne), [z, De] = L(ie), [W, Me] = L(oe), [u, O] = L(se), g = R(
    () => m.filter((e) => !e.hidden),
    [m]
  ), ze = j(
    (e, n = !1) => {
      if (!q || !m.find((t) => t.id === e)?.sortable) return;
      const i = w.find((t) => t.key === e);
      let s;
      if (n) {
        s = [...w];
        const t = s.findIndex((h) => h.key === e);
        t >= 0 ? s[t].direction === "asc" ? s[t] = { ...s[t], direction: "desc" } : s.splice(t, 1) : s.push({ key: e, direction: "asc" });
      } else
        i ? i.direction === "asc" ? s = [{ key: e, direction: "desc" }] : s = [] : s = [{ key: e, direction: "asc" }];
      Se(s), P?.(s);
    },
    [q, m, w, P]
  );
  j((e, n, r = "contains") => {
    const i = { ...z };
    if (n === "" || n == null)
      delete i[e];
    else {
      const s = m.find((t) => t.id === e);
      i[e] = {
        type: s?.filterType || "text",
        value: n,
        operator: r
      };
    }
    De(i), U?.(i);
  }, [m, z, U]);
  const We = j((e) => {
    if (!d) return;
    const n = e ? p.map((r, i) => M(r, i)) : [];
    O(n), D?.(n);
  }, [d, p, M, D]), Te = j((e, n) => {
    if (!d) return;
    let r = [...u];
    K === "single" ? r = n ? [e] : [] : n ? r.push(e) : r = r.filter((i) => i !== e), O(r), D?.(r);
  }, [d, K, u, D]), N = R(() => {
    let e = [...p];
    return W && (e = e.filter((n) => g.some((r) => {
      const i = r.accessor ? r.accessor(n) : r.accessorKey ? n[r.accessorKey] : "";
      return String(i).toLowerCase().includes(W.toLowerCase());
    }))), Object.entries(z).forEach(([n, r]) => {
      const i = m.find((s) => s.id === n);
      i && (e = e.filter((s) => {
        const t = i.accessor ? i.accessor(s) : i.accessorKey ? s[i.accessorKey] : "";
        switch (r.operator) {
          case "equals":
            return t === r.value;
          case "contains":
            return String(t).toLowerCase().includes(String(r.value).toLowerCase());
          case "startsWith":
            return String(t).toLowerCase().startsWith(String(r.value).toLowerCase());
          case "endsWith":
            return String(t).toLowerCase().endsWith(String(r.value).toLowerCase());
          case "gt":
            return Number(t) > Number(r.value);
          case "lt":
            return Number(t) < Number(r.value);
          case "gte":
            return Number(t) >= Number(r.value);
          case "lte":
            return Number(t) <= Number(r.value);
          default:
            return String(t).toLowerCase().includes(String(r.value).toLowerCase());
        }
      }));
    }), w.length > 0 && e.sort((n, r) => {
      for (const i of w) {
        const s = m.find((Ae) => Ae.id === i.key);
        if (!s) continue;
        const t = s.accessor ? s.accessor(n) : s.accessorKey ? n[s.accessorKey] : "", h = s.accessor ? s.accessor(r) : s.accessorKey ? r[s.accessorKey] : "";
        let f = 0;
        if (s.sortFn)
          f = s.sortFn(t, h);
        else
          switch (s.dataType) {
            case "number":
              f = Number(t) - Number(h);
              break;
            case "date":
              f = new Date(t).getTime() - new Date(h).getTime();
              break;
            case "boolean":
              f = (t ? 1 : 0) - (h ? 1 : 0);
              break;
            default:
              f = String(t).localeCompare(String(h));
          }
        if (f !== 0)
          return i.direction === "asc" ? f : -f;
      }
      return 0;
    }), e;
  }, [p, W, z, w, m, g]), _ = R(() => {
    if (!V) return N;
    const e = c * b, n = e + b;
    return N.slice(e, n);
  }, [N, V, c, b]), T = Math.ceil((E || N.length) / b), Le = (e) => {
    const n = w.find((s) => s.key === e.id), r = !!n, i = n?.direction;
    return /* @__PURE__ */ a(
      "th",
      {
        className: o(
          C({
            density: x,
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
        onClick: (s) => e.sortable && ze(e.id, s.shiftKey),
        children: /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ a("span", { children: e.header }),
          e.sortable && /* @__PURE__ */ l("div", { className: "flex flex-col", children: [
            !r && /* @__PURE__ */ a(Oe, { className: "h-3 w-3" }),
            r && i === "asc" && /* @__PURE__ */ a(_e, { className: "h-3 w-3" }),
            r && i === "desc" && /* @__PURE__ */ a(Be, { className: "h-3 w-3" })
          ] }),
          e.filterable && /* @__PURE__ */ a(
            y,
            {
              variant: "ghost",
              size: "sm",
              className: "h-6 w-6 p-0",
              onClick: (s) => {
                s.stopPropagation();
              },
              children: /* @__PURE__ */ a(Qe, { className: "h-3 w-3" })
            }
          )
        ] })
      },
      e.id
    );
  }, je = (e, n) => {
    const r = M(e, n), i = u.includes(r), s = ue.includes(r);
    return /* @__PURE__ */ l(Ke.Fragment, { children: [
      /* @__PURE__ */ l(
        "tr",
        {
          className: o(
            "transition-colors",
            ke && "hover:bg-muted/50",
            we && n % 2 === 0 && "bg-muted/20",
            i && "bg-primary/10"
          ),
          children: [
            d && /* @__PURE__ */ a("td", { className: o(C({ density: x })), children: /* @__PURE__ */ a(
              G,
              {
                checked: i,
                onCheckedChange: (t) => Te(r, t)
              }
            ) }),
            g.map((t) => {
              const h = t.accessor ? t.accessor(e) : t.accessorKey ? e[t.accessorKey] : "";
              return /* @__PURE__ */ a(
                "td",
                {
                  className: o(
                    C({
                      density: x,
                      pinned: t.pinned || "none"
                    }),
                    t.className
                  ),
                  style: {
                    width: t.width,
                    minWidth: t.minWidth,
                    maxWidth: t.maxWidth
                  },
                  children: t.cell ? t.cell(h, e, n) : String(h)
                },
                t.id
              );
            }),
            v.length > 0 && /* @__PURE__ */ a("td", { className: o(C({ density: x })), children: /* @__PURE__ */ l(J, { children: [
              /* @__PURE__ */ a(Q, { asChild: !0, children: /* @__PURE__ */ a(y, { variant: "ghost", size: "sm", children: /* @__PURE__ */ a(Je, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ a(X, { align: "end", children: v.filter((t) => !t.visible || t.visible(e, n)).map((t) => /* @__PURE__ */ l(
                Y,
                {
                  onClick: () => t.onClick(e, n),
                  className: o(
                    t.variant === "destructive" && "text-destructive"
                  ),
                  children: [
                    t.icon && /* @__PURE__ */ a(t.icon, { className: "h-4 w-4 mr-2" }),
                    t.label
                  ]
                },
                t.id
              )) })
            ] }) })
          ]
        }
      ),
      me && s && I && /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a("td", { colSpan: g.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0), children: I(e, n) }) })
    ] }, r);
  };
  return /* @__PURE__ */ l("div", { className: o("space-y-4", xe), style: Ce, children: [
    /* @__PURE__ */ l("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        le && /* @__PURE__ */ l("div", { className: "relative", children: [
          /* @__PURE__ */ a(Ie, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ a(
            Ee,
            {
              placeholder: ce,
              value: W,
              onChange: (e) => {
                Me(e.target.value), de?.(e.target.value);
              },
              className: "pl-8 w-64"
            }
          )
        ] }),
        H.length > 0 && u.length > 0 && /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ l(Fe, { variant: "secondary", children: [
            u.length,
            " selected"
          ] }),
          H.map((e) => /* @__PURE__ */ l(
            y,
            {
              variant: e.variant || "default",
              size: "sm",
              onClick: () => {
                const n = p.filter(
                  (r, i) => u.includes(M(r, i))
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
        fe && /* @__PURE__ */ l(J, { children: [
          /* @__PURE__ */ a(Q, { asChild: !0, children: /* @__PURE__ */ l(y, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ a(Ge, { className: "h-4 w-4 mr-2" }),
            "Export"
          ] }) }),
          /* @__PURE__ */ a(X, { children: ye.map((e) => /* @__PURE__ */ l(
            Y,
            {
              onClick: () => be?.(e, N),
              children: [
                "Export as ",
                e.toUpperCase()
              ]
            },
            e
          )) })
        ] }),
        /* @__PURE__ */ a(y, { variant: "outline", size: "sm", onClick: () => window.location.reload(), children: /* @__PURE__ */ a($, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "border border-border rounded-lg overflow-auto",
        style: { height: re },
        children: /* @__PURE__ */ l(
          "table",
          {
            ref: ae,
            className: o(Xe({ size: ve, bordered: Ne })),
            children: [
              /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ l("tr", { children: [
                d && /* @__PURE__ */ a("th", { className: o(C({ density: x }), "bg-muted/50"), children: K === "multiple" && /* @__PURE__ */ a(
                  G,
                  {
                    checked: u.length === p.length && p.length > 0,
                    className: o(
                      u.length > 0 && u.length < p.length && "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground [&>svg]:opacity-50"
                    ),
                    onCheckedChange: We
                  }
                ) }),
                g.map(Le),
                v.length > 0 && /* @__PURE__ */ a("th", { className: o(C({ density: x }), "bg-muted/50 w-16"), children: "Actions" })
              ] }) }),
              /* @__PURE__ */ a("tbody", { children: pe ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: g.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8",
                  children: /* @__PURE__ */ l("div", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ a($, { className: "h-4 w-4 animate-spin" }),
                    "Loading..."
                  ] })
                }
              ) }) : B ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: g.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8 text-destructive",
                  children: B
                }
              ) }) : _.length === 0 ? /* @__PURE__ */ a("tr", { children: /* @__PURE__ */ a(
                "td",
                {
                  colSpan: g.length + (d ? 1 : 0) + (v.length > 0 ? 1 : 0),
                  className: "text-center py-8",
                  children: ge || /* @__PURE__ */ a("div", { className: "text-muted-foreground", children: "No data available" })
                }
              ) }) : _.map(je) })
            ]
          }
        )
      }
    ),
    V && T > 1 && /* @__PURE__ */ l("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ l("div", { className: "text-sm text-muted-foreground", children: [
        "Showing ",
        c * b + 1,
        " to",
        " ",
        Math.min((c + 1) * b, E || N.length),
        " of",
        " ",
        E || N.length,
        " results"
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ l(
          Re,
          {
            value: b.toString(),
            onValueChange: (e) => he?.(Number(e)),
            children: [
              /* @__PURE__ */ a(qe, { className: "w-20", children: /* @__PURE__ */ a(Pe, {}) }),
              /* @__PURE__ */ l(Ue, { children: [
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
            y,
            {
              variant: "outline",
              size: "sm",
              disabled: c === 0,
              onClick: () => F?.(c - 1),
              children: "Previous"
            }
          ),
          Array.from({ length: Math.min(5, T) }, (e, n) => {
            const r = c < 3 ? n : c - 2 + n;
            return r >= T ? null : /* @__PURE__ */ a(
              y,
              {
                variant: r === c ? "default" : "outline",
                size: "sm",
                onClick: () => F?.(r),
                children: r + 1
              },
              r
            );
          }),
          /* @__PURE__ */ a(
            y,
            {
              variant: "outline",
              size: "sm",
              disabled: c === T - 1,
              onClick: () => F?.(c + 1),
              children: "Next"
            }
          )
        ] })
      ] })
    ] })
  ] });
});
te.displayName = "DataTable";
const pt = te;
export {
  pt as DataTable
};
//# sourceMappingURL=data-table.js.map
