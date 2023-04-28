"use client";

import { Button } from "@/components/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Plus } from "@/icons/plus";
import { AddProjectForm } from "./addProjectForm";
import { useState } from "react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";

export function AddProject() {
    const [open, setOpen] = useState(false);
    const hasMoreProjectsRemaining = true;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!hasMoreProjectsRemaining && (
                <Popover>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button
                                    as="button"
                                    className="p-2 dark:bg-transparent"
                                >
                                    <Plus className="w-6 h-6 pointer-events-none" />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a new Project</p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="border-red-500 focus:ring-0 bg-gray-200/60 dark:bg-gray-950/80 text-red-500">
                        You&apos;ve reached the maximum amount of projects your
                        plan covers.
                        <PopoverArrow className="fill-red-500" />
                    </PopoverContent>
                </Popover>
            )}
            {hasMoreProjectsRemaining && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button
                                as="button"
                                className="p-2 dark:bg-transparent"
                            >
                                <Plus className="w-6 h-6 pointer-events-none" />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add a new Project</p>
                    </TooltipContent>
                </Tooltip>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Request a project
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form below to request a project to be
                        developed by our team.
                    </DialogDescription>
                </DialogHeader>

                <AddProjectForm closeModal={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}