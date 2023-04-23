import { Button } from "@/components/button";
import { Binocular } from "@/icons/binocular";
import { Chevron } from "@/icons/chevron";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col items-center min-h-[calc(100vh-var(--header-height))]">
            <section
                aria-label="Hero"
                className="flex flex-col justify-center items-center w-full"
            >
                <div className="flex flex-col justify-center items-center gap-8 pt-48 pb-8 px-8">
                    <h1 className="text-3xl text-center">
                        Come and explore our solutions
                    </h1>
                    <p className="text-2xl max-w-full md:max-w-xl text-center">
                        Ideas turned into reality like a charm, give us the idea
                        and we deliver you the goods
                    </p>
                    <Button
                        as="a"
                        href="/projects"
                        aria-label="Explore our solutions"
                    >
                        Explore{" "}
                        <Binocular aria-label="Binocular" className="w-6 h-6" />
                    </Button>
                </div>
                <h2 className="text-2xl">
                    Browse our{" "}
                    <strong className="underline font-normal text-green-400 dark:hover:text-green-600 transition-colors cursor-default">
                        successful
                    </strong>{" "}
                    client products
                </h2>
                <div className="flex relative h-[950px] w-full max-w-layout-base">
                    <a
                        href="https://clerk.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="/clerk-landing.svg"
                            fill
                            alt="Clerk's website landing page"
                            className="absolute !left-[-280px] !top-1/3 max-w-6xl max-h-[520px]"
                        />
                    </a>
                    <a
                        href="https://linear.app"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="/linear-landing.svg"
                            fill
                            alt="Linear's website landing page"
                            className="absolute inset-x-0 top-0 mx-auto max-w-6xl"
                        />
                    </a>
                </div>
            </section>
            <section
                aria-label="About us"
                id="about"
                className="flex flex-col gap-8 py-8"
            >
                <h2 className="text-4xl">About us</h2>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col justify-center items-start gap-8">
                        <h3 className="text-3xl">
                            A team of{" "}
                            <strong className="dark:text-green-400 font-normal">
                                passionate
                            </strong>{" "}
                            developers
                        </h3>
                        <p className="text-2xl max-w-full md:max-w-xl">
                            Aimed to deliver the best solutions for our clients
                            and partners, we create the best products for the
                            end user with the best technologies available.
                        </p>
                        <a
                            href="/products"
                            className="text-lg dark:hover:text-green-400 transition-colors flex items-center justify-center gap-2 group"
                        >
                            Check products
                            <Chevron className="w-6 h-6 fill-gray-200 group-hover:translate-x-2 dark:group-hover:fill-green-400 transition-all" />
                        </a>
                    </div>
                    <Image
                        src="/developers.jpg"
                        width={650}
                        height={650}
                        className="object-contain rounded-2xl shadow-md"
                        alt="Developers working together"
                        quality={100}
                    />
                </div>
            </section>
        </main>
    );
}
