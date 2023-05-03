"use client";

import { LoadingPage } from "./loadingPage";
import { useUser } from "@clerk/nextjs";
import { Settings } from "./settings";
import { Search } from "./search";
import { ProjectList } from "./projectList";
import { useEffect, useMemo } from "react";
import { useProjectsStore } from "@/app/stores/projectStore";
import { BackLighting } from "@/components/backLighting";
import { LoadingProjects } from "./loadingProjects";
import { useRouter } from "next/navigation";

export default function Page() {
    const { isSignedIn, isLoaded, user } = useUser();
    const projects = useProjectsStore((state) => state.projects);
    const isLoadingPosts = useProjectsStore((state) => state.isLoading);
    const router = useRouter();

    const text = useMemo(() => {
        const project = projects.length > 1 ? "projects" : "project";

        return `You have requested ${projects.length} ${project} in total`;
    }, [projects.length]);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/login");
        }
    }, [isLoaded, projects.length, router, isSignedIn]);

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
        <main className="mt-header-height py-8 min-h-with-header pt-header-height bg-[url('/background-line.svg')]">
            <div className="w-layout-base max-w-full px-2 md:px-8 mx-auto flex flex-col gap-4 relative">
                <BackLighting />
                <h1 className="text-4xl">Dashboard</h1>
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
                    {isLoadingPosts && <LoadingProjects />}
                    <ProjectList />
                </div>
            </div>
        </main>
    );
}
