import { Skeleton } from "@/components/skeleton";
import { LoadingProjects } from "./loadingProjects";

export function LoadingPage() {
    return (
        <main className="mt-header-height py-8 min-h-with-header pt-header-height bg-[url('/background-line.svg')]">
            <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4 relative">
                <Skeleton className="w-48 h-10 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="w-96 h-7 bg-gray-200 dark:bg-gray-800" />

                <div className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-full h-8 bg-gray-200 dark:bg-gray-800" />
                            <Skeleton className="w-full h-11 bg-gray-200 dark:bg-gray-800" />
                        </div>
                        <Skeleton className="h-[52px] w-full bg-gray-200 dark:bg-gray-800" />
                    </div>
                    <LoadingProjects />
                </div>
            </div>
        </main>
    );
}
