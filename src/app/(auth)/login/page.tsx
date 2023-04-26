import { SignIn, auth } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";

export default function Login() {
    const { session } = auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <SignIn />
        </div>
    );
}
