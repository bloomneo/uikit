import { jsxs as o, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { Dialog as h, DialogContent as C, DialogHeader as p, DialogTitle as g, DialogDescription as y, DialogFooter as x } from "./dialog.js";
import { Button as m } from "./button.js";
import { Input as b } from "./input.js";
import { Label as D } from "./label.js";
const k = l.createContext(null);
function L({ children: t }) {
  const [e, c] = l.useState(null), n = l.useRef(null), [f, u] = l.useState(""), v = l.useCallback((i) => (u(""), c(i), new Promise((d) => {
    n.current = d;
  })), []), a = (i) => {
    n.current?.(i), n.current = null, c(null), u("");
  }, s = e?.verifyText ? f !== e.verifyText : !1;
  return /* @__PURE__ */ o(k.Provider, { value: { open: v }, children: [
    t,
    /* @__PURE__ */ r(h, { open: e !== null, onOpenChange: (i) => !i && a(!1), children: /* @__PURE__ */ o(C, { children: [
      /* @__PURE__ */ o(p, { children: [
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
            value: f,
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
            disabled: s,
            onClick: () => a(!0),
            children: e?.confirmLabel ?? (e?.tone === "destructive" ? "Delete" : "Confirm")
          }
        )
      ] })
    ] }) })
  ] });
}
function M() {
  const t = l.useContext(k);
  if (!t)
    throw new Error(
      "[@bloomneo/uikit] useConfirm() called outside <ConfirmProvider>. Wrap your app root in <ConfirmProvider>."
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
function R({
  open: t,
  onOpenChange: e,
  onConfirm: c,
  title: n,
  description: f,
  confirmLabel: u,
  cancelLabel: v,
  tone: a = "default",
  verifyText: s
}) {
  const [i, d] = l.useState("");
  return l.useEffect(() => {
    t || d("");
  }, [t]), /* @__PURE__ */ r(h, { open: t, onOpenChange: e, children: /* @__PURE__ */ o(C, { children: [
    /* @__PURE__ */ o(p, { children: [
      /* @__PURE__ */ r(g, { children: n }),
      f && /* @__PURE__ */ r(y, { children: f })
    ] }),
    s && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 py-2", children: [
      /* @__PURE__ */ o(D, { htmlFor: "confirm-verify-controlled", children: [
        "Type",
        " ",
        /* @__PURE__ */ r("span", { className: "font-mono font-semibold text-foreground", children: s }),
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
          disabled: s ? i !== s : !1,
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
  R as ConfirmDialog,
  L as ConfirmProvider,
  M as useConfirm
};
//# sourceMappingURL=confirm-dialog.js.map
