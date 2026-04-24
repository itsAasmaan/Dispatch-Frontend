import { create } from "zustand";

export const useNotificationStore = create((set, get) => ({
  unreadCount: 0,
  notifications: [],

  setUnreadCount: (count) => set({ unreadCount: count }),
  increamentUnread: () =>
    set((state) => {
      unreadCount: state.unreadCount + 1;
    }),
  decrementUnread: () =>
    set((state) => {
      unreadCount: Math.max(0, state.unreadCount - 1);
    }),

  setNotifications: (notifications) => set({ notifications }),
  markOneRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({
        ...n,
        read_at: n.read_at ?? new Date().toISOString(),
      })),
      unreadCount: 0,
    })),
}));
