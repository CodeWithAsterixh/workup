import { OverviewSidebar } from "@/components/Pages/Overview/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import generateUniqueId from "@/lib/generateUniqueId";
import { Slot } from "@/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function overviewLayout({ children }: Slot) {
  const uniqueIdForDesign = generateUniqueId()

  return (
    <main className="w-screen h-screen">
      <SidebarProvider className="!bg-zinc-200 dark:!bg-zinc-900">
        <OverviewSidebar />
        <section className="w-full h-screen md:p-2 bg-gray-40">
          <div className="size-full flex flex-col gap-2 md:rounded-lg">
            <header className="w-full p-4 flex items-center justify-between rounded-b-lg md:rounded-lg sticky top-0 bg-zinc-50 dark:bg-zinc-800">
              <div className="w-fit flex items-center gap-2">
                <SidebarTrigger/>
                <h1 className="text-lg font-bold">Hello there!</h1>
              </div>
              <Link href={`/design/${uniqueIdForDesign}`}>
              <Button variant={"default"} className="flex gap-2 items-center justify-center">
                <PlusCircle />
                Create
              </Button>
              </Link>
            </header>
            <main className="size-full overflow-y-auto bg-zinc-50 dark:bg-zinc-800 rounded-t-lg md:rounded-lg">
              {children}
            </main>
          </div>
        </section>
      </SidebarProvider>
    </main>
  );
}
