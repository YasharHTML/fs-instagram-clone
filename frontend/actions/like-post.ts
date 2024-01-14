"use server";

import { getCookie } from "@/utils";
import axios from "axios";

export async function toggleLikeStatus(postId: string) {
    const cookie = getCookie();
    return (
        await axios.put(
            `${process.env.API_URL}/api/likes/post/${postId}/toggle`,
            {},
            {
                headers: {
                    Cookie: `connect.sid=${cookie}`,
                },
            }
        )
    ).data;
}
