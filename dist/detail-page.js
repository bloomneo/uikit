import { jsx as e, jsxs as t, Fragment as V } from "react/jsx-runtime";
import { Card as v, CardContent as w, CardHeader as B, CardTitle as F } from "./card.js";
import { c as y } from "./utils-CwJPJKOE.js";
import { Button as d } from "./button.js";
import { Badge as P } from "./badge.js";
import { Alert as Y, AlertDescription as K } from "./alert.js";
import { Dialog as Q, DialogContent as R, DialogHeader as W, DialogTitle as X, DialogDescription as Z, DialogFooter as _ } from "./dialog.js";
import { TooltipProvider as ee, Tooltip as u, TooltipTrigger as x, TooltipContent as N } from "./tooltip.js";
import { ValidatedInput as h, FormActions as ae, ValidatedSelect as te, ValidatedTextarea as re } from "./form.js";
import { c as p } from "./createLucideIcon-B45kRl5r.js";
import { E as ne } from "./ellipsis-BhAoKPVk.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const se = p("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ie = p("CircleCheckBig", [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const le = p("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ce = p("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q = p("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]), M = (a, r) => {
  if (r.formatter)
    return r.formatter(a);
  switch (r.type) {
    case "date":
      return new Date(a).toLocaleDateString();
    case "datetime":
      return new Date(a).toLocaleString();
    case "boolean":
      return a ? "✅ Yes" : "❌ No";
    case "number":
      return typeof a == "number" ? a.toLocaleString() : a;
    case "json":
      return /* @__PURE__ */ e("pre", { className: "text-xs bg-muted p-2 rounded overflow-auto max-h-32", children: JSON.stringify(a, null, 2) });
    case "badge":
      return /* @__PURE__ */ e(P, { variant: r.badgeVariant || "default", children: String(a) });
    default:
      return String(a);
  }
}, de = (a) => {
  navigator.clipboard.writeText(a);
};
function Le({
  title: a,
  subtitle: r,
  icon: n,
  onBack: i,
  status: l,
  actions: c = [],
  formSections: g = [],
  metadataFields: o = [],
  sidebarCards: f = [],
  isEditing: m = !1,
  onFormChange: H,
  onSave: C,
  onCancel: k,
  saveText: I = "Save Changes",
  cancelText: O = "Cancel",
  saving: b = !1,
  formValid: $ = !0,
  loading: L = !1,
  error: D,
  onClearError: T,
  children: E,
  className: G = ""
}) {
  const S = c.find((s) => s.variant === "destructive"), A = c.find((s) => s.id === "edit"), j = c.filter((s) => s.variant !== "destructive" && s.id !== "edit"), z = [
    ...S ? [S] : [],
    ...A && !m ? [A] : [],
    ...j.filter((s) => s.position !== "secondary")
  ], J = j.filter((s) => s.position === "secondary");
  return /* @__PURE__ */ e(ee, { children: /* @__PURE__ */ e("div", { className: y("min-h-screen p-6", G), children: /* @__PURE__ */ t("div", { className: "max-w-7xl mx-auto space-y-8", children: [
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ t("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
        n && /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ e(n, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ e("h1", { className: "text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent leading-tight", children: L ? "Loading..." : a }),
          r && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground mt-0.5 leading-relaxed", children: r })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0 lg:ml-4", children: [
        /* @__PURE__ */ t(u, { children: [
          /* @__PURE__ */ e(x, { asChild: !0, children: /* @__PURE__ */ t(
            d,
            {
              variant: "outline",
              size: "sm",
              onClick: i,
              className: "flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ e(se, { className: "w-4 h-4" }),
                /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: "Back" })
              ]
            }
          ) }),
          /* @__PURE__ */ e(N, { side: "bottom", children: "Go back" })
        ] }),
        m && C && k ? /* @__PURE__ */ t("form", { onSubmit: (s) => {
          s.preventDefault(), C();
        }, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            d,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: k,
              disabled: b,
              children: O
            }
          ),
          /* @__PURE__ */ e(
            d,
            {
              type: "submit",
              size: "sm",
              disabled: b || !$,
              className: "min-w-20",
              children: b ? /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ e("div", { className: "w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" }),
                /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: "Saving..." })
              ] }) : I
            }
          )
        ] }) : /* @__PURE__ */ t(V, { children: [
          z.slice(0, 2).map((s) => /* @__PURE__ */ t(u, { children: [
            /* @__PURE__ */ e(x, { asChild: !0, children: /* @__PURE__ */ t(
              d,
              {
                variant: s.variant || "default",
                size: "sm",
                onClick: s.onClick,
                disabled: s.disabled || L,
                className: "flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ e(s.icon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: s.loading ? "Loading..." : s.label })
                ]
              }
            ) }),
            /* @__PURE__ */ e(N, { side: "bottom", children: s.label })
          ] }, s.id)),
          (z.length > 2 || J.length > 0) && /* @__PURE__ */ t(u, { children: [
            /* @__PURE__ */ e(x, { asChild: !0, children: /* @__PURE__ */ e(d, { variant: "outline", size: "sm", className: "px-2", children: /* @__PURE__ */ e(ne, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ e(N, { side: "bottom", children: "More actions" })
          ] })
        ] })
      ] })
    ] }) }),
    D && /* @__PURE__ */ t(Y, { variant: "destructive", children: [
      /* @__PURE__ */ e(q, { className: "h-4 w-4" }),
      /* @__PURE__ */ t(K, { className: "flex items-center justify-between", children: [
        D,
        T && /* @__PURE__ */ e(d, { variant: "outline", size: "sm", onClick: T, children: "Dismiss" })
      ] })
    ] }),
    l && /* @__PURE__ */ e(oe, { ...l }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ t("div", { className: "xl:col-span-2 space-y-6", children: [
        g.map((s, U) => /* @__PURE__ */ e(
          he,
          {
            section: s,
            isEditing: m,
            onFieldChange: H
          },
          U
        )),
        E
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-6", children: [
        o.length > 0 && /* @__PURE__ */ e(me, { data: o }),
        f
      ] })
    ] })
  ] }) }) });
}
function oe({
  active: a,
  activeLabel: r = "Active",
  inactiveLabel: n = "Inactive",
  activeText: i = "Entity is operational and accessible",
  inactiveText: l = "Entity is inactive and cannot access services",
  customBadge: c
}) {
  return /* @__PURE__ */ e(v, { className: "border-0 shadow-lg", children: /* @__PURE__ */ e(w, { className: "p-4", children: /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ e("div", { className: y(
        "w-10 h-10 rounded-full flex items-center justify-center",
        a ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
      ), children: a ? /* @__PURE__ */ e(ie, { className: "w-5 h-5" }) : /* @__PURE__ */ e(q, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t("h3", { className: "font-semibold text-foreground", children: [
          "Status: ",
          a ? r : n
        ] }),
        /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: a ? i : l })
      ] })
    ] }),
    c || /* @__PURE__ */ t(P, { variant: a ? "default" : "secondary", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e("div", { className: y(
        "w-2 h-2 rounded-full",
        a ? "bg-success" : "bg-warning"
      ) }),
      a ? r : n
    ] })
  ] }) }) });
}
function me({
  data: a,
  title: r = "Metadata"
}) {
  return /* @__PURE__ */ t(v, { className: "border-0 shadow-lg", children: [
    /* @__PURE__ */ e(B, { className: "border-0", children: /* @__PURE__ */ e(F, { className: "text-lg", children: r }) }),
    /* @__PURE__ */ e(w, { className: "p-4 md:p-6 space-y-4", children: /* @__PURE__ */ e("div", { className: "space-y-3", children: a.map((n, i) => /* @__PURE__ */ t("div", { children: [
      /* @__PURE__ */ t("label", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1", children: [
        n.icon && /* @__PURE__ */ e(n.icon, { className: "w-3 h-3" }),
        n.label
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2 mt-1", children: n.copyable ? /* @__PURE__ */ t(V, { children: [
        /* @__PURE__ */ e("div", { className: "text-sm font-mono bg-muted px-2 py-1 rounded border flex-1 break-all", children: M(n.value, n) }),
        /* @__PURE__ */ t(u, { children: [
          /* @__PURE__ */ e(x, { asChild: !0, children: /* @__PURE__ */ e(
            d,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => de(String(n.value)),
              className: "h-8 w-8 p-0 shrink-0",
              children: /* @__PURE__ */ e(le, { className: "w-3 h-3" })
            }
          ) }),
          /* @__PURE__ */ t(N, { children: [
            "Copy ",
            n.label
          ] })
        ] })
      ] }) : /* @__PURE__ */ e("div", { className: "text-sm break-words", children: M(n.value, n) }) })
    ] }, i)) }) })
  ] });
}
function he({
  section: a,
  isEditing: r,
  onFieldChange: n
}) {
  return /* @__PURE__ */ t(v, { className: "border-0 shadow-lg", children: [
    /* @__PURE__ */ t(B, { className: "border-0", children: [
      /* @__PURE__ */ t(F, { className: "flex items-center gap-3", children: [
        a.icon && /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ e(a.icon, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ e("span", { className: "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent", children: a.title })
      ] }),
      a.description && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: a.description })
    ] }),
    /* @__PURE__ */ e(w, { className: "p-4 md:p-6", children: /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6", children: a.fields.map((i) => /* @__PURE__ */ e("div", { className: i.type === "textarea" ? "md:col-span-2" : "", children: /* @__PURE__ */ e(
      pe,
      {
        field: i,
        isEditing: r,
        onChange: (l) => n?.(i.key, l)
      }
    ) }, i.key)) }) })
  ] });
}
function pe({
  field: a,
  isEditing: r,
  onChange: n
}) {
  const i = {
    label: a.label,
    value: String(a.value || ""),
    onChange: n,
    disabled: !r || a.disabled,
    required: a.required,
    placeholder: a.placeholder
  };
  switch (a.type) {
    case "textarea":
      return /* @__PURE__ */ e(
        re,
        {
          ...i,
          rows: a.rows || 3,
          minLength: a.validation?.minLength,
          maxLength: a.validation?.maxLength
        }
      );
    case "select":
      return /* @__PURE__ */ e(
        te,
        {
          ...i,
          options: a.options || []
        }
      );
    case "email":
      return /* @__PURE__ */ e(
        h,
        {
          ...i,
          type: "email",
          minLength: a.validation?.minLength,
          maxLength: a.validation?.maxLength,
          pattern: a.validation?.pattern
        }
      );
    case "password":
      return /* @__PURE__ */ e(
        h,
        {
          ...i,
          type: "password",
          minLength: a.validation?.minLength,
          maxLength: a.validation?.maxLength,
          showPasswordStrength: !0,
          showPasswordToggle: !0
        }
      );
    case "number":
      return /* @__PURE__ */ e(
        h,
        {
          ...i,
          type: "number"
        }
      );
    default:
      return /* @__PURE__ */ e(
        h,
        {
          ...i,
          type: "text",
          minLength: a.validation?.minLength,
          maxLength: a.validation?.maxLength,
          pattern: a.validation?.pattern
        }
      );
  }
}
function De({
  open: a,
  entity: r,
  confirmationValue: n,
  onConfirmationChange: i,
  onConfirm: l,
  onCancel: c,
  loading: g = !1
}) {
  const o = n === r.name, f = (m) => {
    m.preventDefault(), o && !g && l();
  };
  return /* @__PURE__ */ e(Q, { open: a, onOpenChange: c, children: /* @__PURE__ */ t(R, { className: "max-w-md", children: [
    /* @__PURE__ */ t(W, { children: [
      /* @__PURE__ */ t(X, { className: "flex items-center gap-3 text-destructive", children: [
        /* @__PURE__ */ e("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ e(ce, { className: "w-5 h-5 text-destructive" }) }),
        "Delete ",
        r.type
      ] }),
      /* @__PURE__ */ t(Z, { children: [
        "This action cannot be undone. This will permanently delete the ",
        r.type.toLowerCase(),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("form", { onSubmit: f, children: [
      /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ e("div", { className: "p-4 bg-destructive/5 border border-destructive/20 rounded-lg", children: /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: r.icon ? /* @__PURE__ */ e(r.icon, { className: "w-4 h-4 text-primary" }) : /* @__PURE__ */ e("span", { className: "text-primary font-bold text-sm", children: r.name.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("p", { className: "font-semibold text-foreground", children: r.name }),
            /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: r.type })
          ] })
        ] }) }),
        /* @__PURE__ */ e(
          h,
          {
            required: !0,
            label: `Type "${r.name}" to confirm:`,
            placeholder: r.name,
            value: n,
            onChange: i
          }
        )
      ] }),
      /* @__PURE__ */ e(_, { className: "mt-6", children: /* @__PURE__ */ e(
        ae,
        {
          submitText: `Delete ${r.type}`,
          cancelText: "Cancel",
          showCancel: !0,
          loading: g,
          disabled: !o,
          onCancel: c
        }
      ) })
    ] })
  ] }) });
}
export {
  De as DeleteConfirmDialog,
  Le as DetailPageLayout
};
//# sourceMappingURL=detail-page.js.map
