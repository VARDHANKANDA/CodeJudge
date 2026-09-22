import { create } from 'zustand';

export interface UserState {
  id: string;
  email: string;
  username: string;
  role: string;
  name?: string;
  avatarUrl?: string;
  points: number;
  rating: number;
}

interface AuthStore {
  user: UserState | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserState, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (userData: Partial<UserState>) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  // Safe initial storage recovery
  let initialUser: UserState | null = null;
  let initialAccess: string | null = null;
  let initialRefresh: string | null = null;

  if (typeof window !== 'undefined') {
    try {
      const storedUser = localStorage.getItem('user');
      initialUser = storedUser ? JSON.parse(storedUser) : null;
      initialAccess = localStorage.getItem('accessToken');
      initialRefresh = localStorage.getItem('refreshToken');
    } catch {
      initialUser = null;
      initialAccess = null;
      initialRefresh = null;
    }
  }

  return {
    user: initialUser,
    accessToken: initialAccess,
    refreshToken: initialRefresh,
    isAuthenticated: !!initialAccess,
    setAuth: (user, accessToken, refreshToken) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        } catch {
          // Ignore storage quota or disabled storage errors
        }
      }
      set({ user, accessToken, refreshToken, isAuthenticated: true });
    },
    clearAuth: () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } catch {
          // Ignore
        }
      }
      set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
    },
    updateUser: (userData) => {
      set((state) => {
        if (!state.user) return {};
        const updated = { ...state.user, ...userData };
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem('user', JSON.stringify(updated));
          } catch {
            // Ignore
          }
        }
        return { user: updated };
      });
    },
  };
});
