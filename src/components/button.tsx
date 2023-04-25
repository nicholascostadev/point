import { cl } from "@/utils/cl";

type ButtonProps =
    | ({
          as: "a";
      } & React.ComponentPropsWithoutRef<"a">)
    | ({
          as: "button";
      } & React.ComponentPropsWithoutRef<"button">);

export function Button({ className, ...props }: ButtonProps) {
    const buttonClasses =
        "flex items-center justify-center gap-2 text-lg hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors py-2 px-6 rounded-full dark:text-gray-200 [&_svg]:dark:fill-gray-200 [&_svg]:fill-gray-950";

    if (props.as === "a") {
        return <a className={cl(buttonClasses, className)} {...props} />;
    }

    return <button className={cl(buttonClasses, className)} {...props} />;
}
