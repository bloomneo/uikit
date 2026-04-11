import { jsxs as b, jsx as l } from "react/jsx-runtime";
import * as M from "react";
import c, { forwardRef as W, useState as p, useCallback as Z } from "react";
import { S as Ve } from "./index-DQH6odE9.js";
import { c as _ } from "./utils-CwJPJKOE.js";
import { Input as xe } from "./input.js";
import { Textarea as ve } from "./textarea.js";
import { Button as X } from "./button.js";
import { Label as H } from "./label.js";
import { Checkbox as Ne } from "./checkbox.js";
import { Select as Ce, SelectTrigger as Fe, SelectValue as Se, SelectContent as ke, SelectItem as te } from "./select.js";
import { E as _e, a as Ee } from "./eye-DDKoW0KS.js";
import { c as ne } from "./createLucideIcon-B45kRl5r.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U = ne("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = ne("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
var we = (e) => e.type === "checkbox", R = (e) => e instanceof Date, L = (e) => e == null;
const le = (e) => typeof e == "object";
var P = (e) => !L(e) && !Array.isArray(e) && le(e) && !R(e), Me = (e) => P(e) && e.target ? we(e.target) ? e.target.checked : e.target.value : e, Ae = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, Pe = (e, r) => e.has(Ae(r)), Te = (e) => {
  const r = e.constructor && e.constructor.prototype;
  return P(r) && r.hasOwnProperty("isPrototypeOf");
}, Oe = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function ie(e) {
  let r;
  const t = Array.isArray(e), a = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    r = new Date(e);
  else if (!(Oe && (e instanceof Blob || a)) && (t || P(e)))
    if (r = t ? [] : Object.create(Object.getPrototypeOf(e)), !t && !Te(e))
      r = e;
    else
      for (const s in e)
        e.hasOwnProperty(s) && (r[s] = ie(e[s]));
  else
    return e;
  return r;
}
var ce = (e) => /^\w*$/.test(e), Y = (e) => e === void 0, De = (e) => Array.isArray(e) ? e.filter(Boolean) : [], ue = (e) => De(e.replace(/["|']|\]/g, "").split(/\.|\[/)), k = (e, r, t) => {
  if (!r || !P(e))
    return t;
  const a = (ce(r) ? [r] : ue(r)).reduce((s, o) => L(s) ? s : s[o], e);
  return Y(a) || a === e ? Y(e[r]) ? t : e[r] : a;
}, Q = (e) => typeof e == "boolean", re = (e, r, t) => {
  let a = -1;
  const s = ce(r) ? [r] : ue(r), o = s.length, n = o - 1;
  for (; ++a < o; ) {
    const i = s[a];
    let d = t;
    if (a !== n) {
      const u = e[i];
      d = P(u) || Array.isArray(u) ? u : isNaN(+s[a + 1]) ? {} : [];
    }
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return;
    e[i] = d, e = e[i];
  }
};
const se = {
  BLUR: "blur",
  CHANGE: "change"
}, ae = {
  all: "all"
}, q = c.createContext(null);
q.displayName = "HookFormContext";
const K = () => c.useContext(q), $e = (e) => {
  const { children: r, ...t } = e;
  return c.createElement(q.Provider, { value: t }, r);
};
var Be = (e, r, t, a = !0) => {
  const s = {
    defaultValues: r._defaultValues
  };
  for (const o in e)
    Object.defineProperty(s, o, {
      get: () => {
        const n = o;
        return r._proxyFormState[n] !== ae.all && (r._proxyFormState[n] = !a || ae.all), t && (t[n] = !0), e[n];
      }
    });
  return s;
};
const de = typeof window < "u" ? c.useLayoutEffect : c.useEffect;
function fe(e) {
  const r = K(), { control: t = r.control, disabled: a, name: s, exact: o } = e || {}, [n, i] = c.useState(t._formState), d = c.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return de(() => t._subscribe({
    name: s,
    formState: d.current,
    exact: o,
    callback: (u) => {
      !a && i({
        ...t._formState,
        ...u
      });
    }
  }), [s, a, o]), c.useEffect(() => {
    d.current.isValid && t._setValid(!0);
  }, [t]), c.useMemo(() => Be(n, t, d.current, !1), [n, t]);
}
var Re = (e) => typeof e == "string", Ue = (e, r, t, a, s) => Re(e) ? k(t, e, s) : Array.isArray(e) ? e.map((o) => k(t, o)) : t, oe = (e) => L(e) || !le(e);
function me(e, r, t = /* @__PURE__ */ new WeakSet()) {
  if (oe(e) || oe(r))
    return e === r;
  if (R(e) && R(r))
    return e.getTime() === r.getTime();
  const a = Object.keys(e), s = Object.keys(r);
  if (a.length !== s.length)
    return !1;
  if (t.has(e) || t.has(r))
    return !0;
  t.add(e), t.add(r);
  for (const o of a) {
    const n = e[o];
    if (!s.includes(o))
      return !1;
    if (o !== "ref") {
      const i = r[o];
      if (R(n) && R(i) || P(n) && P(i) || Array.isArray(n) && Array.isArray(i) ? !me(n, i, t) : n !== i)
        return !1;
    }
  }
  return !0;
}
function We(e) {
  const r = K(), { control: t = r.control, name: a, defaultValue: s, disabled: o, exact: n, compute: i } = e || {}, d = c.useRef(s), u = c.useRef(i), f = c.useRef(void 0);
  u.current = i;
  const v = c.useMemo(() => t._getWatch(a, d.current), [t, a]), [I, F] = c.useState(u.current ? u.current(v) : v);
  return de(() => t._subscribe({
    name: a,
    formState: {
      values: !0
    },
    exact: n,
    callback: (E) => {
      if (!o) {
        const V = Ue(a, t._names, E.values || t._formValues, !1, d.current);
        if (u.current) {
          const N = u.current(V);
          me(N, f.current) || (F(N), f.current = N);
        } else
          F(V);
      }
    }
  }), [t, o, a, n]), c.useEffect(() => t._removeUnmounted()), I;
}
function He(e) {
  const r = K(), { name: t, disabled: a, control: s = r.control, shouldUnregister: o, defaultValue: n } = e, i = Pe(s._names.array, t), d = c.useMemo(() => k(s._formValues, t, k(s._defaultValues, t, n)), [s, t, n]), u = We({
    control: s,
    name: t,
    defaultValue: d,
    exact: !0
  }), f = fe({
    control: s,
    name: t,
    exact: !0
  }), v = c.useRef(e), I = c.useRef(s.register(t, {
    ...e.rules,
    value: u,
    ...Q(e.disabled) ? { disabled: e.disabled } : {}
  }));
  v.current = e;
  const F = c.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!k(f.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!k(f.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!k(f.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!k(f.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => k(f.errors, t)
    }
  }), [f, t]), E = c.useCallback((m) => I.current.onChange({
    target: {
      value: Me(m),
      name: t
    },
    type: se.CHANGE
  }), [t]), V = c.useCallback(() => I.current.onBlur({
    target: {
      value: k(s._formValues, t),
      name: t
    },
    type: se.BLUR
  }), [t, s._formValues]), N = c.useCallback((m) => {
    const y = k(s._fields, t);
    y && m && (y._f.ref = {
      focus: () => m.focus && m.focus(),
      select: () => m.select && m.select(),
      setCustomValidity: (x) => m.setCustomValidity(x),
      reportValidity: () => m.reportValidity()
    });
  }, [s._fields, t]), h = c.useMemo(() => ({
    name: t,
    value: u,
    ...Q(a) || f.disabled ? { disabled: f.disabled || a } : {},
    onChange: E,
    onBlur: V,
    ref: N
  }), [t, a, f.disabled, E, V, N, u]);
  return c.useEffect(() => {
    const m = s._options.shouldUnregister || o;
    s.register(t, {
      ...v.current.rules,
      ...Q(v.current.disabled) ? { disabled: v.current.disabled } : {}
    });
    const y = (x, g) => {
      const w = k(s._fields, x);
      w && w._f && (w._f.mount = g);
    };
    if (y(t, !0), m) {
      const x = ie(k(s._options.defaultValues, t));
      re(s._defaultValues, t, x), Y(k(s._formValues, t)) && re(s._formValues, t, x);
    }
    return !i && s.register(t), () => {
      (i ? m && !s._state.action : m) ? s.unregister(t) : y(t, !1);
    };
  }, [t, s, i, o]), c.useEffect(() => {
    s._setDisabledField({
      disabled: a,
      name: t
    });
  }, [a, t, s]), c.useMemo(() => ({
    field: h,
    formState: f,
    fieldState: F
  }), [h, f, F]);
}
const ze = (e) => e.render(He(e)), ge = (e, r) => {
  const [t, a] = p(e);
  return M.useEffect(() => {
    const s = setTimeout(() => a(e), r);
    return () => clearTimeout(s);
  }, [e, r]), t;
}, Ge = (e) => {
  if (!e) return { score: 0, label: "", color: "" };
  let r = 0;
  return e.length >= 8 && (r += 25), e.length >= 12 && (r += 25), /[a-z]/.test(e) && (r += 10), /[A-Z]/.test(e) && (r += 10), /\d/.test(e) && (r += 15), /[^a-zA-Z\d]/.test(e) && (r += 15), r < 30 ? { score: r, label: "Weak", color: "text-destructive" } : r < 60 ? { score: r, label: "Medium", color: "text-orange-600" } : { score: r, label: "Strong", color: "text-green-600" };
}, it = $e, he = M.createContext(
  {}
), ct = ({
  ...e
}) => /* @__PURE__ */ l(he.Provider, { value: { name: e.name }, children: /* @__PURE__ */ l(ze, { ...e }) }), J = () => {
  const e = M.useContext(he), r = M.useContext(ye), { getFieldState: t } = K(), a = fe({ name: e.name }), s = t(e.name, a);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: o } = r;
  return {
    id: o,
    name: e.name,
    formItemId: `${o}-form-item`,
    formDescriptionId: `${o}-form-item-description`,
    formMessageId: `${o}-form-item-message`,
    ...s
  };
}, ye = M.createContext(
  {}
);
function ut({ className: e, ...r }) {
  const t = M.useId();
  return /* @__PURE__ */ l(ye.Provider, { value: { id: t }, children: /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "form-item",
      className: _("grid gap-2", e),
      ...r
    }
  ) });
}
function dt({
  className: e,
  ...r
}) {
  const { error: t, formItemId: a } = J();
  return /* @__PURE__ */ l(
    H,
    {
      "data-slot": "form-label",
      "data-error": !!t,
      className: _("data-[error=true]:text-destructive", e),
      htmlFor: a,
      ...r
    }
  );
}
function ft({ ...e }) {
  const { error: r, formItemId: t, formDescriptionId: a, formMessageId: s } = J();
  return /* @__PURE__ */ l(
    Ve,
    {
      "data-slot": "form-control",
      id: t,
      "aria-describedby": r ? `${a} ${s}` : `${a}`,
      "aria-invalid": !!r,
      ...e
    }
  );
}
function mt({ className: e, ...r }) {
  const { formDescriptionId: t } = J();
  return /* @__PURE__ */ l(
    "p",
    {
      "data-slot": "form-description",
      id: t,
      className: _("text-muted-foreground text-sm", e),
      ...r
    }
  );
}
function gt({ className: e, ...r }) {
  const { error: t, formMessageId: a } = J(), s = t ? String(t?.message ?? "") : r.children;
  return s ? /* @__PURE__ */ l(
    "p",
    {
      "data-slot": "form-message",
      id: a,
      className: _("text-destructive text-sm", e),
      ...r,
      children: s
    }
  ) : null;
}
const Ze = W(({
  value: e = "",
  onChange: r,
  onFocus: t,
  onBlur: a,
  type: s = "text",
  required: o = !1,
  minLength: n,
  maxLength: i,
  pattern: d,
  label: u,
  placeholder: f,
  disabled: v = !1,
  showPasswordStrength: I = !1,
  showPasswordToggle: F = !0,
  className: E,
  ...V
}, N) => {
  const [h, m] = p(e), [y, x] = p(!1), [g, w] = p(!1), [T, O] = p(!0), [z, G] = p("");
  M.useEffect(() => {
    m(e || "");
  }, [e]);
  const D = ge(h, 300), $ = Z((C) => o && !C.trim() ? { isValid: !1, message: "This field is required" } : !C.trim() && !o ? { isValid: !0, message: "" } : n && C.length < n ? { isValid: !1, message: `Minimum ${n} characters required` } : i && C.length > i ? { isValid: !1, message: `Maximum ${i} characters allowed` } : s === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(C) ? { isValid: !1, message: "Please enter a valid email address" } : s === "url" && !/^https?:\/\/.+\..+/.test(C) ? { isValid: !1, message: "Please enter a valid URL" } : s === "tel" && !/^[\+]?[1-9][\d]{0,15}$/.test(C) ? { isValid: !1, message: "Please enter a valid phone number" } : d && !new RegExp(d).test(C) ? { isValid: !1, message: "Please match the required format" } : { isValid: !0, message: "" }, [o, n, i, s, d]);
  M.useEffect(() => {
    if (g) {
      const C = $(D);
      O(C.isValid), G(C.message);
    }
  }, [D, $, g]);
  const S = (C) => {
    const ee = C.target.value;
    m(ee), r?.(ee), g || w(!0);
  }, B = () => {
    w(!0);
    const C = $(h);
    O(C.isValid), G(C.message), a?.();
  }, be = s === "password" && y ? "text" : s, j = g && !T, pe = g && T && h, A = s === "password" && I ? Ge(h) : null;
  return /* @__PURE__ */ b("div", { className: "space-y-2", children: [
    u && /* @__PURE__ */ l(
      H,
      {
        className: _(
          "text-foreground",
          o && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: u
      }
    ),
    /* @__PURE__ */ b("div", { className: "relative", children: [
      /* @__PURE__ */ l(
        xe,
        {
          ...V,
          ref: N,
          type: be,
          value: h,
          onChange: S,
          onBlur: B,
          onFocus: t,
          placeholder: f,
          disabled: v,
          className: _(
            "bg-background border-border text-foreground",
            j && "border-destructive focus:border-destructive",
            pe && "border-green-500",
            s === "password" && F && "pr-10",
            E
          )
        }
      ),
      s === "password" && F && /* @__PURE__ */ l(
        X,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent",
          onClick: () => x(!y),
          tabIndex: -1,
          children: y ? /* @__PURE__ */ l(_e, { className: "h-4 w-4" }) : /* @__PURE__ */ l(Ee, { className: "h-4 w-4" })
        }
      ),
      g && h && !F && /* @__PURE__ */ l("div", { className: "absolute right-3 top-2.5", children: T ? /* @__PURE__ */ l(Ie, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ l(U, { className: "h-4 w-4 text-destructive" }) })
    ] }),
    A && h && /* @__PURE__ */ b("div", { className: "space-y-1", children: [
      /* @__PURE__ */ b("div", { className: "flex justify-between text-xs", children: [
        /* @__PURE__ */ l("span", { className: "text-muted-foreground", children: "Password strength" }),
        /* @__PURE__ */ l("span", { className: A.color, children: A.label })
      ] }),
      /* @__PURE__ */ l("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ l(
        "div",
        {
          className: _(
            "h-1.5 rounded-full transition-all duration-300",
            A.score < 30 && "bg-destructive",
            A.score >= 30 && A.score < 60 && "bg-orange-500",
            A.score >= 60 && "bg-green-500"
          ),
          style: { width: `${A.score}%` }
        }
      ) })
    ] }),
    j && z && /* @__PURE__ */ b("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ l(U, { className: "h-3 w-3" }),
      z
    ] })
  ] });
});
Ze.displayName = "ValidatedInput";
const Ke = W(({
  value: e = "",
  onChange: r,
  onFocus: t,
  onBlur: a,
  required: s = !1,
  minLength: o,
  maxLength: n,
  label: i,
  placeholder: d,
  disabled: u = !1,
  rows: f = 3,
  showCharCount: v = !0,
  className: I,
  ...F
}, E) => {
  const [V, N] = p(e), [h, m] = p(!1), [y, x] = p(!0), [g, w] = p("");
  M.useEffect(() => {
    N(e || "");
  }, [e]);
  const T = ge(V, 300), O = Z((S) => s && !S.trim() ? { isValid: !1, message: "This field is required" } : !S.trim() && !s ? { isValid: !0, message: "" } : o && S.length < o ? { isValid: !1, message: `Minimum ${o} characters required` } : n && S.length > n ? { isValid: !1, message: `Maximum ${n} characters allowed` } : { isValid: !0, message: "" }, [s, o, n]);
  M.useEffect(() => {
    if (h) {
      const S = O(T);
      x(S.isValid), w(S.message);
    }
  }, [T, O, h]);
  const z = (S) => {
    const B = S.target.value;
    n && B.length > n || (N(B), r?.(B), h || m(!0));
  }, G = () => {
    m(!0);
    const S = O(V);
    x(S.isValid), w(S.message), a?.();
  }, D = h && !y, $ = h && y && V;
  return /* @__PURE__ */ b("div", { className: "space-y-2", children: [
    i && /* @__PURE__ */ l(
      H,
      {
        className: _(
          "text-foreground",
          s && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: i
      }
    ),
    /* @__PURE__ */ l(
      ve,
      {
        ...F,
        ref: E,
        value: V,
        onChange: z,
        onBlur: G,
        onFocus: t,
        placeholder: d,
        disabled: u,
        rows: f,
        className: _(
          "bg-background border-border text-foreground",
          D && "border-destructive focus:border-destructive",
          $ && "border-green-500",
          I
        )
      }
    ),
    v && n && /* @__PURE__ */ b("div", { className: "text-xs text-muted-foreground text-right", children: [
      V.length,
      " / ",
      n
    ] }),
    D && g && /* @__PURE__ */ b("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ l(U, { className: "h-3 w-3" }),
      g
    ] })
  ] });
});
Ke.displayName = "ValidatedTextarea";
const Je = W(({
  value: e = "",
  onChange: r,
  required: t = !1,
  disabled: a = !1,
  label: s,
  placeholder: o = "Select an option...",
  options: n,
  clearable: i = !1,
  className: d
}, u) => {
  const [f, v] = p(e), [I, F] = p(!1), [E, V] = p(!0), [N, h] = p("");
  M.useEffect(() => {
    v(e || "");
  }, [e]);
  const m = Z((g) => t && !g ? { isValid: !1, message: "Please select an option" } : { isValid: !0, message: "" }, [t]), y = (g) => {
    F(!0), v(g);
    const w = m(g);
    V(w.isValid), h(w.message), r?.(g);
  }, x = I && !E;
  return /* @__PURE__ */ b("div", { className: "space-y-2", ref: u, children: [
    s && /* @__PURE__ */ l(
      H,
      {
        className: _(
          "text-foreground",
          t && "after:content-['*'] after:ml-0.5 after:text-destructive"
        ),
        children: s
      }
    ),
    /* @__PURE__ */ b(
      Ce,
      {
        value: f,
        onValueChange: y,
        disabled: a,
        children: [
          /* @__PURE__ */ l(
            Fe,
            {
              className: _(
                "bg-background border-border text-foreground",
                x && "border-destructive focus:border-destructive",
                d
              ),
              children: /* @__PURE__ */ l(Se, { placeholder: o })
            }
          ),
          /* @__PURE__ */ b(ke, { className: "bg-popover border-border", children: [
            i && f && /* @__PURE__ */ l(te, { value: "", className: "text-muted-foreground", children: "Clear selection" }),
            n.map((g) => /* @__PURE__ */ l(
              te,
              {
                value: g.value,
                disabled: g.disabled,
                className: "text-foreground",
                children: g.label
              },
              g.value
            ))
          ] })
        ]
      }
    ),
    x && N && /* @__PURE__ */ b("div", { className: "flex items-center gap-1 text-sm text-destructive", children: [
      /* @__PURE__ */ l(U, { className: "h-3 w-3" }),
      N
    ] })
  ] });
});
Je.displayName = "ValidatedSelect";
const Qe = W(({
  checked: e = !1,
  onChange: r,
  required: t = !1,
  disabled: a = !1,
  label: s,
  description: o,
  className: n
}, i) => {
  const [d, u] = p(e), [f, v] = p(!1), [I, F] = p(!0), [E, V] = p("");
  M.useEffect(() => {
    u(e || !1);
  }, [e]);
  const N = Z((y) => t && !y ? { isValid: !1, message: "This field is required" } : { isValid: !0, message: "" }, [t]), h = (y) => {
    v(!0), u(y);
    const x = N(y);
    F(x.isValid), V(x.message), r?.(y);
  }, m = f && !I;
  return /* @__PURE__ */ b("div", { className: _("space-y-2", n), ref: i, children: [
    /* @__PURE__ */ b("div", { className: "flex items-start space-x-2", children: [
      /* @__PURE__ */ l(
        Ne,
        {
          checked: d,
          onCheckedChange: h,
          disabled: a,
          className: "mt-0.5"
        }
      ),
      /* @__PURE__ */ b("div", { className: "space-y-1 flex-1", children: [
        /* @__PURE__ */ l(
          H,
          {
            className: _(
              "text-sm font-medium leading-none text-foreground cursor-pointer",
              t && "after:content-['*'] after:ml-0.5 after:text-destructive"
            ),
            children: s
          }
        ),
        o && /* @__PURE__ */ l("p", { className: "text-xs text-muted-foreground", children: o })
      ] })
    ] }),
    m && E && /* @__PURE__ */ b("div", { className: "flex items-center gap-1 text-sm text-destructive ml-6", children: [
      /* @__PURE__ */ l(U, { className: "h-3 w-3" }),
      E
    ] })
  ] });
});
Qe.displayName = "ValidatedCheckbox";
const Xe = W(({
  submitText: e = "Submit",
  cancelText: r = "Cancel",
  showCancel: t = !1,
  loading: a = !1,
  disabled: s = !1,
  onCancel: o,
  align: n = "right",
  className: i
}, d) => /* @__PURE__ */ b(
  "div",
  {
    ref: d,
    className: _(
      "flex gap-2",
      n === "left" && "justify-start",
      n === "center" && "justify-center",
      n === "right" && "justify-end",
      i
    ),
    children: [
      t && /* @__PURE__ */ l(
        X,
        {
          type: "button",
          variant: "outline",
          onClick: o,
          disabled: a,
          className: "border-border",
          children: r
        }
      ),
      /* @__PURE__ */ l(
        X,
        {
          type: "submit",
          disabled: a || s,
          className: "min-w-24 bg-primary text-primary-foreground",
          children: a ? /* @__PURE__ */ b("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ l("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
            "Loading..."
          ] }) : e
        }
      )
    ]
  }
));
Xe.displayName = "FormActions";
export {
  it as Form,
  Xe as FormActions,
  ft as FormControl,
  mt as FormDescription,
  ct as FormField,
  ut as FormItem,
  dt as FormLabel,
  gt as FormMessage,
  Qe as ValidatedCheckbox,
  Ze as ValidatedInput,
  Je as ValidatedSelect,
  Ke as ValidatedTextarea,
  J as useFormField
};
//# sourceMappingURL=form.js.map
