import { jsx as r } from "react/jsx-runtime";
import * as f from "react";
import { u as M, c as k, a as T } from "./index-WHakdmwv.js";
import { c as h, R as E, I as F } from "./index-CO5mz-pQ.js";
import { P as $ } from "./index-DKIoJbzW.js";
import { P as m } from "./index-CpDnqHCm.js";
import { u as D } from "./index-C5CLmphY.js";
import { u as V } from "./index-CXwMLXQo.js";
import { c as p } from "./utils-CwJPJKOE.js";
var g = "Tabs", [G, Y] = k(g, [
  h
]), C = h(), [L, x] = G(g), I = f.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: c,
      value: a,
      onValueChange: i,
      defaultValue: d,
      orientation: o = "horizontal",
      dir: u,
      activationMode: b = "automatic",
      ...v
    } = e, s = D(u), [n, l] = M({
      prop: a,
      onChange: i,
      defaultProp: d ?? "",
      caller: g
    });
    return /* @__PURE__ */ r(
      L,
      {
        scope: c,
        baseId: V(),
        value: n,
        onValueChange: l,
        orientation: o,
        dir: s,
        activationMode: b,
        children: /* @__PURE__ */ r(
          m.div,
          {
            dir: s,
            "data-orientation": o,
            ...v,
            ref: t
          }
        )
      }
    );
  }
);
I.displayName = g;
var y = "TabsList", _ = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: c, loop: a = !0, ...i } = e, d = x(y, c), o = C(c);
    return /* @__PURE__ */ r(
      E,
      {
        asChild: !0,
        ...o,
        orientation: d.orientation,
        dir: d.dir,
        loop: a,
        children: /* @__PURE__ */ r(
          m.div,
          {
            role: "tablist",
            "aria-orientation": d.orientation,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
_.displayName = y;
var N = "TabsTrigger", R = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: c, value: a, disabled: i = !1, ...d } = e, o = x(N, c), u = C(c), b = P(o.baseId, a), v = S(o.baseId, a), s = a === o.value;
    return /* @__PURE__ */ r(
      F,
      {
        asChild: !0,
        ...u,
        focusable: !i,
        active: s,
        children: /* @__PURE__ */ r(
          m.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": s,
            "aria-controls": v,
            "data-state": s ? "active" : "inactive",
            "data-disabled": i ? "" : void 0,
            disabled: i,
            id: b,
            ...d,
            ref: t,
            onMouseDown: T(e.onMouseDown, (n) => {
              !i && n.button === 0 && n.ctrlKey === !1 ? o.onValueChange(a) : n.preventDefault();
            }),
            onKeyDown: T(e.onKeyDown, (n) => {
              [" ", "Enter"].includes(n.key) && o.onValueChange(a);
            }),
            onFocus: T(e.onFocus, () => {
              const n = o.activationMode !== "manual";
              !s && !i && n && o.onValueChange(a);
            })
          }
        )
      }
    );
  }
);
R.displayName = N;
var w = "TabsContent", A = f.forwardRef(
  (e, t) => {
    const { __scopeTabs: c, value: a, forceMount: i, children: d, ...o } = e, u = x(w, c), b = P(u.baseId, a), v = S(u.baseId, a), s = a === u.value, n = f.useRef(s);
    return f.useEffect(() => {
      const l = requestAnimationFrame(() => n.current = !1);
      return () => cancelAnimationFrame(l);
    }, []), /* @__PURE__ */ r($, { present: i || s, children: ({ present: l }) => /* @__PURE__ */ r(
      m.div,
      {
        "data-state": s ? "active" : "inactive",
        "data-orientation": u.orientation,
        role: "tabpanel",
        "aria-labelledby": b,
        hidden: !l,
        id: v,
        tabIndex: 0,
        ...o,
        ref: t,
        style: {
          ...e.style,
          animationDuration: n.current ? "0s" : void 0
        },
        children: l && d
      }
    ) });
  }
);
A.displayName = w;
function P(e, t) {
  return `${e}-trigger-${t}`;
}
function S(e, t) {
  return `${e}-content-${t}`;
}
var j = I, z = _, K = R, B = A;
function Z({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    j,
    {
      "data-slot": "tabs",
      className: p("flex flex-col gap-2", e),
      ...t
    }
  );
}
function ee({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    z,
    {
      "data-slot": "tabs-list",
      className: p(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        e
      ),
      ...t
    }
  );
}
function te({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    K,
    {
      "data-slot": "tabs-trigger",
      className: p(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...t
    }
  );
}
function ae({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    B,
    {
      "data-slot": "tabs-content",
      className: p("flex-1 outline-none", e),
      ...t
    }
  );
}
export {
  Z as Tabs,
  ae as TabsContent,
  ee as TabsList,
  te as TabsTrigger
};
//# sourceMappingURL=tabs.js.map
