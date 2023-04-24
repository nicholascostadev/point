"use client";

import { Close } from "@/icons/close";
import { Logo } from "@/icons/logo";
import { Menu } from "@/icons/menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./button";
import { Binocular } from "@/icons/binocular";

export function HeaderDrawer() {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="block sm:hidden">
                    <Menu className="w-8 h-8 fill-white" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content className="data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left fixed inset-0 w-full h-screen rounded-[6px] dark:bg-gray-950 pt-2 pb-6 px-4">
                    <Dialog.Title>
                        <Logo />
                    </Dialog.Title>
                    <div className="flex flex-col items-start justify-start gap-4">
                        <ul className="flex flex-col gap-4 py-4 text-xl w-full">
                            <li>
                                <a href="#about">About us</a>
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
                                <a
                                    href="/projects"
                                    className="flex justify-center items-center gap-2"
                                >
                                    Explore
                                    <Binocular
                                        aria-label="Binocular"
                                        className="w-6 h-6"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <Dialog.Close asChild>
                        <button
                            className="inline-flex appearance-none top-6 right-4 absolute"
                            aria-label="Close"
                        >
                            <Close className="w-8 h-8" />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
