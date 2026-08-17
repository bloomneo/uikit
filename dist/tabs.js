import { jsx as i } from "react/jsx-runtime";
import * as f from "react";
import { c as w, b as y, a as x } from "./index-b757E0P6.js";
import { c as P, R as A, I as k } from "./index-BzSHYi7S.js";
import { P as S } from "./index-C7u_Yu0y.js";
import { P as p } from "./index-rT3N9N4T.js";
import { u as M } from "./index-S1vMr2en.js";
import { u as N } from "./index-BraAqWsy.js";
import { c as T } from "./utils-D7gXXjDs.js";
var E = Object.defineProperty, g = (t, e) => E(t, "name", { value: e, configurable: !0 }), h = "Tabs", [F, te] = w(h, [
  P
]), R = P(), [$, C] = F(h), D = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, l) {
    const {
      __scopeTabs: c,
      value: a,
      onValueChange: n,
      defaultValue: u,
      orientation: o = "horizontal",
      dir: d,
      activationMode: v = "automatic",
      ...m
    } = e, s = M(d), [r, b] = y({
      prop: a,
      onChange: n,
      defaultProp: u ?? "",
      caller: h
    });
    return /* @__PURE__ */ i(
      $,
      {
        scope: c,
        baseId: N(),
        value: r,
        onValueChange: b,
        orientation: o,
        dir: s,
        activationMode: v,
        children: /* @__PURE__ */ i(
          p.div,
          {
            dir: s,
            "data-orientation": o,
            ...m,
            ref: l
          }
        )
      }
    );
  }, "Tabs")
), L = "TabsList", V = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, l) {
    const { __scopeTabs: c, loop: a = !0, ...n } = e, u = C(L, c), o = R(c);
    return /* @__PURE__ */ i(
      A,
      {
        asChild: !0,
        ...o,
        orientation: u.orientation,
        dir: u.dir,
        loop: a,
        children: /* @__PURE__ */ i(
          p.div,
          {
            role: "tablist",
            "aria-orientation": u.orientation,
            ...n,
            ref: l
          }
        )
      }
    );
  }, "TabsList")
), G = "TabsTrigger", j = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ g(function(e, l) {
    const { __scopeTabs: c, value: a, disabled: n = !1, ...u } = e, o = C(G, c), d = R(c), v = _(o.baseId, a), m = I(o.baseId, a), s = a === o.value;
    return /* @__PURE__ */ i(
      k,
      {
        asChild: !0,
        ...d,
        focusable: !n,
        active: s,
        children: /* @__PURE__ */ i(
          p.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": s,
            "aria-controls": m,
            "data-state": s ? "active" : "inactive",
            "data-disabled": n ? "" : void 0,
            disabled: n,
            id: v,
            ...u,
            ref: l,
            onMouseDown: x(e.onMouseDown, (r) => {
              !n && r.button === 0 && r.ctrlKey === !1 ? o.onValueChange(a) : r.preventDefault();
            }),
            onKeyDown: x(e.onKeyDown, (r) => {
              n || r.target !== r.currentTarget || [" ", "Enter"].includes(r.key) && o.onValueChange(a);
            }),
            onFocus: x(e.onFocus, () => {
              const r = o.activationMode !== "manual";
              !s && !n && r && o.onValueChange(a);
            })
          }
        )
      }
    );
  }, "TabsTrigger")
), z = "TabsContent", K = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ g(function(e, l) {
    const { __scopeTabs: c, value: a, forceMount: n, children: u, ...o } = e, d = C(z, c), v = _(d.baseId, a), m = I(d.baseId, a), s = a === d.value, r = f.useRef(s);
    return f.useEffect(() => {
      const b = requestAnimationFrame(() => r.current = !1);
      return () => cancelAnimationFrame(b);
    }, []), /* @__PURE__ */ i(S, { present: n || s, children: ({ present: b }) => /* @__PURE__ */ i(
      p.div,
      {
        "data-state": s ? "active" : "inactive",
        "data-orientation": d.orientation,
        role: "tabpanel",
        "aria-labelledby": v,
        hidden: !b,
        id: m,
        tabIndex: 0,
        ...o,
        ref: l,
        style: {
          ...e.style,
          animationDuration: r.current ? "0s" : void 0
        },
        children: b && u
      }
    ) });
  }, "TabsContent")
);
function _(t, e) {
  return `${t}-trigger-${e}`;
}
g(_, "makeTriggerId");
function I(t, e) {
  return `${t}-content-${e}`;
}
g(I, "makeContentId");
var B = D, O = V, q = j, H = K;
function ae({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    B,
    {
      "data-slot": "tabs",
      className: T("flex flex-col gap-2", t),
      ...e
    }
  );
}
function oe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    O,
    {
      "data-slot": "tabs-list",
      className: T(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        t
      ),
      ...e
    }
  );
}
function re({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    q,
    {
      "data-slot": "tabs-trigger",
      className: T(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      ...e
    }
  );
}
function ne({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    H,
    {
      "data-slot": "tabs-content",
      className: T("flex-1 outline-none", t),
      ...e
    }
  );
}
export {
  ae as Tabs,
  ne as TabsContent,
  oe as TabsList,
  re as TabsTrigger
};
//# sourceMappingURL=tabs.js.map
