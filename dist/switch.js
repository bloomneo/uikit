import { jsxs as I, jsx as i } from "react/jsx-runtime";
import * as a from "react";
import { u as M, c as H, a as j } from "./index-WHakdmwv.js";
import { u as x } from "./index-5Bhkapwi.js";
import { u as z } from "./index-BZPx6jYI.js";
import { u as A } from "./index-C5AIzmng.js";
import { P as y } from "./index-CpDnqHCm.js";
import { c as C } from "./utils-CwJPJKOE.js";
var m = "Switch", [U, V] = H(m), [q, L] = U(m), P = a.forwardRef(
  (e, r) => {
    const {
      __scopeSwitch: t,
      name: s,
      checked: o,
      defaultChecked: b,
      required: d,
      disabled: n,
      value: u = "on",
      onCheckedChange: w,
      form: c,
      ...k
    } = e, [l, p] = a.useState(null), v = x(r, (f) => p(f)), S = a.useRef(!1), g = l ? c || !!l.closest("form") : !0, [h, B] = M({
      prop: o,
      defaultProp: b ?? !1,
      onChange: w,
      caller: m
    });
    return /* @__PURE__ */ I(q, { scope: t, checked: h, disabled: n, children: [
      /* @__PURE__ */ i(
        y.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": h,
          "aria-required": d,
          "data-state": N(h),
          "data-disabled": n ? "" : void 0,
          disabled: n,
          value: u,
          ...k,
          ref: v,
          onClick: j(e.onClick, (f) => {
            B((T) => !T), g && (S.current = f.isPropagationStopped(), S.current || f.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ i(
        _,
        {
          control: l,
          bubbles: !S.current,
          name: s,
          value: u,
          checked: h,
          required: d,
          disabled: n,
          form: c,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
P.displayName = m;
var R = "SwitchThumb", E = a.forwardRef(
  (e, r) => {
    const { __scopeSwitch: t, ...s } = e, o = L(R, t);
    return /* @__PURE__ */ i(
      y.span,
      {
        "data-state": N(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...s,
        ref: r
      }
    );
  }
);
E.displayName = R;
var O = "SwitchBubbleInput", _ = a.forwardRef(
  ({
    __scopeSwitch: e,
    control: r,
    checked: t,
    bubbles: s = !0,
    ...o
  }, b) => {
    const d = a.useRef(null), n = x(d, b), u = z(t), w = A(r);
    return a.useEffect(() => {
      const c = d.current;
      if (!c) return;
      const k = window.HTMLInputElement.prototype, p = Object.getOwnPropertyDescriptor(
        k,
        "checked"
      ).set;
      if (u !== t && p) {
        const v = new Event("click", { bubbles: s });
        p.call(c, t), c.dispatchEvent(v);
      }
    }, [u, t, s]), /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: t,
        ...o,
        tabIndex: -1,
        ref: n,
        style: {
          ...o.style,
          ...w,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
_.displayName = O;
function N(e) {
  return e ? "checked" : "unchecked";
}
var D = P, F = E;
function Y({
  className: e,
  ...r
}) {
  return /* @__PURE__ */ i(
    D,
    {
      "data-slot": "switch",
      className: C(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...r,
      children: /* @__PURE__ */ i(
        F,
        {
          "data-slot": "switch-thumb",
          className: C(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
export {
  Y as Switch
};
//# sourceMappingURL=switch.js.map
