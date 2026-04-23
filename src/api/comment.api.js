import api from "./axios";

export const commentApi = {
  getInterviewComments: (interviewId, params) => api.get(`/interviews/${interviewId}/comments`, { params }),
  getQuestionComments: (questionId, params) => api.get(`/questions/${questionId}/comments`, { params }),
  postInterviewComment: (interviewId, data) => api.post(`/interviews/${interviewId}/comments`, data),
  postQuestionComment: (questionId, data) => api.post(`/questions/${questionId}/comments`, data),
  delete: (commentId) => api.delete(`/comments/${commentId}`),
  upvote: (commentId) => api.post(`/comments/${commentId}/upvote`),
  flag: (commentId) => api.post(`/comments/${commentId}/flag`),
};
