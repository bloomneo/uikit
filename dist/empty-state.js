import { jsxs as n, jsx as e } from "react/jsx-runtime";
import { c as a } from "./utils-CwJPJKOE.js";
import { requireProp as c } from "./errors.js";
const d = {
  sm: "py-6 gap-2",
  md: "py-12 gap-3",
  lg: "py-20 gap-4"
}, f = {
  sm: "size-8",
  md: "size-12",
  lg: "size-16"
};
function g({
  icon: t,
  title: s,
  description: r,
  action: m,
  size: l = "md",
  className: i,
  ...o
}) {
  return c("EmptyState", "title", s, 'Pass a short headline like "No invoices yet".'), /* @__PURE__ */ n(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: a(
        "flex flex-col items-center justify-center text-center",
        d[l],
        i
      ),
      ...o,
      children: [
        t && /* @__PURE__ */ e(
          "div",
          {
            className: a(
              "flex items-center justify-center text-muted-foreground [&>svg]:h-full [&>svg]:w-full",
              f[l]
            ),
            "aria-hidden": "true",
            children: t
          }
        ),
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-foreground", children: s }),
        r && /* @__PURE__ */ e("p", { className: "max-w-sm text-sm text-muted-foreground", children: r }),
        m && /* @__PURE__ */ e("div", { className: "mt-2", children: m })
      ]
    }
  );
}
export {
  g as EmptyState
};
//# sourceMappingURL=empty-state.js.map
