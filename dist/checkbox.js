import { jsx as i, jsxs as L, Fragment as H } from "react/jsx-runtime";
import * as n from "react";
import { u as j } from "./index-DFmzheZp.js";
import { c as G, a as S, b as K } from "./index-b757E0P6.js";
import { u as X } from "./index-BU7T7I6R.js";
import { P as $ } from "./index-C7u_Yu0y.js";
import { P as w } from "./index-rT3N9N4T.js";
import { c as J } from "./utils-D7gXXjDs.js";
import { C as Q } from "./check-CT10FDO-.js";
var V = Object.defineProperty, k = (e, c) => V(e, "name", { value: c, configurable: !0 }), B = "Checkbox", [W, he] = G(B), [Y, N] = W(B);
function q(e) {
  const {
    __scopeCheckbox: c,
    checked: f,
    children: a,
    defaultChecked: s,
    disabled: b,
    form: r,
    name: d,
    onCheckedChange: t,
    required: u,
    value: v = "on",
    // @ts-expect-error
    internal_do_not_use_render: C
  } = e, [p, m] = K({
    prop: f,
    defaultProp: s ?? !1,
    onChange: t,
    caller: B
  }), [g, I] = n.useState(null), [R, P] = n.useState(null), _ = n.useRef(!1), [o, l] = n.useReducer(
    (x) => x + 1,
    0
  ), y = g ? !!r || !!g.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), E = {
    checked: p,
    disabled: b,
    setChecked: m,
    control: g,
    setControl: I,
    name: d,
    form: r,
    value: v,
    hasConsumerStoppedPropagationRef: _,
    userInteractionCount: o,
    onUserInteraction: l,
    required: u,
    defaultChecked: h(s) ? !1 : s,
    isFormControl: y,
    bubbleInput: R,
    setBubbleInput: P
  };
  return /* @__PURE__ */ i(
    Y,
    {
      scope: c,
      ...E,
      children: A(C) ? C(E) : a
    }
  );
}
k(q, "CheckboxProvider");
var Z = "CheckboxTrigger", ee = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ k(function({ __scopeCheckbox: c, onKeyDown: f, onClick: a, ...s }, b) {
    const {
      control: r,
      value: d,
      disabled: t,
      checked: u,
      required: v,
      setControl: C,
      setChecked: p,
      hasConsumerStoppedPropagationRef: m,
      onUserInteraction: g,
      isFormControl: I,
      bubbleInput: R
    } = N(Z, c), P = j(b, C), _ = n.useRef(u);
    return n.useEffect(() => {
      const o = r?.form;
      if (o) {
        const l = /* @__PURE__ */ k(() => p(_.current), "reset");
        return o.addEventListener("reset", l), () => o.removeEventListener("reset", l);
      }
    }, [r, p]), /* @__PURE__ */ i(
      w.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": h(u) ? "mixed" : u,
        "aria-required": v,
        "data-state": T(u),
        "data-disabled": t ? "" : void 0,
        disabled: t,
        value: d,
        ...s,
        ref: P,
        onKeyDown: S(f, (o) => {
          o.key === "Enter" && o.preventDefault();
        }),
        onClick: S(a, (o) => {
          g(), p((l) => h(l) ? !0 : !l), R && I && (m.current = o.isPropagationStopped(), m.current || o.stopPropagation());
        })
      }
    );
  }, "CheckboxTrigger")
), te = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function(c, f) {
    const {
      __scopeCheckbox: a,
      name: s,
      checked: b,
      defaultChecked: r,
      required: d,
      disabled: t,
      value: u,
      onCheckedChange: v,
      form: C,
      ...p
    } = c;
    return /* @__PURE__ */ i(
      q,
      {
        __scopeCheckbox: a,
        checked: b,
        defaultChecked: r,
        disabled: t,
        required: d,
        onCheckedChange: v,
        name: s,
        form: C,
        value: u,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ L(H, { children: [
          /* @__PURE__ */ i(
            ee,
            {
              ...p,
              ref: f,
              __scopeCheckbox: a
            }
          ),
          m && /* @__PURE__ */ i(
            ce,
            {
              __scopeCheckbox: a
            }
          )
        ] })
      }
    );
  }, "Checkbox")
), re = "CheckboxIndicator", oe = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function(c, f) {
    const { __scopeCheckbox: a, forceMount: s, ...b } = c, r = N(re, a);
    return /* @__PURE__ */ i(
      $,
      {
        present: s || h(r.checked) || r.checked === !0,
        children: /* @__PURE__ */ i(
          w.span,
          {
            "data-state": T(r.checked),
            "data-disabled": r.disabled ? "" : void 0,
            ...b,
            ref: f,
            style: { pointerEvents: "none", ...c.style }
          }
        )
      }
    );
  }, "CheckboxIndicator")
), ne = "CheckboxBubbleInput", ce = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function({ __scopeCheckbox: c, onClick: f, ...a }, s) {
    const {
      control: b,
      hasConsumerStoppedPropagationRef: r,
      userInteractionCount: d,
      checked: t,
      defaultChecked: u,
      required: v,
      disabled: C,
      name: p,
      value: m,
      form: g,
      bubbleInput: I,
      setBubbleInput: R
    } = N(ne, c), P = j(s, R), _ = X(b), o = n.useRef(!1), l = n.useRef(t), y = n.useRef(d);
    n.useEffect(() => {
      const x = I;
      if (!x) return;
      const F = window.HTMLInputElement.prototype, M = Object.getOwnPropertyDescriptor(
        F,
        "checked"
      ).set, U = d !== y.current;
      y.current = d;
      const O = l.current !== t;
      l.current = t;
      const z = !(U && r.current);
      if (O && M) {
        o.current = !U;
        const D = new Event("click", { bubbles: z });
        x.indeterminate = h(t), M.call(x, h(t) ? !1 : t), x.dispatchEvent(D), o.current = !1;
      }
    }, [I, t, r, d]);
    const E = n.useRef(h(t) ? !1 : t);
    return /* @__PURE__ */ i(
      w.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: u ?? E.current,
        required: v,
        disabled: C,
        name: p,
        value: m,
        form: g,
        ...a,
        tabIndex: -1,
        ref: P,
        onClick: S(f, (x) => {
          o.current && x.stopPropagation();
        }),
        style: {
          ...a.style,
          ..._,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "CheckboxBubbleInput")
);
function A(e) {
  return typeof e == "function";
}
k(A, "isFunction");
function h(e) {
  return e === "indeterminate";
}
k(h, "isIndeterminate");
function T(e) {
  return h(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
k(T, "getState");
function ke({
  className: e,
  ...c
}) {
  return /* @__PURE__ */ i(
    te,
    {
      "data-slot": "checkbox",
      className: J(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...c,
      children: /* @__PURE__ */ i(
        oe,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ i(Q, { className: "size-3.5" })
        }
      )
    }
  );
}
export {
  ke as Checkbox
};
//# sourceMappingURL=checkbox.js.map
