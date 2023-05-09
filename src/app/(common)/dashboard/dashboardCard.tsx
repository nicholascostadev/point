import { Status, useFiltersStore } from "@/stores/filters";
import { cl } from "@/lib/utils/cl";
import { EditProject } from "./edit/editProject";

type DashboardCardProps = {
    id: string;
    title: string;
    description: string;
    status: string;
};

function generateStatusColor(status: Status) {
    switch (status) {
        case "requested":
            return "bg-cyan-500";
        case "approved":
            return "bg-green-500";
        case "pending":
            return "bg-yellow-500";
        case "delivered":
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

    const statusColor = generateStatusColor(status as Status);

    return (
        <div className="relative flex flex-col gap-2 dark:bg-gray-900/60 bg-gray-200/60 border border-cyan-200/10 dark:border-gray-200/10 backdrop-blur-md min-h-[20rem] p-4 rounded-lg">
            <h1 className="text-2xl">{title}</h1>
            <p className="text-lg">{description}</p>
            <div className="absolute flex justify-center items-center gap-2 top-4 right-4">
                <button
                    onClick={() => changeStatus(status as Status)}
                    className={cl(
                        "text-sm text-gray-950 rounded-full px-2 py-1",
                        statusColor
                    )}
                >
                    {status}
                </button>
                <EditProject
                    projectData={{
                        id,
                        title,
                        description,
                    }}
                />
            </div>
        </div>
    );
}
