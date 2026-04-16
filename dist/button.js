import { jsx as s } from "react/jsx-runtime";
import * as n from "react";
import { S as d } from "./index-DQH6odE9.js";
import { c } from "./index-Bke1qZdk.js";
import { c as u } from "./utils-CwJPJKOE.js";
const v = c(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-muted-foreground/30 dark:bg-transparent dark:hover:bg-muted/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-8 has-[>svg]:px-6",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), g = n.forwardRef(({ className: e, variant: r, size: t, asChild: o = !1, ...a }, i) => /* @__PURE__ */ s(
  o ? d : "button",
  {
    ref: i,
    "data-slot": "button",
    className: u(v({ variant: r, size: t, className: e })),
    ...a
  }
));
g.displayName = "Button";
export {
  g as Button,
  v as buttonVariants
};
//# sourceMappingURL=button.js.map
