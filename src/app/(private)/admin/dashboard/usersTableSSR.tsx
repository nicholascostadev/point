import { clerkClient } from "@clerk/nextjs/server";
import { UsersTable } from "./usersTable";

export async function UsersTableSSR() {
    const users = await clerkClient.users.getUserList();

    return <UsersTable users={users} />;
}
