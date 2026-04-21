import { jsx as r, jsxs as g, Fragment as A } from "react/jsx-runtime";
import { forwardRef as w, useState as C, useEffect as E } from "react";
import { c as k } from "./index-Bke1qZdk.js";
import { c as b } from "./utils-CwJPJKOE.js";
import { Button as I } from "./button.js";
import { Badge as j } from "./badge.js";
import { Sheet as M, SheetTrigger as V, SheetContent as O, SheetHeader as T, SheetTitle as z } from "./sheet.js";
import { E as R } from "./ellipsis-BhAoKPVk.js";
import { C as G } from "./chevron-right-pz9eCjj-.js";
const F = k(
  "w-full mx-auto bg-background text-foreground",
  {
    variants: {
      layout: {
        none: "block",
        "sidebar-left": "block md:flex",
        // ✅ FIXED: Always flex for side-by-side
        "sidebar-right": "block md:flex"
        // ✅ FIXED: Always flex for side-by-side
      },
      size: {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        lg: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-full"
      },
      position: {
        sticky: "relative",
        fixed: "relative",
        relative: "relative"
      }
    },
    defaultVariants: {
      layout: "none",
      size: "xl",
      position: "relative"
    }
  }
), H = k(
  // `hidden md:block` — on small screens the sidebar is swapped for the
  // `<BottomTabSheet>` rendered below. Below the `md` breakpoint the desktop
  // sidebar is not rendered visibly, and the bottom-nav (which renders the
  // same `NavigationItem[]`) takes its place. Both components are always
  // present in the DOM so the swap is pure CSS — no hydration flash and no
  // JS breakpoint check needed at render time.
  "hidden md:block flex-shrink-0 rounded-lg m-4",
  {
    variants: {
      position: {
        left: "order-first",
        right: "order-last"
      },
      size: {
        sm: "w-48",
        // ✅ FIXED: Removed responsive prefixes for consistent width
        md: "w-56",
        lg: "w-64",
        xl: "w-64",
        full: "w-64"
      },
      sidebarPosition: {
        sticky: "sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto",
        // ✅ FIXED: Added self-start
        fixed: "sticky top-4 self-start max-h-[calc(100vh-2rem)] overflow-y-auto",
        // ✅ FIXED: Added self-start  
        relative: "self-start"
        // ✅ FIXED: Added self-start
      },
      tone: {
        clean: "bg-muted/10 border border-border/60 dark:bg-muted/20 dark:border-border/50",
        subtle: "bg-muted/50 border border-border/20 dark:bg-muted/60 dark:border-border/30",
        brand: "bg-primary/10 border border-primary/15 dark:bg-primary/15 dark:border-primary/20",
        contrast: "bg-muted/70 border border-border/50 dark:bg-muted/80 dark:border-border/60"
      }
    },
    defaultVariants: {
      position: "left",
      size: "md",
      sidebarPosition: "relative",
      tone: "clean"
    }
  }
), L = k(
  "flex-1 min-w-0 p-4",
  // ✅ OPTIMIZED: Constant p-4 padding, removed min-w-0 conflict
  {
    variants: {
      size: {
        sm: "",
        // ✅ OPTIMIZED: Removed size-based padding, using constant p-4
        md: "",
        lg: "",
        xl: "",
        full: ""
      },
      hasGap: {
        true: "",
        // ✅ OPTIMIZED: Removed ml-6, using sidebar m-4 instead
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      hasGap: !1
    }
  }
), X = (a = "md") => {
  const i = {
    sm: {
      button: "text-xs py-1.5 px-2 min-h-[28px]",
      icon: "h-3 w-3 mr-2 flex-shrink-0",
      spacing: "space-y-0.5",
      showBadges: !1
    },
    md: {
      button: "text-sm py-2 px-3 min-h-[32px]",
      icon: "h-4 w-4 mr-2 flex-shrink-0",
      spacing: "space-y-1",
      showBadges: !0
    },
    lg: {
      button: "text-sm py-2.5 px-4 min-h-[36px]",
      icon: "h-4 w-4 mr-3 flex-shrink-0",
      spacing: "space-y-1.5",
      showBadges: !0
    },
    xl: {
      button: "text-sm py-2.5 px-4 min-h-[36px]",
      icon: "h-4 w-4 mr-3 flex-shrink-0",
      spacing: "space-y-1.5",
      showBadges: !0
    },
    full: {
      button: "text-sm py-2.5 px-4 min-h-[36px]",
      icon: "h-4 w-4 mr-3 flex-shrink-0",
      spacing: "space-y-1.5",
      showBadges: !0
    }
  };
  return i[a] || i.md;
};
function S({
  navigation: a,
  size: i = "md",
  tone: n,
  currentPath: u = "",
  onNavigate: s
}) {
  const [f, h] = C(/* @__PURE__ */ new Set()), d = X(i);
  E(() => {
    const e = /* @__PURE__ */ new Set(), l = (t) => {
      t.forEach((o) => {
        o.items && o.items.length > 0 && (e.add(o.key), l(o.items));
      });
    };
    l(a), h(e);
  }, [a]);
  const x = (e) => {
    const l = new Set(f);
    l.has(e) ? l.delete(e) : l.add(e), h(l);
  }, p = (e) => {
    e.items && e.items.length > 0 ? x(e.key) : e.href && s ? s(e.href, e) : e.onClick && e.onClick();
  }, c = (e, l = 0) => {
    const t = e.items && e.items.length > 0, o = f.has(e.key), m = e.href ? u === e.href : e.isActive;
    return /* @__PURE__ */ g("div", { className: "w-full", children: [
      /* @__PURE__ */ g(
        I,
        {
          variant: "ghost",
          className: b(
            "w-full justify-start transition-all items-center cursor-pointer",
            d.button,
            l > 0 && "ml-4 w-[calc(100%-1rem)]",
            // Tone-aware styling
            n === "clean" && (m ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"),
            n === "subtle" && (m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/60"),
            n === "brand" && (m ? "bg-primary/10 text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-primary/5"),
            n === "contrast" && (m ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"),
            e.className
          ),
          onClick: () => p(e),
          children: [
            e.icon && /* @__PURE__ */ r(e.icon, { className: d.icon }),
            /* @__PURE__ */ r("span", { className: "flex-1 text-left truncate", children: e.label }),
            e.badge && d.showBadges && /* @__PURE__ */ r(j, { variant: "secondary", className: "text-xs ml-auto", children: e.badge }),
            t && /* @__PURE__ */ r(
              G,
              {
                className: b(
                  "h-4 w-4 ml-2 transition-transform duration-200 text-muted-foreground",
                  o && "rotate-90"
                )
              }
            )
          ]
        }
      ),
      t && o && e.items && /* @__PURE__ */ r("div", { className: "mt-1 space-y-1", children: e.items.map(
        (v) => c(v, l + 1)
      ) })
    ] }, e.key);
  };
  return /* @__PURE__ */ r("nav", { className: b("w-full p-3", d.spacing), children: a.map((e) => c(e)) });
}
const y = w(({
  content: a,
  position: i = "left",
  size: n = "md",
  sidebarPosition: u = "relative",
  tone: s = "clean",
  currentPath: f = "",
  onNavigate: h,
  className: d,
  style: x
}, p) => {
  if (!a) return null;
  const c = () => Array.isArray(a) ? /* @__PURE__ */ r(
    S,
    {
      navigation: a,
      size: n,
      tone: s,
      currentPath: f,
      onNavigate: h
    }
  ) : /* @__PURE__ */ r("div", { className: "p-3", children: a });
  return /* @__PURE__ */ r(
    "aside",
    {
      ref: p,
      className: b(
        H({ position: i, size: n, sidebarPosition: u, tone: s }),
        d
      ),
      style: x,
      children: c()
    }
  );
});
y.displayName = "ContainerSidebar";
function _({
  navigation: a,
  currentPath: i,
  onNavigate: n,
  tone: u,
  size: s
}) {
  const [f, h] = C(!1), d = 4, x = a.slice(0, d), p = a.slice(d), c = p.length > 0, e = (t) => {
    t.href && n ? n(t.href, t) : t.onClick && t.onClick();
  }, l = (t) => {
    const o = t.href ? i === t.href : !!t.isActive, m = t.icon, v = t.label.split(" ")[0];
    return /* @__PURE__ */ g(
      "button",
      {
        type: "button",
        onClick: () => e(t),
        className: b(
          "flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 px-1",
          "transition-colors duration-150",
          o ? "text-primary" : "text-muted-foreground hover:text-foreground"
        ),
        "aria-current": o ? "page" : void 0,
        children: [
          m && /* @__PURE__ */ r(m, { className: "h-5 w-5 flex-shrink-0" }),
          /* @__PURE__ */ r("span", { className: "text-[10px] font-medium truncate w-full text-center", children: v })
        ]
      },
      t.key
    );
  };
  return /* @__PURE__ */ g(A, { children: [
    /* @__PURE__ */ r(
      "nav",
      {
        className: b(
          "fixed bottom-0 inset-x-0 z-40 md:hidden",
          "flex items-stretch bg-background border-t border-border",
          "pb-[env(safe-area-inset-bottom)]"
        ),
        "aria-label": "Primary navigation",
        children: /* @__PURE__ */ g("div", { className: "flex items-stretch w-full h-[60px]", children: [
          x.map(l),
          c && /* @__PURE__ */ g(M, { open: f, onOpenChange: h, children: [
            /* @__PURE__ */ r(V, { asChild: !0, children: /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                className: b(
                  "flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 px-1",
                  "text-muted-foreground hover:text-foreground transition-colors duration-150"
                ),
                "aria-label": "More navigation items",
                children: [
                  /* @__PURE__ */ r(R, { className: "h-5 w-5 flex-shrink-0" }),
                  /* @__PURE__ */ r("span", { className: "text-[10px] font-medium", children: "More" })
                ]
              }
            ) }),
            /* @__PURE__ */ g(
              O,
              {
                side: "bottom",
                className: "max-h-[85vh] overflow-y-auto",
                children: [
                  /* @__PURE__ */ r(T, { children: /* @__PURE__ */ r(z, { children: "Navigation" }) }),
                  /* @__PURE__ */ r("div", { className: "pb-6", children: /* @__PURE__ */ r(
                    S,
                    {
                      navigation: p,
                      size: s,
                      tone: u,
                      currentPath: i,
                      onNavigate: (t, o) => {
                        n?.(t, o), h(!1);
                      }
                    }
                  ) })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        "aria-hidden": "true",
        className: "md:hidden h-[60px]",
        style: { paddingBottom: "env(safe-area-inset-bottom)" }
      }
    )
  ] });
}
const N = w(({
  size: a = "md",
  children: i,
  className: n,
  style: u
}, s) => /* @__PURE__ */ r(
  "main",
  {
    ref: s,
    className: b(L({ size: a }), n),
    style: u,
    children: i
  }
));
N.displayName = "ContainerMain";
const B = w(({
  className: a,
  style: i,
  tone: n = "clean",
  position: u = "relative",
  sidebar: s = "none",
  navigation: f = [],
  sidebarContent: h,
  currentPath: d = "",
  onNavigate: x,
  sidebarPosition: p = "relative",
  size: c = "xl",
  children: e
}, l) => {
  const t = s === "left" ? "sidebar-left" : s === "right" ? "sidebar-right" : "none", o = s !== "none" && (f.length > 0 || h), m = f.length > 0 ? f : h, v = o && Array.isArray(m) ? m : null;
  return /* @__PURE__ */ g(
    "div",
    {
      ref: l,
      className: b(F({ layout: t, size: c, position: u }), a),
      style: i,
      children: [
        o && s === "left" && /* @__PURE__ */ r(
          y,
          {
            content: m,
            position: "left",
            size: c,
            sidebarPosition: p,
            tone: n,
            currentPath: d,
            onNavigate: x
          }
        ),
        /* @__PURE__ */ r(N, { size: c, children: e }),
        o && s === "right" && /* @__PURE__ */ r(
          y,
          {
            content: m,
            position: "right",
            size: c,
            sidebarPosition: p,
            tone: n,
            currentPath: d,
            onNavigate: x
          }
        ),
        v && /* @__PURE__ */ r(
          _,
          {
            navigation: v,
            currentPath: d,
            onNavigate: x,
            tone: n,
            size: c
          }
        )
      ]
    }
  );
});
B.displayName = "Container";
const $ = Object.assign(B, {
  Sidebar: y,
  Main: N
});
export {
  $ as Container,
  N as ContainerMain,
  y as ContainerSidebar
};
//# sourceMappingURL=container.js.map
