import { jsxs as a, jsx as r, Fragment as N } from "react/jsx-runtime";
import * as h from "react";
import { c as i } from "./utils-CwJPJKOE.js";
import { Button as w } from "./button.js";
import { Command as k, CommandInput as S, CommandList as j, CommandEmpty as z, CommandGroup as I, CommandItem as P } from "./command.js";
import { Popover as D, PopoverTrigger as L, PopoverContent as U } from "./popover.js";
import { X as B } from "./x-BxwubQiM.js";
import { c as E } from "./createLucideIcon-B45kRl5r.js";
import { C as F } from "./check-DXouwtzp.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G = E("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
function J({
  value: t,
  onChange: o,
  options: n,
  placeholder: g = "Select…",
  searchPlaceholder: x = "Search…",
  emptyMessage: C = "No results.",
  clearable: m = !1,
  disabled: c = !1,
  renderOption: d,
  className: b,
  contentWidth: s = "trigger"
}) {
  const [p, u] = h.useState(!1), l = h.useMemo(
    () => n.find((e) => e.value === t),
    [n, t]
  ), v = (e) => {
    o?.(e === t && m ? void 0 : e), u(!1);
  }, y = (e) => {
    e.stopPropagation(), o?.(void 0);
  };
  return /* @__PURE__ */ a(D, { open: p, onOpenChange: u, children: [
    /* @__PURE__ */ r(L, { asChild: !0, children: /* @__PURE__ */ a(
      w,
      {
        type: "button",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        "aria-haspopup": "listbox",
        disabled: c,
        className: i(
          "w-full justify-between font-normal",
          !l && "text-muted-foreground",
          b
        ),
        children: [
          /* @__PURE__ */ r("span", { className: "truncate", children: l ? l.label : g }),
          /* @__PURE__ */ a("span", { className: "ml-2 flex shrink-0 items-center gap-1", children: [
            m && l && !c && /* @__PURE__ */ r(
              "span",
              {
                role: "button",
                tabIndex: -1,
                "aria-label": "Clear selection",
                onClick: y,
                className: "inline-flex size-4 items-center justify-center rounded text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ r(B, { className: "size-3" })
              }
            ),
            /* @__PURE__ */ r(G, { className: "size-4 opacity-50" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      U,
      {
        className: i("p-0", s === "trigger" && "w-[var(--radix-popover-trigger-width)]"),
        style: s !== "trigger" && s !== "auto" ? { width: s } : void 0,
        align: "start",
        children: /* @__PURE__ */ a(k, { children: [
          /* @__PURE__ */ r(S, { placeholder: x }),
          /* @__PURE__ */ a(j, { children: [
            /* @__PURE__ */ r(z, { children: C }),
            /* @__PURE__ */ r(I, { children: n.map((e) => {
              const f = e.value === t;
              return /* @__PURE__ */ r(
                P,
                {
                  value: e.label,
                  disabled: e.disabled,
                  onSelect: () => v(e.value),
                  className: "flex items-center justify-between gap-2",
                  children: d ? d(e, f) : /* @__PURE__ */ a(N, { children: [
                    /* @__PURE__ */ r("span", { className: "truncate", children: e.label }),
                    /* @__PURE__ */ r(
                      F,
                      {
                        className: i(
                          "size-4 shrink-0",
                          f ? "opacity-100" : "opacity-0"
                        )
                      }
                    )
                  ] })
                },
                e.value
              );
            }) })
          ] })
        ] })
      }
    )
  ] });
}
export {
  J as Combobox
};
//# sourceMappingURL=combobox.js.map
