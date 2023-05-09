import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="mt-header-height w-layout-base max-w-full mx-auto pt-16">
            <span>
                <Loader2 className="w-8 h-8 animate-spin" />
                Crunching our latest data...
            </span>
        </div>
    );
}
