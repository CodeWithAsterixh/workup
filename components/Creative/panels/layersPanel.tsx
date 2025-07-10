"use client";
import ThemeChanger from "@/components/Pages/Overview/sidebar/ThemeChanger";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { CardFace, Element, ElementType } from "@/store/Editor/types";
import { useKeyboard } from "@/store/Keyboard";
import {
  Circle,
  Frame,
  Image,
  LucideMinus,
  Square,
  TypeIcon
} from "lucide-react";
import { useEffect } from "react";

const FaceItems = ({ elements }: { elements: Element[] }) => {
  const { selectElement } = useEditorStore();
    const {"values":keyboardKeys} = useKeyboard()
  
  const Icon = ({
    type,
    ...props
  }: { type: ElementType } & React.RefAttributes<SVGSVGElement>) => {
    switch (type) {
      case "ellipse":
        return <Circle {...props} />;
      case "rect":
        return <Square {...props} />;
      case "line":
        return <LucideMinus {...props} />;
      case "image":
        return <Image {...props} />;
      case "text":
        return <TypeIcon {...props} />;
      case "frame":
        return <Frame {...props} />;

      default:
        break;
    }
  };
  return elements.map((el, idx) => {
    return (
      <li
        onClick={() => selectElement(el.id,keyboardKeys)}
        key={idx}
        className="w-full bg-transparent p-2 flex flex-col gap-2 hover:!bg-zinc-200/10 dark:hover:!bg-zinc-700/10 cursor-pointer"
      >
        {el.type === "frame" && el.children ? (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div
                id="layerPanelFront"
                className={cn(
                  "!bg-zinc-200/10 dark:!bg-zinc-700/10 rounded-sm"
                )}
              >
                <Button className="w-full flex items-center justify-between h-fit">
                  <Icon type={el.type} />
                  <strong className="text-xs">{el.id}</strong>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "!pl-2 !bg-zinc-200/10 dark:!bg-zinc-700/10 rounded-sm"
              )}
            >
              <ul className="flex w-full flex-col gap-2">
                <FaceItems elements={el.children} />
              </ul>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          <span className="w-full text-xs flex items-center gap-2">
            <Icon type={el.type} /> {el.id}
          </span>
        )}
      </li>
    );
  });
};
export function LayersPanel() {
  const { setCurrentFace, currentFace, unSelectFaces, elements } =
    useEditorStore();
    const {"values":keyboardKeys} = useKeyboard()
  

  const { selectedIds, removeElement } = useEditorStore();
  // selection outline (if desired)

  useEffect(() => {
    if (keyboardKeys.includes("Delete")) {
      selectedIds.map((id) => {
        removeElement(id);
      });
    }
  }, [keyboardKeys]);
  const handleSetFace = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    face: CardFace
  ) => {
    e.stopPropagation();
    setCurrentFace(face,keyboardKeys);
  };

  return (
    <Sidebar className="lg:!w-64 !outline-none !bg-transparent !border-none !p-2 lg:!pr-0 lg:*:!rounded-lg lg:*:!p-2 lg:*:!bg-zinc-50 lg:dark:*:!bg-zinc-800">
      <SidebarHeader className="!w-full !flex !flex-col !gap-2 !bg-zinc-200/50 dark:!bg-zinc-700/50 !backdrop-blur-lg !rounded-sm">
        <div className="w-full flex items-center justify-between">
          <span className="w-full flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-100 uppercase">
            <img src="/favicon.ico" alt="logo" className="size-4" />
            Workup
          </span>
          <ThemeChanger />
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 flex flex-col gap-4 overflow-y-auto">
          {/* front */}
          <Collapsible id="layerPanelFront" className="!outline-none"
                tabIndex={0}>
            <CollapsibleTrigger asChild>
              <div
                
                onClick={(e) => {
                  handleSetFace(e, "front");
                }}
                className={cn(
                  "!bg-zinc-200/10 dark:!bg-zinc-700/10 !rounded-none",
                  {
                    "!bg-zinc-200/50 dark:!bg-zinc-700/50":
                      currentFace && currentFace.includes("front"),
                  }
                )}
              >
                <Button
                  onClick={unSelectFaces}
                  className="!w-full flex items-center !outline-none !bg-transparent !p-2 !text-zinc-700 dark:!text-zinc-200 justify-between h-fit"
                >
                  <strong className="text-base">Front</strong>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "!pl-2 !bg-zinc-200/10 dark:!bg-zinc-700/10 !rounded-none",
                {
                  "!bg-zinc-200/50 dark:!bg-zinc-700/50":
                    currentFace && currentFace.includes("front"),
                }
              )}
            >
              <ul  className="flex w-full flex-col gap-2">
                <FaceItems elements={elements.front} />
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* back */}
          <Collapsible id="layerPanelBack" className="!outline-none" tabIndex={0}>
            <CollapsibleTrigger asChild>
              <div
                
                onClick={(e) => {
                  handleSetFace(e, "back");
                }}
                className={cn(
                  "!bg-zinc-200/10 dark:!bg-zinc-700/10  !rounded-none",
                  {
                    "!bg-zinc-200/50 dark:!bg-zinc-700/50":
                      currentFace && currentFace.includes("back"),
                  }
                )}
              >
                <Button
                  onClick={unSelectFaces}
                  className="!w-full flex items-center !outline-none !bg-transparent !p-2 !text-zinc-700 dark:!text-zinc-200 justify-between h-fit"
                >
                  <strong className="text-base">Back</strong>
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "!pl-2 !bg-zinc-200/10 dark:!bg-zinc-700/10 !rounded-none",
                {
                  "!bg-zinc-200/50 dark:!bg-zinc-700/50":
                    currentFace && currentFace.includes("back"),
                }
              )}
            >
              <ul className="flex w-full flex-col gap-2">
                <FaceItems elements={elements.back} />
              </ul>
            </CollapsibleContent>
          </Collapsible>
      </SidebarContent>
    </Sidebar>
  );
}
