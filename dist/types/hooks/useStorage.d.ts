/**
 * useLocalStorage Hook - Persistent state with localStorage
 * @module @bloomneo/uikit
 * @file src/hooks/useStorage.ts
 */
/**
 * @llm-rule Storage hook for persisting state to localStorage
 * Handles SSR, JSON parsing errors, and storage unavailability
 */
export type UseLocalStorageReturn<T> = [
    value: T,
    setValue: (value: T | ((prev: T) => T)) => void,
    removeValue: () => void
];
/**
 * Hook to persist state in localStorage with automatic JSON serialization
 *
 * @param key - localStorage key
 * @param initialValue - Default value if no stored value exists
 * @returns [value, setValue, removeValue] tuple
 *
 * @example
 * ```tsx
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 * const [settings, setSettings] = useLocalStorage('settings', { theme: 'light' });
 *
 * // Update value
 * setUser({ name: 'John', email: 'john@example.com' });
 *
 * // Remove value (resets to initialValue)
 * removeUser();
 * ```
 */
export declare function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T>;
//# sourceMappingURL=useStorage.d.ts.map