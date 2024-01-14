import { logOut } from "@/utils";
import { redirect } from "next/navigation";

export default async function Page() {
    await logOut();
    redirect("/auth/login");
}
