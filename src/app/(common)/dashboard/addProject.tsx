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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { useUserSubscriptionStatus } from "@/hooks/useUserPlan";
import { useAddProjectModal, useProjectsStore } from "@/stores/projectStore";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Loader2, Plus } from "lucide-react";
import { useMemo } from "react";
import { AddProjectForm } from "./addProjectForm";

export function AddProject() {
    const { open, setOpen } = useAddProjectModal();
    const userSubscriptionStatus = useUserSubscriptionStatus();
    const remainingProjects = useProjectsStore(
        (state) => state.remainingProjects
    );
    const isLoadingProjects = useProjectsStore((state) => state.isLoading);
    const isFetchingProjects = useProjectsStore((state) => state.isFetching);
    const hasMoreProjectsRemaining = remainingProjects > 0;

    const errorText = useMemo(() => {
        switch (userSubscriptionStatus) {
            case "active":
                return "You've reached the maximum amount of projects your plan covers, upgrade your plan or wait for more usages next month.";
            case "canceled":
                return "Your plan has been canceled, you can't add more projects.";
            case "incomplete":
                return "Your plan is incomplete, you can't add more projects.";
            case "incomplete_expired":
                return "Your plan has expired, you can't add more projects.";
            case "past_due":
                return "Your plan is past due, you can't add more projects.";
            default:
                return "Your plan has expired, you can't add more projects.";
        }
    }, [userSubscriptionStatus]);

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
                                    aria-label={
                                        isLoadingProjects || isFetchingProjects
                                            ? "Loading..."
                                            : "Add new project"
                                    }
                                >
                                    {isLoadingProjects || isFetchingProjects ? (
                                        <Loader2 className="stroke-default pointer-events-none h-6 w-6 animate-spin" />
                                    ) : (
                                        <Plus className="stroke-default pointer-events-none h-6 w-6" />
                                    )}
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a new Project</p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="w-min max-w-full border-red-500 bg-gray-200/60 text-red-500 focus:ring-0 dark:bg-gray-950/80">
                        {errorText}
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
                                disabled={isLoadingProjects}
                                aria-label="Add new project"
                            >
                                <Plus className="pointer-events-none h-6 w-6" />
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
