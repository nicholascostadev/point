import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { z } from "zod";
import {
    clerkUserIdValidator,
    customerIdValidator,
    planValidator,
    subscriptionIdValidator,
} from "../../validators";

const checkoutBodyValidator = z.object({
    data: z.object({
        object: z.object({
            metadata: z.object({
                clerk_user_id: clerkUserIdValidator,
            }),
            customer: customerIdValidator,
            subscription: subscriptionIdValidator,
        }),
    }),
});

type CheckoutBody = z.infer<typeof checkoutBodyValidator>;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

async function handleCheckoutSessionCompleted(body: CheckoutBody) {
    try {
        const userClerkId = body.data.object.metadata.clerk_user_id;
        const customerId = body.data.object.customer;

        const [subscription] = await Promise.all([
            await stripe.subscriptions.retrieve(body.data.object.subscription),
            await stripe.customers.update(customerId, {
                metadata: {
                    clerk_user_id: userClerkId,
                },
            }),
        ]);

        const price = await stripe.prices.retrieve(
            subscription.items.data[0].plan.id
        );

        const planValidationResult = planValidator.safeParse(
            price.metadata.identifier
        );

        if (!planValidationResult.success) {
            return new Response(
                JSON.stringify({ err: planValidationResult.error }),
                {
                    status: 400,
                }
            );
        }

        const plan = planValidationResult.data;

        await clerkClient.users.updateUserMetadata(userClerkId, {
            publicMetadata: {
                stripe_customer_id: customerId,
                subscription_status: subscription.status,
                subscription_plan: plan,
                subscription_ends_at: subscription.current_period_end * 1000,
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ err }), { status: 400 });
    }
}

export async function POST(req: Request) {
    const body = await req.json();

    if (body.type === "checkout.session.completed") {
        const parsedBody = checkoutBodyValidator.safeParse(body);

        if (!parsedBody.success) {
            console.log(JSON.stringify(parsedBody.error, null, 2));

            return new Response(JSON.stringify({ err: parsedBody.error }), {
                status: 400,
            });
        }

        return handleCheckoutSessionCompleted(parsedBody.data);
    }

    return new Response(JSON.stringify({}), { status: 200 });
}
