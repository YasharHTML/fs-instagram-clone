import { getFavorites, getUser } from "@/utils";
import PostFeed from "../components/PostFeed";

export default async function Page() {
    const user = await getUser();
    const favs = await getFavorites();

    return (
        <div className="max-w-screen-lg mt-4 mx-auto">
            <PostFeed posts={favs} userId={user.id} />
        </div>
    );
}
