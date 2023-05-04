"use client";

import { useMutation } from "@tanstack/react-query";
import { DashboardCard } from "./dashboardCard";
import { useProjects } from "@/hooks/useProjects";
import { useUser } from "@clerk/nextjs";

type ProjectListProps = {
    user: {
        id: string;
    };
};

export function ProjectList() {
    const { data } = useProjects();
    const { user } = useUser();
    const { mutate } = useMutation({
        mutationFn: async (projectId: string) => {
            if (!user) return;
            return await fetch(`/api/users/${user.id}/projects/${projectId}`, {
                method: "DELETE",
            });
        },
    });

    if (data && data.length <= 0) {
        return (
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl">No projects</h1>
                <p className="text-lg">
                    Seems like you haven&apos;t requested any projects yet,
                    start now by requesting a new project!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.map((proj) => (
                <DashboardCard
                    key={proj.id}
                    id={proj.id}
                    title={proj.title}
                    description={proj.description}
                    status={proj.status}
                    onDeleteProject={mutate}
                />
            ))}
        </div>
    );
}
