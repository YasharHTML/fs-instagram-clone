"use client";
import { toggleLikeStatus } from "@/actions/like-post";
import { useRouter } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({
    isLiked,
    postId,
    likeCount,
}: {
    isLiked: boolean;
    postId: string;
    likeCount: number;
}) {
    const router = useRouter();
    return (
        <div
        className="flex items-center gap-2"
            onClick={async () => {
                await toggleLikeStatus(postId);
                router.refresh();
            }}
        >
            {isLiked ? (
                <AiFillHeart color="red" />
            ) : (
                <AiOutlineHeart color="red" />
            )}
            <span className="text-red-500">{likeCount}</span>
        </div>
    );
}
