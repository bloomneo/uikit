import * as c from "react";
import * as f from "react-dom";
import { c as p } from "./index-DFmzheZp.js";
import { jsx as u } from "react/jsx-runtime";
var d = Object.defineProperty, v = (i, t) => d(i, "name", { value: t, configurable: !0 }), l = [
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
], w = l.reduce((i, t) => {
  const e = p(`Primitive.${t}`), r = c.forwardRef((o, a) => {
    const { asChild: s, ...m } = o, n = s ? e : t;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(n, { ...m, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...i, [t]: r };
}, {});
function h(i, t) {
  i && f.flushSync(() => i.dispatchEvent(t));
}
v(h, "dispatchDiscreteCustomEvent");
export {
  w as P,
  h as d
};
//# sourceMappingURL=index-rT3N9N4T.js.map
