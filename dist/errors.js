const i = "https://bloomneo.github.io/uikit/llms#";
class t extends Error {
  constructor(o, r, s) {
    const n = i + (s ?? o.toLowerCase());
    super("[@bloomneo/uikit] <" + o + "> " + r + `
See: ` + n), this.name = "UIKitError", this.component = o, this.docsUrl = n;
  }
}
class c extends t {
  constructor(o, r = "data-table") {
    super("DataTable", o, r), this.name = "DataTableError";
  }
}
class u extends t {
  constructor(o, r = "form-field") {
    super("FormField", o, r), this.name = "FormFieldError";
  }
}
class l extends t {
  constructor(o, r = "theme-provider") {
    super("ThemeProvider", o, r), this.name = "ThemeError";
  }
}
class m extends t {
  constructor(o, r = "confirm-dialog") {
    super("ConfirmDialog", o, r), this.name = "ConfirmError";
  }
}
class d extends t {
  constructor(o, r = "toast") {
    super("Toast", o, r), this.name = "ToastError";
  }
}
class p extends t {
  constructor(o, r = "permission-gate") {
    super("PermissionGate", o, r), this.name = "PermissionError";
  }
}
function E(e, o, r, s) {
  if (r == null) {
    const n = s ? "requires `" + o + "` prop. " + s : "requires `" + o + "` prop (missing or null).";
    throw new t(e, n);
  }
  return r;
}
function f(e, o, r, s) {
  if (!Array.isArray(r)) {
    const n = r === void 0 ? "undefined" : r === null ? "null" : typeof r, a = s ? "expects `" + o + "` to be an array (got " + n + "). " + s : "expects `" + o + "` to be an array (got " + n + ").";
    throw new t(e, a);
  }
  return r;
}
function h(e, o, r) {
  if (typeof process < "u" && process.env && process.env.NODE_ENV === "production")
    return;
  const s = i + (r ?? e.toLowerCase());
  console.warn("[@bloomneo/uikit] <" + e + "> " + o + `
See: ` + s);
}
export {
  m as ConfirmError,
  c as DataTableError,
  u as FormFieldError,
  p as PermissionError,
  l as ThemeError,
  d as ToastError,
  t as UIKitError,
  f as requireArrayProp,
  E as requireProp,
  h as warnInDev
};
//# sourceMappingURL=errors.js.map
