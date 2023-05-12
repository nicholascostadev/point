import {
    SubscriptionPlan,
    getRemainingProjects,
} from "@/lib/utils/subscription";
import { StoreProjectStatus, useFiltersStore } from "@/stores/filters";
import { useProjectsStore } from "@/stores/projectStore";
import { ProjectOverridden } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type GetProjectsParams = {
    userId?: string;
    search?: string;
    statusFilter: StoreProjectStatus;
};

async function getProjects({
    userId,
    search,
    statusFilter,
}: GetProjectsParams) {
    if (!userId) return Promise.resolve([]);

    const searchParams = new URLSearchParams();

    searchParams.set("query", search ?? "");
    searchParams.set("status", statusFilter === "none" ? "" : statusFilter);

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
    const statusFilter = useFiltersStore((state) => state.status);
    const {
        changeFetchingState,
        changeLoadingState,
        setProjects,
        setRemainingProjects,
    } = useProjectsStore((state) => state.actions);
    const search = useFiltersStore((state) => state.search);

    const subscriptionPlan = user?.publicMetadata.subscription_plan;

    const query = useQuery({
        queryKey: ["projects", "user", search, statusFilter],
        queryFn: () =>
            getProjects({
                userId: user?.id,
                search,
                statusFilter,
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
