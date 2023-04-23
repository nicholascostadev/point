import Image from "next/image";

export function Presentation() {
    return (
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
    );
}
