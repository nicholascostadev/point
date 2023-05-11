import { z } from "zod";

export const projectStatusSchema = z.enum([
    "requested",
    "inProgress",
    "completed",
    "declined",
    "canceled",
]);

export type ProjectStatus = z.infer<typeof projectStatusSchema>;

type ProjectStatusOption = {
    value: ProjectStatus;
    label: string;
};

export const projectStatuses: ProjectStatusOption[] = [
    {
        value: "requested",
        label: "Requested",
    },
    {
        value: "inProgress",
        label: "In Progress",
    },
    {
        value: "completed",
        label: "Completed",
    },
    {
        value: "declined",
        label: "Declined",
    },
    {
        value: "canceled",
        label: "Canceled",
    },
];

export function projectStatusFormatter(status?: ProjectStatus) {
    return (
        projectStatuses.find((s) => s.value === status)?.label ?? "Requested"
    );
}
