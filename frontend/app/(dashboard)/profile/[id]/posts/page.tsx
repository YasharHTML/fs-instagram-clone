import { getPostsByUserId } from "@/utils";
import PostList from "./components/PostList";
import { Post } from "@/types/Post";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const posts: Post[] = await getPostsByUserId(id);

    return (
        <div>
            <h2>User Posts</h2>
            {posts.length === 0 ? (
                <p>No posts found for this user.</p>
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    );
}
