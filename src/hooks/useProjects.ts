import {
    SubscriptionPlan,
    getRemainingProjects,
} from "@/lib/utils/subscription";
import { useFiltersStore } from "@/stores/filters";
import { useProjectsStore } from "@/stores/projectStore";
import { ProjectOverridden } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type GetProjectsParams = {
    userId?: string;
    search?: string;
};

async function getProjects({ userId, search }: GetProjectsParams) {
    if (!userId) return Promise.resolve([]);

    const searchParams = new URLSearchParams();

    searchParams.set("query", search ?? "");

    const projects: ProjectOverridden[] = await fetch(
        `/api/users/${userId}/projects?${searchParams.toString()}`
    )
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return projects;
}

export function useProjects() {
    const { user } = useUser();
    const {
        changeFetchingState,
        changeLoadingState,
        setProjects,
        setRemainingProjects,
    } = useProjectsStore((state) => state.actions);
    const search = useFiltersStore((state) => state.search);

    const subscriptionPlan = user?.publicMetadata.subscription_plan;

    const query = useQuery({
        queryKey: ["projects", "user", search],
        queryFn: () =>
            getProjects({
                userId: user?.id,
                search,
            }),
        staleTime: 1000 * 30, // 30 seconds
    });

    useEffect(() => {
        if (query.data) setProjects(query.data);
    }, [query.data, query.isLoading, setProjects]);

    useEffect(() => {
        changeLoadingState(query.isLoading);
    }, [query.isLoading, changeLoadingState]);

    useEffect(() => {
        changeFetchingState(query.isFetching || query.isRefetching);
    }, [query.isFetching, query.isRefetching, changeFetchingState]);

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
        ...query,
        remainingProjects: getRemainingProjects(
            subscriptionPlan as SubscriptionPlan,
            query.data?.length
        ),
    };
}
