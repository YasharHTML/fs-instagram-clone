"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const schema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        errors.forEach((error) => toast.error(error));
    }, [errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });

            const { email, username, password } = formData;

            await axios.post(
                "/api/auth/register",
                {
                    username,
                    email,
                    password,
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
    };

    return (
        <div className="min-h-screen flex items-center justify-center sm:bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-md sm:shadow-lg md:mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    Register
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-600 text-sm font-medium mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>
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
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md mb-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <Link
                        href="/auth/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        ← Go to Login Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
