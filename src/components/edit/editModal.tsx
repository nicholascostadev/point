import { FormSchema, useEditingForm } from "@/hooks/useEditingForm";
import { useEditingMutation } from "@/hooks/useEditingMutation";
import { useUploadThing } from "@/hooks/useUploadThing";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Button } from "../button";
import { UploadImage } from "../upload-image";
import { EditForm } from "./editForm";
import { StatusSelector } from "./statusSelector";

type EditModalProps = {
    closeModal: () => void;
};

export function EditModal({ closeModal }: EditModalProps) {
    const { title, description, status, image } = useEditingStoreProjectData();

    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState(image ? image : undefined);
    const { user } = useUser();
    const queryClient = useQueryClient();
    const { methods, formState, formData } = useEditingForm();
    const { submitUpdate } = useEditingMutation();

    const { startUpload, permittedFileInfo } = useUploadThing<string>({
        endpoint: "imageUploader",
    });

    const { isLoading, isSubmitting } = formState;
    const { handleSubmit } = methods;

    async function handleUpdateProject(formData: FormSchema) {
        const response = await startUpload([files[0]]);

        if (!response) {
            toast.error("Error uploading image");
            return;
        }

        const uploadedFile = response[0];

        await submitUpdate(
            { ...formData, image: uploadedFile.fileUrl },
            {
                onSuccess: () => {
                    closeModal();
                    queryClient.invalidateQueries(["projects"]);
                    toast.success("Project updated successfully!");
                },
            }
        );
    }

    const didntChange =
        formData.currentTitle?.trim() === title &&
        formData.currentDescription?.trim() === description &&
        formData.currentStatus === status &&
        image === preview;

    return (
        <section aria-label="Editing Zone" className="flex flex-col gap-4">
            <FormProvider {...methods}>
                <form
                    className="flex max-w-full flex-col gap-4"
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
                <UploadImage
                    files={files}
                    preview={preview}
                    setFiles={setFiles}
                    setPreview={setPreview}
                    permittedFileInfo={permittedFileInfo}
                />
            </FormProvider>
        </section>
    );
}
