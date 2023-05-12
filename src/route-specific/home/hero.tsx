import { Button } from "@/components/button";
import { Map } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section
            aria-label="Hero"
            className="flex w-full flex-col items-center justify-center"
        >
            <div className="flex flex-col items-center justify-center gap-8 px-2 pb-8 pt-12 md:px-8 md:pt-48">
                <h1 className="text-center text-3xl">
                    Bring Your Vision to Life with Custom Development
                </h1>
                <p className="max-w-full text-center text-2xl md:max-w-xl">
                    Partner with our expert developers to bring your unique
                    vision to life. From design to deployment, we&apos;ll guide
                    you every step of the way to make something amazing
                    together.
                </p>
                <Button
                    as="a"
                    href="/projects"
                    aria-label="Explore our solutions"
                >
                    Explore <Map className="h-6 w-6" />
                </Button>
            </div>
            <h2 className="text-2xl">
                Browse our{" "}
                <strong className="cursor-default font-normal text-green-400 underline transition-colors dark:hover:text-green-600">
                    successful
                </strong>{" "}
                client products
            </h2>
            <div className="relative flex h-[950px] w-full max-w-layout-base">
                <a
                    href="https://clerk.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <Image
                        src="/clerk-landing.svg"
                        fill
                        alt="Clerk's website landing page"
                        className="absolute !left-[-280px] !top-1/3 max-h-[520px] max-w-6xl"
                        priority
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
                        priority
                    />
                </a>
            </div>
        </section>
    );
}
