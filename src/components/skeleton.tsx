import { cl } from "@/lib/utils/cl";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cl(
                "animate-pulse rounded-md bg-muted bg-gray-200 dark:bg-gray-800",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };
