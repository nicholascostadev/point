import {
    SubscriptionPlan,
    SubscriptionStatus,
    subscriptionSchema,
    subscriptionStatusSchema,
} from "@/lib/utils/subscription";
import { useUser } from "@clerk/nextjs";

export function useUserSubscriptionStatus(): SubscriptionStatus {
    const { user } = useUser();

    const subscriptionPlan = user?.publicMetadata.subscription_plan;

    const subscriptionValidationResult =
        subscriptionStatusSchema.safeParse(subscriptionPlan);

    if (!subscriptionValidationResult.success) {
        return "canceled";
    }

    return subscriptionValidationResult.data;
}

export function useUserPlan(): SubscriptionPlan {
    const { user } = useUser();

    const subscriptionPlan = user?.publicMetadata?.subscription_plan;

    const subscriptionPlanValidationResult =
        subscriptionSchema.safeParse(subscriptionPlan);

    if (!subscriptionPlanValidationResult.success) {
        return "starter";
    }

    return subscriptionPlanValidationResult.data;
}
