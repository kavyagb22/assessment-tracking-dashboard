// authStore.js
import { create } from "zustand";

// Initialize Zustand store with persisted token from localStorage
export const useAuthStore = create((set: any) => ({
    token: localStorage.getItem("authToken") || "", // Retrieve the token from localStorage on initialization
    setToken: (newToken: string) => {
        localStorage.setItem("authToken", newToken); // Save token to localStorage
        set({ token: newToken });
    },
    clearToken: () => {
        localStorage.removeItem("authToken"); // Clear token from localStorage
        set({ token: null });
    },
}));
