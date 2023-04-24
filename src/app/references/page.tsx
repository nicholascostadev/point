const references = [
    {
        name: "Linear",
        url: "https://linear.app",
    },
    {
        name: "Clerk",
        url: "https://clerk.com",
    },
];

const designInspirations = [
    {
        name: "Linear",
        desc: " - Landing Page",
        url: "https://linear.app",
    },
    {
        name: "Vercel",
        desc: " - Landing Page & Pricing Page",
        url: "https://vercel.com",
    },
    {
        name: "Figma",
        desc: " - Landing Page",
        url: "https://figma.com",
    },
];

export default function References() {
    return (
        <main className="w-layout-base max-w-full flex flex-col md:flex-row gap-4 px-4 md:px-8 py-8 mx-auto">
            <section
                aria-labelledby="references"
                className="flex flex-col gap-4"
            >
                <h2 className="text-4xl" id="references">
                    References
                </h2>

                <p>
                    This project makes use of some awesome projects, all of them
                    are listed below, please give them some kudos.
                </p>
                <ol className="list-decimal pl-5">
                    {references.map((reference) => (
                        <li
                            key={reference.url}
                            className="underline-offset-4 w-auto"
                        >
                            <a
                                href={reference.url}
                                className="group dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                            >
                                <span className="underline decoration-dotted group-hover:decoration-dashed">
                                    {reference.name}
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
            </section>
            <section
                aria-labelledby="design-inspirations"
                className="flex flex-col gap-4"
            >
                <h2 className="text-4xl" id="design-inspirations">
                    Design inspirations
                </h2>

                <p>
                    I used some design inspirations from these awesome projects
                    to make this project look good, give them a try if you
                    haven&apos;t.
                </p>
                <ol className="list-decimal pl-5">
                    {designInspirations.map((inspiration) => (
                        <li
                            key={inspiration.url}
                            className="underline-offset-4 w-auto"
                        >
                            <a
                                href={inspiration.url}
                                className="group dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                            >
                                <span className="underline decoration-dotted group-hover:decoration-dashed">
                                    {inspiration.name}
                                </span>
                                {inspiration.desc}
                            </a>
                        </li>
                    ))}
                </ol>
            </section>
        </main>
    );
}
