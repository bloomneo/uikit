import { jsx as p, jsxs as O, Fragment as D } from "react/jsx-runtime";
import * as e from "react";
import { c as G, a as N, b as W } from "./index-b757E0P6.js";
import { u as U } from "./index-DFmzheZp.js";
import { u as X } from "./index-BU7T7I6R.js";
import { P as E } from "./index-rT3N9N4T.js";
import { c as M } from "./utils-D7gXXjDs.js";
var $ = Object.defineProperty, k = (t, r) => $(t, "name", { value: r, configurable: !0 }), x = "Switch", [J, de] = G(x), [K, T] = J(x);
function q(t) {
  const {
    __scopeSwitch: r,
    checked: d,
    children: o,
    defaultChecked: i,
    disabled: c,
    form: s,
    name: u,
    onCheckedChange: n,
    required: l,
    value: w = "on",
    // @ts-expect-error
    internal_do_not_use_render: b
  } = t, [f, m] = W({
    prop: d,
    defaultProp: i ?? !1,
    onChange: n,
    caller: x
  }), [S, v] = e.useState(null), [C, R] = e.useState(null), _ = e.useRef(!1), [a, h] = e.useReducer(
    (g) => g + 1,
    0
  ), I = S ? !!s || !!S.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), P = {
    checked: f,
    setChecked: m,
    disabled: c,
    control: S,
    setControl: v,
    name: u,
    form: s,
    value: w,
    hasConsumerStoppedPropagationRef: _,
    userInteractionCount: a,
    onUserInteraction: h,
    required: l,
    defaultChecked: i,
    isFormControl: I,
    bubbleInput: C,
    setBubbleInput: R
  };
  return /* @__PURE__ */ p(K, { scope: r, ...P, children: H(b) ? b(P) : o });
}
k(q, "SwitchProvider");
var Q = "SwitchTrigger", V = /* @__PURE__ */ e.forwardRef(
  /* @__PURE__ */ k(function({ __scopeSwitch: r, onClick: d, ...o }, i) {
    const {
      control: c,
      form: s,
      value: u,
      disabled: n,
      checked: l,
      required: w,
      setControl: b,
      setChecked: f,
      hasConsumerStoppedPropagationRef: m,
      onUserInteraction: S,
      isFormControl: v,
      bubbleInput: C
    } = T(Q, r), R = U(i, b), _ = e.useRef(l);
    return e.useEffect(() => {
      const a = s ? c?.ownerDocument.getElementById(s) : c?.form;
      if (a instanceof HTMLFormElement) {
        const h = /* @__PURE__ */ k(() => f(_.current), "reset");
        return a.addEventListener("reset", h), () => a.removeEventListener("reset", h);
      }
    }, [c, s, f]), /* @__PURE__ */ p(
      E.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": l,
        "aria-required": w,
        "data-state": y(l),
        "data-disabled": n ? "" : void 0,
        disabled: n,
        value: u,
        ...o,
        ref: R,
        onClick: N(d, (a) => {
          S(), f((h) => !h), C && v && (m.current = a.isPropagationStopped(), m.current || a.stopPropagation());
        })
      }
    );
  }, "SwitchTrigger")
), Y = /* @__PURE__ */ e.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function(r, d) {
    const {
      __scopeSwitch: o,
      name: i,
      checked: c,
      defaultChecked: s,
      required: u,
      disabled: n,
      value: l,
      onCheckedChange: w,
      form: b,
      ...f
    } = r;
    return /* @__PURE__ */ p(
      q,
      {
        __scopeSwitch: o,
        checked: c,
        defaultChecked: s,
        disabled: n,
        required: u,
        onCheckedChange: w,
        name: i,
        form: b,
        value: l,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ O(D, { children: [
          /* @__PURE__ */ p(
            V,
            {
              ...f,
              ref: d,
              __scopeSwitch: o
            }
          ),
          m && /* @__PURE__ */ p(
            re,
            {
              __scopeSwitch: o
            }
          )
        ] })
      }
    );
  }, "Switch")
), Z = "SwitchThumb", ee = /* @__PURE__ */ e.forwardRef(
  /* @__PURE__ */ k(function(r, d) {
    const { __scopeSwitch: o, ...i } = r, c = T(Z, o);
    return /* @__PURE__ */ p(
      E.span,
      {
        "data-state": y(c.checked),
        "data-disabled": c.disabled ? "" : void 0,
        ...i,
        ref: d
      }
    );
  }, "SwitchThumb")
), te = "SwitchBubbleInput", re = /* @__PURE__ */ e.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function({ __scopeSwitch: r, onClick: d, ...o }, i) {
    const {
      control: c,
      hasConsumerStoppedPropagationRef: s,
      userInteractionCount: u,
      checked: n,
      defaultChecked: l,
      required: w,
      disabled: b,
      name: f,
      value: m,
      form: S,
      bubbleInput: v,
      setBubbleInput: C
    } = T(te, r), R = U(i, C), _ = X(c), a = e.useRef(!1), h = e.useRef(n), I = e.useRef(u);
    e.useEffect(() => {
      const g = v;
      if (!g) return;
      const L = window.HTMLInputElement.prototype, B = Object.getOwnPropertyDescriptor(
        L,
        "checked"
      ).set, F = u !== I.current;
      I.current = u;
      const j = h.current !== n;
      h.current = n;
      const A = !(F && s.current);
      if (j && B) {
        a.current = !F;
        const z = new Event("click", { bubbles: A });
        B.call(g, n), g.dispatchEvent(z), a.current = !1;
      }
    }, [v, n, s, u]);
    const P = e.useRef(n);
    return /* @__PURE__ */ p(
      E.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: l ?? P.current,
        required: w,
        disabled: b,
        name: f,
        value: m,
        form: S,
        ...o,
        tabIndex: -1,
        ref: R,
        onClick: N(d, (g) => {
          a.current && g.stopPropagation();
        }),
        style: {
          ...o.style,
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
  }, "SwitchBubbleInput")
);
function H(t) {
  return typeof t == "function";
}
k(H, "isFunction");
function y(t) {
  return t ? "checked" : "unchecked";
}
k(y, "getState");
function le({
  className: t,
  ...r
}) {
  return /* @__PURE__ */ p(
    Y,
    {
      "data-slot": "switch",
      className: M(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        t
      ),
      ...r,
      children: /* @__PURE__ */ p(
        ee,
        {
          "data-slot": "switch-thumb",
          className: M(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
export {
  le as Switch
};
//# sourceMappingURL=switch.js.map
