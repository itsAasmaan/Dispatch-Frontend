import api from "./axios";

export const questionApi = {
  getAll: (params) => api.get("/questions", { params }),
  getOne: (questionId) => api.get(`/questions/${questionId}`),
  create: (data) => api.post("/questions", data),
  upvote: (questionId) => api.post(`/questions/${questionId}/upvote`),
  bookmark: (questionId) => api.post(`/questions/${questionId}/bookmark`),
  approve: (questionId) => api.put(`/admin/questions/${questionId}/approve`),
};
