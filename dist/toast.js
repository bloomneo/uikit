import { jsx as i } from "react/jsx-runtime";
import * as c from "react";
import { T as f, t } from "./index-B6sSWi7l.js";
import { useTheme as u } from "./theme-provider.js";
import { warnInDev as p } from "./errors.js";
let m = !1;
function w({
  position: o = "bottom-right",
  theme: r,
  ...a
}) {
  c.useEffect(() => (m && p("ToastProvider", "mounted more than once. Only mount a single <ToastProvider> at the app root.", "toast"), m = !0, () => {
    m = !1;
  }), []);
  let n = "system";
  try {
    n = u().mode;
  } catch {
  }
  return /* @__PURE__ */ i(
    f,
    {
      position: o,
      theme: r ?? n,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...a
    }
  );
}
function s(o, r, a = {}) {
  return (o === "success" ? t.success : o === "error" ? t.error : o === "info" ? t.info : o === "warning" ? t.warning : t)(r, a);
}
function l(o, r) {
  t.promise(o, r);
}
const e = ((o, r) => {
  s("message", o, r);
});
e.success = (o, r) => {
  s("success", o, r);
};
e.error = (o, r) => {
  s("error", o, r);
};
e.info = (o, r) => {
  s("info", o, r);
};
e.warning = (o, r) => {
  s("warning", o, r);
};
e.promise = l;
e.dismiss = (o) => {
  t.dismiss(o);
};
const d = e;
function b() {
  return d;
}
export {
  w as ToastProvider,
  d as toast,
  b as useToast
};
//# sourceMappingURL=toast.js.map
