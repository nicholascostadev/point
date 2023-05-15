"use client";

import { Dialog } from "@/components/dialog";
import { EditPopover } from "@/components/edit/editPopover";
import { Popover, PopoverTrigger } from "@/components/popover";
import { ProjectStatus } from "@/lib/utils/projectRelated";
import { useEditingStoreActions } from "@/stores/editingStore";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

type EditProjectProps = {
    projectData: {
        id: string;
        title: string;
        description: string;
        status: ProjectStatus;
        image: string | null;
    };
};

export function EditProject({ projectData }: EditProjectProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { selectProject, resetEditingProjectData } = useEditingStoreActions();

    function handleEditProject() {
        selectProject(projectData);
    }

    function onOpenChange(open: boolean) {
        setIsPopoverOpen(open);
    }

    return (
        <Dialog>
            <Popover open={isPopoverOpen} onOpenChange={onOpenChange}>
                <PopoverTrigger
                    className="rounded-full p-1"
                    onClick={handleEditProject}
                >
                    <MoreVertical />
                </PopoverTrigger>
                <EditPopover
                    resetEditingProjectData={resetEditingProjectData}
                    closeModal={() => onOpenChange(false)}
                />
            </Popover>
        </Dialog>
    );
}
