import { jsxs as c, jsx as s } from "react/jsx-runtime";
import * as a from "react";
import { c as m } from "./utils-CwJPJKOE.js";
import { Input as b } from "./input.js";
import { warnInDev as w } from "./errors.js";
import { E as N, a as I } from "./eye-DDKoW0KS.js";
function z({
  label: u,
  helper: i,
  error: e,
  required: d,
  id: n,
  className: t,
  labelClassName: l,
  children: o
}) {
  o || w("FormField", "requires a child input element. Pass <Input />, <Textarea />, or <Combobox /> as children.", "form-field");
  const x = a.useId(), r = n ?? x, f = i ? r + "-helper" : void 0, p = e ? r + "-error" : void 0, h = [f, p].filter(Boolean).join(" ") || void 0, v = a.cloneElement(o, {
    id: r,
    "aria-invalid": e ? !0 : void 0,
    "aria-describedby": h
  });
  return /* @__PURE__ */ c("div", { className: m("flex flex-col gap-1.5", t), children: [
    /* @__PURE__ */ c(
      "label",
      {
        htmlFor: r,
        className: m("text-sm font-medium leading-none text-foreground", l),
        children: [
          u,
          d && /* @__PURE__ */ s("span", { className: "ml-0.5 text-destructive", "aria-hidden": "true", children: "*" })
        ]
      }
    ),
    v,
    i && !e && /* @__PURE__ */ s("p", { id: f, className: "text-xs text-muted-foreground", children: i }),
    e && /* @__PURE__ */ s("p", { id: p, role: "alert", className: "text-xs font-medium text-destructive", children: e })
  ] });
}
const g = a.forwardRef(
  function({ className: i, toggleLabel: e = { show: "Show password", hide: "Hide password" }, ...d }, n) {
    const [t, l] = a.useState(!1);
    return /* @__PURE__ */ c("div", { className: "relative", children: [
      /* @__PURE__ */ s(
        b,
        {
          ref: n,
          type: t ? "text" : "password",
          className: m("pr-10", i),
          ...d
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => l((o) => !o),
          "aria-label": t ? e.hide : e.show,
          "aria-pressed": t,
          className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          children: t ? /* @__PURE__ */ s(N, { className: "size-4" }) : /* @__PURE__ */ s(I, { className: "size-4" })
        }
      )
    ] });
  }
);
g.displayName = "PasswordInput";
export {
  z as FormField,
  g as PasswordInput
};
//# sourceMappingURL=form-field.js.map
