import { Project } from "@prisma/client";
import { create } from "zustand";

type Store = {
    projects: Project[];
    remainingProjects: number;
    isLoading?: boolean;
    isFetching?: boolean;
    projectModalOpen: boolean;
    actions: {
        setProjectModalOpen: (projectModalOpen: boolean) => void;
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
    projectModalOpen: false,
    actions: {
        setProjectModalOpen: (projectModalOpen) => set({ projectModalOpen }),
        setProjects: (projects) => set({ projects }),
        changeLoadingState: (isLoading) => set({ isLoading }),
        changeFetchingState: (isFetching) => set({ isFetching }),
        setRemainingProjects: (remainingProjects) => set({ remainingProjects }),
    },
}));

export const useAddProjectModal = () =>
    useProjectsStore((state) => ({
        open: state.projectModalOpen,
        setOpen: state.actions.setProjectModalOpen,
    }));
