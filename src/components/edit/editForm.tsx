import { Button } from "@/components/button";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { descriptionSchema, nameSchema } from "@/validations";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
});

type FormSchema = z.infer<typeof formSchema>;

type EditFormProps = {
    closeModal: () => void;
};

export function EditForm({ closeModal }: EditFormProps) {
    const { user } = useUser();
    const { id, title, description } = useEditingStoreProjectData();
    const queryClient = useQueryClient();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setValue,
        reset,
        watch,
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: title ?? "",
            description: description ?? "",
        },
    });

    async function handleUpdateProject(formData: FormSchema) {
        await mutateAsync(formData);
    }

    // Add initial values when opening the popover
    useEffect(() => {
        setValue("name", title ?? "");
        setValue("description", description ?? "");
    }, [setValue, title, description]);

    const currentTitle = watch("name");
    const currentDescription = watch("description");

    const didntChange =
        currentTitle.trim() === title &&
        currentDescription.trim() === description;

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async ({ name, description }: FormSchema) => {
            if (!user) return;

            return await fetch(`/api/users/${user.id}/projects/${id}`, {
                body: JSON.stringify({
                    name,
                    description,
                }),
                method: "PATCH",
            });
        },
        onSuccess: () => {
            reset();
            closeModal();
            queryClient.invalidateQueries(["projects"]);
            toast.success("Project updated successfully!");
        },
    });

    return (
        <form
            className="flex flex-col gap-2 w-96"
            onSubmit={handleSubmit(handleUpdateProject)}
        >
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                    className={
                        'bg-transparent border rounded-lg p-2 dark:text-gray-200 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-950 border-gray-950/20 dark:border-gray-900 [&[aria-invalid="true"]]:border-red-500'
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
                        'bg-transparent border rounded-lg p-2 resize-none dark:text-gray-200 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-950 border-gray-950/20 dark:border-gray-900 [&[aria-invalid="true"]]:border-red-500'
                    }
                    id="description"
                    placeholder="Describe what want this project to be like, please be brief."
                    aria-invalid={!!errors.description}
                    rows={3}
                    {...register("description")}
                />
                {errors.description && (
                    <small className="text-red-500">
                        {errors.description.message}
                    </small>
                )}
            </fieldset>
            <Button
                as="button"
                type="submit"
                disabled={isSubmitting || didntChange}
            >
                {isSubmitting || isLoading ? (
                    <div className="flex justify-center items-center gap-1">
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
