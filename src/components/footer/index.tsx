import { Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="flex h-footer items-center justify-center bg-gray-100 shadow-sm dark:bg-gray-900">
            <div className="mx-auto flex w-layout-base max-w-full items-center justify-between px-2 md:px-8">
                <a
                    href="https://github.com/nicholascostadev/point"
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                    <Github className="group-hover:text-gray-900 dark:group-hover:text-gray-200" />
                    <span className="sr-only">Go to github project page</span>
                </a>
                <p>
                    Made with ❤️ by{" "}
                    <a
                        href="https://nicholascosta.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        Nicholas Costa
                    </a>
                </p>
            </div>
        </footer>
    );
}
