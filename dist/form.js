import { jsxs as k, jsx as i } from "react/jsx-runtime";
import * as M from "react";
import l, { forwardRef as G, useState as E, useCallback as Z } from "react";
import { S as Ie } from "./index-DFmzheZp.js";
import { c as O } from "./utils-D7gXXjDs.js";
import { Input as Se } from "./input.js";
import { Textarea as we } from "./textarea.js";
import { Button as Q } from "./button.js";
import { Label as K } from "./label.js";
import { Checkbox as Ae } from "./checkbox.js";
import { Select as Oe, SelectTrigger as Me, SelectValue as Pe, SelectContent as Re, SelectItem as ne } from "./select.js";
import { E as Te, a as De } from "./eye-BX4G2G-C.js";
import { c as me } from "./createLucideIcon-DKEW4wQE.js";
const z = me("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
const $e = me("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
var Be = (e) => e.type === "checkbox", Ue = (e) => e.type === "file", W = (e) => e instanceof Date, q = (e) => e == null;
const ge = (e) => typeof e == "object";
var D = (e) => !q(e) && !Array.isArray(e) && ge(e) && !W(e), oe = (e) => D(e) && e.target ? Be(e.target) ? e.target.checked : Ue(e.target) ? e.target.files : e.target.value : e, We = (e, s) => s.split(".").some((t, a, r) => !isNaN(Number(t)) && e.has(r.slice(0, a).join("."))), he = (e) => {
  const s = e.constructor && e.constructor.prototype;
  return D(s) && s.hasOwnProperty("isPrototypeOf");
}, pe = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function j(e) {
  if (e instanceof Date)
    return new Date(e);
  const s = typeof FileList < "u" && e instanceof FileList;
  if (pe && (e instanceof Blob || s))
    return e;
  const t = Array.isArray(e);
  if (!t && !(D(e) && he(e)))
    return e;
  const a = t ? [] : Object.create(Object.getPrototypeOf(e));
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (a[r] = j(e[r]));
  return a;
}
const le = {
  BLUR: "blur",
  CHANGE: "change"
}, ce = {
  all: "all"
}, ye = ["__proto__", "constructor", "prototype"], He = /^\w*$/;
var Ve = (e) => He.test(e), X = (e) => e === void 0;
const ze = /[.[\]'"]/;
var xe = (e) => e.split(ze).filter(Boolean), I = (e, s, t) => {
  if (!s || !D(e))
    return t;
  const a = Ve(s) ? [s] : xe(s);
  if (a.some((n) => ye.includes(n)))
    return t;
  const r = a.reduce((n, o) => q(n) ? void 0 : n[o], e);
  return X(r) || r === e ? X(e[s]) ? t : e[s] : r;
}, L = (e) => typeof e == "boolean", Y = (e) => typeof e == "function", ie = (e, s, t) => {
  let a = -1;
  const r = Ve(s) ? [s] : xe(s), n = r.length, o = n - 1;
  for (; ++a < n; ) {
    const c = r[a];
    let u = t;
    if (a !== o) {
      const g = e[c];
      u = D(g) || Array.isArray(g) ? g : isNaN(+r[a + 1]) ? {} : [];
    }
    if (ye.includes(c))
      return;
    e[c] = u, e = e[c];
  }
};
const ee = l.createContext(null);
ee.displayName = "HookFormControlContext";
const te = () => l.useContext(ee);
var Ge = (e, s, t, a = !0) => {
  const r = {};
  for (const n in e)
    Object.defineProperty(r, n, {
      get: () => {
        const o = n;
        return s._proxyFormState[o] !== ce.all && (s._proxyFormState[o] = !a || ce.all), t && (t[o] = !0), e[o];
      }
    });
  return r;
};
const be = pe ? l.useLayoutEffect : l.useEffect;
var ue = (e) => q(e) || !ge(e);
const de = (e, s) => s.length === 0 && !Array.isArray(e) && !he(e);
function H(e, s, t = /* @__PURE__ */ new WeakMap()) {
  if (e === s)
    return !0;
  if (ue(e) || ue(s))
    return Object.is(e, s);
  if (W(e) && W(s))
    return Object.is(e.getTime(), s.getTime());
  const a = Object.keys(e), r = Object.keys(s);
  if (a.length !== r.length)
    return !1;
  if (de(e, a) || de(s, r))
    return Object.is(e, s);
  if (!a.length && Array.isArray(e) !== Array.isArray(s))
    return !1;
  const n = t.get(e);
  if (n && n.has(s))
    return !0;
  if (n)
    n.add(s);
  else {
    const o = /* @__PURE__ */ new WeakSet();
    o.add(s), t.set(e, o);
  }
  for (const o of a) {
    const c = e[o];
    if (!(o in s))
      return !1;
    if (o !== "ref") {
      const u = s[o];
      if (W(c) && W(u) || (D(c) || Array.isArray(c)) && (D(u) || Array.isArray(u)) ? !H(c, u, t) : !Object.is(c, u))
        return !1;
    }
  }
  return !0;
}
function ve() {
  const e = l.useRef(!1), s = l.useRef(void 0), t = l.useCallback((r, n, o) => {
    if (r && e.current) {
      const c = n();
      H(s.current, c) || o(c);
    }
    e.current = !0;
  }, []), a = l.useCallback((r, n) => {
    r && (s.current = j(n()));
  }, []);
  return { resyncIfNeeded: t, snapshot: a };
}
function _e(e) {
  const s = te(), { control: t = s, disabled: a, name: r, exact: n } = e || {}, [o, c] = l.useState(() => ({
    ...t._formState,
    defaultValues: t._defaultValues
  })), u = l.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }), { resyncIfNeeded: g, snapshot: V } = ve();
  return be(() => {
    const m = () => ({
      ...t._formState,
      defaultValues: t._defaultValues
    });
    g(!a, m, c);
    const y = t._subscribe({
      name: r,
      formState: u.current,
      exact: n,
      callback: (v) => {
        !a && c({
          ...t._formState,
          ...v,
          defaultValues: t._defaultValues
        });
      }
    });
    return () => {
      y(), V(!a, m);
    };
  }, [r, a, n, g, V]), l.useEffect(() => {
    u.current.isValid && t._setValid(!0);
  }, [t]), l.useMemo(() => Ge(o, t, u.current, !1), [o, t]);
}
var Ke = (e) => typeof e == "string", fe = (e, s, t, a, r) => Ke(e) ? I(t, e, r) : Array.isArray(e) ? e.map((n) => I(t, n)) : t;
function Ye(e) {
  const s = te(), { control: t = s, name: a, defaultValue: r, disabled: n, exact: o, compute: c } = e || {}, u = l.useRef(r), g = l.useRef(c), V = l.useRef(void 0), m = l.useRef(t), y = l.useRef(a);
  g.current = c;
  const [v, C] = l.useState(() => {
    const _ = t._getWatch(a, u.current);
    return g.current ? g.current(_) : _;
  }), x = l.useCallback((_) => {
    const S = fe(a, t._names, _ || t._formValues, !1, u.current);
    return g.current ? g.current(S) : S;
  }, [t._formValues, t._names, a]), N = l.useCallback((_) => {
    if (!n) {
      const S = fe(a, t._names, _ || t._formValues, !1, u.current);
      if (g.current) {
        const R = g.current(S);
        H(R, V.current) || (C(R), V.current = R);
      } else
        C(S);
    }
  }, [t._formValues, t._names, n, a]), { resyncIfNeeded: h, snapshot: F } = ve(), p = l.useRef(N);
  p.current = N;
  const f = l.useRef(x);
  f.current = x, be(() => {
    m.current !== t || !H(y.current, a) ? (m.current = t, y.current = a, p.current()) : h(!n, () => f.current(), (S) => {
      C(S), V.current = S;
    });
    const _ = t._subscribe({
      name: a,
      formState: {
        values: !0
      },
      exact: o,
      callback: (S) => {
        p.current(S.values);
      }
    });
    return () => {
      _(), F(!n, () => f.current());
    };
  }, [t, o, a, n, h, F]), l.useEffect(() => t._removeUnmounted());
  const d = m.current !== t, b = y.current, P = l.useMemo(() => {
    if (n)
      return null;
    const _ = !d && !H(b, a);
    return d || _ ? x() : null;
  }, [n, d, a, b, x]);
  return P !== null ? P : v;
}
function Ze(e) {
  const s = te(), { name: t, disabled: a, control: r = s, shouldUnregister: n, defaultValue: o, exact: c = !0 } = e, u = We(r._names.array, t), g = l.useMemo(() => I(r._formValues, t, I(r._defaultValues, t, o)), [r, t, o]), V = Ye({
    control: r,
    name: t,
    defaultValue: g,
    exact: c
  }), m = _e({
    control: r,
    name: t,
    exact: c
  }), y = l.useRef(e), v = l.useRef(null), C = l.useRef(r.register(t, {
    ...e.rules,
    value: V,
    ...L(e.disabled) ? { disabled: e.disabled } : {}
  }));
  y.current = e;
  const x = l.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!I(m.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!I(m.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!I(m.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!I(m.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => I(m.errors, t)
    }
  }), [m, t]), N = l.useCallback((f) => {
    const d = oe(f);
    return I(r._fields, t) || (C.current = r.register(t, {
      ...y.current.rules,
      value: d
    })), C.current.onChange({
      target: {
        value: oe(f),
        name: t
      },
      type: le.CHANGE
    });
  }, [t, r]), h = l.useCallback(() => C.current.onBlur({
    target: {
      value: I(r._formValues, t),
      name: t
    },
    type: le.BLUR
  }), [t, r._formValues]), F = l.useCallback((f) => {
    f && (v.current = {
      focus: () => Y(f.focus) && f.focus(),
      select: () => Y(f.select) && f.select(),
      setCustomValidity: (b) => Y(f.setCustomValidity) && f.setCustomValidity(b),
      reportValidity: () => Y(f.reportValidity) && f.reportValidity()
    });
    const d = I(r._fields, t);
    d && d._f && f && (d._f.ref = v.current);
  }, [r._fields, t]), p = l.useMemo(() => ({
    name: t,
    value: V,
    ...L(a) || m.disabled ? { disabled: m.disabled || a } : {},
    onChange: N,
    onBlur: h,
    ref: F
  }), [t, a, m.disabled, N, h, F, V]);
  return l.useEffect(() => {
    const f = r._options.shouldUnregister || n;
    C.current = r.register(t, {
      ...y.current.rules,
      ...L(y.current.disabled) ? { disabled: y.current.disabled } : {}
    });
    const d = (b, P) => {
      const _ = I(r._fields, b);
      _ && _._f && (_._f.mount = P);
    };
    if (d(t, !0), f) {
      const b = j(I(n ? r._defaultValues : r._options.values || r._defaultValues, t, I(r._options.defaultValues, t, y.current.defaultValue)));
      ie(r._defaultValues, t, b), X(I(r._formValues, t)) && ie(r._formValues, t, b);
    }
    if (!u && r.register(t), v.current) {
      const b = I(r._fields, t);
      b && b._f && (b._f.ref = v.current);
    }
    return () => {
      (u ? f && !r._state.action : f) ? r.unregister(t) : d(t, !1);
    };
  }, [t, r, u, n]), l.useEffect(() => {
    r._setDisabledField({
      disabled: a,
      name: t
    });
  }, [a, t, r]), l.useMemo(() => ({
    field: p,
    formState: m,
    fieldState: x
  }), [p, m, x]);
}
const Je = (e) => e.render(Ze(e)), re = l.createContext(null);
re.displayName = "HookFormContext";
const Le = () => l.useContext(re), Qe = ({ children: e, watch: s, getValues: t, getFieldState: a, setError: r, clearErrors: n, setValue: o, setValues: c, trigger: u, formState: g, resetField: V, reset: m, resetDefaultValues: y, handleSubmit: v, unregister: C, control: x, register: N, setFocus: h, subscribe: F }) => {
  const p = l.useMemo(() => ({
    watch: s,
    getValues: t,
    getFieldState: a,
    setError: r,
    clearErrors: n,
    setValue: o,
    setValues: c,
    trigger: u,
    formState: g,
    resetField: V,
    reset: m,
    resetDefaultValues: y,
    handleSubmit: v,
    unregister: C,
    control: x,
    register: N,
    setFocus: h,
    subscribe: F
  }), [
    n,
    x,
    g,
    a,
    t,
    v,
    N,
    m,
    y,
    V,
    r,
    h,
    o,
    c,
    F,
    u,
    C,
    s
  ]);
  return l.createElement(
    re.Provider,
    { value: p },
    l.createElement(ee.Provider, { value: p.control }, e)
  );
}, Ce = (e, s) => {
  const [t, a] = E(e);
  return M.useEffect(() => {
    const r = setTimeout(() => a(e), s);
    return () => clearTimeout(r);
  }, [e, s]), t;
}, Xe = (e) => {
  if (!e) return { score: 0, label: "", color: "" };
  let s = 0;
  return e.length >= 8 && (s += 25), e.length >= 12 && (s += 25), /[a-z]/.test(e) && (s += 10), /[A-Z]/.test(e) && (s += 10), /\d/.test(e) && (s += 15), /[^a-zA-Z\d]/.test(e) && (s += 15), s < 30 ? { score: s, label: "Weak", color: "text-destructive" } : s < 60 ? { score: s, label: "Medium", color: "text-warning" } : { score: s, label: "Strong", color: "text-success" };
}, ht = Qe, Ne = M.createContext(
  {}
), pt = ({
  ...e
}) => /* @__PURE__ */ i(Ne.Provider, { value: { name: e.name }, children: /* @__PURE__ */ i(Je, { ...e }) }), J = () => {
  const e = M.useContext(Ne), s = M.useContext(Fe), { getFieldState: t } = Le(), a = _e({ name: e.name }), r = t(e.name, a);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: n } = s;
  return {
    id: n,
    name: e.name,
    formItemId: `${n}-form-item`,
    formDescriptionId: `${n}-form-item-description`,
    formMessageId: `${n}-form-item-message`,
    ...r
  };
}, Fe = M.createContext(
  {}
);
function yt({ className: e, ...s }) {
  const t = M.useId();
  return /* @__PURE__ */ i(Fe.Provider, { value: { id: t }, children: /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "form-item",
      className: O("grid gap-2", e),
      ...s
    }
  ) });
}
function Vt({
  className: e,
  ...s
}) {
  const { error: t, formItemId: a } = J();
  return /* @__PURE__ */ i(
    K,
    {
      "data-slot": "form-label",
      "data-error": !!t,
      className: O("data-[error=true]:text-destructive", e),
      htmlFor: a,
      ...s
    }
  );
}
function xt({ ...e }) {
  const { error: s, formItemId: t, formDescriptionId: a, formMessageId: r } = J();
  return /* @__PURE__ */ i(
    Ie,
    {
      "data-slot": "form-control",
      id: t,
      "aria-describedby": s ? `${a} ${r}` : `${a}`,
      "aria-invalid": !!s,
      ...e
    }
  );
}
function bt({ className: e, ...s }) {
  const { formDescriptionId: t } = J();
  return /* @__PURE__ */ i(
    "p",
    {
      "data-slot": "form-description",
      id: t,
      className: O("text-muted-foreground text-sm", e),
      ...s
    }
  );
}
function vt({ className: e, ...s }) {
  const { error: t, formMessageId: a } = J(), r = t ? String(t?.message ?? "") : s.children;
  return r ? /* @__PURE__ */ i(
    "p",
    {
      "data-slot": "form-message",
      id: a,
      className: O("text-destructive text-sm", e),
      ...s,
      children: r
    }
  ) : null;
}
const qe = G(({
  value: e = "",
  onChange: s,
  onFocus: t,
  onBlur: a,
  type: r = "text",
  required: n = !1,
  minLength: o,
  maxLength: c,
  pattern: u,
  label: g,
  placeholder: V,
  disabled: m = !1,
  showPasswordStrength: y = !1,
  showPasswordToggle: v = !0,
  className: C,
  ...x
}, N) => {
  const [h, F] = E(e), [p, f] = E(!1), [d, b] = E(!1), [P, _] = E(!0), [S, R] = E("");
  M.useEffect(() => {
    F(e || "");
  }, [e]);
  const $ = Ce(h, 300), B = Z((w) => n && !w.trim() ? { isValid: !1, message: "This field is required" } : !w.trim() && !n ? { isValid: !0, message: "" } : o && w.length < o ? { isValid: !1, message: `Minimum ${o} characters required` } : c && w.length > c ? { isValid: !1, message: `Maximum ${c} characters allowed` } : r === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(w) ? { isValid: !1, message: "Please enter a valid email address" } : r === "url" && !/^https?:\/\/.+\..+/.test(w) ? { isValid: !1, message: "Please enter a valid URL" } : r === "tel" && !/^[\+]?[1-9][\d]{0,15}$/.test(w) ? { isValid: !1, message: "Please enter a valid phone number" } : u && !new RegExp(u).test(w) ? { isValid: !1, message: "Please match the required format" } : { isValid: !0, message: "" }, [n, o, c, r, u]);
  M.useEffect(() => {
    if (d) {
      const w = B($);
      _(w.isValid), R(w.message);
    }
  }, [$, B, d]);
  const A = (w) => {
    const ae = w.target.value;
    F(ae), s?.(ae), d || b(!0);
  }, U = () => {
    b(!0);
    const w = B(h);
    _(w.isValid), R(w.message), a?.();
  }, ke = r === "password" && p ? "text" : r, se = d && !P, Ee = d && P && h, T = r === "password" && y ? Xe(h) : null;
  return /* @__PURE__ */ k("div", { className: "space-y-2", children: [
    g && /* @__PURE__ */ i(
      K,
      {
        className: O(
          "text-foreground",
          n && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: g
      }
    ),
    /* @__PURE__ */ k("div", { className: "relative", children: [
      /* @__PURE__ */ i(
        Se,
        {
          ...x,
          ref: N,
          type: ke,
          value: h,
          onChange: A,
          onBlur: U,
          onFocus: t,
          placeholder: V,
          disabled: m,
          className: O(
            "bg-background border-border text-foreground",
            se && "border-destructive focus:border-destructive",
            Ee && "border-success",
            r === "password" && v && "pr-10",
            C
          )
        }
      ),
      r === "password" && v && /* @__PURE__ */ i(
        Q,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
          onClick: () => f(!p),
          tabIndex: -1,
          children: p ? /* @__PURE__ */ i(Te, { className: "h-4 w-4" }) : /* @__PURE__ */ i(De, { className: "h-4 w-4" })
        }
      ),
      d && h && !v && /* @__PURE__ */ i("div", { className: "absolute right-3 top-2.5", children: P ? /* @__PURE__ */ i($e, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ i(z, { className: "h-4 w-4 text-destructive" }) })
    ] }),
    T && h && /* @__PURE__ */ k("div", { className: "space-y-1", children: [
      /* @__PURE__ */ k("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: "Password strength" }),
        /* @__PURE__ */ i("span", { className: T.color, children: T.label })
      ] }),
      /* @__PURE__ */ i("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ i(
        "div",
        {
          className: O(
            "h-1.5 rounded-full transition-all duration-300",
            T.score < 30 && "bg-destructive",
            T.score >= 30 && T.score < 60 && "bg-warning",
            T.score >= 60 && "bg-success"
          ),
          style: { width: `${T.score}%` }
        }
      ) })
    ] }),
    se && S && /* @__PURE__ */ k("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ i(z, { className: "h-3 w-3" }),
      S
    ] })
  ] });
});
qe.displayName = "ValidatedInput";
const je = G(({
  value: e = "",
  onChange: s,
  onFocus: t,
  onBlur: a,
  required: r = !1,
  minLength: n,
  maxLength: o,
  label: c,
  placeholder: u,
  disabled: g = !1,
  rows: V = 3,
  showCharCount: m = !0,
  className: y,
  ...v
}, C) => {
  const [x, N] = E(e), [h, F] = E(!1), [p, f] = E(!0), [d, b] = E("");
  M.useEffect(() => {
    N(e || "");
  }, [e]);
  const P = Ce(x, 300), _ = Z((A) => r && !A.trim() ? { isValid: !1, message: "This field is required" } : !A.trim() && !r ? { isValid: !0, message: "" } : n && A.length < n ? { isValid: !1, message: `Minimum ${n} characters required` } : o && A.length > o ? { isValid: !1, message: `Maximum ${o} characters allowed` } : { isValid: !0, message: "" }, [r, n, o]);
  M.useEffect(() => {
    if (h) {
      const A = _(P);
      f(A.isValid), b(A.message);
    }
  }, [P, _, h]);
  const S = (A) => {
    const U = A.target.value;
    o && U.length > o || (N(U), s?.(U), h || F(!0));
  }, R = () => {
    F(!0);
    const A = _(x);
    f(A.isValid), b(A.message), a?.();
  }, $ = h && !p, B = h && p && x;
  return /* @__PURE__ */ k("div", { className: "space-y-2", children: [
    c && /* @__PURE__ */ i(
      K,
      {
        className: O(
          "text-foreground",
          r && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: c
      }
    ),
    /* @__PURE__ */ i(
      we,
      {
        ...v,
        ref: C,
        value: x,
        onChange: S,
        onBlur: R,
        onFocus: t,
        placeholder: u,
        disabled: g,
        rows: V,
        className: O(
          "bg-background border-border text-foreground",
          $ && "border-destructive focus:border-destructive",
          B && "border-success",
          y
        )
      }
    ),
    m && o && /* @__PURE__ */ k("div", { className: "text-xs text-muted-foreground text-right", children: [
      x.length,
      " / ",
      o
    ] }),
    $ && d && /* @__PURE__ */ k("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ i(z, { className: "h-3 w-3" }),
      d
    ] })
  ] });
});
je.displayName = "ValidatedTextarea";
const et = G(({
  value: e = "",
  onChange: s,
  required: t = !1,
  disabled: a = !1,
  label: r,
  placeholder: n = "Select an option...",
  options: o,
  clearable: c = !1,
  className: u
}, g) => {
  const [V, m] = E(e), [y, v] = E(!1), [C, x] = E(!0), [N, h] = E("");
  M.useEffect(() => {
    m(e || "");
  }, [e]);
  const F = Z((d) => t && !d ? { isValid: !1, message: "Please select an option" } : { isValid: !0, message: "" }, [t]), p = (d) => {
    v(!0), m(d);
    const b = F(d);
    x(b.isValid), h(b.message), s?.(d);
  }, f = y && !C;
  return /* @__PURE__ */ k("div", { className: "space-y-2", ref: g, children: [
    r && /* @__PURE__ */ i(
      K,
      {
        className: O(
          "text-foreground",
          t && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: r
      }
    ),
    /* @__PURE__ */ k(
      Oe,
      {
        value: V,
        onValueChange: p,
        disabled: a,
        children: [
          /* @__PURE__ */ i(
            Me,
            {
              className: O(
                "bg-background border-border text-foreground",
                f && "border-destructive focus:border-destructive",
                u
              ),
              children: /* @__PURE__ */ i(Pe, { placeholder: n })
            }
          ),
          /* @__PURE__ */ k(Re, { className: "bg-popover border-border", children: [
            c && V && /* @__PURE__ */ i(ne, { value: "", className: "text-muted-foreground", children: "Clear selection" }),
            o.map((d) => /* @__PURE__ */ i(
              ne,
              {
                value: d.value,
                disabled: d.disabled,
                className: "text-foreground",
                children: d.label
              },
              d.value
            ))
          ] })
        ]
      }
    ),
    f && N && /* @__PURE__ */ k("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ i(z, { className: "h-3 w-3" }),
      N
    ] })
  ] });
});
et.displayName = "ValidatedSelect";
const tt = G(({
  checked: e = !1,
  onChange: s,
  required: t = !1,
  disabled: a = !1,
  label: r,
  description: n,
  className: o
}, c) => {
  const [u, g] = E(e), [V, m] = E(!1), [y, v] = E(!0), [C, x] = E("");
  M.useEffect(() => {
    g(e || !1);
  }, [e]);
  const N = Z((p) => t && !p ? { isValid: !1, message: "This field is required" } : { isValid: !0, message: "" }, [t]), h = (p) => {
    m(!0), g(p);
    const f = N(p);
    v(f.isValid), x(f.message), s?.(p);
  }, F = V && !y;
  return /* @__PURE__ */ k("div", { className: O("space-y-2", o), ref: c, children: [
    /* @__PURE__ */ k("div", { className: "flex items-start space-x-2", children: [
      /* @__PURE__ */ i(
        Ae,
        {
          checked: u,
          onCheckedChange: h,
          disabled: a,
          className: "mt-0.5"
        }
      ),
      /* @__PURE__ */ k("div", { className: "space-y-1 flex-1", children: [
        /* @__PURE__ */ i(
          K,
          {
            className: O(
              "text-sm font-medium leading-none text-foreground cursor-pointer",
              t && "after:content-['*'] after:ml-0.5 after:text-destructive"
            ),
            children: r
          }
        ),
        n && /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: n })
      ] })
    ] }),
    F && C && /* @__PURE__ */ k("div", { className: "flex items-center gap-1 text-sm text-destructive ml-6", children: [
      /* @__PURE__ */ i(z, { className: "h-3 w-3" }),
      C
    ] })
  ] });
});
tt.displayName = "ValidatedCheckbox";
const rt = G(({
  submitText: e = "Submit",
  cancelText: s = "Cancel",
  showCancel: t = !1,
  loading: a = !1,
  disabled: r = !1,
  onCancel: n,
  align: o = "right",
  className: c
}, u) => /* @__PURE__ */ k(
  "div",
  {
    ref: u,
    className: O(
      "flex gap-2",
      o === "left" && "justify-start",
      o === "center" && "justify-center",
      o === "right" && "justify-end",
      c
    ),
    children: [
      t && /* @__PURE__ */ i(
        Q,
        {
          type: "button",
          variant: "outline",
          onClick: n,
          disabled: a,
          className: "border-border",
          children: s
        }
      ),
      /* @__PURE__ */ i(
        Q,
        {
          type: "submit",
          disabled: a || r,
          className: "min-w-24 bg-primary text-primary-foreground",
          children: a ? /* @__PURE__ */ k("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
            "Loading..."
          ] }) : e
        }
      )
    ]
  }
));
rt.displayName = "FormActions";
export {
  ht as Form,
  rt as FormActions,
  xt as FormControl,
  bt as FormDescription,
  pt as FormField,
  yt as FormItem,
  Vt as FormLabel,
  vt as FormMessage,
  tt as ValidatedCheckbox,
  qe as ValidatedInput,
  et as ValidatedSelect,
  je as ValidatedTextarea,
  J as useFormField
};
//# sourceMappingURL=form.js.map
