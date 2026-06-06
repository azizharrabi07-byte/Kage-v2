import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../api/client";
import * as authApi from "../api/auth";

type User = { id: string; email: string; name: string };

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  init: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    const result = await authApi.login(email, password);
    await AsyncStorage.setItem("kage_token", result.access_token);
    set({ user: result.user, token: result.access_token, isAuthenticated: true });
  },

  signup: async (email, password, name) => {
    const result = await authApi.signup(email, password, name);
    await AsyncStorage.setItem("kage_token", result.access_token);
    set({ user: result.user, token: result.access_token, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem("kage_token");
    setToken(null);
    set({ user: null, token: null, isAuthenticated: false });
  },

  init: async () => {
    try {
      const stored = await AsyncStorage.getItem("kage_token");
      if (stored) {
        setToken(stored);
        const user = await authApi.getMe();
        set({ user, token: stored, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      await AsyncStorage.removeItem("kage_token");
      set({ isLoading: false });
    }
  },
}));
