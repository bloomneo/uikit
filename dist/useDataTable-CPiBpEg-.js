import { useState as y, useCallback as h, useEffect as B, useMemo as $ } from "react";
import { requireArrayProp as F } from "./errors.js";
const I = {};
function J(e = {}) {
  const [t, s] = y(null), [r, i] = y(!1), [T, a] = y(null), c = e.baseURL || I?.VITE_API_URL || (typeof window < "u" && window.location.hostname === "localhost" ? "http://localhost:3000" : ""), b = {
    "Content-Type": "application/json",
    ...e.headers
  }, p = h(async (d, S, E) => {
    i(!0), a(null);
    try {
      const x = new AbortController(), f = setTimeout(() => x.abort(), e.timeout || 1e4), _ = {
        method: d.toUpperCase(),
        headers: b,
        signal: x.signal
      };
      E && ["POST", "PUT", "PATCH"].includes(d.toUpperCase()) && (_.body = JSON.stringify(E));
      const U = `${c}${S}`, v = await fetch(U, _);
      if (clearTimeout(f), !v.ok)
        throw new Error(`HTTP ${v.status}: ${v.statusText}`);
      const n = await v.json();
      return s(n), n;
    } catch (x) {
      let f = "Network error occurred";
      throw x.name === "AbortError" ? f = "Request timeout" : x.message?.includes("fetch") ? f = "Backend not available - check if your API server is running" : f = x.message || "Unknown error occurred", a(f), new Error(f);
    } finally {
      i(!1);
    }
  }, [c, e.timeout]), C = h((d) => p("GET", d), [p]), k = h((d, S) => p("POST", d, S), [p]), P = h((d, S) => p("PUT", d, S), [p]), M = h((d) => p("DELETE", d), [p]), O = h(() => {
    s(null), a(null), i(!1);
  }, []);
  return {
    data: t,
    loading: r,
    error: T,
    call: p,
    get: C,
    post: k,
    put: P,
    delete: M,
    reset: O
  };
}
function q() {
  const { data: e, loading: t, error: s, get: r } = J(), i = h(async () => {
    try {
      return await r("/health"), !0;
    } catch {
      return !1;
    }
  }, [r]);
  return {
    isConnected: e?.status === "ok",
    loading: t,
    error: s,
    checkStatus: i,
    lastCheck: e?.timestamp
  };
}
function Q(e, t) {
  const [s, r] = y(() => {
    if (typeof window > "u")
      return t;
    try {
      const a = window.localStorage.getItem(e);
      return a ? JSON.parse(a) : t;
    } catch (a) {
      return console.warn(`Error reading localStorage key "${e}":`, a), t;
    }
  }), i = h(
    (a) => {
      try {
        const c = a instanceof Function ? a(s) : a;
        r(c), typeof window < "u" && window.localStorage.setItem(e, JSON.stringify(c));
      } catch (c) {
        console.error(`Error setting localStorage key "${e}":`, c);
      }
    },
    [e, s]
  ), T = h(() => {
    try {
      r(t), typeof window < "u" && window.localStorage.removeItem(e);
    } catch (a) {
      console.error(`Error removing localStorage key "${e}":`, a);
    }
  }, [e, t]);
  return B(() => {
    if (typeof window > "u") return;
    const a = (c) => {
      if (c.key === e && c.newValue !== null)
        try {
          r(JSON.parse(c.newValue));
        } catch (b) {
          console.warn(`Error parsing storage event for key "${e}":`, b);
        }
      else c.key === e && c.newValue === null && r(t);
    };
    return window.addEventListener("storage", a), () => window.removeEventListener("storage", a);
  }, [e, t]), [s, i, T];
}
function W(e) {
  const [t, s] = y(() => typeof window > "u" ? !1 : window.matchMedia(e).matches);
  return B(() => {
    if (typeof window > "u") return;
    const r = window.matchMedia(e);
    s(r.matches);
    const i = (T) => s(T.matches);
    return r.addEventListener ? (r.addEventListener("change", i), () => r.removeEventListener("change", i)) : (r.addListener(i), () => {
      r.removeListener(i);
    });
  }, [e]), t;
}
const R = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
function j(e, t = "up") {
  const s = R[e], r = ["sm", "md", "lg", "xl", "2xl"], i = r[r.indexOf(e) + 1];
  return t === "up" ? "(min-width: " + s + "px)" : t === "down" ? "(max-width: " + (s - 1) + "px)" : i ? "(min-width: " + s + "px) and (max-width: " + (R[i] - 1) + "px)" : "(min-width: " + s + "px)";
}
function N(e, t = "up") {
  return W(j(e, t));
}
function V() {
  const e = N("sm"), t = N("md"), s = N("lg"), r = N("xl");
  return N("2xl") ? "2xl" : r ? "xl" : s ? "lg" : t ? "md" : e ? "sm" : null;
}
function z(e) {
  const {
    columns: t,
    initialPage: s = 0,
    pageSize: r = 10,
    initialSearch: i = "",
    initialSort: T = [],
    getRowId: a = (n, o) => String(o)
  } = e, c = F(
    "useDataTable",
    "data",
    e.data,
    "Pass an array (use [] while loading instead of undefined)."
  ), [b, p] = y(i), [C, k] = y(T), [P, M] = y({}), [O, d] = y(s), S = h(
    (n, o) => {
      if (o.accessor) return o.accessor(n);
      if (o.accessorKey) return n[o.accessorKey];
    },
    []
  ), E = $(() => {
    let n = c;
    if (b) {
      const o = b.toLowerCase();
      n = n.filter(
        (w) => t.some((u) => {
          const g = S(w, u);
          return String(g ?? "").toLowerCase().includes(o);
        })
      );
    }
    if (Object.entries(P).forEach(([o, w]) => {
      const u = t.find((g) => g.id === o);
      u && (n = n.filter((g) => {
        const l = S(g, u), m = w.value;
        switch (w.operator) {
          case "equals":
            return l === m;
          case "startsWith":
            return String(l ?? "").toLowerCase().startsWith(String(m ?? "").toLowerCase());
          case "endsWith":
            return String(l ?? "").toLowerCase().endsWith(String(m ?? "").toLowerCase());
          case "gt":
            return Number(l) > Number(m);
          case "lt":
            return Number(l) < Number(m);
          case "gte":
            return Number(l) >= Number(m);
          case "lte":
            return Number(l) <= Number(m);
          case "contains":
          default:
            return String(l ?? "").toLowerCase().includes(String(m ?? "").toLowerCase());
        }
      }));
    }), C.length > 0) {
      const o = [...n];
      o.sort((w, u) => {
        for (const g of C) {
          const l = t.find((D) => D.id === g.key);
          if (!l) continue;
          const m = S(w, l), A = S(u, l);
          let L = 0;
          if (l.sortFn ? L = l.sortFn(m, A) : l.dataType === "number" ? L = Number(m) - Number(A) : l.dataType === "date" ? L = new Date(m).getTime() - new Date(A).getTime() : L = String(m ?? "").localeCompare(String(A ?? "")), L !== 0) return g.direction === "asc" ? L : -L;
        }
        return 0;
      }), n = o;
    }
    return n;
  }, [c, b, C, P, t, S]), x = Math.max(1, Math.ceil(E.length / r)), f = Math.min(O, x - 1), _ = $(
    () => E.slice(f * r, (f + 1) * r),
    [E, f, r]
  ), U = h(
    (n) => k((o) => {
      const w = o.find((u) => u.key === n);
      return w ? w.direction === "asc" ? o.map((u) => u.key === n ? { ...u, direction: "desc" } : u) : o.filter((u) => u.key !== n) : [...o, { key: n, direction: "asc" }];
    }),
    []
  ), v = h(
    (n, o) => M((w) => {
      if (o === null || o === "" || o === void 0) {
        const g = { ...w };
        return delete g[n], g;
      }
      const u = t.find((g) => g.id === n);
      return {
        ...w,
        [n]: { type: u?.filterType ?? "text", value: o, operator: "contains" }
      };
    }),
    [t]
  );
  return {
    rows: _,
    filteredRows: E,
    getRowId: a,
    search: b,
    setSearch: p,
    sort: C,
    setSort: k,
    toggleSort: U,
    filters: P,
    setFilter: v,
    clearFilters: () => M({}),
    page: f,
    pageSize: r,
    pageCount: x,
    setPage: d,
    nextPage: () => d((n) => Math.min(n + 1, x - 1)),
    prevPage: () => d((n) => Math.max(n - 1, 0)),
    canNextPage: f < x - 1,
    canPrevPage: f > 0
  };
}
export {
  R as B,
  q as a,
  Q as b,
  W as c,
  N as d,
  V as e,
  j as f,
  z as g,
  J as u
};
//# sourceMappingURL=useDataTable-CPiBpEg-.js.map
