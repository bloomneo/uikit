import { jsx as m } from "react/jsx-runtime";
import { T as i, t as s } from "./index-B6sSWi7l.js";
import { useTheme as c } from "./theme-provider.js";
function T({
  position: r = "bottom-right",
  theme: o,
  ...n
}) {
  let a = "system";
  try {
    a = c().mode;
  } catch {
  }
  return /* @__PURE__ */ m(
    i,
    {
      position: r,
      theme: o ?? a,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...n
    }
  );
}
function e(r, o, n = {}) {
  return (r === "success" ? s.success : r === "error" ? s.error : r === "info" ? s.info : r === "warning" ? s.warning : s)(o, n);
}
function u(r, o) {
  s.promise(r, o);
}
const t = ((r, o) => {
  e("message", r, o);
});
t.success = (r, o) => {
  e("success", r, o);
};
t.error = (r, o) => {
  e("error", r, o);
};
t.info = (r, o) => {
  e("info", r, o);
};
t.warning = (r, o) => {
  e("warning", r, o);
};
t.promise = u;
t.dismiss = (r) => {
  s.dismiss(r);
};
const f = t;
function v() {
  return f;
}
export {
  T as ToastProvider,
  f as toast,
  v as useToast
};
//# sourceMappingURL=toast.js.map
