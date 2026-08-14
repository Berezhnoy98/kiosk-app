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
    // Use direct fetch here to avoid issues with apiClient while HMR/cache reconciles
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.login}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ message: resp.statusText }));
      throw new Error(err.message || `Auth error: ${resp.status}`);
    }

    return resp.json();
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
