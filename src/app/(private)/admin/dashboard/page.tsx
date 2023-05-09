import { prisma } from "@/lib/prisma";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProjectsTable } from "./projectsTable";
import { UsersTable } from "./usersTable";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/login");
    }

    if (!isUserAdmin(user)) {
        redirect("/dashboard");
    }

    const projects = await prisma.project.findMany({
        orderBy: {
            created_at: "desc",
        },
    });

    const projectsWithAuthor = await Promise.all(
        projects.map(async (proj) => {
            const author = await clerkClient.users.getUser(proj.author_id);

            return {
                ...proj,
                author: {
                    ...author,
                },
            };
        })
    );

    return (
        <div className="flex flex-col gap-6 pt-16 mt-header-height w-layout-base mx-auto max-w-full px-2 md:px-8">
            <h1 className="text-5xl">Dashboard</h1>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl">All Users</h2>
                    <Suspense
                        fallback={<Loader2 className="w-8 h-8 animate-spin" />}
                    >
                        {/* @ts-expect-error Server Component  */}
                        <UsersTable />
                    </Suspense>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl">All Projects</h2>

                    <Suspense
                        fallback={<Loader2 className="w-8 h-8 animate-spin" />}
                    >
                        <ProjectsTable projects={projectsWithAuthor} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
