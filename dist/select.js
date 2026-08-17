import { jsx as s, jsxs as Q, Fragment as be } from "react/jsx-runtime";
import * as n from "react";
import * as _e from "react-dom";
import { u as Ne, c as ct, a as P, b as G } from "./index-WHakdmwv.js";
import { u as it, c as dt } from "./index-C5CLmphY.js";
import { u as k, c as ut } from "./index-5Bhkapwi.js";
import { P as pt, D as ft } from "./index-DKZPUN5w.js";
import { h as mt, u as ht, R as vt, F as gt } from "./Combination-CmNnuUVg.js";
import { u as Te } from "./index-CXwMLXQo.js";
import { c as Ee, R as St, a as wt, C as xt, A as Ct } from "./index-BjeYwP6P.js";
import { P as M } from "./index-CpDnqHCm.js";
import { u as yt } from "./index-0ioNhtNM.js";
import { u as It } from "./index-BZPx6jYI.js";
import { V as bt } from "./index-DfNPZZ8M.js";
import { c as j } from "./utils-CwJPJKOE.js";
import { c as Me } from "./createLucideIcon-B45kRl5r.js";
import { C as Tt } from "./check-DXouwtzp.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = Me("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pt = Me("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
function Re(t, [o, e]) {
  return Math.min(e, Math.max(o, t));
}
var Nt = [" ", "Enter", "ArrowUp", "ArrowDown"], Rt = [" ", "Enter"], ee = "Select", [de, ue, _t] = dt(ee), [ne, Po] = ct(ee, [
  _t,
  Ee
]), pe = Ee(), [Et, Y] = ne(ee), [Mt, At] = ne(ee), Oe = (t) => {
  const {
    __scopeSelect: o,
    children: e,
    open: c,
    defaultOpen: l,
    onOpenChange: u,
    value: r,
    defaultValue: a,
    onValueChange: i,
    dir: f,
    name: g,
    autoComplete: x,
    disabled: N,
    required: b,
    form: y
  } = t, d = pe(o), [h, S] = n.useState(null), [m, v] = n.useState(null), [W, A] = n.useState(!1), re = it(f), [R, D] = Ne({
    prop: c,
    defaultProp: l ?? !1,
    onChange: u,
    caller: ee
  }), [z, X] = Ne({
    prop: r,
    defaultProp: a,
    onChange: i,
    caller: ee
  }), B = n.useRef(null), V = h ? y || !!h.closest("form") : !0, [K, H] = n.useState(/* @__PURE__ */ new Set()), U = Array.from(K).map((_) => _.props.value).join(";");
  return /* @__PURE__ */ s(St, { ...d, children: /* @__PURE__ */ Q(
    Et,
    {
      required: b,
      scope: o,
      trigger: h,
      onTriggerChange: S,
      valueNode: m,
      onValueNodeChange: v,
      valueNodeHasChildren: W,
      onValueNodeHasChildrenChange: A,
      contentId: Te(),
      value: z,
      onValueChange: X,
      open: R,
      onOpenChange: D,
      dir: re,
      triggerPointerDownPosRef: B,
      disabled: N,
      children: [
        /* @__PURE__ */ s(de.Provider, { scope: o, children: /* @__PURE__ */ s(
          Mt,
          {
            scope: t.__scopeSelect,
            onNativeOptionAdd: n.useCallback((_) => {
              H((L) => new Set(L).add(_));
            }, []),
            onNativeOptionRemove: n.useCallback((_) => {
              H((L) => {
                const F = new Set(L);
                return F.delete(_), F;
              });
            }, []),
            children: e
          }
        ) }),
        V ? /* @__PURE__ */ Q(
          rt,
          {
            "aria-hidden": !0,
            required: b,
            tabIndex: -1,
            name: g,
            autoComplete: x,
            value: z,
            onChange: (_) => X(_.target.value),
            disabled: N,
            form: y,
            children: [
              z === void 0 ? /* @__PURE__ */ s("option", { value: "" }) : null,
              Array.from(K)
            ]
          },
          U
        ) : null
      ]
    }
  ) });
};
Oe.displayName = ee;
var De = "SelectTrigger", Le = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, disabled: c = !1, ...l } = t, u = pe(e), r = Y(De, e), a = r.disabled || c, i = k(o, r.onTriggerChange), f = ue(e), g = n.useRef("touch"), [x, N, b] = at((d) => {
      const h = f().filter((v) => !v.disabled), S = h.find((v) => v.value === r.value), m = lt(h, d, S);
      m !== void 0 && r.onValueChange(m.value);
    }), y = (d) => {
      a || (r.onOpenChange(!0), b()), d && (r.triggerPointerDownPosRef.current = {
        x: Math.round(d.pageX),
        y: Math.round(d.pageY)
      });
    };
    return /* @__PURE__ */ s(wt, { asChild: !0, ...u, children: /* @__PURE__ */ s(
      M.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": r.contentId,
        "aria-expanded": r.open,
        "aria-required": r.required,
        "aria-autocomplete": "none",
        dir: r.dir,
        "data-state": r.open ? "open" : "closed",
        disabled: a,
        "data-disabled": a ? "" : void 0,
        "data-placeholder": st(r.value) ? "" : void 0,
        ...l,
        ref: i,
        onClick: P(l.onClick, (d) => {
          d.currentTarget.focus(), g.current !== "mouse" && y(d);
        }),
        onPointerDown: P(l.onPointerDown, (d) => {
          g.current = d.pointerType;
          const h = d.target;
          h.hasPointerCapture(d.pointerId) && h.releasePointerCapture(d.pointerId), d.button === 0 && d.ctrlKey === !1 && d.pointerType === "mouse" && (y(d), d.preventDefault());
        }),
        onKeyDown: P(l.onKeyDown, (d) => {
          const h = x.current !== "";
          !(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && N(d.key), !(h && d.key === " ") && Nt.includes(d.key) && (y(), d.preventDefault());
        })
      }
    ) });
  }
);
Le.displayName = De;
var ke = "SelectValue", Be = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, className: c, style: l, children: u, placeholder: r = "", ...a } = t, i = Y(ke, e), { onValueNodeHasChildrenChange: f } = i, g = u !== void 0, x = k(o, i.onValueNodeChange);
    return G(() => {
      f(g);
    }, [f, g]), /* @__PURE__ */ s(
      M.span,
      {
        ...a,
        ref: x,
        style: { pointerEvents: "none" },
        children: st(i.value) ? /* @__PURE__ */ s(be, { children: r }) : u
      }
    );
  }
);
Be.displayName = ke;
var Ot = "SelectIcon", Ve = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, children: c, ...l } = t;
    return /* @__PURE__ */ s(M.span, { "aria-hidden": !0, ...l, ref: o, children: c || "▼" });
  }
);
Ve.displayName = Ot;
var Dt = "SelectPortal", He = (t) => /* @__PURE__ */ s(pt, { asChild: !0, ...t });
He.displayName = Dt;
var te = "SelectContent", Ue = n.forwardRef(
  (t, o) => {
    const e = Y(te, t.__scopeSelect), [c, l] = n.useState();
    if (G(() => {
      l(new DocumentFragment());
    }, []), !e.open) {
      const u = c;
      return u ? _e.createPortal(
        /* @__PURE__ */ s(Fe, { scope: t.__scopeSelect, children: /* @__PURE__ */ s(de.Slot, { scope: t.__scopeSelect, children: /* @__PURE__ */ s("div", { children: t.children }) }) }),
        u
      ) : null;
    }
    return /* @__PURE__ */ s(We, { ...t, ref: o });
  }
);
Ue.displayName = te;
var O = 10, [Fe, q] = ne(te), Lt = "SelectContentImpl", kt = ut("SelectContent.RemoveScroll"), We = n.forwardRef(
  (t, o) => {
    const {
      __scopeSelect: e,
      position: c = "item-aligned",
      onCloseAutoFocus: l,
      onEscapeKeyDown: u,
      onPointerDownOutside: r,
      //
      // PopperContent props
      side: a,
      sideOffset: i,
      align: f,
      alignOffset: g,
      arrowPadding: x,
      collisionBoundary: N,
      collisionPadding: b,
      sticky: y,
      hideWhenDetached: d,
      avoidCollisions: h,
      //
      ...S
    } = t, m = Y(te, e), [v, W] = n.useState(null), [A, re] = n.useState(null), R = k(o, (p) => W(p)), [D, z] = n.useState(null), [X, B] = n.useState(
      null
    ), V = ue(e), [K, H] = n.useState(!1), U = n.useRef(!1);
    n.useEffect(() => {
      if (v) return mt(v);
    }, [v]), ht();
    const _ = n.useCallback(
      (p) => {
        const [I, ...E] = V().map((T) => T.ref.current), [w] = E.slice(-1), C = document.activeElement;
        for (const T of p)
          if (T === C || (T?.scrollIntoView({ block: "nearest" }), T === I && A && (A.scrollTop = 0), T === w && A && (A.scrollTop = A.scrollHeight), T?.focus(), document.activeElement !== C)) return;
      },
      [V, A]
    ), L = n.useCallback(
      () => _([D, v]),
      [_, D, v]
    );
    n.useEffect(() => {
      K && L();
    }, [K, L]);
    const { onOpenChange: F, triggerPointerDownPosRef: $ } = m;
    n.useEffect(() => {
      if (v) {
        let p = { x: 0, y: 0 };
        const I = (w) => {
          p = {
            x: Math.abs(Math.round(w.pageX) - ($.current?.x ?? 0)),
            y: Math.abs(Math.round(w.pageY) - ($.current?.y ?? 0))
          };
        }, E = (w) => {
          p.x <= 10 && p.y <= 10 ? w.preventDefault() : v.contains(w.target) || F(!1), document.removeEventListener("pointermove", I), $.current = null;
        };
        return $.current !== null && (document.addEventListener("pointermove", I), document.addEventListener("pointerup", E, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", I), document.removeEventListener("pointerup", E, { capture: !0 });
        };
      }
    }, [v, F, $]), n.useEffect(() => {
      const p = () => F(!1);
      return window.addEventListener("blur", p), window.addEventListener("resize", p), () => {
        window.removeEventListener("blur", p), window.removeEventListener("resize", p);
      };
    }, [F]);
    const [fe, le] = at((p) => {
      const I = V().filter((C) => !C.disabled), E = I.find((C) => C.ref.current === document.activeElement), w = lt(I, p, E);
      w && setTimeout(() => w.ref.current.focus());
    }), me = n.useCallback(
      (p, I, E) => {
        const w = !U.current && !E;
        (m.value !== void 0 && m.value === I || w) && (z(p), w && (U.current = !0));
      },
      [m.value]
    ), he = n.useCallback(() => v?.focus(), [v]), oe = n.useCallback(
      (p, I, E) => {
        const w = !U.current && !E;
        (m.value !== void 0 && m.value === I || w) && B(p);
      },
      [m.value]
    ), ce = c === "popper" ? we : ze, se = ce === we ? {
      side: a,
      sideOffset: i,
      align: f,
      alignOffset: g,
      arrowPadding: x,
      collisionBoundary: N,
      collisionPadding: b,
      sticky: y,
      hideWhenDetached: d,
      avoidCollisions: h
    } : {};
    return /* @__PURE__ */ s(
      Fe,
      {
        scope: e,
        content: v,
        viewport: A,
        onViewportChange: re,
        itemRefCallback: me,
        selectedItem: D,
        onItemLeave: he,
        itemTextRefCallback: oe,
        focusSelectedItem: L,
        selectedItemText: X,
        position: c,
        isPositioned: K,
        searchRef: fe,
        children: /* @__PURE__ */ s(vt, { as: kt, allowPinchZoom: !0, children: /* @__PURE__ */ s(
          gt,
          {
            asChild: !0,
            trapped: m.open,
            onMountAutoFocus: (p) => {
              p.preventDefault();
            },
            onUnmountAutoFocus: P(l, (p) => {
              m.trigger?.focus({ preventScroll: !0 }), p.preventDefault();
            }),
            children: /* @__PURE__ */ s(
              ft,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: u,
                onPointerDownOutside: r,
                onFocusOutside: (p) => p.preventDefault(),
                onDismiss: () => m.onOpenChange(!1),
                children: /* @__PURE__ */ s(
                  ce,
                  {
                    role: "listbox",
                    id: m.contentId,
                    "data-state": m.open ? "open" : "closed",
                    dir: m.dir,
                    onContextMenu: (p) => p.preventDefault(),
                    ...S,
                    ...se,
                    onPlaced: () => H(!0),
                    ref: R,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...S.style
                    },
                    onKeyDown: P(S.onKeyDown, (p) => {
                      const I = p.ctrlKey || p.altKey || p.metaKey;
                      if (p.key === "Tab" && p.preventDefault(), !I && p.key.length === 1 && le(p.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(p.key)) {
                        let w = V().filter((C) => !C.disabled).map((C) => C.ref.current);
                        if (["ArrowUp", "End"].includes(p.key) && (w = w.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(p.key)) {
                          const C = p.target, T = w.indexOf(C);
                          w = w.slice(T + 1);
                        }
                        setTimeout(() => _(w)), p.preventDefault();
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
  }
);
We.displayName = Lt;
var Bt = "SelectItemAlignedPosition", ze = n.forwardRef((t, o) => {
  const { __scopeSelect: e, onPlaced: c, ...l } = t, u = Y(te, e), r = q(te, e), [a, i] = n.useState(null), [f, g] = n.useState(null), x = k(o, (R) => g(R)), N = ue(e), b = n.useRef(!1), y = n.useRef(!0), { viewport: d, selectedItem: h, selectedItemText: S, focusSelectedItem: m } = r, v = n.useCallback(() => {
    if (u.trigger && u.valueNode && a && f && d && h && S) {
      const R = u.trigger.getBoundingClientRect(), D = f.getBoundingClientRect(), z = u.valueNode.getBoundingClientRect(), X = S.getBoundingClientRect();
      if (u.dir !== "rtl") {
        const C = X.left - D.left, T = z.left - C, Z = R.left - T, J = R.width + Z, ve = Math.max(J, D.width), ge = window.innerWidth - O, Se = Re(T, [
          O,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(O, ge - ve)
        ]);
        a.style.minWidth = J + "px", a.style.left = Se + "px";
      } else {
        const C = D.right - X.right, T = window.innerWidth - z.right - C, Z = window.innerWidth - R.right - T, J = R.width + Z, ve = Math.max(J, D.width), ge = window.innerWidth - O, Se = Re(T, [
          O,
          Math.max(O, ge - ve)
        ]);
        a.style.minWidth = J + "px", a.style.right = Se + "px";
      }
      const B = N(), V = window.innerHeight - O * 2, K = d.scrollHeight, H = window.getComputedStyle(f), U = parseInt(H.borderTopWidth, 10), _ = parseInt(H.paddingTop, 10), L = parseInt(H.borderBottomWidth, 10), F = parseInt(H.paddingBottom, 10), $ = U + _ + K + F + L, fe = Math.min(h.offsetHeight * 5, $), le = window.getComputedStyle(d), me = parseInt(le.paddingTop, 10), he = parseInt(le.paddingBottom, 10), oe = R.top + R.height / 2 - O, ce = V - oe, se = h.offsetHeight / 2, p = h.offsetTop + se, I = U + _ + p, E = $ - I;
      if (I <= oe) {
        const C = B.length > 0 && h === B[B.length - 1].ref.current;
        a.style.bottom = "0px";
        const T = f.clientHeight - d.offsetTop - d.offsetHeight, Z = Math.max(
          ce,
          se + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (C ? he : 0) + T + L
        ), J = I + Z;
        a.style.height = J + "px";
      } else {
        const C = B.length > 0 && h === B[0].ref.current;
        a.style.top = "0px";
        const Z = Math.max(
          oe,
          U + d.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (C ? me : 0) + se
        ) + E;
        a.style.height = Z + "px", d.scrollTop = I - oe + d.offsetTop;
      }
      a.style.margin = `${O}px 0`, a.style.minHeight = fe + "px", a.style.maxHeight = V + "px", c?.(), requestAnimationFrame(() => b.current = !0);
    }
  }, [
    N,
    u.trigger,
    u.valueNode,
    a,
    f,
    d,
    h,
    S,
    u.dir,
    c
  ]);
  G(() => v(), [v]);
  const [W, A] = n.useState();
  G(() => {
    f && A(window.getComputedStyle(f).zIndex);
  }, [f]);
  const re = n.useCallback(
    (R) => {
      R && y.current === !0 && (v(), m?.(), y.current = !1);
    },
    [v, m]
  );
  return /* @__PURE__ */ s(
    Ht,
    {
      scope: e,
      contentWrapper: a,
      shouldExpandOnScrollRef: b,
      onScrollButtonChange: re,
      children: /* @__PURE__ */ s(
        "div",
        {
          ref: i,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: W
          },
          children: /* @__PURE__ */ s(
            M.div,
            {
              ...l,
              ref: x,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...l.style
              }
            }
          )
        }
      )
    }
  );
});
ze.displayName = Bt;
var Vt = "SelectPopperPosition", we = n.forwardRef((t, o) => {
  const {
    __scopeSelect: e,
    align: c = "start",
    collisionPadding: l = O,
    ...u
  } = t, r = pe(e);
  return /* @__PURE__ */ s(
    xt,
    {
      ...r,
      ...u,
      ref: o,
      align: c,
      collisionPadding: l,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...u.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
we.displayName = Vt;
var [Ht, Pe] = ne(te, {}), xe = "SelectViewport", Ke = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, nonce: c, ...l } = t, u = q(xe, e), r = Pe(xe, e), a = k(o, u.onViewportChange), i = n.useRef(0);
    return /* @__PURE__ */ Q(be, { children: [
      /* @__PURE__ */ s(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: c
        }
      ),
      /* @__PURE__ */ s(de.Slot, { scope: e, children: /* @__PURE__ */ s(
        M.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...l,
          ref: a,
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
            ...l.style
          },
          onScroll: P(l.onScroll, (f) => {
            const g = f.currentTarget, { contentWrapper: x, shouldExpandOnScrollRef: N } = r;
            if (N?.current && x) {
              const b = Math.abs(i.current - g.scrollTop);
              if (b > 0) {
                const y = window.innerHeight - O * 2, d = parseFloat(x.style.minHeight), h = parseFloat(x.style.height), S = Math.max(d, h);
                if (S < y) {
                  const m = S + b, v = Math.min(y, m), W = m - v;
                  x.style.height = v + "px", x.style.bottom === "0px" && (g.scrollTop = W > 0 ? W : 0, x.style.justifyContent = "flex-end");
                }
              }
            }
            i.current = g.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Ke.displayName = xe;
var $e = "SelectGroup", [Ut, Ft] = ne($e), Ge = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, ...c } = t, l = Te();
    return /* @__PURE__ */ s(Ut, { scope: e, id: l, children: /* @__PURE__ */ s(M.div, { role: "group", "aria-labelledby": l, ...c, ref: o }) });
  }
);
Ge.displayName = $e;
var je = "SelectLabel", Ye = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, ...c } = t, l = Ft(je, e);
    return /* @__PURE__ */ s(M.div, { id: l.id, ...c, ref: o });
  }
);
Ye.displayName = je;
var ie = "SelectItem", [Wt, qe] = ne(ie), Xe = n.forwardRef(
  (t, o) => {
    const {
      __scopeSelect: e,
      value: c,
      disabled: l = !1,
      textValue: u,
      ...r
    } = t, a = Y(ie, e), i = q(ie, e), f = a.value === c, [g, x] = n.useState(u ?? ""), [N, b] = n.useState(!1), y = k(
      o,
      (m) => i.itemRefCallback?.(m, c, l)
    ), d = Te(), h = n.useRef("touch"), S = () => {
      l || (a.onValueChange(c), a.onOpenChange(!1));
    };
    if (c === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ s(
      Wt,
      {
        scope: e,
        value: c,
        disabled: l,
        textId: d,
        isSelected: f,
        onItemTextChange: n.useCallback((m) => {
          x((v) => v || (m?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ s(
          de.ItemSlot,
          {
            scope: e,
            value: c,
            disabled: l,
            textValue: g,
            children: /* @__PURE__ */ s(
              M.div,
              {
                role: "option",
                "aria-labelledby": d,
                "data-highlighted": N ? "" : void 0,
                "aria-selected": f && N,
                "data-state": f ? "checked" : "unchecked",
                "aria-disabled": l || void 0,
                "data-disabled": l ? "" : void 0,
                tabIndex: l ? void 0 : -1,
                ...r,
                ref: y,
                onFocus: P(r.onFocus, () => b(!0)),
                onBlur: P(r.onBlur, () => b(!1)),
                onClick: P(r.onClick, () => {
                  h.current !== "mouse" && S();
                }),
                onPointerUp: P(r.onPointerUp, () => {
                  h.current === "mouse" && S();
                }),
                onPointerDown: P(r.onPointerDown, (m) => {
                  h.current = m.pointerType;
                }),
                onPointerMove: P(r.onPointerMove, (m) => {
                  h.current = m.pointerType, l ? i.onItemLeave?.() : h.current === "mouse" && m.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: P(r.onPointerLeave, (m) => {
                  m.currentTarget === document.activeElement && i.onItemLeave?.();
                }),
                onKeyDown: P(r.onKeyDown, (m) => {
                  i.searchRef?.current !== "" && m.key === " " || (Rt.includes(m.key) && S(), m.key === " " && m.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Xe.displayName = ie;
var ae = "SelectItemText", Ze = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, className: c, style: l, ...u } = t, r = Y(ae, e), a = q(ae, e), i = qe(ae, e), f = At(ae, e), [g, x] = n.useState(null), N = k(
      o,
      (S) => x(S),
      i.onItemTextChange,
      (S) => a.itemTextRefCallback?.(S, i.value, i.disabled)
    ), b = g?.textContent, y = n.useMemo(
      () => /* @__PURE__ */ s("option", { value: i.value, disabled: i.disabled, children: b }, i.value),
      [i.disabled, i.value, b]
    ), { onNativeOptionAdd: d, onNativeOptionRemove: h } = f;
    return G(() => (d(y), () => h(y)), [d, h, y]), /* @__PURE__ */ Q(be, { children: [
      /* @__PURE__ */ s(M.span, { id: i.textId, ...u, ref: N }),
      i.isSelected && r.valueNode && !r.valueNodeHasChildren ? _e.createPortal(u.children, r.valueNode) : null
    ] });
  }
);
Ze.displayName = ae;
var Je = "SelectItemIndicator", Qe = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, ...c } = t;
    return qe(Je, e).isSelected ? /* @__PURE__ */ s(M.span, { "aria-hidden": !0, ...c, ref: o }) : null;
  }
);
Qe.displayName = Je;
var Ce = "SelectScrollUpButton", et = n.forwardRef((t, o) => {
  const e = q(Ce, t.__scopeSelect), c = Pe(Ce, t.__scopeSelect), [l, u] = n.useState(!1), r = k(o, c.onScrollButtonChange);
  return G(() => {
    if (e.viewport && e.isPositioned) {
      let a = function() {
        const f = i.scrollTop > 0;
        u(f);
      };
      const i = e.viewport;
      return a(), i.addEventListener("scroll", a), () => i.removeEventListener("scroll", a);
    }
  }, [e.viewport, e.isPositioned]), l ? /* @__PURE__ */ s(
    ot,
    {
      ...t,
      ref: r,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: i } = e;
        a && i && (a.scrollTop = a.scrollTop - i.offsetHeight);
      }
    }
  ) : null;
});
et.displayName = Ce;
var ye = "SelectScrollDownButton", tt = n.forwardRef((t, o) => {
  const e = q(ye, t.__scopeSelect), c = Pe(ye, t.__scopeSelect), [l, u] = n.useState(!1), r = k(o, c.onScrollButtonChange);
  return G(() => {
    if (e.viewport && e.isPositioned) {
      let a = function() {
        const f = i.scrollHeight - i.clientHeight, g = Math.ceil(i.scrollTop) < f;
        u(g);
      };
      const i = e.viewport;
      return a(), i.addEventListener("scroll", a), () => i.removeEventListener("scroll", a);
    }
  }, [e.viewport, e.isPositioned]), l ? /* @__PURE__ */ s(
    ot,
    {
      ...t,
      ref: r,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: i } = e;
        a && i && (a.scrollTop = a.scrollTop + i.offsetHeight);
      }
    }
  ) : null;
});
tt.displayName = ye;
var ot = n.forwardRef((t, o) => {
  const { __scopeSelect: e, onAutoScroll: c, ...l } = t, u = q("SelectScrollButton", e), r = n.useRef(null), a = ue(e), i = n.useCallback(() => {
    r.current !== null && (window.clearInterval(r.current), r.current = null);
  }, []);
  return n.useEffect(() => () => i(), [i]), G(() => {
    a().find((g) => g.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [a]), /* @__PURE__ */ s(
    M.div,
    {
      "aria-hidden": !0,
      ...l,
      ref: o,
      style: { flexShrink: 0, ...l.style },
      onPointerDown: P(l.onPointerDown, () => {
        r.current === null && (r.current = window.setInterval(c, 50));
      }),
      onPointerMove: P(l.onPointerMove, () => {
        u.onItemLeave?.(), r.current === null && (r.current = window.setInterval(c, 50));
      }),
      onPointerLeave: P(l.onPointerLeave, () => {
        i();
      })
    }
  );
}), zt = "SelectSeparator", nt = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, ...c } = t;
    return /* @__PURE__ */ s(M.div, { "aria-hidden": !0, ...c, ref: o });
  }
);
nt.displayName = zt;
var Ie = "SelectArrow", Kt = n.forwardRef(
  (t, o) => {
    const { __scopeSelect: e, ...c } = t, l = pe(e), u = Y(Ie, e), r = q(Ie, e);
    return u.open && r.position === "popper" ? /* @__PURE__ */ s(Ct, { ...l, ...c, ref: o }) : null;
  }
);
Kt.displayName = Ie;
var $t = "SelectBubbleInput", rt = n.forwardRef(
  ({ __scopeSelect: t, value: o, ...e }, c) => {
    const l = n.useRef(null), u = k(c, l), r = It(o);
    return n.useEffect(() => {
      const a = l.current;
      if (!a) return;
      const i = window.HTMLSelectElement.prototype, g = Object.getOwnPropertyDescriptor(
        i,
        "value"
      ).set;
      if (r !== o && g) {
        const x = new Event("change", { bubbles: !0 });
        g.call(a, o), a.dispatchEvent(x);
      }
    }, [r, o]), /* @__PURE__ */ s(
      M.select,
      {
        ...e,
        style: { ...bt, ...e.style },
        ref: u,
        defaultValue: o
      }
    );
  }
);
rt.displayName = $t;
function st(t) {
  return t === "" || t === void 0;
}
function at(t) {
  const o = yt(t), e = n.useRef(""), c = n.useRef(0), l = n.useCallback(
    (r) => {
      const a = e.current + r;
      o(a), (function i(f) {
        e.current = f, window.clearTimeout(c.current), f !== "" && (c.current = window.setTimeout(() => i(""), 1e3));
      })(a);
    },
    [o]
  ), u = n.useCallback(() => {
    e.current = "", window.clearTimeout(c.current);
  }, []);
  return n.useEffect(() => () => window.clearTimeout(c.current), []), [e, l, u];
}
function lt(t, o, e) {
  const l = o.length > 1 && Array.from(o).every((f) => f === o[0]) ? o[0] : o, u = e ? t.indexOf(e) : -1;
  let r = Gt(t, Math.max(u, 0));
  l.length === 1 && (r = r.filter((f) => f !== e));
  const i = r.find(
    (f) => f.textValue.toLowerCase().startsWith(l.toLowerCase())
  );
  return i !== e ? i : void 0;
}
function Gt(t, o) {
  return t.map((e, c) => t[(o + c) % t.length]);
}
var jt = Oe, Yt = Le, qt = Be, Xt = Ve, Zt = He, Jt = Ue, Qt = Ke, eo = Ge, to = Ye, oo = Xe, no = Ze, ro = Qe, so = et, ao = tt, lo = nt;
function No({
  ...t
}) {
  return /* @__PURE__ */ s(jt, { "data-slot": "select", ...t });
}
function Ro({
  ...t
}) {
  return /* @__PURE__ */ s(eo, { "data-slot": "select-group", ...t });
}
function _o({
  ...t
}) {
  return /* @__PURE__ */ s(qt, { "data-slot": "select-value", ...t });
}
function Eo({
  className: t,
  size: o = "default",
  children: e,
  ...c
}) {
  return /* @__PURE__ */ Q(
    Yt,
    {
      "data-slot": "select-trigger",
      "data-size": o,
      className: j(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      ...c,
      children: [
        e,
        /* @__PURE__ */ s(Xt, { asChild: !0, children: /* @__PURE__ */ s(Ae, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Mo({
  className: t,
  children: o,
  position: e = "popper",
  ...c
}) {
  return /* @__PURE__ */ s(Zt, { children: /* @__PURE__ */ Q(
    Jt,
    {
      "data-slot": "select-content",
      className: j(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        e === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        t
      ),
      position: e,
      ...c,
      children: [
        /* @__PURE__ */ s(co, {}),
        /* @__PURE__ */ s(
          Qt,
          {
            className: j(
              "p-1",
              e === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: o
          }
        ),
        /* @__PURE__ */ s(io, {})
      ]
    }
  ) });
}
function Ao({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ s(
    to,
    {
      "data-slot": "select-label",
      className: j("text-muted-foreground px-2 py-1.5 text-xs", t),
      ...o
    }
  );
}
function Oo({
  className: t,
  children: o,
  ...e
}) {
  return /* @__PURE__ */ Q(
    oo,
    {
      "data-slot": "select-item",
      className: j(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        t
      ),
      ...e,
      children: [
        /* @__PURE__ */ s("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ s(ro, { children: /* @__PURE__ */ s(Tt, { className: "size-4" }) }) }),
        /* @__PURE__ */ s(no, { children: o })
      ]
    }
  );
}
function Do({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ s(
    lo,
    {
      "data-slot": "select-separator",
      className: j("bg-border pointer-events-none -mx-1 my-1 h-px", t),
      ...o
    }
  );
}
function co({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ s(
    so,
    {
      "data-slot": "select-scroll-up-button",
      className: j(
        "flex cursor-default items-center justify-center py-1",
        t
      ),
      ...o,
      children: /* @__PURE__ */ s(Pt, { className: "size-4" })
    }
  );
}
function io({
  className: t,
  ...o
}) {
  return /* @__PURE__ */ s(
    ao,
    {
      "data-slot": "select-scroll-down-button",
      className: j(
        "flex cursor-default items-center justify-center py-1",
        t
      ),
      ...o,
      children: /* @__PURE__ */ s(Ae, { className: "size-4" })
    }
  );
}
export {
  No as Select,
  Mo as SelectContent,
  Ro as SelectGroup,
  Oo as SelectItem,
  Ao as SelectLabel,
  io as SelectScrollDownButton,
  co as SelectScrollUpButton,
  Do as SelectSeparator,
  Eo as SelectTrigger,
  _o as SelectValue
};
//# sourceMappingURL=select.js.map
