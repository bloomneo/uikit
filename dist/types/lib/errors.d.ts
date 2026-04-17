/**
 * Educational runtime errors for @bloomneo/uikit.
 * @module @bloomneo/uikit
 * @file src/lib/errors.ts
 *
 * @llm-rule WHEN: Validating required props inside components — use `requireProp()` and `requireArrayProp()`
 * @llm-rule AVOID: Throwing generic Error or TypeError — always use UIKitError for consistent error format
 * @llm-rule NOTE: Error format: `[@bloomneo/uikit] <Component> requires <prop>. <reason>. See: <docsUrl>`
 * @llm-rule NOTE: `warnInDev()` logs a warning only in development — use for soft validation (not hard crashes)
 * @llm-rule NOTE: All errors include a docs URL that agents can fetch to self-correct
 * @see https://github.com/bloomneo/uikit/blob/main/llms.txt
 */
/**
 * Base class for every typed error thrown by @bloomneo/uikit. Consumers
 * check `err instanceof UIKitError` to catch uikit errors uniformly; the
 * per-component subclasses below (`DataTableError`, `FormFieldError`, etc.)
 * are all `instanceof UIKitError` as well.
 */
export declare class UIKitError extends Error {
    readonly component: string;
    readonly docsUrl: string;
    constructor(component: string, message: string, slug?: string);
}
/**
 * Thrown by `<DataTable>` when `data` is not an array, a column id is
 * missing/duplicated, or other DataTable-specific invariants fail.
 */
export declare class DataTableError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Thrown by `<FormField>` when required wiring is missing — child isn't a
 * single ReactElement, `id` conflicts, or label/error shape is wrong.
 */
export declare class FormFieldError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Thrown by `<ThemeProvider>` or `useTheme()` — called outside a provider,
 * unknown theme name, invalid mode, mismatched storage key with foucScript.
 */
export declare class ThemeError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Thrown by `useConfirm()` or `<ConfirmProvider>` when the provider is
 * missing from the tree or the hook is called outside a React component.
 */
export declare class ConfirmError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Thrown by `<Toaster>` / `useToast()` / `toast.*` when called outside a
 * component tree or before `<ToastProvider />` has mounted.
 */
export declare class ToastError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Thrown by `<PermissionGate>` / `usePermission()` when the provider's
 * `check` callback is missing or has the wrong shape.
 */
export declare class PermissionError extends UIKitError {
    constructor(message: string, slug?: string);
}
/**
 * Throw if a required prop is missing or wrongly typed. Designed to fire at
 * the very top of a component's render so consumers see the message before
 * any downstream null-deref.
 */
export declare function requireProp<T>(component: string, prop: string, value: T | undefined | null, hint?: string): T;
/**
 * Throw if `value` is not an array. Catches the most common DataTable misuse:
 * passing a single object or `undefined` while data is loading.
 */
export declare function requireArrayProp<T>(component: string, prop: string, value: unknown, hint?: string): T[];
/**
 * Lighter-weight version that only warns in development. Use for nice-to-have
 * conventions (e.g. "every column should have a unique id") that shouldn't
 * crash a production app.
 */
export declare function warnInDev(component: string, message: string, slug?: string): void;
//# sourceMappingURL=errors.d.ts.map