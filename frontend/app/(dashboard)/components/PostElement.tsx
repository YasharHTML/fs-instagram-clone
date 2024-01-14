import { toggleLikeStatus } from "@/actions/like-post";
import { Post } from "@/types/Post";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import LikeButton from "./LikeButton";

export default function PostElement({
    post,
    userId,
}: {
    post: Post;
    userId: string;
}) {
    const isLiked =
        post.Like.findIndex((like) => like.userId === userId) !== -1;

    return (
        <div className="mb-8 border-[1px] p-4">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.body}</p>
            <img
                src={post.photo}
                alt={`Post ${post.id}`}
                className="w-full h-auto object-cover mb-2 rounded-md"
            />
            <LikeButton isLiked={isLiked} postId={post.id} likeCount={post.Like.length} />
        </div>
    );
}
