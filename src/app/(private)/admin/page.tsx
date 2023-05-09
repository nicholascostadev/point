import { currentUser } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    return (
        <div>
            <h1>Admin</h1>
            <p>
                Go to <Link href="/admin/dashboard">Dashboard</Link>
            </p>
        </div>
    );
}
