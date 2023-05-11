import { Prices } from "./prices";

export default function Pricing() {
    return (
        <div className="flex flex-col items-center gap-16 bg-[url('/background-line.svg')] bg-no-repeat px-2 pt-32 md:px-8">
            <div className="flex w-full flex-col items-center gap-2 overflow-x-hidden">
                <h1 className="text-center text-4xl dark:text-gray-100">
                    Pricing
                </h1>
                <p className="text-center text-xl dark:text-gray-200">
                    Check our available plans, there will always be one for you.
                </p>
            </div>
            <Prices />
        </div>
    );
}
