"use client";

import {
    ProjectStatus,
    projectStatusFormatter,
} from "@/lib/utils/projectRelated";
import { getFullName } from "@/lib/utils/userRelated";
import { ProjectWithAuthor } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMemo } from "react";
import { DataTable } from "../../payments/data-table";
import { EditProject } from "./edit/editProject";

type ProjectsTableProps = {
    projects: ProjectWithAuthor[];
};

export function ProjectsTable({ projects }: ProjectsTableProps) {
    const { data } = useQuery<ProjectWithAuthor[]>({
        queryKey: ["projects", "admin"],
        queryFn: () =>
            fetch("/api/projects?with_author=true").then((res) => res.json()),
        initialData: projects,
        staleTime: 1000 * 30, // 30 seconds
    });

    const columns: ColumnDef<ProjectWithAuthor>[] = useMemo(
        () => [
            {
                accessorKey: "title",
                header: "Title",
                cell: ({ getValue }) => {
                    return (
                        <div className="whitespace-nowrap">
                            {getValue() as string}
                        </div>
                    );
                },
            },
            {
                accessorKey: "description",
                header: "Description",
            },
            {
                accessorKey: "status",
                header: ({ column }) => {
                    return (
                        <button
                            className="flex items-center justify-end gap-1 px-2 py-1"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Status
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </button>
                    );
                },
                cell: ({ row, getValue }) => {
                    return (
                        <div className="text-right">
                            {projectStatusFormatter(
                                getValue() as ProjectStatus
                            )}
                        </div>
                    );
                },
            },
            {
                accessorKey: "author.firstName",
                header: "Author",
                cell: ({ row }) => {
                    return (
                        <p className="whitespace-nowrap">
                            {getFullName({
                                firstName: row.original.author.firstName,
                                lastName: row.original.author.lastName,
                            })}
                        </p>
                    );
                },
            },
            {
                accessorKey: "author_email",
                header: "Author Email",
            },
            {
                accessorKey: "edit",
                header: () => {
                    return <div className="text-center">Edit</div>;
                },
                cell: ({ row }) => {
                    const project = row.original;

                    return <EditProject projectData={project} />;
                },
            },
        ],
        []
    );

    return (
        <div className="flex w-max max-w-full flex-col">
            <DataTable data={data} columns={columns} />
        </div>
    );
}
