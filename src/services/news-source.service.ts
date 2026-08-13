import { apiClient } from './api.client';
import { API_CONFIG } from '../config/api';

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const newsSourceService = {
  async getActiveSources(): Promise<NewsSource[]> {
    return apiClient.get<NewsSource[]>(API_CONFIG.endpoints.news.activeSources);
  },

  async getAll(): Promise<NewsSource[]> {
    return apiClient.get<NewsSource[]>(API_CONFIG.endpoints.news.sources);
  },

  async getById(id: string): Promise<NewsSource> {
    return apiClient.get<NewsSource>(API_CONFIG.endpoints.news.sourceDetail(id));
  },

  async create(data: Omit<NewsSource, 'id' | 'createdAt' | 'updatedAt'>): Promise<NewsSource> {
    return apiClient.post<NewsSource>(API_CONFIG.endpoints.news.createSource, data);
  },

  async update(
    id: string,
    data: Partial<Omit<NewsSource, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<NewsSource> {
    return apiClient.put<NewsSource>(API_CONFIG.endpoints.news.updateSource(id), data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(API_CONFIG.endpoints.news.deleteSource(id));
  },
};
