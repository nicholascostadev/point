"use client";

import { PriceCard } from "./priceCard";

const prices = [
    {
        title: "Starter",
        price: 25,
        benefits: ["Support 24/7", "3 maintenances/mo", "email support"],
        className: "bg-gray-800 h-[420px] max-h-full w-full md:w-auto",
        buttonText: "Get Started",
    },
    {
        title: "Business",
        price: 255,
        benefits: [
            "Support 24/7",
            "3 maintenances/mo",
            "priority support",
            "email or direct chat support",
        ],
        className:
            "dark:bg-gray-700/10 backdrop-blur-sm h-[550px] max-h-full border dark:border-gray-200/10 w-full md:w-auto",
        buttonText: "Contact us",
    },
    {
        title: "Startup Helper",
        price: 125,
        benefits: [
            "Support 24/7",
            "3 maintenances/mo",
            "priority support",
            "email support",
        ],
        className: "dark:bg-gray-900 h-[420px] max-h-full w-full md:w-auto",
        buttonText: "Get Started",
    },
];

export function Prices() {
    function handleButtonClick(title: string) {
        if (title !== prices[1].title) {
            // TODO: Implement Stripe checkout
            return;
        }

        // TODO: Implement contact form
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4 w-full md:w-auto">
            {prices.map((price) => (
                <PriceCard
                    key={price.title}
                    onButtonClick={handleButtonClick}
                    {...price}
                />
            ))}
        </div>
    );
}
