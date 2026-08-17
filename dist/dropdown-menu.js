import { jsx as r, jsxs as ne } from "react/jsx-runtime";
import * as s from "react";
import { c as Me, a as g, u as he } from "./index-WHakdmwv.js";
import { u as G, c as Rn, b as we } from "./index-5Bhkapwi.js";
import { P as y, d as bn } from "./index-CpDnqHCm.js";
import { c as xn, u as Dn } from "./index-C5CLmphY.js";
import { P as Sn, D as In } from "./index-DKZPUN5w.js";
import { h as Pn, u as En, R as yn, F as Nn } from "./Combination-CmNnuUVg.js";
import { u as V } from "./index-CXwMLXQo.js";
import { c as Ce, R as _e, a as Tn, C as An, A as On } from "./index-BjeYwP6P.js";
import { P as Y } from "./index-DKIoJbzW.js";
import { c as Re, I as kn, R as Ln } from "./index-CO5mz-pQ.js";
import { u as te } from "./index-0ioNhtNM.js";
import { c as R } from "./utils-CwJPJKOE.js";
import { C as Gn } from "./chevron-right-pz9eCjj-.js";
import { C as Fn } from "./circle-DHOdTDQh.js";
import { C as Kn } from "./check-DXouwtzp.js";
var ee = ["Enter", " "], $n = ["ArrowDown", "PageUp", "Home"], be = ["ArrowUp", "PageDown", "End"], Un = [...$n, ...be], zn = {
  ltr: [...ee, "ArrowRight"],
  rtl: [...ee, "ArrowLeft"]
}, Bn = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, F = "Menu", [k, Vn, jn] = xn(F), [D, xe] = Me(F, [
  jn,
  Ce,
  Re
]), K = Ce(), De = Re(), [Se, b] = D(F), [Xn, $] = D(F), Ie = (e) => {
  const { __scopeMenu: t, open: n = !1, children: o, dir: a, onOpenChange: c, modal: i = !0 } = e, d = K(t), [f, m] = s.useState(null), p = s.useRef(!1), u = te(c), v = Dn(a);
  return s.useEffect(() => {
    const C = () => {
      p.current = !0, document.addEventListener("pointerdown", M, { capture: !0, once: !0 }), document.addEventListener("pointermove", M, { capture: !0, once: !0 });
    }, M = () => p.current = !1;
    return document.addEventListener("keydown", C, { capture: !0 }), () => {
      document.removeEventListener("keydown", C, { capture: !0 }), document.removeEventListener("pointerdown", M, { capture: !0 }), document.removeEventListener("pointermove", M, { capture: !0 });
    };
  }, []), /* @__PURE__ */ r(_e, { ...d, children: /* @__PURE__ */ r(
    Se,
    {
      scope: t,
      open: n,
      onOpenChange: u,
      content: f,
      onContentChange: m,
      children: /* @__PURE__ */ r(
        Xn,
        {
          scope: t,
          onClose: s.useCallback(() => u(!1), [u]),
          isUsingKeyboardRef: p,
          dir: v,
          modal: i,
          children: o
        }
      )
    }
  ) });
};
Ie.displayName = F;
var Yn = "MenuAnchor", oe = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, a = K(n);
    return /* @__PURE__ */ r(Tn, { ...a, ...o, ref: t });
  }
);
oe.displayName = Yn;
var re = "MenuPortal", [Hn, Pe] = D(re, {
  forceMount: void 0
}), Ee = (e) => {
  const { __scopeMenu: t, forceMount: n, children: o, container: a } = e, c = b(re, t);
  return /* @__PURE__ */ r(Hn, { scope: t, forceMount: n, children: /* @__PURE__ */ r(Y, { present: n || c.open, children: /* @__PURE__ */ r(Sn, { asChild: !0, container: a, children: o }) }) });
};
Ee.displayName = re;
var _ = "MenuContent", [Wn, ae] = D(_), ye = s.forwardRef(
  (e, t) => {
    const n = Pe(_, e.__scopeMenu), { forceMount: o = n.forceMount, ...a } = e, c = b(_, e.__scopeMenu), i = $(_, e.__scopeMenu);
    return /* @__PURE__ */ r(k.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(Y, { present: o || c.open, children: /* @__PURE__ */ r(k.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ r(Zn, { ...a, ref: t }) : /* @__PURE__ */ r(qn, { ...a, ref: t }) }) }) });
  }
), Zn = s.forwardRef(
  (e, t) => {
    const n = b(_, e.__scopeMenu), o = s.useRef(null), a = G(t, o);
    return s.useEffect(() => {
      const c = o.current;
      if (c) return Pn(c);
    }, []), /* @__PURE__ */ r(
      se,
      {
        ...e,
        ref: a,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: g(
          e.onFocusOutside,
          (c) => c.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), qn = s.forwardRef((e, t) => {
  const n = b(_, e.__scopeMenu);
  return /* @__PURE__ */ r(
    se,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Jn = Rn("MenuContent.ScrollLock"), se = s.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: a,
      onOpenAutoFocus: c,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: d,
      onEntryFocus: f,
      onEscapeKeyDown: m,
      onPointerDownOutside: p,
      onFocusOutside: u,
      onInteractOutside: v,
      onDismiss: C,
      disableOutsideScroll: M,
      ...S
    } = e, N = b(_, n), I = $(_, n), mn = K(n), vn = De(n), le = Vn(n), [gn, pe] = s.useState(null), U = s.useRef(null), Mn = G(t, U, N.onContentChange), z = s.useRef(0), B = s.useRef(""), hn = s.useRef(0), Z = s.useRef(null), fe = s.useRef("right"), q = s.useRef(0), wn = M ? yn : s.Fragment, Cn = M ? { as: Jn, allowPinchZoom: !0 } : void 0, _n = (l) => {
      const E = B.current + l, x = le().filter((w) => !w.disabled), T = document.activeElement, J = x.find((w) => w.ref.current === T)?.textValue, Q = x.map((w) => w.textValue), me = dt(Q, E, J), A = x.find((w) => w.textValue === me)?.ref.current;
      (function w(ve) {
        B.current = ve, window.clearTimeout(z.current), ve !== "" && (z.current = window.setTimeout(() => w(""), 1e3));
      })(E), A && setTimeout(() => A.focus());
    };
    s.useEffect(() => () => window.clearTimeout(z.current), []), En();
    const P = s.useCallback((l) => fe.current === Z.current?.side && pt(l, Z.current?.area), []);
    return /* @__PURE__ */ r(
      Wn,
      {
        scope: n,
        searchRef: B,
        onItemEnter: s.useCallback(
          (l) => {
            P(l) && l.preventDefault();
          },
          [P]
        ),
        onItemLeave: s.useCallback(
          (l) => {
            P(l) || (U.current?.focus(), pe(null));
          },
          [P]
        ),
        onTriggerLeave: s.useCallback(
          (l) => {
            P(l) && l.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: hn,
        onPointerGraceIntentChange: s.useCallback((l) => {
          Z.current = l;
        }, []),
        children: /* @__PURE__ */ r(wn, { ...Cn, children: /* @__PURE__ */ r(
          Nn,
          {
            asChild: !0,
            trapped: a,
            onMountAutoFocus: g(c, (l) => {
              l.preventDefault(), U.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ r(
              In,
              {
                asChild: !0,
                disableOutsidePointerEvents: d,
                onEscapeKeyDown: m,
                onPointerDownOutside: p,
                onFocusOutside: u,
                onInteractOutside: v,
                onDismiss: C,
                children: /* @__PURE__ */ r(
                  Ln,
                  {
                    asChild: !0,
                    ...vn,
                    dir: I.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: gn,
                    onCurrentTabStopIdChange: pe,
                    onEntryFocus: g(f, (l) => {
                      I.isUsingKeyboardRef.current || l.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ r(
                      An,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Ye(N.open),
                        "data-radix-menu-content": "",
                        dir: I.dir,
                        ...mn,
                        ...S,
                        ref: Mn,
                        style: { outline: "none", ...S.style },
                        onKeyDown: g(S.onKeyDown, (l) => {
                          const x = l.target.closest("[data-radix-menu-content]") === l.currentTarget, T = l.ctrlKey || l.altKey || l.metaKey, J = l.key.length === 1;
                          x && (l.key === "Tab" && l.preventDefault(), !T && J && _n(l.key));
                          const Q = U.current;
                          if (l.target !== Q || !Un.includes(l.key)) return;
                          l.preventDefault();
                          const A = le().filter((w) => !w.disabled).map((w) => w.ref.current);
                          be.includes(l.key) && A.reverse(), ut(A);
                        }),
                        onBlur: g(e.onBlur, (l) => {
                          l.currentTarget.contains(l.target) || (window.clearTimeout(z.current), B.current = "");
                        }),
                        onPointerMove: g(
                          e.onPointerMove,
                          L((l) => {
                            const E = l.target, x = q.current !== l.clientX;
                            if (l.currentTarget.contains(E) && x) {
                              const T = l.clientX > q.current ? "right" : "left";
                              fe.current = T, q.current = l.clientX;
                            }
                          })
                        )
                      }
                    )
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
ye.displayName = _;
var Qn = "MenuGroup", ce = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ r(y.div, { role: "group", ...o, ref: t });
  }
);
ce.displayName = Qn;
var et = "MenuLabel", Ne = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ r(y.div, { ...o, ref: t });
  }
);
Ne.displayName = et;
var j = "MenuItem", ge = "menu.itemSelect", H = s.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: o, ...a } = e, c = s.useRef(null), i = $(j, e.__scopeMenu), d = ae(j, e.__scopeMenu), f = G(t, c), m = s.useRef(!1), p = () => {
      const u = c.current;
      if (!n && u) {
        const v = new CustomEvent(ge, { bubbles: !0, cancelable: !0 });
        u.addEventListener(ge, (C) => o?.(C), { once: !0 }), bn(u, v), v.defaultPrevented ? m.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ r(
      Te,
      {
        ...a,
        ref: f,
        disabled: n,
        onClick: g(e.onClick, p),
        onPointerDown: (u) => {
          e.onPointerDown?.(u), m.current = !0;
        },
        onPointerUp: g(e.onPointerUp, (u) => {
          m.current || u.currentTarget?.click();
        }),
        onKeyDown: g(e.onKeyDown, (u) => {
          const v = d.searchRef.current !== "";
          n || v && u.key === " " || ee.includes(u.key) && (u.currentTarget.click(), u.preventDefault());
        })
      }
    );
  }
);
H.displayName = j;
var Te = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: o = !1, textValue: a, ...c } = e, i = ae(j, n), d = De(n), f = s.useRef(null), m = G(t, f), [p, u] = s.useState(!1), [v, C] = s.useState("");
    return s.useEffect(() => {
      const M = f.current;
      M && C((M.textContent ?? "").trim());
    }, [c.children]), /* @__PURE__ */ r(
      k.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: a ?? v,
        children: /* @__PURE__ */ r(kn, { asChild: !0, ...d, focusable: !o, children: /* @__PURE__ */ r(
          y.div,
          {
            role: "menuitem",
            "data-highlighted": p ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...c,
            ref: m,
            onPointerMove: g(
              e.onPointerMove,
              L((M) => {
                o ? i.onItemLeave(M) : (i.onItemEnter(M), M.defaultPrevented || M.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: g(
              e.onPointerLeave,
              L((M) => i.onItemLeave(M))
            ),
            onFocus: g(e.onFocus, () => u(!0)),
            onBlur: g(e.onBlur, () => u(!1))
          }
        ) })
      }
    );
  }
), nt = "MenuCheckboxItem", Ae = s.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: o, ...a } = e;
    return /* @__PURE__ */ r(Fe, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ r(
      H,
      {
        role: "menuitemcheckbox",
        "aria-checked": X(n) ? "mixed" : n,
        ...a,
        ref: t,
        "data-state": de(n),
        onSelect: g(
          a.onSelect,
          () => o?.(X(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ae.displayName = nt;
var Oe = "MenuRadioGroup", [tt, ot] = D(
  Oe,
  { value: void 0, onValueChange: () => {
  } }
), ke = s.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: o, ...a } = e, c = te(o);
    return /* @__PURE__ */ r(tt, { scope: e.__scopeMenu, value: n, onValueChange: c, children: /* @__PURE__ */ r(ce, { ...a, ref: t }) });
  }
);
ke.displayName = Oe;
var Le = "MenuRadioItem", Ge = s.forwardRef(
  (e, t) => {
    const { value: n, ...o } = e, a = ot(Le, e.__scopeMenu), c = n === a.value;
    return /* @__PURE__ */ r(Fe, { scope: e.__scopeMenu, checked: c, children: /* @__PURE__ */ r(
      H,
      {
        role: "menuitemradio",
        "aria-checked": c,
        ...o,
        ref: t,
        "data-state": de(c),
        onSelect: g(
          o.onSelect,
          () => a.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Ge.displayName = Le;
var ue = "MenuItemIndicator", [Fe, rt] = D(
  ue,
  { checked: !1 }
), Ke = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: o, ...a } = e, c = rt(ue, n);
    return /* @__PURE__ */ r(
      Y,
      {
        present: o || X(c.checked) || c.checked === !0,
        children: /* @__PURE__ */ r(
          y.span,
          {
            ...a,
            ref: t,
            "data-state": de(c.checked)
          }
        )
      }
    );
  }
);
Ke.displayName = ue;
var at = "MenuSeparator", $e = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ r(
      y.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }
);
$e.displayName = at;
var st = "MenuArrow", Ue = s.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...o } = e, a = K(n);
    return /* @__PURE__ */ r(On, { ...a, ...o, ref: t });
  }
);
Ue.displayName = st;
var ie = "MenuSub", [ct, ze] = D(ie), Be = (e) => {
  const { __scopeMenu: t, children: n, open: o = !1, onOpenChange: a } = e, c = b(ie, t), i = K(t), [d, f] = s.useState(null), [m, p] = s.useState(null), u = te(a);
  return s.useEffect(() => (c.open === !1 && u(!1), () => u(!1)), [c.open, u]), /* @__PURE__ */ r(_e, { ...i, children: /* @__PURE__ */ r(
    Se,
    {
      scope: t,
      open: o,
      onOpenChange: u,
      content: m,
      onContentChange: p,
      children: /* @__PURE__ */ r(
        ct,
        {
          scope: t,
          contentId: V(),
          triggerId: V(),
          trigger: d,
          onTriggerChange: f,
          children: n
        }
      )
    }
  ) });
};
Be.displayName = ie;
var O = "MenuSubTrigger", Ve = s.forwardRef(
  (e, t) => {
    const n = b(O, e.__scopeMenu), o = $(O, e.__scopeMenu), a = ze(O, e.__scopeMenu), c = ae(O, e.__scopeMenu), i = s.useRef(null), { pointerGraceTimerRef: d, onPointerGraceIntentChange: f } = c, m = { __scopeMenu: e.__scopeMenu }, p = s.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return s.useEffect(() => p, [p]), s.useEffect(() => {
      const u = d.current;
      return () => {
        window.clearTimeout(u), f(null);
      };
    }, [d, f]), /* @__PURE__ */ r(oe, { asChild: !0, ...m, children: /* @__PURE__ */ r(
      Te,
      {
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": a.contentId,
        "data-state": Ye(n.open),
        ...e,
        ref: we(t, a.onTriggerChange),
        onClick: (u) => {
          e.onClick?.(u), !(e.disabled || u.defaultPrevented) && (u.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: g(
          e.onPointerMove,
          L((u) => {
            c.onItemEnter(u), !u.defaultPrevented && !e.disabled && !n.open && !i.current && (c.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), p();
            }, 100));
          })
        ),
        onPointerLeave: g(
          e.onPointerLeave,
          L((u) => {
            p();
            const v = n.content?.getBoundingClientRect();
            if (v) {
              const C = n.content?.dataset.side, M = C === "right", S = M ? -5 : 5, N = v[M ? "left" : "right"], I = v[M ? "right" : "left"];
              c.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: u.clientX + S, y: u.clientY },
                  { x: N, y: v.top },
                  { x: I, y: v.top },
                  { x: I, y: v.bottom },
                  { x: N, y: v.bottom }
                ],
                side: C
              }), window.clearTimeout(d.current), d.current = window.setTimeout(
                () => c.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (c.onTriggerLeave(u), u.defaultPrevented) return;
              c.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: g(e.onKeyDown, (u) => {
          const v = c.searchRef.current !== "";
          e.disabled || v && u.key === " " || zn[o.dir].includes(u.key) && (n.onOpenChange(!0), n.content?.focus(), u.preventDefault());
        })
      }
    ) });
  }
);
Ve.displayName = O;
var je = "MenuSubContent", Xe = s.forwardRef(
  (e, t) => {
    const n = Pe(_, e.__scopeMenu), { forceMount: o = n.forceMount, ...a } = e, c = b(_, e.__scopeMenu), i = $(_, e.__scopeMenu), d = ze(je, e.__scopeMenu), f = s.useRef(null), m = G(t, f);
    return /* @__PURE__ */ r(k.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(Y, { present: o || c.open, children: /* @__PURE__ */ r(k.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(
      se,
      {
        id: d.contentId,
        "aria-labelledby": d.triggerId,
        ...a,
        ref: m,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (p) => {
          i.isUsingKeyboardRef.current && f.current?.focus(), p.preventDefault();
        },
        onCloseAutoFocus: (p) => p.preventDefault(),
        onFocusOutside: g(e.onFocusOutside, (p) => {
          p.target !== d.trigger && c.onOpenChange(!1);
        }),
        onEscapeKeyDown: g(e.onEscapeKeyDown, (p) => {
          i.onClose(), p.preventDefault();
        }),
        onKeyDown: g(e.onKeyDown, (p) => {
          const u = p.currentTarget.contains(p.target), v = Bn[i.dir].includes(p.key);
          u && v && (c.onOpenChange(!1), d.trigger?.focus(), p.preventDefault());
        })
      }
    ) }) }) });
  }
);
Xe.displayName = je;
function Ye(e) {
  return e ? "open" : "closed";
}
function X(e) {
  return e === "indeterminate";
}
function de(e) {
  return X(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function ut(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function it(e, t) {
  return e.map((n, o) => e[(t + o) % e.length]);
}
function dt(e, t, n) {
  const a = t.length > 1 && Array.from(t).every((m) => m === t[0]) ? t[0] : t, c = n ? e.indexOf(n) : -1;
  let i = it(e, Math.max(c, 0));
  a.length === 1 && (i = i.filter((m) => m !== n));
  const f = i.find(
    (m) => m.toLowerCase().startsWith(a.toLowerCase())
  );
  return f !== n ? f : void 0;
}
function lt(e, t) {
  const { x: n, y: o } = e;
  let a = !1;
  for (let c = 0, i = t.length - 1; c < t.length; i = c++) {
    const d = t[c], f = t[i], m = d.x, p = d.y, u = f.x, v = f.y;
    p > o != v > o && n < (u - m) * (o - p) / (v - p) + m && (a = !a);
  }
  return a;
}
function pt(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return lt(n, t);
}
function L(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var ft = Ie, mt = oe, vt = Ee, gt = ye, Mt = ce, ht = Ne, wt = H, Ct = Ae, _t = ke, Rt = Ge, bt = Ke, xt = $e, Dt = Ue, St = Be, It = Ve, Pt = Xe, W = "DropdownMenu", [Et, _o] = Me(
  W,
  [xe]
), h = xe(), [yt, He] = Et(W), We = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: o,
    open: a,
    defaultOpen: c,
    onOpenChange: i,
    modal: d = !0
  } = e, f = h(t), m = s.useRef(null), [p, u] = he({
    prop: a,
    defaultProp: c ?? !1,
    onChange: i,
    caller: W
  });
  return /* @__PURE__ */ r(
    yt,
    {
      scope: t,
      triggerId: V(),
      triggerRef: m,
      contentId: V(),
      open: p,
      onOpenChange: u,
      onOpenToggle: s.useCallback(() => u((v) => !v), [u]),
      modal: d,
      children: /* @__PURE__ */ r(ft, { ...f, open: p, onOpenChange: u, dir: o, modal: d, children: n })
    }
  );
};
We.displayName = W;
var Ze = "DropdownMenuTrigger", qe = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: o = !1, ...a } = e, c = He(Ze, n), i = h(n);
    return /* @__PURE__ */ r(mt, { asChild: !0, ...i, children: /* @__PURE__ */ r(
      y.button,
      {
        type: "button",
        id: c.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": c.open,
        "aria-controls": c.open ? c.contentId : void 0,
        "data-state": c.open ? "open" : "closed",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        ...a,
        ref: we(t, c.triggerRef),
        onPointerDown: g(e.onPointerDown, (d) => {
          !o && d.button === 0 && d.ctrlKey === !1 && (c.onOpenToggle(), c.open || d.preventDefault());
        }),
        onKeyDown: g(e.onKeyDown, (d) => {
          o || (["Enter", " "].includes(d.key) && c.onOpenToggle(), d.key === "ArrowDown" && c.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(d.key) && d.preventDefault());
        })
      }
    ) });
  }
);
qe.displayName = Ze;
var Nt = "DropdownMenuPortal", Je = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, o = h(t);
  return /* @__PURE__ */ r(vt, { ...o, ...n });
};
Je.displayName = Nt;
var Qe = "DropdownMenuContent", en = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, a = He(Qe, n), c = h(n), i = s.useRef(!1);
    return /* @__PURE__ */ r(
      gt,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...c,
        ...o,
        ref: t,
        onCloseAutoFocus: g(e.onCloseAutoFocus, (d) => {
          i.current || a.triggerRef.current?.focus(), i.current = !1, d.preventDefault();
        }),
        onInteractOutside: g(e.onInteractOutside, (d) => {
          const f = d.detail.originalEvent, m = f.button === 0 && f.ctrlKey === !0, p = f.button === 2 || m;
          (!a.modal || p) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
en.displayName = Qe;
var Tt = "DropdownMenuGroup", nn = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
    return /* @__PURE__ */ r(Mt, { ...a, ...o, ref: t });
  }
);
nn.displayName = Tt;
var At = "DropdownMenuLabel", tn = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
    return /* @__PURE__ */ r(ht, { ...a, ...o, ref: t });
  }
);
tn.displayName = At;
var Ot = "DropdownMenuItem", on = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
    return /* @__PURE__ */ r(wt, { ...a, ...o, ref: t });
  }
);
on.displayName = Ot;
var kt = "DropdownMenuCheckboxItem", rn = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(Ct, { ...a, ...o, ref: t });
});
rn.displayName = kt;
var Lt = "DropdownMenuRadioGroup", an = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(_t, { ...a, ...o, ref: t });
});
an.displayName = Lt;
var Gt = "DropdownMenuRadioItem", sn = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(Rt, { ...a, ...o, ref: t });
});
sn.displayName = Gt;
var Ft = "DropdownMenuItemIndicator", cn = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(bt, { ...a, ...o, ref: t });
});
cn.displayName = Ft;
var Kt = "DropdownMenuSeparator", un = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(xt, { ...a, ...o, ref: t });
});
un.displayName = Kt;
var $t = "DropdownMenuArrow", Ut = s.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
    return /* @__PURE__ */ r(Dt, { ...a, ...o, ref: t });
  }
);
Ut.displayName = $t;
var zt = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: o, onOpenChange: a, defaultOpen: c } = e, i = h(t), [d, f] = he({
    prop: o,
    defaultProp: c ?? !1,
    onChange: a,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ r(St, { ...i, open: d, onOpenChange: f, children: n });
}, Bt = "DropdownMenuSubTrigger", dn = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(It, { ...a, ...o, ref: t });
});
dn.displayName = Bt;
var Vt = "DropdownMenuSubContent", ln = s.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...o } = e, a = h(n);
  return /* @__PURE__ */ r(
    Pt,
    {
      ...a,
      ...o,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
ln.displayName = Vt;
var jt = We, Xt = qe, pn = Je, Yt = en, Ht = nn, Wt = tn, Zt = on, qt = rn, Jt = an, Qt = sn, fn = cn, eo = un, no = zt, to = dn, oo = ln;
function Ro({
  ...e
}) {
  return /* @__PURE__ */ r(jt, { "data-slot": "dropdown-menu", ...e });
}
function bo({
  ...e
}) {
  return /* @__PURE__ */ r(pn, { "data-slot": "dropdown-menu-portal", ...e });
}
function xo({
  ...e
}) {
  return /* @__PURE__ */ r(
    Xt,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function Do({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ r(pn, { children: /* @__PURE__ */ r(
    Yt,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: R(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function So({
  ...e
}) {
  return /* @__PURE__ */ r(Ht, { "data-slot": "dropdown-menu-group", ...e });
}
function Io({
  className: e,
  inset: t,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ r(
    Zt,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: R(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o
    }
  );
}
function Po({
  className: e,
  children: t,
  checked: n,
  ...o
}) {
  return /* @__PURE__ */ ne(
    qt,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: R(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(fn, { children: /* @__PURE__ */ r(Kn, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function Eo({
  ...e
}) {
  return /* @__PURE__ */ r(
    Jt,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...e
    }
  );
}
function yo({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ ne(
    Qt,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: R(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(fn, { children: /* @__PURE__ */ r(Fn, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function No({
  className: e,
  inset: t,
  ...n
}) {
  return /* @__PURE__ */ r(
    Wt,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: R(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...n
    }
  );
}
function To({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    eo,
    {
      "data-slot": "dropdown-menu-separator",
      className: R("bg-border -mx-1 my-1 h-px", e),
      ...t
    }
  );
}
function Ao({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: R(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        e
      ),
      ...t
    }
  );
}
function Oo({
  ...e
}) {
  return /* @__PURE__ */ r(no, { "data-slot": "dropdown-menu-sub", ...e });
}
function ko({
  className: e,
  inset: t,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ ne(
    to,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: R(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(Gn, { className: "ml-auto size-4" })
      ]
    }
  );
}
function Lo({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    oo,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: R(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        e
      ),
      ...t
    }
  );
}
export {
  Ro as DropdownMenu,
  Po as DropdownMenuCheckboxItem,
  Do as DropdownMenuContent,
  So as DropdownMenuGroup,
  Io as DropdownMenuItem,
  No as DropdownMenuLabel,
  bo as DropdownMenuPortal,
  Eo as DropdownMenuRadioGroup,
  yo as DropdownMenuRadioItem,
  To as DropdownMenuSeparator,
  Ao as DropdownMenuShortcut,
  Oo as DropdownMenuSub,
  Lo as DropdownMenuSubContent,
  ko as DropdownMenuSubTrigger,
  xo as DropdownMenuTrigger
};
//# sourceMappingURL=dropdown-menu.js.map
