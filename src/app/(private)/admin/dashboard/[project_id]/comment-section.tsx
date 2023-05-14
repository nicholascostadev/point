import { getFullName } from "@/lib/utils/userRelated";
import type { Comment as CommentType } from "@prisma/client";
import { Comment } from "./comment";
import { CommentForm } from "./comment-form";

type CommentSectionProps = {
    projectId: string;
    comments: (CommentType & {
        author: {
            firstName: string | null;
            lastName: string | null;
            publicMetadata: Record<string, unknown>;
        };
    })[];
};

export function CommentSection({ projectId, comments }: CommentSectionProps) {
    return (
        <div className="space-y-2">
            <h3 className="text-xl">Comments</h3>

            <CommentForm projectId={projectId} />
            <div className="flex flex-col gap-2">
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        user={{
                            name: getFullName({
                                firstName: comment.author.firstName,
                                lastName: comment.author.lastName,
                            }),
                            role: "Developer",
                        }}
                        content={comment.content}
                    />
                ))}
            </div>
        </div>
    );
}
