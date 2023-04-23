import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cl(...classes: (string | undefined)[]) {
    return clsx(twMerge(classes));
}
