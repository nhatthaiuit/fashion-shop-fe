export const dataProvider = {
  async getList(resource, params) {
    const qs = buildQuery(params);
    const { res, payload } = await req(`/api/${resource}${qs ? `?${qs}` : ''}`);
    const { data, total } = normalizeList(payload);
    const headerTotal = Number(res.headers.get('X-Total-Count'));
    return { data, total: Number.isFinite(headerTotal) ? headerTotal : total };
  }, // 👈 thêm dấu phẩy

  async getOne(resource, params) {
    const { payload } = await req(`/api/${resource}/${params.id}`);
    return { data: payload.data || payload };
  }, // 👈 thêm dấu phẩy

  async getMany(resource, params) {
    const ids = params.ids || [];
    const { payload } = await req(`/api/${resource}?ids=${ids.join(',')}`);
    const { data } = normalizeList(payload);
    return { data };
  }, // 👈 thêm dấu phẩy

async getManyReference(resource, params) {
// Map reference filters (e.g., order items by productId)
const filter = { ...(params.filter || {}), [params.target]: params.id };
const qs = buildQuery({ ...params, filter });
const { res, payload } = await req(`/api/${resource}?${qs}`);
const { data, total } = normalizeList(payload);
const headerTotal = Number(res.headers.get('X-Total-Count'));
return { data, total: Number.isFinite(headerTotal) ? headerTotal : total };
},
async update(resource, params) {
const { payload } = await req(`/api/${resource}/${params.id}`, { method: 'PUT', body: params.data });
return { data: payload.data || payload };
},
async updateMany(resource, params) {
const results = await Promise.all(params.ids.map(id => req(`/api/${resource}/${id}`, { method: 'PUT', body: params.data })));
return { data: results.map((r, i) => params.ids[i]) };
},
async create(resource, params) {
const { payload } = await req(`/api/${resource}`, { method: 'POST', body: params.data });
return { data: payload.data || payload };
},
async delete(resource, params) {
const { payload } = await req(`/api/${resource}/${params.id}`, { method: 'DELETE' });
return { data: payload.data || payload };
},
async deleteMany(resource, params) {
const results = await Promise.all(params.ids.map(id => req(`/api/${resource}/${id}`, { method: 'DELETE' })));
return { data: results.map((r, i) => params.ids[i]) };
},
};