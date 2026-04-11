/**
 * useLocalStorage Hook - Persistent state with localStorage
 * @module @bloomneo/uikit
 * @file src/hooks/useStorage.ts
 */

import { useState, useEffect, useCallback } from 'react';

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
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      // SSR: return initial value
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value from localStorage and reset to initial value
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        // Key was removed
        setStoredValue(initialValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}