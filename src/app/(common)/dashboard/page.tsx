"use client";

import { BackLighting } from "@/components/backLighting";
import { getUserPlan } from "@/lib/utils/subscription";
import { useProjectsStore } from "@/stores/projectStore";
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";
import { LoadingPage } from "./loadingPage";
import { ProjectList } from "./projectList";
import { Search } from "./search";
import { Settings } from "./settings";

export default function Page() {
    const { user, isSignedIn, isLoaded } = useUser();
    const projects = useProjectsStore((state) => state.projects);

    const text = useMemo(() => {
        const project = projects.length > 1 ? "projects" : "project";

        return `You have requested ${projects.length} ${project} in total`;
    }, [projects.length]);

    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (!isSignedIn) {
        return (
            <main className="mt-header-height py-8 min-h-with-header pt-header-height bg-[url('/background-line.svg')]">
                <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4 relative">
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
        <main className="mt-header-height py-8 min-h-with-header pt-header-height dark:bg-[url('/background-line.svg')]">
            <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4 relative">
                <BackLighting className="dark:bg-conic-gradient bg-none" />
                <div className="flex gap-2 items-end">
                    <h1 className="text-4xl">Dashboard</h1>
                    <span className="text-4xl">-</span>
                    <p className="text-2xl">
                        Current plan:{" "}
                        <span className="text-cyan-600 dark:text-cyan-400 uppercase">
                            {getUserPlan(user)}
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
        </main>
    );
}
