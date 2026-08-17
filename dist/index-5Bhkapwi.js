import * as i from "react";
import { jsx as f, Fragment as g } from "react/jsx-runtime";
function d(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
function m(...e) {
  return (n) => {
    let r = !1;
    const o = e.map((t) => {
      const l = d(t, n);
      return !r && typeof l == "function" && (r = !0), l;
    });
    if (r)
      return () => {
        for (let t = 0; t < o.length; t++) {
          const l = o[t];
          typeof l == "function" ? l() : d(e[t], null);
        }
      };
  };
}
function x(...e) {
  return i.useCallback(m(...e), e);
}
// @__NO_SIDE_EFFECTS__
function C(e) {
  const n = /* @__PURE__ */ b(e), r = i.forwardRef((o, t) => {
    const { children: l, ...a } = o, s = i.Children.toArray(l), c = s.find(E);
    if (c) {
      const u = c.props.children, S = s.map((p) => p === c ? i.Children.count(u) > 1 ? i.Children.only(null) : i.isValidElement(u) ? u.props.children : null : p);
      return /* @__PURE__ */ f(n, { ...a, ref: t, children: i.isValidElement(u) ? i.cloneElement(u, void 0, S) : null });
    }
    return /* @__PURE__ */ f(n, { ...a, ref: t, children: l });
  });
  return r.displayName = `${e}.Slot`, r;
}
var I = /* @__PURE__ */ C("Slot");
// @__NO_SIDE_EFFECTS__
function b(e) {
  const n = i.forwardRef((r, o) => {
    const { children: t, ...l } = r;
    if (i.isValidElement(t)) {
      const a = h(t), s = R(l, t.props);
      return t.type !== i.Fragment && (s.ref = o ? m(o, a) : a), i.cloneElement(t, s);
    }
    return i.Children.count(t) > 1 ? i.Children.only(null) : null;
  });
  return n.displayName = `${e}.SlotClone`, n;
}
var y = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function V(e) {
  const n = ({ children: r }) => /* @__PURE__ */ f(g, { children: r });
  return n.displayName = `${e}.Slottable`, n.__radixId = y, n;
}
function E(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === y;
}
function R(e, n) {
  const r = { ...n };
  for (const o in n) {
    const t = e[o], l = n[o];
    /^on[A-Z]/.test(o) ? t && l ? r[o] = (...s) => {
      const c = l(...s);
      return t(...s), c;
    } : t && (r[o] = t) : o === "style" ? r[o] = { ...t, ...l } : o === "className" && (r[o] = [t, l].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function h(e) {
  let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = n && "isReactWarning" in n && n.isReactWarning;
  return r ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = n && "isReactWarning" in n && n.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
export {
  I as S,
  V as a,
  m as b,
  C as c,
  x as u
};
//# sourceMappingURL=index-5Bhkapwi.js.map
