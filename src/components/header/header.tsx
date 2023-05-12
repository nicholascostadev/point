import { SignedIn, UserButton } from "@clerk/nextjs/app-beta";
import Image from "next/image";
import Link from "next/link";
import { HeaderCTA } from "./header-cta";
import { HeaderDrawer } from "./header-drawer";
import { ThemeToggle } from "./themeToggle";

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
                                    href="/#about"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
                                >
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/references"
                                    className="hover:text-gray-600 dark:hover:text-gray-100"
                                >
                                    References
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-4">
                    <ThemeToggle />
                    <SignedIn>
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
                    </SignedIn>
                    <HeaderDrawer />
                    <div className="hidden sm:flex">
                        <HeaderCTA />
                    </div>
                </div>
            </nav>
        </header>
    );
}
