import { Following } from "@/types/Following";
import ProfilePicture from "../profile/components/ProfilePicture";
import Link from "next/link";

export default function Followings({
    followings,
    state
}: {
    followings: Following[];
    state: boolean
}) {
    return (
        <>
            <div className="font-bold text-xl">
                {state ? "Following" : "Recommendation"}
            </div>
            {followings.map((following, index) => (
                <Link href={`/profile/${following.id}`}>
                    <div className="flex items-center gap-2 border-t-[1px] p-2" key={index}>
                        <ProfilePicture
                            profile={{
                                username: following.username,
                                profilePhoto: following.photo,
                            }}
                        />
                        <span className="">{following.username}</span>
                    </div>
                </Link>
            ))}
        </>
    );
}
