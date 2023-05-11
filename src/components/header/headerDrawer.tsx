"use client";

import { Logo } from "@/icons/logo";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../button";
import { LayoutDashboard, List, Map, X } from "lucide-react";
import { Menu } from "lucide-react";
import { useSession } from "@clerk/nextjs";

export function HeaderDrawer() {
    const { isSignedIn } = useSession();

    return (
        <Dialog.Root modal>
            <Dialog.Trigger asChild>
                <Button
                    as="button"
                    className="block bg-transparent p-2 dark:bg-transparent sm:hidden"
                >
                    <Menu className="h-6 w-6 fill-white" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content className="fixed inset-0 z-50 h-screen w-full rounded-[6px] bg-white px-4 pb-6 pt-2 data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left dark:bg-gray-950">
                    <div className="absolute inset-0 m-auto h-full w-1/2 bg-conic-gradient blur-[360px]"></div>

                    <Dialog.Title>
                        <Logo />
                    </Dialog.Title>
                    <div className="flex flex-col items-start justify-start gap-4">
                        <ul className="flex w-full flex-col gap-4 py-4 text-xl">
                            <li>
                                <a href="/#about">About us</a>
                            </li>
                            <li>
                                <a href="/projects">Projects</a>
                            </li>
                            <li>
                                <a href="/pricing">Pricing</a>
                            </li>
                            <li>
                                <a href="/references">References</a>
                            </li>
                            <li className="mt-3 flex items-start justify-start border-t pt-6 dark:border-t-gray-400">
                                {isSignedIn ? (
                                    <a
                                        href="/dashboard"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Dashboard
                                        <LayoutDashboard
                                            aria-label="Binocular"
                                            className="h-6 w-6"
                                        />
                                    </a>
                                ) : (
                                    <a
                                        href="/projects"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Explore
                                        <Map
                                            aria-label="Binocular"
                                            className="h-6 w-6"
                                        />
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>

                    <Dialog.Close asChild>
                        <Button
                            as="button"
                            className="absolute right-2 top-5 inline-flex appearance-none p-2"
                            aria-label="Close"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
