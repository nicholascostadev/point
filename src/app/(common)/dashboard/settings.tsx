import { Button } from "@/components/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip";
import { Settings as SettingsIcon } from "lucide-react";
import { AddProject } from "./addProject";

export function Settings() {
    return (
        <TooltipProvider>
            <div
                id="settings-section"
                className="relative flex w-full justify-end rounded-lg border border-gray-950/20 p-1 dark:border-gray-200/20"
            >
                <label
                    className="absolute -top-[14px] left-2  bg-white px-2 dark:bg-gray-950"
                    htmlFor="settings-section"
                >
                    Filters
                </label>
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
                        <Button as="button" className="p-2 dark:bg-transparent">
                            <SettingsIcon className="stroke-default pointer-events-none h-6 w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Settings</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    );
}
