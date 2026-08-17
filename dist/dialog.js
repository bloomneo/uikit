import { jsx as t, jsxs as l } from "react/jsx-runtime";
import { D as r, a as s, b as d, X as g, c, d as u, e as f, f as m, g as p } from "./index-tBy_fxjI.js";
import { c as e } from "./utils-D7gXXjDs.js";
function y({
  ...a
}) {
  return /* @__PURE__ */ t(r, { "data-slot": "dialog", ...a });
}
function N({
  ...a
}) {
  return /* @__PURE__ */ t(p, { "data-slot": "dialog-trigger", ...a });
}
function x({
  ...a
}) {
  return /* @__PURE__ */ t(f, { "data-slot": "dialog-portal", ...a });
}
function $({
  ...a
}) {
  return /* @__PURE__ */ t(s, { "data-slot": "dialog-close", ...a });
}
function D({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    u,
    {
      "data-slot": "dialog-overlay",
      className: e(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]",
        a
      ),
      ...o
    }
  );
}
function z({
  className: a,
  children: o,
  showCloseButton: n = !0,
  ...i
}) {
  return /* @__PURE__ */ l(x, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ t(D, {}),
    /* @__PURE__ */ l(
      d,
      {
        "data-slot": "dialog-content",
        className: e(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          a
        ),
        ...i,
        children: [
          o,
          n && /* @__PURE__ */ l(
            s,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ t(g, {}),
                /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function w({ className: a, ...o }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "dialog-header",
      className: e("flex flex-col gap-2 text-center sm:text-left", a),
      ...o
    }
  );
}
function C({ className: a, ...o }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "dialog-footer",
      className: e(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        a
      ),
      ...o
    }
  );
}
function k({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    m,
    {
      "data-slot": "dialog-title",
      className: e("text-lg leading-none font-semibold", a),
      ...o
    }
  );
}
function T({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    c,
    {
      "data-slot": "dialog-description",
      className: e("text-muted-foreground text-sm", a),
      ...o
    }
  );
}
export {
  y as Dialog,
  $ as DialogClose,
  z as DialogContent,
  T as DialogDescription,
  C as DialogFooter,
  w as DialogHeader,
  D as DialogOverlay,
  x as DialogPortal,
  k as DialogTitle,
  N as DialogTrigger
};
//# sourceMappingURL=dialog.js.map
