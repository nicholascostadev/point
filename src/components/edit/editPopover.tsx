import { PopoverContent } from "@/components/popover";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { DeleteProject } from "./deleteProject";
import { EditModal } from "./editModal";

type EditPopoverProps = {
    closeModal: () => void;
    resetEditingProjectData: () => void;
};

export function EditPopover({
    closeModal,
    resetEditingProjectData,
}: EditPopoverProps) {
    return (
        <PopoverContent className="border border-gray-200 dark:border-gray-900">
            <div className="flex flex-col items-start justify-start gap-4">
                <h3 className="text-lg font-bold">Actions Menu</h3>
                <div className="relative flex w-full items-center justify-between">
                    <Dialog
                        onOpenChange={(open) => {
                            if (!open) {
                                resetEditingProjectData();
                            }
                        }}
                    >
                        <label className="flex items-center gap-2">
                            <DialogTrigger className="flex items-center justify-center gap-1 rounded-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900">
                                Edit
                                <Pencil className="h-4 w-4" />
                            </DialogTrigger>
                        </label>
                        <DialogContent>
                            <EditModal closeModal={closeModal} />
                        </DialogContent>
                    </Dialog>

                    <DeleteProject />
                </div>
            </div>
        </PopoverContent>
    );
}
