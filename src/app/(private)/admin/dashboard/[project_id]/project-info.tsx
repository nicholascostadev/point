import { cl } from "@/lib/utils/cl";
import {
    ProjectStatus,
    getExplanationByStatus,
    projectStatusFormatter,
} from "@/lib/utils/projectRelated";
import Image from "next/image";

type ProjectInfoProps = {
    title: string;
    description: string;
    image: string | null;
    status: string;
};

function generateStatusColor(status: ProjectStatus) {
    const sharedClasses = "text-white";
    switch (status) {
        case "requested":
            return cl("bg-cyan-500 hover:bg-cyan-400", sharedClasses);
        case "completed":
            return cl("bg-green-500 hover:bg-green-400", sharedClasses);
        case "declined":
            return cl("bg-yellow-500 hover:bg-yellow-400", sharedClasses);
        case "inProgress":
            return cl("bg-blue-500 hover:bg-blue-400", sharedClasses);
        default:
            return cl("bg-red-500 hover:bg-red-400", sharedClasses);
    }
}

export function ProjectInfo({
    title,
    description,
    image,
    status,
}: ProjectInfoProps) {
    const statusColor = generateStatusColor(status as ProjectStatus);
    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                    <h1 className="text-4xl">{title}</h1>
                    <span className="text-lg">-</span>
                    <p
                        className={cl(
                            "cursor-default rounded-full px-2 py-1 text-lg",
                            statusColor
                        )}
                    >
                        {projectStatusFormatter(status as ProjectStatus)}
                    </p>
                </div>
                <label className="text-lg font-medium leading-none">
                    Current status
                    <p className="dark:text-gray-300text-lg text-base font-normal text-gray-800 dark:text-gray-300">
                        {getExplanationByStatus(status as ProjectStatus)}
                    </p>
                </label>
            </div>

            {image && (
                <div className="relative h-full w-full">
                    <Image
                        src={image}
                        alt="Project image"
                        className="h-full w-full object-cover"
                        width={1000}
                        height={1000}
                    />
                </div>
            )}

            <label className="text-lg font-medium leading-none">
                Description
                <p className="text-base font-normal text-gray-800 dark:text-gray-300">
                    {description}
                </p>
            </label>
        </>
    );
}
