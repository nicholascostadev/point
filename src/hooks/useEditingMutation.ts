"use client";

import { isOnAdminRoute, isUserAdmin } from "@/lib/utils/userRelated";
import { useEditingStoreProjectData } from "@/stores/editingStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { FormSchema } from "./useEditingForm";

export function useEditingMutation() {
    const { user } = useUser();
    const pathname = usePathname();
    const { id } = useEditingStoreProjectData();

    const mutation = useMutation({
        mutationFn: async ({
            title,
            description,
            status,
            image,
        }: FormSchema & { image?: string }) => {
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
                    image,
                }),
                method: "PATCH",
            });
        },
    });

    async function submitUpdate(
        { title, description, status, image }: FormSchema & { image?: string },
        { onSuccess }: { onSuccess?: () => void }
    ) {
        await mutation.mutateAsync(
            {
                title,
                description,
                status,
                image,
            },
            {
                onSuccess,
            }
        );
    }

    return { submitUpdate };
}
