import { z } from "zod";

export const subscriptionStatusSchema = z.union([
    z.literal("active"),
    z.literal("canceled"),
    z.literal("incomplete"),
    z.literal("incomplete_expired"),
    z.literal("past_due"),
    z.literal("trialing"),
    z.literal("unpaid"),
]);

export const subscriptionSchema = z.union([
    z.literal("starter"),
    z.literal("business"),
    z.literal("enterprise"),
]);

// the order here matters, it's used to check which plan is higher
export const subscriptionPlans = ["starter", "business", "enterprise"] as const;

// this constants may change in the future so we keep them here.
const STARTER_MAXIMUM_PROJECTS = 1;
const BUSINESS_MAXIMUM_PROJECTS = 2;
const ENTERPRISE_MAXIMUM_PROJECTS = 3;

export type SubscriptionPlan = (typeof subscriptionPlans)[number];

export function getRemainingProjects(
    plan: SubscriptionPlan = "starter",
    totalProjects: number | undefined = 0
) {
    switch (plan) {
        case "enterprise":
            return ENTERPRISE_MAXIMUM_PROJECTS - totalProjects > 0
                ? ENTERPRISE_MAXIMUM_PROJECTS - totalProjects
                : 0;
        case "business":
            return BUSINESS_MAXIMUM_PROJECTS - totalProjects > 0
                ? BUSINESS_MAXIMUM_PROJECTS - totalProjects
                : 0;
        default:
            return STARTER_MAXIMUM_PROJECTS - totalProjects > 0
                ? STARTER_MAXIMUM_PROJECTS - totalProjects
                : 0;
    }
}
