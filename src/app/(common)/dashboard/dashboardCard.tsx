import { Status, useFiltersStore } from "@/app/stores/filters";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { cl } from "@/lib/utils/cl";
import { Edit2 } from "lucide-react";

type DashboardCardProps = {
    id: string;
    title: string;
    description: string;
    status: string;
    onDeleteProject: (projectId: string) => void;
};

export function DashboardCard({
    id,
    title,
    description,
    status,
    onDeleteProject,
}: DashboardCardProps) {
    const changeStatus = useFiltersStore((state) => state.actions.changeStatus);

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
                <Dialog>
                    <Popover>
                        <PopoverTrigger className="rounded-full p-1">
                            <Edit2 />
                        </PopoverTrigger>
                        <PopoverContent className="bg-gray-200 dark:bg-gray-950/90">
                            <div className="flex flex-col justify-start items-start gap-1">
                                <strong>Danger Zone</strong>
                                <Dialog>
                                    <DialogTrigger className="text-red-500 px-2 py-1 hover:bg-red-500 hover:text-gray-200 focus-visible:bg-red-500 focus-visible:text-gray-200 rounded-full transition-colors">
                                        Delete Project
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription className="text-red-500 font-bold">
                                            This action is not reversible.
                                        </DialogDescription>
                                        <DialogTrigger
                                            className="text-red-500 px-2 py-1 hover:bg-red-500 hover:text-gray-200 focus-visible:bg-red-500 focus-visible:text-gray-200 rounded-full transition-colors"
                                            onClick={() => onDeleteProject(id)}
                                        >
                                            Confirm
                                        </DialogTrigger>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </PopoverContent>
                    </Popover>
                </Dialog>
            </div>
        </div>
    );
}
