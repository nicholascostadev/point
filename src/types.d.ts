import type { User } from "@clerk/nextjs/dist/api";
import type { Project } from "@prisma/client";

export type ProjectWithAuthor = Project & {
    author: User;
    status: ProjectStatus;
};

export type ProjectOverridden = Project & {
    status: ProjectStatus;
};
