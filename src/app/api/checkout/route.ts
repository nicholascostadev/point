import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

const bodySchema = z.object({
    priceId: z.string().min(1).startsWith("price_"),
    clerk_user_id: z.string().min(1).startsWith("user_"),
});

export async function POST(req: Request) {
    try {
        const parsedBody = bodySchema.safeParse(await req.json());

        if (!parsedBody.success) {
            return new Response(JSON.stringify({ err: parsedBody.error }), {
                status: 400,
            });
        }
        const { priceId, clerk_user_id } = parsedBody.data;

        const user = await clerkClient.users.getUser(clerk_user_id);

        let session;

        if (user && user.publicMetadata.stripe_customer_id) {
            session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    clerk_user_id,
                },
                customer: user.publicMetadata.stripe_customer_id as string,
                subscription_data: {
                    metadata: {
                        clerk_user_id,
                    },
                },
                mode: "subscription",
                success_url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/dashboard?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/dashboard?canceled=true`,
            });
        } else {
            session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    clerk_user_id,
                },
                subscription_data: {
                    metadata: {
                        clerk_user_id,
                    },
                },
                mode: "subscription",
                success_url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/dashboard?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/dashboard?canceled=true`,
            });
        }

        if (!session)
            return new Response(JSON.stringify({ err: "No session" }), {
                status: 400,
            });

        return new Response(JSON.stringify({ checkoutUrl: session.url }), {
            status: 302,
        });
    } catch (err) {
        return new Response(JSON.stringify({ err }), { status: 400 });
    }
}
