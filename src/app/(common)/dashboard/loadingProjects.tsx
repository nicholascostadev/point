import { Skeleton } from "@/components/skeleton";

export function LoadingProjects() {
    return (
        <div className="flex flex-col gap-8">
            <Skeleton className="w-1/3 h-6 dark:bg-gray-900 bg-gray-200 rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3]?.map((item) => (
                    <Skeleton
                        className="h-[20rem] dark:bg-gray-900/60 bg-gray-200/60 p-4 rounded-lg relative"
                        key={item}
                    >
                        <Skeleton className="w-24 h-6 absolute top-4 right-4 dark:bg-gray-900 bg-gray-200 rounded-full" />

                        <div className="flex flex-col gap-4">
                            <Skeleton className="w-2/3 h-6 dark:bg-gray-900 bg-gray-200 rounded-full" />
                            <Skeleton className="w-1/3 h-6 dark:bg-gray-900 bg-gray-200 rounded-full" />
                        </div>
                    </Skeleton>
                ))}
            </div>
        </div>
    );
}
