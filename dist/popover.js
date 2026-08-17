import { jsx as n } from "react/jsx-runtime";
import * as p from "react";
import { c as M, b as T, a as m } from "./index-b757E0P6.js";
import { u as x, c as I } from "./index-DFmzheZp.js";
import { P as N, D as k } from "./index-DeQNeE2u.js";
import { h as y, R as $, u as z, F as G } from "./index-BRQPYD2P.js";
import { u as H } from "./index-BraAqWsy.js";
import { c as _, R as L, A as b, C as j } from "./index-DR2_SPIM.js";
import { P as w } from "./index-C7u_Yu0y.js";
import { P as K } from "./index-rT3N9N4T.js";
import { c as U } from "./utils-D7gXXjDs.js";
var V = Object.defineProperty, d = (a, o) => V(a, "name", { value: o, configurable: !0 }), A = "Popover", [E, Ao] = M(A, [
  _
]), C = _(), [Z, l] = E(A), q = /* @__PURE__ */ d((a) => {
  const {
    __scopePopover: o,
    children: s,
    open: r,
    defaultOpen: i,
    onOpenChange: t,
    modal: e = !1
  } = a, c = C(o), u = p.useRef(null), [P, f] = p.useState(!1), [R, v] = T({
    prop: r,
    defaultProp: i ?? !1,
    onChange: t,
    caller: A
  });
  return /* @__PURE__ */ n(L, { ...c, children: /* @__PURE__ */ n(
    Z,
    {
      scope: o,
      contentId: H(),
      triggerRef: u,
      open: R,
      onOpenChange: v,
      onOpenToggle: p.useCallback(() => v((g) => !g), [v]),
      hasCustomAnchor: P,
      onCustomAnchorAdd: p.useCallback(() => f(!0), []),
      onCustomAnchorRemove: p.useCallback(() => f(!1), []),
      modal: e,
      children: s
    }
  ) });
}, "Popover"), B = "PopoverAnchor", J = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ d(function(o, s) {
    const { __scopePopover: r, ...i } = o, t = l(B, r), e = C(r), { onCustomAnchorAdd: c, onCustomAnchorRemove: u } = t;
    return p.useEffect(() => (c(), () => u()), [c, u]), /* @__PURE__ */ n(b, { ...e, ...i, ref: s });
  }, "PopoverAnchor")
), Q = "PopoverTrigger", W = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ d(function(o, s) {
    const { __scopePopover: r, ...i } = o, t = l(Q, r), e = C(r), c = x(s, t.triggerRef), u = /* @__PURE__ */ n(
      K.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": O(t.open),
        ...i,
        ref: c,
        onClick: m(o.onClick, t.onOpenToggle)
      }
    );
    return t.hasCustomAnchor ? u : /* @__PURE__ */ n(b, { asChild: !0, ...e, children: u });
  }, "PopoverTrigger")
), F = "PopoverPortal", [X, Y] = E(F, {
  forceMount: void 0
}), oo = /* @__PURE__ */ d((a) => {
  const { __scopePopover: o, forceMount: s, children: r, container: i } = a, t = l(F, o);
  return /* @__PURE__ */ n(X, { scope: o, forceMount: s, children: /* @__PURE__ */ n(w, { present: s || t.open, children: /* @__PURE__ */ n(N, { asChild: !0, container: i, children: r }) }) });
}, "PopoverPortal"), h = "PopoverContent", eo = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(o, s) {
    const r = Y(h, o.__scopePopover), { forceMount: i = r.forceMount, ...t } = o, e = l(h, o.__scopePopover);
    return /* @__PURE__ */ n(w, { present: i || e.open, children: e.modal ? /* @__PURE__ */ n(ro, { ...t, ref: s }) : /* @__PURE__ */ n(no, { ...t, ref: s }) });
  }, "PopoverContent")
), to = I("PopoverContent.RemoveScroll"), ro = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(o, s) {
    const r = l(h, o.__scopePopover), i = p.useRef(null), t = x(s, i), e = p.useRef(!1);
    return p.useEffect(() => {
      const c = i.current;
      if (c) return y(c);
    }, []), /* @__PURE__ */ n($, { as: to, allowPinchZoom: !0, children: /* @__PURE__ */ n(
      S,
      {
        ...o,
        ref: t,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: m(o.onCloseAutoFocus, (c) => {
          c.preventDefault(), e.current || r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: m(
          o.onPointerDownOutside,
          (c) => {
            const u = c.detail.originalEvent, P = u.button === 0 && u.ctrlKey === !0, f = u.button === 2 || P;
            e.current = f;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: m(
          o.onFocusOutside,
          (c) => c.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "PopoverContentModal")
), no = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(o, s) {
    const r = l(h, o.__scopePopover), i = p.useRef(!1), t = p.useRef(!1);
    return /* @__PURE__ */ n(
      S,
      {
        ...o,
        ref: s,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (e) => {
          o.onCloseAutoFocus?.(e), e.defaultPrevented || (i.current || r.triggerRef.current?.focus(), e.preventDefault()), i.current = !1, t.current = !1;
        },
        onInteractOutside: (e) => {
          o.onInteractOutside?.(e), e.defaultPrevented || (i.current = !0, e.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const c = e.target;
          r.triggerRef.current?.contains(c) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && t.current && e.preventDefault();
        }
      }
    );
  }, "PopoverContentNonModal")
), S = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(o, s) {
    const {
      __scopePopover: r,
      trapFocus: i,
      onOpenAutoFocus: t,
      onCloseAutoFocus: e,
      disableOutsidePointerEvents: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: P,
      onFocusOutside: f,
      onInteractOutside: R,
      ...v
    } = o, g = l(h, r), D = C(r);
    return z(), /* @__PURE__ */ n(
      G,
      {
        asChild: !0,
        loop: !0,
        trapped: i,
        onMountAutoFocus: t,
        onUnmountAutoFocus: e,
        children: /* @__PURE__ */ n(
          k,
          {
            asChild: !0,
            disableOutsidePointerEvents: c,
            onInteractOutside: R,
            onEscapeKeyDown: u,
            onPointerDownOutside: P,
            onFocusOutside: f,
            onDismiss: () => g.onOpenChange(!1),
            deferPointerDownOutside: !0,
            children: /* @__PURE__ */ n(
              j,
              {
                "data-state": O(g.open),
                role: "dialog",
                id: g.contentId,
                ...D,
                ...v,
                ref: s,
                style: {
                  ...v.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }, "PopoverContentImpl")
);
function O(a) {
  return a ? "open" : "closed";
}
d(O, "getState");
var ao = q, so = J, co = W, io = oo, po = eo;
function Oo({
  ...a
}) {
  return /* @__PURE__ */ n(ao, { "data-slot": "popover", ...a });
}
function xo({
  ...a
}) {
  return /* @__PURE__ */ n(co, { "data-slot": "popover-trigger", ...a });
}
function _o({
  className: a,
  align: o = "center",
  sideOffset: s = 4,
  ...r
}) {
  return /* @__PURE__ */ n(io, { children: /* @__PURE__ */ n(
    po,
    {
      "data-slot": "popover-content",
      align: o,
      sideOffset: s,
      className: U(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        a
      ),
      ...r
    }
  ) });
}
function bo({
  ...a
}) {
  return /* @__PURE__ */ n(so, { "data-slot": "popover-anchor", ...a });
}
export {
  Oo as Popover,
  bo as PopoverAnchor,
  _o as PopoverContent,
  xo as PopoverTrigger
};
//# sourceMappingURL=popover.js.map
