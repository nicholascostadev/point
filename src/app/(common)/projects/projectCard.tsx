import Image from "next/image";

type ProjectCardProps = {
    title: string;
    projectUrl: string;
    description: string;
    projectImage: string;
};

export const ProjectCard = ({
    title,
    projectUrl,
    description,
    projectImage,
}: ProjectCardProps) => {
    return (
        <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-200/10 bg-gray-200/60 backdrop-blur-md dark:border-gray-200/10 dark:bg-gray-900/60"
        >
            <div className="relative flex flex-col items-start gap-2 rounded-lg">
                <div className="relative h-48 w-full max-w-full border-b border-b-gray-200/10 pb-4">
                    <Image
                        src={projectImage}
                        alt={`${title} preview`}
                        fill
                        className="rounded-t-lg object-cover"
                    />
                </div>
                <div className="flex flex-col gap-4 px-4 pb-4">
                    <h1 className="text-4xl dark:text-gray-100">{title}</h1>
                    <p className="max-w-sm text-lg dark:text-gray-300">
                        {description}
                    </p>
                </div>
            </div>
        </a>
    );
};
