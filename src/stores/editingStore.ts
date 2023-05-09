import { create } from "zustand";

type ProjectData = {
    id?: string;
    title?: string;
    description?: string;
};

type Store = {
    projectData: ProjectData;
    actions: {
        selectProject: (projectData: ProjectData) => void;
    };
};

export const useEditingStore = create<Store>((set) => ({
    projectData: {},
    actions: {
        selectProject: (projectData) => set({ projectData }),
    },
}));

export const useEditingStoreActions = () =>
    useEditingStore((state) => state.actions);
export const useEditingStoreProjectData = () =>
    useEditingStore((state) => state.projectData);