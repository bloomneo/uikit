/**
 * <Avatar> — user profile image with automatic fallback.
 * @module @bloomneo/uikit
 * @file src/components/ui/avatar.tsx
 *
 * @llm-rule WHEN: Displaying user/entity profile pictures
 * @llm-rule AVOID: Using for decorative images — use a plain <img> instead
 * @llm-rule NOTE: Nesting: Avatar > AvatarImage(src, alt) + AvatarFallback (shown while loading or on error)
 * @llm-rule NOTE: AvatarFallback children are typically initials: `<AvatarFallback>JD</AvatarFallback>`
 * @llm-rule NOTE: Radix wrapper — props pass through to @radix-ui/react-avatar
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
declare function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>): import("react/jsx-runtime").JSX.Element;
declare function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>): import("react/jsx-runtime").JSX.Element;
export { Avatar, AvatarImage, AvatarFallback };
//# sourceMappingURL=avatar.d.ts.map