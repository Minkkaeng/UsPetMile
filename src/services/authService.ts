// src/services/authService.ts
import { authApi } from "./authApi";
import type { LoginResponse, User, LoginCredentials } from "../types/auth";

const TOKEN_KEY = "accessToken";
const USER_KEY = "uspetmile_user";

export const authService = {
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getUser: (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  login: async (credentials: LoginCredentials): Promise<User> => {
    const data: LoginResponse = await authApi.login(credentials);
    authService.saveAuthData(data);
    return data.user;
  },

  socialLogin: async (provider: string, code: string): Promise<User> => {
    const data: LoginResponse = await authApi.socialLogin(provider, code);
    authService.saveAuthData(data);
    return data.user;
  },

  signup: async (data: any): Promise<User> => {
    const response: LoginResponse = await authApi.signup(data);
    authService.saveAuthData(response);
    return response.user;
  },

  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new Event("auth-change"));
    }
  },

  saveAuthData: (data: LoginResponse) => {
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth-change"));
  },

  subscribe: (callback: () => void) => {
    window.addEventListener("auth-change", callback);
    return () => window.removeEventListener("auth-change", callback);
  },
};
