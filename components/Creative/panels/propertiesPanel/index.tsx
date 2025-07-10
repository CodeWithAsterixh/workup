"use client";
import { ElementConfig } from "@/components/models/CardRenderer/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import PropertiesPanelMain from "./panel";
import Tools from "./tools";

interface PropertiesPanel {
  openMobile?: boolean;
  setOpenMobile?: boolean;
  selectedItem?: ElementConfig;
}

export function PropertiesPanel() {
  const isMobile = useIsMobile(1024);
  if (isMobile) return null;
  return (

      <Sidebar
      side="right"
      className="!w-64 !bg-transparent !border-none !p-2 !pl-0 *:!rounded-lg *:!p-2 *:!bg-zinc-50 dark:*:!bg-zinc-800"
    >
      <SidebarHeader className="!w-full !flex !flex-col !gap-2 !mb-4 !bg-zinc-200/50 dark:!bg-zinc-700/50 !backdrop-blur-lg !rounded-sm">
        <div className="w-full flex flex-col gap-2">
          <strong>Tools</strong>

          <aside className="w-full flex overflow-x-auto gap-2 align scrollableSmall pb-2">
            <Tools/>
          </aside>
        </div>
      </SidebarHeader>
      <SidebarContent className="!gap-0 scrollable">
        <div className="w-full flex flex-col gap-2 p-2">
          <strong>Properties</strong>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <PropertiesPanelMain />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
