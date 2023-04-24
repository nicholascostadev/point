import { Prices } from "./prices";

export default function Pricing() {
    return (
        <main className="flex flex-col items-center gap-16 px-4 py-[76px] bg-[url('/background-line.svg')] bg-no-repeat">
            <div className="flex flex-col items-center gap-2 w-full">
                <h1 className="text-4xl text-center dark:text-gray-100">
                    Pricing
                </h1>
                <p className="text-xl text-center dark:text-gray-200">
                    Check our available plans, there will always be one for you.
                </p>
            </div>
            <Prices />
        </main>
    );
}