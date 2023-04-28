import { Button } from "@/components/button";
import { Gear } from "@/icons/gear";
import { Plus } from "@/icons/plus";
import { AddProject } from "./addProject";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/tooltip";

export function Settings() {
    return (
        <TooltipProvider>
            <div
                id="settings-section"
                className="relative flex justify-end border border-gray-950/20 dark:border-gray-200/20 w-full rounded-lg p-1"
            >
                <label
                    className="absolute left-2 -top-[14px]"
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
                            <Gear className="w-6 h-6 pointer-events-none" />
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
