import { projectStatusSchema } from "@/lib/utils/projectRelated";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { descriptionSchema, titleSchema } from "@/validations";
import { currentUser } from "@clerk/nextjs/app-beta";
import { z } from "zod";
import { projectIdValidator } from "../../validators";

const deleteRequestParams = z.object({
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

    if (!isUserAdmin(user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { project_id } = result.data;

    try {
        const project = await prisma.project.delete({
            where: {
                id: project_id,
            },
        });

        if (!project) {
            return new Response("Not found", { status: 404 });
        }

        return new Response("Deleted", { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Something went wrong",
            }),
            { status: 500 }
        );
    }
}

type PatchParams = {
    params: {
        id: string;
    };
};

const updateProjectSchema = z.object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    status: projectStatusSchema.optional(),
});

export async function PATCH(req: Request, { params }: PatchParams) {
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!isUserAdmin(user)) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const parsedBody = updateProjectSchema.safeParse(body);

    if (!parsedBody.success) {
        return new Response(
            JSON.stringify({
                error: "Invalid body",
            }),
            { status: 400 }
        );
    }

    const { title, description, status } = parsedBody.data;

    const id = params.id;

    const project = await prisma.project.findFirst({
        where: {
            id,
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

    try {
        await prisma.project.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                status,
            },
        });

        return new Response(
            JSON.stringify({
                message: "Project updated",
            }),
            { status: 200 }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({
                error: "Something went wrong",
            }),
            {
                status: 500,
            }
        );
    }
}
