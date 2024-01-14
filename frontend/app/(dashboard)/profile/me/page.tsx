export const dynamic = "force-dynamic";

import { getUser } from "@/utils";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getUser();

    redirect("/profile/" + user.id);
}
