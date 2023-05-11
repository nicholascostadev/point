import { Skeleton } from "@/components/skeleton";
import { LoadingProjects } from "./loadingProjects";

export function LoadingPage() {
    return (
        <main className="mt-header-height min-h-with-header bg-[url('/background-line.svg')] py-8 pt-header-height">
            <div className="relative mx-auto flex w-layout-base max-w-full flex-col gap-4 px-2 md:px-8">
                <Skeleton className="h-10 w-48 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-7 w-96 bg-gray-200 dark:bg-gray-800" />

                <div className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-8 w-full bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-800" />
                        </div>
                        <Skeleton className="h-[52px] w-full bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <LoadingProjects />
                </div>
            </div>
        </main>
    );
}
