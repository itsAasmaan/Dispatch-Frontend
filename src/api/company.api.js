import api from "./axios";

export const companyApi = {
  getAll: (params) => api.get("/companies", { params }),
  getOne: (companyId) => api.get(`/companies/${companyId}`),
  create: (data) => api.post("/companies", data),
  update: (companyId, data) => api.put(`/companies/${companyId}`, data),
  delete: (companyId) => api.delete(`/companies/${companyId}`),
  follow: (companyId) => api.post(`/companies/${companyId}/follow`),
  unfollow: (companyId) => api.delete(`/companies/${companyId}/follow`),
};
