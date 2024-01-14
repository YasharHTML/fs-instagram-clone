import { getUser } from "@/utils";
import Header from "../components/Header";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        const user = await getUser();

        return (
            <>
                <Header userId={user.id} />
                {children}
            </>
        );
    } catch (error) {
        redirect("/auth/login");
    }
}
