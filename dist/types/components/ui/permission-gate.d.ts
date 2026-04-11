/**
 * <PermissionGate> + <PermissionProvider> + usePermission()
 *
 * Conditional rendering primitive for role-based / capability-based access
 * control. Replaces the `{hasRole(user, ['admin']) && <Button />}` ternary
 * pattern that gets repeated dozens of times in any multi-role app.
 *
 * UIKit is intentionally unopinionated about WHERE roles come from. You bring
 * your own auth provider — just wrap the app in <PermissionProvider> with a
 * `check` function and PermissionGate calls it.
 *
 * @example
 *   // Once at the app root:
 *   <PermissionProvider check={(perm) => user.roles.includes(perm)}>
 *     <App />
 *   </PermissionProvider>
 *
 *   // Anywhere inside:
 *   <PermissionGate when="admin">
 *     <Button onClick={deleteUser}>Delete</Button>
 *   </PermissionGate>
 *
 *   <PermissionGate when={['admin', 'moderator']} fallback={<LockedMessage />}>
 *     <AdminPanel />
 *   </PermissionGate>
 *
 *   // Or pass a function for fully custom logic:
 *   <PermissionGate when={() => user.tier === 'paid' && user.verified}>
 *     <PremiumFeature />
 *   </PermissionGate>
 */
import * as React from 'react';
export type PermissionCheck = (permission: string) => boolean;
export interface PermissionContextValue {
    /** The check function passed to the provider. */
    check: PermissionCheck;
}
export interface PermissionProviderProps {
    /**
     * Function called to check whether the current user has a permission.
     * Receives a single string and returns a boolean. UIKit doesn't care
     * whether you implement it via roles, scopes, capabilities, or feature flags.
     */
    check: PermissionCheck;
    children: React.ReactNode;
}
export declare function PermissionProvider({ check, children }: PermissionProviderProps): React.JSX.Element;
/**
 * Returns a function that takes a permission spec (string, array, function,
 * or boolean) and returns whether the current user passes the check. Use this
 * when you need permission logic outside of JSX (e.g. in event handlers).
 */
export declare function usePermission(): (when: PermissionWhen) => boolean;
export type PermissionWhen = string | string[] | boolean | (() => boolean);
export interface PermissionGateProps {
    /**
     * What to check.
     *   - `string` → calls `check(permission)`
     *   - `string[]` → passes if any element matches (OR)
     *   - `boolean` → renders/hides directly
     *   - `() => boolean` → custom predicate
     */
    when: PermissionWhen;
    /** Rendered when the check passes. */
    children: React.ReactNode;
    /** Rendered when the check fails. Default: nothing. */
    fallback?: React.ReactNode;
}
export declare function PermissionGate({ when, children, fallback }: PermissionGateProps): React.ReactNode;
//# sourceMappingURL=permission-gate.d.ts.map