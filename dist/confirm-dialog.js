import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { UIKitError as V } from "./errors.js";
import { Dialog as h, DialogContent as p, DialogHeader as C, DialogTitle as g, DialogDescription as y, DialogFooter as x } from "./dialog.js";
import { Button as m } from "./button.js";
import { Input as b } from "./input.js";
import { Label as D } from "./label.js";
const k = l.createContext(null);
function R({ children: t }) {
  const [e, c] = l.useState(null), n = l.useRef(null), [s, u] = l.useState(""), v = l.useCallback((i) => (u(""), c(i), new Promise((d) => {
    n.current = d;
  })), []), a = (i) => {
    n.current?.(i), n.current = null, c(null), u("");
  }, f = e?.verifyText ? s !== e.verifyText : !1;
  return /* @__PURE__ */ o(k.Provider, { value: { open: v }, children: [
    t,
    /* @__PURE__ */ r(h, { open: e !== null, onOpenChange: (i) => !i && a(!1), children: /* @__PURE__ */ o(p, { children: [
      /* @__PURE__ */ o(C, { children: [
        /* @__PURE__ */ r(g, { children: e?.title }),
        e?.description && /* @__PURE__ */ r(y, { children: e.description })
      ] }),
      e?.verifyText && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 py-2", children: [
        /* @__PURE__ */ o(D, { htmlFor: "confirm-verify", children: [
          "Type",
          " ",
          /* @__PURE__ */ r("span", { className: "font-mono font-semibold text-foreground", children: e.verifyText }),
          " ",
          "to confirm"
        ] }),
        /* @__PURE__ */ r(
          b,
          {
            id: "confirm-verify",
            value: s,
            onChange: (i) => u(i.target.value),
            autoComplete: "off",
            autoFocus: !0
          }
        )
      ] }),
      /* @__PURE__ */ o(x, { children: [
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
  const t = l.useContext(k);
  if (!t)
    throw new V(
      "useConfirm",
      "called outside <ConfirmProvider>. Wrap your app root in <ConfirmProvider>.",
      "confirm-dialog"
    );
  const e = l.useCallback(
    (n) => t.open({ ...n, tone: n.tone ?? "default" }),
    [t]
  ), c = l.useCallback(
    (n) => t.open({ ...n, tone: "destructive" }),
    [t]
  );
  return Object.assign(e, { destructive: c });
}
function E({
  open: t,
  onOpenChange: e,
  onConfirm: c,
  title: n,
  description: s,
  confirmLabel: u,
  cancelLabel: v,
  tone: a = "default",
  verifyText: f
}) {
  const [i, d] = l.useState("");
  return l.useEffect(() => {
    t || d("");
  }, [t]), /* @__PURE__ */ r(h, { open: t, onOpenChange: e, children: /* @__PURE__ */ o(p, { children: [
    /* @__PURE__ */ o(C, { children: [
      /* @__PURE__ */ r(g, { children: n }),
      s && /* @__PURE__ */ r(y, { children: s })
    ] }),
    f && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 py-2", children: [
      /* @__PURE__ */ o(D, { htmlFor: "confirm-verify-controlled", children: [
        "Type",
        " ",
        /* @__PURE__ */ r("span", { className: "font-mono font-semibold text-foreground", children: f }),
        " ",
        "to confirm"
      ] }),
      /* @__PURE__ */ r(
        b,
        {
          id: "confirm-verify-controlled",
          value: i,
          onChange: (P) => d(P.target.value),
          autoComplete: "off",
          autoFocus: !0
        }
      )
    ] }),
    /* @__PURE__ */ o(x, { children: [
      /* @__PURE__ */ r(m, { variant: "outline", onClick: () => e(!1), children: v ?? "Cancel" }),
      /* @__PURE__ */ r(
        m,
        {
          variant: a === "destructive" ? "destructive" : "default",
          disabled: f ? i !== f : !1,
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
  E as ConfirmDialog,
  R as ConfirmProvider,
  S as useConfirm
};
//# sourceMappingURL=confirm-dialog.js.map
