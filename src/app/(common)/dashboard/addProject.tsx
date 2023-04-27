import { Button } from "@/components/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog";
import { Plus } from "@/icons/plus";
import { AddProjectForm } from "./addProjectForm";
import { BackLighting } from "@/components/backLighting";

export function AddProject() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button as="button" className="p-2 dark:bg-transparent">
                    <Plus className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-200/60 backdrop-blur-lg dark:bg-gray-950/80">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Request a project
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form below to request a project to be
                        developed by our team.
                    </DialogDescription>
                </DialogHeader>

                <AddProjectForm />
            </DialogContent>
        </Dialog>
    );
}
