import { getUserFollows } from "@/utils";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const result = await getUserFollows(id);
    const followingsCount = result.following.length;
    const followersCount = result.followers.length;
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <p className="text-lg">Followers:</p>
                        <span className="font-bold text-blue-500 ml-2">
                            {followersCount}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <p className="text-lg">Followings:</p>
                        <span className="font-bold text-blue-500 ml-2">
                            {followingsCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
