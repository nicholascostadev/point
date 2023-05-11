import { Analytics } from "@vercel/analytics/react";

export { reportWebVitals } from "next-axiom";

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
