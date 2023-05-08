"use client";

import { useFiltersStore } from "@/app/stores/filters";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
    const search = useFiltersStore((state) => state.search);
    const debounced = useDebouncedCallback((val: string) => {
        handleSearch(val);
    }, 500);
    const handleSearchChange = useFiltersStore(
        (state) => state.actions.onChangeSearch
    );

    function handleSearch(query: string) {
        handleSearchChange(query);
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-2xl">Search</p>
            <input
                type="text"
                placeholder="Search for a project name"
                className="w-full p-2 rounded-lg dark:bg-transparent border-2 border-gray-950/20 dark:border-gray-200/60 dark:focus:border-gray-50/80 focus:outline-none"
                onChange={(e) => debounced(e.target.value)}
                defaultValue={search}
            />
        </div>
    );
}
