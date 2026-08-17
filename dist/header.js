import { jsx as r, jsxs as l } from "react/jsx-runtime";
import { createContext as T, forwardRef as C, useState as m, useContext as W, useEffect as p } from "react";
import { c as E } from "./index-Bke1qZdk.js";
import { c as n } from "./utils-CwJPJKOE.js";
import { Button as X } from "./button.js";
import { C as z } from "./chevron-down-BORJtX8F.js";
import { X as q } from "./x-BxwubQiM.js";
import { M as F } from "./menu-DBhEanGo.js";
const H = T({
  tone: "clean",
  size: "xl"
}), G = E(
  "w-full border-b transition-all duration-200 z-40",
  {
    variants: {
      tone: {
        clean: [
          "bg-background/80 backdrop-blur-sm border-border/40 supports-[backdrop-filter]:bg-background/60",
          "text-foreground"
        ],
        subtle: [
          "bg-muted/50 backdrop-blur-sm border-border/30",
          "text-foreground"
        ],
        brand: [
          "bg-primary border-primary-foreground/20",
          "text-primary-foreground"
        ],
        contrast: [
          "bg-contrast border-contrast-border/40",
          "text-contrast-foreground"
        ]
      },
      position: {
        sticky: "sticky top-0",
        fixed: "fixed top-0 left-0 right-0",
        relative: "relative"
      }
    },
    defaultVariants: {
      tone: "clean",
      position: "sticky"
    }
  }
), J = E(
  "mx-auto flex items-center justify-between",
  {
    variants: {
      size: {
        sm: "max-w-2xl h-12 px-4",
        md: "max-w-4xl h-14 px-4 sm:px-6",
        lg: "max-w-6xl h-16 px-4 sm:px-6 lg:px-8",
        xl: "max-w-7xl h-16 px-4 sm:px-6 lg:px-8",
        full: "max-w-full h-16 px-4 sm:px-6 lg:px-8"
      }
    },
    defaultVariants: {
      size: "xl"
    }
  }
), L = C(({
  className: c,
  tone: s = "clean",
  size: d = "xl",
  position: u = "sticky",
  children: h,
  ...b
}, a) => /* @__PURE__ */ r(H.Provider, { value: { tone: s, size: d }, children: /* @__PURE__ */ r(
  "header",
  {
    ref: a,
    className: n(G({ tone: s, position: u }), c),
    ...b,
    children: /* @__PURE__ */ r("div", { className: n(J({ size: d })), children: h })
  }
) }));
L.displayName = "Header";
const O = C(({
  className: c,
  children: s,
  ...d
}, u) => /* @__PURE__ */ r(
  "div",
  {
    ref: u,
    className: n("flex items-center flex-shrink-0", c),
    ...d,
    children: s
  }
));
O.displayName = "HeaderLogo";
const D = C(({
  navigation: c = [],
  currentPath: s = "",
  onNavigate: d,
  className: u,
  ...h
}, b) => {
  const [a, v] = m(!1), [M, y] = m(/* @__PURE__ */ new Set()), [w, f] = m(null), [x, A] = m(!1), { tone: S } = W(H);
  p(() => {
    A(!0);
  }, []), p(() => {
    if (!x) return;
    const e = () => {
      window.innerWidth >= 768 && (v(!1), y(/* @__PURE__ */ new Set()));
    };
    return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
  }, [x]), p(() => {
    if (x)
      return a ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
        document.body.style.overflow = "unset";
      };
  }, [a, x]), p(() => {
    const e = () => f(null);
    if (w !== null)
      return document.addEventListener("click", e), () => document.removeEventListener("click", e);
  }, [w]);
  const j = (e) => {
    const t = new Set(M);
    t.has(e) ? t.delete(e) : t.add(e), y(t);
  }, g = (e) => {
    v(!1), y(/* @__PURE__ */ new Set()), f(null), e.href && d ? d(e.href, e) : e.onClick && e.onClick();
  }, V = (e = !1) => {
    const t = "px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center gap-2";
    switch (S) {
      case "subtle":
        return n(
          t,
          "cursor-pointer",
          e ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/60"
          // ← CHANGED
        );
      case "brand":
        return n(
          t,
          "cursor-pointer",
          e ? "bg-primary-foreground/20 text-primary-foreground shadow-sm" : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
        );
      case "contrast":
        return n(
          t,
          "cursor-pointer",
          e ? "bg-muted text-foreground shadow-sm" : "text-muted-background/50 dark:text-muted-foreground hover:text-foreground hover:bg-muted/50"
          // ← CHANGED
        );
      default:
        return n(
          t,
          "cursor-pointer",
          e ? "bg-muted text-foreground shadow-sm" : "text-foreground hover:text-foreground hover:bg-muted/50"
        );
    }
  }, B = (e = !1) => n(
    "w-full flex items-center px-3 py-2 text-left transition-colors duration-200 rounded-lg",
    e ? "bg-secondary text-secondary-foreground" : "text-foreground hover:text-foreground hover:bg-muted"
  ), R = () => {
    switch (S) {
      case "subtle":
        return "text-muted-foreground hover:text-foreground hover:bg-muted/50";
      case "brand":
        return "text-primary-foreground hover:text-primary-foreground hover:bg-primary-foreground/10";
      case "contrast":
        return "text-foreground hover:text-foreground hover:bg-muted/50";
      default:
        return "text-foreground hover:text-foreground hover:bg-muted/50";
    }
  };
  return /* @__PURE__ */ l("div", { className: "flex items-center ml-auto", children: [
    /* @__PURE__ */ r("nav", { className: n("hidden md:flex items-center space-x-1", u), ref: b, ...h, children: c.map((e) => {
      const t = e.items && e.items.length > 0, i = w === e.key, k = e.href ? s === e.href : e.isActive;
      return /* @__PURE__ */ l("div", { className: "relative", children: [
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: n(V(k), e.className),
            onClick: (o) => {
              o.stopPropagation(), t ? f(i ? null : e.key) : (f(null), g(e));
            },
            children: [
              e.icon && /* @__PURE__ */ r(e.icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ r("span", { children: e.label }),
              t && /* @__PURE__ */ r(z, { className: n(
                "h-3 w-3 transition-transform duration-200",
                i && "rotate-180"
              ) })
            ]
          }
        ),
        t && i && /* @__PURE__ */ r(
          "div",
          {
            className: "absolute top-full left-0 w-48 bg-background border border-border rounded-lg shadow-lg z-50 mt-1",
            onClick: (o) => o.stopPropagation(),
            children: /* @__PURE__ */ r("div", { className: "py-1", children: e.items?.map((o) => {
              const N = o.href ? s === o.href : o.isActive;
              return /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  className: n(
                    "w-full px-3 py-2 text-left text-sm transition-colors flex items-center gap-2",
                    "hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none",
                    N ? "bg-muted text-foreground font-medium" : "text-foreground"
                  ),
                  onClick: () => {
                    f(null), g(o);
                  },
                  children: [
                    o.icon && /* @__PURE__ */ r(o.icon, { className: "h-4 w-4" }),
                    /* @__PURE__ */ r("span", { children: o.label }),
                    o.badge && /* @__PURE__ */ r("span", { className: "ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded", children: o.badge })
                  ]
                },
                o.key
              );
            }) })
          }
        )
      ] }, e.key);
    }) }),
    /* @__PURE__ */ r(
      X,
      {
        variant: "ghost",
        size: "icon",
        className: n("md:hidden", R()),
        onClick: () => v(!a),
        "aria-label": a ? "Close menu" : "Open menu",
        children: a ? /* @__PURE__ */ r(q, { className: "h-5 w-5" }) : /* @__PURE__ */ r(F, { className: "h-5 w-5" })
      }
    ),
    a && /* @__PURE__ */ r("div", { className: "fixed top-16 left-0 right-0 z-40 md:hidden bg-background border-b border-border/40 shadow-lg", children: /* @__PURE__ */ r("div", { className: "max-h-96 overflow-y-auto", children: /* @__PURE__ */ r("div", { className: "px-4 py-4 space-y-2", children: c.map((e) => {
      const t = e.items && e.items.length > 0, i = M.has(e.key), k = e.href ? s === e.href : e.isActive;
      return /* @__PURE__ */ l("div", { className: "space-y-1", children: [
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: n(B(k), e.className),
            onClick: () => t ? j(e.key) : g(e),
            children: [
              e.icon && /* @__PURE__ */ r(e.icon, { className: "h-4 w-4 mr-3 flex-shrink-0" }),
              /* @__PURE__ */ r("span", { className: "flex-1 text-sm", children: e.label }),
              e.badge && /* @__PURE__ */ r("span", { className: "text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded mr-2", children: e.badge }),
              t && /* @__PURE__ */ r(z, { className: n(
                "h-4 w-4 transition-transform duration-200 flex-shrink-0",
                i && "rotate-180"
              ) })
            ]
          }
        ),
        t && i && /* @__PURE__ */ r("div", { className: "ml-6 space-y-1 border-l border-border/30 pl-4", children: e.items?.map((o) => {
          const N = o.href ? s === o.href : o.isActive;
          return /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: n(
                "w-full flex items-center px-3 py-2 text-left transition-colors rounded-lg",
                N ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              ),
              onClick: () => g(o),
              children: [
                o.icon && /* @__PURE__ */ r(o.icon, { className: "h-3 w-3 mr-3 flex-shrink-0" }),
                /* @__PURE__ */ r("span", { className: "flex-1 text-sm", children: o.label }),
                o.badge && /* @__PURE__ */ r("span", { className: "text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded", children: o.badge })
              ]
            },
            o.key
          );
        }) })
      ] }, e.key);
    }) }) }) })
  ] });
});
D.displayName = "HeaderNav";
const I = Object.assign(L, {
  Logo: O,
  Nav: D
});
export {
  I as Header,
  O as HeaderLogo,
  D as HeaderNav,
  J as containerVariants,
  G as headerVariants
};
//# sourceMappingURL=header.js.map
