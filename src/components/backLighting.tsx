import { cl } from "@/lib/utils/cl";

interface BackLightingProps extends React.ComponentPropsWithoutRef<"div"> {}

export function BackLighting({ className, ...props }: BackLightingProps) {
    return (
        <div
            className={cl(
                "absolute inset-0 -z-10 m-auto h-1/2 w-1/2 bg-conic-gradient blur-[360px]",
                className
            )}
            {...props}
        ></div>
    );
}
