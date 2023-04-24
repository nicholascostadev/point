import { sections } from "./referencesData";

export default function References() {
    return (
        <main className="w-layout-base max-w-full flex flex-col md:flex-row gap-4 px-2 md:px-8 py-8 mx-auto">
            {sections.map((section) => (
                <section
                    key={section.id}
                    aria-labelledby={section.id}
                    className="flex flex-col gap-4"
                >
                    <h2 className="text-4xl" id="references">
                        {section.name}
                    </h2>

                    <p>{section.description}</p>
                    <ol className="list-decimal pl-5">
                        {section.data.map((sectionData) => (
                            <li
                                key={sectionData.url}
                                className="underline-offset-4 w-auto"
                            >
                                <a
                                    href={sectionData.url}
                                    className="group dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                                >
                                    <span className="underline decoration-dotted group-hover:decoration-dashed">
                                        {sectionData.name}
                                    </span>
                                    {sectionData.desc}
                                </a>
                            </li>
                        ))}
                    </ol>
                </section>
            ))}
        </main>
    );
}
