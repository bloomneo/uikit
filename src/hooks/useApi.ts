/**
 * useApi Hook - Generic API client for fullstack applications
 * @description Provides a simple interface for making HTTP requests with error handling
 * @package @bloomneo/uikit
 */

import { useState, useCallback } from 'react';

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
export function useApi<T = any>(options: ApiOptions = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-detect base URL (dev vs prod)
  const baseURL = options.baseURL ||
    (import.meta.env?.VITE_API_URL ||
     (typeof window !== 'undefined' && window.location.hostname === 'localhost'
       ? 'http://localhost:3000'
       : ''));

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const call = useCallback(async (
    method: string,
    endpoint: string,
    data?: any
  ): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

      const config: RequestInit = {
        method: method.toUpperCase(),
        headers: defaultHeaders,
        signal: controller.signal,
      };

      if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        config.body = JSON.stringify(data);
      }

      const url = `${baseURL}${endpoint}`;
      const response = await fetch(url, config);

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return result;

    } catch (err: any) {
      let errorMessage = 'Network error occurred';

      if (err.name === 'AbortError') {
        errorMessage = 'Request timeout';
      } else if (err.message?.includes('fetch')) {
        errorMessage = 'Backend not available - check if your API server is running';
      } else {
        errorMessage = err.message || 'Unknown error occurred';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [baseURL, options.timeout]);

  // Convenience methods
  const get = useCallback((endpoint: string) => call('GET', endpoint), [call]);
  const post = useCallback((endpoint: string, data?: any) => call('POST', endpoint, data), [call]);
  const put = useCallback((endpoint: string, data?: any) => call('PUT', endpoint, data), [call]);
  const deleteMethod = useCallback((endpoint: string) => call('DELETE', endpoint), [call]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    call,
    get,
    post,
    put,
    delete: deleteMethod,
    reset,
  };
}

/**
 * Hook for checking backend connectivity
 */
export function useBackendStatus() {
  const { data, loading, error, get } = useApi<{ status: string; timestamp: string }>();

  const checkStatus = useCallback(async () => {
    try {
      await get('/health');
      return true;
    } catch {
      return false;
    }
  }, [get]);

  return {
    isConnected: data?.status === 'ok',
    loading,
    error,
    checkStatus,
    lastCheck: data?.timestamp,
  };
}