import * as i from "react";
var L = Object.defineProperty, b = (e, t) => L(e, "name", { value: t, configurable: !0 });
function y(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
b(y, "setRef");
function g(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const a = y(o, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const a = n[o];
          typeof a == "function" ? a() : y(e[o], null);
        }
      };
  };
}
b(g, "composeRefs");
function _(...e) {
  return i.useCallback(g(...e), e);
}
b(_, "useComposedRefs");
var O = Object.defineProperty, s = (e, t) => O(e, "name", { value: t, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function R(e) {
  const t = i.forwardRef((r, n) => {
    let { children: o, ...a } = r, l = null, c = !1;
    const f = [];
    S(o) && typeof d == "function" && (o = d(o._payload)), i.Children.forEach(o, (m) => {
      if ($(m)) {
        c = !0;
        const p = m;
        let u = "child" in p.props ? p.props.child : p.props.children;
        S(u) && typeof d == "function" && (u = d(u._payload)), l = V(p, u), f.push(l?.props?.children);
      } else
        f.push(m);
    }), l ? l = i.cloneElement(l, void 0, f) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(o) === 1 && i.isValidElement(o) && (l = o)
    );
    const E = l ? C(l) : void 0, x = _(n, E);
    if (!l) {
      if (o || o === 0)
        throw new Error(
          c ? A(e) : W(e)
        );
      return o;
    }
    const h = P(a, l.props ?? {});
    return l.type !== i.Fragment && (h.ref = n ? x : E), i.cloneElement(l, h);
  });
  return t.displayName = `${e}.Slot`, t;
}
s(R, "createSlot");
var F = /* @__PURE__ */ R("Slot"), v = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function I(e) {
  const t = /* @__PURE__ */ s((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = v, t;
}
s(I, "createSlottable");
var V = /* @__PURE__ */ s((e, t) => {
  if ("child" in e.props) {
    const r = e.props.child;
    return i.isValidElement(r) ? i.cloneElement(r, void 0, e.props.children(r.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function P(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? o && a ? r[n] = (...c) => {
      const f = a(...c);
      return o(...c), f;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...a } : n === "className" && (r[n] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
s(P, "mergeProps");
function C(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
s(C, "getElementRef");
function $(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === v;
}
s($, "isSlottable");
var T = /* @__PURE__ */ Symbol.for("react.lazy");
function S(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === T && "_payload" in e && j(e._payload);
}
s(S, "isLazyComponent");
function j(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
s(j, "isPromiseLike");
var W = /* @__PURE__ */ s((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), A = /* @__PURE__ */ s((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), d = i[" use ".trim().toString()];
export {
  F as S,
  I as a,
  g as b,
  R as c,
  _ as u
};
//# sourceMappingURL=index-DFmzheZp.js.map
