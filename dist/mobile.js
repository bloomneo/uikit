import { jsx as e, jsxs as s } from "react/jsx-runtime";
import * as M from "react";
import { createContext as w, forwardRef as p, useState as C, useContext as f } from "react";
import { c as g } from "./index-Bke1qZdk.js";
import { c as b } from "./utils-CwJPJKOE.js";
import { Button as h } from "./button.js";
import { C as z } from "./chevron-left-C1pkx4AF.js";
import { M as T } from "./menu-DBhEanGo.js";
const u = w({
  scheme: "tabbed",
  tone: "clean",
  size: "lg"
}), L = g(
  "min-h-screen flex flex-col bg-background",
  {
    variants: {
      tone: {
        clean: "bg-background text-foreground",
        subtle: "bg-muted/5 text-foreground",
        brand: "bg-primary/5 text-foreground",
        contrast: "bg-zinc-900 text-zinc-100"
      }
    },
    defaultVariants: {
      tone: "clean"
    }
  }
), x = p(({
  scheme: r = "tabbed",
  tone: a = "clean",
  size: o = "lg",
  tabs: n = [],
  defaultTab: c,
  className: l,
  children: d
}, i) => {
  const [m, t] = C(c || n[0]?.key);
  return /* @__PURE__ */ e(u.Provider, { value: { scheme: r, tone: a, size: o, activeTab: m, setActiveTab: t }, children: /* @__PURE__ */ e(
    "div",
    {
      ref: i,
      className: b(L({ tone: a }), l),
      children: d
    }
  ) });
});
x.displayName = "MobileLayout";
const y = p(({
  title: r,
  onBack: a,
  onMenu: o,
  actions: n,
  className: c,
  children: l
}, d) => {
  const { scheme: i, tone: m } = f(u), t = g(
    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    {
      variants: {
        tone: {
          clean: "border-border",
          subtle: "border-muted bg-muted/10",
          brand: "border-primary/20 bg-primary/5",
          contrast: "border-zinc-700 bg-zinc-900"
        }
      }
    }
  );
  return /* @__PURE__ */ s("div", { ref: d, className: b(t({ tone: m }), c), children: [
    /* @__PURE__ */ e("div", { className: "h-safe-top", style: { paddingTop: "env(safe-area-inset-top)" } }),
    /* @__PURE__ */ s("div", { className: "flex h-14 items-center px-4", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
        i === "stack" && a && /* @__PURE__ */ s(
          h,
          {
            variant: "ghost",
            size: "sm",
            onClick: a,
            className: "h-9 w-9 p-0",
            children: [
              /* @__PURE__ */ e(z, { className: "h-5 w-5" }),
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
              /* @__PURE__ */ e(T, { className: "h-5 w-5" }),
              /* @__PURE__ */ e("span", { className: "sr-only", children: "Menu" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "flex-1 text-center", children: [
        r && /* @__PURE__ */ e("h1", { className: "text-lg font-semibold tracking-tight", children: r }),
        l
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: n })
    ] })
  ] });
});
y.displayName = "MobileLayout.Header";
const v = p(({
  className: r,
  noScroll: a = !1,
  children: o
}, n) => {
  const { scheme: c } = f(u);
  return /* @__PURE__ */ e(
    "div",
    {
      ref: n,
      className: b(
        "flex-1 w-full",
        !a && "overflow-y-auto",
        c === "tabbed" && "pb-16",
        // Space for tab bar
        r
      ),
      children: o
    }
  );
});
v.displayName = "MobileLayout.Content";
const N = p(({
  tabs: r,
  onTabClick: a,
  className: o
}, n) => {
  const { tone: c, activeTab: l, setActiveTab: d } = f(u), i = (t) => {
    d?.(t), a?.(t);
  }, m = g(
    "fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    {
      variants: {
        tone: {
          clean: "border-border",
          subtle: "border-muted bg-muted/10",
          brand: "border-primary/20 bg-primary/5",
          contrast: "border-zinc-700 bg-zinc-900"
        }
      }
    }
  );
  return /* @__PURE__ */ s("div", { ref: n, className: b(m({ tone: c }), o), children: [
    /* @__PURE__ */ e("div", { className: "flex h-16 items-center justify-around px-2", children: r.map((t) => {
      const k = l === t.key;
      return /* @__PURE__ */ s(
        "button",
        {
          onClick: () => i(t.key),
          className: b(
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
