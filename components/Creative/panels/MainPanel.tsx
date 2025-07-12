"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { KeyboardProvider } from "@/store/Keyboard";
import { Slot } from "@/types";
import { Download, Share2, Sidebar } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Save from "../Save";
import CanvasPanel from "./CanvasPanel";
import LayersPanelMain from "./propertiesPanel/panel";
import Tools from "./propertiesPanel/tools";

export default function MainPanel({ children }: Slot) {
  const { id } = useParams() as { id: string };
  const isMobile = useIsMobile(1024);
  const { id: designId, handleQuery, name,setCustom } = useEditorStore();
  const [optionsSidebarOpened, setOptionsSidebarOpened] = useState(false);
  const [nameIsEditable, setNameIsEditable] = useState(false);
  useEffect(() => {
      setCustom((s) => {
        s.id = id;
      });
  }, [id]);

  const handleDoubleClick = () => {
    setNameIsEditable(true);
  };
  const handleBlur = (event: React.FocusEvent<HTMLSpanElement>) => {
    setNameIsEditable(false);

      handleQuery(`UPDATE name:${event.target.textContent || id || ""}`)
  };

  return (
    <section className="w-full h-full p-2 bg-gray-40">
      <div className="size-full flex flex-col gap-2 md:rounded-lg">
        <header className="w-full p-4 flex items-center justify-between rounded-lg sticky top-0 bg-zinc-50 dark:bg-zinc-800">
          <div className="w-full flex items-center justify-between gap-2">
            <div className="w-fit flex items-center gap-2">
              <SidebarTrigger />

              <span
                contentEditable={nameIsEditable}
                suppressContentEditableWarning={nameIsEditable}
                onDoubleClick={handleDoubleClick}
                onBlur={handleBlur}
                className="text-sm w-fit max-w-[80%] truncate"
              >
                {name}
              </span>
              <Save as={designId} />
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
                "pt-18": optionsSidebarOpened,
                "pt-14": !optionsSidebarOpened,
              }
            )}
          >
            <header className="w-fit absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 items-center bg-zinc-50 dark:bg-zinc-800 py-3 px-4 rounded-full">
              <Button
                onClick={() => setOptionsSidebarOpened((ops) => !ops)}
                className="!p-1 !size-10"
                variant={"ghost"}
              >
                <Sidebar className="size-full" />
              </Button>
              <aside className="w-full flex overflow-x-auto gap-2 align scrollableSmall">
                <Tools />
              </aside>
            </header>

            <main
              className={cn("w-full duration-500 bg-zinc-50 backdrop-blur-3xl dark:bg-zinc-800", {
                "h-[40dvh] overflow-y-auto scrollable mt-0 p-2 sm:p-4 rounded-lg":
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
