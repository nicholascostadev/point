import { User } from "@clerk/nextjs/dist/api";
import { z } from "zod";

export function isUserAdmin(user: User) {
    const rolesSchema = z.array(z.string());

    const parseResult = rolesSchema.safeParse(user.publicMetadata.roles);

    if (!parseResult.success) return false;

    const { data: roles } = parseResult;

    return roles.includes("admin");
}
