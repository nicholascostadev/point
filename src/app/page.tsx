import { Hero } from "@/route-specific/home/hero";
import { Presentation } from "@/route-specific/home/presentation";

export default function Home() {
    return (
        <main className="flex flex-col items-center min-h-[calc(100vh-var(--header-height))]">
            <Hero />
            <Presentation />
        </main>
    );
}
