import { jsx as i } from "react/jsx-runtime";
import * as c from "react";
import { T as f, t } from "./index-CzNW0SAH.js";
import { useTheme as u } from "./theme-provider.js";
import { warnInDev as l } from "./errors.js";
let m = !1;
function w({
  position: o = "bottom-right",
  theme: r,
  ...a
}) {
  c.useEffect(() => (m && l("ToastProvider", "mounted more than once. Only mount a single <ToastProvider> at the app root.", "toast"), m = !0, () => {
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
        // UIKit's tokens are Tailwind v4 `@theme` names (`--color-popover`),
        // not shadcn's bare `--popover`. Copying shadcn's Toaster verbatim
        // left these pointing at variables that do not exist, so every toast
        // rendered with a transparent background and unreadable text over
        // whatever happened to be behind it.
        "--normal-bg": "var(--color-popover)",
        "--normal-text": "var(--color-popover-foreground)",
        "--normal-border": "var(--color-border)"
      },
      ...a
    }
  );
}
function s(o, r, a = {}) {
  return (o === "success" ? t.success : o === "error" ? t.error : o === "info" ? t.info : o === "warning" ? t.warning : t)(r, a);
}
function p(o, r) {
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
e.promise = p;
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
