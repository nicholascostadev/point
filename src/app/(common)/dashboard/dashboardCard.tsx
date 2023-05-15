import { cl } from "@/lib/utils/cl";
import {
    ProjectStatus,
    generateStatusColor,
    projectStatusFormatter,
} from "@/lib/utils/projectRelated";
import { useFiltersStore } from "@/stores/filters";
import Image from "next/image";
import Link from "next/link";
import { EditProject } from "./edit/editProject";

type DashboardCardProps = {
    id: string;
    title: string;
    description: string;
    image: string | null;
    status: ProjectStatus;
};

export function DashboardCard({
    id,
    title,
    description,
    status,
    image,
}: DashboardCardProps) {
    const changeStatus = useFiltersStore((state) => state.actions.changeStatus);

    const statusColor = generateStatusColor(status as ProjectStatus);

    return (
        <div className="relative flex min-h-[20rem] flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg backdrop-blur-md dark:border-gray-200/10 dark:bg-gray-900/60">
            <div className="flex items-start justify-between gap-2">
                <Link href={`/dashboard/projects/${id}`}>
                    <h1 className="text-2xl">{title}</h1>
                </Link>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <button
                        onClick={() => changeStatus(status as ProjectStatus)}
                        className={cl(
                            "rounded-full px-2 py-1 text-sm text-gray-950 transition-colors",
                            statusColor
                        )}
                    >
                        {projectStatusFormatter(status)}
                    </button>
                    <EditProject
                        projectData={{
                            id,
                            title,
                            description,
                            status,
                            image,
                        }}
                    />
                </div>
            </div>
            {image && (
                <div className="relative h-full w-full">
                    <Image
                        src={image}
                        alt="Project image"
                        className="rounded-md object-cover"
                        width={500}
                        height={500}
                    />
                </div>
            )}
            <p className="text-lg text-gray-800 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
}
