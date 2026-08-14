import { API_CONFIG } from '../config/api';

function authHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const galleryService = {
  async getAlbums() {
    const res = await fetch(`${API_CONFIG.baseURL}/gallery/albums`, { headers: { 'Content-Type': 'application/json', ...authHeader() } });
    if (!res.ok) throw new Error('Failed to load albums');
    return res.json();
  },

  async createAlbum(data: { title: string; description?: string }) {
    const res = await fetch(`${API_CONFIG.baseURL}/gallery/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to create album');
    }
    return res.json();
  },

  async uploadPhotos(albumId: string, files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) form.append('photos', files[i]);
    const res = await fetch(`${API_CONFIG.baseURL}/gallery/albums/${albumId}/photos`, {
      method: 'POST',
      headers: { ...authHeader() },
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to upload photos');
    }
    return res.json();
  }
};
