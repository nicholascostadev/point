import { cl } from "@/lib/utils/cl";

interface IMenuProps extends React.SVGProps<SVGSVGElement> {}

export function Menu({ className, ...props }: IMenuProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={cl("fill-white", className)}
            {...props}
        >
            <title>menu</title>
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
    );
}
