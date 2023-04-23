type ButtonProps =
    | ({
          as: "a";
      } & React.ComponentPropsWithoutRef<"a">)
    | ({
          as: "button";
      } & React.ComponentPropsWithoutRef<"button">);

export function Button(props: ButtonProps) {
    if (props.as === "a") {
        return (
            <a
                className="flex items-center justify-center gap-2 text-lg dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors py-2 px-6 rounded-full dark:text-gray-200"
                {...props}
            />
        );
    }

    return (
        <button
            className="flex items-center justify-center gap-2 text-lg dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors py-2 px-6 rounded-full dark:text-gray-200"
            {...props}
        />
    );
}
