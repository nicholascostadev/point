"use client";

import { BackLighting } from "@/components/backLighting";
import { CommandMenu } from "@/components/command-menu";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useProjectsStore } from "@/stores/projectStore";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";
import { LoadingPage } from "./loadingPage";
import { ProjectList } from "./projectList";
import { Search } from "./search";
import { Settings } from "./settings";

export default function Page() {
    const { isSignedIn, isLoaded } = useUser();
    const projects = useProjectsStore((state) => state.projects);
    const userPlan = useUserPlan();

    const text = useMemo(() => {
        const project = projects.length > 1 ? "projects" : "project";

        return `You have requested ${projects.length} ${project} in total`;
    }, [projects.length]);

    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (!isSignedIn) {
        return (
            <main className="mt-header-height min-h-with-header bg-[url('/background-line.svg')] py-8 pt-header-height">
                <div className="relative mx-auto flex w-layout-base max-w-full flex-col gap-4 px-2 md:px-8">
                    <h1 className="text-4xl">Not Allowed</h1>
                    <p className="text-lg">
                        Sorry, seems like you&apos;re not logged in, click{" "}
                        <a href="/login" className="underline">
                            here
                        </a>{" "}
                        to continue
                    </p>
                </div>
            </main>
        );
    }

    return (
        <>
            <CommandMenu />
            <div className="min-h-with-header py-8 pt-32">
                <div className="relative mx-auto flex w-layout-base max-w-full flex-col gap-4 px-2 md:px-8">
                    <BackLighting className="bg-none" />
                    <div className="flex items-end gap-2">
                        <h1 className="text-4xl">Dashboard</h1>
                        <span className="text-4xl">-</span>
                        <p className="text-2xl">
                            Current plan:{" "}
                            <span className="uppercase text-cyan-600 dark:text-cyan-400">
                                {userPlan}
                            </span>
                        </p>
                    </div>
                    <p className="text-lg">
                        Check the progress of the projects you&apos;ve requested
                    </p>
                    <div className="flex flex-col gap-8 pt-4">
                        <div className="flex flex-col gap-8">
                            <Search />
                            <Settings />
                        </div>
                        {projects.length > 0 && (
                            <div>
                                <h4 className="text-lg">{text}</h4>
                            </div>
                        )}
                        <ProjectList />
                    </div>
                </div>
            </div>
        </>
    );
}
