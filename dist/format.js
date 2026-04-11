import * as s from "react";
function w(n, e = {}) {
  if (n == null || Number.isNaN(n)) return "";
  const {
    currency: t = "USD",
    locale: o = "en-US",
    minimumFractionDigits: r = 2,
    maximumFractionDigits: i = 2
  } = e;
  return new Intl.NumberFormat(o, {
    style: "currency",
    currency: t,
    minimumFractionDigits: r,
    maximumFractionDigits: i
  }).format(n);
}
function S(n, e = {}) {
  if (n == null || Number.isNaN(n)) return "";
  const {
    locale: t = "en-US",
    minimumFractionDigits: o = 0,
    maximumFractionDigits: r = 2,
    percent: i = !1
  } = e;
  return new Intl.NumberFormat(t, {
    style: i ? "percent" : "decimal",
    minimumFractionDigits: o,
    maximumFractionDigits: r
  }).format(n);
}
const h = {
  short: { year: "numeric", month: "numeric", day: "numeric" },
  medium: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
  full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
  datetime: {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  },
  time: { hour: "numeric", minute: "numeric" }
};
function f(n) {
  if (n == null) return null;
  const e = n instanceof Date ? n : new Date(n);
  return Number.isNaN(e.getTime()) ? null : e;
}
function y(n, e = {}) {
  const t = f(n);
  if (!t) return "";
  const { locale: o = "en-US", preset: r = "medium" } = e;
  return new Intl.DateTimeFormat(o, h[r]).format(t);
}
const g = [
  ["year", 3600 * 24 * 365],
  ["month", 3600 * 24 * 30],
  ["week", 3600 * 24 * 7],
  ["day", 3600 * 24],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1]
];
function N(n, e = {}) {
  const t = f(n);
  if (!t) return "";
  const { locale: o = "en-US", now: r = Date.now() } = e, i = typeof r == "number" ? r : r.getTime(), m = Math.round((t.getTime() - i) / 1e3), u = Math.abs(m);
  for (const [a, c] of g)
    if (u >= c || a === "second") {
      const d = Math.round(m / c);
      return new Intl.RelativeTimeFormat(o, { numeric: "auto" }).format(d, a);
    }
  return "";
}
const l = ["B", "KB", "MB", "GB", "TB", "PB"];
function T(n, e = {}) {
  if (n == null || Number.isNaN(n)) return "";
  const { decimals: t = 1, binary: o = !1 } = e, r = o ? 1024 : 1e3;
  if (n === 0) return "0 B";
  const i = Math.min(Math.floor(Math.log(Math.abs(n)) / Math.log(r)), l.length - 1);
  return (n / Math.pow(r, i)).toFixed(t) + " " + l[i];
}
function b({
  date: n,
  mode: e = "relative",
  updateInterval: t = 6e4,
  locale: o,
  preset: r,
  ...i
}) {
  const [, m] = s.useReducer((c) => c + 1, 0);
  s.useEffect(() => {
    if (e !== "relative") return;
    const c = window.setInterval(() => m(), t);
    return () => window.clearInterval(c);
  }, [e, t]);
  const u = e === "relative" ? N(n, o ? { locale: o } : void 0) : y(n, { locale: o, preset: r }), a = (() => {
    const c = f(n);
    return c ? c.toISOString() : void 0;
  })();
  return s.createElement("time", { dateTime: a, ...i }, u);
}
export {
  b as Time,
  T as formatBytes,
  w as formatCurrency,
  y as formatDate,
  S as formatNumber,
  N as timeAgo
};
//# sourceMappingURL=format.js.map
