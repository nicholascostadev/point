import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
    const users = await clerkClient.users.getUserList();

    return new Response(JSON.stringify({ users }), { status: 200 });
}
