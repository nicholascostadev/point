"use client";

import { getFullName } from "@/lib/utils/userRelated";
import { Comment as CommentType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "./comment";

type CommentSectionProps = { projectId: string };

type GetCommentsReturn = {
    comments: (CommentType & {
        author: {
            firstName: string;
            lastName: string;
            publicMetadata: Record<string, string>;
        };
    })[];
};

export function CommentSection({ projectId }: CommentSectionProps) {
    const { data } = useQuery<GetCommentsReturn>({
        queryKey: ["comments", projectId],
        queryFn: async () => {
            return await fetch(`/api/projects/${projectId}/comments`).then(
                (res) => res.json()
            );
        },
    });

    return (
        <div className="space-y-2">
            <h3 className="text-xl">Comments</h3>

            <div className="flex flex-col gap-2">
                {data?.comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={{
                            name: getFullName({
                                firstName: comment.author.firstName,
                                lastName: comment.author.lastName,
                            }),
                            role: comment.author.publicMetadata?.roles.includes(
                                "admin"
                            )
                                ? "Admin"
                                : "Developer",
                        }}
                        content={comment.content}
                    />
                ))}
            </div>
        </div>
    );
}
