import { Post } from "@/types/Post";
import PostElement from "./PostElement";

export default function PostFeed({posts, userId}: {posts: Post[], userId: string}) {
    return (
        <div>
            {posts.map((post) => (
                <PostElement key={post.id} post={post} userId={userId} />
            ))}
        </div>
    );
}
