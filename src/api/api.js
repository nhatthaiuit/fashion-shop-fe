import axios from "axios";

export const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

const api = axios.create({ baseURL: API_BASE });

// Products
export const getProducts = (params = {}) => api.get("/api/products", { params });
export const getProductById = (id) => api.get(`/api/products/${id}`);

// Auth
export const registerUser = (data) => api.post("/api/auth/register", data);
export const loginUser = (data) => api.post("/api/auth/login", data);

// Orders
export const createOrder = (data, token) =>
  api.post("/api/orders", data, { headers: { Authorization: `Bearer ${token}` } });

export const updateOrderStatus = (id, status, token) =>
  api.put(
    `/api/orders/${id}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export default api;
