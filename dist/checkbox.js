import { jsx as s, jsxs as L, Fragment as O } from "react/jsx-runtime";
import * as i from "react";
import { u as S } from "./index-5Bhkapwi.js";
import { c as H, u as G, a as N } from "./index-WHakdmwv.js";
import { u as K } from "./index-BZPx6jYI.js";
import { u as U } from "./index-C5AIzmng.js";
import { P as X } from "./index-DKIoJbzW.js";
import { P as _ } from "./index-CpDnqHCm.js";
import { c as $ } from "./utils-CwJPJKOE.js";
import { C as J } from "./check-DXouwtzp.js";
var y = "Checkbox", [Q, ie] = H(y), [V, E] = Q(y);
function W(t) {
  const {
    __scopeCheckbox: o,
    checked: c,
    children: l,
    defaultChecked: n,
    disabled: e,
    form: f,
    name: b,
    onCheckedChange: d,
    required: m,
    value: k = "on",
    // @ts-expect-error
    internal_do_not_use_render: u
  } = t, [p, v] = G({
    prop: c,
    defaultProp: n ?? !1,
    onChange: d,
    caller: y
  }), [C, x] = i.useState(null), [g, r] = i.useState(null), a = i.useRef(!1), P = C ? !!f || !!C.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), R = {
    checked: p,
    disabled: e,
    setChecked: v,
    control: C,
    setControl: x,
    name: b,
    form: f,
    value: k,
    hasConsumerStoppedPropagationRef: a,
    required: m,
    defaultChecked: h(n) ? !1 : n,
    isFormControl: P,
    bubbleInput: g,
    setBubbleInput: r
  };
  return /* @__PURE__ */ s(
    V,
    {
      scope: o,
      ...R,
      children: Y(u) ? u(R) : l
    }
  );
}
var w = "CheckboxTrigger", B = i.forwardRef(
  ({ __scopeCheckbox: t, onKeyDown: o, onClick: c, ...l }, n) => {
    const {
      control: e,
      value: f,
      disabled: b,
      checked: d,
      required: m,
      setControl: k,
      setChecked: u,
      hasConsumerStoppedPropagationRef: p,
      isFormControl: v,
      bubbleInput: C
    } = E(w, t), x = S(n, k), g = i.useRef(d);
    return i.useEffect(() => {
      const r = e?.form;
      if (r) {
        const a = () => u(g.current);
        return r.addEventListener("reset", a), () => r.removeEventListener("reset", a);
      }
    }, [e, u]), /* @__PURE__ */ s(
      _.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": h(d) ? "mixed" : d,
        "aria-required": m,
        "data-state": z(d),
        "data-disabled": b ? "" : void 0,
        disabled: b,
        value: f,
        ...l,
        ref: x,
        onKeyDown: N(o, (r) => {
          r.key === "Enter" && r.preventDefault();
        }),
        onClick: N(c, (r) => {
          u((a) => h(a) ? !0 : !a), C && v && (p.current = r.isPropagationStopped(), p.current || r.stopPropagation());
        })
      }
    );
  }
);
B.displayName = w;
var M = i.forwardRef(
  (t, o) => {
    const {
      __scopeCheckbox: c,
      name: l,
      checked: n,
      defaultChecked: e,
      required: f,
      disabled: b,
      value: d,
      onCheckedChange: m,
      form: k,
      ...u
    } = t;
    return /* @__PURE__ */ s(
      W,
      {
        __scopeCheckbox: c,
        checked: n,
        defaultChecked: e,
        disabled: b,
        required: f,
        onCheckedChange: m,
        name: l,
        form: k,
        value: d,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ L(O, { children: [
          /* @__PURE__ */ s(
            B,
            {
              ...u,
              ref: o,
              __scopeCheckbox: c
            }
          ),
          p && /* @__PURE__ */ s(
            j,
            {
              __scopeCheckbox: c
            }
          )
        ] })
      }
    );
  }
);
M.displayName = y;
var T = "CheckboxIndicator", q = i.forwardRef(
  (t, o) => {
    const { __scopeCheckbox: c, forceMount: l, ...n } = t, e = E(T, c);
    return /* @__PURE__ */ s(
      X,
      {
        present: l || h(e.checked) || e.checked === !0,
        children: /* @__PURE__ */ s(
          _.span,
          {
            "data-state": z(e.checked),
            "data-disabled": e.disabled ? "" : void 0,
            ...n,
            ref: o,
            style: { pointerEvents: "none", ...t.style }
          }
        )
      }
    );
  }
);
q.displayName = T;
var A = "CheckboxBubbleInput", j = i.forwardRef(
  ({ __scopeCheckbox: t, ...o }, c) => {
    const {
      control: l,
      hasConsumerStoppedPropagationRef: n,
      checked: e,
      defaultChecked: f,
      required: b,
      disabled: d,
      name: m,
      value: k,
      form: u,
      bubbleInput: p,
      setBubbleInput: v
    } = E(A, t), C = S(c, v), x = K(e), g = U(l);
    i.useEffect(() => {
      const a = p;
      if (!a) return;
      const P = window.HTMLInputElement.prototype, I = Object.getOwnPropertyDescriptor(
        P,
        "checked"
      ).set, D = !n.current;
      if (x !== e && I) {
        const F = new Event("click", { bubbles: D });
        a.indeterminate = h(e), I.call(a, h(e) ? !1 : e), a.dispatchEvent(F);
      }
    }, [p, x, e, n]);
    const r = i.useRef(h(e) ? !1 : e);
    return /* @__PURE__ */ s(
      _.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: f ?? r.current,
        required: b,
        disabled: d,
        name: m,
        value: k,
        form: u,
        ...o,
        tabIndex: -1,
        ref: C,
        style: {
          ...o.style,
          ...g,
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
  }
);
j.displayName = A;
function Y(t) {
  return typeof t == "function";
}
function h(t) {
  return t === "indeterminate";
}
function z(t) {
  return h(t) ? "indeterminate" : t ? "checked" : "unchecked";
}
function de({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ s(
    M,
    {
      "data-slot": "checkbox",
      className: $(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ...o,
      children: /* @__PURE__ */ s(
        q,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ s(J, { className: "size-3.5" })
        }
      )
    }
  );
}
export {
  de as Checkbox
};
//# sourceMappingURL=checkbox.js.map
