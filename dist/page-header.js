import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { c as h } from "./utils-CwJPJKOE.js";
import { C as x } from "./chevron-right-pz9eCjj-.js";
function g({ href: i, children: t }) {
  return /* @__PURE__ */ e("a", { href: i, className: "hover:text-foreground", children: t });
}
function v({
  title: i,
  description: t,
  icon: n,
  breadcrumbs: a,
  actions: d,
  renderLink: m = g,
  className: o,
  ...f
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("flex flex-col gap-3 border-b border-border pb-4", o),
      ...f,
      children: [
        a && a.length > 0 && /* @__PURE__ */ e("nav", { "aria-label": "Breadcrumb", className: "flex items-center text-sm text-muted-foreground", children: /* @__PURE__ */ e("ol", { className: "flex flex-wrap items-center gap-1", children: a.map((l, c) => {
          const s = c === a.length - 1;
          return /* @__PURE__ */ r("li", { className: "flex items-center gap-1", children: [
            l.href && !s ? m({ href: l.href, children: l.label }) : /* @__PURE__ */ e("span", { "aria-current": s ? "page" : void 0, className: s ? "text-foreground" : void 0, children: l.label }),
            !s && /* @__PURE__ */ e(x, { className: "size-3.5 shrink-0", "aria-hidden": "true" })
          ] }, c);
        }) }) }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ r("div", { className: "flex items-start gap-3", children: [
            n && /* @__PURE__ */ e("div", { className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&>svg]:size-5", "aria-hidden": "true", children: n }),
            /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: [
              /* @__PURE__ */ e("h1", { className: "text-2xl font-semibold tracking-tight text-foreground", children: i }),
              t && /* @__PURE__ */ e("p", { className: "text-sm text-muted-foreground", children: t })
            ] })
          ] }),
          d && /* @__PURE__ */ e("div", { className: "flex shrink-0 items-center gap-2", children: d })
        ] })
      ]
    }
  );
}
export {
  v as PageHeader
};
//# sourceMappingURL=page-header.js.map
