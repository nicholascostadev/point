import { Binocular } from "@/icons/binocular";
import { Logo } from "@/icons/logo";
import Link from "next/link";

export function Header() {
    return (
        <nav className="h-header dark:bg-gray-900/20 backdrop-blur-sm shadow-sm flex justify-center items-center">
            <div className="w-layout-base px-8 max-w-full flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Logo aria-label='Arrow pointing to the left with the string being part of the letter "p" leg' />
                    <div>
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

                <button
                    className="flex items-center justify-center gap-2 text-lg dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors py-2 px-6 rounded-full dark:text-gray-200"
                    aria-label="Explore our solutions"
                >
                    Explore{" "}
                    <Binocular aria-label="Binocular" className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
