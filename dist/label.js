import { jsx as r } from "react/jsx-runtime";
import * as n from "react";
import { P as i } from "./index-rT3N9N4T.js";
import { c as l } from "./utils-D7gXXjDs.js";
var s = Object.defineProperty, d = (a, e) => s(a, "name", { value: e, configurable: !0 }), u = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function(e, o) {
    return /* @__PURE__ */ r(
      i.label,
      {
        ...e,
        ref: o,
        onMouseDown: (t) => {
          t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        }
      }
    );
  }, "Label")
), f = u;
function g({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ r(
    f,
    {
      "data-slot": "label",
      className: l(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        a
      ),
      ...e
    }
  );
}
export {
  g as Label
};
//# sourceMappingURL=label.js.map
