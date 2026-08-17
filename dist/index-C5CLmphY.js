import * as A from "react";
import r from "react";
import { c as D } from "./index-WHakdmwv.js";
import { u as S, c as M } from "./index-5Bhkapwi.js";
import { jsx as d } from "react/jsx-runtime";
function b(l) {
  const i = l + "CollectionProvider", [N, _] = D(i), [v, f] = N(
    i,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), p = (c) => {
    const { scope: e, children: s } = c, t = r.useRef(null), o = r.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ d(v, { scope: e, itemMap: o, collectionRef: t, children: s });
  };
  p.displayName = i;
  const m = l + "CollectionSlot", E = M(m), C = r.forwardRef(
    (c, e) => {
      const { scope: s, children: t } = c, o = f(m, s), n = S(e, o.collectionRef);
      return /* @__PURE__ */ d(E, { ref: n, children: t });
    }
  );
  C.displayName = m;
  const u = l + "CollectionItemSlot", R = "data-radix-collection-item", T = M(u), I = r.forwardRef(
    (c, e) => {
      const { scope: s, children: t, ...o } = c, n = r.useRef(null), x = S(e, n), a = f(u, s);
      return r.useEffect(() => (a.itemMap.set(n, { ref: n, ...o }), () => void a.itemMap.delete(n))), /* @__PURE__ */ d(T, { [R]: "", ref: x, children: t });
    }
  );
  I.displayName = u;
  function O(c) {
    const e = f(l + "CollectionConsumer", c);
    return r.useCallback(() => {
      const t = e.collectionRef.current;
      if (!t) return [];
      const o = Array.from(t.querySelectorAll(`[${R}]`));
      return Array.from(e.itemMap.values()).sort(
        (a, y) => o.indexOf(a.ref.current) - o.indexOf(y.ref.current)
      );
    }, [e.collectionRef, e.itemMap]);
  }
  return [
    { Provider: p, Slot: C, ItemSlot: I },
    O,
    _
  ];
}
var P = A.createContext(void 0);
function j(l) {
  const i = A.useContext(P);
  return l || i || "ltr";
}
export {
  b as c,
  j as u
};
//# sourceMappingURL=index-C5CLmphY.js.map
