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
  // Safe SSR check for client-side storage recovery
  let initialUser = null;
  let initialAccess = null;
  let initialRefresh = null;

  if (typeof window !== 'undefined') {
    initialUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
    initialAccess = localStorage.getItem('accessToken');
    initialRefresh = localStorage.getItem('refreshToken');
  }

  return {
    user: initialUser,
    accessToken: initialAccess,
    refreshToken: initialRefresh,
    isAuthenticated: !!initialAccess,
    setAuth: (user, accessToken, refreshToken) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      set({ user, accessToken, refreshToken, isAuthenticated: true });
    },
    clearAuth: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
    },
    updateUser: (userData) => {
      set((state) => {
        if (!state.user) return {};
        const updated = { ...state.user, ...userData };
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(updated));
        }
        return { user: updated };
      });
    },
  };
});
