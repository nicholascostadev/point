import { Button } from "@/components/button";
import { isOnAdminRoute, isUserAdmin } from "@/lib/utils/userRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { descriptionSchema, titleSchema } from "@/validations";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
    title: titleSchema,
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

    const pathname = usePathname();

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
            title: title ?? "",
            description: description ?? "",
        },
    });

    async function handleUpdateProject(formData: FormSchema) {
        await mutateAsync(formData);
    }

    // Add initial values when opening the popover
    useEffect(() => {
        setValue("title", title ?? "");
        setValue("description", description ?? "");
    }, [setValue, title, description]);

    const currentTitle = watch("title");
    const currentDescription = watch("description");

    const didntChange =
        currentTitle.trim() === title &&
        currentDescription.trim() === description;

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async ({ title, description }: FormSchema) => {
            if (!user) return;

            let url = "";

            if (isOnAdminRoute(pathname) && isUserAdmin(user)) {
                url = `/api/projects/${id}`;
            } else {
                url = `/api/users/${user.id}/projects/${id}`;
            }

            return await fetch(url, {
                body: JSON.stringify({
                    title,
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
                    aria-invalid={!!errors.title}
                    {...register("title")}
                />
                {errors.title && (
                    <small className="text-red-500">
                        {errors.title.message}
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
