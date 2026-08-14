import { API_CONFIG } from '../config/api';

function authHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const videoService = {
  async getPlaylists() {
    const res = await fetch(`${API_CONFIG.baseURL}/video/playlists`, { headers: { 'Content-Type': 'application/json', ...authHeader() } });
    if (!res.ok) throw new Error('Failed to load playlists');
    return res.json();
  },

  async createPlaylist(data: { title: string; description?: string }) {
    const res = await fetch(`${API_CONFIG.baseURL}/video/playlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to create playlist');
    }
    return res.json();
  },

  async uploadVideo(playlistId: string, files: FileList) {
    const form = new FormData();
    for (let i = 0; i < files.length; i++) form.append('files', files[i]);
    const res = await fetch(`${API_CONFIG.baseURL}/video/playlists/${playlistId}/videos`, {
      method: 'POST',
      headers: { ...authHeader() },
      body: form,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'Failed to upload video');
    }
    return res.json();
  }
};
