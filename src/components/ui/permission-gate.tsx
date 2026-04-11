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

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export type PermissionCheck = (permission: string) => boolean;

export interface PermissionContextValue {
  /** The check function passed to the provider. */
  check: PermissionCheck;
}

const PermissionContext = React.createContext<PermissionContextValue | null>(null);

export interface PermissionProviderProps {
  /**
   * Function called to check whether the current user has a permission.
   * Receives a single string and returns a boolean. UIKit doesn't care
   * whether you implement it via roles, scopes, capabilities, or feature flags.
   */
  check: PermissionCheck;
  children: React.ReactNode;
}

export function PermissionProvider({ check, children }: PermissionProviderProps): React.JSX.Element {
  const value = React.useMemo(() => ({ check }), [check]);
  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Returns a function that takes a permission spec (string, array, function,
 * or boolean) and returns whether the current user passes the check. Use this
 * when you need permission logic outside of JSX (e.g. in event handlers).
 */
export function usePermission(): (when: PermissionWhen) => boolean {
  const ctx = React.useContext(PermissionContext);
  return React.useCallback(
    (when: PermissionWhen) => evaluatePermission(when, ctx?.check),
    [ctx]
  );
}

/* -------------------------------------------------------------------------- */
/* Gate                                                                       */
/* -------------------------------------------------------------------------- */

export type PermissionWhen =
  | string
  | string[]
  | boolean
  | (() => boolean);

function evaluatePermission(when: PermissionWhen, check?: PermissionCheck): boolean {
  if (typeof when === 'boolean') return when;
  if (typeof when === 'function') return when();
  if (!check) {
    // No provider mounted: deny by default. Loud warning in dev so users
    // notice they forgot to wrap their app.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        '[@bloomneo/uikit] <PermissionGate> evaluated `when` as a string/array but no <PermissionProvider> is mounted. Wrap your app in <PermissionProvider check={...}>.'
      );
    }
    return false;
  }
  if (typeof when === 'string') return check(when);
  // Array: pass if ANY permission matches (OR semantics — most common case).
  return when.some(check);
}

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

export function PermissionGate({ when, children, fallback = null }: PermissionGateProps): React.ReactNode {
  const evaluate = usePermission();
  return evaluate(when) ? <>{children}</> : <>{fallback}</>;
}
