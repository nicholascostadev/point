"use client";

import { Logo } from "@/icons/logo";
import { useSession } from "@clerk/nextjs";
import * as Dialog from "@radix-ui/react-dialog";
import { LayoutDashboard, Map, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

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
                    <div className="absolute inset-0 m-auto h-full w-1/2 blur-[360px]"></div>

                    <Dialog.Title>
                        <Logo />
                    </Dialog.Title>
                    <div className="flex flex-col items-start justify-start gap-4">
                        <ul className="flex w-full flex-col gap-4 py-4 text-xl">
                            <li>
                                <Link href="/#about">About us</Link>
                            </li>
                            <li>
                                <Link href="/projects">Projects</Link>
                            </li>
                            <li>
                                <Link href="/pricing">Pricing</Link>
                            </li>
                            <li>
                                <Link href="/references">References</Link>
                            </li>
                            <li className="mt-3 flex items-start justify-start border-t pt-6 dark:border-t-gray-400">
                                {isSignedIn ? (
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Dashboard
                                        <LayoutDashboard
                                            aria-label="Binocular"
                                            className="h-6 w-6"
                                        />
                                    </Link>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Login
                                        <Map
                                            aria-label="Binocular"
                                            className="h-6 w-6"
                                        />
                                    </Link>
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
