import { Project } from "@prisma/client";
import { create } from "zustand";

type Store = {
    projects: Project[];
    remainingProjects: number;
    isLoading?: boolean;
    isFetching?: boolean;
    actions: {
        setProjects: (projects: Project[]) => void;
        changeLoadingState: (isLoading: boolean) => void;
        changeFetchingState: (isFetching: boolean) => void;
        setRemainingProjects: (remainingProjects: number) => void;
    };
};

export const useProjectsStore = create<Store>((set) => ({
    projects: [],
    remainingProjects: 0,
    isLoading: false,
    isFetching: false,
    actions: {
        setProjects: (projects) => set({ projects }),
        changeLoadingState: (isLoading) => set({ isLoading }),
        changeFetchingState: (isFetching) => set({ isFetching }),
        setRemainingProjects: (remainingProjects) => set({ remainingProjects }),
    },
}));
