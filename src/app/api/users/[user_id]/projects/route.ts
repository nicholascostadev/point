import { prisma } from "@/lib/prisma";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { currentUser } from "@clerk/nextjs/app-beta";
import { log } from "next-axiom";
import { z } from "zod";

const urlParamsSchema = z.object({
    user_id: z.string(),
});

type Params = z.infer<typeof urlParamsSchema>;

type RequestParams = {
    params: Params;
};

export async function GET(req: Request, { params }: RequestParams) {
    try {
        const result = urlParamsSchema.safeParse(params);
        const url = new URL(req.url);

        const query = url.searchParams.get("query");
        let status: string | null | undefined = url.searchParams.get("status");
        status === "" ? (status = undefined) : (status = status);

        const user = await currentUser();

        if (!user) {
            return new Response("Unauthorized", { status: 401 });
        }

        if (!result.success) {
            return new Response("Invalid params", { status: 400 });
        }

        const { user_id } = result.data;

        if (user_id !== user.id && !isUserAdmin(user)) {
            return new Response("Unauthorized", { status: 401 });
        }

        const projects = await prisma.project.findMany({
            where: {
                status: status ?? undefined,
                OR: [
                    {
                        author_id: user.id,
                        title: {
                            mode: "insensitive",
                            contains: query ?? undefined,
                        },
                    },
                    {
                        author_id: user.id,
                        description: {
                            mode: "insensitive",
                            contains: query ?? undefined,
                        },
                    },
                ],
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return new Response(JSON.stringify(projects));
    } catch (err) {
        log.error("Error getting projects", { err });
        return new Response("Internal server error", { status: 500 });
    }
}
