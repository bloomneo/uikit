import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as n from "react";
import { UIKitError as F, warnInDev as w } from "./errors.js";
import { Dialog as p, DialogContent as C, DialogHeader as g, DialogTitle as y, DialogDescription as x, DialogFooter as b } from "./dialog.js";
import { Button as m } from "./button.js";
import { Input as D } from "./input.js";
import { Label as P } from "./label.js";
const k = n.createContext(null);
let h = !1;
function R({ children: t }) {
  n.useEffect(() => (h && w("ConfirmProvider", "mounted more than once. Only mount a single <ConfirmProvider> at the app root.", "confirm-dialog"), h = !0, () => {
    h = !1;
  }), []);
  const [e, c] = n.useState(null), i = n.useRef(null), [s, u] = n.useState(""), v = n.useCallback((l) => (u(""), c(l), new Promise((d) => {
    i.current = d;
  })), []), a = (l) => {
    i.current?.(l), i.current = null, c(null), u("");
  }, f = e?.verifyText ? s !== e.verifyText : !1;
  return /* @__PURE__ */ o(k.Provider, { value: { open: v }, children: [
    t,
    /* @__PURE__ */ r(p, { open: e !== null, onOpenChange: (l) => !l && a(!1), children: /* @__PURE__ */ o(C, { children: [
      /* @__PURE__ */ o(g, { children: [
        /* @__PURE__ */ r(y, { children: e?.title }),
        e?.description && /* @__PURE__ */ r(x, { children: e.description })
      ] }),
      e?.verifyText && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 py-2", children: [
        /* @__PURE__ */ o(P, { htmlFor: "confirm-verify", children: [
          "Type",
          " ",
          /* @__PURE__ */ r("span", { className: "font-mono font-semibold text-foreground", children: e.verifyText }),
          " ",
          "to confirm"
        ] }),
        /* @__PURE__ */ r(
          D,
          {
            id: "confirm-verify",
            value: s,
            onChange: (l) => u(l.target.value),
            autoComplete: "off",
            autoFocus: !0
          }
        )
      ] }),
      /* @__PURE__ */ o(b, { children: [
        /* @__PURE__ */ r(m, { variant: "outline", onClick: () => a(!1), children: e?.cancelLabel ?? "Cancel" }),
        /* @__PURE__ */ r(
          m,
          {
            variant: e?.tone === "destructive" ? "destructive" : "default",
            disabled: f,
            onClick: () => a(!0),
            children: e?.confirmLabel ?? (e?.tone === "destructive" ? "Delete" : "Confirm")
          }
        )
      ] })
    ] }) })
  ] });
}
function S() {
  const t = n.useContext(k);
  if (!t)
    throw new F(
      "useConfirm",
      "called outside <ConfirmProvider>. Wrap your app root in <ConfirmProvider>.",
      "confirm-dialog"
    );
  const e = n.useCallback(
    (i) => t.open({ ...i, tone: i.tone ?? "default" }),
    [t]
  ), c = n.useCallback(
    (i) => t.open({ ...i, tone: "destructive" }),
    [t]
  );
  return Object.assign(e, { destructive: c });
}
function B({
  open: t,
  onOpenChange: e,
  onConfirm: c,
  title: i,
  description: s,
  confirmLabel: u,
  cancelLabel: v,
  tone: a = "default",
  verifyText: f
}) {
  const [l, d] = n.useState("");
  return n.useEffect(() => {
    t || d("");
  }, [t]), /* @__PURE__ */ r(p, { open: t, onOpenChange: e, children: /* @__PURE__ */ o(C, { children: [
    /* @__PURE__ */ o(g, { children: [
      /* @__PURE__ */ r(y, { children: i }),
      s && /* @__PURE__ */ r(x, { children: s })
    ] }),
    f && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 py-2", children: [
      /* @__PURE__ */ o(P, { htmlFor: "confirm-verify-controlled", children: [
        "Type",
        " ",
        /* @__PURE__ */ r("span", { className: "font-mono font-semibold text-foreground", children: f }),
        " ",
        "to confirm"
      ] }),
      /* @__PURE__ */ r(
        D,
        {
          id: "confirm-verify-controlled",
          value: l,
          onChange: (V) => d(V.target.value),
          autoComplete: "off",
          autoFocus: !0
        }
      )
    ] }),
    /* @__PURE__ */ o(b, { children: [
      /* @__PURE__ */ r(m, { variant: "outline", onClick: () => e(!1), children: v ?? "Cancel" }),
      /* @__PURE__ */ r(
        m,
        {
          variant: a === "destructive" ? "destructive" : "default",
          disabled: f ? l !== f : !1,
          onClick: () => {
            c(), e(!1);
          },
          children: u ?? (a === "destructive" ? "Delete" : "Confirm")
        }
      )
    ] })
  ] }) });
}
export {
  B as ConfirmDialog,
  R as ConfirmProvider,
  S as useConfirm
};
//# sourceMappingURL=confirm-dialog.js.map
