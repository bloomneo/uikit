import { jsx as i, jsxs as B } from "react/jsx-runtime";
import * as s from "react";
import { u as K, c as k, a as C } from "./index-WHakdmwv.js";
import { u as w } from "./index-5Bhkapwi.js";
import { P as g } from "./index-CpDnqHCm.js";
import { c as P, R as T, I as U } from "./index-CO5mz-pQ.js";
import { u as V } from "./index-C5CLmphY.js";
import { u as j } from "./index-C5AIzmng.js";
import { u as z } from "./index-BZPx6jYI.js";
import { P as H } from "./index-DKIoJbzW.js";
import { c as E } from "./utils-CwJPJKOE.js";
import { C as $ } from "./circle-DHOdTDQh.js";
var I = "Radio", [W, _] = k(I), [X, Y] = W(I), G = s.forwardRef(
  (r, t) => {
    const {
      __scopeRadio: o,
      name: d,
      checked: e = !1,
      required: a,
      disabled: n,
      value: p = "on",
      onCheck: f,
      form: m,
      ...v
    } = r, [l, R] = s.useState(null), c = w(t, (h) => R(h)), u = s.useRef(!1), b = l ? m || !!l.closest("form") : !0;
    return /* @__PURE__ */ B(X, { scope: o, checked: e, disabled: n, children: [
      /* @__PURE__ */ i(
        g.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": e,
          "data-state": A(e),
          "data-disabled": n ? "" : void 0,
          disabled: n,
          value: p,
          ...v,
          ref: c,
          onClick: C(r.onClick, (h) => {
            e || f?.(), b && (u.current = h.isPropagationStopped(), u.current || h.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ i(
        x,
        {
          control: l,
          bubbles: !u.current,
          name: d,
          value: p,
          checked: e,
          required: a,
          disabled: n,
          form: m,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
G.displayName = I;
var N = "RadioIndicator", S = s.forwardRef(
  (r, t) => {
    const { __scopeRadio: o, forceMount: d, ...e } = r, a = Y(N, o);
    return /* @__PURE__ */ i(H, { present: d || a.checked, children: /* @__PURE__ */ i(
      g.span,
      {
        "data-state": A(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...e,
        ref: t
      }
    ) });
  }
);
S.displayName = N;
var J = "RadioBubbleInput", x = s.forwardRef(
  ({
    __scopeRadio: r,
    control: t,
    checked: o,
    bubbles: d = !0,
    ...e
  }, a) => {
    const n = s.useRef(null), p = w(n, a), f = z(o), m = j(t);
    return s.useEffect(() => {
      const v = n.current;
      if (!v) return;
      const l = window.HTMLInputElement.prototype, c = Object.getOwnPropertyDescriptor(
        l,
        "checked"
      ).set;
      if (f !== o && c) {
        const u = new Event("click", { bubbles: d });
        c.call(v, o), v.dispatchEvent(u);
      }
    }, [f, o, d]), /* @__PURE__ */ i(
      g.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: o,
        ...e,
        tabIndex: -1,
        ref: p,
        style: {
          ...e.style,
          ...m,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
x.displayName = J;
function A(r) {
  return r ? "checked" : "unchecked";
}
var Q = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], y = "RadioGroup", [Z, be] = k(y, [
  P,
  _
]), D = P(), M = _(), [ee, oe] = Z(y), O = s.forwardRef(
  (r, t) => {
    const {
      __scopeRadioGroup: o,
      name: d,
      defaultValue: e,
      value: a,
      required: n = !1,
      disabled: p = !1,
      orientation: f,
      dir: m,
      loop: v = !0,
      onValueChange: l,
      ...R
    } = r, c = D(o), u = V(m), [b, h] = K({
      prop: a,
      defaultProp: e ?? null,
      onChange: l,
      caller: y
    });
    return /* @__PURE__ */ i(
      ee,
      {
        scope: o,
        name: d,
        required: n,
        disabled: p,
        value: b,
        onValueChange: h,
        children: /* @__PURE__ */ i(
          T,
          {
            asChild: !0,
            ...c,
            orientation: f,
            dir: u,
            loop: v,
            children: /* @__PURE__ */ i(
              g.div,
              {
                role: "radiogroup",
                "aria-required": n,
                "aria-orientation": f,
                "data-disabled": p ? "" : void 0,
                dir: u,
                ...R,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
O.displayName = y;
var F = "RadioGroupItem", L = s.forwardRef(
  (r, t) => {
    const { __scopeRadioGroup: o, disabled: d, ...e } = r, a = oe(F, o), n = a.disabled || d, p = D(o), f = M(o), m = s.useRef(null), v = w(t, m), l = a.value === e.value, R = s.useRef(!1);
    return s.useEffect(() => {
      const c = (b) => {
        Q.includes(b.key) && (R.current = !0);
      }, u = () => R.current = !1;
      return document.addEventListener("keydown", c), document.addEventListener("keyup", u), () => {
        document.removeEventListener("keydown", c), document.removeEventListener("keyup", u);
      };
    }, []), /* @__PURE__ */ i(
      U,
      {
        asChild: !0,
        ...p,
        focusable: !n,
        active: l,
        children: /* @__PURE__ */ i(
          G,
          {
            disabled: n,
            required: a.required,
            checked: l,
            ...f,
            ...e,
            name: a.name,
            ref: v,
            onCheck: () => a.onValueChange(e.value),
            onKeyDown: C((c) => {
              c.key === "Enter" && c.preventDefault();
            }),
            onFocus: C(e.onFocus, () => {
              R.current && m.current?.click();
            })
          }
        )
      }
    );
  }
);
L.displayName = F;
var re = "RadioGroupIndicator", q = s.forwardRef(
  (r, t) => {
    const { __scopeRadioGroup: o, ...d } = r, e = M(o);
    return /* @__PURE__ */ i(S, { ...e, ...d, ref: t });
  }
);
q.displayName = re;
var te = O, ae = L, ie = q;
function he({
  className: r,
  ...t
}) {
  return /* @__PURE__ */ i(
    te,
    {
      "data-slot": "radio-group",
      className: E("grid gap-3", r),
      ...t
    }
  );
}
function ge({
  className: r,
  ...t
}) {
  return /* @__PURE__ */ i(
    ae,
    {
      "data-slot": "radio-group-item",
      className: E(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        r
      ),
      ...t,
      children: /* @__PURE__ */ i(
        ie,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ i($, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
export {
  he as RadioGroup,
  ge as RadioGroupItem
};
//# sourceMappingURL=radio-group.js.map
