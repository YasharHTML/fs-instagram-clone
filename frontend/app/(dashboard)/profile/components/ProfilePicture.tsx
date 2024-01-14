import Image from "next/image";

export default function ProfilePicture({
    profile,
}: {
    profile: { profilePhoto?: string; username: string };
}) {
    return profile.profilePhoto ? (
        <Image
            src={profile.profilePhoto}
            alt={`${profile.username}'s Profile Photo`}
            className="rounded-full w-24 h-24 object-cover"
            width={64}
            height={64}
        />
    ) : (
        <Image
            src={"/profile.svg"}
            alt={`${profile.username}'s Profile Photo`}
            width={64}
            height={64}
        />
    );
}
