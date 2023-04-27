"use client";

import { LoadingPage } from "./loadingPage";
import { useSession, useUser } from "@clerk/nextjs";
import { Settings } from "./settings";
import { Search } from "./search";
import { ProjectList } from "./projectList";
import { Suspense, useMemo } from "react";
import { useProjectsStore } from "@/app/stores/projectStore";

export default function Page() {
    const { isSignedIn, isLoaded, user } = useUser();
    const projects = useProjectsStore((state) => state.projects);

    const text = useMemo(() => {
        const project = projects.length > 1 ? "projects" : "project";

        return `You have requested ${projects.length} ${project} in total`;
    }, [projects.length]);

    if (!isLoaded && projects.length <= 0) {
        return <LoadingPage />;
    }

    if (!isSignedIn) {
        return (
            <main className="mt-header-height py-8 min-h-with-header bg-[url('/background-line.svg')]">
                <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4">
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
        <main className="mt-header-height py-8 min-h-with-header pt-header-height bg-[url('/background-line.svg')]">
            <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4 relative">
                <div className="absolute inset-0 m-auto bg-conic-gradient blur-[360px] w-1/2 h-1/2"></div>
                <h1 className="text-4xl">Dashboard</h1>
                <p className="text-lg">
                    Check the progress of the projects you&apos;ve requested
                </p>
                <div className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-8">
                        <Search />
                        <Settings />
                    </div>
                    <div>
                        <h4 className="text-lg">{text}</h4>
                    </div>
                    <Suspense fallback={"Loading..."}>
                        <ProjectList user={user} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
