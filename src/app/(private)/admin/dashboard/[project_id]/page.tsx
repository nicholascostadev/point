import { prisma } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { isUserAdmin } from "@/lib/utils/userRelated";
import { CommentSection } from "./comment-section";
import { ProjectInfo } from "./project-info";

type ProjectPageProps = {
    params: {
        project_id: string;
    };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
    const user = await currentUser();

    if (!user) {
        return redirect("/dashboard");
    }

    if (!isUserAdmin(user)) {
        return redirect("/dashboard");
    }

    const project = await prisma.project.findUnique({
        where: {
            id: params.project_id,
        },
        include: {
            comments: true,
        },
    });

    if (!project) {
        return (
            <div className="mx-auto w-layout-base max-w-full px-2 pt-32 md:px-8">
                Project Not Found
            </div>
        );
    }

    const commentsWithAuthor = await Promise.all(
        project.comments.map(async (comment) => {
            const author = await clerkClient.users.getUser(comment.author_id);

            return {
                ...comment,
                author: {
                    ...author,
                },
            };
        })
    );

    return (
        <div className="mx-auto flex w-layout-base max-w-full flex-col items-start justify-start gap-6 px-2 pb-12 pt-32 md:px-8">
            <Link
                href="/dashboard"
                className="dark:hover:text-gray-400"
                aria-label="Go back to dashboard"
            >
                <ArrowLeft />
            </Link>
            <div className="flex w-full flex-col items-center justify-center gap-1">
                <div className="flex w-full flex-col gap-4 rounded-md border border-gray-100 p-2 shadow-md dark:border-gray-900 lg:w-2/3">
                    <ProjectInfo
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        status={project.status}
                    />
                    <CommentSection
                        comments={commentsWithAuthor}
                        projectId={project.id}
                    />
                </div>
            </div>
        </div>
    );
}
