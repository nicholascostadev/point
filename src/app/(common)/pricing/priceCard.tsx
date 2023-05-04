"use client";

import { cl } from "@/lib/utils/cl";
import { ChevronDown, ChevronUp, LayoutDashboard } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { PopoverArrow } from "@radix-ui/react-popover";
import { useUser } from "@clerk/nextjs";
import { SubscriptionPlan, subscriptionPlans } from "@/lib/utils/subscription";
import { useMemo } from "react";
import { Price } from "./pricingData";
import Link from "next/link";
import { toast } from "react-hot-toast";

type PriceCardProps = {
    className?: string;
    onButtonClick: (plan: string) => void;
} & Price;

export function PriceCard({
    title,
    plan,
    description,
    price,
    benefits,
    buttonText,
    highlighted,
    className,
    onButtonClick,
}: PriceCardProps) {
    const { user, isLoaded, isSignedIn } = useUser();

    const subscriptionPlan = user?.publicMetadata.subscription_plan;

    const isCurrentUserPlan = useMemo(() => {
        if (!isLoaded || !isSignedIn) return false;

        return subscriptionPlan === plan;
    }, [isSignedIn, isLoaded, plan, subscriptionPlan]);

    const downgradeOrUpgrade = useMemo(() => {
        if (!isLoaded || !isSignedIn) return buttonText;

        if (
            subscriptionPlans.indexOf(subscriptionPlan as SubscriptionPlan) ===
            -1
        )
            return "Get Started";

        if (
            subscriptionPlans.indexOf(plan) <
            subscriptionPlans.indexOf(subscriptionPlan as SubscriptionPlan)
        ) {
            return "Downgrade";
        }

        return "Upgrade";
    }, [buttonText, isSignedIn, isLoaded, plan, subscriptionPlan]);

    const textForButton = isCurrentUserPlan ? "Dashboard" : downgradeOrUpgrade;

    function handleClick() {
        if(textForButton !== 'Get Started') {
            toast.error("Sorry, we're not able to change your plan at this time.")
            return
        }

        onButtonClick(plan);
    }

   

    return (
        <div
            className={cl(
                "flex flex-col gap-6 justify-center items-start w-[260px] max-w-full rounded-2xl p-4",
                className
            )}
        >
            <div className="flex flex-col font-semibold gap-1">
                <h3 className="text-3xl dark:text-gray-100">{title}</h3>
                <div>
                    <p className="text-xl dark:text-gray-100">
                        starts at $<strong>{price}</strong>/mo
                    </p>
                    <p>+ requirements from project</p>
                </div>
                <div className="pt-2">
                    <Popover>
                        <PopoverTrigger className="hover:bg-transparent dark:hover:bg-transparent text-blue-600 dark:text-blue-600">
                            Is it for me?
                        </PopoverTrigger>
                        <PopoverContent className="focus:ring-0 text-gray-950 dark:text-gray-200 bg-gray-200 dark:bg-gray-950">
                            {description}
                            <PopoverArrow className="fill-gray-950 dark:fill-gray-950" />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <ul className="list-disc px-4 dark:text-gray-100">
                {benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                ))}
            </ul>

            {/* TODO: Refactor this, basing on the text is **REALLY** bad */}
            {textForButton === "Get Started" ? (
                isSignedIn ? (
                    <button
                        className="text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group w-full dark:hover:bg-gray-200/5 hover:bg-cyan-200/60 dark:active:bg-gray-400/5 active:bg-cyan-400/60 p-2 rounded-full"
                        onClick={handleClick}
                    >
                        {textForButton}
                    </button>
                ) : (
                    <Link
                        className="text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group w-full dark:hover:bg-gray-200/5 hover:bg-cyan-200/60 dark:active:bg-gray-400/5 active:bg-cyan-400/60 p-2 rounded-full"
                        href="/login"
                    >
                        {textForButton}
                        <LayoutDashboard className="w-6 h-6" />
                    </Link>
                )
            ) : textForButton !== "Downgrade" && textForButton !== "Upgrade" ? (
                <Link
                    className="text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group w-full dark:hover:bg-gray-200/5 hover:bg-cyan-200/60 dark:active:bg-gray-400/5 active:bg-cyan-400/60 p-2 rounded-full"
                    href="/dashboard"
                >
                    {textForButton}
                    <LayoutDashboard className="w-6 h-6" />
                </Link>
            ) : (
                <button
                    className="text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group w-full dark:hover:bg-gray-200/5 hover:bg-cyan-200/60 dark:active:bg-gray-400/5 active:bg-cyan-400/60 p-2 rounded-full"
                    onClick={handleClick}
                >
                    {textForButton}
                    {textForButton === "Downgrade" && (
                        <ChevronDown className="w-6 h-6 animate-bounce transition-all" />
                    )}
                    {textForButton === "Upgrade" && (
                        <ChevronUp className="w-6 h-6 animate-bounce transition-all" />
                    )}
                </button>
            )}
        </div>
    );
}
