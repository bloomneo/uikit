import { jsx as e, jsxs as x, Fragment as I } from "react/jsx-runtime";
import * as R from "react";
import { createContext as V, forwardRef as y, useContext as D } from "react";
import { c as E } from "./index-Bke1qZdk.js";
import { c as b } from "./utils-CwJPJKOE.js";
import { Header as O, HeaderLogo as q, HeaderNav as A } from "./header.js";
import { Footer as G } from "./footer.js";
import { Container as J } from "./container.js";
import { Breadcrumb as K, BreadcrumbList as M, BreadcrumbItem as Q, BreadcrumbLink as U, BreadcrumbPage as W, BreadcrumbSeparator as X } from "./breadcrumb.js";
const N = V({
  scheme: "default",
  tone: "brand",
  size: "xl"
}), Y = E(
  "min-h-screen flex flex-col",
  {
    variants: {
      tone: {
        clean: "bg-background text-foreground",
        subtle: "bg-background text-foreground",
        brand: "bg-background text-foreground",
        contrast: "bg-contrast text-contrast-foreground"
      }
    },
    defaultVariants: {
      tone: "clean"
    }
  }
), L = y(({
  scheme: o = "default",
  tone: r = "clean",
  size: i = "xl",
  className: s,
  children: p
}, m) => /* @__PURE__ */ e(N.Provider, { value: { scheme: o, tone: r, size: i }, children: /* @__PURE__ */ e(
  "div",
  {
    ref: m,
    className: b(Y({ tone: r }), s),
    children: p
  }
) }));
L.displayName = "PageLayout";
const F = y(({
  tone: o,
  size: r,
  position: i = "sticky",
  navigation: s = [],
  currentPath: p = "",
  onNavigate: m,
  logo: t,
  title: f,
  actions: l,
  className: c
}, d) => {
  const { tone: u, size: g } = C();
  return /* @__PURE__ */ x(
    O,
    {
      ref: d,
      tone: o || u,
      size: r || g,
      position: i,
      className: c,
      children: [
        /* @__PURE__ */ e(q, { children: t || f && /* @__PURE__ */ e("span", { className: "text-xl font-bold", children: f }) }),
        s.length > 0 && /* @__PURE__ */ e(
          A,
          {
            navigation: s,
            currentPath: p,
            onNavigate: m
          }
        ),
        l && /* @__PURE__ */ e("div", { className: "ml-auto flex items-center gap-2", children: l })
      ]
    }
  );
});
F.displayName = "PageHeader";
const H = y(({
  tone: o,
  size: r,
  sidebar: i = "none",
  navigation: s = [],
  sidebarContent: p,
  currentPath: m = "",
  onNavigate: t,
  sidebarPosition: f = "relative",
  breadcrumbs: l = [],
  onBreadcrumbNavigate: c,
  title: d,
  className: u,
  children: g
}, a) => {
  const { scheme: z, tone: S, size: h } = C(), k = i !== "none" ? i : z === "sidebar" ? "left" : "none", j = (n) => {
    c ? c(n) : t && t(n, {
      key: n,
      label: n,
      href: n
    });
  }, w = () => l.length === 0 ? null : /* @__PURE__ */ e("div", { className: "mb-6", children: /* @__PURE__ */ e(K, { children: /* @__PURE__ */ e(M, { children: l.map((n, P) => /* @__PURE__ */ x(R.Fragment, { children: [
    /* @__PURE__ */ e(Q, { children: n.href ? /* @__PURE__ */ e(
      U,
      {
        asChild: !!(c || t),
        ...c || t ? {
          onClick: (B) => {
            B.preventDefault(), j(n.href);
          }
        } : { href: n.href },
        children: c || t ? /* @__PURE__ */ e("button", { type: "button", children: n.label }) : n.label
      }
    ) : /* @__PURE__ */ e(W, { children: n.label }) }),
    P < l.length - 1 && /* @__PURE__ */ e(X, {})
  ] }, P)) }) }) }), v = () => d ? /* @__PURE__ */ e("h1", { className: "text-2xl sm:text-3xl font-bold text-foreground mb-4", children: d }) : null;
  return k === "none" ? /* @__PURE__ */ e(
    "main",
    {
      ref: a,
      className: b("flex-1", u),
      children: /* @__PURE__ */ x("div", { className: b(
        "mx-auto",
        (r || h) === "sm" && "max-w-2xl px-4 py-6",
        (r || h) === "md" && "max-w-4xl px-4 sm:px-6 py-8",
        (r || h) === "lg" && "max-w-6xl px-4 sm:px-6 lg:px-8 py-8",
        (r || h) === "xl" && "max-w-7xl px-4 sm:px-6 lg:px-8 py-8",
        (r || h) === "full" && "max-w-full px-4 sm:px-6 lg:px-8 py-8"
      ), children: [
        (d || l.length > 0) && /* @__PURE__ */ x("div", { className: "mb-8", children: [
          w(),
          v()
        ] }),
        g
      ] })
    }
  ) : /* @__PURE__ */ e("div", { ref: a, className: b("flex-1", u), children: /* @__PURE__ */ x(
    J,
    {
      sidebar: k,
      navigation: s,
      sidebarContent: p,
      currentPath: m,
      onNavigate: t,
      sidebarPosition: f,
      tone: o || S,
      size: r || h,
      children: [
        (d || l.length > 0) && /* @__PURE__ */ x("div", { className: "mb-8", children: [
          w(),
          v()
        ] }),
        g
      ]
    }
  ) });
});
H.displayName = "PageContent";
const T = y(({
  tone: o,
  size: r,
  position: i = "relative",
  navigation: s = [],
  currentPath: p = "",
  onNavigate: m,
  copyright: t,
  className: f,
  children: l
}, c) => {
  const { tone: d, size: u } = C();
  return /* @__PURE__ */ e(
    G,
    {
      ref: c,
      tone: o || (d === "brand" ? "subtle" : d),
      size: r || u,
      position: i,
      className: f,
      children: l || /* @__PURE__ */ x(I, { children: [
        s.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap justify-center gap-6 py-4", children: s.map((a) => /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              a.href && m ? m(a.href, a) : a.onClick && a.onClick();
            },
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: a.label
          },
          a.key
        )) }),
        t && /* @__PURE__ */ e("div", { className: "text-center py-4 border-t border-border", children: /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: t }) })
      ] })
    }
  );
});
T.displayName = "PageFooter";
const C = () => {
  const o = D(N);
  if (!o)
    throw new Error("usePage must be used within a PageLayout component");
  return o;
}, le = Object.assign(L, {
  Header: F,
  Content: H,
  Footer: T
});
export {
  H as PageContent,
  T as PageFooter,
  F as PageHeader,
  le as PageLayout,
  C as usePage
};
//# sourceMappingURL=page.js.map
