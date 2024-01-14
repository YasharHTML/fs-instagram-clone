import { search } from "@/utils";
import SearchBar from "./components/SearchBar";
import UserBar from "./components/UserBar";

export default async function Page({
    searchParams: { query },
}: {
    searchParams: { query: string };
}) {
    if (query) {
        const data = await search(query);
        const users = data.users;

        return (
            <div className="flex flex-col items-center mt-4">
                <SearchBar />
                <UserBar users={users} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-4">
            <SearchBar />
        </div>
    );
}
