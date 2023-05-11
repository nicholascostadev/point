import { PopoverContent } from "@/components/popover";
import { projectStatusSchema } from "@/lib/utils/projectRelated";
import { isOnAdminRoute, isUserAdmin } from "@/lib/utils/userRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { descriptionSchema, titleSchema } from "@/validations";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { Button } from "../button";
import { DeleteProject } from "./deleteProject";
import { EditForm } from "./editForm";
import { StatusSelector } from "./statusSelector";

type EditPopoverProps = {
    closeModal: () => void;
};

const formSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
    status: projectStatusSchema,
});

export type FormSchema = z.infer<typeof formSchema>;

type EditFormProps = {
    closeModal: () => void;
};

export function EditPopover({ closeModal }: EditPopoverProps) {
    const { user } = useUser();
    const pathname = usePathname();
    const { id, title, description, status } = useEditingStoreProjectData();
    const queryClient = useQueryClient();
    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title ?? "",
            description: description ?? "",
            status: status ?? "requested",
        },
    });

    const { isLoading, isSubmitting } = methods.formState;
    const { watch, setValue, handleSubmit, reset } = methods;

    async function handleUpdateProject(formData: FormSchema) {
        await mutateAsync(formData);
    }

    // Add initial values when opening the popover
    useEffect(() => {
        setValue("title", title ?? "");
        setValue("description", description ?? "");
        setValue("status", status ?? "requested");
    }, [setValue, status, title, description]);

    const currentTitle = watch("title");
    const currentDescription = watch("description");
    const currentStatus = watch("status");

    const didntChange =
        currentTitle.trim() === title &&
        currentDescription.trim() === description &&
        currentStatus === status;

    const { mutateAsync } = useMutation({
        mutationFn: async ({ title, description, status }: FormSchema) => {
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
                    status,
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
        <PopoverContent className="border border-gray-200 dark:bg-gray-950/90 dark:border-gray-900">
            <div className="flex flex-col justify-start items-start gap-1">
                <section
                    aria-label="Editing Zone"
                    className="flex flex-col gap-4"
                >
                    <FormProvider {...methods}>
                        <form
                            className="flex flex-col gap-4 w-96"
                            onSubmit={handleSubmit(handleUpdateProject)}
                        >
                            <EditForm />
                            <StatusSelector />

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
