import api from "./axios";

export const profileApi = {
  getProfile: (username) => api.get(`/profile/${username}`),
  updateProfile: (data) => api.put("/profile", data),
  myInterviews: (params) => api.get("/profile/my-interviews", { params }),
  myBookmarks: (params) => api.get("/profile/my-bookmarks", { params }),
};
