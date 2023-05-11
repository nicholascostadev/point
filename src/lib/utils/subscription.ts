import { z } from "zod";

export const subscriptionStatusSchema = z.enum([
    "active",
    "canceled",
    "incomplete",
    "incomplete_expired",
    "past_due",
    "trialing",
    "unpaid",
]);

// the order here matters, it's used to check which plan is higher
export const subscriptionPlans = ["starter", "business", "enterprise"] as const;

export const subscriptionSchema = z.enum(subscriptionPlans);

// this constants may change in the future so we keep them here.
const STARTER_MAXIMUM_PROJECTS = 1;
const BUSINESS_MAXIMUM_PROJECTS = 2;
const ENTERPRISE_MAXIMUM_PROJECTS = 3;

export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
export type SubscriptionPlan = (typeof subscriptionPlans)[number];

export function getRemainingProjects(
    plan?: SubscriptionPlan,
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
        case "starter":
            return STARTER_MAXIMUM_PROJECTS - totalProjects > 0
                ? STARTER_MAXIMUM_PROJECTS - totalProjects
                : 0;
        default:
            return 0;
    }
}
