import api from "./axios";

export const roadmapApi = {
  getAll: (params) => api.get("/roadmaps", { params }),
  getOne: (roadmapId) => api.get(`/roadmaps/${roadmapId}`),
  enroll: (roadmapId) => api.post(`/roadmaps/${roadmapId}/enroll`),
  unenroll: (roadmapId) => api.delete(`/roadmaps/${roadmapId}/enroll`),
  updateTopicProgress: (roadmapId, topicId, data) => api.put(`/roadmaps/${roadmapId}/topics/${topicId}/progress`, data),
  myProgress: () => api.get("/roadmaps/my-progress"),
  getTopics: (params) => api.get("/topics", { params }),
};
