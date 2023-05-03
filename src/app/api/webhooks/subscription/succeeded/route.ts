import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const urlToGetPaidUser =
            body.data.relationships.subscription.links.related;

        const getUserResponse = await fetch(urlToGetPaidUser, {
            headers: {
                Accept: "application/vnd.api+json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
            },
        });

        const getUserData = await getUserResponse.json();

        const email = getUserData.data.attributes.user_email;

        const users = await clerkClient.users.getUserList({
            emailAddress: email,
        });
        const user = users[0];

        const updatedUser = await clerkClient.users.updateUser(user.id, {
            externalId: getUserData.data.attributes.customer_id,
            publicMetadata: {
                lemon_squeezy_customer_id:
                    getUserData.data.attributes.customer_id,
                subscription_id: getUserData.data.attributes.product_id,
                subscription_variant_id: getUserData.data.attributes.variant_id,
                subscription_ends_at: getUserData.data.attributes.ends_at,
                subscription_renews_at: getUserData.data.attributes.renews_at,
            },
        });

        return new Response(JSON.stringify({ updatedUser }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ err }), { status: 400 });
    }
}
