import "@uploadthing/react/styles.css";

import { Button } from "@/components/button";
import { descriptionSchema, titleSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { UploadImage } from "@/components/upload-image";
import { useUploadThing } from "@/hooks/useUploadThing";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
    name: titleSchema,
    description: descriptionSchema,
});

type FormSchema = z.infer<typeof formSchema>;

type AddProjectFormProps = {
    closeModal: () => void;
};

export function AddProjectForm({ closeModal }: AddProjectFormProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string>();

    const { startUpload, permittedFileInfo } = useUploadThing<string>({
        endpoint: "imageUploader",
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    const queryClient = useQueryClient();
    const { mutateAsync: addPost, isLoading } = useMutation({
        mutationKey: ["createProject"],
        mutationFn: async (data: FormSchema & { image?: string }) => {
            return await fetch("/api/projects", {
                body: JSON.stringify({ ...data }),
                method: "POST",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
            reset();
            closeModal();
        },
    });

    async function handleCreateProject(data: FormSchema) {
        const response = await startUpload([files[0]]);
        if (!response) {
            toast.error("Error uploading image");
            return;
        }

        const uploadedFile = response[0];

        await addPost({ ...data, image: uploadedFile.fileUrl });
    }

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(handleCreateProject)}
        >
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                    className={
                        'rounded-lg border border-gray-950/20 bg-transparent p-2 text-gray-950 placeholder:text-gray-600 dark:border-gray-200/20 dark:text-gray-200 dark:placeholder:text-gray-400 [&[aria-invalid="true"]]:border-red-500'
                    }
                    type="text"
                    id="name"
                    placeholder="Name of the project"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                />
                {errors.name && (
                    <small className="text-red-500">
                        {errors.name.message}
                    </small>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                    className={
                        'resize-none rounded-lg border border-gray-950/20 bg-transparent p-2 text-gray-950 placeholder:text-gray-600 dark:border-gray-200/20 dark:text-gray-200 dark:placeholder:text-gray-400 [&[aria-invalid="true"]]:border-red-500'
                    }
                    id="description"
                    placeholder="Describe what want this project to be like, please be brief."
                    aria-invalid={!!errors.description}
                    {...register("description")}
                />
                {errors.description && (
                    <small className="text-red-500">
                        {errors.description.message}
                    </small>
                )}
            </fieldset>
            <UploadImage
                files={files}
                preview={preview}
                setFiles={setFiles}
                setPreview={setPreview}
                permittedFileInfo={permittedFileInfo}
            />

            <Button as="button" type="submit" disabled={isSubmitting}>
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
    );
}
