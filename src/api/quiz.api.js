import api from "./axios";

export const quizApi = {
  getAll: (params) => api.get("/quizzes", { params }),
  getOne: (quizId) => api.get(`/quizzes/${quizId}`),
  generate: (data) => api.post("/quizzes/generate", data),
  start: (quizId) => api.post(`/quizzes/${quizId}/start`),
  submitAnswer: (attemptId, data) => api.post(`/quizzes/attempts/${attemptId}/answer`, data),
  complete: (attemptId) => api.post(`/quizzes/attempts/${attemptId}/complete`),
  getResult: (attemptId) => api.get(`/quizzes/attempts/${attemptId}/result`),
  myAttempts: (params) => api.get("/quizzes/my-attempts", { params }),
};
