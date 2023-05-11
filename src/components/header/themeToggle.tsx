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
                        className="p-2 md:h-11 md:w-11 h-10 w-10 dark:bg-transparent bg-transparent"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-8 h-8 stroke-default pointer-events-none" />
                        ) : (
                            <Moon className="w-8 h-8 fill-default pointer-events-none" />
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
