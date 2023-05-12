"use client";

import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";
import { DashboardCard } from "./dashboardCard";

type ProjectListProps = {
    user: {
        id: string;
    };
};

export function ProjectList() {
    const { data, isFetching } = useProjects();

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
        <div className="flex flex-col gap-6">
            {isFetching && <Loader2 className="animate-spin" />}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((proj) => (
                    <DashboardCard
                        key={proj.id}
                        id={proj.id}
                        title={proj.title}
                        description={proj.description}
                        status={proj.status}
                    />
                ))}
            </div>
        </div>
    );
}
