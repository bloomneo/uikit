import { jsx as r, jsxs as re } from "react/jsx-runtime";
import * as c from "react";
import { c as he, a as v, b as ve } from "./index-b757E0P6.js";
import { u as y, c as Ze } from "./index-DFmzheZp.js";
import { P as N, d as qe } from "./index-rT3N9N4T.js";
import { c as Je, u as Qe } from "./index-S1vMr2en.js";
import { D as en, P as nn } from "./index-DeQNeE2u.js";
import { u as tn, R as on, F as rn, h as an } from "./index-BRQPYD2P.js";
import { u as X } from "./index-BraAqWsy.js";
import { c as we, R as Ce, A as un, C as cn } from "./index-DR2_SPIM.js";
import { P as W } from "./index-C7u_Yu0y.js";
import { c as be, I as sn, R as dn } from "./index-BzSHYi7S.js";
import { u as ae } from "./index-CRNjeP0c.js";
import { c as S } from "./utils-D7gXXjDs.js";
import { C as ln } from "./check-CT10FDO-.js";
import { C as pn } from "./circle-C7HJtY_v.js";
import { C as fn } from "./chevron-right-pap2nouW.js";
var mn = Object.defineProperty, g = (t, e) => mn(t, "name", { value: e, configurable: !0 }), te = ["Enter", " "], gn = ["ArrowDown", "PageUp", "Home"], _e = ["ArrowUp", "PageDown", "End"], Mn = [...gn, ..._e], hn = {
  ltr: [...te, "ArrowRight"],
  rtl: [...te, "ArrowLeft"]
}, vn = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, H = "Menu", [F, wn, Cn] = Je(H), [E, De] = he(H, [
  Cn,
  we,
  be
]), Z = we(), xe = be(), [Se, R] = E(H), [bn, $] = E(H), _n = /* @__PURE__ */ g((t) => {
  const { __scopeMenu: e, open: o = !1, children: n, dir: a, onOpenChange: u, modal: s = !0 } = t, p = Z(e), [m, i] = c.useState(null), h = c.useRef(!1), M = ae(u), d = Qe(a);
  return c.useEffect(() => {
    const f = /* @__PURE__ */ g(() => {
      h.current = !0, document.addEventListener("pointerdown", w, { capture: !0, once: !0 }), document.addEventListener("pointermove", w, { capture: !0, once: !0 });
    }, "handleKeyDown"), w = /* @__PURE__ */ g(() => h.current = !1, "handlePointer");
    return document.addEventListener("keydown", f, { capture: !0 }), () => {
      document.removeEventListener("keydown", f, { capture: !0 }), document.removeEventListener("pointerdown", w, { capture: !0 }), document.removeEventListener("pointermove", w, { capture: !0 });
    };
  }, []), c.useEffect(() => {
    if (!o)
      return;
    const f = /* @__PURE__ */ g(() => M(!1), "handleBlur");
    return window.addEventListener("blur", f), () => window.removeEventListener("blur", f);
  }, [o, M]), /* @__PURE__ */ r(Ce, { ...p, children: /* @__PURE__ */ r(
    Se,
    {
      scope: e,
      open: o,
      onOpenChange: M,
      content: m,
      onContentChange: i,
      children: /* @__PURE__ */ r(
        bn,
        {
          scope: e,
          onClose: c.useCallback(() => M(!1), [M]),
          isUsingKeyboardRef: h,
          dir: d,
          modal: s,
          children: n
        }
      )
    }
  ) });
}, "Menu"), Ie = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, ...a } = e, u = Z(n);
    return /* @__PURE__ */ r(un, { ...u, ...a, ref: o });
  }, "MenuAnchor")
), Re = "MenuPortal", [Dn, Pe] = E(Re, {
  forceMount: void 0
}), xn = /* @__PURE__ */ g((t) => {
  const { __scopeMenu: e, forceMount: o, children: n, container: a } = t, u = R(Re, e);
  return /* @__PURE__ */ r(Dn, { scope: e, forceMount: o, children: /* @__PURE__ */ r(W, { present: o || u.open, children: /* @__PURE__ */ r(nn, { asChild: !0, container: a, children: n }) }) });
}, "MenuPortal"), x = "MenuContent", [Sn, ue] = E(x), In = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const n = Pe(x, e.__scopeMenu), { forceMount: a = n.forceMount, ...u } = e, s = R(x, e.__scopeMenu), p = $(x, e.__scopeMenu);
    return /* @__PURE__ */ r(F.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(W, { present: a || s.open, children: /* @__PURE__ */ r(F.Slot, { scope: e.__scopeMenu, children: p.modal ? /* @__PURE__ */ r(Rn, { ...u, ref: o }) : /* @__PURE__ */ r(Pn, { ...u, ref: o }) }) }) });
  }, "MenuContent")
), Rn = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, o) {
    const n = R(x, e.__scopeMenu), a = c.useRef(null), u = y(o, a);
    return c.useEffect(() => {
      const s = a.current;
      if (s) return an(s);
    }, []), /* @__PURE__ */ r(
      ce,
      {
        ...e,
        ref: u,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: v(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }, "MenuRootContentModal")
), Pn = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ g(function(e, o) {
  const n = R(x, e.__scopeMenu);
  return /* @__PURE__ */ r(
    ce,
    {
      ...e,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}, "MenuRootContentNonModal")), yn = Ze("MenuContent.ScrollLock"), ce = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, o) {
    const {
      __scopeMenu: n,
      loop: a = !1,
      trapFocus: u,
      onOpenAutoFocus: s,
      onCloseAutoFocus: p,
      disableOutsidePointerEvents: m,
      onEntryFocus: i,
      onEscapeKeyDown: h,
      onPointerDownOutside: M,
      onFocusOutside: d,
      onInteractOutside: f,
      onDismiss: w,
      disableOutsideScroll: C,
      ...I
    } = e, z = R(x, n), T = $(x, n), U = Z(n), Ve = xe(n), le = wn(n), [Be, pe] = c.useState(null), V = c.useRef(null), je = y(o, V, z.onContentChange), B = c.useRef(0), j = c.useRef(""), Ye = c.useRef(0), J = c.useRef(null), fe = c.useRef("right"), Q = c.useRef(0), Xe = C ? on : c.Fragment, We = C ? { as: yn, allowPinchZoom: !0 } : void 0, He = /* @__PURE__ */ g((l) => {
      const O = j.current + l, P = le().filter((D) => !D.disabled), G = document.activeElement, ee = P.find((D) => D.ref.current === G)?.textValue, ne = P.map((D) => D.textValue), me = Le(ne, O, ee), L = P.find((D) => D.textValue === me)?.ref.current;
      (/* @__PURE__ */ g((function D(ge) {
        j.current = ge, window.clearTimeout(B.current), ge !== "" && (B.current = window.setTimeout(() => D(""), 1e3));
      }), "updateSearch"))(O), L && setTimeout(() => L.focus());
    }, "handleTypeaheadSearch");
    c.useEffect(() => () => window.clearTimeout(B.current), []), tn();
    const k = c.useCallback((l) => fe.current === J.current?.side && Ke(l, J.current?.area), []);
    return /* @__PURE__ */ r(
      Sn,
      {
        scope: n,
        searchRef: j,
        onItemEnter: c.useCallback(
          (l) => {
            k(l) && l.preventDefault();
          },
          [k]
        ),
        onItemLeave: c.useCallback(
          (l) => {
            k(l) || (V.current?.focus(), pe(null));
          },
          [k]
        ),
        onTriggerLeave: c.useCallback(
          (l) => {
            k(l) && l.preventDefault();
          },
          [k]
        ),
        pointerGraceTimerRef: Ye,
        onPointerGraceIntentChange: c.useCallback((l) => {
          J.current = l;
        }, []),
        children: /* @__PURE__ */ r(Xe, { ...We, children: /* @__PURE__ */ r(
          rn,
          {
            asChild: !0,
            trapped: u,
            onMountAutoFocus: v(s, (l) => {
              l.preventDefault(), V.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: p,
            children: /* @__PURE__ */ r(
              en,
              {
                asChild: !0,
                disableOutsidePointerEvents: m,
                onEscapeKeyDown: h,
                onPointerDownOutside: M,
                onFocusOutside: d,
                onInteractOutside: f,
                onDismiss: w,
                children: /* @__PURE__ */ r(
                  dn,
                  {
                    asChild: !0,
                    ...Ve,
                    dir: T.dir,
                    orientation: "vertical",
                    loop: a,
                    currentTabStopId: Be,
                    onCurrentTabStopIdChange: pe,
                    onEntryFocus: v(i, (l) => {
                      T.isUsingKeyboardRef.current || l.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ r(
                      cn,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": ie(z.open),
                        "data-radix-menu-content": "",
                        dir: T.dir,
                        ...U,
                        ...I,
                        ref: je,
                        style: { outline: "none", ...I.style },
                        onKeyDown: v(I.onKeyDown, (l) => {
                          const P = l.target.closest("[data-radix-menu-content]") === l.currentTarget, G = l.ctrlKey || l.altKey || l.metaKey, ee = l.key.length === 1;
                          P && (l.key === "Tab" && l.preventDefault(), !G && ee && He(l.key));
                          const ne = V.current;
                          if (l.target !== ne || !Mn.includes(l.key)) return;
                          l.preventDefault();
                          const L = le().filter((D) => !D.disabled).map((D) => D.ref.current);
                          _e.includes(l.key) && L.reverse(), Ne(L);
                        }),
                        onBlur: v(e.onBlur, (l) => {
                          l.currentTarget.contains(l.target) || (window.clearTimeout(B.current), j.current = "");
                        }),
                        onPointerMove: v(
                          e.onPointerMove,
                          A((l) => {
                            const O = l.target, P = Q.current !== l.clientX;
                            if (l.currentTarget.contains(O) && P) {
                              const G = l.clientX > Q.current ? "right" : "left";
                              fe.current = G, Q.current = l.clientX;
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
  }, "MenuContentImpl")
), ye = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ r(N.div, { role: "group", ...a, ref: o });
  }, "MenuGroup")
), En = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ r(N.div, { ...a, ref: o });
  }, "MenuLabel")
), oe = "MenuItem", Me = "menu.itemSelect", se = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, o) {
    const { disabled: n = !1, onSelect: a, ...u } = e, s = c.useRef(null), p = $(oe, e.__scopeMenu), m = ue(oe, e.__scopeMenu), i = y(o, s), h = c.useRef(!1), M = /* @__PURE__ */ g(() => {
      const d = s.current;
      if (!n && d) {
        const f = new CustomEvent(Me, { bubbles: !0, cancelable: !0 });
        d.addEventListener(Me, (w) => a?.(w), { once: !0 }), qe(d, f), f.defaultPrevented ? h.current = !1 : p.onClose();
      }
    }, "handleSelect");
    return /* @__PURE__ */ r(
      Ee,
      {
        ...u,
        ref: i,
        disabled: n,
        onClick: v(e.onClick, M),
        onPointerDown: (d) => {
          e.onPointerDown?.(d), h.current = !0;
        },
        onPointerUp: v(e.onPointerUp, (d) => {
          h.current || d.currentTarget?.click();
        }),
        onKeyDown: v(e.onKeyDown, (d) => {
          n || d.target !== d.currentTarget || m.searchRef.current !== "" && d.key === " " || te.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }, "MenuItem")
), Ee = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, disabled: a = !1, textValue: u, ...s } = e, p = ue(oe, n), m = xe(n), i = c.useRef(null), h = y(o, i), [M, d] = c.useState(!1), [f, w] = c.useState("");
    return c.useEffect(() => {
      const C = i.current;
      C && w((C.textContent ?? "").trim());
    }, [s.children]), /* @__PURE__ */ r(
      F.ItemSlot,
      {
        scope: n,
        disabled: a,
        textValue: u ?? f,
        children: /* @__PURE__ */ r(sn, { asChild: !0, ...m, focusable: !a, children: /* @__PURE__ */ r(
          N.div,
          {
            role: "menuitem",
            "data-highlighted": M ? "" : void 0,
            "aria-disabled": a || void 0,
            "data-disabled": a ? "" : void 0,
            ...s,
            ref: h,
            onPointerMove: v(
              e.onPointerMove,
              A((C) => {
                a ? p.onItemLeave(C) : (p.onItemEnter(C), C.defaultPrevented || C.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: v(
              e.onPointerLeave,
              A((C) => p.onItemLeave(C))
            ),
            onFocus: v(e.onFocus, () => d(!0)),
            onBlur: v(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }, "MenuItemImpl")
), Tn = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, o) {
    const { checked: n = !1, onCheckedChange: a, ...u } = e;
    return /* @__PURE__ */ r(ke, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ r(
      se,
      {
        role: "menuitemcheckbox",
        "aria-checked": K(n) ? "mixed" : n,
        ...u,
        ref: o,
        "data-state": q(n),
        onSelect: v(
          u.onSelect,
          () => a?.(K(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuCheckboxItem")
), kn = "MenuRadioGroup", [On, An] = E(
  kn,
  { value: void 0, onValueChange: /* @__PURE__ */ g(() => {
  }, "onValueChange") }
), Nn = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { value: n, onValueChange: a, ...u } = e, s = ae(a);
    return /* @__PURE__ */ r(On, { scope: e.__scopeMenu, value: n, onValueChange: s, children: /* @__PURE__ */ r(ye, { ...u, ref: o }) });
  }, "MenuRadioGroup")
), Gn = "MenuRadioItem", Ln = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { value: n, ...a } = e, u = An(Gn, e.__scopeMenu), s = n === u.value;
    return /* @__PURE__ */ r(ke, { scope: e.__scopeMenu, checked: s, children: /* @__PURE__ */ r(
      se,
      {
        role: "menuitemradio",
        "aria-checked": s,
        ...a,
        ref: o,
        "data-state": q(s),
        onSelect: v(
          a.onSelect,
          () => u.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuRadioItem")
), Te = "MenuItemIndicator", [ke, Fn] = E(
  Te,
  { checked: !1 }
), Kn = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, forceMount: a, ...u } = e, s = Fn(Te, n);
    return /* @__PURE__ */ r(
      W,
      {
        present: a || K(s.checked) || s.checked === !0,
        children: /* @__PURE__ */ r(
          N.span,
          {
            ...u,
            ref: o,
            "data-state": q(s.checked)
          }
        )
      }
    );
  }, "MenuItemIndicator")
), $n = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const { __scopeMenu: n, ...a } = e;
    return /* @__PURE__ */ r(
      N.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...a,
        ref: o
      }
    );
  }, "MenuSeparator")
), Oe = "MenuSub", [zn, Ae] = E(Oe), Un = /* @__PURE__ */ g((t) => {
  const { __scopeMenu: e, children: o, open: n = !1, onOpenChange: a } = t, u = R(Oe, e), s = Z(e), [p, m] = c.useState(null), [i, h] = c.useState(null), M = ae(a);
  return c.useEffect(() => (u.open === !1 && M(!1), () => M(!1)), [u.open, M]), /* @__PURE__ */ r(Ce, { ...s, children: /* @__PURE__ */ r(
    Se,
    {
      scope: e,
      open: n,
      onOpenChange: M,
      content: i,
      onContentChange: h,
      children: /* @__PURE__ */ r(
        zn,
        {
          scope: e,
          contentId: X(),
          triggerId: X(),
          trigger: p,
          onTriggerChange: m,
          children: o
        }
      )
    }
  ) });
}, "MenuSub"), Y = "MenuSubTrigger", Vn = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const n = R(Y, e.__scopeMenu), a = $(Y, e.__scopeMenu), u = Ae(Y, e.__scopeMenu), s = ue(Y, e.__scopeMenu), p = c.useRef(null), { pointerGraceTimerRef: m, onPointerGraceIntentChange: i } = s, h = { __scopeMenu: e.__scopeMenu }, M = c.useCallback(() => {
      p.current && window.clearTimeout(p.current), p.current = null;
    }, []);
    c.useEffect(() => M, [M]), c.useEffect(() => {
      const f = m.current;
      return () => {
        window.clearTimeout(f), i(null);
      };
    }, [m, i]);
    const d = y(o, u.onTriggerChange);
    return /* @__PURE__ */ r(Ie, { asChild: !0, ...h, children: /* @__PURE__ */ r(
      Ee,
      {
        id: u.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": n.open ? u.contentId : void 0,
        "data-state": ie(n.open),
        ...e,
        ref: d,
        onClick: (f) => {
          e.onClick?.(f), !(e.disabled || f.defaultPrevented) && (f.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: v(
          e.onPointerMove,
          A((f) => {
            s.onItemEnter(f), !f.defaultPrevented && !e.disabled && !n.open && !p.current && (s.onPointerGraceIntentChange(null), p.current = window.setTimeout(() => {
              n.onOpenChange(!0), M();
            }, 100));
          })
        ),
        onPointerLeave: v(
          e.onPointerLeave,
          A((f) => {
            M();
            const w = n.content?.getBoundingClientRect();
            if (w) {
              const C = n.content?.dataset.side, I = C === "right", z = I ? -5 : 5, T = w[I ? "left" : "right"], U = w[I ? "right" : "left"];
              s.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: f.clientX + z, y: f.clientY },
                  { x: T, y: w.top },
                  { x: U, y: w.top },
                  { x: U, y: w.bottom },
                  { x: T, y: w.bottom }
                ],
                side: C
              }), window.clearTimeout(m.current), m.current = window.setTimeout(
                () => s.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (s.onTriggerLeave(f), f.defaultPrevented) return;
              s.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: v(e.onKeyDown, (f) => {
          e.disabled || f.target !== f.currentTarget || s.searchRef.current !== "" && f.key === " " || hn[a.dir].includes(f.key) && (n.onOpenChange(!0), n.content?.focus(), f.preventDefault());
        })
      }
    ) });
  }, "MenuSubTrigger")
), Bn = "MenuSubContent", jn = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ g(function(e, o) {
    const n = Pe(x, e.__scopeMenu), { forceMount: a = n.forceMount, align: u = "start", ...s } = e, p = R(x, e.__scopeMenu), m = $(x, e.__scopeMenu), i = Ae(Bn, e.__scopeMenu), h = c.useRef(null), M = y(o, h);
    return /* @__PURE__ */ r(F.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(W, { present: a || p.open, children: /* @__PURE__ */ r(F.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ r(
      ce,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...s,
        ref: M,
        align: u,
        side: m.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          m.isUsingKeyboardRef.current && h.current?.focus(), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: v(e.onFocusOutside, (d) => {
          d.target !== i.trigger && p.onOpenChange(!1);
        }),
        onEscapeKeyDown: v(e.onEscapeKeyDown, (d) => {
          m.onClose(), d.preventDefault();
        }),
        onKeyDown: v(e.onKeyDown, (d) => {
          const f = d.currentTarget.contains(d.target), w = vn[m.dir].includes(d.key);
          f && w && (p.onOpenChange(!1), i.trigger?.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }, "MenuSubContent")
);
function ie(t) {
  return t ? "open" : "closed";
}
g(ie, "getOpenState");
function K(t) {
  return t === "indeterminate";
}
g(K, "isIndeterminate");
function q(t) {
  return K(t) ? "indeterminate" : t ? "checked" : "unchecked";
}
g(q, "getCheckedState");
function Ne(t) {
  const e = document.activeElement;
  for (const o of t)
    if (o === e || (o.focus(), document.activeElement !== e)) return;
}
g(Ne, "focusFirst");
function Ge(t, e) {
  return t.map((o, n) => t[(e + n) % t.length]);
}
g(Ge, "wrapArray");
function Le(t, e, o) {
  const a = e.length > 1 && Array.from(e).every((i) => i === e[0]) ? e[0] : e, u = o ? t.indexOf(o) : -1;
  let s = Ge(t, Math.max(u, 0));
  a.length === 1 && (s = s.filter((i) => i !== o));
  const m = s.find(
    (i) => i.toLowerCase().startsWith(a.toLowerCase())
  );
  return m !== o ? m : void 0;
}
g(Le, "getNextMatch");
function Fe(t, e) {
  const { x: o, y: n } = t;
  let a = !1;
  for (let u = 0, s = e.length - 1; u < e.length; s = u++) {
    const p = e[u], m = e[s], i = p.x, h = p.y, M = m.x, d = m.y;
    h > n != d > n && o < (M - i) * (n - h) / (d - h) + i && (a = !a);
  }
  return a;
}
g(Fe, "isPointInPolygon");
function Ke(t, e) {
  if (!e) return !1;
  const o = { x: t.clientX, y: t.clientY };
  return Fe(o, e);
}
g(Ke, "isPointerInGraceArea");
function A(t) {
  return (e) => e.pointerType === "mouse" ? t(e) : void 0;
}
g(A, "whenMouse");
var Yn = _n, Xn = Ie, Wn = xn, Hn = In, Zn = ye, qn = En, Jn = se, Qn = Tn, et = Nn, nt = Ln, tt = Kn, ot = $n, rt = Un, at = Vn, ut = jn, ct = Object.defineProperty, b = (t, e) => ct(t, "name", { value: e, configurable: !0 }), de = "DropdownMenu", [st, to] = he(
  de,
  [De]
), _ = De(), [it, $e] = st(de), dt = /* @__PURE__ */ b((t) => {
  const {
    __scopeDropdownMenu: e,
    children: o,
    dir: n,
    open: a,
    defaultOpen: u,
    onOpenChange: s,
    modal: p = !0
  } = t, m = _(e), i = c.useRef(null), [h, M] = ve({
    prop: a,
    defaultProp: u ?? !1,
    onChange: s,
    caller: de
  });
  return /* @__PURE__ */ r(
    it,
    {
      scope: e,
      triggerId: X(),
      triggerRef: i,
      contentId: X(),
      open: h,
      onOpenChange: M,
      onOpenToggle: c.useCallback(() => M((d) => !d), [M]),
      modal: p,
      children: /* @__PURE__ */ r(Yn, { ...m, open: h, onOpenChange: M, dir: n, modal: p, children: o })
    }
  );
}, "DropdownMenu"), lt = "DropdownMenuTrigger", pt = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ b(function(e, o) {
    const { __scopeDropdownMenu: n, disabled: a = !1, ...u } = e, s = $e(lt, n), p = _(n), m = y(o, s.triggerRef);
    return /* @__PURE__ */ r(Xn, { asChild: !0, ...p, children: /* @__PURE__ */ r(
      N.button,
      {
        type: "button",
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": s.open,
        "aria-controls": s.open ? s.contentId : void 0,
        "data-state": s.open ? "open" : "closed",
        "data-disabled": a ? "" : void 0,
        disabled: a,
        ...u,
        ref: m,
        onPointerDown: v(e.onPointerDown, (i) => {
          !a && i.button === 0 && i.ctrlKey === !1 && (s.onOpenToggle(), s.open || i.preventDefault());
        }),
        onKeyDown: v(e.onKeyDown, (i) => {
          a || (["Enter", " "].includes(i.key) && s.onOpenToggle(), i.key === "ArrowDown" && s.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }, "DropdownMenuTrigger")
), ft = /* @__PURE__ */ b((t) => {
  const { __scopeDropdownMenu: e, ...o } = t, n = _(e);
  return /* @__PURE__ */ r(Wn, { ...n, ...o });
}, "DropdownMenuPortal"), mt = "DropdownMenuContent", gt = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ b(function(e, o) {
    const { __scopeDropdownMenu: n, ...a } = e, u = $e(mt, n), s = _(n), p = c.useRef(!1);
    return /* @__PURE__ */ r(
      Hn,
      {
        id: u.contentId,
        "aria-labelledby": u.triggerId,
        ...s,
        ...a,
        ref: o,
        onCloseAutoFocus: v(e.onCloseAutoFocus, (m) => {
          p.current || u.triggerRef.current?.focus(), p.current = !1, m.preventDefault();
        }),
        onInteractOutside: v(e.onInteractOutside, (m) => {
          const i = m.detail.originalEvent, h = i.button === 0 && i.ctrlKey === !0, M = i.button === 2 || h;
          (!u.modal || M) && (p.current = !0);
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
  }, "DropdownMenuContent")
), Mt = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ b(function(e, o) {
    const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
    return /* @__PURE__ */ r(Zn, { ...u, ...a, ref: o });
  }, "DropdownMenuGroup")
), ht = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ b(function(e, o) {
    const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
    return /* @__PURE__ */ r(qn, { ...u, ...a, ref: o });
  }, "DropdownMenuLabel")
), vt = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ b(function(e, o) {
    const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
    return /* @__PURE__ */ r(Jn, { ...u, ...a, ref: o });
  }, "DropdownMenuItem")
), wt = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(Qn, { ...u, ...a, ref: o });
}, "DropdownMenuCheckboxItem")), Ct = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(et, { ...u, ...a, ref: o });
}, "DropdownMenuRadioGroup")), bt = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(nt, { ...u, ...a, ref: o });
}, "DropdownMenuRadioItem")), _t = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(tt, { ...u, ...a, ref: o });
}, "DropdownMenuItemIndicator")), Dt = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(ot, { ...u, ...a, ref: o });
}, "DropdownMenuSeparator")), xt = /* @__PURE__ */ b((t) => {
  const { __scopeDropdownMenu: e, children: o, open: n, onOpenChange: a, defaultOpen: u } = t, s = _(e), [p, m] = ve({
    prop: n,
    defaultProp: u ?? !1,
    onChange: a,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ r(rt, { ...s, open: p, onOpenChange: m, children: o });
}, "DropdownMenuSub"), St = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(at, { ...u, ...a, ref: o });
}, "DropdownMenuSubTrigger")), It = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ b(function(e, o) {
  const { __scopeDropdownMenu: n, ...a } = e, u = _(n);
  return /* @__PURE__ */ r(
    ut,
    {
      ...u,
      ...a,
      ref: o,
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
}, "DropdownMenuSubContent")), Rt = dt, Pt = pt, ze = ft, yt = gt, Et = Mt, Tt = ht, kt = vt, Ot = wt, At = Ct, Nt = bt, Ue = _t, Gt = Dt, Lt = xt, Ft = St, Kt = It;
function oo({
  ...t
}) {
  return /* @__PURE__ */ r(Rt, { "data-slot": "dropdown-menu", ...t });
}
function ro({
  ...t
}) {
  return /* @__PURE__ */ r(ze, { "data-slot": "dropdown-menu-portal", ...t });
}
function ao({
  ...t
}) {
  return /* @__PURE__ */ r(
    Pt,
    {
      "data-slot": "dropdown-menu-trigger",
      ...t
    }
  );
}
function uo({
  className: t,
  sideOffset: e = 4,
  ...o
}) {
  return /* @__PURE__ */ r(ze, { children: /* @__PURE__ */ r(
    yt,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: e,
      className: S(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        t
      ),
      ...o
    }
  ) });
}
function co({
  ...t
}) {
  return /* @__PURE__ */ r(Et, { "data-slot": "dropdown-menu-group", ...t });
}
function so({
  className: t,
  inset: e,
  variant: o = "default",
  ...n
}) {
  return /* @__PURE__ */ r(
    kt,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": o,
      className: S(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      ...n
    }
  );
}
function io({
  className: t,
  children: e,
  checked: o,
  ...n
}) {
  return /* @__PURE__ */ re(
    Ot,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: S(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      checked: o,
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(Ue, { children: /* @__PURE__ */ r(ln, { className: "size-4" }) }) }),
        e
      ]
    }
  );
}
function lo({
  ...t
}) {
  return /* @__PURE__ */ r(
    At,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...t
    }
  );
}
function po({
  className: t,
  children: e,
  ...o
}) {
  return /* @__PURE__ */ re(
    Nt,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: S(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(Ue, { children: /* @__PURE__ */ r(pn, { className: "size-2 fill-current" }) }) }),
        e
      ]
    }
  );
}
function fo({
  className: t,
  inset: e,
  ...o
}) {
  return /* @__PURE__ */ r(
    Tt,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: S(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        t
      ),
      ...o
    }
  );
}
function mo({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Gt,
    {
      "data-slot": "dropdown-menu-separator",
      className: S("bg-border -mx-1 my-1 h-px", t),
      ...e
    }
  );
}
function go({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: S(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        t
      ),
      ...e
    }
  );
}
function Mo({
  ...t
}) {
  return /* @__PURE__ */ r(Lt, { "data-slot": "dropdown-menu-sub", ...t });
}
function ho({
  className: t,
  inset: e,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ re(
    Ft,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: S(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        t
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ r(fn, { className: "ml-auto size-4" })
      ]
    }
  );
}
function vo({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Kt,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: S(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        t
      ),
      ...e
    }
  );
}
export {
  oo as DropdownMenu,
  io as DropdownMenuCheckboxItem,
  uo as DropdownMenuContent,
  co as DropdownMenuGroup,
  so as DropdownMenuItem,
  fo as DropdownMenuLabel,
  ro as DropdownMenuPortal,
  lo as DropdownMenuRadioGroup,
  po as DropdownMenuRadioItem,
  mo as DropdownMenuSeparator,
  go as DropdownMenuShortcut,
  Mo as DropdownMenuSub,
  vo as DropdownMenuSubContent,
  ho as DropdownMenuSubTrigger,
  ao as DropdownMenuTrigger
};
//# sourceMappingURL=dropdown-menu.js.map
