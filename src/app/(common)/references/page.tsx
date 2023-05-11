import { BackLighting } from "@/components/backLighting";
import { sections } from "./referencesData";

export default function References() {
    return (
        <main className="pt-header-height-alert">
            <BackLighting className="h-1/3 w-1/3" />
            <div className="relative z-10 mx-auto flex w-layout-base max-w-full flex-col gap-4 px-2 py-8 md:flex-row md:px-8">
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
                                    className="w-auto underline-offset-4"
                                >
                                    <a
                                        href={sectionData.url}
                                        className="group transition-colors hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
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
            </div>
        </main>
    );
}
