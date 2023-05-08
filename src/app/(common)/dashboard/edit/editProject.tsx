import { Dialog } from "@/components/dialog";
import { Popover, PopoverTrigger } from "@/components/popover";
import { Edit2, MoreVertical } from "lucide-react";
import { EditPopover } from "./editPopover";

export function EditProject({ id }: { id: string }) {
    return (
        <Dialog>
            <Popover>
                <PopoverTrigger className="rounded-full p-1">
                    <MoreVertical />
                </PopoverTrigger>
                <EditPopover id={id} />
            </Popover>
        </Dialog>
    );
}
