import api from "./axios";

export const interviewApi = {
  getAll: (params) => api.get("/interviews", { params }),
  getOne: (interviewId) => api.get(`/interviews/${interviewId}`),
  create: (data) => api.post("/interviews", data),
  update: (interviewId, data) => api.put(`/interviews/${interviewId}`, data),
  delete: (interviewId) => api.delete(`/interviews/${interviewId}`),
  publish: (interviewId) => api.post(`/interviews/${interviewId}/publish`),
  upvote: (interviewId) => api.post(`/interviews/${interviewId}/upvote`),
  bookmark: (interviewId) => api.post(`/interviews/${interviewId}/bookmark`),
};
