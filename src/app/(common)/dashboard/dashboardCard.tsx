import { Status, useFiltersStore } from "@/app/stores/filters";
import { cl } from "@/utils/cl";
import { useEffect } from "react";

type DashboardCardProps = {
    title: string;
    description: string;
    status: string;
};

export function DashboardCard({
    title,
    description,
    status,
}: DashboardCardProps) {
    const changeStatus = useFiltersStore((state) => state.changeStatus);
    const storeStatus = useFiltersStore((state) => state.status);

    useEffect(() => {
        console.log({ storeStatus });
    }, [storeStatus]);

    function generateStatusColor() {
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
    const statusColor = generateStatusColor();

    return (
        <div className="relative flex flex-col gap-2 dark:bg-gray-900/60 bg-gray-200/60 border border-cyan-200/10 dark:border-gray-200/10 backdrop-blur-md min-h-[20rem] p-2 rounded-lg">
            <h1 className="text-2xl">{title}</h1>
            <p className="text-lg">{description}</p>
            <button
                onClick={() => changeStatus(status as Status)}
                className={cl(
                    "text-sm absolute top-2 right-2 text-gray-950 rounded-full px-2 py-1",
                    statusColor
                )}
            >
                {status}
            </button>
        </div>
    );
}
