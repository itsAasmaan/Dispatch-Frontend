import api from "./axios";

export const adminApi = {
  getStats: () => api.get("/admin/stats"),
  getUsers: (params) => api.get("/admin/users", { params }),
  toggleUserActive: (userId) => api.post(`/admin/users/${userId}/toggle-active`),
  getFlaggedComments: () => api.get("/admin/flagged-comments"),
  dismissFlag: (commentId) => api.post(`/admin/comments/${commentId}/dismiss-flag`),
  deleteComment: (commentId) => api.delete(`/admin/comments/${commentId}`),
  verifyCompany: (companyId) => api.post(`/admin/companies/${companyId}/verify`),
  getPendingQuestions: () => api.get("/admin/pending-questions"),
};
