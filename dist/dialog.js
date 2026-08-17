import { jsx as t, jsxs as l } from "react/jsx-runtime";
import { D as r, a as i, b as d, X as g, c, d as u, e as f, f as m, g as p } from "./index-tBy_fxjI.js";
import { c as o } from "./utils-D7gXXjDs.js";
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
function D({
  ...a
}) {
  return /* @__PURE__ */ t(f, { "data-slot": "dialog-portal", ...a });
}
function $({
  ...a
}) {
  return /* @__PURE__ */ t(i, { "data-slot": "dialog-close", ...a });
}
function x({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    u,
    {
      "data-slot": "dialog-overlay",
      className: o(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]",
        a
      ),
      ...e
    }
  );
}
function z({
  className: a,
  children: e,
  showCloseButton: n = !0,
  ...s
}) {
  return /* @__PURE__ */ l(D, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ t(x, {}),
    /* @__PURE__ */ l(
      d,
      {
        "data-slot": "dialog-content",
        className: o(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          a
        ),
        ...s,
        children: [
          e,
          n && /* @__PURE__ */ l(
            i,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-3.5 right-3.5 grid size-7 cursor-pointer place-items-center rounded-md opacity-70 hover:bg-accent transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
function w({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "dialog-header",
      className: o("flex flex-col gap-2 text-center sm:text-left", a),
      ...e
    }
  );
}
function C({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "dialog-footer",
      className: o(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        a
      ),
      ...e
    }
  );
}
function k({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    m,
    {
      "data-slot": "dialog-title",
      className: o("text-lg leading-none font-semibold", a),
      ...e
    }
  );
}
function T({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    c,
    {
      "data-slot": "dialog-description",
      className: o("text-muted-foreground text-sm", a),
      ...e
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
  x as DialogOverlay,
  D as DialogPortal,
  k as DialogTitle,
  N as DialogTrigger
};
//# sourceMappingURL=dialog.js.map
