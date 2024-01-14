"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

export default function Page() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
    });

    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        errors.forEach((error) => toast.error(error));
    }, [errors]);

    async function handleForgotPassword() {
        try {
            await schema.validate({ email }, { abortEarly: false });

            await axios.post(
                "/api/auth/forgot-password",
                {
                    email,
                },
                { withCredentials: true }
            );

            router.push("/");
        } catch (validationErrors: any) {
            const newErrors: string[] = [];
            validationErrors.inner.forEach((error: any) => {
                newErrors.push(error.message);
            });
            setErrors(newErrors);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md sm:shadow-lg md:mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Forgot Password
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    Enter your email address, and we'll send you a reset link.
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleForgotPassword();
                    }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        href="/auth/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        ← Go back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
