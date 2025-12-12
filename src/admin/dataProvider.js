// src/admin/dataProvider.js
const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

/** Map _id -> id cho React Admin */
function withId(doc) {
  if (!doc) return doc;
  return doc.id ? doc : { ...doc, id: doc._id };
}

/** Build query từ RA (page/perPage, sort, filter) -> query của BE */
function buildQuery(params = {}) {
  const url = new URLSearchParams();

  // pagination: RA dùng page/perPage (1-based)
  if (params.pagination) {
    const { page, perPage } = params.pagination;
    url.set('page', String(page));      // BE của bạn đang dùng meta.page
    url.set('limit', String(perPage));  // BE của bạn đang dùng meta.limit
  }

  // sort
  if (params.sort) {
    const { field, order } = params.sort; // order: ASC | DESC
    url.set('sort', field);
    url.set('order', order);
  }

  // filter (tùy backend hỗ trợ)
  if (params.filter) {
    Object.entries(params.filter).forEach(([k, v]) => {
      if (v != null && v !== '') url.set(k, String(v));
    });
  }

  return url.toString();
}

/** Wrapper fetch: tự gắn Authorization nếu có token */
async function req(path, { method = 'GET', body, headers = {} } = {}) {
  const token = sessionStorage.getItem('token');
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': body instanceof FormData ? undefined : 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });

  const ct = res.headers.get('content-type') || '';
  const payload = ct.includes('application/json') ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (payload && (payload.message || payload.error)) || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return { res, payload };
}

/** Chuẩn hóa mọi kiểu trả về -> { data, total } cho RA */
function normalizeList(payload) {
  // Case: server trả mảng
  if (Array.isArray(payload)) {
    return { data: payload.map(withId), total: payload.length };
  }
  // Case: { items, meta }  <-- đúng JSON bạn cung cấp
  if (payload && Array.isArray(payload.items)) {
    const total = payload.meta?.total ?? payload.total ?? payload.items.length;
    return { data: payload.items.map(withId), total };
  }
  // Case: { data, total }
  if (payload && Array.isArray(payload.data)) {
    return { data: payload.data.map(withId), total: payload.total ?? payload.data.length };
  }
  // Fallback
  return { data: [], total: 0 };
}

export const dataProvider = {

  async getList(resource, params) {
    const qs = buildQuery(params);
    const url = `/api/${resource}${qs ? `?${qs}` : ''}`;
    console.log('[DP] getList:', { resource, url, params });
    const { res, payload } = await req(url);
    console.log('[DP] payload:', payload);

    // ✅ Fix: React Admin yêu cầu return { data, total }
    let data = [];
    let total = 0;

    // Nếu payload có items + meta
    if (payload && Array.isArray(payload.items)) {
      data = payload.items.map(p => ({ ...p, id: p._id }));
      total = payload.meta?.total ?? payload.items.length;
    }
    // Nếu payload là mảng (fallback)
    else if (Array.isArray(payload)) {
      data = payload.map(p => ({ ...p, id: p._id }));
      total = payload.length;
    }
    // Nếu payload có data + total
    else if (payload && Array.isArray(payload.data)) {
      data = payload.data.map(p => ({ ...p, id: p._id }));
      total = payload.total ?? payload.data.length;
    }

    console.log('[DP] return dataProvider:', { data, total }); // kiểm tra trước khi return
    return { data, total };
  },

  async getOne(resource, params) {
    const { payload } = await req(`/api/${resource}/${params.id}`);
    const doc = payload.data || payload;
    return { data: withId(doc) };
  },

  async getMany(resource, params) {
    // Nếu BE chưa hỗ trợ ?ids=..., bạn có thể vòng lặp gọi getOne hoặc đổi thành POST filter ids.
    const ids = params.ids || [];
    const { payload } = await req(`/api/${resource}?ids=${ids.join(',')}`);
    const { data } = normalizeList(payload);
    return { data };
  },

  async getManyReference(resource, params) {
    const filter = { ...(params.filter || {}), [params.target]: params.id };
    const qs = buildQuery({ ...params, filter });
    const { res, payload } = await req(`/api/${resource}?${qs}`);
    const { data, total } = normalizeList(payload);
    const headerTotal = Number(res.headers.get('X-Total-Count'));
    return { data, total: Number.isFinite(headerTotal) ? headerTotal : total };
  },

  async update(resource, params) {
    // Orders resource needs PUT method, others use PATCH
    // Orders & Products need PUT method
    const method = 'PUT';
    const { payload } = await req(`/api/${resource}/${params.id}`, { method, body: params.data });
    const doc = payload.data || payload;
    return { data: withId(doc) };
  },

  async updateMany(resource, params) {
    const results = await Promise.all(
      params.ids.map(id => req(`/api/${resource}/${id}`, { method: 'PATCH', body: params.data }))
    );
    return { data: results.map((_, i) => params.ids[i]) };
  },

  async create(resource, params) {
    const { payload } = await req(`/api/${resource}`, { method: 'POST', body: params.data });
    const doc = payload.data || payload;
    return { data: withId(doc) };
  },

  async delete(resource, params) {
    const { payload } = await req(`/api/${resource}/${params.id}`, { method: 'DELETE' });
    const doc = payload.data || payload;
    return { data: withId(doc) };
  },

  async deleteMany(resource, params) {
    const results = await Promise.all(
      params.ids.map(id => req(`/api/${resource}/${id}`, { method: 'DELETE' }))
    );
    return { data: results.map((_, i) => params.ids[i]) };
  },
};
