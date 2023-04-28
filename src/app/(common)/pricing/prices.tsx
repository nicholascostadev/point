"use client";

import { BackLighting } from "@/components/backLighting";
import { PriceCard } from "./priceCard";
import { useUser } from "@clerk/nextjs";

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

export function Prices() {
    const { isSignedIn } = useUser();
    function handleButtonClick(plan: string) {
        if (isSignedIn) {
            // TODO: Implement Stripe checkout
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
