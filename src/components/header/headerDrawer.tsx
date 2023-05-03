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
                    className="block sm:hidden p-2 dark:bg-transparent bg-transparent"
                >
                    <Menu className="w-6 h-6 fill-white" />
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content className="bg-white dark:bg-gray-950 data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left fixed inset-0 w-full h-screen rounded-[6px] pt-2 pb-6 px-4 z-50">
                    <div className="absolute inset-0 m-auto bg-conic-gradient blur-[360px] w-1/2 h-full"></div>

                    <Dialog.Title>
                        <Logo />
                    </Dialog.Title>
                    <div className="flex flex-col items-start justify-start gap-4">
                        <ul className="flex flex-col gap-4 py-4 text-xl w-full">
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
                            <li className="pt-6 mt-3 border-t dark:border-t-gray-400 flex justify-start items-start">
                                {isSignedIn ? (
                                    <a
                                        href="/dashboard"
                                        className="flex justify-center items-center gap-2"
                                    >
                                        Dashboard
                                        <LayoutDashboard
                                            aria-label="Binocular"
                                            className="w-6 h-6"
                                        />
                                    </a>
                                ) : (
                                    <a
                                        href="/projects"
                                        className="flex justify-center items-center gap-2"
                                    >
                                        Explore
                                        <Map
                                            aria-label="Binocular"
                                            className="w-6 h-6"
                                        />
                                    </a>
                                )}
                            </li>
                        </ul>
                    </div>

                    <Dialog.Close asChild>
                        <Button
                            as="button"
                            className="inline-flex appearance-none p-2 top-5 right-2 absolute"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
