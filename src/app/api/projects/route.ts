import { prisma } from "@/lib/prisma";
import {
    getRemainingProjects,
    subscriptionSchema,
} from "@/lib/utils/subscription";
import { descriptionSchema, nameSchema } from "@/validations";
import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
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

    const userProjectsLength = await prisma.project.count({
        where: {
            author_id: user.id,
        },
    });

    const subscriptionResult = subscriptionSchema.safeParse(
        user.publicMetadata.subscription_plan
    );

    if (!subscriptionResult.success) {
        await clerkClient.users.updateUserMetadata(user.id, {
            publicMetadata: {},
        });

        return new Response(
            JSON.stringify({
                error: "Unauthorized",
            }),
            { status: 401 }
        );
    }

    const userSubscription = subscriptionResult.data;

    if (getRemainingProjects(userSubscription, userProjectsLength) <= 0) {
        return new Response(
            JSON.stringify({
                error: "You have reached the maximum number of projects",
            }),
            { status: 401 }
        );
    }

    const parsedBody = requestBodySchema.safeParse(body);

    if (!parsedBody.success) {
        return new Response(
            JSON.stringify({
                error: "Invalid body",
            }),
            { status: 400 }
        );
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

    return new Response(
        JSON.stringify({
            message: "Project created",
        }),
        { status: 201 }
    );
}
