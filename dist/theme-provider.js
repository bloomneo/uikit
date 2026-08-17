import { jsx as $ } from "react/jsx-runtime";
import { createContext as y, useState as S, useEffect as h, useContext as x } from "react";
const E = {
  clean: "bg-background text-foreground border-border",
  subtle: "bg-muted/30 text-foreground border-border/50",
  brand: "bg-primary text-primary-foreground border-primary/20",
  contrast: "bg-foreground text-background border-foreground/20"
  // Automatically flips with mode
}, L = [
  "base"
  // The only bundled theme. Brand yours by overriding tokens.
], g = y(void 0);
function I(t, n, m, a = !1, s = "uikit-theme") {
  if (typeof window > "u")
    return { theme: t, mode: n };
  if (a)
    return console.log(`🎨 Config priority: ${t} (${n} mode)`), { theme: t, mode: n };
  if (s === null) {
    if (m) {
      const r = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return console.log(`🎨 System preference (no storage): ${t} (${r} mode)`), { theme: t, mode: r };
    }
    return console.log(`🎨 Props only (no storage): ${t} (${n} mode)`), { theme: t, mode: n };
  }
  try {
    const o = localStorage.getItem(s);
    if (o) {
      const r = JSON.parse(o);
      if (r.theme && typeof r.theme == "string" && ["light", "dark"].includes(r.mode))
        return console.log(`🎨 Restored from storage: ${r.theme} (${r.mode} mode)`), r;
    }
    if (m) {
      const c = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      return console.log(`🎨 System preference: ${t} (${c} mode)`), { theme: t, mode: c };
    }
    return console.log(`🎨 Props fallback: ${t} (${n} mode)`), { theme: t, mode: n };
  } catch (o) {
    return console.warn("Failed to load theme preferences, using defaults:", o), { theme: t, mode: n };
  }
}
function u(t, n) {
  if (typeof window > "u") return;
  const m = document.documentElement;
  m.classList.remove("light", "dark"), Array.from(m.classList).filter(
    (s) => s.startsWith("theme-")
  ).forEach((s) => {
    m.classList.remove(s);
  }), m.classList.add(n), m.classList.add(`theme-${t}`);
}
function T({
  children: t,
  theme: n = "base",
  mode: m = "light",
  detectSystem: a = !0,
  forceConfig: s = !1,
  // 🔧 NEW: Force config over storage
  storageKey: o = "uikit-theme"
  // 🔧 NEW: Configurable storage key
}) {
  const [r, c] = S(() => {
    const e = I(n, m, a, s, o);
    return u(e.theme, e.mode), e;
  });
  h(() => {
    if (typeof window > "u") return;
    const { theme: e, mode: i } = r;
    if (u(e, i), o && !s)
      try {
        localStorage.setItem(o, JSON.stringify({ theme: e, mode: i }));
      } catch (d) {
        console.warn("Failed to save theme preferences:", d);
      }
    console.log(`🎨 Applied theme: ${e} (${i} mode)`);
  }, [r, o, s]), h(() => {
    if (!a || typeof window > "u") return;
    const e = window.matchMedia("(prefers-color-scheme: dark)"), i = (d) => {
      if (!s)
        try {
          o && localStorage.getItem(o) || c((v) => ({
            ...v,
            mode: d.matches ? "dark" : "light"
          }));
        } catch (l) {
          console.warn("Failed to handle system preference change:", l);
        }
    };
    return e.addEventListener("change", i), () => e.removeEventListener("change", i);
  }, [a, s, o]);
  const f = (e) => {
    c((i) => ({ ...i, theme: e }));
  }, p = (e) => {
    if (e !== "light" && e !== "dark") {
      console.warn(`Invalid mode: ${e}. Expected 'light' or 'dark'.`);
      return;
    }
    c((i) => ({ ...i, mode: e }));
  }, k = () => {
    c((e) => ({
      ...e,
      mode: e.mode === "light" ? "dark" : "light"
    }));
  }, b = (e) => E[e], w = {
    theme: r.theme,
    mode: r.mode,
    availableThemes: L,
    setTheme: f,
    setMode: p,
    toggleMode: k,
    getToneClasses: b
  };
  return /* @__PURE__ */ $(g.Provider, { value: w, children: t });
}
function D() {
  const t = x(g);
  if (!t)
    throw new Error("useTheme must be used within a ThemeProvider");
  return t;
}
export {
  L as AVAILABLE_THEMES,
  T as ThemeProvider,
  D as useTheme
};
//# sourceMappingURL=theme-provider.js.map
