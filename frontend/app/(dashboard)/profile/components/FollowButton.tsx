"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const FollowButton = ({ status }: { status: boolean }) => {
    const id = useParams().id;

    const [isFollowing, setFollowing] = useState(status);

    const toggleFollow = async () => {
        await axios[isFollowing ? "delete" : "put"]("/api/user/follow/" + id);
        setFollowing((prevFollowing) => !prevFollowing);
    };

    return (
        <button
            onClick={toggleFollow}
            className={`px-4 py-2 rounded-full focus:outline-none ${
                isFollowing
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500"
                    : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500"
            }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;
