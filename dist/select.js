import { jsx as c, jsxs as re, Fragment as ye } from "react/jsx-runtime";
import * as o from "react";
import * as Le from "react-dom";
import { u as q, a as E, c as $e, b as Ee } from "./index-b757E0P6.js";
import { c as je, u as Ge } from "./index-S1vMr2en.js";
import { u as U, c as Ye } from "./index-DFmzheZp.js";
import { P as qe, D as Xe } from "./index-DeQNeE2u.js";
import { h as Ze, u as Je, R as Qe, F as et } from "./index-BRQPYD2P.js";
import { u as be } from "./index-BraAqWsy.js";
import { c as Ae, A as tt, C as ot, R as nt } from "./index-DR2_SPIM.js";
import { P as rt } from "./index-C7u_Yu0y.js";
import { P as D } from "./index-rT3N9N4T.js";
import { u as Ie } from "./index-CRNjeP0c.js";
import { V as ct } from "./index-DCDi3jON.js";
import { c as X } from "./utils-D7gXXjDs.js";
import { c as ke } from "./createLucideIcon-DKEW4wQE.js";
import { C as lt } from "./check-CT10FDO-.js";
const Be = ke("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
const st = ke("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
var at = Object.defineProperty, it = (n, e) => at(n, "name", { value: e, configurable: !0 });
function xe(n, [e, r]) {
  return Math.min(r, Math.max(e, n));
}
it(xe, "clamp");
var dt = Object.defineProperty, ut = (n, e) => dt(n, "name", { value: e, configurable: !0 });
function Ve(n) {
  const e = o.useRef({ value: n, previous: n });
  return o.useMemo(() => (e.current.value !== n && (e.current.previous = e.current.value, e.current.value = n), e.current.previous), [n]);
}
ut(Ve, "usePrevious");
var pt = Object.defineProperty, v = (n, e) => pt(n, "name", { value: e, configurable: !0 }), ft = [" ", "Enter", "ArrowUp", "ArrowDown"], mt = [" ", "Enter"], de = "Select", [he, ve, ht] = je(de), [ce, vo] = $e(de, [
  ht,
  Ae
]), Pe = Ae(), [vt, Z] = ce(de), [gt, St] = ce(de);
function He(n) {
  const {
    __scopeSelect: e,
    children: r,
    open: t,
    defaultOpen: u,
    onOpenChange: a,
    value: f,
    defaultValue: i,
    onValueChange: l,
    dir: s,
    name: S,
    autoComplete: x,
    disabled: C,
    required: P,
    form: y,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render: T
  } = n, d = Pe(e), [g, w] = o.useState(null), [h, p] = o.useState(null), [L, N] = o.useState(!1), J = Ge(s), [A, B] = Ee({
    prop: t,
    defaultProp: u ?? !1,
    onChange: a,
    caller: de
  }), [Q, $] = Ee({
    prop: f,
    defaultProp: i,
    onChange: l,
    caller: de
  }), z = o.useRef(null), W = o.useRef(Q);
  o.useEffect(() => {
    const M = y ? g?.ownerDocument.getElementById(y) : g?.form;
    if (M instanceof HTMLFormElement) {
      const F = /* @__PURE__ */ v(() => $(W.current), "reset");
      return M.addEventListener("reset", F), () => M.removeEventListener("reset", F);
    }
  }, [y, g, $]);
  const ee = g ? !!y || !!g.closest("form") : !0, [K, V] = o.useState(/* @__PURE__ */ new Set()), j = be(), G = Array.from(K).map((M) => M.props.value).join(";"), Y = o.useCallback((M) => {
    V((F) => new Set(F).add(M));
  }, []), H = o.useCallback((M) => {
    V((F) => {
      const ae = new Set(F);
      return ae.delete(M), ae;
    });
  }, []), se = {
    required: P,
    trigger: g,
    onTriggerChange: w,
    valueNode: h,
    onValueNodeChange: p,
    valueNodeHasChildren: L,
    onValueNodeHasChildrenChange: N,
    contentId: j,
    value: Q,
    onValueChange: $,
    open: A,
    onOpenChange: B,
    dir: J,
    triggerPointerDownPosRef: z,
    disabled: C,
    name: S,
    autoComplete: x,
    form: y,
    nativeOptions: K,
    nativeSelectKey: G,
    isFormControl: ee
  };
  return /* @__PURE__ */ c(nt, { ...d, children: /* @__PURE__ */ c(vt, { scope: e, ...se, children: /* @__PURE__ */ c(he.Provider, { scope: e, children: /* @__PURE__ */ c(
    gt,
    {
      scope: e,
      onNativeOptionAdd: Y,
      onNativeOptionRemove: H,
      children: We(T) ? T(se) : r
    }
  ) }) }) });
}
v(He, "SelectProvider");
var wt = /* @__PURE__ */ v((n) => {
  const { __scopeSelect: e, children: r, ...t } = n;
  return /* @__PURE__ */ c(
    He,
    {
      __scopeSelect: e,
      ...t,
      internal_do_not_use_render: ({ isFormControl: u }) => /* @__PURE__ */ re(ye, { children: [
        r,
        u ? /* @__PURE__ */ c(
          Zt,
          {
            __scopeSelect: e
          }
        ) : null
      ] })
    }
  );
}, "Select"), xt = "SelectTrigger", Ct = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, disabled: u = !1, ...a } = e, f = Pe(t), i = Z(xt, t), l = i.disabled || u, s = U(r, i.onTriggerChange), S = ve(t), x = o.useRef("touch"), [C, P, y] = _e((d) => {
      const g = S().filter((p) => !p.disabled), w = g.find((p) => p.value === i.value), h = Re(g, d, w);
      h !== void 0 && i.onValueChange(h.value);
    }), T = /* @__PURE__ */ v((d) => {
      l || (i.onOpenChange(!0), y()), d && (i.triggerPointerDownPosRef.current = {
        x: Math.round(d.pageX),
        y: Math.round(d.pageY)
      });
    }, "handleOpen");
    return /* @__PURE__ */ c(tt, { asChild: !0, ...f, children: /* @__PURE__ */ c(
      D.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.open ? i.contentId : void 0,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": pe(i.value) ? "" : void 0,
        ...a,
        ref: s,
        onClick: E(a.onClick, (d) => {
          d.currentTarget.focus(), x.current !== "mouse" && T(d);
        }),
        onPointerDown: E(a.onPointerDown, (d) => {
          x.current = d.pointerType;
          const g = d.target;
          g.hasPointerCapture(d.pointerId) && g.releasePointerCapture(d.pointerId), d.button === 0 && d.ctrlKey === !1 && d.pointerType === "mouse" && (T(d), d.preventDefault());
        }),
        onKeyDown: E(a.onKeyDown, (d) => {
          const g = C.current !== "";
          !(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && P(d.key), !(g && d.key === " ") && ft.includes(d.key) && (T(), d.preventDefault());
        })
      }
    ) });
  }, "SelectTrigger")
), yt = "SelectValue", bt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, className: u, style: a, children: f, placeholder: i = "", ...l } = e, s = Z(yt, t), { onValueNodeHasChildrenChange: S } = s, x = f !== void 0, C = U(r, s.onValueNodeChange);
    q(() => {
      S(x);
    }, [S, x]);
    const P = pe(s.value);
    return /* @__PURE__ */ c(
      D.span,
      {
        ...l,
        asChild: P ? !1 : l.asChild,
        ref: C,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ c(o.Fragment, { children: P ? i : f }, P ? "placeholder" : "value")
      }
    );
  }, "SelectValue")
), It = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, children: u, ...a } = e;
    return /* @__PURE__ */ c(D.span, { "aria-hidden": !0, ...a, ref: r, children: u || "▼" });
  }, "SelectIcon")
), Pt = "SelectPortal", [Tt, _t] = ce(Pt, {
  forceMount: void 0
}), Rt = /* @__PURE__ */ v((n) => {
  const { __scopeSelect: e, forceMount: r, ...t } = n;
  return /* @__PURE__ */ c(Tt, { scope: n.__scopeSelect, forceMount: r, children: /* @__PURE__ */ c(qe, { asChild: !0, ...t }) });
}, "SelectPortal"), ne = "SelectContent", Et = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const t = _t(ne, e.__scopeSelect), { forceMount: u = t.forceMount, ...a } = e, f = Z(ne, e.__scopeSelect), [i, l] = o.useState();
    return q(() => {
      l(new DocumentFragment());
    }, []), /* @__PURE__ */ c(rt, { present: u || f.open, children: ({ present: s }) => s ? /* @__PURE__ */ c(Ot, { ...a, ref: r }) : /* @__PURE__ */ c(Nt, { ...a, fragment: i }) });
  }, "SelectContent")
), Nt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const { __scopeSelect: t, children: u, fragment: a } = e;
  return a ? Le.createPortal(
    /* @__PURE__ */ c(Fe, { scope: t, children: /* @__PURE__ */ c(he.Slot, { scope: t, children: /* @__PURE__ */ c("div", { ref: r, children: u }) }) }),
    a
  ) : null;
}, "SelectContentFragment")), k = 10, [Fe, le] = ce(ne), Mt = Ye("SelectContent.RemoveScroll"), Ot = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t } = e, {
      position: u = "item-aligned",
      onCloseAutoFocus: a,
      onEscapeKeyDown: f,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: l,
      sideOffset: s,
      align: S,
      alignOffset: x,
      arrowPadding: C,
      collisionBoundary: P,
      collisionPadding: y,
      sticky: T,
      hideWhenDetached: d,
      avoidCollisions: g,
      //
      ...w
    } = e, h = Z(ne, t), [p, L] = o.useState(null), [N, J] = o.useState(null), A = U(r, L), [B, Q] = o.useState(null), [$, z] = o.useState(
      null
    ), W = ve(t), [ee, K] = o.useState(!1), V = o.useRef(!1);
    o.useEffect(() => {
      if (p) return Ze(p);
    }, [p]), Je();
    const j = o.useCallback(
      (m) => {
        const [_, ...O] = W().map((R) => R.ref.current), [b] = O.slice(-1), I = document.activeElement;
        for (const R of m)
          if (R === I || (R?.scrollIntoView({ block: "nearest" }), R === _ && N && (N.scrollTop = 0), R === b && N && (N.scrollTop = N.scrollHeight), R?.focus(), document.activeElement !== I)) return;
      },
      [W, N]
    ), G = o.useCallback(
      () => j([B, p]),
      [j, B, p]
    );
    o.useEffect(() => {
      ee && G();
    }, [ee, G]);
    const { onOpenChange: Y, triggerPointerDownPosRef: H } = h;
    o.useEffect(() => {
      if (p) {
        let m = { x: 0, y: 0 };
        const _ = /* @__PURE__ */ v((b) => {
          m = {
            x: Math.abs(Math.round(b.pageX) - (H.current?.x ?? 0)),
            y: Math.abs(Math.round(b.pageY) - (H.current?.y ?? 0))
          };
        }, "handlePointerMove"), O = /* @__PURE__ */ v((b) => {
          m.x <= 10 && m.y <= 10 ? b.preventDefault() : b.composedPath().includes(p) || Y(!1), document.removeEventListener("pointermove", _), H.current = null;
        }, "handlePointerUp");
        return H.current !== null && (document.addEventListener("pointermove", _), document.addEventListener("pointerup", O, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", _), document.removeEventListener("pointerup", O, { capture: !0 });
        };
      }
    }, [p, Y, H]), o.useEffect(() => {
      const m = /* @__PURE__ */ v(() => Y(!1), "close");
      return window.addEventListener("blur", m), window.addEventListener("resize", m), () => {
        window.removeEventListener("blur", m), window.removeEventListener("resize", m);
      };
    }, [Y]);
    const [se, M] = _e((m) => {
      const _ = W().filter((I) => !I.disabled), O = _.find((I) => I.ref.current === document.activeElement), b = Re(_, m, O);
      b && setTimeout(() => b.ref.current?.focus());
    }), F = o.useCallback(
      (m, _, O) => {
        const b = !V.current && !O;
        (h.value !== void 0 && h.value === _ || b) && (Q(m), b && (V.current = !0));
      },
      [h.value]
    ), ae = o.useCallback(() => p?.focus(), [p]), ie = o.useCallback(
      (m, _, O) => {
        const b = !V.current && !O;
        (h.value !== void 0 && h.value === _ || b) && z(m);
      },
      [h.value]
    ), fe = u === "popper" ? Ne : Dt, ue = fe === Ne ? {
      side: l,
      sideOffset: s,
      align: S,
      alignOffset: x,
      arrowPadding: C,
      collisionBoundary: P,
      collisionPadding: y,
      sticky: T,
      hideWhenDetached: d,
      avoidCollisions: g
    } : {};
    return /* @__PURE__ */ c(
      Fe,
      {
        scope: t,
        content: p,
        viewport: N,
        onViewportChange: J,
        itemRefCallback: F,
        selectedItem: B,
        onItemLeave: ae,
        itemTextRefCallback: ie,
        focusSelectedItem: G,
        selectedItemText: $,
        position: u,
        isPositioned: ee,
        searchRef: se,
        children: /* @__PURE__ */ c(Qe, { as: Mt, allowPinchZoom: !0, children: /* @__PURE__ */ c(
          et,
          {
            asChild: !0,
            trapped: h.open,
            onMountAutoFocus: (m) => {
              m.preventDefault();
            },
            onUnmountAutoFocus: E(a, (m) => {
              h.trigger?.focus({ preventScroll: !0 }), m.preventDefault();
            }),
            children: /* @__PURE__ */ c(
              Xe,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: f,
                onPointerDownOutside: i,
                onFocusOutside: (m) => m.preventDefault(),
                onDismiss: () => h.onOpenChange(!1),
                children: /* @__PURE__ */ c(
                  fe,
                  {
                    role: "listbox",
                    id: h.contentId,
                    "data-state": h.open ? "open" : "closed",
                    dir: h.dir,
                    onContextMenu: (m) => m.preventDefault(),
                    ...w,
                    ...ue,
                    onPlaced: () => K(!0),
                    ref: A,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: E(w.onKeyDown, (m) => {
                      const _ = m.ctrlKey || m.altKey || m.metaKey;
                      if (m.key === "Tab" && m.preventDefault(), !_ && m.key.length === 1 && M(m.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(m.key)) {
                        let b = W().filter((I) => !I.disabled).map((I) => I.ref.current);
                        if (["ArrowUp", "End"].includes(m.key) && (b = b.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(m.key)) {
                          const I = m.target, R = b.indexOf(I);
                          b = b.slice(R + 1);
                        }
                        setTimeout(() => j(b)), m.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "SelectContentImpl")
), Dt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const { __scopeSelect: t, onPlaced: u, ...a } = e, f = Z(ne, t), i = le(ne, t), [l, s] = o.useState(null), [S, x] = o.useState(null), C = U(r, x), P = ve(t), y = o.useRef(!1), T = o.useRef(!0), { viewport: d, selectedItem: g, selectedItemText: w, focusSelectedItem: h } = i, p = o.useCallback(() => {
    if (f.trigger && f.valueNode && l && S && d && g && w) {
      const A = f.trigger.getBoundingClientRect(), B = S.getBoundingClientRect(), Q = f.valueNode.getBoundingClientRect(), $ = w.getBoundingClientRect();
      if (f.dir !== "rtl") {
        const I = $.left - B.left, R = Q.left - I, te = A.left - R, oe = A.width + te, ge = Math.max(oe, B.width), Se = window.innerWidth - k, we = xe(R, [
          k,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(k, Se - ge)
        ]);
        l.style.minWidth = oe + "px", l.style.left = we + "px";
      } else {
        const I = B.right - $.right, R = window.innerWidth - Q.right - I, te = window.innerWidth - A.right - R, oe = A.width + te, ge = Math.max(oe, B.width), Se = window.innerWidth - k, we = xe(R, [
          k,
          Math.max(k, Se - ge)
        ]);
        l.style.minWidth = oe + "px", l.style.right = we + "px";
      }
      const z = P(), W = window.innerHeight - k * 2, ee = d.scrollHeight, K = window.getComputedStyle(S), V = parseInt(K.borderTopWidth, 10), j = parseInt(K.paddingTop, 10), G = parseInt(K.borderBottomWidth, 10), Y = parseInt(K.paddingBottom, 10), H = V + j + ee + Y + G, se = Math.min(g.offsetHeight * 5, H), M = window.getComputedStyle(d), F = parseInt(M.paddingTop, 10), ae = parseInt(M.paddingBottom, 10), ie = A.top + A.height / 2 - k, fe = W - ie, ue = g.offsetHeight / 2, m = g.offsetTop + ue, _ = V + j + m, O = H - _;
      if (_ <= ie) {
        const I = z.length > 0 && g === z[z.length - 1].ref.current;
        l.style.bottom = "0px";
        const R = S.clientHeight - d.offsetTop - d.offsetHeight, te = Math.max(
          fe,
          ue + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (I ? ae : 0) + R + G
        ), oe = _ + te;
        l.style.height = oe + "px";
      } else {
        const I = z.length > 0 && g === z[0].ref.current;
        l.style.top = "0px";
        const te = Math.max(
          ie,
          V + d.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (I ? F : 0) + ue
        ) + O;
        l.style.height = te + "px", d.scrollTop = _ - ie + d.offsetTop;
      }
      l.style.margin = `${k}px 0`, l.style.minHeight = se + "px", l.style.maxHeight = W + "px", u?.(), requestAnimationFrame(() => y.current = !0);
    }
  }, [
    P,
    f.trigger,
    f.valueNode,
    l,
    S,
    d,
    g,
    w,
    f.dir,
    u
  ]);
  q(() => p(), [p]);
  const [L, N] = o.useState();
  q(() => {
    S && N(window.getComputedStyle(S).zIndex);
  }, [S]);
  const J = o.useCallback(
    (A) => {
      A && T.current === !0 && (p(), h?.(), T.current = !1);
    },
    [p, h]
  );
  return /* @__PURE__ */ c(
    Lt,
    {
      scope: t,
      contentWrapper: l,
      shouldExpandOnScrollRef: y,
      onScrollButtonChange: J,
      children: /* @__PURE__ */ c(
        "div",
        {
          ref: s,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: L
          },
          children: /* @__PURE__ */ c(
            D.div,
            {
              ...a,
              ref: C,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...a.style
              }
            }
          )
        }
      )
    }
  );
}, "SelectItemAlignedPosition")), Ne = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const {
    __scopeSelect: t,
    align: u = "start",
    collisionPadding: a = k,
    ...f
  } = e, i = Pe(t);
  return /* @__PURE__ */ c(
    ot,
    {
      ...i,
      ...f,
      ref: r,
      align: u,
      collisionPadding: a,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...f.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "SelectPopperPosition")), [Lt, Te] = ce(ne, {}), Me = "SelectViewport", At = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, nonce: u, ...a } = e, f = le(Me, t), i = Te(Me, t), l = U(r, f.onViewportChange), s = o.useRef(0);
    return /* @__PURE__ */ re(ye, { children: [
      /* @__PURE__ */ c(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: u
        }
      ),
      /* @__PURE__ */ c(he.Slot, { scope: t, children: /* @__PURE__ */ c(
        D.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...a,
          ref: l,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...a.style
          },
          onScroll: E(a.onScroll, (S) => {
            const x = S.currentTarget, { contentWrapper: C, shouldExpandOnScrollRef: P } = i;
            if (P?.current && C) {
              const y = Math.abs(s.current - x.scrollTop);
              if (y > 0) {
                const T = window.innerHeight - k * 2, d = parseFloat(C.style.minHeight), g = parseFloat(C.style.height), w = Math.max(d, g);
                if (w < T) {
                  const h = w + y, p = Math.min(T, h), L = h - p;
                  C.style.height = p + "px", C.style.bottom === "0px" && (x.scrollTop = L > 0 ? L : 0, C.style.justifyContent = "flex-end");
                }
              }
            }
            s.current = x.scrollTop;
          })
        }
      ) })
    ] });
  }, "SelectViewport")
), kt = "SelectGroup", [Bt, Vt] = ce(kt), Ht = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, ...u } = e, a = be();
    return /* @__PURE__ */ c(Bt, { scope: t, id: a, children: /* @__PURE__ */ c(D.div, { role: "group", "aria-labelledby": a, ...u, ref: r }) });
  }, "SelectGroup")
), Ft = "SelectLabel", Ut = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, ...u } = e, a = Vt(Ft, t);
    return /* @__PURE__ */ c(D.div, { id: a.id, ...u, ref: r });
  }, "SelectLabel")
), Ce = "SelectItem", [zt, Ue] = ce(Ce), Wt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const {
      __scopeSelect: t,
      value: u,
      disabled: a = !1,
      textValue: f,
      ...i
    } = e, l = Z(Ce, t), s = le(Ce, t), S = l.value === u, [x, C] = o.useState(f ?? ""), [P, y] = o.useState(!1), T = Ie(
      (p) => s.itemRefCallback?.(p, u, a)
    ), d = U(r, T), g = be(), w = o.useRef("touch"), h = /* @__PURE__ */ v(() => {
      a || (l.onValueChange(u), l.onOpenChange(!1));
    }, "handleSelect");
    return /* @__PURE__ */ c(
      zt,
      {
        scope: t,
        value: u,
        disabled: a,
        textId: g,
        isSelected: S,
        onItemTextChange: o.useCallback((p) => {
          C((L) => L || (p?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ c(
          he.ItemSlot,
          {
            scope: t,
            value: u,
            disabled: a,
            textValue: x,
            children: /* @__PURE__ */ c(
              D.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": P ? "" : void 0,
                "aria-selected": S && P,
                "data-state": S ? "checked" : "unchecked",
                "aria-disabled": a || void 0,
                "data-disabled": a ? "" : void 0,
                tabIndex: a ? void 0 : -1,
                ...i,
                ref: d,
                onFocus: E(i.onFocus, () => y(!0)),
                onBlur: E(i.onBlur, () => y(!1)),
                onClick: E(i.onClick, () => {
                  w.current !== "mouse" && h();
                }),
                onPointerUp: E(i.onPointerUp, () => {
                  w.current === "mouse" && h();
                }),
                onPointerDown: E(i.onPointerDown, (p) => {
                  w.current = p.pointerType;
                }),
                onPointerMove: E(i.onPointerMove, (p) => {
                  w.current = p.pointerType, a ? s.onItemLeave?.() : w.current === "mouse" && p.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: E(i.onPointerLeave, (p) => {
                  p.currentTarget === document.activeElement && s.onItemLeave?.();
                }),
                onKeyDown: E(i.onKeyDown, (p) => {
                  a || p.target !== p.currentTarget || s.searchRef?.current !== "" && p.key === " " || (mt.includes(p.key) && h(), p.key === " " && p.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }, "SelectItem")
), me = "SelectItemText", Kt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, className: u, style: a, ...f } = e, i = Z(me, t), l = le(me, t), s = Ue(me, t), S = St(me, t), [x, C] = o.useState(null), P = Ie(
      (h) => l.itemTextRefCallback?.(h, s.value, s.disabled)
    ), y = U(
      r,
      C,
      s.onItemTextChange,
      P
    ), T = x?.textContent, d = o.useMemo(
      () => /* @__PURE__ */ c("option", { value: s.value, disabled: s.disabled, children: T }, s.value),
      [s.disabled, s.value, T]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: w } = S;
    return q(() => (g(d), () => w(d)), [g, w, d]), /* @__PURE__ */ re(ye, { children: [
      /* @__PURE__ */ c(D.span, { id: s.textId, ...f, ref: y }),
      s.isSelected && i.valueNode && !i.valueNodeHasChildren && !pe(i.value) ? Le.createPortal(f.children, i.valueNode) : null
    ] });
  }, "SelectItemText")
), $t = "SelectItemIndicator", jt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, ...u } = e;
    return Ue($t, t).isSelected ? /* @__PURE__ */ c(D.span, { "aria-hidden": !0, ...u, ref: r }) : null;
  }, "SelectItemIndicator")
), Oe = "SelectScrollUpButton", Gt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const t = le(Oe, e.__scopeSelect), u = Te(Oe, e.__scopeSelect), [a, f] = o.useState(!1), i = U(r, u.onScrollButtonChange);
  return q(() => {
    if (t.viewport && t.isPositioned) {
      let l = function() {
        const S = s.scrollTop > 0;
        f(S);
      };
      v(l, "handleScroll");
      const s = t.viewport;
      return l(), s.addEventListener("scroll", l), () => s.removeEventListener("scroll", l);
    }
  }, [t.viewport, t.isPositioned]), a ? /* @__PURE__ */ c(
    ze,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: s } = t;
        l && s && (l.scrollTop = l.scrollTop - s.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollUpButton")), De = "SelectScrollDownButton", Yt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const t = le(De, e.__scopeSelect), u = Te(De, e.__scopeSelect), [a, f] = o.useState(!1), i = U(r, u.onScrollButtonChange);
  return q(() => {
    if (t.viewport && t.isPositioned) {
      let l = function() {
        const S = s.scrollHeight - s.clientHeight, x = Math.ceil(s.scrollTop) < S;
        f(x);
      };
      v(l, "handleScroll");
      const s = t.viewport;
      return l(), s.addEventListener("scroll", l), () => s.removeEventListener("scroll", l);
    }
  }, [t.viewport, t.isPositioned]), a ? /* @__PURE__ */ c(
    ze,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: s } = t;
        l && s && (l.scrollTop = l.scrollTop + s.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollDownButton")), ze = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ v(function(e, r) {
  const { __scopeSelect: t, onAutoScroll: u, ...a } = e, f = le("SelectScrollButton", t), i = o.useRef(null), l = ve(t), s = o.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return o.useEffect(() => () => s(), [s]), q(() => {
    l().find((x) => x.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [l]), /* @__PURE__ */ c(
    D.div,
    {
      "aria-hidden": !0,
      ...a,
      ref: r,
      style: { flexShrink: 0, ...a.style },
      onPointerDown: E(a.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(u, 50));
      }),
      onPointerMove: E(a.onPointerMove, () => {
        f.onItemLeave?.(), i.current === null && (i.current = window.setInterval(u, 50));
      }),
      onPointerLeave: E(a.onPointerLeave, () => {
        s();
      })
    }
  );
}, "SelectScrollButtonImpl")), qt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, r) {
    const { __scopeSelect: t, ...u } = e;
    return /* @__PURE__ */ c(D.div, { "aria-hidden": !0, ...u, ref: r });
  }, "SelectSeparator")
), Xt = "SelectBubbleInput", Zt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function({ __scopeSelect: e, ...r }, t) {
    const u = Z(Xt, e), { value: a, onValueChange: f, required: i, disabled: l, name: s, autoComplete: S, form: x } = u, { nativeOptions: C, nativeSelectKey: P } = u, y = o.useRef(null), T = U(t, y), d = a ?? "", g = Ve(d), w = Array.from(C).some(
      (h) => (h.props.value ?? "") === ""
    );
    return o.useEffect(() => {
      const h = y.current;
      if (!h) return;
      const p = window.HTMLSelectElement.prototype, N = Object.getOwnPropertyDescriptor(
        p,
        "value"
      ).set;
      if (g !== d && N) {
        const J = new Event("change", { bubbles: !0 });
        N.call(h, d), h.dispatchEvent(J);
      }
    }, [g, d]), /* @__PURE__ */ re(
      D.select,
      {
        "aria-hidden": !0,
        required: i,
        tabIndex: -1,
        name: s,
        autoComplete: S,
        disabled: l,
        form: x,
        onChange: (h) => f(h.target.value),
        ...r,
        style: { ...ct, ...r.style },
        ref: T,
        defaultValue: d,
        children: [
          pe(a) && !w ? /* @__PURE__ */ c("option", { value: "" }) : null,
          Array.from(C)
        ]
      },
      P
    );
  }, "SelectBubbleInput")
);
function We(n) {
  return typeof n == "function";
}
v(We, "isFunction");
function pe(n) {
  return n === "" || n === void 0;
}
v(pe, "shouldShowPlaceholder");
function _e(n) {
  const e = Ie(n), r = o.useRef(""), t = o.useRef(0), u = o.useCallback(
    (f) => {
      const i = r.current + f;
      e(i), (/* @__PURE__ */ v((function l(s) {
        r.current = s, window.clearTimeout(t.current), s !== "" && (t.current = window.setTimeout(() => l(""), 1e3));
      }), "updateSearch"))(i);
    },
    [e]
  ), a = o.useCallback(() => {
    r.current = "", window.clearTimeout(t.current);
  }, []);
  return o.useEffect(() => () => window.clearTimeout(t.current), []), [r, u, a];
}
v(_e, "useTypeaheadSearch");
function Re(n, e, r) {
  const u = e.length > 1 && Array.from(e).every((s) => s === e[0]) ? e[0] : e, a = r ? n.indexOf(r) : -1;
  let f = Ke(n, Math.max(a, 0));
  u.length === 1 && (f = f.filter((s) => s !== r));
  const l = f.find(
    (s) => s.textValue.toLowerCase().startsWith(u.toLowerCase())
  );
  return l !== r ? l : void 0;
}
v(Re, "findNextItem");
function Ke(n, e) {
  return n.map((r, t) => n[(e + t) % n.length]);
}
v(Ke, "wrapArray");
function go({
  ...n
}) {
  return /* @__PURE__ */ c(wt, { "data-slot": "select", ...n });
}
function So({
  ...n
}) {
  return /* @__PURE__ */ c(Ht, { "data-slot": "select-group", ...n });
}
function wo({
  ...n
}) {
  return /* @__PURE__ */ c(bt, { "data-slot": "select-value", ...n });
}
function xo({
  className: n,
  size: e = "default",
  children: r,
  ...t
}) {
  return /* @__PURE__ */ re(
    Ct,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: X(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        n
      ),
      ...t,
      children: [
        r,
        /* @__PURE__ */ c(It, { asChild: !0, children: /* @__PURE__ */ c(Be, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Co({
  className: n,
  children: e,
  position: r = "popper",
  ...t
}) {
  return /* @__PURE__ */ c(Rt, { children: /* @__PURE__ */ re(
    Et,
    {
      "data-slot": "select-content",
      className: X(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        n
      ),
      position: r,
      ...t,
      children: [
        /* @__PURE__ */ c(Jt, {}),
        /* @__PURE__ */ c(
          At,
          {
            className: X(
              "p-1",
              r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: e
          }
        ),
        /* @__PURE__ */ c(Qt, {})
      ]
    }
  ) });
}
function yo({
  className: n,
  ...e
}) {
  return /* @__PURE__ */ c(
    Ut,
    {
      "data-slot": "select-label",
      className: X("text-muted-foreground px-2 py-1.5 text-xs", n),
      ...e
    }
  );
}
function bo({
  className: n,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ re(
    Wt,
    {
      "data-slot": "select-item",
      className: X(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        n
      ),
      ...r,
      children: [
        /* @__PURE__ */ c("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ c(jt, { children: /* @__PURE__ */ c(lt, { className: "size-4" }) }) }),
        /* @__PURE__ */ c(Kt, { children: e })
      ]
    }
  );
}
function Io({
  className: n,
  ...e
}) {
  return /* @__PURE__ */ c(
    qt,
    {
      "data-slot": "select-separator",
      className: X("bg-border pointer-events-none -mx-1 my-1 h-px", n),
      ...e
    }
  );
}
function Jt({
  className: n,
  ...e
}) {
  return /* @__PURE__ */ c(
    Gt,
    {
      "data-slot": "select-scroll-up-button",
      className: X(
        "flex cursor-pointer items-center justify-center py-1",
        n
      ),
      ...e,
      children: /* @__PURE__ */ c(st, { className: "size-4" })
    }
  );
}
function Qt({
  className: n,
  ...e
}) {
  return /* @__PURE__ */ c(
    Yt,
    {
      "data-slot": "select-scroll-down-button",
      className: X(
        "flex cursor-pointer items-center justify-center py-1",
        n
      ),
      ...e,
      children: /* @__PURE__ */ c(Be, { className: "size-4" })
    }
  );
}
export {
  go as Select,
  Co as SelectContent,
  So as SelectGroup,
  bo as SelectItem,
  yo as SelectLabel,
  Qt as SelectScrollDownButton,
  Jt as SelectScrollUpButton,
  Io as SelectSeparator,
  xo as SelectTrigger,
  wo as SelectValue
};
//# sourceMappingURL=select.js.map
