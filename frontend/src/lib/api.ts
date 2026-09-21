import { useAuthStore } from '../store/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { skipAuth, ...fetchOptions } = options;
  const url = `${API_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

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

  let response = await fetch(url, fetchOptions);

  // Transparent token refresh intercept
  if (response.status === 401 && !skipAuth) {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          // Store new tokens
          useAuthStore.getState().setAuth(data.user, data.accessToken, data.refreshToken);
          
          // Retry the original request
          headers.set('Authorization', `Bearer ${data.accessToken}`);
          fetchOptions.headers = headers;
          response = await fetch(url, fetchOptions);
        } else {
          // Refresh token expired - force logout
          useAuthStore.getState().clearAuth();
        }
      } catch (err) {
        useAuthStore.getState().clearAuth();
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}
