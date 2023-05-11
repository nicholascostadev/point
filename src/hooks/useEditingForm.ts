import { projectStatusSchema } from "@/lib/utils/projectRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { descriptionSchema, titleSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    title: titleSchema,
    description: descriptionSchema,
    status: projectStatusSchema,
});

export type FormSchema = z.infer<typeof formSchema>;

type EditFormProps = {
    closeModal: () => void;
};

export function useEditingForm() {
    const { title, description, status } = useEditingStoreProjectData();

    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title ?? "",
            description: description ?? "",
            status: status ?? "requested",
        },
    });

    const { setValue, watch } = methods;

    const currentTitle = watch("title");
    const currentDescription = watch("description");
    const currentStatus = watch("status");

    useEffect(() => {
        setValue("title", title ?? "");
        setValue("description", description ?? "");
        setValue("status", status ?? "requested");
    }, [setValue, status, title, description]);

    return {
        methods,
        formData: { currentTitle, currentDescription, currentStatus },
        formState: methods.formState,
    };
}
