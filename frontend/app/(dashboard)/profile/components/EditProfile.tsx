"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EditProfile({
    username,
    dob,
}: {
    username: string;
    dob: Date;
}) {
    const id = useParams().id as string;
    const [newUsername, setNewUsername] = useState(username);
    const [newDob, setNewDob] = useState(dob.toString().split("T")[0]);
    const router = useRouter();
    const handleUpdateProfile = async () => {
        await toast.promise(
            axios.put(`/api/user/socials/` + id, {
                username: newUsername,
                dob: newDob,
            }),
            {
                error: "Profile Change Failed",
                loading: "Profile is being changed",
                success: "Profile changed",
            }
        );

        router.refresh();
    };

    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor="newUsername"
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    New Username
                </label>
                <input
                    type="text"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label
                    htmlFor="newUsername"
                    className="block text-sm font-medium text-gray-600 mb-2"
                >
                    New datetime
                </label>
                <input
                    type="date"
                    id="newDob"
                    value={newDob}
                    onChange={(e) => {
                        setNewDob(e.target.value);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="text-center">
                <button
                    onClick={handleUpdateProfile}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                >
                    Update Profile
                </button>
            </div>
        </>
    );
}
