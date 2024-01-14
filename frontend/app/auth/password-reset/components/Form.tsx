"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Form() {
    const router = useRouter();
    const token = useSearchParams().get("token")!;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordReset = () => {
        if (password && password === confirmPassword) {
            toast
                .promise(
                    axios.post(
                        "/api/auth/change-password",
                        { password },
                        {
                            headers: {
                                Authorization: "Bearer " + token,
                            },
                        }
                    ),
                    {
                        success: "Changed Password",
                        error: "Password couldn't be changed",
                        loading: "Password is being changed",
                    }
                )
                .then(() => router.replace("/"))
                .catch(() => router.replace("/auth/login"));
        } else {
            toast.error("Passwords do not match. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md sm:shadow-lg md:mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Password Reset
                </h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handlePasswordReset();
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}
