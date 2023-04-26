import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Point",
    description:
        "Ideas turned into reality like a charm, give us the idea and we deliver you the goods.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
