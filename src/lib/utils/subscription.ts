export function getRemainingProjects(
    plan: string,
    totalProjects: number | undefined = 0
) {
    console.log({ totalProjects, plan });

    switch (plan) {
        case "enterprise":
            return 5 - totalProjects > 0 ? 5 - totalProjects : 0;
            break;
        case "business":
            return 3 - totalProjects > 0 ? 3 - totalProjects : 0;
        default:
            return 1 - totalProjects > 0 ? 1 - totalProjects : 0;
    }
}
