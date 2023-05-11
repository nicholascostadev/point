"use client";

import { cl } from "@/lib/utils/cl";
import {
    ProjectStatus,
    projectStatusFormatter,
    projectStatuses,
} from "@/lib/utils/projectRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { Check } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { FormSchema } from "./editPopover";

export function StatusSelector() {
    const { status } = useEditingStoreProjectData();
    const [statusState, setStatus] = useState(status);
    const [open, setOpen] = useState(false);
    const { setValue } = useFormContext<FormSchema>();

    function handleSelectStatus(currentStatus: string) {
        setStatus(currentStatus as ProjectStatus);
        setValue(
            "status",
            (projectStatuses.find(
                (st) =>
                    st.label.toLocaleLowerCase() ===
                    currentStatus.toLocaleLowerCase()
            )?.value ?? "requested") as ProjectStatus
        );

        setOpen(false);
    }

    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor="trigger-status-button"
                className="text-lg font-bold"
            >
                Status
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger
                    id="trigger-status-button"
                    className="border border-gray-950 dark:border-gray-900 rounded-md px-2 py-1 text-lg"
                >
                    {projectStatusFormatter(statusState)}
                </PopoverTrigger>

                <PopoverContent>
                    <Command>
                        <CommandInput
                            className="focus:ring-0"
                            placeholder="Search status..."
                        />
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                            {projectStatuses.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={handleSelectStatus}
                                >
                                    <Check
                                        className={cl(
                                            "mr-2 h-4 w-4",
                                            statusState === opt.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
