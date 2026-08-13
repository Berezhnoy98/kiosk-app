import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'CANTEEN';
  };
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.endpoints.auth.login, {
      email,
      password,
    });
  },

  async register(
    email: string,
    password: string,
    name: string,
    role: 'ADMIN' | 'CANTEEN' = 'CANTEEN',
  ): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(API_CONFIG.endpoints.auth.register, {
      email,
      password,
      name,
      role,
    });
  },

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('access_token');
  },

  clearToken() {
    localStorage.removeItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
