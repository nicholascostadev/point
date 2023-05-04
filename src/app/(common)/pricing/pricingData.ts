export const prices = [
    {
        title: "Starter",
        plan: "starter",
        description:
            "Ideal if you already have a project but need maintainers to help you with it.",
        price: 75,
        benefits: [
            "Support 24/7",
            "1 project maintenance p/mo",
            "Email support",
        ],
        className:
            "dark:bg-gray-800 bg-gray-50 h-[420px] max-h-full w-full md:w-auto border border-gray-400/20",
        buttonText: "Get Started",
        highlighted: true,
    },
    {
        title: "Enterprise",
        plan: "enterprise",
        description:
            "Ideal if you already have a project and need maintainers to help you with it or have some ideas for future projects. Our team will help you maintain and build it from the ground up.",
        price: 225,
        benefits: [
            "Support 24/7",
            "3 project maintenance + development p/mo",
            "Priority support",
            "Email or direct chat support",
        ],
        className:
            "dark:bg-gray-900/60 bg-gray-200/60 backdrop-blur-md h-[550px] max-h-full border border-gray-400/20 w-full md:w-auto",
        buttonText: "Get Started",
        highlighted: true,
    },
    {
        title: "Business",
        plan: "business",
        description:
            "Ideal if you already have a project but need maintainers to help you with it. You will receive 1 bonus for a project development per month from the ground up.",
        price: 120,
        benefits: [
            "Support 24/7",
            "2 project maintenance + development p/mo",
            "Priority support",
            "Email support",
        ],
        className:
            "dark:bg-gray-900 bg-gray-100 h-[420px] max-h-full w-full md:w-auto border border-gray-400/20",
        buttonText: "Get Started",
        highlighted: false,
    },
] as const;

export type Price = (typeof prices)[number];
