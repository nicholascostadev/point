import { useRouter } from "next/navigation";
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
    search: string;
    actions: {
        onChangeSearch: (search: string) => void;
        changeStatus: (status: Status) => void;
    };
};

export const useFiltersStore = create<Store>((set, get) => ({
    status: "none",
    search: (() => {
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
