import { z } from "zod";

export function isUserAdmin(user: any) {
    const rolesSchema = z.array(z.string());

    const parseResult = rolesSchema.safeParse(user?.publicMetadata?.roles);

    if (!parseResult.success) return false;

    const { data: roles } = parseResult;

    return roles.includes("admin");
}

export const isOnAdminRoute = (pathname: string) => {
    return pathname.includes("/admin");
};

type GetFullNameProps = {
    firstName: string | null;
    lastName: string | null;
};

export function getFullName({ firstName, lastName }: GetFullNameProps) {
    return `${firstName || ""} ${lastName || ""}`.trim();
}
