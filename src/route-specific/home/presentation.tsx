import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function Presentation() {
    return (
        <section
            aria-label="About us"
            id="about"
            className="flex flex-col justify-center items-center gap-16 py-8 px-2 md:px-8 w-[1250px] max-w-full mx-auto min-h-screen"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 auto-cols-max items-center gap-8">
                <div className="flex flex-col justify-center items-start gap-8 min-w-fit">
                    <h3 className="text-2xl sm:text-3xl">
                        A team of{" "}
                        <strong className="dark:text-green-400 font-normal">
                            passionate
                        </strong>{" "}
                        developers
                    </h3>
                    <p className="text-lg sm:text-2xl max-w-full md:max-w-xl">
                        Aimed to deliver the best solutions for our clients and
                        partners, we create the best products for the end user
                        with the best technologies available.
                    </p>
                    <a
                        href="/products"
                        className="text-base sm:text-lg dark:hover:text-green-400 transition-colors flex items-center justify-center gap-2 group"
                    >
                        Check products
                        <ChevronRight className="w-6 h-6 dark:fill-gray-200 group-hover:translate-x-2  transition-all" />
                    </a>
                </div>
                <div className="relative">
                    <Image
                        src="/developers.jpg"
                        width={650}
                        height={650}
                        className="object-contain rounded-2xl max-w-full shadow-md"
                        alt="Developers working together"
                        quality={100}
                    />
                </div>
            </div>
        </section>
    );
}
