import { Project } from "@prisma/client";
import { create } from "zustand";

type Store = {
    projects: Project[];
    remainingProjects: number;
    isLoading?: boolean;
    setProjects: (projects: Project[]) => void;
    changeLoadingState: (isLoading: boolean) => void;
    setRemainingProjects: (remainingProjects: number) => void;
};

export const useProjectsStore = create<Store>((set) => ({
    projects: [],
    remainingProjects: 0,
    isLoading: false,
    setProjects: (projects) => set({ projects }),
    changeLoadingState: (isLoading) => set({ isLoading }),
    setRemainingProjects: (remainingProjects) => set({ remainingProjects }),
}));
