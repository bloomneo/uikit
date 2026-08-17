/**
 * useApi Hook - Generic API client for fullstack applications
 * @description Provides a simple interface for making HTTP requests with error handling
 * @package @bloomneo/uikit
 */
export interface ApiResponse<T = any> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
export interface ApiOptions {
    baseURL?: string;
    timeout?: number;
    headers?: Record<string, string>;
}
export interface UseApiReturn<T = any> extends ApiResponse<T> {
    /**
     * Each verb takes an optional per-call type that defaults to the hook's `T`.
     *
     * This matters because the two are often different: a list hook is
     * `useApi<User[]>`, but the POST that creates one returns a single `User`.
     * Without the per-call parameter, `await users.post('/api/users', …)` was
     * typed `User[]` and `u.email` did not compile — which is exactly what the
     * shipped `examples/use-api.tsx` did, so the canonical example never
     * typechecked for anyone who copied it.
     */
    call: <R = T>(method: string, endpoint: string, data?: any) => Promise<R>;
    get: <R = T>(endpoint: string) => Promise<R>;
    post: <R = T>(endpoint: string, data?: any) => Promise<R>;
    put: <R = T>(endpoint: string, data?: any) => Promise<R>;
    delete: <R = T>(endpoint: string) => Promise<R>;
    reset: () => void;
}
/**
 * Custom hook for making API requests
 */
export declare function useApi<T = any>(options?: ApiOptions): UseApiReturn<T>;
/**
 * Hook for checking backend connectivity
 */
export declare function useBackendStatus(): {
    isConnected: boolean;
    loading: boolean;
    error: string | null;
    checkStatus: () => Promise<boolean>;
    lastCheck: string | undefined;
};
//# sourceMappingURL=useApi.d.ts.map