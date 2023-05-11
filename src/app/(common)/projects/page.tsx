import { BackLighting } from "@/components/backLighting";
import { ProjectCard } from "./projectCard";
import { projects } from "./projectsData";

export default function Projects() {
    return (
        <main className="flex min-h-screen flex-col items-start bg-[url('/background-line.svg')] py-16 pt-header-height">
            <div className="relative mx-auto flex w-layout-base max-w-full flex-col gap-8 px-2 pt-28 md:px-8">
                <BackLighting />
                <div className="flex flex-col items-start justify-center gap-2">
                    <h1 className="text-4xl">Projects</h1>
                    <p className="text-lg dark:text-gray-300">
                        These are a list of dreams we helped come true
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            projectUrl={project.projectUrl}
                            description={project.description}
                            projectImage={`/project-images/${project.projectImage}`}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
