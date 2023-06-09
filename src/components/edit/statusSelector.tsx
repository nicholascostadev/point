"use client";

import { FormSchema } from "@/hooks/useEditingForm";
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

export function StatusSelector() {
    const { status } = useEditingStoreProjectData();
    const [statusState, setStatus] = useState(status);
    const [open, setOpen] = useState(false);
    const { setValue } = useFormContext<FormSchema>();

    function handleSelectStatus(currentStatus: string) {
        setStatus(
            currentStatus
                .toLocaleLowerCase()
                .replaceAll(" ", "") as ProjectStatus
        );
        setValue(
            "status",
            (projectStatuses.find(
                (st) =>
                    st.label.toLocaleLowerCase().replaceAll(" ", "") ===
                    currentStatus.toLocaleLowerCase().replaceAll(" ", "")
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
                    className="rounded-md border border-gray-900/20 px-2 py-1 text-lg transition-colors hover:bg-gray-100 dark:border-gray-900 dark:hover:bg-gray-900 dark:aria-selected:bg-gray-900"
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
                                    value={opt.value}
                                    className="cursor-pointer transition-colors aria-selected:bg-gray-100 aria-selected:ring aria-selected:ring-offset-transparent dark:aria-selected:bg-gray-900"
                                >
                                    <Check
                                        className={cl(
                                            "mr-2 h-4 w-4",
                                            statusState?.toLowerCase() ===
                                                opt.value.toLowerCase()
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
