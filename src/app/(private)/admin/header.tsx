import { ThemeToggle } from "@/components/header/themeToggle";
import { UserButton } from "@clerk/nextjs/app-beta";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="fixed left-0 top-0 z-50 flex h-header w-full items-center justify-center bg-gray-50/40 shadow-sm backdrop-blur-md dark:bg-gray-900/60">
            <nav className="flex w-layout-base max-w-full items-center justify-between gap-2 px-2 md:px-8">
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
                        <ul className="flex items-center justify-center gap-8 text-lg dark:text-gray-300">
                            <li>
                                <Link
                                    href="/admin/dashboard"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
                                >
                                    Dashboard - Admin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
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
