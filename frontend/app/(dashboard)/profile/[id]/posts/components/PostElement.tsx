"use client";
import { Post } from "@/types/Post";
import { useState } from "react";

export default function PostElement({
    post,
    onPostClick,
}: {
    post: Post;
    onPostClick: (...args: any[]) => any;
}) {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <li className="relative overflow-hidden bg-white p-4 rounded-md shadow-md mb-4">
            <div
                className="w-full h-40 mb-2 rounded-md transition duration-300 ease-in-out opacity-100 scale-100"
                onClick={() => onPostClick(post)}
            >
                <img
                    src={post.photo}
                    alt={`Post ${post.id}`}
                    className="w-full h-full object-cover"
                />
            </div>
        </li>
    );
}
