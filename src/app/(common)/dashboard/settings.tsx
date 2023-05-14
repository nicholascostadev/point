import { Button } from "@/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip";
import {
    projectStatusFormatter,
    projectStatuses,
} from "@/lib/utils/projectRelated";
import { StoreProjectStatus, useFiltersStore } from "@/stores/filters";
import { Settings as SettingsIcon } from "lucide-react";
import { AddProject } from "./addProject";
import { Search } from "./search";

export function Filters() {
    const changeFilterStatus = useFiltersStore(
        (state) => state.actions.changeStatus
    );
    const selectedFilterStatus = useFiltersStore((state) => state.status);

    const dropdownOptions = [
        ...projectStatuses,
        { value: "none", label: "All" },
    ].filter((st) => st.value !== selectedFilterStatus);

    return (
        <TooltipProvider>
            <div
                id="settings-section"
                className="relative flex w-full justify-end gap-12 rounded-lg border border-gray-950/20 p-1 dark:border-gray-900"
            >
                <label
                    className="absolute -top-[14px] left-2  bg-white px-2 dark:bg-gray-950"
                    htmlFor="settings-section"
                >
                    Filters
                </label>
                <Search />
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <Tooltip>
                            <DropdownMenuTrigger
                                className="rounded-md px-2"
                                asChild
                            >
                                <TooltipTrigger>
                                    {projectStatusFormatter(
                                        selectedFilterStatus
                                    )}
                                </TooltipTrigger>
                            </DropdownMenuTrigger>
                            <TooltipContent>
                                <p>Filter by status</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent>
                            <p className="border-b border-b-gray-100 p-2 dark:border-gray-900">
                                Filter by status
                            </p>
                            {dropdownOptions.map((st) => (
                                <DropdownMenuItem
                                    key={st.value}
                                    onSelect={() =>
                                        changeFilterStatus(
                                            st.value as StoreProjectStatus
                                        )
                                    }
                                >
                                    {st.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <AddProject />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a new Project</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                as="button"
                                className="p-2 dark:bg-transparent"
                            >
                                <SettingsIcon className="stroke-default pointer-events-none h-6 w-6" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}
