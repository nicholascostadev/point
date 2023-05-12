"use client";

import { useFiltersStore } from "@/stores/filters";
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
                className="w-full rounded-lg border-2 border-gray-950/20 p-2 dark:border-gray-900 dark:bg-transparent"
                onChange={(e) => debounced(e.target.value)}
                defaultValue={search}
            />
        </div>
    );
}
