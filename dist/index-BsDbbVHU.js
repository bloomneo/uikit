import { c as V } from "./createLucideIcon-B45kRl5r.js";
import * as s from "react";
import { u as X, c as q, a as g, d as K } from "./index-WHakdmwv.js";
import { u as h, c as U } from "./index-5Bhkapwi.js";
import { u as R } from "./index-CXwMLXQo.js";
import { P as Y, D as Z } from "./index-DKZPUN5w.js";
import { h as z, R as J, u as Q, F as ee } from "./Combination-CmNnuUVg.js";
import { P as _ } from "./index-DKIoJbzW.js";
import { P as p } from "./index-CpDnqHCm.js";
import { jsx as i, jsxs as N, Fragment as O } from "react/jsx-runtime";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Re = V("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
var D = "Dialog", [I, he] = q(D), [oe, u] = I(D), x = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: a,
    defaultOpen: r,
    onOpenChange: o,
    modal: l = !0
  } = e, c = s.useRef(null), f = s.useRef(null), [v, C] = X({
    prop: a,
    defaultProp: r ?? !1,
    onChange: o,
    caller: D
  });
  return /* @__PURE__ */ i(
    oe,
    {
      scope: t,
      triggerRef: c,
      contentRef: f,
      contentId: R(),
      titleId: R(),
      descriptionId: R(),
      open: v,
      onOpenChange: C,
      onOpenToggle: s.useCallback(() => C((H) => !H), [C]),
      modal: l,
      children: n
    }
  );
};
x.displayName = D;
var b = "DialogTrigger", A = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = u(b, n), o = h(t, r.triggerRef);
    return /* @__PURE__ */ i(
      p.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": E(r.open),
        ...a,
        ref: o,
        onClick: g(e.onClick, r.onOpenToggle)
      }
    );
  }
);
A.displayName = b;
var P = "DialogPortal", [te, T] = I(P, {
  forceMount: void 0
}), M = (e) => {
  const { __scopeDialog: t, forceMount: n, children: a, container: r } = e, o = u(P, t);
  return /* @__PURE__ */ i(te, { scope: t, forceMount: n, children: s.Children.map(a, (l) => /* @__PURE__ */ i(_, { present: n || o.open, children: /* @__PURE__ */ i(Y, { asChild: !0, container: r, children: l }) })) });
};
M.displayName = P;
var m = "DialogOverlay", w = s.forwardRef(
  (e, t) => {
    const n = T(m, e.__scopeDialog), { forceMount: a = n.forceMount, ...r } = e, o = u(m, e.__scopeDialog);
    return o.modal ? /* @__PURE__ */ i(_, { present: a || o.open, children: /* @__PURE__ */ i(ne, { ...r, ref: t }) }) : null;
  }
);
w.displayName = m;
var re = U("DialogOverlay.RemoveScroll"), ne = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = u(m, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ i(J, { as: re, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ i(
        p.div,
        {
          "data-state": E(r.open),
          ...a,
          ref: t,
          style: { pointerEvents: "auto", ...a.style }
        }
      ) })
    );
  }
), d = "DialogContent", F = s.forwardRef(
  (e, t) => {
    const n = T(d, e.__scopeDialog), { forceMount: a = n.forceMount, ...r } = e, o = u(d, e.__scopeDialog);
    return /* @__PURE__ */ i(_, { present: a || o.open, children: o.modal ? /* @__PURE__ */ i(ae, { ...r, ref: t }) : /* @__PURE__ */ i(ie, { ...r, ref: t }) });
  }
);
F.displayName = d;
var ae = s.forwardRef(
  (e, t) => {
    const n = u(d, e.__scopeDialog), a = s.useRef(null), r = h(t, n.contentRef, a);
    return s.useEffect(() => {
      const o = a.current;
      if (o) return z(o);
    }, []), /* @__PURE__ */ i(
      S,
      {
        ...e,
        ref: r,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: g(e.onCloseAutoFocus, (o) => {
          o.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: g(e.onPointerDownOutside, (o) => {
          const l = o.detail.originalEvent, c = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || c) && o.preventDefault();
        }),
        onFocusOutside: g(
          e.onFocusOutside,
          (o) => o.preventDefault()
        )
      }
    );
  }
), ie = s.forwardRef(
  (e, t) => {
    const n = u(d, e.__scopeDialog), a = s.useRef(!1), r = s.useRef(!1);
    return /* @__PURE__ */ i(
      S,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (o) => {
          e.onCloseAutoFocus?.(o), o.defaultPrevented || (a.current || n.triggerRef.current?.focus(), o.preventDefault()), a.current = !1, r.current = !1;
        },
        onInteractOutside: (o) => {
          e.onInteractOutside?.(o), o.defaultPrevented || (a.current = !0, o.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const l = o.target;
          n.triggerRef.current?.contains(l) && o.preventDefault(), o.detail.originalEvent.type === "focusin" && r.current && o.preventDefault();
        }
      }
    );
  }
), S = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: a, onOpenAutoFocus: r, onCloseAutoFocus: o, ...l } = e, c = u(d, n), f = s.useRef(null), v = h(t, f);
    return Q(), /* @__PURE__ */ N(O, { children: [
      /* @__PURE__ */ i(
        ee,
        {
          asChild: !0,
          loop: !0,
          trapped: a,
          onMountAutoFocus: r,
          onUnmountAutoFocus: o,
          children: /* @__PURE__ */ i(
            Z,
            {
              role: "dialog",
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": E(c.open),
              ...l,
              ref: v,
              onDismiss: () => c.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ N(O, { children: [
        /* @__PURE__ */ i(se, { titleId: c.titleId }),
        /* @__PURE__ */ i(le, { contentRef: f, descriptionId: c.descriptionId })
      ] })
    ] });
  }
), y = "DialogTitle", W = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = u(y, n);
    return /* @__PURE__ */ i(p.h2, { id: r.titleId, ...a, ref: t });
  }
);
W.displayName = y;
var k = "DialogDescription", L = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = u(k, n);
    return /* @__PURE__ */ i(p.p, { id: r.descriptionId, ...a, ref: t });
  }
);
L.displayName = k;
var G = "DialogClose", $ = s.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...a } = e, r = u(G, n);
    return /* @__PURE__ */ i(
      p.button,
      {
        type: "button",
        ...a,
        ref: t,
        onClick: g(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
$.displayName = G;
function E(e) {
  return e ? "open" : "closed";
}
var B = "DialogTitleWarning", [_e, j] = K(B, {
  contentName: d,
  titleName: y,
  docsSlug: "dialog"
}), se = ({ titleId: e }) => {
  const t = j(B), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return s.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ce = "DialogDescriptionWarning", le = ({ contentRef: e, descriptionId: t }) => {
  const a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${j(ce).contentName}}.`;
  return s.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(a));
  }, [a, e, t]), null;
}, Pe = x, ye = A, Ee = M, Ne = w, Oe = F, Ie = W, xe = L, be = $;
export {
  Oe as C,
  xe as D,
  Ne as O,
  Ee as P,
  Pe as R,
  Ie as T,
  Re as X,
  be as a,
  ye as b
};
//# sourceMappingURL=index-BsDbbVHU.js.map
