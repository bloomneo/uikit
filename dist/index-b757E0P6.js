import * as r from "react";
import { jsx as R } from "react/jsx-runtime";
var N = Object.defineProperty, l = (e, t) => N(e, "name", { value: t, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function T(e, t) {
  const n = r.createContext(t);
  n.displayName = e + "Context";
  const a = /* @__PURE__ */ l((c) => {
    const { children: u, ...i } = c, s = r.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ R(n.Provider, { value: s, children: u });
  }, "Provider");
  a.displayName = e + "Provider";
  function o(c, u = {}) {
    const { optional: i = !1 } = u, s = r.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    if (!i)
      throw new Error(`\`${c}\` must be used within \`${e}\``);
  }
  return l(o, "useContext"), [a, o];
}
l(T, "createContext");
// @__NO_SIDE_EFFECTS__
function U(e, t = []) {
  let n = [];
  function a(c, u) {
    const i = r.createContext(u);
    i.displayName = c + "Context";
    const s = n.length;
    n = [...n, u];
    const p = /* @__PURE__ */ l((f) => {
      const { scope: E, children: m, ...C } = f, w = E?.[e]?.[s] || i, v = r.useMemo(() => C, Object.values(C));
      return /* @__PURE__ */ R(w.Provider, { value: v, children: m });
    }, "Provider");
    p.displayName = c + "Provider";
    function d(f, E, m = {}) {
      const { optional: C = !1 } = m, w = E?.[e]?.[s] || i, v = r.useContext(w);
      if (v) return v;
      if (u !== void 0) return u;
      if (!C)
        throw new Error(`\`${f}\` must be used within \`${c}\``);
    }
    return l(d, "useContext"), [p, d];
  }
  l(a, "createContext");
  const o = /* @__PURE__ */ l(() => {
    const c = n.map((u) => r.createContext(u));
    return /* @__PURE__ */ l(function(i) {
      const s = i?.[e] || c;
      return r.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: s } }),
        [i, s]
      );
    }, "useScope");
  }, "createScope");
  return o.scopeName = e, [a, O(o, ...t)];
}
l(U, "createContextScope");
function O(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = /* @__PURE__ */ l(() => {
    const a = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return /* @__PURE__ */ l(function(c) {
      const u = a.reduce((i, { useScope: s, scopeName: p }) => {
        const f = s(c)[`__scope${p}`];
        return { ...i, ...f };
      }, {});
      return r.useMemo(() => ({ [`__scope${t.scopeName}`]: u }), [u]);
    }, "useComposedScopes");
  }, "createScope");
  return n.scopeName = t.scopeName, n;
}
l(O, "composeContextScopes");
var H = Object.defineProperty, S = (e, t) => H(e, "name", { value: t, configurable: !0 }), $ = !!(typeof window < "u" && window.document && window.document.createElement);
function B(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return /* @__PURE__ */ S(function(o) {
    if (e?.(o), n === !1 || !o || !o.defaultPrevented)
      return t?.(o);
  }, "handleEvent");
}
S(B, "composeEventHandlers");
function L(e) {
  if (!$)
    throw new Error("Cannot access window outside of the DOM");
  return e?.ownerDocument?.defaultView ?? window;
}
S(L, "getOwnerWindow");
function _(e) {
  if (!$)
    throw new Error("Cannot access document outside of the DOM");
  return e?.ownerDocument ?? document;
}
S(_, "getOwnerDocument");
function M(e, t = !1) {
  const { activeElement: n } = _(e);
  if (!n?.nodeName)
    return null;
  if (j(n) && n.contentDocument)
    return M(n.contentDocument.body, t);
  if (t) {
    const a = n.getAttribute("aria-activedescendant");
    if (a) {
      const o = _(n).getElementById(a);
      if (o)
        return o;
    }
  }
  return n;
}
S(M, "getActiveElement");
function j(e) {
  return e.tagName === "IFRAME";
}
S(j, "isFrame");
var D = globalThis?.document ? r.useLayoutEffect : () => {
}, V = Object.defineProperty, W = (e, t) => V(e, "name", { value: t, configurable: !0 }), b = r[" useEffectEvent ".trim().toString()], P = r[" useInsertionEffect ".trim().toString()];
function A(e) {
  if (typeof b == "function")
    return b(e);
  const t = r.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof P == "function" ? P(() => {
    t.current = e;
  }) : D(() => {
    t.current = e;
  }), r.useMemo(() => ((...n) => t.current?.(...n)), []);
}
W(A, "useEffectEvent");
var Y = Object.defineProperty, x = (e, t) => Y(e, "name", { value: t, configurable: !0 }), X = r[" useInsertionEffect ".trim().toString()] || D;
function k({
  prop: e,
  defaultProp: t,
  onChange: n = /* @__PURE__ */ x(() => {
  }, "onChange"),
  caller: a
}) {
  const [o, c, u] = I({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, s = i ? e : o, p = r.useCallback(
    (d) => {
      if (i) {
        const f = F(d) ? d(e) : d;
        f !== e && u.current?.(f);
      } else
        c(d);
    },
    [i, e, c, u]
  );
  return [s, p];
}
x(k, "useControllableState");
function I({
  defaultProp: e,
  onChange: t
}) {
  const [n, a] = r.useState(e), o = r.useRef(n), c = r.useRef(t);
  return X(() => {
    c.current = t;
  }, [t]), r.useEffect(() => {
    o.current !== n && (c.current?.(n), o.current = n);
  }, [n, o]), [n, a, c];
}
x(I, "useUncontrolledState");
function F(e) {
  return typeof e == "function";
}
x(F, "isFunction");
var y = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function q(e, t, n, a) {
  const { prop: o, defaultProp: c, onChange: u, caller: i } = t, s = o !== void 0, p = A(u), d = [{ ...n, state: c }];
  a && d.push(a);
  const [f, E] = r.useReducer(
    (v, g) => {
      if (g.type === y)
        return { ...v, state: g.state };
      const h = e(v, g);
      return s && !Object.is(h.state, v.state) && p(h.state), h;
    },
    ...d
  ), m = f.state, C = r.useRef(m);
  r.useEffect(() => {
    C.current !== m && (C.current = m, s || p(m));
  }, [m, C, s]);
  const w = r.useMemo(() => o !== void 0 ? { ...f, state: o } : f, [f, o]);
  return r.useEffect(() => {
    s && !Object.is(o, f.state) && E({ type: y, state: o });
  }, [o, f.state, s]), [w, E];
}
x(q, "useControllableStateReducer");
export {
  B as a,
  k as b,
  U as c,
  D as u
};
//# sourceMappingURL=index-b757E0P6.js.map
