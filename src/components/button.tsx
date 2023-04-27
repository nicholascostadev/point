import { cl } from "@/utils/cl";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

type ButtonProps =
    | ({
          as: "a";
      } & React.ComponentPropsWithoutRef<"a"> &
          Omit<LinkProps, "a">)
    | ({
          as: "button";
      } & React.ComponentPropsWithoutRef<"button">);

export const Button = forwardRef<any, ButtonProps>(
    ({ className, ...rest }, ref) => {
        const buttonClasses =
            "flex items-center justify-center gap-2 text-lg hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors py-2 px-6 rounded-full dark:text-gray-200 [&_svg]:dark:fill-gray-200 [&_svg]:fill-gray-950";

        if (rest.as === "a") {
            // as is a reserved prop inside Link component
            const { as, ...props } = rest;

            return (
                <Link
                    ref={ref}
                    className={cl(buttonClasses, className)}
                    {...props}
                />
            );
        }

        return (
            <button
                ref={ref}
                className={cl(buttonClasses, className)}
                {...rest}
            />
        );
    }
);

Button.displayName = "Button";
