const s = "https://bloomneo.github.io/uikit/llms#";
class i extends Error {
  constructor(o, r, e) {
    const t = s + (e ?? o.toLowerCase());
    super("[@bloomneo/uikit] <" + o + "> " + r + `
See: ` + t), this.name = "UIKitError", this.component = o, this.docsUrl = t;
  }
}
function c(n, o, r, e) {
  if (r == null) {
    const t = e ? "requires `" + o + "` prop. " + e : "requires `" + o + "` prop (missing or null).";
    throw new i(n, t);
  }
  return r;
}
function l(n, o, r, e) {
  if (!Array.isArray(r)) {
    const t = r === void 0 ? "undefined" : r === null ? "null" : typeof r, u = e ? "expects `" + o + "` to be an array (got " + t + "). " + e : "expects `" + o + "` to be an array (got " + t + ").";
    throw new i(n, u);
  }
  return r;
}
function a(n, o, r) {
  if (typeof process < "u" && process.env && process.env.NODE_ENV === "production")
    return;
  const e = s + (r ?? n.toLowerCase());
  console.warn("[@bloomneo/uikit] <" + n + "> " + o + `
See: ` + e);
}
export {
  i as UIKitError,
  l as requireArrayProp,
  c as requireProp,
  a as warnInDev
};
//# sourceMappingURL=errors.js.map
