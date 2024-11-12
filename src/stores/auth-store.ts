import { create } from "zustand";

// Helper function to check if localStorage is available
const getLocalStorageToken = () => {
    if (typeof window !== "undefined") {
        // We are in the browser
        return localStorage.getItem("authToken") || "";
    }
    // We are on the server
    return "";
};

export const useAuthStore = create((set: any) => ({
    token: getLocalStorageToken(),
    setToken: (newToken: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("authToken", newToken); // Save token to localStorage
        }
        set({ token: newToken });
    },
    clearToken: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("authToken"); // Clear token from localStorage
        }
        set({ token: null });
    },
}));
