"use client";

import { Button } from "../button";
import { useSession } from "@clerk/nextjs";
import { LayoutDashboard, Map } from "lucide-react";

export const HeaderCTA = () => {
    const { isSignedIn } = useSession();

    if (isSignedIn)
        return (
            <Button
                as="a"
                href="/dashboard"
                aria-label="Go to Dashboard"
                className="hidden sm:flex dark:bg-transparent"
            >
                Dashboard
                <LayoutDashboard className="w-6 h-6 stroke-default" />
            </Button>
        );

    return (
        <Button
            as="a"
            href="/login"
            aria-label="Login"
            className="hidden sm:flex dark:bg-transparent"
        >
            Explore
            <Map className="w-6 h-6" />
        </Button>
    );
};
