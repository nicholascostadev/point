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
                className="hidden dark:bg-transparent sm:flex"
            >
                Dashboard
                <LayoutDashboard className="stroke-default h-6 w-6" />
            </Button>
        );

    return (
        <Button
            as="a"
            href="/login"
            aria-label="Login"
            className="hidden dark:bg-transparent sm:flex"
        >
            Explore
            <Map className="h-6 w-6" />
        </Button>
    );
};
