import { cl } from "@/utils/cl";

interface Chevron extends React.SVGProps<SVGSVGElement> {}

export function Chevron({ className, ...props }: Chevron) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={cl(className)}
            {...props}
        >
            <title>chevron-right</title>
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
    );
}
