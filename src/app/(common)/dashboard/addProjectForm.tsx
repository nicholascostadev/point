"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/button";

const formSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(500),
});

type FormSchema = z.infer<typeof formSchema>;

export function AddProjectForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
    });

    async function handleCreateProject() {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Yay");
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
                        'bg-transparent border rounded-lg p-2 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-950 border-gray-950/10 dark:border-gray-200/20 [&[aria-invalid="true"]]:border-red-500'
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
                        'bg-transparent border rounded-lg p-2 resize-none dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-950 border-gray-950/10 dark:border-gray-200/20 [&[aria-invalid="true"]]:border-red-500'
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
            <Button as="button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
