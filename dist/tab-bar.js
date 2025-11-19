import { jsxs as s, jsx as r } from "react/jsx-runtime";
import * as y from "react";
import { forwardRef as w, useState as k } from "react";
import { c as d } from "./index-Bke1qZdk.js";
import { c as n } from "./utils-CwJPJKOE.js";
import { Badge as N } from "./badge.js";
const B = d(
  "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
  {
    variants: {
      tone: {
        clean: "border-border",
        subtle: "border-muted bg-muted/10",
        brand: "border-primary/20 bg-primary/5",
        contrast: "border-zinc-700 bg-zinc-900 text-zinc-100"
      },
      variant: {
        default: "",
        floating: "bottom-4 left-4 right-4 rounded-2xl border-2 shadow-lg",
        minimal: "border-0 bg-transparent backdrop-blur-none"
      }
    },
    defaultVariants: {
      tone: "clean",
      variant: "default"
    }
  }
), j = d(
  "flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200",
  {
    variants: {
      size: {
        sm: "px-2 py-1.5 text-[10px] min-w-[50px]",
        md: "px-2.5 py-2 text-xs min-w-[60px]",
        lg: "px-3 py-2 text-xs min-w-[70px]",
        xl: "px-4 py-2.5 text-sm min-w-[80px]",
        full: "px-4 py-3 text-sm min-w-[90px]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), T = w(({
  tabs: l,
  activeTab: o,
  defaultActiveTab: m,
  onTabClick: c,
  tone: p = "clean",
  size: e = "md",
  variant: i = "default",
  showLabels: u = !0,
  className: x
}, f) => {
  const [b, g] = k(m || l[0]?.key), h = o !== void 0 ? o : b, v = (t) => {
    o === void 0 && g(t), c?.(t);
  };
  return /* @__PURE__ */ s("div", { ref: f, className: n(B({ tone: p, variant: i }), x), children: [
    /* @__PURE__ */ r("div", { className: n(
      "flex items-center",
      i === "floating" ? "justify-around px-2 h-14" : "justify-around h-16 px-2"
    ), children: l.map((t) => {
      const a = h === t.key;
      return /* @__PURE__ */ s(
        "button",
        {
          onClick: () => v(t.key),
          className: n(
            j({ size: e }),
            "relative font-medium",
            a ? "text-primary" : "text-muted-foreground hover:text-foreground active:scale-95"
          ),
          "aria-label": t.label,
          "aria-current": a ? "page" : void 0,
          children: [
            t.icon && /* @__PURE__ */ s("span", { className: n(
              "relative transition-transform",
              a && "scale-110",
              e === "sm" ? "h-4 w-4" : e === "md" ? "h-5 w-5" : "h-6 w-6"
            ), children: [
              y.createElement(t.icon, {
                className: e === "sm" ? "h-4 w-4" : e === "md" ? "h-5 w-5" : "h-6 w-6"
              }),
              t.badge && /* @__PURE__ */ r(
                N,
                {
                  variant: "destructive",
                  className: "absolute -right-2 -top-2 h-4 min-w-[16px] px-1 text-[10px] font-bold",
                  children: t.badge
                }
              )
            ] }),
            u && /* @__PURE__ */ r("span", { className: n(
              "truncate max-w-full transition-all",
              a && "font-semibold"
            ), children: t.label }),
            a && /* @__PURE__ */ r("span", { className: "absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" })
          ]
        },
        t.key
      );
    }) }),
    i !== "floating" && /* @__PURE__ */ r("div", { className: "h-safe-bottom", style: { paddingBottom: "env(safe-area-inset-bottom)" } })
  ] });
});
T.displayName = "TabBar";
export {
  T as TabBar
};
//# sourceMappingURL=tab-bar.js.map
