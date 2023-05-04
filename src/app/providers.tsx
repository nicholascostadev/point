"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />
            <ThemeProvider attribute="class" enableColorScheme enableSystem>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}
