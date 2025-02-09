// store/userStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null, // Initial state: no user is logged in
  login: (userData) => set({ user: userData }), // Set user data on login
  logout: () => set({ user: null }), // Clear user data on logout
}));
//the date which is used to watch timetable and reserving seats and doing payment.

const useDateStore = create((set) => ({
  date: "",
  setDate: (date) => set({ date: date }),
  clearDate: () => set({ date: "" }),
}));

export { useUserStore, useDateStore };
