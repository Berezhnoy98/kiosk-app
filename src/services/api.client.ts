import { API_CONFIG } from '../config/api';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  token?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL;
  }

  private getHeaders(options?: ApiRequestOptions): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options?.token) {
      headers.Authorization = `Bearer ${options.token}`;
    }

    return { ...headers, ...options?.headers };
  }

  async request<T = unknown>(
    url: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const token = localStorage.getItem('access_token') || options.token;

    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers: this.getHeaders({ ...options, token }),
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  }

  async get<T = unknown>(url: string, token?: string): Promise<T> {
    return this.request<T>(url, { method: 'GET', token });
  }

  async post<T = unknown>(
    url: string,
    body: unknown,
    token?: string,
  ): Promise<T> {
    return this.request<T>(url, { method: 'POST', body, token });
  }

  async put<T = unknown>(
    url: string,
    body: unknown,
    token?: string,
  ): Promise<T> {
    return this.request<T>(url, { method: 'PUT', body, token });
  }

  async delete<T = unknown>(url: string, token?: string): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', token });
  }
}

export const apiClient = new ApiClient();
