import { Binocular } from "@/icons/binocular";
import { Logo } from "@/icons/logo";
import Link from "next/link";
import { Button } from "../button";
import { HeaderDrawer } from "./headerDrawer";
import { ThemeToggle } from "./themeToggle";
import { HeaderCTA } from "./headerCTA";
import Image from "next/image";

export function Header() {
    return (
        <header className="h-header fixed top-0 left-0 w-full dark:bg-gray-900/60 bg-gray-50/40 backdrop-blur-md shadow-sm flex justify-center items-center z-50">
            <nav className="w-layout-base px-2 md:px-8 max-w-full flex justify-between items-center gap-2">
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt='Arrow pointing to the left with the string being part of the letter "p" leg'
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="hidden md:block">
                        <ul className="flex items-center justify-center gap-8 dark:text-gray-300 text-lg">
                            <li>
                                <a
                                    href="/#about"
                                    className="dark:hover:text-gray-100 hover:text-gray-600"
                                >
                                    About us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/projects"
                                    className="dark:hover:text-gray-100 hover:text-gray-600"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="dark:hover:text-gray-100 hover:text-gray-600"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/references"
                                    className="dark:hover:text-gray-100 hover:text-gray-600"
                                >
                                    References
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4">
                    <ThemeToggle />
                    <HeaderDrawer />
                    <HeaderCTA />
                </div>
            </nav>
        </header>
    );
}
