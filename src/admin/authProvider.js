// src/admin/authProvider.js
const API_BASE = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://fashion-shop-backend.onrender.com' : 'http://localhost:4000')).replace(/\/$/, '');

export const authProvider = {
  async login({ username, password }) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: username, password }),
    });

    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(payload?.message || 'Login failed');
    }
    
    if (payload.user.role !== 'admin') {
      throw new Error('Access denied. Admin only.');
    }

    localStorage.setItem('auth_token', payload.token);
    localStorage.setItem('auth_user', JSON.stringify(payload.user));
    localStorage.setItem("auth_expiry", Date.now() + 24 * 60 * 60 * 1000) // handled in JS below
    return;
  },

  async logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_expiry');
    return;
  },

  async checkAuth() {
    const token = localStorage.getItem('auth_token');
    const expiry = localStorage.getItem('auth_expiry');
    
    if (!token || (expiry && Date.now() > Number(expiry))) {
      throw new Error('Unauthenticated');
    }
    
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role !== 'admin') {
          throw new Error('Unauthorized');
        }
      } catch (e) {
        throw new Error('Unauthorized');
      }
    } else {
        throw new Error('Unauthorized');
    }
    return;
  },

  async checkError(error) {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_expiry');
      throw new Error('Unauthorized');
    }
    return;
  },

  async getPermissions() {
    const userStr = localStorage.getItem('auth_user');
    if (userStr) {
      try {
        return JSON.parse(userStr).role;
      } catch (e) {
        return 'customer';
      }
    }
    return 'customer';
  }
};
