import "@uploadthing/react/styles.css";

import { Button } from "@/components/button";
import { descriptionSchema, titleSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { useUploadThing } from "@/hooks/useUploadThing";
import { cl } from "@/lib/utils/cl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { z } from "zod";

const generateMimeTypes = (fileTypes: string[]) => {
    return fileTypes.map((type) => `${type}/*`);
};

const generateReactDropzoneAccept = (fileTypes: string[]) => {
    const mimeTypes = generateMimeTypes(fileTypes);
    return Object.fromEntries(mimeTypes.map((type) => [type, []]));
};

const formSchema = z.object({
    name: titleSchema,
    description: descriptionSchema,
});

type FormSchema = z.infer<typeof formSchema>;

type AddProjectFormProps = {
    closeModal: () => void;
};

export function AddProjectForm({ closeModal }: AddProjectFormProps) {
    const { startUpload, isUploading, permittedFileInfo } =
        useUploadThing<string>({
            endpoint: "imageUploader",
            onClientUploadComplete: (res) => {
                toast.success("Uploaded, yay!!!");
                toast.success(JSON.stringify(res));
            },
        });

    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string>();
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
    }, []);

    const { maxSize, fileTypes } = permittedFileInfo ?? {};

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: fileTypes ? generateReactDropzoneAccept(fileTypes) : undefined,
        maxFiles: 1,
        multiple: false,
        onDropRejected: () => {
            toast.error("File type is not accepted, only images are allowed");
        },
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

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!files[0]) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(files[0]);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [files[0]]);

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
            <div
                className={cl(
                    "mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                    isDragActive ? "bg-blue-600/10" : ""
                )}
            >
                {preview && (
                    <div className="relative h-72 w-full">
                        <Image
                            src={preview}
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                )}
                {!files[0] && (
                    <div className="text-center" {...getRootProps()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            className="mx-auto h-12 w-12 text-gray-400"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                                {`Choose files`}
                                <input
                                    className="sr-only"
                                    {...getInputProps()}
                                />
                            </label>
                            <p className="pl-1">{`or drag and drop`}</p>
                        </div>
                        <div className="h-[1.25rem]">
                            {fileTypes && (
                                <p className="text-xs leading-5 text-gray-600">
                                    {`${fileTypes.join(", ")}`}{" "}
                                    {maxSize && `up to ${maxSize}`}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                {files[0] && (
                    <div {...getRootProps()}>
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                            {`Choose another file`}
                            <input className="sr-only" {...getInputProps()} />
                        </label>
                    </div>
                )}
            </div>

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
