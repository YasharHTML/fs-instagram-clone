import { Post } from "@/types/Post";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function PostModal({
    post,
    onClose,
}: {
    post: Post;
    onClose: (...args: any[]) => any;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-md shadow-md max-w-lg w-full post-modal-content"
            >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-4">{post.body}</p>
                <img
                    src={post.photo}
                    alt={`Post ${post.id}`}
                    className="w-full mb-2 rounded-md"
                />
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                        {post.createdAt}
                    </span>
                    <Link href={`/profile/${post.userId}`}>
                        <span className="text-blue-500 text-sm">
                            User ID: {post.userId}
                        </span>
                    </Link>
                </div>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
