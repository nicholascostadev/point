import { cl } from "@/lib/utils/cl";

interface BackLightingProps extends React.ComponentPropsWithoutRef<"div"> {}

export function BackLighting({ className, ...props }: BackLightingProps) {
    return (
        <div
            className={cl(
                "absolute inset-0 m-auto bg-conic-gradient blur-[360px] w-1/2 h-1/2",
                className
            )}
            {...props}
        ></div>
    );
}
