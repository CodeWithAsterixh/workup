"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Fragment } from "react";
import { tool, tools } from "./tools";
import { useEditorStore } from "@/store/Editor";

export const ToolsButton = ({ tools }: { tools: tool[] }) =>
  tools.map((tool, id) => {
    const handleAction = () => {
      if (tool.action) {
        tool.action();
      }
    };
    const button = (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            onClick={handleAction}
            className="size-8 p-2 bg-zinc-500 dark:bg-zinc-200 text-zinc-200 dark:text-zinc-800 rounded-sm flex items-center justify-center"
          >
            <tool.icon />
          </span>
        </TooltipTrigger>
        <TooltipContent>{tool.label}</TooltipContent>
      </Tooltip>
    );

    return (
      <Fragment key={id}>
        {tool.nested ? (
          <Popover>
            <PopoverTrigger>{button}</PopoverTrigger>
            <PopoverContent className="!w-fit h-fit flex flex-col gap-2 !p-2">
              <ToolsButton tools={tool.nested} />
            </PopoverContent>
          </Popover>
        ) : (
          button
        )}
      </Fragment>
    );
  });

export default function Tools() {
  const { elements } = useEditorStore();

  return <ToolsButton tools={tools(elements)} />;
}
