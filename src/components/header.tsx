import { Binocular } from "@/icons/binocular";
import { Logo } from "@/icons/logo";
import Link from "next/link";
import { Button } from "./button";
import { HeaderDrawer } from "./headerDrawer";

export function Header() {
    return (
        <nav className="h-header dark:bg-gray-900/20 backdrop-blur-sm shadow-sm flex justify-center items-center">
            <div className="w-layout-base px-4 md:px-8 max-w-full flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Logo aria-label='Arrow pointing to the left with the string being part of the letter "p" leg' />
                    <div className="hidden md:block">
                        <ul className="flex items-center justify-center gap-8 dark:text-gray-300 text-lg">
                            <li>
                                <a
                                    href="#about"
                                    className="dark:hover:text-gray-100"
                                >
                                    About us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/projects"
                                    className="dark:hover:text-gray-100"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/pricing"
                                    className="dark:hover:text-gray-100"
                                >
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <HeaderDrawer />

                <Button
                    as="a"
                    href="/projects"
                    aria-label="Explore our solutions"
                    className="hidden sm:flex"
                >
                    Explore
                    <Binocular aria-label="Binocular" className="w-6 h-6" />
                </Button>
            </div>
        </nav>
    );
}
