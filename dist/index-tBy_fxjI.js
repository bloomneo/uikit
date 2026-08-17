import { c as w } from "./createLucideIcon-DKEW4wQE.js";
import * as i from "react";
import { c as N, b as k, a as d, u as I } from "./index-b757E0P6.js";
import { u as P, c as L } from "./index-DFmzheZp.js";
import { u as m } from "./index-BraAqWsy.js";
import { P as G, u as j, D as X } from "./index-DeQNeE2u.js";
import { R as H, h as K, u as U, F as V } from "./index-BRQPYD2P.js";
import { P as _ } from "./index-C7u_Yu0y.js";
import { P as D } from "./index-rT3N9N4T.js";
import { jsx as s, Fragment as Y } from "react/jsx-runtime";
const ge = w("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
var Z = Object.defineProperty, u = (c, o) => Z(c, "name", { value: o, configurable: !0 }), O = "Dialog", [y, de] = N(O), [q, g] = y(O), pe = /* @__PURE__ */ u((c) => {
  const {
    __scopeDialog: o,
    children: a,
    open: n,
    defaultOpen: r,
    onOpenChange: t,
    modal: e = !0
  } = c, l = i.useRef(null), f = i.useRef(null), [h, v] = k({
    prop: n,
    defaultProp: r ?? !1,
    onChange: t,
    caller: O
  }), [T, x] = i.useState(0), [A, F] = i.useState(0);
  return /* @__PURE__ */ s(
    q,
    {
      scope: o,
      triggerRef: l,
      contentRef: f,
      contentId: m(),
      titleId: m(),
      descriptionId: m(),
      titlePresent: T > 0,
      descriptionPresent: A > 0,
      setTitleCount: x,
      setDescriptionCount: F,
      open: h,
      onOpenChange: v,
      onOpenToggle: i.useCallback(() => v((S) => !S), [v]),
      modal: e,
      children: a
    }
  );
}, "Dialog"), z = "DialogTrigger", De = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, ...r } = o, t = g(z, n), e = P(a, t.triggerRef);
    return /* @__PURE__ */ s(
      D.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": C(t.open),
        ...r,
        ref: e,
        onClick: d(o.onClick, t.onOpenToggle)
      }
    );
  }, "DialogTrigger")
), E = "DialogPortal", [B, b] = y(E, {
  forceMount: void 0
}), Ce = /* @__PURE__ */ u((c) => {
  const { __scopeDialog: o, forceMount: a, children: n, container: r } = c, t = g(E, o);
  return /* @__PURE__ */ s(B, { scope: o, forceMount: a, children: i.Children.map(n, (e) => /* @__PURE__ */ s(_, { present: a || t.open, children: /* @__PURE__ */ s(G, { asChild: !0, container: r, children: e }) })) });
}, "DialogPortal"), R = "DialogOverlay", ve = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ u(function(o, a) {
    const n = b(R, o.__scopeDialog), { forceMount: r = n.forceMount, ...t } = o, e = g(R, o.__scopeDialog);
    return e.modal ? /* @__PURE__ */ s(_, { present: r || e.open, children: /* @__PURE__ */ s(Q, { ...t, ref: a }) }) : null;
  }, "DialogOverlay")
), J = L("DialogOverlay.RemoveScroll"), Q = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, ...r } = o, t = g(R, n), e = j(), l = P(a, e);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ s(H, { as: J, allowPinchZoom: !0, shards: [t.contentRef], children: /* @__PURE__ */ s(
        D.div,
        {
          "data-state": C(t.open),
          ...r,
          ref: l,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), p = "DialogContent", me = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ u(function(o, a) {
    const n = b(p, o.__scopeDialog), { forceMount: r = n.forceMount, ...t } = o, e = g(p, o.__scopeDialog);
    return /* @__PURE__ */ s(_, { present: r || e.open, children: e.modal ? /* @__PURE__ */ s(W, { ...t, ref: a }) : /* @__PURE__ */ s($, { ...t, ref: a }) });
  }, "DialogContent")
), W = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, a) {
    const n = g(p, o.__scopeDialog), r = i.useRef(null), t = P(a, n.contentRef, r);
    return i.useEffect(() => {
      const e = r.current;
      if (e) return K(e);
    }, []), /* @__PURE__ */ s(
      M,
      {
        ...o,
        ref: t,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        onCloseAutoFocus: d(o.onCloseAutoFocus, (e) => {
          e.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: d(o.onPointerDownOutside, (e) => {
          const l = e.detail.originalEvent, f = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || f) && e.preventDefault();
        }),
        onFocusOutside: d(
          o.onFocusOutside,
          (e) => e.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), $ = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, a) {
    const n = g(p, o.__scopeDialog), r = i.useRef(!1), t = i.useRef(!1);
    return /* @__PURE__ */ s(
      M,
      {
        ...o,
        ref: a,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (e) => {
          o.onCloseAutoFocus?.(e), e.defaultPrevented || (r.current || n.triggerRef.current?.focus(), e.preventDefault()), r.current = !1, t.current = !1;
        },
        onInteractOutside: (e) => {
          o.onInteractOutside?.(e), e.defaultPrevented || (r.current = !0, e.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const l = e.target;
          n.triggerRef.current?.contains(l) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && t.current && e.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), M = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: t, onCloseAutoFocus: e, ...l } = o, f = g(p, n);
    return U(), /* @__PURE__ */ s(Y, { children: /* @__PURE__ */ s(
      V,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: t,
        onUnmountAutoFocus: e,
        children: /* @__PURE__ */ s(
          X,
          {
            role: "dialog",
            id: f.contentId,
            "aria-describedby": f.descriptionPresent ? f.descriptionId : void 0,
            "aria-labelledby": f.titlePresent ? f.titleId : void 0,
            "data-state": C(f.open),
            ...l,
            ref: a,
            deferPointerDownOutside: !0,
            onDismiss: () => f.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), ee = "DialogTitle", Re = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, ...r } = o, t = g(ee, n), { setTitleCount: e } = t;
    return I(() => (e((l) => l + 1), () => e((l) => l - 1)), [e]), /* @__PURE__ */ s(D.h2, { id: t.titleId, ...r, ref: a });
  }, "DialogTitle")
), oe = "DialogDescription", Pe = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, ...r } = o, t = g(oe, n), { setDescriptionCount: e } = t;
    return I(() => (e((l) => l + 1), () => e((l) => l - 1)), [e]), /* @__PURE__ */ s(D.p, { id: t.descriptionId, ...r, ref: a });
  }, "DialogDescription")
), te = "DialogClose", _e = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ u(function(o, a) {
    const { __scopeDialog: n, ...r } = o, t = g(te, n);
    return /* @__PURE__ */ s(
      D.button,
      {
        type: "button",
        ...r,
        ref: a,
        onClick: d(o.onClick, () => t.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function C(c) {
  return c ? "open" : "closed";
}
u(C, "getState");
export {
  pe as D,
  ge as X,
  _e as a,
  me as b,
  Pe as c,
  ve as d,
  Ce as e,
  Re as f,
  De as g
};
//# sourceMappingURL=index-tBy_fxjI.js.map
