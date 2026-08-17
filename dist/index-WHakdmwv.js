import * as c from "react";
import { jsx as x } from "react/jsx-runtime";
function R(e, s) {
  const t = c.createContext(s), i = (u) => {
    const { children: r, ...o } = u, l = c.useMemo(() => o, Object.values(o));
    return /* @__PURE__ */ x(t.Provider, { value: l, children: r });
  };
  i.displayName = e + "Provider";
  function n(u) {
    const r = c.useContext(t);
    if (r) return r;
    if (s !== void 0) return s;
    throw new Error(`\`${u}\` must be used within \`${e}\``);
  }
  return [i, n];
}
function g(e, s = []) {
  let t = [];
  function i(u, r) {
    const o = c.createContext(r), l = t.length;
    t = [...t, r];
    const d = (f) => {
      const { scope: m, children: p, ...v } = f, C = m?.[e]?.[l] || o, h = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ x(C.Provider, { value: h, children: p });
    };
    d.displayName = u + "Provider";
    function a(f, m) {
      const p = m?.[e]?.[l] || o, v = c.useContext(p);
      if (v) return v;
      if (r !== void 0) return r;
      throw new Error(`\`${f}\` must be used within \`${u}\``);
    }
    return [d, a];
  }
  const n = () => {
    const u = t.map((r) => c.createContext(r));
    return function(o) {
      const l = o?.[e] || u;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...o, [e]: l } }),
        [o, l]
      );
    };
  };
  return n.scopeName = e, [i, S(n, ...s)];
}
function S(...e) {
  const s = e[0];
  if (e.length === 1) return s;
  const t = () => {
    const i = e.map((n) => ({
      useScope: n(),
      scopeName: n.scopeName
    }));
    return function(u) {
      const r = i.reduce((o, { useScope: l, scopeName: d }) => {
        const f = l(u)[`__scope${d}`];
        return { ...o, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${s.scopeName}`]: r }), [r]);
    };
  };
  return t.scopeName = s.scopeName, t;
}
function _(e, s, { checkForDefaultPrevented: t = !0 } = {}) {
  return function(n) {
    if (e?.(n), t === !1 || !n.defaultPrevented)
      return s?.(n);
  };
}
var P = globalThis?.document ? c.useLayoutEffect : () => {
}, b = c[" useInsertionEffect ".trim().toString()] || P;
function y({
  prop: e,
  defaultProp: s,
  onChange: t = () => {
  },
  caller: i
}) {
  const [n, u, r] = w({
    defaultProp: s,
    onChange: t
  }), o = e !== void 0, l = o ? e : n;
  {
    const a = c.useRef(e !== void 0);
    c.useEffect(() => {
      const f = a.current;
      f !== o && console.warn(
        `${i} is changing from ${f ? "controlled" : "uncontrolled"} to ${o ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), a.current = o;
    }, [o, i]);
  }
  const d = c.useCallback(
    (a) => {
      if (o) {
        const f = E(a) ? a(e) : a;
        f !== e && r.current?.(f);
      } else
        u(a);
    },
    [o, e, u, r]
  );
  return [l, d];
}
function w({
  defaultProp: e,
  onChange: s
}) {
  const [t, i] = c.useState(e), n = c.useRef(t), u = c.useRef(s);
  return b(() => {
    u.current = s;
  }, [s]), c.useEffect(() => {
    n.current !== t && (u.current?.(t), n.current = t);
  }, [t, n]), [t, i, u];
}
function E(e) {
  return typeof e == "function";
}
export {
  _ as a,
  P as b,
  g as c,
  R as d,
  y as u
};
//# sourceMappingURL=index-WHakdmwv.js.map
