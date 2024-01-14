import { getProfile, getUser } from "@/utils";
import EditProfile from "../../components/EditProfile";
import { redirect } from "next/navigation";

export default async function Page({
    params: { id },
}: {
    params: { id: string };
}) {
    const session = await getUser();
    const user: { username: string; email: string; photo?: string, dob: Date } = await getProfile(id);

    if (session.id !== id) redirect("/profile/" + id);

    return (
        <div className=" mt-6 p-8 bg-white rounded-md shadow-md w-full">
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">User Information</h3>
                <p className="text-gray-500">{user.email}</p>
                <EditProfile username={user.username} dob={user.dob} />
            </div>
        </div>
    );
}
