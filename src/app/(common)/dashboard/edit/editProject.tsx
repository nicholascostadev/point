"use client";

import { Dialog } from "@/components/dialog";
import { Popover, PopoverTrigger } from "@/components/popover";
import { MoreVertical } from "lucide-react";
import { EditPopover } from "./editPopover";
import { useEditingStoreActions } from "@/stores/editingStore";
import { useState } from "react";

type EditProjectProps = {
    projectData: {
        id: string;
        title: string;
        description: string;
    };
};

export function EditProject({ projectData }: EditProjectProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { selectProject } = useEditingStoreActions();

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
                <EditPopover closeModal={() => onOpenChange(false)} />
            </Popover>
        </Dialog>
    );
}
