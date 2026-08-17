import { jsx as e, jsxs as d, Fragment as z } from "react/jsx-runtime";
import * as T from "react";
import { createContext as Y, forwardRef as V, useState as B, useLayoutEffect as Z, useEffect as O, useContext as K } from "react";
import { c as ee } from "./index-Bke1qZdk.js";
import { c as s } from "./utils-CwJPJKOE.js";
import { Button as W } from "./button.js";
import { Badge as re } from "./badge.js";
import { Separator as te } from "./separator.js";
import { TooltipProvider as oe, Tooltip as ne, TooltipTrigger as ae, TooltipContent as se } from "./tooltip.js";
import { Breadcrumb as de, BreadcrumbList as ie, BreadcrumbItem as le, BreadcrumbLink as ce, BreadcrumbPage as me, BreadcrumbSeparator as ue } from "./breadcrumb.js";
import { X as fe } from "./x-BxwubQiM.js";
import { M as _ } from "./menu-DBhEanGo.js";
import { C as he } from "./chevron-right-pz9eCjj-.js";
function $() {
  return typeof window > "u" ? !1 : window.innerWidth < 1024;
}
function be(x) {
  return typeof window > "u" ? x : $() ? !1 : x;
}
const X = Y({
  scheme: "sidebar",
  tone: "subtle",
  size: "lg",
  sidebarExpanded: !0,
  setSidebarExpanded: () => {
  },
  isMobile: !1
}), pe = ee(
  "min-h-screen flex bg-background",
  {
    variants: {
      tone: {
        clean: "",
        subtle: "",
        brand: "",
        contrast: ""
      }
    },
    defaultVariants: {
      tone: "subtle"
    }
  }
), q = V(({
  scheme: x = "sidebar",
  tone: k = "subtle",
  size: h = "lg",
  position: g = "relative",
  defaultSidebarOpen: m = !0,
  className: v,
  children: N
}, S) => {
  const [i, o] = B($), [w, t] = B(
    () => be(m)
  );
  Z(() => {
    const l = () => {
      const n = window.innerWidth < 1024, C = i;
      o(n), n && !C && w ? t(!1) : !n && C && t(m);
    };
    return l(), window.addEventListener("resize", l), () => window.removeEventListener("resize", l);
  }, [i, w, m]), O(() => (i && w ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
    document.body.style.overflow = "unset";
  }), [i, w]);
  const u = T.Children.toArray(N), y = u.find(
    (l) => T.isValidElement(l) && l.type === I
  ), b = u.find(
    (l) => T.isValidElement(l) && l.type === R
  ), j = u.find(
    (l) => T.isValidElement(l) && l.type === H
  );
  return /* @__PURE__ */ e(X.Provider, { value: {
    scheme: x,
    tone: k,
    size: h,
    sidebarExpanded: w,
    setSidebarExpanded: t,
    isMobile: i
  }, children: /* @__PURE__ */ d(
    "div",
    {
      ref: S,
      className: s(pe({ tone: k }), v),
      children: [
        /* @__PURE__ */ e("div", { className: s(
          "flex-shrink-0 transition-all duration-200 ease-out overflow-hidden",
          // Desktop: smooth width transition
          !i && w && (h === "sm" ? "w-48" : h === "md" ? "w-56" : h === "lg" ? "w-64" : h === "xl" ? "w-72" : "w-80"),
          !i && !w && "w-0",
          // Mobile: don't affect layout
          i && "w-0",
          g === "sticky" && i && "top-0 max-h-screen",
          g === "sticky" && !i && "sticky top-0 max-h-screen"
        ), children: y }),
        /* @__PURE__ */ d("div", { className: "flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out", children: [
          b,
          j
        ] })
      ]
    }
  ) });
});
q.displayName = "AdminLayout";
const I = V(({
  tone: x,
  navigation: k = [],
  currentPath: h = "",
  onNavigate: g,
  logo: m,
  position: v,
  footer: N,
  className: S
}, i) => {
  const { scheme: o, tone: w, size: t, sidebarExpanded: u, setSidebarExpanded: y, isMobile: b } = P(), [j, l] = B(/* @__PURE__ */ new Set()), [n, C] = B(!1), a = x || w, E = o === "compact", p = !E || n, G = () => {
    E && C(!n);
  }, J = (r) => {
    const c = new Set(j);
    c.has(r) ? c.delete(r) : c.add(r), l(c);
  }, Q = (r, c = !1) => {
    const M = c ? "w-[92%] flex items-center group text-left font-medium rounded-lg cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02]" : "w-full flex items-center group text-left font-medium rounded-lg cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02]", A = c ? p ? "ml-4 px-3 py-2" : "px-2 py-2" : p ? "px-3 py-2.5" : "px-2 py-2.5 justify-center";
    let f = "";
    switch (a) {
      case "clean":
        f = r ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
        break;
      case "subtle":
        f = r ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/60";
        break;
      case "brand":
        f = r ? "bg-primary-foreground/20 text-primary-foreground shadow-sm" : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10";
        break;
      case "contrast":
        f = r ? "bg-muted/20 dark:bg-muted/20 text-white shadow-sm" : "text-white hover:bg-muted/20";
        break;
      default:
        f = r ? "bg-muted/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50";
    }
    return s(M, A, f);
  }, D = ({ item: r, isSubmenu: c = !1 }) => {
    const M = !c && r.items && r.items.length > 0, A = j.has(r.key), f = r.href ? h === r.href : !!r.isActive, F = /* @__PURE__ */ d(
      "button",
      {
        onClick: () => {
          if (E && !n) {
            C(!0);
            return;
          }
          M ? J(r.key) : r.href && g ? (g(r.href, r), b && y(!1)) : r.onClick && (r.onClick(), b && y(!1));
        },
        className: Q(f, c),
        children: [
          !c && r.icon && /* @__PURE__ */ e(r.icon, { className: s(
            "flex-shrink-0",
            p ? "h-4 w-4 mr-3" : "h-5 w-5"
          ) }),
          p && /* @__PURE__ */ d(z, { children: [
            /* @__PURE__ */ e("span", { className: "flex-1 truncate text-left", children: r.label }),
            r.badge && /* @__PURE__ */ e(
              re,
              {
                variant: f ? "secondary" : "outline",
                className: s(
                  "text-xs h-4 px-1 ml-1 flex-shrink-0",
                  a === "brand" && !f && "bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20",
                  a === "brand" && f && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30",
                  a === "contrast" && !f && "bg-contrast-muted text-contrast-muted-foreground border-contrast-border",
                  a === "contrast" && f && "bg-contrast-muted text-contrast-foreground border-contrast-border"
                ),
                children: r.badge
              }
            ),
            M && /* @__PURE__ */ e(he, { className: s(
              "h-4 w-4 flex-shrink-0 transition-transform duration-200",
              A && "rotate-90"
            ) })
          ] })
        ]
      }
    );
    return E && !n && !c && r.icon ? /* @__PURE__ */ d("div", { className: "w-full", children: [
      /* @__PURE__ */ e(oe, { children: /* @__PURE__ */ d(ne, { delayDuration: 300, children: [
        /* @__PURE__ */ e(ae, { asChild: !0, children: F }),
        /* @__PURE__ */ e(
          se,
          {
            side: "right",
            className: "bg-popover text-popover-foreground border border-border shadow-md",
            children: /* @__PURE__ */ e("p", { children: r.label })
          }
        )
      ] }) }),
      M && A && p && r.items && /* @__PURE__ */ e("div", { className: "overflow-hidden transition-all duration-300 mt-1", children: /* @__PURE__ */ e("div", { className: "space-y-1 pb-2", children: r.items.map((L) => /* @__PURE__ */ e(D, { item: L, isSubmenu: !0 }, L.key)) }) })
    ] }, r.key) : /* @__PURE__ */ d("div", { className: "w-full", children: [
      F,
      M && A && p && r.items && /* @__PURE__ */ e("div", { className: "overflow-hidden transition-all duration-400 ease-out mt-1", children: /* @__PURE__ */ e("div", { className: "space-y-1 pb-2 animate-in slide-in-from-top-2", children: r.items.map((L, U) => /* @__PURE__ */ e(
        "div",
        {
          className: "transition-all duration-300 ease-out",
          style: { transitionDelay: `${U * 75}ms` },
          children: /* @__PURE__ */ e(D, { item: L, isSubmenu: !0 })
        },
        L.key
      )) }) })
    ] }, r.key);
  };
  return /* @__PURE__ */ d(z, { children: [
    b && u && /* @__PURE__ */ e(
      "div",
      {
        className: "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden",
        onClick: () => y(!1),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ e(
      "aside",
      {
        ref: i,
        className: s(
          "border-r flex flex-col bg-background overflow-hidden",
          // ✅ RESTORED: Original smooth transitions
          "transition-all duration-200 ease-out",
          // ✅ FIXED: Proper z-index layering for mobile
          // Mobile: Higher z-index than header (z-[70] > z-[10])
          b ? "fixed left-0 top-0 z-[70] h-full" : "relative h-screen",
          // Mobile: slide animation
          b && (u ? "translate-x-0" : "-translate-x-full"),
          // Desktop: always visible but container controls width
          !b && "translate-x-0",
          // Fixed widths for consistent animation
          o === "sidebar" && t === "sm" && "w-48",
          o === "sidebar" && t === "md" && "w-56",
          o === "sidebar" && t === "lg" && "w-64",
          o === "sidebar" && t === "xl" && "w-72",
          o === "sidebar" && t === "full" && "w-80",
          o === "compact" && !n && t === "sm" && "w-12",
          o === "compact" && !n && t === "md" && "w-14",
          o === "compact" && !n && t === "lg" && "w-16",
          o === "compact" && !n && t === "xl" && "w-18",
          o === "compact" && !n && t === "full" && "w-20",
          o === "compact" && n && t === "sm" && "w-48",
          o === "compact" && n && t === "md" && "w-56",
          o === "compact" && n && t === "lg" && "w-64",
          o === "compact" && n && t === "xl" && "w-72",
          o === "compact" && n && t === "full" && "w-80",
          // Tone colors
          a === "clean" && "bg-background/90 backdrop-blur-sm border-border/40 text-foreground",
          a === "subtle" && "bg-muted/90 backdrop-blur-sm border-border/30 text-foreground",
          a === "brand" && "bg-primary border-primary-foreground/20 text-primary-foreground",
          a === "contrast" && "bg-contrast border-contrast-border/40 text-contrast-foreground",
          S
        ),
        children: /* @__PURE__ */ d("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ e("div", { className: s(
            "flex items-center shadow-sm flex-shrink-0 border-b transition-all duration-300 ease-out",
            a === "clean" && "border-border/40",
            a === "subtle" && "border-border/30",
            a === "brand" && "border-primary-foreground/20",
            a === "contrast" && "border-contrast-border/40",
            p ? "justify-between h-16 px-4" : "justify-center h-16 px-2"
          ), children: p ? /* @__PURE__ */ d(z, { children: [
            m && /* @__PURE__ */ e("div", { className: s(
              "flex-shrink-0",
              a === "brand" && "[&_*]:text-primary-foreground",
              a === "contrast" && "[&_*]:text-contrast-foreground"
            ), children: m }),
            (b || E && n) && /* @__PURE__ */ e(
              W,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => {
                  b ? y(!1) : E && C(!1);
                },
                className: "flex-shrink-0",
                children: /* @__PURE__ */ e(fe, { className: "h-4 w-4" })
              }
            )
          ] }) : /* @__PURE__ */ e(
            W,
            {
              variant: "ghost",
              size: "icon",
              onClick: G,
              className: "flex-shrink-0",
              children: /* @__PURE__ */ e(_, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ e("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ e("nav", { className: s(
            "space-y-1 transition-all duration-300 ease-out",
            p ? "p-4" : "p-2"
          ), children: k.map((r, c) => /* @__PURE__ */ e(
            "div",
            {
              className: s(
                "transition-all duration-300 ease-out",
                p ? "opacity-100 translate-x-0" : "opacity-100"
              ),
              style: {
                transitionDelay: p ? `${c * 50}ms` : "0ms"
              },
              children: /* @__PURE__ */ e(D, { item: r })
            },
            r.key
          )) }) }),
          N && p && /* @__PURE__ */ d(z, { children: [
            /* @__PURE__ */ e(te, { className: s(
              a === "clean" && "bg-border/40",
              a === "subtle" && "bg-border/30",
              a === "brand" && "bg-primary-foreground/20",
              a === "contrast" && "bg-contrast-muted/40"
            ) }),
            /* @__PURE__ */ e("div", { className: "flex-shrink-0 p-4", children: N })
          ] })
        ] })
      }
    )
  ] });
});
I.displayName = "AdminSidebar";
const R = V(({
  tone: x,
  size: k,
  title: h,
  position: g = "sticky",
  breadcrumbs: m = [],
  onBreadcrumbNavigate: v,
  actions: N,
  className: S
}, i) => {
  const { sidebarExpanded: o, setSidebarExpanded: w, isMobile: t } = P();
  return /* @__PURE__ */ e(
    "header",
    {
      ref: i,
      className: s(
        "w-full shadow-sm bg-background/95 backdrop-blur-md text-foreground flex-shrink-0 border-b border-border/50",
        "transition-all duration-200 ease-out",
        // ✅ FIXED: Sticky on desktop, lower z-index for mobile sidebar layering
        g === "sticky" && "sticky top-0",
        g === "fixed" && "fixed top-0 left-0 right-0",
        // Always use lower z-index so mobile sidebar appears above
        "z-[10]",
        g === "relative" && "relative",
        S
      ),
      children: /* @__PURE__ */ d("div", { className: "flex items-center justify-between px-4 lg:px-6 h-16", children: [
        /* @__PURE__ */ d("div", { className: "flex items-center gap-4 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(
            "button",
            {
              className: s(
                "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300 ease-out",
                "transform hover:scale-105 active:scale-95",
                // Always show on mobile
                t && "block",
                // Show on desktop for toggle functionality  
                !t && "block"
              ),
              onClick: () => w(!o),
              "aria-label": o ? "Close sidebar" : "Open sidebar",
              children: /* @__PURE__ */ e(_, { className: s(
                "h-5 w-5 transition-transform duration-300 ease-out",
                o && !t && "rotate-180"
              ) })
            }
          ),
          /* @__PURE__ */ d("div", { className: "min-w-0 flex-1", children: [
            h && !m.length && /* @__PURE__ */ e("h1", { className: "text-lg font-semibold text-foreground truncate", children: h }),
            m.length > 0 && /* @__PURE__ */ e(de, { children: /* @__PURE__ */ e(ie, { children: m.map((u, y) => /* @__PURE__ */ d(T.Fragment, { children: [
              /* @__PURE__ */ e(le, { children: u.href ? /* @__PURE__ */ e(
                ce,
                {
                  asChild: !!v,
                  ...v ? {
                    onClick: (b) => {
                      b.preventDefault(), v(u.href);
                    }
                  } : { href: u.href },
                  children: v ? /* @__PURE__ */ e("button", { type: "button", children: u.label }) : u.label
                }
              ) : /* @__PURE__ */ e(me, { children: u.label }) }),
              y < m.length - 1 && /* @__PURE__ */ e(ue, {})
            ] }, y)) }) })
          ] })
        ] }),
        N && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: N })
      ] })
    }
  );
});
R.displayName = "AdminHeader";
const H = V(({
  tone: x,
  size: k,
  className: h,
  children: g
}, m) => {
  const { isMobile: v } = P();
  return /* @__PURE__ */ e(
    "main",
    {
      ref: m,
      className: s(
        "flex-1 min-w-0 overflow-auto",
        h
      ),
      children: /* @__PURE__ */ e("div", { className: "", children: /* @__PURE__ */ e("div", { className: "w-full mx-auto", children: g }) })
    }
  );
});
H.displayName = "AdminContent";
const P = () => {
  const x = K(X);
  if (!x)
    throw new Error("useAdmin must be used within an AdminLayout component");
  return x;
}, Te = Object.assign(q, {
  Sidebar: I,
  Header: R,
  Content: H
});
export {
  H as AdminContent,
  R as AdminHeader,
  Te as AdminLayout,
  I as AdminSidebar,
  P as useAdmin
};
//# sourceMappingURL=admin.js.map
