import { jsx as s } from "react/jsx-runtime";
import * as r from "react";
import { c as L, b as A, a as p } from "./index-b757E0P6.js";
import { u as k } from "./index-DFmzheZp.js";
import { c as E, R as F, A as I, C as M } from "./index-DR2_SPIM.js";
import { P as U, D as $ } from "./index-DeQNeE2u.js";
import { P as O } from "./index-C7u_Yu0y.js";
import { P as z } from "./index-rT3N9N4T.js";
import { c as B } from "./utils-D7gXXjDs.js";
var W = Object.defineProperty, f = (t, e) => W(t, "name", { value: e, configurable: !0 }), S, x = "HoverCard", [_, ue] = L(x, [
  E
]), w = E(), [j, R] = _(x), G = /* @__PURE__ */ f((t) => {
  const {
    __scopeHoverCard: e,
    children: n,
    open: a,
    defaultOpen: u,
    onOpenChange: i,
    openDelay: d = 700,
    closeDelay: C = 300
  } = t, m = w(e), c = r.useRef(0), P = r.useRef(0), v = r.useRef(!1), b = r.useRef(!1), [h, l] = A({
    prop: a,
    defaultProp: u ?? !1,
    onChange: i,
    caller: x
  }), o = r.useCallback(() => {
    clearTimeout(P.current), c.current = window.setTimeout(() => l(!0), d);
  }, [d, l]), H = r.useCallback(() => {
    clearTimeout(c.current), !v.current && !b.current && (P.current = window.setTimeout(() => l(!1), C));
  }, [C, l]), N = r.useCallback(() => l(!1), [l]);
  return r.useEffect(() => () => {
    clearTimeout(c.current), clearTimeout(P.current);
  }, []), /* @__PURE__ */ s(
    j,
    {
      scope: e,
      open: h,
      onOpenChange: l,
      onOpen: o,
      onClose: H,
      onDismiss: N,
      hasSelectionRef: v,
      isPointerDownOnContentRef: b,
      children: /* @__PURE__ */ s(F, { ...m, children: n })
    }
  );
}, "HoverCard"), K = "HoverCardTrigger", V = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, n) {
    const { __scopeHoverCard: a, ...u } = e, i = R(K, a), d = w(a);
    return /* @__PURE__ */ s(I, { asChild: !0, ...d, children: /* @__PURE__ */ s(
      z.a,
      {
        "data-state": i.open ? "open" : "closed",
        ...u,
        ref: n,
        onPointerEnter: p(e.onPointerEnter, g(i.onOpen)),
        onPointerLeave: p(e.onPointerLeave, g(i.onClose)),
        onFocus: p(e.onFocus, i.onOpen),
        onBlur: p(e.onBlur, i.onClose),
        onTouchStart: p(e.onTouchStart, (C) => C.preventDefault())
      }
    ) });
  }, "HoverCardTrigger")
), D = "HoverCardPortal", [q, J] = _(D, {
  forceMount: void 0
}), Q = /* @__PURE__ */ f((t) => {
  const { __scopeHoverCard: e, forceMount: n, children: a, container: u } = t, i = R(D, e);
  return /* @__PURE__ */ s(q, { scope: e, forceMount: n, children: /* @__PURE__ */ s(O, { present: n || i.open, children: /* @__PURE__ */ s(U, { asChild: !0, container: u, children: a }) }) });
}, "HoverCardPortal"), T = "HoverCardContent", X = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, n) {
    const a = J(T, e.__scopeHoverCard), { forceMount: u = a.forceMount, ...i } = e, d = R(T, e.__scopeHoverCard);
    return /* @__PURE__ */ s(O, { present: u || d.open, children: /* @__PURE__ */ s(
      Y,
      {
        "data-state": d.open ? "open" : "closed",
        ...i,
        onPointerEnter: p(e.onPointerEnter, g(d.onOpen)),
        onPointerLeave: p(e.onPointerLeave, g(d.onClose)),
        ref: n
      }
    ) });
  }, "HoverCardContent")
), Y = /* @__PURE__ */ r.forwardRef(/* @__PURE__ */ f(function(e, n) {
  const {
    __scopeHoverCard: a,
    onEscapeKeyDown: u,
    onPointerDownOutside: i,
    onFocusOutside: d,
    onInteractOutside: C,
    ...m
  } = e, c = R(T, a), P = w(a), v = r.useRef(null), b = k(n, v), [h, l] = r.useState(!1);
  return r.useEffect(() => {
    if (h) {
      const o = document.body;
      return S = o.style.userSelect || o.style.webkitUserSelect, o.style.userSelect = "none", o.style.webkitUserSelect = "none", () => {
        o.style.userSelect = S, o.style.webkitUserSelect = S;
      };
    }
  }, [h]), r.useEffect(() => {
    if (v.current) {
      const o = /* @__PURE__ */ f(() => {
        l(!1), c.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          document.getSelection()?.toString() !== "" && (c.hasSelectionRef.current = !0);
        });
      }, "handlePointerUp");
      return document.addEventListener("pointerup", o), () => {
        document.removeEventListener("pointerup", o), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [c.isPointerDownOnContentRef, c.hasSelectionRef]), r.useEffect(() => {
    v.current && y(v.current).forEach((H) => H.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ s(
    $,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: C,
      onEscapeKeyDown: u,
      onPointerDownOutside: i,
      onFocusOutside: p(d, (o) => {
        o.preventDefault();
      }),
      onDismiss: c.onDismiss,
      children: /* @__PURE__ */ s(
        M,
        {
          ...P,
          ...m,
          onPointerDown: p(m.onPointerDown, (o) => {
            o.currentTarget.contains(o.target) && l(!0), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !0;
          }),
          ref: b,
          style: {
            ...m.style,
            userSelect: h ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: h ? "text" : void 0,
            "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      )
    }
  );
}, "HoverCardContentImpl"));
function g(t) {
  return (e) => e.pointerType === "touch" ? void 0 : t();
}
f(g, "excludeTouch");
function y(t) {
  const e = [], n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ f((a) => a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP, "acceptNode")
  });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
f(y, "getTabbableNodes");
var Z = G, ee = V, te = Q, oe = X;
function pe({
  ...t
}) {
  return /* @__PURE__ */ s(Z, { "data-slot": "hover-card", ...t });
}
function fe({
  ...t
}) {
  return /* @__PURE__ */ s(ee, { "data-slot": "hover-card-trigger", ...t });
}
function ve({
  className: t,
  align: e = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ s(te, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ s(
    oe,
    {
      "data-slot": "hover-card-content",
      align: e,
      sideOffset: n,
      className: B(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        t
      ),
      ...a
    }
  ) });
}
export {
  pe as HoverCard,
  ve as HoverCardContent,
  fe as HoverCardTrigger
};
//# sourceMappingURL=hover-card.js.map
