import { jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { u as k, c as F, a as l } from "./index-WHakdmwv.js";
import { u as I } from "./index-5Bhkapwi.js";
import { c as H, R as U, a as $, C as W, A as z } from "./index-BjeYwP6P.js";
import { P as B, D as G } from "./index-DKZPUN5w.js";
import { P as T } from "./index-DKIoJbzW.js";
import { P as K } from "./index-CpDnqHCm.js";
import { c as j } from "./utils-CwJPJKOE.js";
var x, S = "HoverCard", [O, pe] = F(S, [
  H
]), b = H(), [V, w] = O(S), _ = (e) => {
  const {
    __scopeHoverCard: o,
    children: t,
    open: s,
    defaultOpen: i,
    onOpenChange: c,
    openDelay: f = 700,
    closeDelay: v = 300
  } = e, d = b(o), m = n.useRef(0), u = n.useRef(0), C = n.useRef(!1), p = n.useRef(!1), [h, r] = k({
    prop: s,
    defaultProp: i ?? !1,
    onChange: c,
    caller: S
  }), P = n.useCallback(() => {
    clearTimeout(u.current), m.current = window.setTimeout(() => r(!0), f);
  }, [f, r]), L = n.useCallback(() => {
    clearTimeout(m.current), !C.current && !p.current && (u.current = window.setTimeout(() => r(!1), v));
  }, [v, r]), M = n.useCallback(() => r(!1), [r]);
  return n.useEffect(() => () => {
    clearTimeout(m.current), clearTimeout(u.current);
  }, []), /* @__PURE__ */ a(
    V,
    {
      scope: o,
      open: h,
      onOpenChange: r,
      onOpen: P,
      onClose: L,
      onDismiss: M,
      hasSelectionRef: C,
      isPointerDownOnContentRef: p,
      children: /* @__PURE__ */ a(U, { ...d, children: t })
    }
  );
};
_.displayName = S;
var y = "HoverCardTrigger", N = n.forwardRef(
  (e, o) => {
    const { __scopeHoverCard: t, ...s } = e, i = w(y, t), c = b(t);
    return /* @__PURE__ */ a($, { asChild: !0, ...c, children: /* @__PURE__ */ a(
      K.a,
      {
        "data-state": i.open ? "open" : "closed",
        ...s,
        ref: o,
        onPointerEnter: l(e.onPointerEnter, R(i.onOpen)),
        onPointerLeave: l(e.onPointerLeave, R(i.onClose)),
        onFocus: l(e.onFocus, i.onOpen),
        onBlur: l(e.onBlur, i.onClose),
        onTouchStart: l(e.onTouchStart, (f) => f.preventDefault())
      }
    ) });
  }
);
N.displayName = y;
var E = "HoverCardPortal", [q, J] = O(E, {
  forceMount: void 0
}), D = (e) => {
  const { __scopeHoverCard: o, forceMount: t, children: s, container: i } = e, c = w(E, o);
  return /* @__PURE__ */ a(q, { scope: o, forceMount: t, children: /* @__PURE__ */ a(T, { present: t || c.open, children: /* @__PURE__ */ a(B, { asChild: !0, container: i, children: s }) }) });
};
D.displayName = E;
var g = "HoverCardContent", A = n.forwardRef(
  (e, o) => {
    const t = J(g, e.__scopeHoverCard), { forceMount: s = t.forceMount, ...i } = e, c = w(g, e.__scopeHoverCard);
    return /* @__PURE__ */ a(T, { present: s || c.open, children: /* @__PURE__ */ a(
      Q,
      {
        "data-state": c.open ? "open" : "closed",
        ...i,
        onPointerEnter: l(e.onPointerEnter, R(c.onOpen)),
        onPointerLeave: l(e.onPointerLeave, R(c.onClose)),
        ref: o
      }
    ) });
  }
);
A.displayName = g;
var Q = n.forwardRef((e, o) => {
  const {
    __scopeHoverCard: t,
    onEscapeKeyDown: s,
    onPointerDownOutside: i,
    onFocusOutside: c,
    onInteractOutside: f,
    ...v
  } = e, d = w(g, t), m = b(t), u = n.useRef(null), C = I(o, u), [p, h] = n.useState(!1);
  return n.useEffect(() => {
    if (p) {
      const r = document.body;
      return x = r.style.userSelect || r.style.webkitUserSelect, r.style.userSelect = "none", r.style.webkitUserSelect = "none", () => {
        r.style.userSelect = x, r.style.webkitUserSelect = x;
      };
    }
  }, [p]), n.useEffect(() => {
    if (u.current) {
      const r = () => {
        h(!1), d.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          document.getSelection()?.toString() !== "" && (d.hasSelectionRef.current = !0);
        });
      };
      return document.addEventListener("pointerup", r), () => {
        document.removeEventListener("pointerup", r), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [d.isPointerDownOnContentRef, d.hasSelectionRef]), n.useEffect(() => {
    u.current && Z(u.current).forEach((P) => P.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ a(
    G,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: f,
      onEscapeKeyDown: s,
      onPointerDownOutside: i,
      onFocusOutside: l(c, (r) => {
        r.preventDefault();
      }),
      onDismiss: d.onDismiss,
      children: /* @__PURE__ */ a(
        W,
        {
          ...m,
          ...v,
          onPointerDown: l(v.onPointerDown, (r) => {
            r.currentTarget.contains(r.target) && h(!0), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !0;
          }),
          ref: C,
          style: {
            ...v.style,
            userSelect: p ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: p ? "text" : void 0,
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
}), X = "HoverCardArrow", Y = n.forwardRef(
  (e, o) => {
    const { __scopeHoverCard: t, ...s } = e, i = b(t);
    return /* @__PURE__ */ a(z, { ...i, ...s, ref: o });
  }
);
Y.displayName = X;
function R(e) {
  return (o) => o.pointerType === "touch" ? void 0 : e();
}
function Z(e) {
  const o = [], t = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (s) => s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; t.nextNode(); ) o.push(t.currentNode);
  return o;
}
var ee = _, re = N, oe = D, te = A;
function fe({
  ...e
}) {
  return /* @__PURE__ */ a(ee, { "data-slot": "hover-card", ...e });
}
function ve({
  ...e
}) {
  return /* @__PURE__ */ a(re, { "data-slot": "hover-card-trigger", ...e });
}
function me({
  className: e,
  align: o = "center",
  sideOffset: t = 4,
  ...s
}) {
  return /* @__PURE__ */ a(oe, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ a(
    te,
    {
      "data-slot": "hover-card-content",
      align: o,
      sideOffset: t,
      className: j(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        e
      ),
      ...s
    }
  ) });
}
export {
  fe as HoverCard,
  me as HoverCardContent,
  ve as HoverCardTrigger
};
//# sourceMappingURL=hover-card.js.map
