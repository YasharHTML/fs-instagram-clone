import axios, { Axios } from "axios";
import { cookies } from "next/headers";

export function getCookie() {
    const cookieStore = cookies();
    return cookieStore.get("connect.sid")?.value;
}

export function getUser() {
    const cookie = getCookie();

    return axios
        .get(`${process.env.API_URL}/api/auth/me`, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function logOut() {
    const cookie = getCookie();

    return axios.delete(`${process.env.API_URL}/api/auth/logout`, {
        headers: {
            Cookie: `connect.sid=${cookie}`,
        },
    });
}

export function getProfile(id: string) {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/user/` + id, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function isFollowing(id: string) {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/user/follow/` + id, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data as boolean);
}

export function getUserFollows(id: string) {
    return axios
        .get(`${process.env.API_URL}/api/user/follows/all/` + id)
        .then((res) => res.data);
}

export function search(query: string) {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/search?query=` + query, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function getPostsByUserId(id: string) {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/posts/user/` + id, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function getPostsOfFollowedUsers() {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/posts/user_based`, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function getFollowings() {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/follows/following`, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function getNotFollowings() {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/follows/not-following`, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}

export function getFavorites() {
    const cookie = getCookie();
    return axios
        .get(`${process.env.API_URL}/api/posts/liked`, {
            headers: {
                Cookie: `connect.sid=${cookie}`,
            },
        })
        .then((res) => res.data);
}