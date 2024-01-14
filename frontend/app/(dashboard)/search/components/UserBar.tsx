import ProfilePicture from "../../profile/components/ProfilePicture";
import Link from "next/link";

export default function UserBar({
    users,
}: {
    users: {
        id: string;
        email: string;
        photo?: string;
        username: string;
        _count: {
            followers: number;
            following: number;
        };
    }[];
}) {
    return (
        <div className="bg-gray-100 p-4 w-full max-w-screen-lg mt-4">
            <h2 className="text-xl font-semibold mb-2">Users: </h2>
            <ul>
                {users.map((user) => (
                    <Link href={`/profile/${user.id}`}>
                        <li
                            key={user.id}
                            className="flex items-center gap-4 my-8"
                        >
                            <ProfilePicture
                                profile={{
                                    profilePhoto: user.photo,
                                    username: user.username,
                                }}
                            />
                            <div>
                                <span className="text-blue-500 font-semibold">
                                    {user.username}
                                </span>
                                <p className="text-gray-500">
                                    Followers: {user._count.followers}
                                </p>
                                <p className="text-gray-500">
                                    Following: {user._count.following}
                                </p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
