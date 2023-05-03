export function getRemainingProjects(
    plan: string,
    totalProjects: number | undefined = 0
) {
    switch (plan) {
        case "enterprise":
            return Math.max(Math.abs(totalProjects - 5), 0);
            break;
        case "business":
            return Math.max(Math.abs(totalProjects - 3), 0);
        default:
            return Math.max(Math.abs(totalProjects - 1), 0);
    }
}
