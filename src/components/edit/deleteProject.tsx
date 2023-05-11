import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function DeleteProject() {
    const { mutateAsync: deleteProject, isLoading } = useDeleteProject();
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useEditingStoreProjectData();

    async function handleDelete() {
        if (!id) return;
        await deleteProject(id);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-gray-200 focus-visible:bg-red-500 focus-visible:text-gray-200">
                Delete Project
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription className="font-bold text-red-500">
                    This action is not reversible.
                </DialogDescription>
                <button
                    className="flex items-center justify-center rounded-full px-2 py-1 text-red-500 transition-colors hover:bg-red-500 hover:text-gray-200 focus-visible:bg-red-500 focus-visible:text-gray-200"
                    onClick={handleDelete}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-1">
                            <Loader2 className="animate-spin" />
                            Deleting your project...
                        </div>
                    ) : (
                        "Confirm"
                    )}
                </button>
            </DialogContent>
        </Dialog>
    );
}
