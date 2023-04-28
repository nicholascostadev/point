import { Project } from "@prisma/client";
import { create } from "zustand";

type Store = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    changeLoadingState: (isLoading: boolean) => void;
    isLoading?: boolean;
};

export const useProjectsStore = create<Store>((set) => ({
    projects: [],
    isLoading: false,
    setProjects: (projects) => set({ projects }),
    changeLoadingState: (isLoading) => set({ isLoading }),
}));
