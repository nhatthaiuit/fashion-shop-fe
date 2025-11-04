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

    sessionStorage.setItem('token', token);
    // Có thể lưu role/email nếu cần:
    // localStorage.setItem('me', JSON.stringify(payload.user));
    return;
  },

  async logout() {
    sessionStorage.removeItem('token');
    // Nếu muốn gọi BE logout:
    // await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST', credentials: 'include' }).catch(()=>{});
    return;
  },

  async checkAuth() {
    const token = sessionStorage.getItem('token');
    if (!token) throw new Error('Unauthenticated');
    return;
  },

  async checkError() {
    // cho qua
    return;
  },

  async getPermissions() {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return 'guest';
      const payload = JSON.parse(atob(token.split('.')[1]));
      // BE của bạn hiện có role: customer | admin
      return payload.role || 'customer';
    } catch {
      return 'customer';
    }
  },
};

function isExpiredJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload?.exp;
    if (!exp) return false; // không có exp thì coi như không check
    const now = Math.floor(Date.now() / 1000);
    return now >= exp - 10; // trừ 10s chống lệch giờ
  } catch {
    return true; // token hỏng => coi như hết hạn
  }
}

export default {
  login: async ({ username, password }) => {
    const r = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail: username, password })
    });
    if (!r.ok) throw new Error('Invalid credentials');
    const data = await r.json();
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return Promise.resolve();
  },

  // Nếu bất kỳ request nào trả 401/403 -> xoá token + RA tự đưa về /login
  checkError: (error) => {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Bảo vệ route: token phải tồn tại và chưa hết hạn
  checkAuth: () => {
    const token = sessionStorage.getItem('token');
    if (!token) return Promise.reject();
    if (isExpiredJwt(token)) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};
//sd
