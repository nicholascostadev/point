"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../button";
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
                <TooltipTrigger asChild>
                    <Button
                        as="button"
                        onClick={toggleTheme}
                        className="h-10 w-10 bg-transparent p-2 dark:bg-transparent md:h-11 md:w-11"
                    >
                        {theme === "dark" ? (
                            <Sun className="stroke-default pointer-events-none h-8 w-8" />
                        ) : (
                            <Moon className="fill-default pointer-events-none h-8 w-8" />
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
