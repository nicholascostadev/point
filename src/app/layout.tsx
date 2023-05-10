import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Analytics />
            {children}
        </>
    );
}
