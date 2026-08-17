import { jsx as c, jsxs as G } from "react/jsx-runtime";
import * as i from "react";
import { c as J, b as Q, a as w, u as W } from "./index-b757E0P6.js";
import { u as j, a as Z } from "./index-DFmzheZp.js";
import { P as ee, D as te } from "./index-DeQNeE2u.js";
import { u as oe } from "./index-BraAqWsy.js";
import { c as F, R as re, A as ne, C as ie, a as ae } from "./index-DR2_SPIM.js";
import { P as z } from "./index-C7u_Yu0y.js";
import { P as se } from "./index-rT3N9N4T.js";
import { R as le } from "./index-DCDi3jON.js";
import { c as ce } from "./utils-D7gXXjDs.js";
var ue = Object.defineProperty, v = (o, e) => ue(o, "name", { value: e, configurable: !0 }), [I, Be] = J("Tooltip", [
  F
]), L = F(), pe = "TooltipProvider", de = 700, A = "tooltip.open", [fe, S] = I(pe), ve = /* @__PURE__ */ v((o) => {
  const {
    __scopeTooltip: e,
    delayDuration: t = de,
    skipDelayDuration: r = 300,
    disableHoverableContent: a = !1,
    children: n
  } = o, s = i.useRef(!0), T = i.useRef(!1), u = i.useRef(0);
  return i.useEffect(() => {
    const p = u.current;
    return () => window.clearTimeout(p);
  }, []), /* @__PURE__ */ c(
    fe,
    {
      scope: e,
      isOpenDelayedRef: s,
      delayDuration: t,
      onOpen: i.useCallback(() => {
        r <= 0 || (window.clearTimeout(u.current), s.current = !1);
      }, [r]),
      onClose: i.useCallback(() => {
        r <= 0 || (window.clearTimeout(u.current), u.current = window.setTimeout(
          () => s.current = !0,
          r
        ));
      }, [r]),
      isPointerInTransitRef: T,
      onPointerInTransitChange: i.useCallback((p) => {
        T.current = p;
      }, []),
      disableHoverableContent: a,
      children: n
    }
  );
}, "TooltipProvider"), k = "Tooltip", [Te, _] = I(k), he = /* @__PURE__ */ v((o) => {
  const {
    __scopeTooltip: e,
    children: t,
    open: r,
    defaultOpen: a,
    onOpenChange: n,
    disableHoverableContent: s,
    delayDuration: T
  } = o, u = S(k, o.__scopeTooltip), p = L(e), [d, h] = i.useState(null), [f, g] = i.useState(void 0), x = oe(), l = i.useRef(0), m = s ?? u.disableHoverableContent, C = T ?? u.delayDuration, b = i.useRef(!1), [P, y] = Q({
    prop: r,
    defaultProp: a ?? !1,
    onChange: /* @__PURE__ */ v((H) => {
      H ? (u.onOpen(), document.dispatchEvent(new CustomEvent(A))) : u.onClose(), n?.(H);
    }, "onChange"),
    caller: k
  }), O = i.useMemo(() => P ? b.current ? "delayed-open" : "instant-open" : "closed", [P]), E = i.useCallback(() => {
    window.clearTimeout(l.current), l.current = 0, b.current = !1, y(!0);
  }, [y]), D = i.useCallback(() => {
    window.clearTimeout(l.current), l.current = 0, y(!1);
  }, [y]), M = i.useCallback(() => {
    window.clearTimeout(l.current), l.current = window.setTimeout(() => {
      b.current = !0, y(!0), l.current = 0;
    }, C);
  }, [C, y]);
  return i.useEffect(() => () => {
    l.current && (window.clearTimeout(l.current), l.current = 0);
  }, []), /* @__PURE__ */ c(re, { ...p, children: /* @__PURE__ */ c(
    Te,
    {
      scope: e,
      contentId: f ?? x,
      setContentId: g,
      open: P,
      stateAttribute: O,
      trigger: d,
      onTriggerChange: h,
      onTriggerEnter: i.useCallback(() => {
        u.isOpenDelayedRef.current ? M() : E();
      }, [u.isOpenDelayedRef, M, E]),
      onTriggerLeave: i.useCallback(() => {
        m ? D() : (window.clearTimeout(l.current), l.current = 0);
      }, [D, m]),
      onOpen: E,
      onClose: D,
      disableHoverableContent: m,
      children: t
    }
  ) });
}, "Tooltip"), N = "TooltipTrigger", ge = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ v(function(e, t) {
    const { __scopeTooltip: r, ...a } = e, n = _(N, r), s = S(N, r), T = L(r), u = i.useRef(null), p = j(t, u, n.onTriggerChange), d = i.useRef(!1), h = i.useRef(!1), f = i.useCallback(() => d.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ c(ne, { asChild: !0, ...T, children: /* @__PURE__ */ c(
      se.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...a,
        ref: p,
        onPointerMove: w(e.onPointerMove, (g) => {
          g.pointerType !== "touch" && !h.current && !s.isPointerInTransitRef.current && (n.onTriggerEnter(), h.current = !0);
        }),
        onPointerLeave: w(e.onPointerLeave, () => {
          n.onTriggerLeave(), h.current = !1;
        }),
        onPointerDown: w(e.onPointerDown, () => {
          n.open && n.onClose(), d.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: w(e.onFocus, () => {
          d.current || n.onOpen();
        }),
        onBlur: w(e.onBlur, n.onClose),
        onClick: w(e.onClick, n.onClose)
      }
    ) });
  }, "TooltipTrigger")
), $ = "TooltipPortal", [me, Ce] = I($, {
  forceMount: void 0
}), xe = /* @__PURE__ */ v((o) => {
  const { __scopeTooltip: e, forceMount: t, children: r, container: a } = o, n = _($, e);
  return /* @__PURE__ */ c(me, { scope: e, forceMount: t, children: /* @__PURE__ */ c(z, { present: t || n.open, children: /* @__PURE__ */ c(ee, { asChild: !0, container: a, children: r }) }) });
}, "TooltipPortal"), R = "TooltipContent", ye = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ v(function(e, t) {
    const r = Ce(R, e.__scopeTooltip), { forceMount: a = r.forceMount, side: n = "top", ...s } = e, T = _(R, e.__scopeTooltip);
    return /* @__PURE__ */ c(z, { present: a || T.open, children: T.disableHoverableContent ? /* @__PURE__ */ c(B, { side: n, ...s, ref: t }) : /* @__PURE__ */ c(be, { side: n, ...s, ref: t }) });
  }, "TooltipContent")
), be = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ v(function(e, t) {
  const r = _(R, e.__scopeTooltip), a = S(R, e.__scopeTooltip), n = i.useRef(null), s = j(t, n), [T, u] = i.useState(null), { trigger: p, onClose: d } = r, h = n.current, { onPointerInTransitChange: f } = a, g = i.useCallback(() => {
    u(null), f(!1);
  }, [f]), x = i.useCallback(
    (l, m) => {
      const C = l.currentTarget, b = { x: l.clientX, y: l.clientY }, P = U(b, C.getBoundingClientRect()), y = Y(b, P), O = q(m.getBoundingClientRect()), E = K([...y, ...O]);
      u(E), f(!0);
    },
    [f]
  );
  return i.useEffect(() => () => g(), [g]), i.useEffect(() => {
    if (p && h) {
      const l = /* @__PURE__ */ v((C) => x(C, h), "handleTriggerLeave"), m = /* @__PURE__ */ v((C) => x(C, p), "handleContentLeave");
      return p.addEventListener("pointerleave", l), h.addEventListener("pointerleave", m), () => {
        p.removeEventListener("pointerleave", l), h.removeEventListener("pointerleave", m);
      };
    }
  }, [p, h, x, g]), i.useEffect(() => {
    if (T) {
      const l = /* @__PURE__ */ v((m) => {
        const C = m.target, b = { x: m.clientX, y: m.clientY }, P = p?.contains(C) || h?.contains(C), y = !X(b, T);
        P ? g() : y && (g(), d());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", l), () => document.removeEventListener("pointermove", l);
    }
  }, [p, h, T, d, g]), /* @__PURE__ */ c(B, { ...e, ref: s });
}, "TooltipContentHoverable")), Pe = Z("TooltipContent"), B = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, t) {
    const {
      __scopeTooltip: r,
      children: a,
      "aria-label": n,
      id: s,
      onEscapeKeyDown: T,
      onPointerDownOutside: u,
      ...p
    } = e, d = _(R, r), h = L(r), { onClose: f } = d;
    i.useEffect(() => (document.addEventListener(A, f), () => document.removeEventListener(A, f)), [f]), i.useEffect(() => {
      if (d.trigger) {
        const x = /* @__PURE__ */ v((l) => {
          l.target instanceof Node && l.target.contains(d.trigger) && f();
        }, "handleScroll");
        return window.addEventListener("scroll", x, { capture: !0 }), () => window.removeEventListener("scroll", x, { capture: !0 });
      }
    }, [d.trigger, f]);
    const { setContentId: g } = d;
    return W(() => (g(s), () => {
      g(void 0);
    }), [s, g]), /* @__PURE__ */ c(
      te,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: T,
        onPointerDownOutside: u,
        onFocusOutside: (x) => x.preventDefault(),
        onDismiss: f,
        children: /* @__PURE__ */ G(
          ie,
          {
            "data-state": d.stateAttribute,
            role: n ? void 0 : "tooltip",
            id: n ? void 0 : d.contentId,
            ...h,
            ...p,
            ref: t,
            style: {
              ...p.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ c(Pe, { children: a }),
              n ? /* @__PURE__ */ c(le, { id: d.contentId, role: "tooltip", children: n }) : null
            ]
          }
        )
      }
    );
  }, "TooltipContentImpl")
), we = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ v(function(e, t) {
    const { __scopeTooltip: r, ...a } = e, n = L(r);
    return /* @__PURE__ */ c(ae, { ...n, ...a, ref: t });
  }, "TooltipArrow")
);
function U(o, e) {
  const t = Math.abs(e.top - o.y), r = Math.abs(e.bottom - o.y), a = Math.abs(e.right - o.x), n = Math.abs(e.left - o.x);
  switch (Math.min(t, r, a, n)) {
    case n:
      return "left";
    case a:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
v(U, "getExitSideFromRect");
function Y(o, e, t = 5) {
  const r = [];
  switch (e) {
    case "top":
      r.push(
        { x: o.x - t, y: o.y + t },
        { x: o.x + t, y: o.y + t }
      );
      break;
    case "bottom":
      r.push(
        { x: o.x - t, y: o.y - t },
        { x: o.x + t, y: o.y - t }
      );
      break;
    case "left":
      r.push(
        { x: o.x + t, y: o.y - t },
        { x: o.x + t, y: o.y + t }
      );
      break;
    case "right":
      r.push(
        { x: o.x - t, y: o.y - t },
        { x: o.x - t, y: o.y + t }
      );
      break;
  }
  return r;
}
v(Y, "getPaddedExitPoints");
function q(o) {
  const { top: e, right: t, bottom: r, left: a } = o;
  return [
    { x: a, y: e },
    { x: t, y: e },
    { x: t, y: r },
    { x: a, y: r }
  ];
}
v(q, "getPointsFromRect");
function X(o, e) {
  const { x: t, y: r } = o;
  let a = !1;
  for (let n = 0, s = e.length - 1; n < e.length; s = n++) {
    const T = e[n], u = e[s], p = T.x, d = T.y, h = u.x, f = u.y;
    d > r != f > r && t < (h - p) * (r - d) / (f - d) + p && (a = !a);
  }
  return a;
}
v(X, "isPointInPolygon");
function K(o) {
  const e = o.slice();
  return e.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), V(e);
}
v(K, "getHull");
function V(o) {
  if (o.length <= 1) return o.slice();
  const e = [];
  for (let r = 0; r < o.length; r++) {
    const a = o[r];
    for (; e.length >= 2; ) {
      const n = e[e.length - 1], s = e[e.length - 2];
      if ((n.x - s.x) * (a.y - s.y) >= (n.y - s.y) * (a.x - s.x)) e.pop();
      else break;
    }
    e.push(a);
  }
  e.pop();
  const t = [];
  for (let r = o.length - 1; r >= 0; r--) {
    const a = o[r];
    for (; t.length >= 2; ) {
      const n = t[t.length - 1], s = t[t.length - 2];
      if ((n.x - s.x) * (a.y - s.y) >= (n.y - s.y) * (a.x - s.x)) t.pop();
      else break;
    }
    t.push(a);
  }
  return t.pop(), e.length === 1 && t.length === 1 && e[0].x === t[0].x && e[0].y === t[0].y ? e : e.concat(t);
}
v(V, "getHullPresorted");
var Ee = ve, Re = he, _e = ge, Le = xe, Oe = ye, De = we;
function Ae({
  delayDuration: o = 0,
  ...e
}) {
  return /* @__PURE__ */ c(
    Ee,
    {
      "data-slot": "tooltip-provider",
      delayDuration: o,
      ...e
    }
  );
}
function Ue({
  ...o
}) {
  return /* @__PURE__ */ c(Ae, { children: /* @__PURE__ */ c(Re, { "data-slot": "tooltip", ...o }) });
}
function Ye({
  ...o
}) {
  return /* @__PURE__ */ c(_e, { "data-slot": "tooltip-trigger", ...o });
}
function qe({
  className: o,
  sideOffset: e = 0,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ c(Le, { children: /* @__PURE__ */ G(
    Oe,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      className: ce(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        o
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ c(De, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
export {
  Ue as Tooltip,
  qe as TooltipContent,
  Ae as TooltipProvider,
  Ye as TooltipTrigger
};
//# sourceMappingURL=tooltip.js.map
