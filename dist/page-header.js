import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { c as h } from "./utils-CwJPJKOE.js";
import { requireProp as x } from "./errors.js";
import { C as g } from "./chevron-right-pz9eCjj-.js";
function p({ href: t, children: a }) {
  return /* @__PURE__ */ e("a", { href: t, className: "hover:text-foreground", children: a });
}
function j({
  title: t,
  description: a,
  icon: n,
  breadcrumbs: l,
  actions: d,
  renderLink: o = p,
  className: c,
  ...f
}) {
  return x("PageHeader", "title", t, "Every page header needs a title."), /* @__PURE__ */ r(
    "div",
    {
      className: h("flex flex-col gap-3 border-b border-border pb-4", c),
      ...f,
      children: [
        l && l.length > 0 && /* @__PURE__ */ e("nav", { "aria-label": "Breadcrumb", className: "flex items-center text-sm text-muted-foreground", children: /* @__PURE__ */ e("ol", { className: "flex flex-wrap items-center gap-1", children: l.map((s, m) => {
          const i = m === l.length - 1;
          return /* @__PURE__ */ r("li", { className: "flex items-center gap-1", children: [
            s.href && !i ? o({ href: s.href, children: s.label }) : /* @__PURE__ */ e("span", { "aria-current": i ? "page" : void 0, className: i ? "text-foreground" : void 0, children: s.label }),
            !i && /* @__PURE__ */ e(g, { className: "size-3.5 shrink-0", "aria-hidden": "true" })
          ] }, m);
        }) }) }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ r("div", { className: "flex items-start gap-3", children: [
            n && /* @__PURE__ */ e("div", { className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&>svg]:size-5", "aria-hidden": "true", children: n }),
            /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ e("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: t }),
              a && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: a })
            ] })
          ] }),
          d && /* @__PURE__ */ e("div", { className: "flex shrink-0 items-center gap-2", children: d })
        ] })
      ]
    }
  );
}
export {
  j as PageHeader
};
//# sourceMappingURL=page-header.js.map
