import { PopoverContent } from "@/components/popover";
import { DeleteProject } from "./deleteProject";
import { EditForm } from "./editForm";

type EditPopoverProps = {
    closeModal: () => void;
};

export function EditPopover({ closeModal }: EditPopoverProps) {
    return (
        <PopoverContent className="border border-gray-200 dark:bg-gray-950/90 dark:border-gray-900">
            <div className="flex flex-col justify-start items-start gap-1">
                <section
                    aria-label="Editing Zone"
                    className="flex flex-col gap-4"
                >
                    <strong>Editing</strong>
                    <EditForm closeModal={closeModal} />
                </section>
                <section
                    aria-label="Danger Zone"
                    className="flex flex-col gap-4"
                >
                    <strong>Danger Zone</strong>
                    <DeleteProject />
                </section>
            </div>
        </PopoverContent>
    );
}
