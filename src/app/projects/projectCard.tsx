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
            className="dark:bg-gray-900/60 border dark:border-gray-200/10 backdrop-blur-sm rounded-lg"
        >
            <div className="flex flex-col items-start gap-2 rounded-lg relative">
                <div className="max-w-full h-48 w-full mb-4 border-b border-b-gray-200/10 relative">
                    <Image
                        src={projectImage}
                        alt={`${title} preview`}
                        fill
                        className="object-cover rounded-t-lg"
                    />
                </div>
                <div className="flex flex-col gap-4 px-4 pb-4">
                    <h1 className="text-4xl dark:text-gray-100">{title}</h1>
                    <p className="text-lg dark:text-gray-300 max-w-sm">
                        {description}
                    </p>
                </div>
            </div>
        </a>
    );
};
