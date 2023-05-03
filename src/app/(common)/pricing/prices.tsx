"use client";

import { BackLighting } from "@/components/backLighting";
import { PriceCard } from "./priceCard";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";

const prices = [
    {
        title: "Starter",
        plan: "starter",
        price: 25,
        benefits: ["Support 24/7", "2 maintenances/mo", "Email support"],
        className:
            "dark:bg-gray-800 bg-gray-50 h-[420px] max-h-full w-full md:w-auto border border-gray-400/20",
        buttonText: "Get Started",
    },
    {
        title: "Enterprise",
        plan: "enterprise",
        price: 255,
        benefits: [
            "Support 24/7",
            "Full availability",
            "Priority support",
            "Email or direct chat support",
        ],
        className:
            "dark:bg-gray-900/60 bg-gray-200/60 backdrop-blur-md h-[550px] max-h-full border border-gray-400/20 w-full md:w-auto",
        buttonText: "Contact us",
    },
    {
        title: "Business",
        plan: "business",
        price: 125,
        benefits: [
            "Support 24/7",
            "8 maintenances/mo",
            "Priority support",
            "Email support",
        ],
        className:
            "dark:bg-gray-900 bg-gray-100 h-[420px] max-h-full w-full md:w-auto border border-gray-400/20",
        buttonText: "Get Started",
    },
];

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
        console.log(mappedPlanToPrice[plan as keyof typeof mappedPlanToPrice]);

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
