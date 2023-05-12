import { ProjectStatus } from "@/lib/utils/projectRelated";
import { create } from "zustand";

export type StoreProjectStatus = ProjectStatus | "none";

type Store = {
    status: StoreProjectStatus;
    search: string;
    actions: {
        onChangeSearch: (search: string) => void;
        changeStatus: (status: StoreProjectStatus) => void;
    };
};

export const useFiltersStore = create<Store>((set, get) => ({
    status: "none",
    search: (() => {
        if (typeof window === "undefined") return "";

        const url = new URL(window.location.href);

        const query = url.searchParams.get("query");

        return query ?? "";
    })(),
    actions: {
        onChangeSearch: (search) => {
            set({ search });
        },
        changeStatus: (status) => {
            if (status === get().status) {
                set({ status: "none" });
                return;
            }

            set({ status });
        },
    },
}));
