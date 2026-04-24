import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/auth.api";
import { queryClient } from "../lib/queryClient";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, logout: clearAuth, user, token, isAuthenticated } = useAuthStore();

  const register = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      const { user, token } = response.data.data;
      setAuth(user, token);
      toast.success("Welcome to Dispatch!");
      navigate("/dashboard");
    },
    onError: (error) => {
      const errors = error?.response?.data?.errors;
      if (!errors) {
        toast.error(error?.response?.data?.message ?? "Registration failed");
      }

      return errors;
    },
  });

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, token } = response.data.data;
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/dashboard");
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message ?? "Login failed");
    },
  });

  const logout = useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });

  const me = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.me().then((r) => r.data.data.user),
    enabled: !!token,
    retry: false,
  });

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout,
    me,
  };
};
