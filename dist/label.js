import { jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { P as i } from "./index-CpDnqHCm.js";
import { c as n } from "./utils-CwJPJKOE.js";
var s = "Label", o = l.forwardRef((t, a) => /* @__PURE__ */ r(
  i.label,
  {
    ...t,
    ref: a,
    onMouseDown: (e) => {
      e.target.closest("button, input, select, textarea") || (t.onMouseDown?.(e), !e.defaultPrevented && e.detail > 1 && e.preventDefault());
    }
  }
));
o.displayName = s;
var d = o;
function c({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ r(
    d,
    {
      "data-slot": "label",
      className: n(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        t
      ),
      ...a
    }
  );
}
export {
  c as Label
};
//# sourceMappingURL=label.js.map
