import { currentUser } from "@clerk/nextjs/app-beta";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Point | Admin",
    robots: {
        index: false,
    },
};

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        return redirect("/dashboard");
    }

    if (!(user.publicMetadata.roles as string[]).includes("admin")) {
        return redirect("/dashboard");
    }

    return (
        <>
            <header className="h-header fixed top-0 left-0 w-full dark:bg-gray-900/60 bg-gray-50/40 backdrop-blur-md shadow-sm flex justify-center items-center z-50">
                <nav className="w-layout-base px-2 md:px-8 max-w-full flex justify-between items-center gap-2">
                    <div className="flex items-center gap-8">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt='letter P with "point" written below it'
                                width={80}
                                height={80}
                            />
                        </Link>
                        <div className="hidden md:block">
                            <ul className="flex items-center justify-center gap-8 dark:text-gray-300 text-lg">
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="dark:hover:text-gray-100 hover:text-gray-600"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {children}
        </>
    );
}
