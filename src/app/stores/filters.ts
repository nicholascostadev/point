import { create } from "zustand";

export type Status =
    | "requested"
    | "approved"
    | "pending"
    | "delivered"
    | "none"
    | "error";
type Store = {
    status: Status;
    changeStatus: (status: Status) => void;
};

export const useFiltersStore = create<Store>((set, get) => ({
    status: "none",
    changeStatus: (status) => {
        if (status === get().status) {
            set({ status: "none" });
            return;
        }

        set({ status });
    },
}));
