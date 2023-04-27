import { useProjectsStore } from "@/app/stores/projectStore";
import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function getProjects(userId: string) {
    const projects: Project[] = await fetch(`/api/projects/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return projects;
}

export function useProjects(userId: string) {
    const setProjects = useProjectsStore((state) => state.setProjects);

    const query = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects(userId),
        staleTime: 1000 * 30, // 30 seconds
    });

    useEffect(() => {
        if (query.data) setProjects(query.data);
    }, [query.data, setProjects]);

    return query;
}
