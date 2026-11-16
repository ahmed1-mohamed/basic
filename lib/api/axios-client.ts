import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { APP_CONFIG } from "@/constants";
import type { ApiError } from "@/types/api";

/**
 * Creates and configures the centralized Axios client instance.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Injects authentication token and headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(APP_CONFIG.authStorageKey);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardizes error responses and handles auth expiration
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const formattedError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected network error occurred",
      statusCode: error.response?.status,
      errors: error.response?.data?.errors,
      code: error.code,
    };

    // Global unauthorized token expiration handling
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem(APP_CONFIG.authStorageKey);
      // Optional: Event or custom redirect can be triggered here
    }

    return Promise.reject(formattedError);
  }
);

export default apiClient;
