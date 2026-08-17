import * as a from "react";
var u = Object.defineProperty, f = (e, r) => u(e, "name", { value: r, configurable: !0 });
function c(e) {
  const r = a.useRef(e);
  return a.useEffect(() => {
    r.current = e;
  }), a.useMemo(() => ((...t) => r.current?.(...t)), []);
}
f(c, "useCallbackRef");
export {
  c as u
};
//# sourceMappingURL=index-CRNjeP0c.js.map
