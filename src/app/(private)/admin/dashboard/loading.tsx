import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="mx-auto mt-header-height w-layout-base max-w-full pt-16">
            <span>
                <Loader2 className="h-8 w-8 animate-spin" />
                Crunching our latest data...
            </span>
        </div>
    );
}
