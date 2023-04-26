"use client";

import { Binocular } from "@/icons/binocular";
import { Button } from "../button";
import { useSession } from "@clerk/nextjs";
import { Grid } from "@/icons/grid";

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
                <Grid aria-label="Binocular" className="w-6 h-6" />
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
            <Binocular aria-label="Binocular" className="w-6 h-6" />
        </Button>
    );
};
