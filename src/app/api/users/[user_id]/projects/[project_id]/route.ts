import { clerkUserIdValidator, projectIdValidator } from "@/app/api/validators";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { z } from "zod";

const deleteRequestParams = z.object({
    user_id: clerkUserIdValidator,
    project_id: projectIdValidator,
});

type DeleteParams = z.infer<typeof deleteRequestParams>;

type DeleteRequestParams = {
    params: DeleteParams;
};

export async function DELETE(req: Request, { params }: DeleteRequestParams) {
    const result = deleteRequestParams.safeParse(params);
    const user = await currentUser();

    if (!result.success) {
        return new Response("Invalid params", { status: 400 });
    }

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { user_id, project_id } = result.data;

    if (user_id !== user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.delete({
        where: {
            author_id_id: {
                author_id: user.id,
                id: project_id,
            },
        },
    });

    if (!project) {
        return new Response("Not found", { status: 404 });
    }

    if (project?.author_id !== user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    return new Response("Deleted", { status: 200 });
}
