import { PopoverContent } from "@/components/popover";
import { DeleteProject } from "./deleteProject";

type EditPopoverProps = {
    id: string;
};

export function EditPopover({ id }: EditPopoverProps) {
    return (
        <PopoverContent className="bg-gray-200 dark:bg-gray-950/90">
            <div className="flex flex-col justify-start items-start gap-1">
                <strong>Danger Zone</strong>
                <DeleteProject id={id} />
            </div>
        </PopoverContent>
    );
}
