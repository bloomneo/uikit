import * as c from "react";
import * as f from "react-dom";
import { c as p } from "./index-5Bhkapwi.js";
import { jsx as l } from "react/jsx-runtime";
var u = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], h = u.reduce((t, i) => {
  const o = p(`Primitive.${i}`), r = c.forwardRef((e, s) => {
    const { asChild: a, ...m } = e, n = a ? o : i;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(n, { ...m, ref: s });
  });
  return r.displayName = `Primitive.${i}`, { ...t, [i]: r };
}, {});
function w(t, i) {
  t && f.flushSync(() => t.dispatchEvent(i));
}
export {
  h as P,
  w as d
};
//# sourceMappingURL=index-CpDnqHCm.js.map
