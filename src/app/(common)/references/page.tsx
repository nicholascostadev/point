import { BackLighting } from "@/components/backLighting";
import { sections } from "./referencesData";

export default function References() {
    return (
        <div className="pt-32">
            <BackLighting className="h-1/3 w-1/3" />
            <div className="mx-auto w-layout-base max-w-full px-2 md:px-8">
                <div className="flex flex-col rounded-md bg-cyan-200 p-2">
                    <p className="text-gray-950">
                        <span className="mr-2 rounded-full bg-cyan-950 px-4 py-1 text-white">
                            info
                        </span>
                        This project is meant to be just a learning experience.
                        Learning how to integrate a full stack app with{" "}
                        <a
                            href="https://stripe.com"
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-dashed underline-offset-4 hover:text-purple-600 hover:decoration-purple-600 hover:decoration-dotted"
                        >
                            Stripe
                        </a>{" "}
                        payment with subscription. None of the projects listed
                        as done are my own, they are just for presentation
                        purpose for a company that sells developers time for
                        maintaining or developing a project.
                    </p>
                    <p className="pt-2 text-gray-950">
                        That&apos;s why I have this section, to show respect to
                        all the amazing companies and the developers that made
                        the effort to make this incredible softwares.
                    </p>
                    <p className="pt-2 text-gray-950">
                        The entire project is available as open source on{" "}
                        <a
                            href="https://github.com/nicholascostadev/point"
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-dashed underline-offset-4 hover:text-purple-600 hover:decoration-purple-600 hover:decoration-dotted"
                        >
                            Github
                        </a>{" "}
                        so feel free to take a look by yourself.
                    </p>
                </div>
            </div>
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
        </div>
    );
}
