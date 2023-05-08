import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProject = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (projectId: string) => {
            if (!user) return;
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
