import { cl } from "@/lib/utils/cl";
import {
    ProjectStatus,
    projectStatusFormatter,
} from "@/lib/utils/projectRelated";
import { Status, useFiltersStore } from "@/stores/filters";
import { EditProject } from "./edit/editProject";

type DashboardCardProps = {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
};

function generateStatusColor(status: ProjectStatus) {
    switch (status) {
        case "requested":
            return "bg-cyan-500";
        case "completed":
            return "bg-green-500";
        case "declined":
            return "bg-yellow-500";
        case "inProgress":
            return "bg-blue-500";
        default:
            return "bg-red-500";
    }
}

export function DashboardCard({
    id,
    title,
    description,
    status,
}: DashboardCardProps) {
    const changeStatus = useFiltersStore((state) => state.actions.changeStatus);

    const statusColor = generateStatusColor(status as ProjectStatus);

    return (
        <div className="relative flex min-h-[20rem] flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg backdrop-blur-md dark:border-gray-200/10 dark:bg-gray-900/60">
            <div className="flex items-start justify-between gap-2">
                <h1 className="text-2xl">{title}</h1>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                    <button
                        onClick={() => changeStatus(status as Status)}
                        className={cl(
                            "rounded-full px-2 py-1 text-sm text-gray-950",
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
                        }}
                    />
                </div>
            </div>
            <p className="text-lg">{description}</p>
        </div>
    );
}
