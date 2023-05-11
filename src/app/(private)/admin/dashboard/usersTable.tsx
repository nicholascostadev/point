"use client";

import { getFullName } from "@/lib/utils/userRelated";
import { User } from "@clerk/nextjs/dist/api";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../payments/data-table";

type UsersTableProps = {
    users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
    const columns: ColumnDef<User>[] = [
        {
            header: "First Name",
            cell: ({ row }) => {
                return getFullName({
                    firstName: row.original.firstName,
                    lastName: row.original.lastName,
                });
            },
        },
        {
            accessorKey: "username",
            header: "Username",
            cell: ({ getValue }) => {
                const username = getValue() as string | undefined;

                return username ?? "No username";
            },
        },
        {
            accessorKey: "emailAddresses",
            header: "Email",
            cell: ({ getValue }) => {
                const emails = getValue() as Array<{ emailAddress: string }>;

                return emails[0].emailAddress;
            },
        },
        {
            accessorKey: "publicMetadata.roles",
            header: "Roles",
            cell: ({ getValue }) => {
                const roles = getValue() as string[] | undefined;

                return roles ? roles.join(", ") : "None";
            },
        },
    ];

    return (
        <div className="flex flex-col w-max max-w-full">
            <DataTable data={users} columns={columns} />
        </div>
    );
}
