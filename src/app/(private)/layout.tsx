import { Providers } from "@/app/providers";
import { isUserAdmin } from "@/lib/utils/userRelated";
import { ClerkProvider, currentUser } from "@clerk/nextjs/app-beta";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";
import { Header } from "./admin/header";

export const metadata: Metadata = {
    title: "Point | Admin",
    robots: {
        index: false,
    },
};

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        return redirect("/dashboard");
    }

    if (!isUserAdmin(user)) {
        return redirect("/dashboard");
    }

    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <Providers>
                    <body className={inter.className}>
                        <Header />
                        {children}
                    </body>
                </Providers>
            </html>
        </ClerkProvider>
    );
}
