import { create } from 'zustand';
import { User, MOCK_USER } from '@/types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  // 模拟登录
  login: () => void;
  // 模拟登出
  logout: () => void;
}

// 创建 Store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: () => set({ user: MOCK_USER, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));