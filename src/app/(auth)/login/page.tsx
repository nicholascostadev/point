import { SignIn, auth } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";

export default function Login() {
    const { session } = auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <SignIn />
        </div>
    );
}
