"use client";
import React, { useEffect, useCallback, memo } from "react";
import ThemeChanger from "@/components/Pages/Overview/sidebar/ThemeChanger";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { CardFace, Element, ElementType } from "@/store/Editor/types";
import { useKeyboard } from "@/store/Keyboard";
import { Circle, Frame, Image, Minus, QrCode, Square, TypeIcon } from "lucide-react";

// Icon mapping outside of render to avoid recreating on each render
const ICONS: Record<ElementType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ellipse: Circle,
  rect: Square,
  line: Minus,
  image: Image,
  text: TypeIcon,
  frame: Frame,
  qr:QrCode
};

interface FaceItemsProps {
  elements: Element[];
}

const FaceItems = memo(({ elements }: FaceItemsProps) => {
  const { selectElement} = useEditorStore();
  const { values: keyboardKeys } = useKeyboard();

  const handleClick = useCallback(
    (id: string) => { selectElement(id, keyboardKeys); },
    [selectElement, keyboardKeys]
  );

  return (
    <>
      {elements.map((el) => {
        const Icon = ICONS[el.type] || (() => null);
        const key = el.id;
        return (
          <li
            key={key}
            className="w-full p-2 flex flex-col gap-2 hover:bg-zinc-200/10 dark:hover:bg-zinc-700/10 cursor-pointer"
            onClick={() => handleClick(el.id)}
          >
            {el.type === "frame" && el.children ? (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button className="w-full flex items-center justify-between">
                    <Icon className="h-4 w-4" />
                    <strong className="text-xs truncate">{key}</strong>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-2">
                  <ul className="flex flex-col gap-2">
                    <FaceItems elements={el.children} />
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="text-xs truncate">{key}</span>
              </div>
            )}
          </li>
        );
      })}
    </>
  );
});
FaceItems.displayName = "FaceItems";

export function LayersPanel() {
  const {
    setCurrentFace,
    currentFace,
    unSelectFaces,
    elements,
    selectedIds,
    removeElement,
  } = useEditorStore();
  const { values: keyboardKeys } = useKeyboard();

  // Delete selected elements on 'Delete' key press
  useEffect(() => {
    if (!keyboardKeys.includes("Delete")) return;
    selectedIds.forEach((id) => removeElement(id));
  }, [keyboardKeys, selectedIds, removeElement]);

  const handleFaceChange = useCallback(
    (face: CardFace) => (e: React.MouseEvent) => {
      e.stopPropagation();
      unSelectFaces();
      setCurrentFace(face, keyboardKeys);
    },
    [setCurrentFace, unSelectFaces, keyboardKeys]
  );

  const renderFaceSection = (face: CardFace) => {
    const isActive = currentFace === face;
    return (
      <Collapsible id={`layerPanel${face}`} className="outline-none" tabIndex={0}>
        <CollapsibleTrigger asChild>
          <div
            onClick={handleFaceChange(face)}
            className={cn(
              "bg-zinc-200/10 dark:bg-zinc-700/10 p-0",
              isActive && "bg-zinc-200/50 dark:bg-zinc-700/50"
            )}
          >
            <Button className="w-full justify-between p-2 bg-transparent text-zinc-700 dark:text-zinc-200">
              <strong className="text-base capitalize">{face}</strong>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent
          className={cn("pl-2", isActive && "bg-zinc-200/50 dark:bg-zinc-700/50")}
        >
          <ul className="flex flex-col gap-2">
            <FaceItems elements={elements[face]} />
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sidebar className="lg:w-64 p-2 bg-transparent">
      <SidebarHeader className="bg-zinc-200/50 dark:bg-zinc-700/50 backdrop-blur-lg rounded-sm p-2">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-100">
            <img src="/favicon.ico" alt="logo" className="h-4 w-4" />
            Workup
          </span>
          <ThemeChanger />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 flex flex-col gap-4 overflow-y-auto">
        {renderFaceSection("front")}
        {renderFaceSection("back")}
      </SidebarContent>
    </Sidebar>
  );
}
