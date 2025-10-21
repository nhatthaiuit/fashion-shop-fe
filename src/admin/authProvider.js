// src/admin/authProvider.js
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const authProvider = {
  async login({ username, password }) {
    // BE của bạn nhận usernameOrEmail + password
    const body = { usernameOrEmail: username, password };

    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Nếu BE dùng cookie session thì bật dòng dưới:
      // credentials: 'include',
      body: JSON.stringify(body),
    });

    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = payload?.message || payload?.error || `Login failed (${res.status})`;
      throw new Error(msg);
    }

    const token = payload?.token;
    if (!token) throw new Error('Missing token from server response');

    localStorage.setItem('token', token);
    // Có thể lưu role/email nếu cần:
    // localStorage.setItem('me', JSON.stringify(payload.user));
    return;
  },

  async logout() {
    localStorage.removeItem('token');
    // Nếu muốn gọi BE logout:
    // await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(()=>{});
    return;
  },

  async checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthenticated');
    return;
  },

  async checkError() {
    // cho qua
    return;
  },

  async getPermissions() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return 'guest';
      const payload = JSON.parse(atob(token.split('.')[1]));
      // BE của bạn hiện có role: customer | admin
      return payload.role || 'customer';
    } catch {
      return 'customer';
    }
  },
};
//sd
