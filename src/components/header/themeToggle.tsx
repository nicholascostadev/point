"use client";

import { useTheme } from "next-themes";
import { Button } from "../button";
import { Sun } from "@/icons/sun";
import { Moon } from "@/icons/moon";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../tooltip";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        as="button"
                        onClick={toggleTheme}
                        className="p-2 md:h-11 md:w-11 h-10 w-10 dark:bg-transparent bg-transparent"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-6 h-6 dark:stroke-white stroke-gray-950 pointer-events-none" />
                        ) : (
                            <Moon className="w-6 h-6 dark:fill-white fill-gray-950 pointer-events-none" />
                        )}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Switch to {theme === "light" ? "dark" : "light"} mode</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
