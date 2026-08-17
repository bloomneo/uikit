import * as s from "react";
import { a as S, u as $ } from "./index-b757E0P6.js";
import { P as N, d as X } from "./index-rT3N9N4T.js";
import { u as q } from "./index-DFmzheZp.js";
import { u as F } from "./index-CRNjeP0c.js";
import { jsx as A } from "react/jsx-runtime";
import * as G from "react-dom";
var J = Object.defineProperty, u = (i, e) => J(i, "name", { value: e, configurable: !0 }), g = "dismissableLayer.update", Q = "dismissableLayer.pointerDownOutside", V = "dismissableLayer.focusOutside", U, H = s.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), ae = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(e, t) {
    const {
      disableOutsidePointerEvents: c = !1,
      deferPointerDownOutside: d = !1,
      onEscapeKeyDown: f,
      onPointerDownOutside: E,
      onFocusOutside: p,
      onInteractOutside: D,
      onDismiss: m,
      ...b
    } = e, n = s.useContext(H), [a, y] = s.useState(null), l = a?.ownerDocument ?? globalThis?.document, [, O] = s.useState({}), w = q(t, y), P = Array.from(n.layers), [C] = [
      ...n.layersWithOutsidePointerEventsDisabled
    ].slice(-1), r = C ? P.indexOf(C) : -1, v = a ? P.indexOf(a) : -1, L = n.layersWithOutsidePointerEventsDisabled.size > 0, h = v >= r, _ = s.useRef(!1), M = j(
      (o) => {
        E?.(o), D?.(o), o.defaultPrevented || m?.();
      },
      {
        ownerDocument: l,
        deferPointerDownOutside: d,
        isDeferredPointerDownOutsideRef: _,
        dismissableSurfaces: n.dismissableSurfaces,
        shouldHandlePointerDownOutside: s.useCallback(
          (o) => {
            if (!(o instanceof Node))
              return !1;
            const R = [...n.branches].some(
              (W) => W.contains(o)
            );
            return h && !R;
          },
          [n.branches, h]
        )
      }
    ), B = z((o) => {
      if (d && _.current)
        return;
      const R = o.target;
      [...n.branches].some((K) => K.contains(R)) || (p?.(o), D?.(o), o.defaultPrevented || m?.());
    }, l), x = a ? v === P.length - 1 : !1, I = F((o) => {
      o.key === "Escape" && (f?.(o), !o.defaultPrevented && m && (o.preventDefault(), m()));
    });
    return s.useEffect(() => {
      if (x)
        return l.addEventListener("keydown", I, { capture: !0 }), () => l.removeEventListener("keydown", I, { capture: !0 });
    }, [l, x, I]), s.useEffect(() => {
      if (a)
        return c && (n.layersWithOutsidePointerEventsDisabled.size === 0 && (U = l.body.style.pointerEvents, l.body.style.pointerEvents = "none"), n.layersWithOutsidePointerEventsDisabled.add(a)), n.layers.add(a), T(), () => {
          c && (n.layersWithOutsidePointerEventsDisabled.delete(a), n.layersWithOutsidePointerEventsDisabled.size === 0 && (l.body.style.pointerEvents = U));
        };
    }, [a, l, c, n]), s.useEffect(() => () => {
      a && (n.layers.delete(a), n.layersWithOutsidePointerEventsDisabled.delete(a), T());
    }, [a, n]), s.useEffect(() => {
      const o = /* @__PURE__ */ u(() => O({}), "handleUpdate");
      return document.addEventListener(g, o), () => document.removeEventListener(g, o);
    }, []), /* @__PURE__ */ A(
      N.div,
      {
        ...b,
        ref: w,
        style: {
          pointerEvents: L ? h ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: S(e.onFocusCapture, B.onFocusCapture),
        onBlurCapture: S(e.onBlurCapture, B.onBlurCapture),
        onPointerDownCapture: S(
          e.onPointerDownCapture,
          M.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function Y() {
  const i = s.useContext(H), [e, t] = s.useState(null);
  return s.useEffect(() => {
    if (e)
      return i.dismissableSurfaces.add(e), () => {
        i.dismissableSurfaces.delete(e);
      };
  }, [e, i.dismissableSurfaces]), t;
}
u(Y, "useDismissableLayerSurface");
var Z = /* @__PURE__ */ u(() => !0, "IS_TRUE");
function j(i, e) {
  const {
    ownerDocument: t = globalThis?.document,
    deferPointerDownOutside: c = !1,
    isDeferredPointerDownOutsideRef: d,
    dismissableSurfaces: f,
    shouldHandlePointerDownOutside: E = Z
  } = e, p = F(i), D = s.useRef(!1), m = s.useRef(!1), b = s.useRef(/* @__PURE__ */ new Map()), n = s.useRef(() => {
  });
  return s.useEffect(() => {
    function a() {
      m.current = !1, d.current = !1, b.current.clear();
    }
    u(a, "resetOutsideInteraction");
    function y() {
      return Array.from(b.current.values()).some(Boolean);
    }
    u(y, "isOutsideInteractionIntercepted");
    function l(r) {
      if (!m.current)
        return;
      const v = r.target;
      v instanceof Node && [...f].some((h) => h.contains(v)) || b.current.set(r.type, !0), r.type === "click" && window.setTimeout(() => {
        m.current && n.current();
      }, 0);
    }
    u(l, "handleInteractionCapture");
    function O(r) {
      m.current && b.current.set(r.type, !1);
    }
    u(O, "handleInteractionBubble");
    const w = /* @__PURE__ */ u((r) => {
      if (r.target && !D.current) {
        let v = function() {
          t.removeEventListener("click", n.current);
          const h = y();
          a(), h || k(
            Q,
            p,
            L,
            { discrete: !0 }
          );
        };
        if (u(v, "handleAndDispatchPointerDownOutsideEvent"), !E(r.target)) {
          t.removeEventListener("click", n.current), a(), D.current = !1;
          return;
        }
        const L = { originalEvent: r };
        m.current = !0, d.current = c && r.button === 0, b.current.clear(), !c || r.button !== 0 ? v() : (t.removeEventListener("click", n.current), n.current = v, t.addEventListener("click", n.current, { once: !0 }));
      } else
        t.removeEventListener("click", n.current), a();
      D.current = !1;
    }, "handlePointerDown"), P = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const r of P)
      t.addEventListener(r, l, !0), t.addEventListener(r, O);
    const C = window.setTimeout(() => {
      t.addEventListener("pointerdown", w);
    }, 0);
    return () => {
      window.clearTimeout(C), t.removeEventListener("pointerdown", w), t.removeEventListener("click", n.current);
      for (const r of P)
        t.removeEventListener(r, l, !0), t.removeEventListener(r, O);
    };
  }, [
    t,
    p,
    c,
    d,
    f,
    E
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ u(() => D.current = !0, "onPointerDownCapture")
  };
}
u(j, "usePointerDownOutside");
function z(i, e = globalThis?.document) {
  const t = F(i), c = s.useRef(!1);
  return s.useEffect(() => {
    const d = /* @__PURE__ */ u((f) => {
      f.target && !c.current && k(V, t, { originalEvent: f }, {
        discrete: !1
      });
    }, "handleFocus");
    return e.addEventListener("focusin", d), () => e.removeEventListener("focusin", d);
  }, [e, t]), {
    onFocusCapture: /* @__PURE__ */ u(() => c.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ u(() => c.current = !1, "onBlurCapture")
  };
}
u(z, "useFocusOutside");
function T() {
  const i = new CustomEvent(g);
  document.dispatchEvent(i);
}
u(T, "dispatchUpdate");
function k(i, e, t, { discrete: c }) {
  const d = t.originalEvent.target, f = new CustomEvent(i, { bubbles: !1, cancelable: !0, detail: t });
  e && d.addEventListener(i, e, { once: !0 }), c ? X(d, f) : d.dispatchEvent(f);
}
u(k, "handleAndDispatchCustomEvent");
var ee = Object.defineProperty, te = (i, e) => ee(i, "name", { value: e, configurable: !0 }), ue = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ te(function(e, t) {
    const { container: c, ...d } = e, [f, E] = s.useState(!1);
    $(() => E(!0), []);
    const p = c || f && globalThis?.document?.body;
    return p ? G.createPortal(/* @__PURE__ */ A(N.div, { ...d, ref: t }), p) : null;
  }, "Portal")
);
export {
  ae as D,
  ue as P,
  Y as u
};
//# sourceMappingURL=index-DeQNeE2u.js.map
