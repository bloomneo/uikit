import { jsx as e, jsxs as n } from "react/jsx-runtime";
import { D as l, a as i, b as d, X as c, c as u, f, g as h, e as g, d as m } from "./index-tBy_fxjI.js";
import { c as o } from "./utils-D7gXXjDs.js";
function S({ ...t }) {
  return /* @__PURE__ */ e(l, { "data-slot": "sheet", ...t });
}
function N({
  ...t
}) {
  return /* @__PURE__ */ e(h, { "data-slot": "sheet-trigger", ...t });
}
function v({
  ...t
}) {
  return /* @__PURE__ */ e(i, { "data-slot": "sheet-close", ...t });
}
function p({
  ...t
}) {
  return /* @__PURE__ */ e(g, { "data-slot": "sheet-portal", ...t });
}
function b({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    m,
    {
      "data-slot": "sheet-overlay",
      className: o(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        t
      ),
      ...a
    }
  );
}
function w({
  className: t,
  children: a,
  side: s = "right",
  ...r
}) {
  return /* @__PURE__ */ n(p, { children: [
    /* @__PURE__ */ e(b, {}),
    /* @__PURE__ */ n(
      d,
      {
        "data-slot": "sheet-content",
        className: o(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          s === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          s === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          s === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          s === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          t
        ),
        ...r,
        children: [
          a,
          /* @__PURE__ */ n(i, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ e(c, { className: "size-4" }),
            /* @__PURE__ */ e("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function C({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "sheet-header",
      className: o("flex flex-col gap-1.5 p-4", t),
      ...a
    }
  );
}
function T({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "sheet-footer",
      className: o("mt-auto flex flex-col gap-2 p-4", t),
      ...a
    }
  );
}
function k({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    f,
    {
      "data-slot": "sheet-title",
      className: o("text-foreground font-semibold", t),
      ...a
    }
  );
}
function z({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    u,
    {
      "data-slot": "sheet-description",
      className: o("text-muted-foreground text-sm", t),
      ...a
    }
  );
}
export {
  S as Sheet,
  v as SheetClose,
  w as SheetContent,
  z as SheetDescription,
  T as SheetFooter,
  C as SheetHeader,
  k as SheetTitle,
  N as SheetTrigger
};
//# sourceMappingURL=sheet.js.map
