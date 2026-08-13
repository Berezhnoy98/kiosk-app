export const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  endpoints: {
    // Auth
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    // Menu
    menu: {
      list: '/menu',
      detail: (id: string) => `/menu/${id}`,
      create: '/menu',
      update: (id: string) => `/menu/${id}`,
      delete: (id: string) => `/menu/${id}`,
    },
    // News
    news: {
      list: '/news',
      sources: '/news/sources',
      activeSources: '/news/sources/active',
      sourceDetail: (id: string) => `/news/sources/${id}`,
      createSource: '/news/sources',
      updateSource: (id: string) => `/news/sources/${id}`,
      deleteSource: (id: string) => `/news/sources/${id}`,
      bySource: (sourceId: string) => `/news/source/${sourceId}`,
    },
    // Schedule
    schedule: {
      list: '/schedule',
      detail: (id: string) => `/schedule/${id}`,
      create: '/schedule',
      update: (id: string) => `/schedule/${id}`,
      delete: (id: string) => `/schedule/${id}`,
    },
    // Gallery
    gallery: {
      list: '/gallery',
      detail: (id: string) => `/gallery/${id}`,
      create: '/gallery',
      update: (id: string) => `/gallery/${id}`,
      delete: (id: string) => `/gallery/${id}`,
    },
    // Video
    video: {
      list: '/video',
      detail: (id: string) => `/video/${id}`,
      create: '/video',
      update: (id: string) => `/video/${id}`,
      delete: (id: string) => `/video/${id}`,
    },
    // Users
    users: {
      list: '/users',
      detail: (id: string) => `/users/${id}`,
    },
    // Health
    health: '/health',
  },
};
