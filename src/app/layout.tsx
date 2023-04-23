import { Header } from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <div className="dark:bg-red-300 w-full py-1">
                    <p className="text-md dark:text-gray-900 w-layout-base px-8 text-center max-w-full mx-auto transition-colors">
                        PS: I don&apos;t own and neither have worked on the
                        projects listed below, please remember, this website is
                        a project meant for practicing, credits to all
                        developers that have done and are continuously doing an
                        incredible job. All projects are listed at{" "}
                        <Link
                            href="/references"
                            className="font-bold dark:hover:text-gray-700 transition-colors"
                        >
                            &#34;/references&#34;
                        </Link>
                    </p>
                </div>
                {children}
            </body>
        </html>
    );
}
