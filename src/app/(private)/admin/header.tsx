import { ThemeToggle } from "@/components/header/themeToggle";
import { UserButton } from "@clerk/nextjs/app-beta";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
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
                                    href="/admin/dashboard"
                                    className="dark:hover:text-gray-100 hover:text-gray-600"
                                >
                                    Dashboard - Admin
                                </Link>
                            </li>
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
                <div className="flex items-center justify-start gap-4">
                    <ThemeToggle />
                    <UserButton
                        appearance={{
                            elements: {
                                rootBox: {
                                    width: 32,
                                    height: 32,
                                },
                            },
                        }}
                    />
                </div>
            </nav>
        </header>
    );
}
