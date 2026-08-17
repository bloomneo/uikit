import { jsx as e, jsxs as d, Fragment as B } from "react/jsx-runtime";
import { createContext as V, forwardRef as v, useContext as k } from "react";
import { c as C } from "./index-Bke1qZdk.js";
import { c as t } from "./utils-CwJPJKOE.js";
import { Button as I } from "./button.js";
import { Separator as F } from "./separator.js";
const y = V({
  tone: "contrast",
  size: "xl"
}), T = C(
  "w-full border-t transition-all duration-200",
  {
    variants: {
      tone: {
        clean: "bg-background/80 backdrop-blur-sm border-border/40 text-foreground",
        subtle: "bg-muted/50 backdrop-blur-sm border-border/30 text-foreground",
        brand: "bg-primary border-primary-foreground/20 text-primary-foreground",
        contrast: "bg-contrast border-contrast-border/40 text-contrast-foreground"
      },
      position: {
        sticky: "sticky bottom-0 z-30",
        fixed: "fixed bottom-0 left-0 right-0 z-30",
        relative: "relative"
      }
    },
    defaultVariants: {
      tone: "contrast",
      position: "relative"
    }
  }
), L = C(
  "mx-auto",
  {
    variants: {
      size: {
        sm: "max-w-2xl py-4 px-4",
        md: "max-w-4xl py-5 px-4 sm:px-6",
        lg: "max-w-6xl py-6 px-4 sm:px-6 lg:px-8",
        xl: "max-w-7xl py-6 px-4 sm:px-6 lg:px-8",
        full: "max-w-full py-8 px-4 sm:px-6 lg:px-8"
      }
    },
    defaultVariants: {
      size: "xl"
    }
  }
), S = v(({
  className: u,
  tone: c = "contrast",
  size: s = "xl",
  position: x = "relative",
  navigation: l = [],
  currentPath: i = "",
  onNavigate: n,
  children: f,
  ...h
}, a) => /* @__PURE__ */ e(y.Provider, { value: { tone: c, size: s }, children: /* @__PURE__ */ e(
  "footer",
  {
    ref: a,
    className: t(T({ tone: c, position: x }), u),
    ...h,
    children: /* @__PURE__ */ d("div", { className: t(L({ size: s })), children: [
      l.length > 0 && !f && /* @__PURE__ */ e(
        w,
        {
          navigation: l,
          currentPath: i,
          onNavigate: n
        }
      ),
      f
    ] })
  }
) }));
S.displayName = "Footer";
const w = v(({
  className: u,
  navigation: c = [],
  currentPath: s = "",
  onNavigate: x,
  logo: l,
  social: i,
  copyright: n,
  ...f
}, h) => {
  const { tone: a } = k(y), N = (r) => {
    r.href && x ? x(r.href, r) : r.onClick && r.onClick();
  }, b = (r = !1) => {
    const m = "text-sm transition-colors cursor-pointer";
    switch (a) {
      case "subtle":
        return t(m, r ? "text-foreground" : "text-muted-foreground hover:text-foreground");
      case "brand":
        return t(m, r ? "text-primary-foreground" : "text-primary-foreground/80 hover:text-primary-foreground");
      case "contrast":
        return t(m, r ? "text-contrast-foreground" : "text-contrast-muted-foreground hover:text-contrast-foreground");
      default:
        return t(m, r ? "text-foreground" : "text-muted-foreground hover:text-foreground");
    }
  };
  return /* @__PURE__ */ d(
    "div",
    {
      ref: h,
      className: t("space-y-4", u),
      ...f,
      children: [
        /* @__PURE__ */ d("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          l && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: l }),
          c.length > 0 && /* @__PURE__ */ e("nav", { className: "flex flex-wrap items-center justify-center gap-6", children: c.map((r) => {
            const m = r.href ? s === r.href : r.isActive;
            return /* @__PURE__ */ e(
              "button",
              {
                onClick: () => N(r),
                className: t(b(m), r.className),
                children: r.label
              },
              r.key
            );
          }) }),
          i && /* @__PURE__ */ e("div", { className: "flex-shrink-0", children: i })
        ] }),
        n && /* @__PURE__ */ d(B, { children: [
          /* @__PURE__ */ e(F, { className: t(
            a === "brand" && "bg-primary-foreground/20",
            a === "contrast" && "bg-contrast-muted"
          ) }),
          /* @__PURE__ */ e("div", { className: "text-center", children: /* @__PURE__ */ e("p", { className: t(
            "text-sm",
            a === "contrast" && "text-contrast-muted-foreground",
            a === "brand" && "text-primary-foreground/80",
            (a === "clean" || a === "subtle") && "text-muted-foreground"
          ), children: n }) })
        ] })
      ]
    }
  );
});
w.displayName = "FooterBasic";
const j = v(({
  className: u,
  brand: c,
  columns: s = [],
  newsletter: x,
  social: l,
  legal: i = [],
  currentPath: n = "",
  onNavigate: f,
  copyright: h,
  ...a
}, N) => {
  const { tone: b } = k(y), r = (o) => {
    o.href && f ? f(o.href, o) : o.onClick && o.onClick();
  }, p = (() => {
    switch (b) {
      case "subtle":
        return {
          heading: "text-foreground",
          text: "text-muted-foreground",
          link: "text-muted-foreground hover:text-foreground"
        };
      case "brand":
        return {
          heading: "text-primary-foreground",
          text: "text-primary-foreground/70",
          link: "text-primary-foreground/70 hover:text-primary-foreground"
        };
      case "contrast":
        return {
          heading: "text-contrast-foreground",
          text: "text-contrast-muted-foreground",
          link: "text-contrast-muted-foreground hover:text-contrast-foreground"
        };
      default:
        return {
          heading: "text-foreground",
          text: "text-muted-foreground",
          link: "text-muted-foreground hover:text-foreground"
        };
    }
  })();
  return /* @__PURE__ */ d(
    "div",
    {
      ref: N,
      className: t("space-y-8", u),
      ...a,
      children: [
        /* @__PURE__ */ d("div", { className: "grid gap-8 grid-cols-1 md:grid-cols-6 lg:grid-cols-6", children: [
          c && /* @__PURE__ */ d("div", { className: "col-span-2", children: [
            " ",
            c
          ] }),
          /* @__PURE__ */ e("div", { className: "col-span-4", children: s.length > 0 && /* @__PURE__ */ e("div", { className: t(
            "grid gap-6",
            // No columns: hidden
            s.length === 0 && "hidden",
            // 1 column: single column
            s.length === 1 && "grid-cols-1",
            // 2 columns: responsive 1→2
            s.length === 2 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3",
            // 3 columns: responsive 1→2→3
            s.length === 3 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3",
            // 4+ columns: responsive 1→2→4
            s.length >= 4 && "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          ), children: s.slice(0, 4).map((o) => /* @__PURE__ */ d("div", { className: "space-y-3", children: [
            /* @__PURE__ */ e("h4", { className: t("text-sm font-semibold", p.heading), children: o.title }),
            /* @__PURE__ */ e("ul", { className: "space-y-2", children: o.items?.map((g) => {
              const z = g.href ? n === g.href : g.isActive;
              return /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => r(g),
                  className: t(
                    "text-sm transition-colors cursor-pointer block",
                    z ? p.heading : p.link,
                    g.className
                  ),
                  children: g.label
                }
              ) }, g.key);
            }) })
          ] }, o.key)) }) })
        ] }),
        /* @__PURE__ */ d("div", { className: "space-y-4", children: [
          /* @__PURE__ */ e(F, { className: t(
            b === "brand" && "bg-primary-foreground/20",
            b === "contrast" && "bg-contrast-muted"
          ) }),
          /* @__PURE__ */ d("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4", children: [
            h && /* @__PURE__ */ e("p", { className: t("text-sm", p.text), children: h }),
            i.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center gap-4", children: i.map((o) => {
              const g = o.href ? n === o.href : o.isActive;
              return /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => r(o),
                  className: t(
                    "text-sm transition-colors cursor-pointer",
                    g ? p.heading : p.link,
                    o.className
                  ),
                  children: o.label
                },
                o.key
              );
            }) }),
            l && /* @__PURE__ */ e("div", { className: "flex items-center gap-2", children: l })
          ] })
        ] })
      ]
    }
  );
});
j.displayName = "FooterAdvanced";
const A = v(({
  className: u,
  links: c = [],
  ...s
}, x) => {
  const { tone: l } = k(y), i = () => {
    switch (l) {
      case "subtle":
        return "text-muted-foreground hover:text-foreground hover:bg-background/50";
      case "brand":
        return "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10";
      case "contrast":
        return "text-contrast-muted-foreground hover:text-contrast-foreground hover:bg-contrast/50";
      default:
        return "text-muted-foreground hover:text-foreground hover:bg-muted";
    }
  };
  return /* @__PURE__ */ e(
    "div",
    {
      ref: x,
      className: t("flex items-center gap-1", u),
      ...s,
      children: c.map((n) => /* @__PURE__ */ e(
        I,
        {
          variant: "ghost",
          size: "icon",
          className: t("h-8 w-8 cursor-pointer", i(), n.className),
          onClick: n.onClick,
          title: n.label,
          children: /* @__PURE__ */ e(n.icon, { className: "h-4 w-4" })
        },
        n.key
      ))
    }
  );
});
A.displayName = "FooterSocial";
const H = Object.assign(S, {
  Basic: w,
  Advanced: j,
  Social: A
});
export {
  H as Footer,
  j as FooterAdvanced,
  w as FooterBasic,
  A as FooterSocial
};
//# sourceMappingURL=footer.js.map
