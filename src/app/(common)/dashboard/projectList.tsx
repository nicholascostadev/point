import { DashboardCard } from "./dashboardCard";

export function ProjectList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
        </div>
    );
}
