import apiClient from "./apiClient";
import type { LoginResponse, LoginCredentials } from "../types/auth";

// --- FRONTEND DEVELOPER NOTE ---
// To switch to Real API:
// 1. Set VITE_USE_MOCK=false in .env
// 2. Ensure Backend is running at VITE_API_URL
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 800));
      return {
        user: { id: 1, email: credentials.email, name: "Test User" },
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
      };
    }
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  socialLogin: async (provider: string, code: string): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 1000));
      return {
        user: { id: 1, email: "social@test.com", name: `${provider} User` },
        accessToken: "mock_social_token",
        refreshToken: "mock_social_refresh_token",
      };
    }
    const response = await apiClient.post<LoginResponse>(`/auth/${provider}/callback`, { code });
    return response.data;
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK) return;
    await apiClient.post("/auth/logout");
  },

  signup: async (data: any): Promise<LoginResponse> => {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 800));
      return {
        user: { id: Date.now(), email: data.email, name: data.name },
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
      };
    }
    const response = await apiClient.post<LoginResponse>("/auth/signup", data);
    return response.data;
  },
};
