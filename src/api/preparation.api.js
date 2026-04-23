import api from "./axios";

export const preparationApi = {
  getAll: () => api.get("/preparation-plans"),
  getOne: (planId) => api.get(`/preparation-plans/${planId}`),
  create: (data) => api.post("/preparation-plans", data),
  delete: (planId) => api.delete(`/preparation-plans/${planId}`),
  todayTasks: (planId) => api.get(`/preparation-plans/${planId}/today`),
  completeTask: (taskId) => api.post(`/preparation-plans/tasks/${taskId}/complete`),
  skipTask: (taskId) => api.post(`/preparation-plans/tasks/${taskId}/skip`),
};
