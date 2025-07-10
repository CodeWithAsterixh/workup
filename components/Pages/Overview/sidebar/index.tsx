import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import {
  Boxes,
    ClockFadingIcon,
    Layers,
    Search
} from "lucide-react";
import ThemeChanger from "./ThemeChanger";

const items = [
  { title: "Recent", url: "#", icon: ClockFadingIcon },
  { title: "My Cards", url: "#", icon: Layers },
  { title: "Templates", url: "/templates", icon: Boxes },
];



export function OverviewSidebar() {
  return (
    <Sidebar className="!w-64 !bg-transparent !border-none !p-2 !pr-0 *:!rounded-lg *:!p-2 *:!bg-zinc-50 dark:*:!bg-zinc-800">
      <SidebarHeader className="!w-full !flex !flex-col !gap-2 !bg-zinc-200/50 dark:!bg-zinc-700/50 !backdrop-blur-lg !rounded-sm">
       <div className="w-full flex items-center justify-between">
         <span className="w-full flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-100 uppercase">
            <img src="/favicon.ico" alt="logo" className="size-4" />
            Workup
          </span>
          <ThemeChanger/>
           
       </div>
          <div className="w-full flex items-center gap-2">
            <Input type="search" placeholder="search anything" className="!px-2 !shadow-none !bg-zinc-50/50 dark:!bg-zinc-700/800 !ring-0 !outline-0 !backdrop-blur-lg !border-1 focus:border-accent !py-2 !h-fit !text-zinc-500 dark:!text-zinc-200"/>
            <Button variant="outline" className="!px-2 !bg-zinc-50/50 dark:!bg-zinc-700/50 !backdrop-blur-lg"><Search className="!size-4"/></Button>
          </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center p-3 h-fit rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
                    >
                      <item.icon className="w-5 h-5 text-zinc-800 dark:text-zinc-200" />
                      <span className="ml-3 text-zinc-800 dark:text-zinc-200 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
