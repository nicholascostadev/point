import { cl } from "@/lib/utils/cl";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

type ButtonProps =
    | ({
          as: "a";
      } & React.ComponentPropsWithoutRef<"a"> &
          Omit<LinkProps, "a"> & { disabled?: boolean })
    | ({
          as: "button";
      } & React.ComponentPropsWithoutRef<"button">);

export const Button = forwardRef<any, ButtonProps>(
    ({ className, ...rest }, ref) => {
        const buttonClasses = cl(
            "flex items-center justify-center gap-2 text-lg hover:bg-gray-100 active:bg-gray-300 dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors py-2 px-6 rounded-full dark:text-gray-200 disabled:cursor-not-allowed [&[aria-disabled='true']:cursor-not-allowed   ]",
            "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent aria-disabled:active:bg-transparent aria-disabled:dark:hover:bg-transparent aria-disabled:dark:active:bg-transparent"
        );

        if (rest.as === "a") {
            // as is a reserved prop inside Link component
            const { as, disabled, ...props } = rest;

            return (
                <Link
                    ref={ref}
                    className={cl(
                        buttonClasses,
                        "aria-disabled:pointer-events-none"
                    )}
                    aria-disabled={disabled}
                    {...props}
                />
            );
        }

        return (
            <button
                ref={ref}
                className={cl(buttonClasses, className)}
                aria-disabled={rest.disabled || rest["aria-disabled"]}
                {...rest}
            />
        );
    }
);

Button.displayName = "Button";
