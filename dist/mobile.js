import { jsx as e, jsxs as s } from "react/jsx-runtime";
import * as M from "react";
import { createContext as w, forwardRef as p, useState as C, useContext as f } from "react";
import { c as g } from "./index-Bke1qZdk.js";
import { c as m } from "./utils-CwJPJKOE.js";
import { Button as h } from "./button.js";
import { C as T } from "./chevron-left-C1pkx4AF.js";
import { M as L } from "./menu-DBhEanGo.js";
const u = w({
  scheme: "tabbed",
  tone: "clean",
  size: "lg"
}), B = g(
  "min-h-screen flex flex-col bg-background",
  {
    variants: {
      tone: {
        clean: "bg-background text-foreground",
        subtle: "bg-muted/5 text-foreground",
        brand: "bg-primary/5 text-foreground",
        contrast: "bg-contrast text-contrast-foreground"
      }
    },
    defaultVariants: {
      tone: "clean"
    }
  }
), x = p(({
  scheme: a = "tabbed",
  tone: r = "clean",
  size: o = "lg",
  tabs: n = [],
  defaultTab: c,
  className: l,
  children: d
}, i) => {
  const [b, t] = C(c || n[0]?.key);
  return /* @__PURE__ */ e(u.Provider, { value: { scheme: a, tone: r, size: o, activeTab: b, setActiveTab: t }, children: /* @__PURE__ */ e(
    "div",
    {
      ref: i,
      className: m(B({ tone: r }), l),
      children: d
    }
  ) });
});
x.displayName = "MobileLayout";
const y = p(({
  title: a,
  onBack: r,
  onMenu: o,
  actions: n,
  className: c,
  children: l
}, d) => {
  const { scheme: i, tone: b } = f(u), t = g(
    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    {
      variants: {
        tone: {
          clean: "border-border",
          subtle: "border-muted bg-muted/10",
          brand: "border-primary/20 bg-primary/5",
          contrast: "border-contrast-border bg-contrast"
        }
      }
    }
  );
  return /* @__PURE__ */ s("div", { ref: d, className: m(t({ tone: b }), c), children: [
    /* @__PURE__ */ e("div", { className: "h-safe-top", style: { paddingTop: "env(safe-area-inset-top)" } }),
    /* @__PURE__ */ s("div", { className: "flex h-14 items-center px-4", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
        i === "stack" && r && /* @__PURE__ */ s(
          h,
          {
            variant: "ghost",
            size: "sm",
            onClick: r,
            className: "h-9 w-9 p-0",
            children: [
              /* @__PURE__ */ e(T, { className: "h-5 w-5" }),
              /* @__PURE__ */ e("span", { className: "sr-only", children: "Back" })
            ]
          }
        ),
        i === "drawer" && o && /* @__PURE__ */ s(
          h,
          {
            variant: "ghost",
            size: "sm",
            onClick: o,
            className: "h-9 w-9 p-0",
            children: [
              /* @__PURE__ */ e(L, { className: "h-5 w-5" }),
              /* @__PURE__ */ e("span", { className: "sr-only", children: "Menu" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "flex-1 text-center", children: [
        a && /* @__PURE__ */ e("h1", { className: "text-lg font-semibold tracking-tight", children: a }),
        l
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: n })
    ] })
  ] });
});
y.displayName = "MobileLayout.Header";
const v = p(({
  className: a,
  noScroll: r = !1,
  children: o
}, n) => {
  const { scheme: c } = f(u);
  return /* @__PURE__ */ e(
    "div",
    {
      ref: n,
      className: m(
        "flex-1 w-full",
        !r && "overflow-y-auto",
        c === "tabbed" && "pb-16",
        // Space for tab bar
        a
      ),
      children: o
    }
  );
});
v.displayName = "MobileLayout.Content";
const N = p(({
  tabs: a,
  onTabClick: r,
  className: o
}, n) => {
  const { tone: c, activeTab: l, setActiveTab: d } = f(u), i = (t) => {
    d?.(t), r?.(t);
  }, b = g(
    "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    {
      variants: {
        tone: {
          clean: "border-border",
          subtle: "border-muted bg-muted/10",
          brand: "border-primary/20 bg-primary/5",
          contrast: "border-contrast-border bg-contrast"
        }
      }
    }
  );
  return /* @__PURE__ */ s("div", { ref: n, className: m(b({ tone: c }), o), children: [
    /* @__PURE__ */ e("div", { className: "flex h-16 items-center justify-around px-2", children: a.map((t) => {
      const k = l === t.key;
      return /* @__PURE__ */ s(
        "button",
        {
          onClick: () => i(t.key),
          className: m(
            "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors min-w-[60px]",
            k ? "text-primary" : "text-muted-foreground hover:text-foreground"
          ),
          children: [
            t.icon && /* @__PURE__ */ e("span", { className: "h-5 w-5", children: M.createElement(t.icon, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ e("span", { className: "truncate", children: t.label })
          ]
        },
        t.key
      );
    }) }),
    /* @__PURE__ */ e("div", { className: "h-safe-bottom", style: { paddingBottom: "env(safe-area-inset-bottom)" } })
  ] });
});
N.displayName = "MobileLayout.TabBar";
const O = Object.assign(x, {
  Header: y,
  Content: v,
  TabBar: N
}), P = () => f(u);
export {
  O as MobileLayout,
  P as useMobileLayout
};
//# sourceMappingURL=mobile.js.map
