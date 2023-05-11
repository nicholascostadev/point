import { FormSchema } from "@/hooks/useEditingForm";
import { useFormContext } from "react-hook-form";

export function EditForm() {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormSchema>();

    return (
        <div className="flex flex-col gap-2">
            <strong>Editing</strong>
            <fieldset className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                    className={
                        'rounded-lg border border-gray-950/20 bg-transparent p-2 text-gray-950 placeholder:text-gray-600 dark:border-gray-900 dark:text-gray-200 dark:placeholder:text-gray-400 [&[aria-invalid="true"]]:border-red-500'
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
                        'resize-none rounded-lg border border-gray-950/20 bg-transparent p-2 text-gray-950 placeholder:text-gray-600 dark:border-gray-900 dark:text-gray-200 dark:placeholder:text-gray-400 [&[aria-invalid="true"]]:border-red-500'
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
        </div>
    );
}
