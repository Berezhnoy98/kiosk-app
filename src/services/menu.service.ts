import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export const menuService = {
  async getAll(): Promise<MenuItem[]> {
    return apiClient.get<MenuItem[]>(API_CONFIG.endpoints.menu.list);
  },

  async getById(id: string): Promise<MenuItem> {
    return apiClient.get<MenuItem>(API_CONFIG.endpoints.menu.detail(id));
  },

  async create(data: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<MenuItem> {
    return apiClient.post<MenuItem>(API_CONFIG.endpoints.menu.create, data);
  },

  async update(
    id: string,
    data: Partial<Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<MenuItem> {
    return apiClient.put<MenuItem>(API_CONFIG.endpoints.menu.update(id), data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_CONFIG.endpoints.menu.delete(id));
  },
};
