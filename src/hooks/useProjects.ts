import { useProjectsStore } from "@/app/stores/projectStore";
import {
    SubscriptionPlan,
    getRemainingProjects,
} from "@/lib/utils/subscription";
import { useUser } from "@clerk/nextjs";
import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function getProjects(userId?: string) {
    if (!userId) return Promise.resolve([]);

    const projects: Project[] = await fetch(`/api/projects/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return projects;
}

export function useProjects() {
    const { user } = useUser();
    const setProjects = useProjectsStore((state) => state.setProjects);
    const setRemainingProjects = useProjectsStore(
        (state) => state.setRemainingProjects
    );
    const changeLoadingState = useProjectsStore(
        (state) => state.changeLoadingState
    );

    const subscriptionPlan = user?.publicMetadata.subscription_plan;

    const query = useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects(user?.id),
        staleTime: 1000 * 30, // 30 seconds
    });

    useEffect(() => {
        if (query.data) setProjects(query.data);
    }, [query.data, query.isLoading, setProjects]);

    useEffect(() => {
        changeLoadingState(query.isLoading);
    }, [query.isLoading, changeLoadingState]);

    useEffect(() => {
        if (query.isLoading) return;
        if (!subscriptionPlan) return;

        setRemainingProjects(
            getRemainingProjects(
                subscriptionPlan as SubscriptionPlan,
                query.data?.length
            )
        );
    }, [query.data, query.isLoading, setRemainingProjects, subscriptionPlan]);

    return {
        data: query.data,
        remainingProjects: getRemainingProjects(
            subscriptionPlan as SubscriptionPlan,
            query.data?.length
        ),
    };
}
