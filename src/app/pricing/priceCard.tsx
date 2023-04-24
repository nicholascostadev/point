import { Chevron } from "@/icons/chevron";
import { cl } from "@/utils/cl";

type PriceCardProps = {
    title: string;
    price: number;
    benefits: string[];
    buttonText: string;
    className?: string;
    onButtonClick?: (title: string) => void;
};

export function PriceCard({
    title,
    price,
    benefits,
    buttonText,
    className,
    onButtonClick,
}: PriceCardProps) {
    function handleClick() {
        onButtonClick?.(title);
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
                className="flex justify-center items-center gap-2 w-full my-4 text-lg group dark:hover:text-green-400 transition-colors"
                onClick={handleClick}
            >
                {buttonText}{" "}
                <Chevron className="w-6 h-6 fill-gray-200 group-hover:translate-x-1 transition-all dark:group-hover:fill-green-400" />
            </button>
        </div>
    );
}
