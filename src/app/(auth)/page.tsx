"use client";
import { loginAPI } from "@/api/account/login";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { setToken } = useAuthStore();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const result = await loginAPI({
                username: username,
                password: password,
            });
            if (result.data.status === "0000") {
                toast.success("Login successful!");
                console.log("result: ", result.data.token);
                setToken(result.data.token);
                setTimeout(() => {
                    router.push("/assessment");
                }, 1000); // allow toast to be shown for a bit
            } else {
                throw new Error(result.data.message || "Unknown error");
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white text-white"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-700 bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-white focus:border-white text-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-black bg-white rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Sign In
                    </button>
                </form>
                {/* <p className="text-sm text-center text-gray-400">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-white hover:underline"
                    >
                        Sign up
                    </a>
                </p> */}
            </div>
            <ToastContainer position="bottom-center" autoClose={3000} />
        </div>
    );
}
