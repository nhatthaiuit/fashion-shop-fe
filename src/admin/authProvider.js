export const authProvider = {
async login({ username, password }) {
const res = await fetch(`${API_BASE}/api/auth/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email: username, password }),
});
const data = await res.json();
if (!res.ok) throw new Error(data?.message || 'Invalid credentials');
if (!data?.token) throw new Error('Missing token');
localStorage.setItem('token', data.token);
return Promise.resolve();
},
async logout() {
localStorage.removeItem('token');
return Promise.resolve();
},
async checkAuth() {
const token = localStorage.getItem('token');
return token ? Promise.resolve() : Promise.reject();
},
async checkError() {
return Promise.resolve();
},
async getPermissions() {
try {
const token = localStorage.getItem('token');
if (!token) return Promise.resolve('guest');
const payload = JSON.parse(atob(token.split('.')[1]));
return Promise.resolve(payload.role || 'customer');
} catch {
return Promise.resolve('customer');
}
},
};