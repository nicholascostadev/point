import { prisma } from "@/lib/prisma";
import { descriptionSchema, nameSchema } from "@/validations";
import { currentUser } from "@clerk/nextjs/app-beta";
import { z } from "zod";

const requestBodySchema = z.object({
    name: nameSchema,
    description: descriptionSchema,
});

export async function POST(req: Request) {
    const user = await currentUser();
    const body = await req.json();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const parsedBody = requestBodySchema.safeParse(body);

    if (!parsedBody.success) {
        return new Response("Invalid body", { status: 400 });
    }

    const { name, description } = parsedBody.data;

    await prisma.project.create({
        data: {
            title: name,
            description,
            author_email: user.emailAddresses[0].emailAddress,
            author_id: user.id,
        },
    });

    return new Response("OK", { status: 201 });
}
