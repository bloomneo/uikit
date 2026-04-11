import { jsx as S } from "react/jsx-runtime";
import * as m from "react";
import { T as b } from "./index-B6sSWi7l.js";
var T = (t, s, i, a, n, r, d, u) => {
  let o = document.documentElement, p = ["light", "dark"];
  function c(e) {
    (Array.isArray(t) ? t : [t]).forEach((l) => {
      let h = l === "class", v = h && r ? n.map((f) => r[f] || f) : n;
      h ? (o.classList.remove(...v), o.classList.add(r && r[e] ? r[e] : e)) : o.setAttribute(l, e);
    }), y(e);
  }
  function y(e) {
    u && p.includes(e) && (o.style.colorScheme = e);
  }
  function g() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (a) c(a);
  else try {
    let e = localStorage.getItem(s) || i, l = d && e === "system" ? g() : e;
    c(l);
  } catch {
  }
}, x = m.createContext(void 0), w = { setTheme: (t) => {
}, themes: [] }, k = () => {
  var t;
  return (t = m.useContext(x)) != null ? t : w;
};
m.memo(({ forcedTheme: t, storageKey: s, attribute: i, enableSystem: a, enableColorScheme: n, defaultTheme: r, value: d, themes: u, nonce: o, scriptProps: p }) => {
  let c = JSON.stringify([i, s, r, t, u, d, a, n]).slice(1, -1);
  return m.createElement("script", { ...p, suppressHydrationWarning: !0, nonce: typeof window > "u" ? o : "", dangerouslySetInnerHTML: { __html: `(${T.toString()})(${c})` } });
});
const E = ({ ...t }) => {
  const { theme: s = "system" } = k();
  return /* @__PURE__ */ S(
    b,
    {
      theme: s,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...t
    }
  );
};
export {
  E as Toaster
};
//# sourceMappingURL=sonner.js.map
