import { clerkUserIdValidator, projectIdValidator } from "@/app/api/validators";
import { prisma } from "@/lib/prisma";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { descriptionSchema, nameSchema } from "@/validations";
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

    if (user_id !== user.id && !isUserAdmin(user)) {
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

const updateSchema = {
    name: nameSchema.optional(),
    description: descriptionSchema.optional(),
};

type UpdateProjectParams = {
    params: {
        user_id: string;
        project_id: string;
    };
};

export async function PATCH(req: Request, { params }: UpdateProjectParams) {
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (params.user_id !== user.id && !isUserAdmin(user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parsedBody = z.object(updateSchema).safeParse(body);

    if (!parsedBody.success) {
        console.log(parsedBody.error);
        return new Response(
            JSON.stringify({
                error: "Invalid body",
            }),
            { status: 400 }
        );
    }

    const { name, description } = parsedBody.data;
    const id = params.project_id;

    const project = await prisma.project.findFirst({
        where: {
            id,
            author_id: user.id,
        },
    });

    if (!project) {
        return new Response(
            JSON.stringify({
                error: "Project not found",
            }),
            { status: 404 }
        );
    }

    await prisma.project.update({
        where: {
            id,
        },
        data: {
            title: name,
            description,
        },
    });

    return new Response(
        JSON.stringify({
            message: "Project updated",
        }),
        { status: 200 }
    );
}
