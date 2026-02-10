export interface User {
  id: number;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}
