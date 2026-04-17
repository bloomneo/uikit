/**
 * <Tabs> — tabbed content navigation built on Radix UI.
 * @module @bloomneo/uikit
 * @file src/components/ui/tabs.tsx
 *
 * @llm-rule WHEN: Switching between content panels on the same page
 * @llm-rule AVOID: Using for page-level navigation — use a router or <TabBar> section component
 * @llm-rule NOTE: Controlled: `value` + `onValueChange`. Uncontrolled: `defaultValue`
 * @llm-rule NOTE: Nesting: Tabs > TabsList > TabsTrigger, Tabs > TabsContent (value must match trigger value)
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-tabs
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
declare function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent };
//# sourceMappingURL=tabs.d.ts.map