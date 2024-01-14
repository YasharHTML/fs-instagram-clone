"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    FaHome,
    FaHeart,
    FaFacebookMessenger,
    FaBell,
    FaSearch,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

export default function Header({ userId }: { userId: string }) {
    const [index, setIndex] = useState(0);
    const path = usePathname();

    useEffect(() => {
        setIndex(
            NavElementList.findIndex(
                (value) =>
                    (value.href === "/profile" &&
                        path.startsWith(value.href)) ||
                    value.href === path
            )
        );
    }, [path]);

    return (
        <header className="bg-blue-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link
                        className="text-white text-2xl font-semibold"
                        href="/"
                    >
                        My App
                    </Link>
                </div>
                <nav className="hidden sm:flex gap-4">
                    <NavElements index={index} />
                </nav>
            </div>

            <nav className="sm:hidden flex justify-around mt-4">
                <NavElements index={index} />
            </nav>
        </header>
    );
}

const NavElementList: { href: string; child: React.ReactNode }[] = [
    { href: "/", child: <FaHome size={24} /> },
    { href: "/favorites", child: <FaHeart size={24} /> },
    { href: "/messages", child: <FaFacebookMessenger size={24} /> },
    { href: "/search", child: <FaSearch size={24} /> },
    { href: "/profile/me", child: <FaUser size={24} /> },
    { href: "/auth/login", child: <FaSignOutAlt size={24} /> },
];

function NavElements({ index }: { index: number }) {
    return (
        <>
            {NavElementList.map((value, idx) => (
                <HeaderLink
                    href={value.href}
                    key={idx}
                >
                    {value.child}
                </HeaderLink>
            ))}
        </>
    );
}

function HeaderLink({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    return (
        <div className="flex flex-col">
            <Link href={href} className="text-white hover:underline">
                {children}
            </Link>
        </div>
    );
}
