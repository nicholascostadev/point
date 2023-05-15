import type { ProjectStatus } from "@/lib/utils/projectRelated";
import { create } from "zustand";

type ProjectData = {
    id?: string;
    title?: string;
    description?: string;
    status?: ProjectStatus;
    image?: string | null;
};

type Store = {
    projectData: ProjectData;
    actions: {
        selectProject: (projectData: ProjectData) => void;
        resetEditingProjectData: () => void;
    };
};

export const useEditingStore = create<Store>((set) => ({
    projectData: {},
    actions: {
        selectProject: (projectData) => set({ projectData }),
        resetEditingProjectData: () => set({ projectData: {} }),
    },
}));

export const useEditingStoreActions = () =>
    useEditingStore((state) => state.actions);
export const useEditingStoreProjectData = () =>
    useEditingStore((state) => state.projectData);
