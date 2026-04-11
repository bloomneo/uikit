const n = "https://voilajsx.github.io/uikit/llms#";
class i extends Error {
  constructor(o, r, e) {
    const t = n + (e ?? o.toLowerCase());
    super("[@voilajsx/uikit] <" + o + "> " + r + `
See: ` + t), this.name = "UIKitError", this.component = o, this.docsUrl = t;
  }
}
function c(s, o, r, e) {
  if (r == null) {
    const t = e ? "requires `" + o + "` prop. " + e : "requires `" + o + "` prop (missing or null).";
    throw new i(s, t);
  }
  return r;
}
function a(s, o, r, e) {
  if (!Array.isArray(r)) {
    const t = r === void 0 ? "undefined" : r === null ? "null" : typeof r, u = e ? "expects `" + o + "` to be an array (got " + t + "). " + e : "expects `" + o + "` to be an array (got " + t + ").";
    throw new i(s, u);
  }
  return r;
}
function l(s, o, r) {
  if (typeof process < "u" && process.env && process.env.NODE_ENV === "production")
    return;
  const e = n + (r ?? s.toLowerCase());
  console.warn("[@voilajsx/uikit] <" + s + "> " + o + `
See: ` + e);
}
export {
  i as UIKitError,
  a as requireArrayProp,
  c as requireProp,
  l as warnInDev
};
//# sourceMappingURL=errors.js.map
