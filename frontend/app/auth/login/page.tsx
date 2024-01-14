"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        errors.forEach((error) => toast.error(error));
    }, [errors]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });

            const { email, password, remember } = formData;

            await axios.post(
                "/api/auth/login",
                {
                    email,
                    password,
                    remember,
                },
                { withCredentials: true }
            );

            router.push("/");
            router.refresh();
        } catch (validationErrors: any) {
            console.error(validationErrors);
            const newErrors: string[] = [];
            if (validationErrors.response.data) {
                const error = validationErrors.response.data.error;
                if (error === "Wrong credentials") {
                    newErrors.push("Password is incorrect");
                    setErrors(newErrors);
                    return;
                }
            }
            validationErrors.inner.forEach((error: any) => {
                newErrors.push(error.message);
            });
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md sm:shadow-lg md:mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="john.doe@example.com"
                        />
                    </div>
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={formData.remember}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        remember: e.target.checked,
                                    })
                                }
                                className="mr-2"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm text-gray-600"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center text-gray-600 m-2">or</div>
                <Link href={"/api/auth/google"}>
                    <div className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red text-center">
                        Sign in with Google
                    </div>
                </Link>
                <div className="mt-6 text-center">
                    <Link
                        href="/auth/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Don't have an account? Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}
