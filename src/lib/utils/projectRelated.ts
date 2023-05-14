import { z } from "zod";
import { cl } from "./cl";

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

export function projectStatusFormatter(status?: ProjectStatus | "none") {
    if (status === "none") return "All";

    return (
        projectStatuses.find(
            (s) => s.value.toLocaleLowerCase() === status?.toLocaleLowerCase()
        )?.label ?? "Requested"
    );
}

export function getExplanationByStatus(status: ProjectStatus) {
    switch (status) {
        case "canceled":
            return "We are not able to develop this project for now, reach us at nicholascostadev@gmail.com to check why.";
        case "completed":
            return "The project was completed by our team and we're excited to show you.";
        case "declined":
            return "Our team decided to not continue with your project, reach us at nicholascostadev@gmail.com to check why.";
        case "inProgress":
            return "Our team is now working to deliver your project.";
        case "requested":
            return "We received your request, our team will check if the projects is viable and if it is, we'll start developing it.";
    }
}

export function generateStatusColor(status: ProjectStatus) {
    const sharedClasses = "text-white";
    switch (status) {
        case "requested":
            return cl("bg-cyan-500 hover:bg-cyan-400", sharedClasses);
        case "completed":
            return cl("bg-green-500 hover:bg-green-400", sharedClasses);
        case "declined":
            return cl("bg-yellow-500 hover:bg-yellow-400", sharedClasses);
        case "inProgress":
            return cl("bg-blue-500 hover:bg-blue-400", sharedClasses);
        default:
            return cl("bg-red-500 hover:bg-red-400", sharedClasses);
    }
}
