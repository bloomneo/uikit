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
    call: (method: string, endpoint: string, data?: any) => Promise<T>;
    get: (endpoint: string) => Promise<T>;
    post: (endpoint: string, data?: any) => Promise<T>;
    put: (endpoint: string, data?: any) => Promise<T>;
    delete: (endpoint: string) => Promise<T>;
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