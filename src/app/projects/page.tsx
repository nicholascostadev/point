import { ProjectCard } from "./projectCard";
import { projects } from "./projectsData";

export default function Projects() {
    return (
        <main className="flex flex-col items-start py-16 min-h-screen bg-[url('/background-line.svg')] pt-[calc(var(--header-height)+8rem)]">
            <div className="flex flex-col gap-8 w-layout-base mx-auto px-2 md:px-8 relative">
                <div className="absolute inset-0 m-auto bg-conic-gradient blur-[360px] w-1/2 h-1/2"></div>
                <div className="flex flex-col justify-center items-start gap-2">
                    <h1 className="text-4xl">Projects</h1>
                    <p className="text-lg dark:text-gray-300">
                        These are a list of dreams we helped come true
                    </p>
                </div>

                <div className="flex flex-wrap gap-8">
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
