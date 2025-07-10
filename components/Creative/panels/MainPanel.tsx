"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { KeyboardProvider } from "@/store/Keyboard";
import { Slot } from "@/types";
import { Download, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Save from "../Save";
import CanvasPanel from "./CanvasPanel";
import LayersPanelMain from "./propertiesPanel/panel";
import Tools from "./propertiesPanel/tools";

export default function MainPanel({ children }: Slot) {
  const designId = usePathname();
  const isMobile = useIsMobile(1024);
  const [optionsSidebarOpened, setOptionsSidebarOpened] = useState(false);


 

  return (
    <section className="w-full h-full p-2 bg-gray-40">
      <div className="size-full flex flex-col gap-2 md:rounded-lg">
        <header className="w-full p-4 flex items-center justify-between rounded-lg sticky top-0 bg-zinc-50 dark:bg-zinc-800">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="w-fit flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm max-w-40 md:max-w-20 lg:max-w-40 truncate">
                {designId}
              </span>
              <Save/>
            </div>
            <div className="w-fit flex items-center gap-2">
              <Button className="!p-1 !size-7">
                <Download className="size-full" />
              </Button>
              <Button className="!p-1 !size-7">
                <Share2 className="size-full" />
              </Button>
            </div>
          </div>
        </header>
        <KeyboardProvider id="designCanvas">
          <CanvasPanel>{children}</CanvasPanel>
        </KeyboardProvider>

        {isMobile && (
          <aside
            className={cn(
              "h-fit relative duration-500 rounded-lg flex flex-col items-center",
              {
                "pt-16": optionsSidebarOpened,
                "pt-12": !optionsSidebarOpened,
              }
            )}
          >
            <header className="w-fit absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 items-center bg-zinc-50 dark:bg-zinc-800 py-3 px-4 rounded-full">
              <Button
                onClick={() => setOptionsSidebarOpened((ops) => !ops)}
                className="!p-1 !size-7"
              >
                {/* <Sidebar className="size-full" /> */}
              </Button>
              <aside className="w-full flex overflow-x-auto gap-2 align scrollableSmall">
                <Tools />
              </aside>
            </header>

            <main
              className={cn("w-full duration-500 bg-zinc-50 dark:bg-zinc-800", {
                "h-52 overflow-y-auto scrollable mt-0 p-2 sm:p-4 rounded-lg":
                  optionsSidebarOpened,
                "h-0 overflow-y-hidden mt-2": !optionsSidebarOpened,
              })}
            >
              <LayersPanelMain />
            </main>
          </aside>
        )}
      </div>
    </section>
  );
}
