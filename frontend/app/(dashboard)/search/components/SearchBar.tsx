"use client";
import { navigate } from "@/actions/navigate";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    async function handleChange() {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;
        navigate("/search?query=" + trimmedQuery);
    }

    return (
        <div className="flex items-center">
            <input
                value={query}
                onChange={({ target: { value } }) => setQuery(value)}
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            />
            <button
                onClick={handleChange}
                className="bg-blue-500 text-white px-4 py-[9px] rounded-r-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
                Search
            </button>
        </div>
    );
}
