import api from "./axios";

export const salaryApi = {
  getAll: (params) => api.get("/salary-insights", { params }),
  getStats: (params) => api.get("/salary-insights/stats", { params }),
  create: (data) => api.post("/salary-insights", data),
};
