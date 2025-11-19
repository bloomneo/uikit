import { jsx as f } from "react/jsx-runtime";
import { forwardRef as l } from "react";
import { c } from "./index-Bke1qZdk.js";
import { c as m } from "./utils-CwJPJKOE.js";
const p = c(
  "w-full",
  {
    variants: {
      tone: {
        clean: "",
        subtle: "bg-muted/5",
        brand: "bg-primary/5",
        contrast: "bg-zinc-900"
      }
    },
    defaultVariants: {
      tone: "clean"
    }
  }
), d = l(({
  edges: a = ["top", "bottom", "left", "right"],
  tone: r = "clean",
  useMargin: n = !1,
  className: o,
  children: i
}, s) => {
  const t = {}, e = n ? "margin" : "padding";
  return a.includes("top") && (t[`${e}Top`] = "env(safe-area-inset-top)"), a.includes("bottom") && (t[`${e}Bottom`] = "env(safe-area-inset-bottom)"), a.includes("left") && (t[`${e}Left`] = "env(safe-area-inset-left)"), a.includes("right") && (t[`${e}Right`] = "env(safe-area-inset-right)"), /* @__PURE__ */ f(
    "div",
    {
      ref: s,
      className: m(p({ tone: r }), o),
      style: t,
      children: i
    }
  );
});
d.displayName = "SafeArea";
export {
  d as SafeArea
};
//# sourceMappingURL=safe-area.js.map
