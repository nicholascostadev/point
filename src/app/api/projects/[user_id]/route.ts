import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { z } from "zod";

const urlParamsSchema = z.object({
    user_id: z.string(),
});

type Params = z.infer<typeof urlParamsSchema>;

type RequestParams = {
    params: Params;
};

export async function GET(req: Request, { params }: RequestParams) {
    const result = urlParamsSchema.safeParse(params);
    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!result.success) {
        return new Response("Invalid params", { status: 400 });
    }

    const { user_id } = result.data;

    if (user_id !== user.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    const projects = await prisma.project.findMany({
        where: {
            author_id: user.id,
        },
    });

    return new Response(JSON.stringify(projects));
}
