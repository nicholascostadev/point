export function Search() {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-2xl">Search</p>
            <input
                type="text"
                placeholder="Search for a project name"
                className="w-full p-2 rounded-lg dark:bg-transparent border-2 dark:border-gray-200/60 dark:focus:border-gray-50/80 focus:outline-none"
            />
        </div>
    );
}
