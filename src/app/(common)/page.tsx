import { BackLighting } from "@/components/backLighting";
import { Button } from "@/components/button";
import { ChevronRight, Map } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-[url('/background-line.svg')] bg-no-repeat">
            <section
                aria-label="Hero"
                className="flex w-full flex-col items-center justify-center bg-top pt-header-height dark:bg-spotlight-radial"
            >
                <div className="flex flex-col items-center justify-center gap-8 px-2 pb-8 pt-20 md:px-8 md:pt-36">
                    <h1 className="text-center text-3xl">
                        Bring Your Vision to Life with Custom Development
                    </h1>
                    <p className="max-w-full text-center text-2xl md:max-w-xl">
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
                        Explore <Map className="stroke-default h-6 w-6" />
                    </Button>
                </div>
                <h2 className="text-center text-2xl">
                    Browse our{" "}
                    <strong className="cursor-default font-normal text-green-700 underline transition-colors hover:text-green-500 dark:text-green-400 dark:hover:text-green-600">
                        successful
                    </strong>{" "}
                    client products
                </h2>
                <div className="flex w-full items-center justify-center pt-24">
                    <BackLighting
                        className="top-2/3 h-[550px] max-h-full w-full max-w-layout-base -translate-y-1/2 blur-[240px]"
                        style={{ margin: "unset" }}
                    />
                    <div className="z-40 flex w-full max-w-[1440px] px-2 md:px-8">
                        <Image
                            src="/hero-image.png"
                            width={1920}
                            height={1080}
                            alt="Linear's website landing page"
                            className="object-contain"
                            quality={100}
                            priority
                        />
                    </div>
                </div>
            </section>
            <section
                aria-label="About us"
                id="about"
                className="mx-auto flex min-h-screen w-[1250px] max-w-full flex-col items-center justify-center gap-16 px-2 py-8 md:px-8"
            >
                <div className="grid auto-cols-max grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    <div className="flex min-w-fit flex-col items-start justify-center gap-8">
                        <h3 className="text-2xl sm:text-3xl">
                            A team of{" "}
                            <strong className="font-normal text-green-700 dark:text-green-400">
                                passionate
                            </strong>{" "}
                            developers
                        </h3>
                        <p className="max-w-full text-lg sm:text-2xl md:max-w-xl">
                            Aimed to deliver the best solutions for our clients
                            and partners, we create the best products for the
                            end user with cutting-edge technologies.
                        </p>
                        <Link
                            href="/projects"
                            className="group flex items-center justify-center gap-2 text-base transition-all hover:text-green-700 dark:hover:text-green-400 sm:text-lg"
                        >
                            Check our projects
                            <ChevronRight className="h-6 w-6 transition-all group-hover:translate-x-2" />
                        </Link>
                    </div>
                    <div className="relative">
                        <BackLighting className="h-3/4 w-3/4 blur-[160px]" />
                        <Image
                            src="/developers.jpg"
                            width={650}
                            height={650}
                            className="relative z-10 max-w-full rounded-2xl object-contain shadow-md"
                            alt="Developers working together"
                            quality={100}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
