import { BackLighting } from "@/components/backLighting";
import { Button } from "@/components/button";
import { ChevronRight, Map } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col items-center min-h-[calc(100vh-var(--header-height))] bg-[url('/background-line.svg')] bg-no-repeat">
            <section
                aria-label="Hero"
                className="flex flex-col justify-center items-center w-full dark:bg-spotlight-radial bg-top pt-header-height"
            >
                <div className="flex flex-col justify-center items-center gap-8 pt-48 pb-8 px-2 md:px-8">
                    <h1 className="text-3xl text-center">
                        Bring Your Vision to Life with Custom Development
                    </h1>
                    <p className="text-2xl max-w-full md:max-w-xl text-center">
                        Partner with our expert developers to bring your unique
                        vision to life. From design to deployment, we&apos;ll
                        guide you every step of the way to make something
                        amazing together.
                    </p>
                    <Button
                        as="a"
                        href="/projects"
                        aria-label="Explore our solutions"
                    >
                        Explore <Map className="w-6 h-6 stroke-default" />
                    </Button>
                </div>
                <h2 className="text-2xl text-center">
                    Browse our{" "}
                    <strong className="underline font-normal dark:text-green-400 text-green-700 hover:text-green-500 dark:hover:text-green-600 transition-colors cursor-default">
                        successful
                    </strong>{" "}
                    client products
                </h2>
                <div className="w-full flex justify-center items-center relative">
                    <BackLighting
                        className="top-2/3 -translate-y-1/2 w-full max-w-layout-base max-h-full h-[550px] blur-[240px]"
                        style={{ margin: "unset" }}
                    />
                    <div className="flex relative h-[950px] w-full max-w-layout-base z-40">
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
                </div>
            </section>
            <section
                aria-label="About us"
                id="about"
                className="flex flex-col justify-center items-center gap-16 py-8 px-2 md:px-8 w-[1250px] max-w-full mx-auto min-h-screen"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 auto-cols-max items-center gap-8">
                    <div className="flex flex-col justify-center items-start gap-8 min-w-fit">
                        <h3 className="text-2xl sm:text-3xl">
                            A team of{" "}
                            <strong className="dark:text-green-400 text-green-700 font-normal">
                                passionate
                            </strong>{" "}
                            developers
                        </h3>
                        <p className="text-lg sm:text-2xl max-w-full md:max-w-xl">
                            Aimed to deliver the best solutions for our clients
                            and partners, we create the best products for the
                            end user with cutting-edge technologies.
                        </p>
                        <a
                            href="/projects"
                            className="text-base sm:text-lg dark:hover:text-green-400 hover:text-green-700 transition-all flex items-center justify-center gap-2 group"
                        >
                            Check our projects
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-all" />
                        </a>
                    </div>
                    <div className="relative">
                        <BackLighting className="w-3/4 h-3/4 blur-[160px]" />
                        <Image
                            src="/developers.jpg"
                            width={650}
                            height={650}
                            className="object-contain rounded-2xl max-w-full shadow-md z-10 relative"
                            alt="Developers working together"
                            quality={100}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
