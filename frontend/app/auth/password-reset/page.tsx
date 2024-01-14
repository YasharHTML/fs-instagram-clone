import Form from "./components/Form";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import axios from "axios";

async function verifyToken(token?: string) {
    if (!token) return redirect("/", RedirectType.replace);
    try {
        const result = await axios.post(
            `${process.env.API_URL}/api/auth/verify_token`,
            { token }
        );
        return result;
    } catch (error) {
        console.error(error);
    }
}

export default async function Page({
    searchParams: { token },
}: {
    searchParams: { token: string };
}) {
    const result = await verifyToken(token);

    return <Form />;
}
