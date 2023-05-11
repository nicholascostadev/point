import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function Presentation() {
    return (
        <section
            aria-label="About us"
            id="about"
            className="mx-auto flex min-h-screen w-[1250px] max-w-full flex-col items-center justify-center gap-16 px-2 py-8 md:px-8"
        >
            <div className="grid auto-cols-max grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div className="flex min-w-fit flex-col items-start justify-center gap-8">
                    <h3 className="text-2xl sm:text-3xl">
                        A team of{" "}
                        <strong className="font-normal dark:text-green-400">
                            passionate
                        </strong>{" "}
                        developers
                    </h3>
                    <p className="max-w-full text-lg sm:text-2xl md:max-w-xl">
                        Aimed to deliver the best solutions for our clients and
                        partners, we create the best products for the end user
                        with the best technologies available.
                    </p>
                    <a
                        href="/products"
                        className="group flex items-center justify-center gap-2 text-base transition-colors dark:hover:text-green-400 sm:text-lg"
                    >
                        Check products
                        <ChevronRight className="h-6 w-6 transition-all group-hover:translate-x-2  dark:fill-gray-200" />
                    </a>
                </div>
                <div className="relative">
                    <Image
                        src="/developers.jpg"
                        width={650}
                        height={650}
                        className="max-w-full rounded-2xl object-contain shadow-md"
                        alt="Developers working together"
                        quality={100}
                    />
                </div>
            </div>
        </section>
    );
}
