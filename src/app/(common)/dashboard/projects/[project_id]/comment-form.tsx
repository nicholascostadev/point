"use client";

import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

type CommentFormProps = {
    projectId: string;
};

export function CommentForm({ projectId }: CommentFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { mutateAsync: postComment } = useMutation({
        mutationFn: async () => {
            await fetch(`/api/projects/${projectId}/comments`, {
                method: "POST",
                body: JSON.stringify({
                    comment: textareaRef.current?.value,
                }),
            });
        },
        onSuccess: () => {
            window.location.reload();
        },
    });

    async function handleAddComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const comment = textareaRef.current?.value;

        if (!comment) {
            return;
        }

        await postComment();
    }

    return (
        <form
            className="flex flex-col items-end gap-2"
            onSubmit={handleAddComment}
        >
            <textarea
                ref={textareaRef}
                rows={4}
                className="w-full rounded-md"
            />
            <button className="rounded-md px-2 py-1">Submit comment</button>
        </form>
    );
}
