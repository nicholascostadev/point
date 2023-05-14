import { prisma } from "@/lib/prisma";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { currentUser } from "@clerk/nextjs/app-beta";
import { z } from "zod";

type Params = {
    params: {
        id: string;
    };
};

export async function POST(req: Request, { params }: Params) {
    const user = await currentUser();

    if (!user) {
        return new Response(JSON.stringify({ err: "Not authorized" }), {
            status: 401,
        });
    }

    if (!isUserAdmin(user)) {
        return new Response(JSON.stringify({ err: "Not authorized" }), {
            status: 401,
        });
    }

    const body = await req.json();

    const bodySchema = z.object({
        comment: z.string().min(1),
    });

    const parsedBody = bodySchema.safeParse(body);

    if (!parsedBody.success) {
        return new Response(JSON.stringify({ err: parsedBody.error }), {
            status: 400,
        });
    }

    const { comment } = parsedBody.data;
    const { id } = params;

    try {
        await prisma.comment.create({
            data: {
                content: comment,
                author_id: user.id,
                project_id: id,
                Project: {
                    connect: {
                        id: id,
                    },
                },
            },
        });
    } catch (err) {
        if (err instanceof Error)
            return new Response(JSON.stringify({ err: err.message }), {
                status: 500,
            });

        return new Response(JSON.stringify({ err: "Unknown error" }), {
            status: 500,
        });
    }
}
