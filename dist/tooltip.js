import { jsx as u, jsxs as H } from "react/jsx-runtime";
import * as a from "react";
import { c as K, u as W, a as C } from "./index-WHakdmwv.js";
import { u as S, a as J } from "./index-5Bhkapwi.js";
import { P as Q, D as Z } from "./index-DKZPUN5w.js";
import { u as ee } from "./index-CXwMLXQo.js";
import { c as G, R as te, A as oe, a as re, C as ne } from "./index-BjeYwP6P.js";
import { P as j } from "./index-DKIoJbzW.js";
import { P as ae } from "./index-CpDnqHCm.js";
import { R as se } from "./index-DfNPZZ8M.js";
import { c as ie } from "./utils-CwJPJKOE.js";
var [O, Fe] = K("Tooltip", [
  G
]), D = G(), F = "TooltipProvider", le = 700, A = "tooltip.open", [ce, k] = O(F), z = (e) => {
  const {
    __scopeTooltip: o,
    delayDuration: t = le,
    skipDelayDuration: r = 300,
    disableHoverableContent: n = !1,
    children: l
  } = e, i = a.useRef(!0), v = a.useRef(!1), s = a.useRef(0);
  return a.useEffect(() => {
    const d = s.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u(
    ce,
    {
      scope: o,
      isOpenDelayedRef: i,
      delayDuration: t,
      onOpen: a.useCallback(() => {
        window.clearTimeout(s.current), i.current = !1;
      }, []),
      onClose: a.useCallback(() => {
        window.clearTimeout(s.current), s.current = window.setTimeout(
          () => i.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: v,
      onPointerInTransitChange: a.useCallback((d) => {
        v.current = d;
      }, []),
      disableHoverableContent: n,
      children: l
    }
  );
};
z.displayName = F;
var R = "Tooltip", [ue, _] = O(R), $ = (e) => {
  const {
    __scopeTooltip: o,
    children: t,
    open: r,
    defaultOpen: n,
    onOpenChange: l,
    disableHoverableContent: i,
    delayDuration: v
  } = e, s = k(R, e.__scopeTooltip), d = D(o), [c, f] = a.useState(null), m = ee(), p = a.useRef(0), h = i ?? s.disableHoverableContent, g = v ?? s.delayDuration, T = a.useRef(!1), [x, y] = W({
    prop: r,
    defaultProp: n ?? !1,
    onChange: (N) => {
      N ? (s.onOpen(), document.dispatchEvent(new CustomEvent(A))) : s.onClose(), l?.(N);
    },
    caller: R
  }), w = a.useMemo(() => x ? T.current ? "delayed-open" : "instant-open" : "closed", [x]), P = a.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, T.current = !1, y(!0);
  }, [y]), E = a.useCallback(() => {
    window.clearTimeout(p.current), p.current = 0, y(!1);
  }, [y]), I = a.useCallback(() => {
    window.clearTimeout(p.current), p.current = window.setTimeout(() => {
      T.current = !0, y(!0), p.current = 0;
    }, g);
  }, [g, y]);
  return a.useEffect(() => () => {
    p.current && (window.clearTimeout(p.current), p.current = 0);
  }, []), /* @__PURE__ */ u(te, { ...d, children: /* @__PURE__ */ u(
    ue,
    {
      scope: o,
      contentId: m,
      open: x,
      stateAttribute: w,
      trigger: c,
      onTriggerChange: f,
      onTriggerEnter: a.useCallback(() => {
        s.isOpenDelayedRef.current ? I() : P();
      }, [s.isOpenDelayedRef, I, P]),
      onTriggerLeave: a.useCallback(() => {
        h ? E() : (window.clearTimeout(p.current), p.current = 0);
      }, [E, h]),
      onOpen: P,
      onClose: E,
      disableHoverableContent: h,
      children: t
    }
  ) });
};
$.displayName = R;
var L = "TooltipTrigger", B = a.forwardRef(
  (e, o) => {
    const { __scopeTooltip: t, ...r } = e, n = _(L, t), l = k(L, t), i = D(t), v = a.useRef(null), s = S(o, v, n.onTriggerChange), d = a.useRef(!1), c = a.useRef(!1), f = a.useCallback(() => d.current = !1, []);
    return a.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ u(re, { asChild: !0, ...i, children: /* @__PURE__ */ u(
      ae.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...r,
        ref: s,
        onPointerMove: C(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !c.current && !l.isPointerInTransitRef.current && (n.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: C(e.onPointerLeave, () => {
          n.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: C(e.onPointerDown, () => {
          n.open && n.onClose(), d.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: C(e.onFocus, () => {
          d.current || n.onOpen();
        }),
        onBlur: C(e.onBlur, n.onClose),
        onClick: C(e.onClick, n.onClose)
      }
    ) });
  }
);
B.displayName = L;
var M = "TooltipPortal", [pe, de] = O(M, {
  forceMount: void 0
}), U = (e) => {
  const { __scopeTooltip: o, forceMount: t, children: r, container: n } = e, l = _(M, o);
  return /* @__PURE__ */ u(pe, { scope: o, forceMount: t, children: /* @__PURE__ */ u(j, { present: t || l.open, children: /* @__PURE__ */ u(Q, { asChild: !0, container: n, children: r }) }) });
};
U.displayName = M;
var b = "TooltipContent", V = a.forwardRef(
  (e, o) => {
    const t = de(b, e.__scopeTooltip), { forceMount: r = t.forceMount, side: n = "top", ...l } = e, i = _(b, e.__scopeTooltip);
    return /* @__PURE__ */ u(j, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ u(Y, { side: n, ...l, ref: o }) : /* @__PURE__ */ u(fe, { side: n, ...l, ref: o }) });
  }
), fe = a.forwardRef((e, o) => {
  const t = _(b, e.__scopeTooltip), r = k(b, e.__scopeTooltip), n = a.useRef(null), l = S(o, n), [i, v] = a.useState(null), { trigger: s, onClose: d } = t, c = n.current, { onPointerInTransitChange: f } = r, m = a.useCallback(() => {
    v(null), f(!1);
  }, [f]), p = a.useCallback(
    (h, g) => {
      const T = h.currentTarget, x = { x: h.clientX, y: h.clientY }, y = Te(x, T.getBoundingClientRect()), w = ge(x, y), P = ye(g.getBoundingClientRect()), E = Ce([...w, ...P]);
      v(E), f(!0);
    },
    [f]
  );
  return a.useEffect(() => () => m(), [m]), a.useEffect(() => {
    if (s && c) {
      const h = (T) => p(T, c), g = (T) => p(T, s);
      return s.addEventListener("pointerleave", h), c.addEventListener("pointerleave", g), () => {
        s.removeEventListener("pointerleave", h), c.removeEventListener("pointerleave", g);
      };
    }
  }, [s, c, p, m]), a.useEffect(() => {
    if (i) {
      const h = (g) => {
        const T = g.target, x = { x: g.clientX, y: g.clientY }, y = s?.contains(T) || c?.contains(T), w = !xe(x, i);
        y ? m() : w && (m(), d());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [s, c, i, d, m]), /* @__PURE__ */ u(Y, { ...e, ref: l });
}), [ve, me] = O(R, { isInside: !1 }), he = J("TooltipContent"), Y = a.forwardRef(
  (e, o) => {
    const {
      __scopeTooltip: t,
      children: r,
      "aria-label": n,
      onEscapeKeyDown: l,
      onPointerDownOutside: i,
      ...v
    } = e, s = _(b, t), d = D(t), { onClose: c } = s;
    return a.useEffect(() => (document.addEventListener(A, c), () => document.removeEventListener(A, c)), [c]), a.useEffect(() => {
      if (s.trigger) {
        const f = (m) => {
          m.target?.contains(s.trigger) && c();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [s.trigger, c]), /* @__PURE__ */ u(
      Z,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: l,
        onPointerDownOutside: i,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ H(
          ne,
          {
            "data-state": s.stateAttribute,
            ...d,
            ...v,
            ref: o,
            style: {
              ...v.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ u(he, { children: r }),
              /* @__PURE__ */ u(ve, { scope: t, isInside: !0, children: /* @__PURE__ */ u(se, { id: s.contentId, role: "tooltip", children: n || r }) })
            ]
          }
        )
      }
    );
  }
);
V.displayName = b;
var q = "TooltipArrow", X = a.forwardRef(
  (e, o) => {
    const { __scopeTooltip: t, ...r } = e, n = D(t);
    return me(
      q,
      t
    ).isInside ? null : /* @__PURE__ */ u(oe, { ...n, ...r, ref: o });
  }
);
X.displayName = q;
function Te(e, o) {
  const t = Math.abs(o.top - e.y), r = Math.abs(o.bottom - e.y), n = Math.abs(o.right - e.x), l = Math.abs(o.left - e.x);
  switch (Math.min(t, r, n, l)) {
    case l:
      return "left";
    case n:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function ge(e, o, t = 5) {
  const r = [];
  switch (o) {
    case "top":
      r.push(
        { x: e.x - t, y: e.y + t },
        { x: e.x + t, y: e.y + t }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - t, y: e.y - t },
        { x: e.x + t, y: e.y - t }
      );
      break;
    case "left":
      r.push(
        { x: e.x + t, y: e.y - t },
        { x: e.x + t, y: e.y + t }
      );
      break;
    case "right":
      r.push(
        { x: e.x - t, y: e.y - t },
        { x: e.x - t, y: e.y + t }
      );
      break;
  }
  return r;
}
function ye(e) {
  const { top: o, right: t, bottom: r, left: n } = e;
  return [
    { x: n, y: o },
    { x: t, y: o },
    { x: t, y: r },
    { x: n, y: r }
  ];
}
function xe(e, o) {
  const { x: t, y: r } = e;
  let n = !1;
  for (let l = 0, i = o.length - 1; l < o.length; i = l++) {
    const v = o[l], s = o[i], d = v.x, c = v.y, f = s.x, m = s.y;
    c > r != m > r && t < (f - d) * (r - c) / (m - c) + d && (n = !n);
  }
  return n;
}
function Ce(e) {
  const o = e.slice();
  return o.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), be(o);
}
function be(e) {
  if (e.length <= 1) return e.slice();
  const o = [];
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    for (; o.length >= 2; ) {
      const l = o[o.length - 1], i = o[o.length - 2];
      if ((l.x - i.x) * (n.y - i.y) >= (l.y - i.y) * (n.x - i.x)) o.pop();
      else break;
    }
    o.push(n);
  }
  o.pop();
  const t = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const n = e[r];
    for (; t.length >= 2; ) {
      const l = t[t.length - 1], i = t[t.length - 2];
      if ((l.x - i.x) * (n.y - i.y) >= (l.y - i.y) * (n.x - i.x)) t.pop();
      else break;
    }
    t.push(n);
  }
  return t.pop(), o.length === 1 && t.length === 1 && o[0].x === t[0].x && o[0].y === t[0].y ? o : o.concat(t);
}
var we = z, Pe = $, Ee = B, Re = U, _e = V, Oe = X;
function De({
  delayDuration: e = 0,
  ...o
}) {
  return /* @__PURE__ */ u(
    we,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...o
    }
  );
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ u(De, { children: /* @__PURE__ */ u(Pe, { "data-slot": "tooltip", ...e }) });
}
function $e({
  ...e
}) {
  return /* @__PURE__ */ u(Ee, { "data-slot": "tooltip-trigger", ...e });
}
function Be({
  className: e,
  sideOffset: o = 0,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ u(Re, { children: /* @__PURE__ */ H(
    _e,
    {
      "data-slot": "tooltip-content",
      sideOffset: o,
      className: ie(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ u(Oe, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
export {
  ze as Tooltip,
  Be as TooltipContent,
  De as TooltipProvider,
  $e as TooltipTrigger
};
//# sourceMappingURL=tooltip.js.map
