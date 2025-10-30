import { jsx as e, jsxs as a, Fragment as k } from "react/jsx-runtime";
import { forwardRef as C } from "react";
import { c as N } from "./index-Bke1qZdk.js";
import { c as r } from "./utils-CwJPJKOE.js";
const x = N(
  "min-h-screen",
  {
    variants: {
      scheme: {
        simple: "bg-background flex items-center justify-center p-4",
        card: "bg-background flex items-center justify-center p-4",
        split: "flex min-h-screen bg-background",
        hero: "min-h-screen relative overflow-hidden"
      },
      tone: {
        clean: "",
        subtle: "bg-muted/10",
        brand: "bg-primary/5",
        contrast: "bg-zinc-900"
      }
    },
    defaultVariants: {
      scheme: "card",
      tone: "clean"
    }
  }
), g = N(
  "w-full space-y-6",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-2xl"
      },
      scheme: {
        simple: "",
        card: "p-8 bg-card border border-border rounded-lg shadow-lg",
        split: "mx-auto lg:w-96",
        hero: ""
      }
    },
    defaultVariants: {
      size: "md",
      scheme: "card"
    }
  }
), M = C(({
  scheme: l = "card",
  tone: t = "clean",
  size: n = "md",
  title: c,
  subtitle: d,
  logo: s,
  footer: i,
  className: m,
  containerProps: h,
  // Split scheme props
  splitContent: u,
  splitBackground: f,
  // Hero scheme props
  imageUrl: y,
  imageAlt: w = "Authentication background",
  imageOverlay: p = "dark",
  // Card scheme props
  cardContent: b,
  children: v
}, o) => {
  const I = y || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA3MCIgaGVpZ2h0PSIxMzgwIiB2aWV3Qm94PSIwIDAgMjA3MCAxMzgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMjA3MCIgaGVpZ2h0PSIxMzgwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGC5bmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjM2Y4MWJhIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJkNmM5YyIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=", j = {
    light: "bg-gradient-to-br from-white/50 via-white/25 to-white/50",
    dark: "bg-gradient-to-br from-black/40 via-black/25 to-black/40",
    none: ""
  };
  return l === "simple" ? /* @__PURE__ */ e("div", { ref: o, className: r(x({ scheme: l, tone: t }), m), children: /* @__PURE__ */ a(
    "div",
    {
      ...h,
      className: r(
        g({ size: n, scheme: l }),
        h?.className
      ),
      children: [
        s && /* @__PURE__ */ e("div", { className: "flex justify-center", children: s }),
        (c || d) && /* @__PURE__ */ a("div", { className: "text-center space-y-2", children: [
          c && /* @__PURE__ */ e("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: c }),
          d && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: d })
        ] }),
        /* @__PURE__ */ e("div", { className: "space-y-4", children: v }),
        i && /* @__PURE__ */ e("div", { className: "text-center", children: i })
      ]
    }
  ) }) : l === "card" ? /* @__PURE__ */ e("div", { ref: o, className: r(x({ scheme: l, tone: t }), m), children: /* @__PURE__ */ a(
    "div",
    {
      ...h,
      className: r(
        g({ size: n, scheme: l }),
        h?.className
      ),
      children: [
        s && /* @__PURE__ */ e("div", { className: "flex justify-center", children: s }),
        (c || d) && /* @__PURE__ */ a("div", { className: "text-center space-y-2", children: [
          c && /* @__PURE__ */ e("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: c }),
          d && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: d })
        ] }),
        /* @__PURE__ */ e("div", { className: "space-y-4", children: v }),
        i && /* @__PURE__ */ e("div", { className: "text-center", children: i })
      ]
    }
  ) }) : l === "split" ? /* @__PURE__ */ a("div", { ref: o, className: r(x({ scheme: l, tone: t }), m), children: [
    /* @__PURE__ */ e("div", { className: r(
      "hidden lg:flex lg:w-1/2 relative overflow-hidden",
      u ? "" : f || "bg-gradient-to-br from-primary via-primary/90 to-accent"
    ), children: u ? (
      // Custom split content
      /* @__PURE__ */ e("div", { className: "relative z-10 flex flex-col justify-center p-8 lg:p-12 w-full", children: u })
    ) : /* @__PURE__ */ e(k, { children: !f && /* @__PURE__ */ e("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ e(
      "div",
      {
        className: "w-full h-full",
        style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }
      }
    ) }) }) }),
    /* @__PURE__ */ e("div", { className: "flex flex-1 lg:w-1/2", children: /* @__PURE__ */ e("div", { className: "flex flex-col justify-center w-full px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24", children: /* @__PURE__ */ a("div", { className: r(g({ size: n, scheme: l })), children: [
      s && /* @__PURE__ */ e("div", { className: "flex justify-center lg:justify-start mb-8", children: s }),
      (c || d) && /* @__PURE__ */ a("div", { className: "text-center lg:text-left space-y-2 mb-8", children: [
        c && /* @__PURE__ */ e("h1", { className: "text-2xl sm:text-3xl font-semibold tracking-tight text-foreground", children: c }),
        d && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: d })
      ] }),
      /* @__PURE__ */ e("div", { className: "space-y-4", children: v }),
      i && /* @__PURE__ */ e("div", { className: "text-center lg:text-left mt-8", children: i })
    ] }) }) })
  ] }) : l === "hero" ? /* @__PURE__ */ a("div", { ref: o, className: r(x({ scheme: l, tone: t }), m), children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: "absolute inset-0 bg-cover bg-center bg-no-repeat",
        style: {
          backgroundImage: `url('${I}')`
        },
        role: "img",
        "aria-label": w,
        children: [
          p !== "none" && /* @__PURE__ */ e("div", { className: r("absolute inset-0", j[p]) }),
          /* @__PURE__ */ e("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ a("div", { className: r("w-full", g({ size: n, scheme: "simple" })), children: [
      s && /* @__PURE__ */ e("div", { className: "text-center mb-8", children: s }),
      /* @__PURE__ */ a("div", { className: "bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 overflow-hidden", children: [
        /* @__PURE__ */ a("div", { className: "px-8 pt-8 pb-6 text-center", children: [
          c && /* @__PURE__ */ e("h1", { className: "text-3xl font-bold text-foreground mb-2", children: c }),
          d && /* @__PURE__ */ e("p", { className: "text-muted-foreground", children: d })
        ] }),
        /* @__PURE__ */ e("div", { className: "px-8 pb-8 space-y-6", children: /* @__PURE__ */ e("div", { className: "space-y-4", children: v }) })
      ] }),
      b && /* @__PURE__ */ e("div", { className: "mt-8", children: b }),
      i && /* @__PURE__ */ e("div", { className: "text-center mt-8 text-sm text-primary-foreground/80", children: i })
    ] }) }),
    /* @__PURE__ */ e("div", { className: "absolute top-20 left-10 w-2 h-2 bg-primary-foreground/30 rounded-full animate-pulse" }),
    /* @__PURE__ */ e("div", { className: "absolute top-40 right-20 w-3 h-3 bg-primary/40 rounded-full animate-pulse delay-1000" }),
    /* @__PURE__ */ e("div", { className: "absolute bottom-32 left-20 w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-500" }),
    /* @__PURE__ */ e("div", { className: "absolute bottom-20 right-32 w-4 h-4 bg-primary-foreground/20 rounded-full animate-pulse delay-700" })
  ] }) : /* @__PURE__ */ e("div", { ref: o, className: r(x({ scheme: "card", tone: t }), m), children: /* @__PURE__ */ e("div", { className: r(g({ size: n, scheme: "card" })), children: /* @__PURE__ */ e("div", { className: "text-center", children: /* @__PURE__ */ a("p", { className: "text-destructive", children: [
    "Invalid scheme: ",
    l
  ] }) }) }) });
});
M.displayName = "AuthLayout";
export {
  M as AuthLayout
};
//# sourceMappingURL=auth.js.map
