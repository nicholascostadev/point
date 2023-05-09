import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { z } from "zod";
import {
    clerkUserIdValidator,
    customerIdValidator,
    paymentIntentIdValidator,
    planValidator,
    subscriptionIdValidator,
} from "../../validators";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
});

const subscriptionUpdatedBodySchema = z.object({
    data: z.object({
        object: z.object({
            id: subscriptionIdValidator,
            metadata: z.object({
                clerk_user_id: clerkUserIdValidator,
            }),
            customer: customerIdValidator,
            subscription: subscriptionIdValidator,
            plan: z.object({
                metadata: z.object({
                    identifier: z.string().min(1).startsWith("plan-"),
                }),
            }),
            current_period_end: z.number(),
            current_period_start: z.number(),
        }),
    }),
});

type SubscriptionUpdatedBody = z.infer<typeof subscriptionUpdatedBodySchema>;

async function handleSubscriptionUpdated(body: SubscriptionUpdatedBody) {
    const subscription = await stripe.subscriptions.retrieve(
        body.data.object.id
    );

    if (!subscription) {
        return new Response(JSON.stringify({ err: "Subscription not found" }), {
            status: 404,
        });
    }

    await clerkClient.users.updateUserMetadata(
        body.data.object.metadata.clerk_user_id,
        {
            publicMetadata: {
                subscription_ends_at:
                    body.data.object.current_period_end * 1000,
                subscription_status: subscription.status,
            },
        }
    );
}

const paymentIntentSucceededBody = z.object({
    data: z.object({
        object: z.object({
            id: paymentIntentIdValidator,
            customer: customerIdValidator,
            client_secret: paymentIntentIdValidator,
        }),
    }),
});

type PaymentIntentSucceededBody = z.infer<typeof paymentIntentSucceededBody>;

async function handlePaymentIntentSucceeded(body: PaymentIntentSucceededBody) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
        body.data.object.id
    );

    if (!paymentIntent) {
        return new Response(
            JSON.stringify({ err: "Payment intent not found" }),
            {
                status: 404,
            }
        );
    }

    if (!paymentIntent.invoice) {
        return new Response(
            JSON.stringify({ err: "Payment intent has no invoice" }),
            {
                status: 404,
            }
        );
    }

    const invoice = await stripe.invoices.retrieve(
        paymentIntent.invoice.toString()
    );

    if (!invoice?.metadata || !invoice.subscription) {
        return new Response(JSON.stringify({ err: "Invalid request" }), {
            status: 404,
        });
    }

    const userClerkId = invoice.lines.data[0].metadata.clerk_user_id;

    const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription.toString()
    );

    const planResult = planValidator.safeParse(
        subscription.items.data[0].plan.metadata?.identifier
    );

    if (!planResult.success) {
        return new Response(JSON.stringify({ err: planResult.error }), {
            status: 400,
        });
    }

    const plan = planResult.data;

    await clerkClient.users.updateUserMetadata(userClerkId, {
        publicMetadata: {
            stripe_customer_id: subscription.customer.toString(),
            subscription_status: subscription.status,
            subscription_plan: plan,
            subscription_ends_at: subscription.current_period_end * 1000,
        },
    });

    return new Response(JSON.stringify({}), { status: 200 });
}

const subscriptionDeletedSchema = z.object({
    data: z.object({
        object: z.object({
            id: subscriptionIdValidator,
        }),
    }),
});

type SubscriptionDeleted = z.infer<typeof subscriptionDeletedSchema>;

async function handleSubscriptionDeleted(body: SubscriptionDeleted) {
    const subscription = await stripe.subscriptions.retrieve(
        body.data.object.id
    );

    if (!subscription) {
        return new Response(JSON.stringify({ err: "Subscription not found" }), {
            status: 404,
        });
    }

    await clerkClient.users.updateUserMetadata(
        subscription.metadata.clerk_user_id,
        {
            publicMetadata: {
                subscription_ends_at: null,
                subscription_status: subscription.status,
                subscription_plan: null,
            },
        }
    );
}

export async function POST(req: Request) {
    const body = await req.json();

    if (body.type === "payment_intent.succeeded") {
        const parsedBody = paymentIntentSucceededBody.safeParse(body);

        if (!parsedBody.success) {
            return new Response(JSON.stringify({ err: parsedBody.error }), {
                status: 400,
            });
        }

        return handlePaymentIntentSucceeded(parsedBody.data);
    }

    if (body.type === "customer.subscription.updated") {
        const parsedBody = subscriptionUpdatedBodySchema.safeParse(body);

        if (!parsedBody.success) {
            return new Response(JSON.stringify({ err: parsedBody.error }), {
                status: 400,
            });
        }

        return handleSubscriptionUpdated(parsedBody.data);
    }

    if (body.type === "customer.subscription.deleted") {
        const parsedBody = subscriptionDeletedSchema.safeParse(body);

        if (!parsedBody.success) {
            return new Response(JSON.stringify({ err: parsedBody.error }), {
                status: 400,
            });
        }

        return handleSubscriptionDeleted(parsedBody.data);
    }

    return new Response(JSON.stringify({}), { status: 200 });
}
