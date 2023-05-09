"use client";

import { ProjectWithAuthor } from "@/types";
import { useQuery } from "@tanstack/react-query";
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

    return (
        <div className="flex flex-col w-max max-w-full">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 max-w-xs text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 max-w-xs text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 max-w-xs text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Author
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 max-w-xs text-left text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {data.map((project) => (
                                    <tr key={project.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {project.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {project.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {project.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {project.author.firstName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                            <EditProject
                                                projectData={project}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
