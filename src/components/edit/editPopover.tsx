import { PopoverContent } from "@/components/popover";
import { FormSchema, useEditingForm } from "@/hooks/useEditingForm";
import { useEditingMutation } from "@/hooks/useEditingMutation";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "../button";
import { DeleteProject } from "./deleteProject";
import { EditForm } from "./editForm";
import { StatusSelector } from "./statusSelector";

type EditPopoverProps = {
    closeModal: () => void;
};

export function EditPopover({ closeModal }: EditPopoverProps) {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const { title, description, status } = useEditingStoreProjectData();
    const { methods, formState, formData } = useEditingForm();
    const { submitUpdate } = useEditingMutation();

    const { isLoading, isSubmitting } = formState;
    const { handleSubmit } = methods;

    async function handleUpdateProject(formData: FormSchema) {
        await submitUpdate(formData, {
            onSuccess: () => {
                closeModal();
                queryClient.invalidateQueries(["projects"]);
                toast.success("Project updated successfully!");
            },
        });
    }

    const didntChange =
        formData.currentTitle?.trim() === title &&
        formData.currentDescription?.trim() === description &&
        formData.currentStatus === status;

    return (
        <PopoverContent className="border border-gray-200 dark:border-gray-900">
            <div className="flex flex-col items-start justify-start gap-1">
                <section
                    aria-label="Editing Zone"
                    className="flex flex-col gap-4"
                >
                    <FormProvider {...methods}>
                        <form
                            className="flex w-96 max-w-full flex-col gap-4"
                            onSubmit={handleSubmit(handleUpdateProject)}
                        >
                            <EditForm />
                            {isUserAdmin(user) && <StatusSelector />}

                            <Button
                                as="button"
                                type="submit"
                                disabled={isSubmitting || didntChange}
                            >
                                {isSubmitting || isLoading ? (
                                    <div className="flex items-center justify-center gap-1">
                                        <Loader2 className="animate-spin" />
                                        Submitting...
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                    </FormProvider>
                </section>
                <section
                    aria-label="Danger Zone"
                    className="flex flex-col gap-4"
                >
                    <strong>Danger Zone</strong>
                    <DeleteProject />
                </section>
            </div>
        </PopoverContent>
    );
}
