import { jsx as v } from "react/jsx-runtime";
import { createContext as $, useState as E, useEffect as h, useContext as S } from "react";
const x = {
  clean: "bg-background text-foreground border-border",
  subtle: "bg-muted/30 text-foreground border-border/50",
  brand: "bg-primary text-primary-foreground border-primary/20",
  contrast: "bg-foreground text-background border-foreground/20"
  // Automatically flips with mode
}, L = [
  "base"
  // The only bundled theme. Brand yours by overriding tokens.
], f = $(void 0);
function I(e, r, o, m = !1, s = "uikit-theme") {
  if (typeof window > "u")
    return { theme: e, mode: r };
  if (m)
    return console.log(`🎨 Config priority: ${e} (${r} mode)`), { theme: e, mode: r };
  if (s === null) {
    if (o) {
      const n = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return console.log(`🎨 System preference (no storage): ${e} (${n} mode)`), { theme: e, mode: n };
    }
    return console.log(`🎨 Props only (no storage): ${e} (${r} mode)`), { theme: e, mode: r };
  }
  try {
    const i = localStorage.getItem(s);
    if (i) {
      const n = JSON.parse(i);
      if (n.theme && typeof n.theme == "string" && ["light", "dark"].includes(n.mode))
        return console.log(`🎨 Restored from storage: ${n.theme} (${n.mode} mode)`), n;
    }
    if (o) {
      const a = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return console.log(`🎨 System preference: ${e} (${a} mode)`), { theme: e, mode: a };
    }
    return console.log(`🎨 Props fallback: ${e} (${r} mode)`), { theme: e, mode: r };
  } catch (i) {
    return console.warn("Failed to load theme preferences, using defaults:", i), { theme: e, mode: r };
  }
}
function u(e, r) {
  if (typeof window > "u") return;
  const o = document.documentElement;
  o.classList.remove("light", "dark"), Array.from(o.classList).filter(
    (s) => s.startsWith("theme-")
  ).forEach((s) => {
    o.classList.remove(s);
  }), o.classList.add(r), o.classList.add(`theme-${e}`), T(e);
}
function T(e) {
  if (typeof document > "u" || typeof process < "u" && process.env?.NODE_ENV === "production") return;
  const r = `.theme-${e}`;
  let o = !1;
  for (const m of Array.from(document.styleSheets)) {
    try {
      for (const s of Array.from(m.cssRules))
        if (s.selectorText?.includes(r)) {
          o = !0;
          break;
        }
    } catch {
      o = !0;
    }
    if (o) break;
  }
  o || console.warn(
    `[@bloomneo/uikit] Theme "${e}" is applied to <html>, but no stylesheet defines "${r}". Every token falls back to the base theme — which usually shows up as the wrong accent colour, with no error.
  · Renamed or removed this theme? Clear the stored preference: localStorage.removeItem('uikit-theme')
  · Or ignore storage entirely: <ThemeProvider theme="…" forceConfig />`
  );
}
function C({
  children: e,
  theme: r = "base",
  mode: o = "light",
  detectSystem: m = !0,
  forceConfig: s = !1,
  // 🔧 NEW: Force config over storage
  storageKey: i = "uikit-theme"
  // 🔧 NEW: Configurable storage key
}) {
  const [n, a] = E(() => {
    const t = I(r, o, m, s, i);
    return u(t.theme, t.mode), t;
  });
  h(() => {
    if (typeof window > "u") return;
    const { theme: t, mode: c } = n;
    if (u(t, c), i && !s)
      try {
        localStorage.setItem(i, JSON.stringify({ theme: t, mode: c }));
      } catch (d) {
        console.warn("Failed to save theme preferences:", d);
      }
    console.log(`🎨 Applied theme: ${t} (${c} mode)`);
  }, [n, i, s]), h(() => {
    if (!m || typeof window > "u") return;
    const t = window.matchMedia("(prefers-color-scheme: dark)"), c = (d) => {
      if (!s)
        try {
          i && localStorage.getItem(i) || a((y) => ({
            ...y,
            mode: d.matches ? "dark" : "light"
          }));
        } catch (l) {
          console.warn("Failed to handle system preference change:", l);
        }
    };
    return t.addEventListener("change", c), () => t.removeEventListener("change", c);
  }, [m, s, i]);
  const g = (t) => {
    a((c) => ({ ...c, theme: t }));
  }, p = (t) => {
    if (t !== "light" && t !== "dark") {
      console.warn(`Invalid mode: ${t}. Expected 'light' or 'dark'.`);
      return;
    }
    a((c) => ({ ...c, mode: t }));
  }, k = () => {
    a((t) => ({
      ...t,
      mode: t.mode === "light" ? "dark" : "light"
    }));
  }, b = (t) => x[t], w = {
    theme: n.theme,
    mode: n.mode,
    availableThemes: L,
    setTheme: g,
    setMode: p,
    toggleMode: k,
    getToneClasses: b
  };
  return /* @__PURE__ */ v(f.Provider, { value: w, children: e });
}
function D() {
  const e = S(f);
  if (!e)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
export {
  L as AVAILABLE_THEMES,
  C as ThemeProvider,
  D as useTheme
};
//# sourceMappingURL=theme-provider.js.map
