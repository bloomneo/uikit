import { jsx as n, Fragment as i } from "react/jsx-runtime";
import * as o from "react";
const s = o.createContext(null);
function l({ check: e, children: r }) {
  const t = o.useMemo(() => ({ check: e }), [e]);
  return /* @__PURE__ */ n(s.Provider, { value: t, children: r });
}
function u() {
  const e = o.useContext(s);
  return o.useCallback(
    (r) => a(r, e?.check),
    [e]
  );
}
function a(e, r) {
  return typeof e == "boolean" ? e : typeof e == "function" ? e() : r ? typeof e == "string" ? r(e) : e.some(r) : (process.env.NODE_ENV !== "production" && console.warn(
    "[@bloomneo/uikit] <PermissionGate> evaluated `when` as a string/array but no <PermissionProvider> is mounted. Wrap your app in <PermissionProvider check={...}>."
  ), !1);
}
function c({ when: e, children: r, fallback: t = null }) {
  return u()(e) ? /* @__PURE__ */ n(i, { children: r }) : /* @__PURE__ */ n(i, { children: t });
}
export {
  c as PermissionGate,
  l as PermissionProvider,
  u as usePermission
};
//# sourceMappingURL=permission-gate.js.map
