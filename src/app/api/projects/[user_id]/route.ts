import { prisma } from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";
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

    if (!result.success) {
        return new Response("Invalid params", { status: 400 });
    }

    const { user_id } = result.data;

    const projects = await prisma.project.findMany({
        where: {
            author_id: user_id,
        },
    });

    return new Response(JSON.stringify(projects));
}
