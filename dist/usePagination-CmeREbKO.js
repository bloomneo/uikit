import { useState as M, useCallback as f, useEffect as D, useMemo as U } from "react";
import { requireArrayProp as I } from "./errors.js";
const J = {};
function W(e = {}) {
  const [t, n] = M(null), [r, o] = M(!1), [d, i] = M(null), a = e.baseURL || J?.VITE_API_URL || (typeof window < "u" && window.location.hostname === "localhost" ? "http://localhost:3000" : ""), l = {
    "Content-Type": "application/json",
    ...e.headers
  }, u = f(async (g, y, E) => {
    o(!0), i(null);
    try {
      const b = new AbortController(), w = setTimeout(() => b.abort(), e.timeout || 1e4), _ = {
        method: g.toUpperCase(),
        headers: l,
        signal: b.signal
      };
      E && ["POST", "PUT", "PATCH"].includes(g.toUpperCase()) && (_.body = JSON.stringify(E));
      const O = `${a}${y}`, C = await fetch(O, _);
      if (clearTimeout(w), !C.ok)
        throw new Error(`HTTP ${C.status}: ${C.statusText}`);
      const s = await C.json();
      return n(s), s;
    } catch (b) {
      let w = "Network error occurred";
      throw b.name === "AbortError" ? w = "Request timeout" : b.message?.includes("fetch") ? w = "Backend not available - check if your API server is running" : w = b.message || "Unknown error occurred", i(w), new Error(w);
    } finally {
      o(!1);
    }
  }, [a, e.timeout]), P = f((g) => u("GET", g), [u]), v = f((g, y) => u("POST", g, y), [u]), T = f((g, y) => u("PUT", g, y), [u]), N = f((g) => u("DELETE", g), [u]), k = f(() => {
    n(null), i(null), o(!1);
  }, []);
  return {
    data: t,
    loading: r,
    error: d,
    call: u,
    get: P,
    post: v,
    put: T,
    delete: N,
    reset: k
  };
}
function Q() {
  const { data: e, loading: t, error: n, get: r } = W(), o = f(async () => {
    try {
      return await r("/health"), !0;
    } catch {
      return !1;
    }
  }, [r]);
  return {
    isConnected: e?.status === "ok",
    loading: t,
    error: n,
    checkStatus: o,
    lastCheck: e?.timestamp
  };
}
function V(e, t) {
  const [n, r] = M(() => {
    if (typeof window > "u")
      return t;
    try {
      const i = window.localStorage.getItem(e);
      return i ? JSON.parse(i) : t;
    } catch (i) {
      return console.warn(`Error reading localStorage key "${e}":`, i), t;
    }
  }), o = f(
    (i) => {
      try {
        const a = i instanceof Function ? i(n) : i;
        r(a), typeof window < "u" && window.localStorage.setItem(e, JSON.stringify(a));
      } catch (a) {
        console.error(`Error setting localStorage key "${e}":`, a);
      }
    },
    [e, n]
  ), d = f(() => {
    try {
      r(t), typeof window < "u" && window.localStorage.removeItem(e);
    } catch (i) {
      console.error(`Error removing localStorage key "${e}":`, i);
    }
  }, [e, t]);
  return D(() => {
    if (typeof window > "u") return;
    const i = (a) => {
      if (a.key === e && a.newValue !== null)
        try {
          r(JSON.parse(a.newValue));
        } catch (l) {
          console.warn(`Error parsing storage event for key "${e}":`, l);
        }
      else a.key === e && a.newValue === null && r(t);
    };
    return window.addEventListener("storage", i), () => window.removeEventListener("storage", i);
  }, [e, t]), [n, o, d];
}
function j(e) {
  const [t, n] = M(() => typeof window > "u" ? !1 : window.matchMedia(e).matches);
  return D(() => {
    if (typeof window > "u") return;
    const r = window.matchMedia(e);
    n(r.matches);
    const o = (d) => n(d.matches);
    return r.addEventListener ? (r.addEventListener("change", o), () => r.removeEventListener("change", o)) : (r.addListener(o), () => {
      r.removeListener(o);
    });
  }, [e]), t;
}
const $ = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
function H(e, t = "up") {
  const n = $[e], r = ["sm", "md", "lg", "xl", "2xl"], o = r[r.indexOf(e) + 1];
  return t === "up" ? "(min-width: " + n + "px)" : t === "down" ? "(max-width: " + (n - 1) + "px)" : o ? "(min-width: " + n + "px) and (max-width: " + ($[o] - 1) + "px)" : "(min-width: " + n + "px)";
}
function R(e, t = "up") {
  return j(H(e, t));
}
function G() {
  const e = R("sm"), t = R("md"), n = R("lg"), r = R("xl");
  return R("2xl") ? "2xl" : r ? "xl" : n ? "lg" : t ? "md" : e ? "sm" : null;
}
function X(e) {
  const {
    columns: t,
    initialPage: n = 0,
    pageSize: r = 10,
    initialSearch: o = "",
    initialSort: d = [],
    getRowId: i = (s, c) => String(c)
  } = e, a = I(
    "useDataTable",
    "data",
    e.data,
    "Pass an array (use [] while loading instead of undefined)."
  ), [l, u] = M(o), [P, v] = M(d), [T, N] = M({}), [k, g] = M(n), y = f(
    (s, c) => {
      if (c.accessor) return c.accessor(s);
      if (c.accessorKey) return s[c.accessorKey];
    },
    []
  ), E = U(() => {
    let s = a;
    if (l) {
      const c = l.toLowerCase();
      s = s.filter(
        (S) => t.some((h) => {
          const p = y(S, h);
          return String(p ?? "").toLowerCase().includes(c);
        })
      );
    }
    if (Object.entries(T).forEach(([c, S]) => {
      const h = t.find((p) => p.id === c);
      h && (s = s.filter((p) => {
        const m = y(p, h), x = S.value;
        switch (S.operator) {
          case "equals":
            return m === x;
          case "startsWith":
            return String(m ?? "").toLowerCase().startsWith(String(x ?? "").toLowerCase());
          case "endsWith":
            return String(m ?? "").toLowerCase().endsWith(String(x ?? "").toLowerCase());
          case "gt":
            return Number(m) > Number(x);
          case "lt":
            return Number(m) < Number(x);
          case "gte":
            return Number(m) >= Number(x);
          case "lte":
            return Number(m) <= Number(x);
          case "contains":
          default:
            return String(m ?? "").toLowerCase().includes(String(x ?? "").toLowerCase());
        }
      }));
    }), P.length > 0) {
      const c = [...s];
      c.sort((S, h) => {
        for (const p of P) {
          const m = t.find((F) => F.id === p.key);
          if (!m) continue;
          const x = y(S, m), A = y(h, m);
          let L = 0;
          if (m.sortFn ? L = m.sortFn(x, A) : m.dataType === "number" ? L = Number(x) - Number(A) : m.dataType === "date" ? L = new Date(x).getTime() - new Date(A).getTime() : L = String(x ?? "").localeCompare(String(A ?? "")), L !== 0) return p.direction === "asc" ? L : -L;
        }
        return 0;
      }), s = c;
    }
    return s;
  }, [a, l, P, T, t, y]), b = Math.max(1, Math.ceil(E.length / r)), w = Math.min(k, b - 1), _ = U(
    () => E.slice(w * r, (w + 1) * r),
    [E, w, r]
  ), O = f(
    (s) => v((c) => {
      const S = c.find((h) => h.key === s);
      return S ? S.direction === "asc" ? c.map((h) => h.key === s ? { ...h, direction: "desc" } : h) : c.filter((h) => h.key !== s) : [...c, { key: s, direction: "asc" }];
    }),
    []
  ), C = f(
    (s, c) => N((S) => {
      if (c === null || c === "" || c === void 0) {
        const p = { ...S };
        return delete p[s], p;
      }
      const h = t.find((p) => p.id === s);
      return {
        ...S,
        [s]: { type: h?.filterType ?? "text", value: c, operator: "contains" }
      };
    }),
    [t]
  );
  return {
    rows: _,
    filteredRows: E,
    getRowId: i,
    search: l,
    setSearch: u,
    sort: P,
    setSort: v,
    toggleSort: O,
    filters: T,
    setFilter: C,
    clearFilters: () => N({}),
    page: w,
    pageSize: r,
    pageCount: b,
    setPage: g,
    nextPage: () => g((s) => Math.min(s + 1, b - 1)),
    prevPage: () => g((s) => Math.max(s - 1, 0)),
    canNextPage: w < b - 1,
    canPrevPage: w > 0
  };
}
function B(e, t) {
  const n = [];
  for (let r = e; r <= t; r++) n.push(r);
  return n;
}
function K(e, t, n) {
  if (t <= 7) return B(1, t);
  const r = Math.max(2, e - Math.floor(n / 2)), o = Math.min(t - 1, e + Math.floor(n / 2)), d = r > 2, i = o < t - 1, a = [1];
  return d && a.push("ellipsis-start"), a.push(...B(r, o)), i && a.push("ellipsis-end"), a.push(t), a;
}
function Y(e) {
  const {
    total: t,
    pageSize: n = 10,
    initialPage: r = 1,
    siblingCount: o = 5
  } = e, d = Math.max(1, Math.ceil(t / n)), [i, a] = M(r), l = Math.min(Math.max(1, i), d), u = f((g) => {
    a(Math.min(Math.max(1, Math.floor(g)), d));
  }, [d]), P = f(() => u(l + 1), [u, l]), v = f(() => u(l - 1), [u, l]), T = f(() => u(1), [u]), N = f(() => u(d), [u, d]), k = U(
    () => K(l, d, o),
    [l, d, o]
  );
  return {
    page: l,
    pageSize: n,
    total: t,
    pageCount: d,
    startIndex: (l - 1) * n,
    endIndex: Math.min(l * n, t),
    hasNext: l < d,
    hasPrev: l > 1,
    pages: k,
    goTo: u,
    next: P,
    prev: v,
    first: T,
    last: N
  };
}
export {
  $ as B,
  Q as a,
  V as b,
  j as c,
  R as d,
  G as e,
  H as f,
  X as g,
  Y as h,
  W as u
};
//# sourceMappingURL=usePagination-CmeREbKO.js.map
