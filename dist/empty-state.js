import { jsxs as d, jsx as e } from "react/jsx-runtime";
import { c as m } from "./utils-CwJPJKOE.js";
const n = {
  sm: "py-6 gap-2",
  md: "py-12 gap-3",
  lg: "py-20 gap-4"
}, o = {
  sm: "size-8",
  md: "size-12",
  lg: "size-16"
};
function x({
  icon: t,
  title: a,
  description: s,
  action: r,
  size: l = "md",
  className: i,
  ...c
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: m(
        "flex flex-col items-center justify-center text-center",
        n[l],
        i
      ),
      ...c,
      children: [
        t && /* @__PURE__ */ e(
          "div",
          {
            className: m(
              "flex items-center justify-center text-muted-foreground [&>svg]:h-full [&>svg]:w-full",
              o[l]
            ),
            "aria-hidden": "true",
            children: t
          }
        ),
        /* @__PURE__ */ e("h3", { className: "text-base font-semibold text-foreground", children: a }),
        s && /* @__PURE__ */ e("p", { className: "max-w-sm text-sm text-muted-foreground", children: s }),
        r && /* @__PURE__ */ e("div", { className: "mt-2", children: r })
      ]
    }
  );
}
export {
  x as EmptyState
};
//# sourceMappingURL=empty-state.js.map
