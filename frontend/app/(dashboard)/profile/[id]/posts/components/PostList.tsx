"use client";

import { useState } from "react";
import PostElement from "./PostElement";
import PostModal from "./PostModal";
import { Post } from "@/types/Post";

const PostList = ({
    posts,
}: {
    posts: Post[];
}) => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handlePostClick = (post: Post) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4">
                {posts.map((post) => (
                    <PostElement
                        key={post.id}
                        post={post}
                        onPostClick={handlePostClick}
                    />
                ))}
            </ul>
            {selectedPost && (
                <PostModal post={selectedPost} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default PostList;
