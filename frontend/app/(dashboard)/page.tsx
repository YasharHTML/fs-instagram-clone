import {
    getFollowings,
    getNotFollowings,
    getPostsOfFollowedUsers,
    getUser,
} from "@/utils";
import PostFeed from "./components/PostFeed";
import Followings from "./components/Followings";

export default async function Home() {
    const user = await getUser();
    const posts = await getPostsOfFollowedUsers();
    const followings = await getFollowings();
    const notFollowings = await getNotFollowings();

    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-4 max-w-screen-lg mx-auto mt-4">
            <div className="col-span-4 row-span-6">
                <PostFeed posts={posts} userId={user.id} />
            </div>
            <div className="row-span-1 col-start-5 flex flex-col gap-4 border-[1px] h-max">
                <Followings state={true} followings={followings} />
            </div>
            <div className="row-span-1 col-start-5 row-start-2 gap-4 border-[1px] h-max">
                <Followings state={false} followings={notFollowings} />
            </div>
        </div>
    );
}
