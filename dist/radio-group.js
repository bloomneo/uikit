import { jsx as c, jsxs as X, Fragment as Y } from "react/jsx-runtime";
import * as n from "react";
import { c as M, b as J, a as E } from "./index-b757E0P6.js";
import { u as w } from "./index-DFmzheZp.js";
import { P as y } from "./index-rT3N9N4T.js";
import { c as L, R as Q, I as Z } from "./index-BzSHYi7S.js";
import { u as ee } from "./index-S1vMr2en.js";
import { u as oe } from "./index-BU7T7I6R.js";
import { P as re } from "./index-C7u_Yu0y.js";
import { c as U } from "./utils-D7gXXjDs.js";
import { C as te } from "./circle-C7HJtY_v.js";
var ne = Object.defineProperty, d = (a, o) => ne(a, "name", { value: o, configurable: !0 }), O = "Radio", [ae, K] = M(O), [ie, S] = ae(O);
function q(a) {
  const {
    __scopeRadio: o,
    checked: i = !1,
    children: t,
    disabled: s,
    form: r,
    name: e,
    onCheck: p,
    required: f,
    value: m = "on",
    // @ts-expect-error
    internal_do_not_use_render: R
  } = a, [l, u] = n.useState(null), [b, g] = n.useState(null), v = n.useRef(!1), [G, C] = n.useReducer(
    (k) => k + 1,
    0
  ), I = l ? !!r || !!l.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), h = {
    checked: i,
    disabled: s,
    required: f,
    name: e,
    form: r,
    value: m,
    control: l,
    setControl: u,
    hasConsumerStoppedPropagationRef: v,
    userInteractionCount: G,
    onUserInteraction: C,
    isFormControl: I,
    bubbleInput: b,
    setBubbleInput: g,
    onCheck: /* @__PURE__ */ d(() => p?.(), "onCheck")
  };
  return /* @__PURE__ */ c(ie, { scope: o, ...h, children: V(R) ? R(h) : t });
}
d(q, "RadioProvider");
var se = "RadioTrigger", ce = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function({ __scopeRadio: o, onClick: i, ...t }, s) {
    const {
      checked: r,
      disabled: e,
      value: p,
      setControl: f,
      onCheck: m,
      hasConsumerStoppedPropagationRef: R,
      onUserInteraction: l,
      isFormControl: u,
      bubbleInput: b
    } = S(se, o), g = w(s, f);
    return /* @__PURE__ */ c(
      y.button,
      {
        type: "button",
        role: "radio",
        "aria-checked": r,
        "data-state": D(r),
        "data-disabled": e ? "" : void 0,
        disabled: e,
        value: p,
        ...t,
        ref: g,
        onClick: E(i, (v) => {
          r || (l(), m()), b && u && (R.current = v.isPropagationStopped(), R.current || v.stopPropagation());
        })
      }
    );
  }, "RadioTrigger")
), de = "RadioIndicator", ue = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function(o, i) {
    const { __scopeRadio: t, forceMount: s, ...r } = o, e = S(de, t);
    return /* @__PURE__ */ c(re, { present: s || e.checked, children: /* @__PURE__ */ c(
      y.span,
      {
        "data-state": D(e.checked),
        "data-disabled": e.disabled ? "" : void 0,
        ...r,
        ref: i
      }
    ) });
  }, "RadioIndicator")
), pe = "RadioBubbleInput", le = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function({ __scopeRadio: o, onClick: i, ...t }, s) {
    const {
      control: r,
      checked: e,
      required: p,
      disabled: f,
      name: m,
      value: R,
      form: l,
      bubbleInput: u,
      setBubbleInput: b,
      hasConsumerStoppedPropagationRef: g,
      userInteractionCount: v
    } = S(pe, o), G = w(s, b), C = oe(r), I = n.useRef(!1), h = n.useRef(e), k = n.useRef(v);
    n.useEffect(() => {
      const _ = u;
      if (!_) return;
      const P = window.HTMLInputElement.prototype, F = Object.getOwnPropertyDescriptor(
        P,
        "checked"
      ).set, N = v !== k.current;
      k.current = v;
      const H = h.current !== e;
      h.current = e;
      const $ = !(N && g.current);
      if (H && F) {
        I.current = !N;
        const W = new Event("click", { bubbles: $ });
        F.call(_, e), _.dispatchEvent(W), I.current = !1;
      }
    }, [u, e, g, v]);
    const A = n.useRef(e);
    return /* @__PURE__ */ c(
      y.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: A.current,
        required: p,
        disabled: f,
        name: m,
        value: R,
        form: l,
        ...t,
        tabIndex: -1,
        ref: G,
        onClick: E(i, (_) => {
          I.current && _.stopPropagation();
        }),
        style: {
          ...t.style,
          ...C,
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
  }, "RadioBubbleInput")
);
function V(a) {
  return typeof a == "function";
}
d(V, "isFunction");
function D(a) {
  return a ? "checked" : "unchecked";
}
d(D, "getState");
var fe = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], B = "RadioGroup", [Re, Be] = M(B, [
  L,
  K
]), j = L(), x = K(), [me, ve] = Re(B), be = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function(o, i) {
    const {
      __scopeRadioGroup: t,
      name: s,
      form: r,
      defaultValue: e,
      value: p,
      required: f = !1,
      disabled: m = !1,
      orientation: R,
      dir: l,
      loop: u = !0,
      onValueChange: b,
      ...g
    } = o, v = j(t), G = ee(l), [C, I] = J({
      prop: p,
      defaultProp: e ?? null,
      onChange: b,
      caller: B
    }), [h, k] = n.useState(null), A = w(i, k), _ = n.useRef(C);
    return n.useEffect(() => {
      const P = r ? h?.ownerDocument.getElementById(r) : h?.closest("form");
      if (P instanceof HTMLFormElement) {
        const T = /* @__PURE__ */ d(() => I(_.current), "reset");
        return P.addEventListener("reset", T), () => P.removeEventListener("reset", T);
      }
    }, [h, r, I]), /* @__PURE__ */ c(
      me,
      {
        scope: t,
        name: s,
        form: r,
        required: f,
        disabled: m,
        value: C,
        onValueChange: I,
        children: /* @__PURE__ */ c(
          Q,
          {
            asChild: !0,
            ...v,
            orientation: R,
            dir: G,
            loop: u,
            children: /* @__PURE__ */ c(
              y.div,
              {
                role: "radiogroup",
                "aria-required": f,
                "aria-orientation": R,
                "data-disabled": m ? "" : void 0,
                dir: G,
                ...g,
                ref: A
              }
            )
          }
        )
      }
    );
  }, "RadioGroup")
), ge = "RadioGroupItemProvider", Ie = "RadioGroupItemTrigger";
function z(a) {
  const {
    __scopeRadioGroup: o,
    value: i,
    disabled: t,
    children: s,
    // @ts-expect-error
    internal_do_not_use_render: r
  } = a, e = ve(ge, o), p = x(o), f = e.disabled || t;
  return /* @__PURE__ */ c(
    q,
    {
      ...p,
      checked: e.value === i,
      disabled: f,
      required: e.required,
      name: e.name,
      form: e.form,
      value: i,
      onCheck: () => e.onValueChange(i),
      internal_do_not_use_render: r,
      children: s
    }
  );
}
d(z, "RadioGroupItemProvider");
var he = /* @__PURE__ */ n.forwardRef(/* @__PURE__ */ d(function(o, i) {
  const { __scopeRadioGroup: t, ...s } = o, r = j(t), e = x(t), { checked: p, disabled: f } = S(Ie, e.__scopeRadio), m = n.useRef(null), R = w(i, m), l = n.useRef(!1);
  return n.useEffect(() => {
    const u = /* @__PURE__ */ d((g) => {
      fe.includes(g.key) && (l.current = !0);
    }, "handleKeyDown"), b = /* @__PURE__ */ d(() => l.current = !1, "handleKeyUp");
    return document.addEventListener("keydown", u), document.addEventListener("keyup", b), () => {
      document.removeEventListener("keydown", u), document.removeEventListener("keyup", b);
    };
  }, []), /* @__PURE__ */ c(
    Z,
    {
      asChild: !0,
      ...r,
      focusable: !f,
      active: p,
      children: /* @__PURE__ */ c(
        ce,
        {
          ...e,
          ...s,
          ref: R,
          onKeyDown: E(s.onKeyDown, (u) => {
            u.key === "Enter" && u.preventDefault();
          }),
          onFocus: E(s.onFocus, () => {
            l.current && m.current?.click();
          })
        }
      )
    }
  );
}, "RadioGroupItemTrigger")), _e = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ d(function(o, i) {
    const { __scopeRadioGroup: t, value: s, disabled: r, ...e } = o;
    return /* @__PURE__ */ c(
      z,
      {
        __scopeRadioGroup: t,
        value: s,
        disabled: r,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ X(Y, { children: [
          /* @__PURE__ */ c(
            he,
            {
              ...e,
              ref: i,
              __scopeRadioGroup: t
            }
          ),
          p && /* @__PURE__ */ c(
            Ge,
            {
              __scopeRadioGroup: t
            }
          )
        ] })
      }
    );
  }, "RadioGroupItem")
), Ge = /* @__PURE__ */ n.forwardRef(/* @__PURE__ */ d(function(o, i) {
  const { __scopeRadioGroup: t, ...s } = o, r = x(t);
  return /* @__PURE__ */ c(le, { ...r, ...s, ref: i });
}, "RadioGroupItemBubbleInput")), Ce = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(o, i) {
    const { __scopeRadioGroup: t, ...s } = o, r = x(t);
    return /* @__PURE__ */ c(ue, { ...r, ...s, ref: i });
  }, "RadioGroupIndicator")
);
function Fe({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ c(
    be,
    {
      "data-slot": "radio-group",
      className: U("grid gap-3", a),
      ...o
    }
  );
}
function Ne({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ c(
    _e,
    {
      "data-slot": "radio-group-item",
      className: U(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        a
      ),
      ...o,
      children: /* @__PURE__ */ c(
        Ce,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ c(te, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
export {
  Fe as RadioGroup,
  Ne as RadioGroupItem
};
//# sourceMappingURL=radio-group.js.map
