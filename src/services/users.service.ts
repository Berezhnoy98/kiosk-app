import { API_CONFIG } from '../config/api';

export interface UserItem {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CANTEEN';
  createdAt: string;
}

function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const usersService = {
  async getAll(): Promise<UserItem[]> {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.users.list}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async create(data: { email: string; password: string; name: string; role?: 'ADMIN' | 'CANTEEN' }) {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.register}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to create user');
    }
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.users.detail(id)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    });
    if (!res.ok) throw new Error('Failed to delete user');
  },

  async update(id: string, data: { role?: string; name?: string }) {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.users.detail(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  async changePassword(id: string, password: string) {
    const res = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.users.detail(id)}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to change password');
    }
    return res.json();
  },
};
