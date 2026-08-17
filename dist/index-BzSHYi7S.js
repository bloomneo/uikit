import * as r from "react";
import { c as X, u as Z, a as F, b as ee } from "./index-b757E0P6.js";
import { c as te, u as oe } from "./index-S1vMr2en.js";
import { u as re } from "./index-DFmzheZp.js";
import { u as ne } from "./index-BraAqWsy.js";
import { P as N } from "./index-rT3N9N4T.js";
import { u as se } from "./index-CRNjeP0c.js";
import { jsx as p } from "react/jsx-runtime";
var ue = Object.defineProperty, O = (t, e) => ue(t, "name", { value: e, configurable: !0 }), P = !1;
function L() {
  const [t, e] = r.useState(P);
  return r.useEffect(() => {
    P || (P = !0, e(!0));
  }, []), t;
}
O(L, "useIsHydrated");
var k = r[" useSyncExternalStore ".trim().toString()];
function U() {
  return () => {
  };
}
O(U, "subscribe");
function B() {
  return k(
    U,
    () => !0,
    () => !1
  );
}
O(B, "useIsHydratedModern");
var ce = typeof k == "function" ? B : L, ae = Object.defineProperty, v = (t, e) => ae(t, "name", { value: e, configurable: !0 }), x = "rovingFocusGroup.onEntryFocus", ie = { bubbles: !1, cancelable: !0 }, T = "RovingFocusGroup", [D, j, fe] = te(T), [le, Ce] = X(
  T,
  [fe]
), [de, me] = le(T), pe = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, u) {
    return /* @__PURE__ */ p(D.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(D.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(ve, { ...e, ref: u }) }) });
  }, "RovingFocusGroup")
), ve = /* @__PURE__ */ r.forwardRef(/* @__PURE__ */ v(function(e, u) {
  const {
    __scopeRovingFocusGroup: n,
    orientation: i,
    loop: _ = !1,
    dir: C,
    currentTabStopId: R,
    defaultCurrentTabStopId: h,
    onCurrentTabStopIdChange: A,
    onEntryFocus: I,
    preventScrollOnEntryFocus: c = !1,
    ...y
  } = e, S = r.useRef(null), b = re(u, S), g = oe(C), [E, d] = ee({
    prop: R,
    defaultProp: h ?? null,
    onChange: A,
    caller: T
  }), [o, l] = r.useState(!1), w = se(I), f = j(n), a = r.useRef(!1), [z, K] = r.useState(0);
  return r.useEffect(() => {
    const s = S.current;
    if (s)
      return s.addEventListener(x, w), () => s.removeEventListener(x, w);
  }, [w]), /* @__PURE__ */ p(
    de,
    {
      scope: n,
      orientation: i,
      dir: g,
      loop: _,
      currentTabStopId: E,
      onItemFocus: r.useCallback(
        (s) => d(s),
        [d]
      ),
      onItemShiftTab: r.useCallback(() => l(!0), []),
      onFocusableItemAdd: r.useCallback(
        () => K((s) => s + 1),
        []
      ),
      onFocusableItemRemove: r.useCallback(
        () => K((s) => s - 1),
        []
      ),
      children: /* @__PURE__ */ p(
        N.div,
        {
          tabIndex: o || z === 0 ? -1 : 0,
          "data-orientation": i,
          ...y,
          ref: b,
          style: { outline: "none", ...e.style },
          onMouseDown: F(e.onMouseDown, () => {
            a.current = !0;
          }),
          onFocus: F(e.onFocus, (s) => {
            const q = !a.current;
            if (s.target === s.currentTarget && q && !o) {
              const M = new CustomEvent(x, ie);
              if (s.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const G = f().filter((m) => m.focusable), J = G.find((m) => m.active), Q = G.find((m) => m.id === E), W = [J, Q, ...G].filter(
                  Boolean
                ).map((m) => m.ref.current);
                H(W, c);
              }
            }
            a.current = !1;
          }),
          onBlur: F(e.onBlur, () => l(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), Ie = "RovingFocusGroupItem", be = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, u) {
    const {
      __scopeRovingFocusGroup: n,
      focusable: i = !0,
      active: _ = !1,
      tabStopId: C,
      children: R,
      ...h
    } = e, A = ne(), I = C || A, c = me(Ie, n), y = c.currentTabStopId === I, S = j(n), { onFocusableItemAdd: b, onFocusableItemRemove: g, currentTabStopId: E } = c, d = ce();
    return Z(() => {
      if (!(!d || !i))
        return b(), () => g();
    }, [d, i, b, g]), r.useEffect(() => {
      if (!(d || !i))
        return b(), () => g();
    }, [d, i, b, g]), /* @__PURE__ */ p(
      D.ItemSlot,
      {
        scope: n,
        id: I,
        focusable: i,
        active: _,
        children: /* @__PURE__ */ p(
          N.span,
          {
            tabIndex: y ? 0 : -1,
            "data-orientation": c.orientation,
            ...h,
            ref: u,
            onMouseDown: F(e.onMouseDown, (o) => {
              i ? c.onItemFocus(I) : o.preventDefault();
            }),
            onFocus: F(e.onFocus, () => c.onItemFocus(I)),
            onKeyDown: F(e.onKeyDown, (o) => {
              if (o.key === "Tab" && o.shiftKey) {
                c.onItemShiftTab();
                return;
              }
              if (o.target !== o.currentTarget) return;
              const l = V(o, c.orientation, c.dir);
              if (l !== void 0) {
                if (o.metaKey || o.ctrlKey || o.altKey || o.shiftKey) return;
                o.preventDefault();
                let f = S().filter((a) => a.focusable).map((a) => a.ref.current);
                if (l === "last") f.reverse();
                else if (l === "prev" || l === "next") {
                  l === "prev" && f.reverse();
                  const a = f.indexOf(o.currentTarget);
                  f = c.loop ? $(f, a + 1) : f.slice(a + 1);
                }
                setTimeout(() => H(f));
              }
            }),
            children: typeof R == "function" ? R({ isCurrentTabStop: y, hasTabStop: E != null }) : R
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), ge = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Y(t, e) {
  return e !== "rtl" ? t : t === "ArrowLeft" ? "ArrowRight" : t === "ArrowRight" ? "ArrowLeft" : t;
}
v(Y, "getDirectionAwareKey");
function V(t, e, u) {
  const n = Y(t.key, u);
  if (!(e === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) && !(e === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n)))
    return ge[n];
}
v(V, "getFocusIntent");
function H(t, e = !1) {
  const u = document.activeElement;
  for (const n of t)
    if (n === u || (n.focus({ preventScroll: e }), document.activeElement !== u)) return;
}
v(H, "focusFirst");
function $(t, e) {
  return t.map((u, n) => t[(e + n) % t.length]);
}
v($, "wrapArray");
var he = pe, Ae = be;
export {
  Ae as I,
  he as R,
  Ce as c
};
//# sourceMappingURL=index-BzSHYi7S.js.map
