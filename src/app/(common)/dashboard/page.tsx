"use client";

import { LoadingPage } from "./loadingPage";
import { useSession } from "@clerk/nextjs";
import { Settings } from "./settings";
import { Search } from "./search";
import { ProjectList } from "./projectList";

export default function Page() {
    const { isSignedIn, isLoaded } = useSession();

    if (!isLoaded) {
        return <LoadingPage />;
    }

    if (!isSignedIn) {
        return (
            <main className="mt-header-height py-8">
                <div className="w-layout-base px-2 md:px-8 mx-auto flex flex-col gap-4">
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
        <main className="mt-header-height py-8">
            <div className="w-layout-base px-2 md:px-8 mx-auto flex flex-col gap-4">
                <h1 className="text-4xl">Dashboard</h1>
                <p className="text-lg">
                    Check the progress of the projects you&apos;ve requested
                </p>
                <div className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col gap-8">
                        <Search />
                        <Settings />
                    </div>

                    <ProjectList />
                </div>
            </div>
        </main>
    );
}
