import { getProfile, getUser, isFollowing } from "@/utils";
import EditProfile from "../components/EditProfile";
import ProfilePicture from "../components/ProfilePicture";
import React from "react";
import FollowButton from "../components/FollowButton";
import NavigationTabs from "../components/Tabs";

export default async function Page({
    params: { id },
    children,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const session = await getUser();
    const user: { username: string; email: string; photo?: string } =
        await getProfile(id);

    const followStatus = session.id !== id && (await isFollowing(id));

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">

            <div className="w-full h-[256px] shadow-lg rounded-md text-white mt-4 mx-2 p-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <ProfilePicture
                        profile={{
                            profilePhoto: user.photo,
                            username: user.username,
                        }}
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-black">
                            {user.username}
                        </h2>
                        <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                </div>
                {session.id !== id && (
                    <div>
                        <FollowButton status={followStatus} />
                    </div>
                )}
            </div>

            <NavigationTabs isSelf={session.id === id} />

            {children}
        </div>
    );
}
