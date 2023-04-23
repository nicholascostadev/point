import { Button } from "@/components/button";
import { Binocular } from "@/icons/binocular";

export function Hero() {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-8 pt-48 pb-8 px-8">
                <h1 className="text-3xl text-center">
                    Come and explore our solutions
                </h1>
                <p className="text-2xl max-w-full md:max-w-xl text-center">
                    Ideas turned into reality like a charm, give us the idea and
                    we deliver you the goods
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
        </>
    );
}
