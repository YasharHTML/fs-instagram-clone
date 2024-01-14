"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavigationTabs = ({isSelf}: {isSelf: boolean}) => {
    const path = usePathname();
    const basePath = "/profile/" + useParams().id
    
    return (
        <nav className="mt-4 p-4">
            <div className="flex gap-8 bg-blue-500">
                {isSelf && path !== `${basePath}/edit` && <TabLink href={`${basePath}/edit`} label="Edit" />}
                {path !== `${basePath}/follows` && <TabLink href={`${basePath}/follows`} label="Follows" />}
                {path !== `${basePath}/posts` && <TabLink href={`${basePath}/posts`} label="Posts" />}
            </div>
        </nav>
    );
};

const TabLink = ({ href, label }: { href: string; label: string }) => {
    return (
        <Link
            href={href}
            className="text-white hover:text-gray-300 px-3 py-2 rounded-md underline"
        >
            {label}
        </Link>
    );
};

export default NavigationTabs;
