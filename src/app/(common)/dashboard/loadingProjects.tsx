import { Skeleton } from "@/components/skeleton";

export function LoadingProjects() {
    return (
        <div className="flex flex-col gap-8">
            <Skeleton className="h-6 w-1/3 rounded-full bg-gray-200 dark:bg-gray-900" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3]?.map((item) => (
                    <Skeleton
                        className="relative h-[20rem] rounded-lg bg-gray-200/60 p-4 dark:bg-gray-900/60"
                        key={item}
                    >
                        <Skeleton className="absolute right-4 top-4 h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-900" />

                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-6 w-2/3 rounded-full bg-gray-200 dark:bg-gray-900" />
                            <Skeleton className="h-6 w-1/3 rounded-full bg-gray-200 dark:bg-gray-900" />
                        </div>
                    </Skeleton>
                ))}
            </div>
        </div>
    );
}
