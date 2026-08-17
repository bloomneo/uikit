import { jsx as C, jsxs as ne } from "react/jsx-runtime";
import { D as Se, e as Ie, d as Re, b as De } from "./index-tBy_fxjI.js";
import * as l from "react";
import { P as D } from "./index-rT3N9N4T.js";
import { u as j } from "./index-BraAqWsy.js";
import { b as V } from "./index-DFmzheZp.js";
import { c as A } from "./utils-D7gXXjDs.js";
import { Dialog as Ae, DialogHeader as _e, DialogTitle as $e, DialogDescription as Me, DialogContent as Ne } from "./dialog.js";
import { S as Fe } from "./search-BUthbViq.js";
var pe = 1, Ke = 0.9, Pe = 0.8, je = 0.17, ee = 0.1, te = 0.999, Le = 0.9999, qe = 0.99, Ve = /[\\\/_+.#"@\[\(\{&]/, ze = /[\\\/_+.#"@\[\(\{&]/g, Oe = /[\s-]/, he = /[\s-]/g;
function le(e, n, r, s, o, i, c) {
  if (i === n.length) return o === e.length ? pe : qe;
  var f = `${o},${i}`;
  if (c[f] !== void 0) return c[f];
  for (var b = s.charAt(i), u = r.indexOf(b, o), v = 0, g, S, w, I; u >= 0; ) g = le(e, n, r, s, u + 1, i + 1, c), g > v && (u === o ? g *= pe : Ve.test(e.charAt(u - 1)) ? (g *= Pe, w = e.slice(o, u - 1).match(ze), w && o > 0 && (g *= Math.pow(te, w.length))) : Oe.test(e.charAt(u - 1)) ? (g *= Ke, I = e.slice(o, u - 1).match(he), I && o > 0 && (g *= Math.pow(te, I.length))) : (g *= je, o > 0 && (g *= Math.pow(te, u - o))), e.charAt(u) !== n.charAt(i) && (g *= Le)), (g < ee && r.charAt(u - 1) === s.charAt(i + 1) || s.charAt(i + 1) === s.charAt(i) && r.charAt(u - 1) !== s.charAt(i)) && (S = le(e, n, r, s, u + 1, i + 2, c), S * ee > g && (g = S * ee)), g > v && (v = g), u = r.indexOf(b, u + 1);
  return c[f] = v, v;
}
function ve(e) {
  return e.toLowerCase().replace(he, " ");
}
function Be(e, n, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, le(e, n, ve(e), ve(n), 0, 0, {});
}
var q = '[cmdk-group=""]', re = '[cmdk-group-items=""]', Ge = '[cmdk-group-heading=""]', be = '[cmdk-item=""]', ge = `${be}:not([aria-disabled="true"])`, ae = "cmdk-item-select", K = "data-value", He = (e, n, r) => Be(e, n, r), xe = l.createContext(void 0), z = () => l.useContext(xe), ke = l.createContext(void 0), oe = () => l.useContext(ke), we = l.createContext(void 0), ye = l.forwardRef((e, n) => {
  let r = P(() => {
    var t, d;
    return { search: "", value: (d = (t = e.value) != null ? t : e.defaultValue) != null ? d : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), s = P(() => /* @__PURE__ */ new Set()), o = P(() => /* @__PURE__ */ new Map()), i = P(() => /* @__PURE__ */ new Map()), c = P(() => /* @__PURE__ */ new Set()), f = Ee(e), { label: b, children: u, value: v, onValueChange: g, filter: S, shouldFilter: w, loop: I, disablePointerSelection: H = !1, vimBindings: _ = !0, ...O } = e, T = j(), ue = j(), U = j(), $ = l.useRef(null), x = rt();
  M(() => {
    if (v !== void 0) {
      let t = v.trim();
      r.current.value = t, y.emit();
    }
  }, [v]), M(() => {
    x(6, de);
  }, []);
  let y = l.useMemo(() => ({ subscribe: (t) => (c.current.add(t), () => c.current.delete(t)), snapshot: () => r.current, setState: (t, d, m) => {
    var a, p, h, E;
    if (!Object.is(r.current[t], d)) {
      if (r.current[t] = d, t === "search") Y(), J(), x(1, X);
      else if (t === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let k = document.getElementById(U);
          k ? k.focus() : (a = document.getElementById(T)) == null || a.focus();
        }
        if (x(7, () => {
          var k;
          r.current.selectedItemId = (k = F()) == null ? void 0 : k.id, y.emit();
        }), m || x(5, de), ((p = f.current) == null ? void 0 : p.value) !== void 0) {
          let k = d ?? "";
          (E = (h = f.current).onValueChange) == null || E.call(h, k);
          return;
        }
      }
      y.emit();
    }
  }, emit: () => {
    c.current.forEach((t) => t());
  } }), []), W = l.useMemo(() => ({ value: (t, d, m) => {
    var a;
    d !== ((a = i.current.get(t)) == null ? void 0 : a.value) && (i.current.set(t, { value: d, keywords: m }), r.current.filtered.items.set(t, ie(d, m)), x(2, () => {
      J(), y.emit();
    }));
  }, item: (t, d) => (s.current.add(t), d && (o.current.has(d) ? o.current.get(d).add(t) : o.current.set(d, /* @__PURE__ */ new Set([t]))), x(3, () => {
    Y(), J(), r.current.value || X(), y.emit();
  }), () => {
    i.current.delete(t), s.current.delete(t), r.current.filtered.items.delete(t);
    let m = F();
    x(4, () => {
      Y(), m?.getAttribute("id") === t && X(), y.emit();
    });
  }), group: (t) => (o.current.has(t) || o.current.set(t, /* @__PURE__ */ new Set()), () => {
    i.current.delete(t), o.current.delete(t);
  }), filter: () => f.current.shouldFilter, label: b || e["aria-label"], getDisablePointerSelection: () => f.current.disablePointerSelection, listId: T, inputId: U, labelId: ue, listInnerRef: $ }), []);
  function ie(t, d) {
    var m, a;
    let p = (a = (m = f.current) == null ? void 0 : m.filter) != null ? a : He;
    return t ? p(t, r.current.search, d) : 0;
  }
  function J() {
    if (!r.current.search || f.current.shouldFilter === !1) return;
    let t = r.current.filtered.items, d = [];
    r.current.filtered.groups.forEach((a) => {
      let p = o.current.get(a), h = 0;
      p.forEach((E) => {
        let k = t.get(E);
        h = Math.max(k, h);
      }), d.push([a, h]);
    });
    let m = $.current;
    L().sort((a, p) => {
      var h, E;
      let k = a.getAttribute("id"), B = p.getAttribute("id");
      return ((h = t.get(B)) != null ? h : 0) - ((E = t.get(k)) != null ? E : 0);
    }).forEach((a) => {
      let p = a.closest(re);
      p ? p.appendChild(a.parentElement === p ? a : a.closest(`${re} > *`)) : m.appendChild(a.parentElement === m ? a : a.closest(`${re} > *`));
    }), d.sort((a, p) => p[1] - a[1]).forEach((a) => {
      var p;
      let h = (p = $.current) == null ? void 0 : p.querySelector(`${q}[${K}="${encodeURIComponent(a[0])}"]`);
      h?.parentElement.appendChild(h);
    });
  }
  function X() {
    let t = L().find((m) => m.getAttribute("aria-disabled") !== "true"), d = t?.getAttribute(K);
    y.setState("value", d || void 0);
  }
  function Y() {
    var t, d, m, a;
    if (!r.current.search || f.current.shouldFilter === !1) {
      r.current.filtered.count = s.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let p = 0;
    for (let h of s.current) {
      let E = (d = (t = i.current.get(h)) == null ? void 0 : t.value) != null ? d : "", k = (a = (m = i.current.get(h)) == null ? void 0 : m.keywords) != null ? a : [], B = ie(E, k);
      r.current.filtered.items.set(h, B), B > 0 && p++;
    }
    for (let [h, E] of o.current) for (let k of E) if (r.current.filtered.items.get(k) > 0) {
      r.current.filtered.groups.add(h);
      break;
    }
    r.current.filtered.count = p;
  }
  function de() {
    var t, d, m;
    let a = F();
    a && (((t = a.parentElement) == null ? void 0 : t.firstChild) === a && ((m = (d = a.closest(q)) == null ? void 0 : d.querySelector(Ge)) == null || m.scrollIntoView({ block: "nearest" })), a.scrollIntoView({ block: "nearest" }));
  }
  function F() {
    var t;
    return (t = $.current) == null ? void 0 : t.querySelector(`${be}[aria-selected="true"]`);
  }
  function L() {
    var t;
    return Array.from(((t = $.current) == null ? void 0 : t.querySelectorAll(ge)) || []);
  }
  function Q(t) {
    let d = L()[t];
    d && y.setState("value", d.getAttribute(K));
  }
  function Z(t) {
    var d;
    let m = F(), a = L(), p = a.findIndex((E) => E === m), h = a[p + t];
    (d = f.current) != null && d.loop && (h = p + t < 0 ? a[a.length - 1] : p + t === a.length ? a[0] : a[p + t]), h && y.setState("value", h.getAttribute(K));
  }
  function ce(t) {
    let d = F(), m = d?.closest(q), a;
    for (; m && !a; ) m = t > 0 ? et(m, q) : tt(m, q), a = m?.querySelector(ge);
    a ? y.setState("value", a.getAttribute(K)) : Z(t);
  }
  let se = () => Q(L().length - 1), me = (t) => {
    t.preventDefault(), t.metaKey ? se() : t.altKey ? ce(1) : Z(1);
  }, fe = (t) => {
    t.preventDefault(), t.metaKey ? Q(0) : t.altKey ? ce(-1) : Z(-1);
  };
  return l.createElement(D.div, { ref: n, tabIndex: -1, ...O, "cmdk-root": "", onKeyDown: (t) => {
    var d;
    (d = O.onKeyDown) == null || d.call(O, t);
    let m = t.nativeEvent.isComposing || t.keyCode === 229;
    if (!(t.defaultPrevented || m)) switch (t.key) {
      case "n":
      case "j": {
        _ && t.ctrlKey && me(t);
        break;
      }
      case "ArrowDown": {
        me(t);
        break;
      }
      case "p":
      case "k": {
        _ && t.ctrlKey && fe(t);
        break;
      }
      case "ArrowUp": {
        fe(t);
        break;
      }
      case "Home": {
        t.preventDefault(), Q(0);
        break;
      }
      case "End": {
        t.preventDefault(), se();
        break;
      }
      case "Enter": {
        t.preventDefault();
        let a = F();
        if (a) {
          let p = new Event(ae);
          a.dispatchEvent(p);
        }
      }
    }
  } }, l.createElement("label", { "cmdk-label": "", htmlFor: W.inputId, id: W.labelId, style: lt }, b), G(e, (t) => l.createElement(ke.Provider, { value: y }, l.createElement(xe.Provider, { value: W }, t))));
}), Te = l.forwardRef((e, n) => {
  var r, s;
  let o = j(), i = l.useRef(null), c = l.useContext(we), f = z(), b = Ee(e), u = (s = (r = b.current) == null ? void 0 : r.forceMount) != null ? s : c?.forceMount;
  M(() => {
    if (!u) return f.item(o, c?.id);
  }, [u]);
  let v = Ce(o, i, [e.value, e.children, i], e.keywords), g = oe(), S = R((x) => x.value && x.value === v.current), w = R((x) => u || f.filter() === !1 ? !0 : x.search ? x.filtered.items.get(o) > 0 : !0);
  l.useEffect(() => {
    let x = i.current;
    if (!(!x || e.disabled)) return x.addEventListener(ae, I), () => x.removeEventListener(ae, I);
  }, [w, e.onSelect, e.disabled]);
  function I() {
    var x, y;
    H(), (y = (x = b.current).onSelect) == null || y.call(x, v.current);
  }
  function H() {
    g.setState("value", v.current, !0);
  }
  if (!w) return null;
  let { disabled: _, value: O, onSelect: T, forceMount: ue, keywords: U, ...$ } = e;
  return l.createElement(D.div, { ref: V(i, n), ...$, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!_, "aria-selected": !!S, "data-disabled": !!_, "data-selected": !!S, onPointerMove: _ || f.getDisablePointerSelection() ? void 0 : H, onClick: _ ? void 0 : I }, e.children);
}), Ue = l.forwardRef((e, n) => {
  let { heading: r, children: s, forceMount: o, ...i } = e, c = j(), f = l.useRef(null), b = l.useRef(null), u = j(), v = z(), g = R((w) => o || v.filter() === !1 ? !0 : w.search ? w.filtered.groups.has(c) : !0);
  M(() => v.group(c), []), Ce(c, f, [e.value, e.heading, b]);
  let S = l.useMemo(() => ({ id: c, forceMount: o }), [o]);
  return l.createElement(D.div, { ref: V(f, n), ...i, "cmdk-group": "", role: "presentation", hidden: g ? void 0 : !0 }, r && l.createElement("div", { ref: b, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, r), G(e, (w) => l.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? u : void 0 }, l.createElement(we.Provider, { value: S }, w))));
}), We = l.forwardRef((e, n) => {
  let { alwaysRender: r, ...s } = e, o = l.useRef(null), i = R((c) => !c.search);
  return !r && !i ? null : l.createElement(D.div, { ref: V(o, n), ...s, "cmdk-separator": "", role: "separator" });
}), Je = l.forwardRef((e, n) => {
  let { onValueChange: r, ...s } = e, o = e.value != null, i = oe(), c = R((u) => u.search), f = R((u) => u.selectedItemId), b = z();
  return l.useEffect(() => {
    e.value != null && i.setState("search", e.value);
  }, [e.value]), l.createElement(D.input, { ref: n, ...s, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": b.listId, "aria-labelledby": b.labelId, "aria-activedescendant": f, id: b.inputId, type: "text", value: o ? e.value : c, onChange: (u) => {
    o || i.setState("search", u.target.value), r?.(u.target.value);
  } });
}), Xe = l.forwardRef((e, n) => {
  let { children: r, label: s = "Suggestions", ...o } = e, i = l.useRef(null), c = l.useRef(null), f = R((u) => u.selectedItemId), b = z();
  return l.useEffect(() => {
    if (c.current && i.current) {
      let u = c.current, v = i.current, g, S = new ResizeObserver(() => {
        g = requestAnimationFrame(() => {
          let w = u.offsetHeight;
          v.style.setProperty("--cmdk-list-height", w.toFixed(1) + "px");
        });
      });
      return S.observe(u), () => {
        cancelAnimationFrame(g), S.unobserve(u);
      };
    }
  }, []), l.createElement(D.div, { ref: V(i, n), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": f, "aria-label": s, id: b.listId }, G(e, (u) => l.createElement("div", { ref: V(c, b.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), Ye = l.forwardRef((e, n) => {
  let { open: r, onOpenChange: s, overlayClassName: o, contentClassName: i, container: c, ...f } = e;
  return l.createElement(Se, { open: r, onOpenChange: s }, l.createElement(Ie, { container: c }, l.createElement(Re, { "cmdk-overlay": "", className: o }), l.createElement(De, { "aria-label": e.label, "cmdk-dialog": "", className: i }, l.createElement(ye, { ref: n, ...f }))));
}), Qe = l.forwardRef((e, n) => R((r) => r.filtered.count === 0) ? l.createElement(D.div, { ref: n, ...e, "cmdk-empty": "", role: "presentation" }) : null), Ze = l.forwardRef((e, n) => {
  let { progress: r, children: s, label: o = "Loading...", ...i } = e;
  return l.createElement(D.div, { ref: n, ...i, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, G(e, (c) => l.createElement("div", { "aria-hidden": !0 }, c)));
}), N = Object.assign(ye, { List: Xe, Item: Te, Input: Je, Group: Ue, Separator: We, Dialog: Ye, Empty: Qe, Loading: Ze });
function et(e, n) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(n)) return r;
    r = r.nextElementSibling;
  }
}
function tt(e, n) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(n)) return r;
    r = r.previousElementSibling;
  }
}
function Ee(e) {
  let n = l.useRef(e);
  return M(() => {
    n.current = e;
  }), n;
}
var M = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function P(e) {
  let n = l.useRef();
  return n.current === void 0 && (n.current = e()), n;
}
function R(e) {
  let n = oe(), r = () => e(n.snapshot());
  return l.useSyncExternalStore(n.subscribe, r, r);
}
function Ce(e, n, r, s = []) {
  let o = l.useRef(), i = z();
  return M(() => {
    var c;
    let f = (() => {
      var u;
      for (let v of r) {
        if (typeof v == "string") return v.trim();
        if (typeof v == "object" && "current" in v) return v.current ? (u = v.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), b = s.map((u) => u.trim());
    i.value(e, f, b), (c = n.current) == null || c.setAttribute(K, f), o.current = f;
  }), o;
}
var rt = () => {
  let [e, n] = l.useState(), r = P(() => /* @__PURE__ */ new Map());
  return M(() => {
    r.current.forEach((s) => s()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (s, o) => {
    r.current.set(s, o), n({});
  };
};
function nt(e) {
  let n = e.type;
  return typeof n == "function" ? n(e.props) : "render" in n ? n.render(e.props) : e;
}
function G({ asChild: e, children: n }, r) {
  return e && l.isValidElement(n) ? l.cloneElement(nt(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var lt = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
function at({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    N,
    {
      "data-slot": "command",
      className: A(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        e
      ),
      ...n
    }
  );
}
function pt({
  title: e = "Command Palette",
  description: n = "Search for a command to run...",
  children: r,
  className: s,
  showCloseButton: o = !0,
  ...i
}) {
  return /* @__PURE__ */ ne(Ae, { ...i, children: [
    /* @__PURE__ */ ne(_e, { className: "sr-only", children: [
      /* @__PURE__ */ C($e, { children: e }),
      /* @__PURE__ */ C(Me, { children: n })
    ] }),
    /* @__PURE__ */ C(
      Ne,
      {
        className: A("overflow-hidden p-0", s),
        showCloseButton: o,
        children: /* @__PURE__ */ C(at, { className: "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: r })
      }
    )
  ] });
}
function vt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ ne(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ C(Fe, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ C(
          N.Input,
          {
            "data-slot": "command-input",
            className: A(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              e
            ),
            ...n
          }
        )
      ]
    }
  );
}
function gt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    N.List,
    {
      "data-slot": "command-list",
      className: A(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        e
      ),
      ...n
    }
  );
}
function ht({
  ...e
}) {
  return /* @__PURE__ */ C(
    N.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    }
  );
}
function bt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    N.Group,
    {
      "data-slot": "command-group",
      className: A(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        e
      ),
      ...n
    }
  );
}
function xt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    N.Separator,
    {
      "data-slot": "command-separator",
      className: A("bg-border -mx-1 h-px", e),
      ...n
    }
  );
}
function kt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    N.Item,
    {
      "data-slot": "command-item",
      className: A(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n
    }
  );
}
function wt({
  className: e,
  ...n
}) {
  return /* @__PURE__ */ C(
    "span",
    {
      "data-slot": "command-shortcut",
      className: A(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        e
      ),
      ...n
    }
  );
}
export {
  at as Command,
  pt as CommandDialog,
  ht as CommandEmpty,
  bt as CommandGroup,
  vt as CommandInput,
  kt as CommandItem,
  gt as CommandList,
  xt as CommandSeparator,
  wt as CommandShortcut
};
//# sourceMappingURL=command.js.map
