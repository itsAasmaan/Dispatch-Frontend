import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      /**
       * Setters
       */
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),
      setUser: (user) => set({ user }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      /**
       * Getters
       */
      isAdmin: () => get().user?.role === "admin",
      isCandidate: () => get().user?.role === "candidate",
      isCompany: () => get().user?.role === "company",
      hasRole: (role) => get().user?.role === role,
    }),
    {
      name: "dispatch-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
