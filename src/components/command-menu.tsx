"use client";

import { useAddProjectModal, useProjectsStore } from "@/stores/projectStore";
import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command";

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const { setOpen: setAddProjectModalOpen } = useAddProjectModal();
    const remainingProjects = useProjectsStore(
        (state) => state.remainingProjects
    );

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    function openAddProjectModal() {
        setOpen(false);
        setAddProjectModalOpen(true);
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                className="focus:ring-0"
                placeholder="Type a command or search..."
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <CommandItem
                        onSelect={openAddProjectModal}
                        className="aria-disabled:cursor-not-allowed aria-disabled:text-gray-500 aria-selected:ring"
                        disabled={remainingProjects === 0}
                    >
                        Add Project {remainingProjects === 0 && "- (Maxed out)"}
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
