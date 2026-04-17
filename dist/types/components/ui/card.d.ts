/**
 * <Card> — elevated content container with consistent spacing and borders.
 * @module @bloomneo/uikit
 * @file src/components/ui/card.tsx
 *
 * @llm-rule WHEN: Grouping related content (stats, forms, profiles, settings sections)
 * @llm-rule AVOID: Using for full-page layout — use a Layout component instead
 * @llm-rule NOTE: Nesting: Card > CardHeader(CardTitle + CardDescription + CardAction) + CardContent + CardFooter
 * @llm-rule NOTE: CardAction positions a button/action in the top-right of CardHeader automatically
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
declare function Card({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardAction({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, };
//# sourceMappingURL=card.d.ts.map