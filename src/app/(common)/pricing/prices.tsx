"use client";

import { BackLighting } from "@/components/backLighting";
import { PriceCard } from "./priceCard";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { prices } from "./pricingData";

const stripeUrlValidator = z
    .string()
    .url()
    .startsWith("https://checkout.stripe.com/c/pay");

const responseValidator = z.object({
    checkoutUrl: stripeUrlValidator,
});

const mappedPlanToPrice = {
    starter: process.env.NEXT_PUBLIC_POINT_STARTER,
    enterprise: process.env.NEXT_PUBLIC_POINT_ENTERPRISE,
    business: process.env.NEXT_PUBLIC_POINT_BUSINESS,
};

export function Prices() {
    const { isSignedIn, user } = useUser();

    async function handleButtonClick(plan: string) {
        if (isSignedIn) {
            // TODO: Implement Stripe checkout
            const data = await fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify({
                    clerk_user_id: user.id,
                    priceId:
                        mappedPlanToPrice[
                            plan as keyof typeof mappedPlanToPrice
                        ],
                }),
            }).then((res) => res.json());

            const validationResult = responseValidator.safeParse(data);

            if (validationResult.success) {
                window.location.href = validationResult.data.checkoutUrl;
                return;
            }

            return;
        }
    }

    return (
        <div className="relative w-full">
            <BackLighting className="blur-[240px] w-1/3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 md:w-fit mx-auto max-w-full z-10 relative">
                {prices.map((price) => (
                    <PriceCard
                        key={price.title}
                        onButtonClick={handleButtonClick}
                        {...price}
                    />
                ))}
            </div>
        </div>
    );
}
