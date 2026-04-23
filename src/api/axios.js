import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status == 401) {
      useAuthStore.getState().logout();
      toast.error("Session expired, please login again.");
      window.location.href = "/login";
    }

    if (status === 403) {
      toast.error("You are not authorized to perform this action.");
    }

    if (status === 422) {
      return Promise.reject(error);
    }

    if (status === 500) {
      toast.error("Something went wrong. Please try again.");
    }

    if (message && status !== 422) {
      // Let individual calls handle 422
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
