import { Project } from "@prisma/client";
import { create } from "zustand";

type Store = {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
};

export const useProjectsStore = create<Store>((set) => ({
    projects: [],
    setProjects: (projects) => set({ projects }),
}));
