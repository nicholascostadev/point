import { isOnAdminRoute, isUserAdmin } from "@/lib/utils/userRelated";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export const useDeleteProject = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const pathname = usePathname();

    const deleteMutation = useMutation({
        mutationFn: async (projectId: string) => {
            if (!user) return;

            if (isOnAdminRoute(pathname) && isUserAdmin(user)) {
                return await fetch(
                    `/api/users/${user.id}/projects/${projectId}`,
                    {
                        method: "DELETE",
                    }
                );
            }

            return await fetch(`/api/users/${user.id}/projects/${projectId}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
        },
    });

    return deleteMutation;
};
