import { jsxs as l, jsx as r, Fragment as V } from "react/jsx-runtime";
import { forwardRef as b } from "react";
import { c } from "./index-Bke1qZdk.js";
import { c as a } from "./utils-CwJPJKOE.js";
import { Button as h } from "./button.js";
import { Separator as k } from "./separator.js";
import { C } from "./chevron-left-C1pkx4AF.js";
import { X as P } from "./x-BxwubQiM.js";
const I = c(
  "flex flex-col border rounded-lg overflow-hidden",
  {
    variants: {
      scheme: {
        modal: "shadow-lg",
        drawer: "shadow-md h-full rounded-none",
        floating: "shadow-xl"
      },
      tone: {
        clean: "bg-background border-border",
        subtle: "bg-muted/30 border-border/50",
        brand: "bg-primary/5 border-primary/20",
        contrast: "bg-contrast border-contrast-border text-contrast-foreground"
      },
      size: {
        sm: "w-72 max-h-80",
        // 288px × 320px - Ultra compact
        md: "w-80 max-h-96",
        // 320px × 384px - Standard popup
        lg: "w-96 max-h-[32rem]",
        // 384px × 512px - Large popup
        xl: "w-[28rem] max-h-[36rem]",
        // 448px × 576px - Extra large
        full: "min-w-72 max-w-lg max-h-[80vh]"
        // Responsive
      },
      position: {
        sticky: "sticky top-0 z-50",
        fixed: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
        relative: "relative"
      }
    },
    defaultVariants: {
      scheme: "modal",
      tone: "clean",
      size: "md",
      position: "relative"
    }
  }
), N = c(
  "flex items-center gap-3",
  {
    variants: {
      tone: {
        clean: "",
        subtle: "",
        brand: "",
        contrast: ""
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
        xl: "p-4",
        full: "p-4"
      }
    },
    defaultVariants: {
      tone: "clean",
      size: "md"
    }
  }
), z = c(
  "flex-1",
  {
    variants: {
      tone: {
        clean: "",
        subtle: "",
        brand: "",
        contrast: ""
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
        xl: "p-4",
        full: "p-4"
      },
      scrollable: {
        true: "overflow-y-auto overflow-x-hidden",
        false: ""
      }
    },
    defaultVariants: {
      tone: "clean",
      size: "md",
      scrollable: !0
    }
  }
), F = c(
  "border-t",
  {
    variants: {
      tone: {
        clean: "border-border",
        subtle: "border-border/50",
        brand: "border-primary/20",
        contrast: "border-contrast-border"
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
        xl: "p-4",
        full: "p-4"
      }
    },
    defaultVariants: {
      tone: "clean",
      size: "md"
    }
  }
), x = c(
  "h-8 w-8 p-0 shrink-0",
  {
    variants: {
      tone: {
        clean: "text-muted-foreground hover:text-foreground hover:bg-muted",
        subtle: "text-muted-foreground hover:text-foreground hover:bg-background/50",
        brand: "text-primary/80 hover:text-primary hover:bg-primary/10",
        contrast: "text-contrast-muted-foreground hover:text-contrast-foreground hover:bg-contrast"
      }
    },
    defaultVariants: {
      tone: "clean"
    }
  }
), H = c(
  "font-semibold truncate",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-base",
        full: "text-base"
      },
      tone: {
        clean: "text-foreground",
        subtle: "text-foreground",
        brand: "text-foreground",
        contrast: "text-contrast-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      tone: "clean"
    }
  }
), L = c(
  "truncate mt-0.5",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
        xl: "text-sm",
        full: "text-sm"
      },
      tone: {
        clean: "text-muted-foreground",
        subtle: "text-muted-foreground",
        brand: "text-muted-foreground",
        contrast: "text-contrast-muted-foreground"
      }
    },
    defaultVariants: {
      size: "md",
      tone: "clean"
    }
  }
), j = b(({
  scheme: s = "modal",
  tone: e = "clean",
  size: t = "md",
  position: d = "relative",
  title: n,
  subtitle: o,
  logo: m,
  badge: i,
  headerActions: u,
  showBack: p = !1,
  showClose: f = !1,
  showDivider: g = !0,
  onBack: v,
  onClose: S,
  footer: w,
  scrollable: X = !0,
  className: q,
  style: B,
  children: D
}, E) => {
  const y = n || o || m || i || u || p || f;
  return /* @__PURE__ */ l(
    "div",
    {
      ref: E,
      className: a(I({ scheme: s, tone: e, size: t, position: d }), q),
      style: B,
      children: [
        y && /* @__PURE__ */ l(V, { children: [
          /* @__PURE__ */ l("div", { className: a(N({ tone: e, size: t })), children: [
            p && /* @__PURE__ */ r(
              h,
              {
                variant: "ghost",
                className: a(x({ tone: e })),
                onClick: v,
                "aria-label": "Go back",
                children: /* @__PURE__ */ r(C, { className: "h-4 w-4" })
              }
            ),
            m && /* @__PURE__ */ r("div", { className: "shrink-0", children: m }),
            /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
              n && /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ r("h1", { className: a(H({ size: t, tone: e })), children: n }),
                i && i
              ] }),
              o && /* @__PURE__ */ r("p", { className: a(L({ size: t, tone: e })), children: o })
            ] }),
            u && /* @__PURE__ */ r("div", { className: "shrink-0 flex items-center gap-1", children: u }),
            f && /* @__PURE__ */ r(
              h,
              {
                variant: "ghost",
                className: a(x({ tone: e })),
                onClick: S,
                "aria-label": "Close",
                children: /* @__PURE__ */ r(P, { className: "h-4 w-4" })
              }
            )
          ] }),
          g && /* @__PURE__ */ r(k, { className: a(
            e === "subtle" && "bg-border/50",
            e === "brand" && "bg-primary/20",
            e === "contrast" && "bg-contrast-muted"
          ) })
        ] }),
        /* @__PURE__ */ r(
          "div",
          {
            className: a(
              z({ tone: e, size: t, scrollable: X }),
              !y && N({ tone: e, size: t })
            ),
            children: D
          }
        ),
        w && /* @__PURE__ */ l(V, { children: [
          /* @__PURE__ */ r(k, { className: a(
            e === "subtle" && "bg-border/50",
            e === "brand" && "bg-primary/20",
            e === "contrast" && "bg-contrast-muted"
          ) }),
          /* @__PURE__ */ r("div", { className: a(F({ tone: e, size: t })), children: w })
        ] })
      ]
    }
  );
});
j.displayName = "PopupLayout";
const G = b(({
  tone: s = "clean",
  size: e = "md",
  title: t,
  subtitle: d,
  logo: n,
  badge: o,
  actions: m,
  showBack: i = !1,
  showClose: u = !1,
  onBack: p,
  onClose: f,
  className: g
}, v) => /* @__PURE__ */ l("div", { ref: v, className: a(N({ tone: s, size: e }), g), children: [
  i && /* @__PURE__ */ r(h, { variant: "ghost", className: a(x({ tone: s })), onClick: p, children: /* @__PURE__ */ r(C, { className: "h-4 w-4" }) }),
  n && /* @__PURE__ */ r("div", { className: "shrink-0", children: n }),
  /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
    t && /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ r("h1", { className: a(H({ size: e, tone: s })), children: t }),
      o && o
    ] }),
    d && /* @__PURE__ */ r("p", { className: a(L({ size: e, tone: s })), children: d })
  ] }),
  m && /* @__PURE__ */ r("div", { className: "shrink-0", children: m }),
  u && /* @__PURE__ */ r(h, { variant: "ghost", className: a(x({ tone: s })), onClick: f, children: /* @__PURE__ */ r(P, { className: "h-4 w-4" }) })
] }));
G.displayName = "PopupHeader";
const O = b(({
  tone: s = "clean",
  size: e = "md",
  scrollable: t = !0,
  className: d,
  children: n
}, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    className: a(z({ tone: s, size: e, scrollable: t }), d),
    children: n
  }
));
O.displayName = "PopupContent";
const R = b(({
  tone: s = "clean",
  size: e = "md",
  actions: t,
  className: d,
  children: n
}, o) => /* @__PURE__ */ r("div", { ref: o, className: a(F({ tone: s, size: e }), d), children: t || n }));
R.displayName = "PopupFooter";
const Z = Object.assign(j, {
  Header: G,
  Content: O,
  Footer: R
});
export {
  O as PopupContent,
  R as PopupFooter,
  G as PopupHeader,
  Z as PopupLayout
};
//# sourceMappingURL=popup.js.map
