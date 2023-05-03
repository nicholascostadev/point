import { Chevron } from "@/icons/chevron";
import { cl } from "@/lib/utils/cl";

type PriceCardProps = {
    title: string;
    plan: string;
    price: number;
    benefits: string[];
    buttonText: string;
    className?: string;
    onButtonClick?: (plan: string) => void;
};

export function PriceCard({
    title,
    plan,
    price,
    benefits,
    buttonText,
    className,
    onButtonClick,
}: PriceCardProps) {
    function handleClick() {
        onButtonClick?.(plan);
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
            </div>

            <ul className="list-disc px-4 dark:text-gray-100">
                {benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                ))}
            </ul>

            <button
                className="text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group w-full dark:hover:bg-gray-200/5 hover:bg-cyan-200/60 dark:active:bg-gray-400/5 active:bg-cyan-400/60 p-2 rounded-full"
                onClick={handleClick}
            >
                {buttonText}
                <Chevron className="w-6 h-6 dark:fill-gray-200 group-hover:translate-x-2 transition-all" />
            </button>
        </div>
    );
}
