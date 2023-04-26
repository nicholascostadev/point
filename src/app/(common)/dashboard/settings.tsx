import { Button } from "@/components/button";
import { Gear } from "@/icons/gear";
import { Plus } from "@/icons/plus";

export function Settings() {
    return (
        <div
            id="settings-section"
            className="relative flex justify-end border border-gray-950/20 dark:border-gray-200/20 w-full rounded-lg p-1"
        >
            <label
                className="absolute left-1 -top-[18px] bg-gray-100 dark:bg-gray-950 p-1"
                htmlFor="settings-section"
            >
                Filters
            </label>
            <Button as="button" className="p-2 dark:bg-transparent">
                <Plus className="w-6 h-6" />
            </Button>
            <Button as="button" className="p-2 dark:bg-transparent">
                <Gear className="w-6 h-6" />
            </Button>
        </div>
    );
}
