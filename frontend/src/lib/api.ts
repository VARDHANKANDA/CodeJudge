import { useAuthStore } from '../store/auth';

const RAW_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_URL = RAW_API_URL.replace(/\/+$/, '');

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

// Concurrency lock for refresh token request
let refreshPromise: Promise<string | null> | null = null;

async function executeTokenRefresh(): Promise<string | null> {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) {
    useAuthStore.getState().clearAuth();
    return null;
  }

  try {
    const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      if (data?.accessToken) {
        useAuthStore.getState().setAuth(data.user, data.accessToken, data.refreshToken);
        return data.accessToken;
      }
    }
    useAuthStore.getState().clearAuth();
    return null;
  } catch {
    useAuthStore.getState().clearAuth();
    return null;
  } finally {
    refreshPromise = null;
  }
}

export async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { skipAuth, ...fetchOptions } = options;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${cleanEndpoint}`;

  // Headers setup
  const headers = new Headers(fetchOptions.headers || {});
  if (!headers.has('Content-Type') && !(fetchOptions.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Access Token
  if (!skipAuth) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  fetchOptions.headers = headers;

  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (err: any) {
    throw new Error('Unable to connect to the CodeJudge API. Please verify your connection or try again.');
  }

  // Transparent token refresh intercept
  if (response.status === 401 && !skipAuth) {
    if (!refreshPromise) {
      refreshPromise = executeTokenRefresh();
    }
    const newAccessToken = await refreshPromise;

    if (newAccessToken) {
      // Retry the original request with new token
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      fetchOptions.headers = headers;
      try {
        response = await fetch(url, fetchOptions);
      } catch {
        throw new Error('Unable to connect to the CodeJudge API. Please try again.');
      }
    }
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData) {
        if (Array.isArray(errorData.message)) {
          errorMessage = errorData.message.join(', ');
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
      }
    } catch {
      // Response was not JSON (e.g. 502/504 gateway html)
      if (response.status === 404) errorMessage = 'Requested resource was not found.';
      else if (response.status === 403) errorMessage = 'You do not have permission to perform this action.';
      else if (response.status === 401) errorMessage = 'Session expired. Please sign in again.';
      else if (response.status >= 500) errorMessage = 'Server encountered an error. Please try again later.';
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json().catch(() => ({}));
}
