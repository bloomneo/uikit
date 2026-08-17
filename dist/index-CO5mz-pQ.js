import * as s from "react";
import { c as V, a as p, u as j } from "./index-WHakdmwv.js";
import { c as z, u as q } from "./index-C5CLmphY.js";
import { u as J } from "./index-5Bhkapwi.js";
import { u as Q } from "./index-CXwMLXQo.js";
import { P as G } from "./index-CpDnqHCm.js";
import { u as W } from "./index-0ioNhtNM.js";
import { jsx as d } from "react/jsx-runtime";
var y = "rovingFocusGroup.onEntryFocus", X = { bubbles: !1, cancelable: !0 }, I = "RovingFocusGroup", [P, N, Z] = z(I), [$, ve] = V(
  I,
  [Z]
), [ee, oe] = $(I), O = s.forwardRef(
  (e, r) => /* @__PURE__ */ d(P.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d(P.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ d(te, { ...e, ref: r }) }) })
);
O.displayName = I;
var te = s.forwardRef((e, r) => {
  const {
    __scopeRovingFocusGroup: c,
    orientation: o,
    loop: T = !1,
    dir: w,
    currentTabStopId: v,
    defaultCurrentTabStopId: C,
    onCurrentTabStopIdChange: S,
    onEntryFocus: m,
    preventScrollOnEntryFocus: a = !1,
    ...b
  } = e, F = s.useRef(null), g = J(r, F), R = q(w), [E, t] = j({
    prop: v,
    defaultProp: C ?? null,
    onChange: S,
    caller: I
  }), [i, h] = s.useState(!1), u = W(m), l = N(c), A = s.useRef(!1), [L, D] = s.useState(0);
  return s.useEffect(() => {
    const n = F.current;
    if (n)
      return n.addEventListener(y, u), () => n.removeEventListener(y, u);
  }, [u]), /* @__PURE__ */ d(
    ee,
    {
      scope: c,
      orientation: o,
      dir: R,
      loop: T,
      currentTabStopId: E,
      onItemFocus: s.useCallback(
        (n) => t(n),
        [t]
      ),
      onItemShiftTab: s.useCallback(() => h(!0), []),
      onFocusableItemAdd: s.useCallback(
        () => D((n) => n + 1),
        []
      ),
      onFocusableItemRemove: s.useCallback(
        () => D((n) => n - 1),
        []
      ),
      children: /* @__PURE__ */ d(
        G.div,
        {
          tabIndex: i || L === 0 ? -1 : 0,
          "data-orientation": o,
          ...b,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: p(e.onMouseDown, () => {
            A.current = !0;
          }),
          onFocus: p(e.onFocus, (n) => {
            const U = !A.current;
            if (n.target === n.currentTarget && U && !i) {
              const x = new CustomEvent(y, X);
              if (n.currentTarget.dispatchEvent(x), !x.defaultPrevented) {
                const _ = l().filter((f) => f.focusable), B = _.find((f) => f.active), Y = _.find((f) => f.id === E), H = [B, Y, ..._].filter(
                  Boolean
                ).map((f) => f.ref.current);
                k(H, a);
              }
            }
            A.current = !1;
          }),
          onBlur: p(e.onBlur, () => h(!1))
        }
      )
    }
  );
}), K = "RovingFocusGroupItem", M = s.forwardRef(
  (e, r) => {
    const {
      __scopeRovingFocusGroup: c,
      focusable: o = !0,
      active: T = !1,
      tabStopId: w,
      children: v,
      ...C
    } = e, S = Q(), m = w || S, a = oe(K, c), b = a.currentTabStopId === m, F = N(c), { onFocusableItemAdd: g, onFocusableItemRemove: R, currentTabStopId: E } = a;
    return s.useEffect(() => {
      if (o)
        return g(), () => R();
    }, [o, g, R]), /* @__PURE__ */ d(
      P.ItemSlot,
      {
        scope: c,
        id: m,
        focusable: o,
        active: T,
        children: /* @__PURE__ */ d(
          G.span,
          {
            tabIndex: b ? 0 : -1,
            "data-orientation": a.orientation,
            ...C,
            ref: r,
            onMouseDown: p(e.onMouseDown, (t) => {
              o ? a.onItemFocus(m) : t.preventDefault();
            }),
            onFocus: p(e.onFocus, () => a.onItemFocus(m)),
            onKeyDown: p(e.onKeyDown, (t) => {
              if (t.key === "Tab" && t.shiftKey) {
                a.onItemShiftTab();
                return;
              }
              if (t.target !== t.currentTarget) return;
              const i = se(t, a.orientation, a.dir);
              if (i !== void 0) {
                if (t.metaKey || t.ctrlKey || t.altKey || t.shiftKey) return;
                t.preventDefault();
                let u = F().filter((l) => l.focusable).map((l) => l.ref.current);
                if (i === "last") u.reverse();
                else if (i === "prev" || i === "next") {
                  i === "prev" && u.reverse();
                  const l = u.indexOf(t.currentTarget);
                  u = a.loop ? ce(u, l + 1) : u.slice(l + 1);
                }
                setTimeout(() => k(u));
              }
            }),
            children: typeof v == "function" ? v({ isCurrentTabStop: b, hasTabStop: E != null }) : v
          }
        )
      }
    );
  }
);
M.displayName = K;
var re = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function ne(e, r) {
  return r !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function se(e, r, c) {
  const o = ne(e.key, c);
  if (!(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(o)) && !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(o)))
    return re[o];
}
function k(e, r = !1) {
  const c = document.activeElement;
  for (const o of e)
    if (o === c || (o.focus({ preventScroll: r }), document.activeElement !== c)) return;
}
function ce(e, r) {
  return e.map((c, o) => e[(r + o) % e.length]);
}
var Ie = O, be = M;
export {
  be as I,
  Ie as R,
  ve as c
};
//# sourceMappingURL=index-CO5mz-pQ.js.map
