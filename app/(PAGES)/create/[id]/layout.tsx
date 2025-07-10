import CreativeClient from "@/components/Creative";
import MainPanel from "@/components/Creative/panels/MainPanel";
import { PropertiesPanel } from "@/components/Creative/panels/propertiesPanel";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Slot } from "@/types";

export default function layout({ children }: Slot) {
  return (
    <main id="create" className="w-[100dvw] h-[100dvh] isolate">
      {/* <Cursor containerId="#create" /> */}

      <SidebarProvider className="!bg-zinc-200 dark:!bg-zinc-900 !h-full">
        <CreativeClient />
        <MainPanel>
          {children}
        </MainPanel>
        <PropertiesPanel />
      </SidebarProvider>
    </main>
  );
}
