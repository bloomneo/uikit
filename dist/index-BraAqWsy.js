import * as t from "react";
import { u } from "./index-b757E0P6.js";
var f = Object.defineProperty, n = (e, r) => f(e, "name", { value: r, configurable: !0 }), s = t[" useId ".trim().toString()] || (() => {
}), c = 0;
function d(e) {
  const [r, a] = t.useState(s());
  return u(() => {
    e || a((o) => o ?? String(c++));
  }, [e]), e || (r ? `radix-${r}` : "");
}
n(d, "useId");
export {
  d as u
};
//# sourceMappingURL=index-BraAqWsy.js.map
