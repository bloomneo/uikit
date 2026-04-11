import { jsxs as c, jsx as s } from "react/jsx-runtime";
import * as r from "react";
import { c as m } from "./utils-CwJPJKOE.js";
import { Input as b } from "./input.js";
import { E as N, a as g } from "./eye-DDKoW0KS.js";
function j({
  label: u,
  helper: i,
  error: e,
  required: a,
  id: d,
  className: t,
  labelClassName: n,
  children: l
}) {
  const h = r.useId(), o = d ?? h, f = i ? o + "-helper" : void 0, p = e ? o + "-error" : void 0, x = [f, p].filter(Boolean).join(" ") || void 0, v = r.cloneElement(l, {
    id: o,
    "aria-invalid": e ? !0 : void 0,
    "aria-describedby": x
  });
  return /* @__PURE__ */ c("div", { className: m("flex flex-col gap-1.5", t), children: [
    /* @__PURE__ */ c(
      "label",
      {
        htmlFor: o,
        className: m("text-sm font-medium leading-none text-foreground", n),
        children: [
          u,
          a && /* @__PURE__ */ s("span", { className: "ml-0.5 text-destructive", "aria-hidden": "true", children: "*" })
        ]
      }
    ),
    v,
    i && !e && /* @__PURE__ */ s("p", { id: f, className: "text-xs text-muted-foreground", children: i }),
    e && /* @__PURE__ */ s("p", { id: p, role: "alert", className: "text-xs font-medium text-destructive", children: e })
  ] });
}
const F = r.forwardRef(
  function({ className: i, toggleLabel: e = { show: "Show password", hide: "Hide password" }, ...a }, d) {
    const [t, n] = r.useState(!1);
    return /* @__PURE__ */ c("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        b,
        {
          ref: d,
          type: t ? "text" : "password",
          className: m("pr-10", i),
          ...a
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => n((l) => !l),
          "aria-label": t ? e.hide : e.show,
          "aria-pressed": t,
          className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: t ? /* @__PURE__ */ s(N, { className: "size-4" }) : /* @__PURE__ */ s(g, { className: "size-4" })
        }
      )
    ] });
  }
);
export {
  j as FormField,
  F as PasswordInput
};
//# sourceMappingURL=form-field.js.map
