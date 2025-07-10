"use client";

import handleEdit from "@/components/Creative/lib/editor-functions/handleEdit";
import getValueFromSelectedFaceConfig, {
  getValueFromSelectedElements,
} from "@/components/Creative/lib/getValueFromSelected";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LabelInput from "@/components/ui/labelInput";
import { useEditorStore } from "@/store/Editor";
import { ChevronDownIcon } from "lucide-react";
import { InputTitles, SectionTitle } from ".";

export default function BorderControls({ tab }: { tab: "face" | "element" }) {
  const {
    currentFace,
    faceConfig,
    elements,
    selectedIds,
  } = useEditorStore();
  const borderWidth =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "style.stroke.width",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "style.stroke.width",
          elements: elements,
          selectIds: selectedIds,
        }) || null
      : null;
  const borderColor =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "style.stroke.color",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "style.stroke.color",
          elements: elements,
          selectIds: selectedIds,
        }) || null
      : null;
  const borderStyle =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "style.stroke.type",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "style.stroke.type",
          elements: elements,
          selectIds: selectedIds,
        }) || null
      : null;

  const handleBorderWidth = (value: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "style.stroke.width",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "style.stroke.width",
        value,
      });
    }
  };
  const handleBorderColor = (value: string) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "style.stroke.color",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "style.stroke.color",
        value,
      });
    }
  };
  const handleBorderStyle = (value: string) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "style.stroke.type",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "style.stroke.type",
        value,
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Section Title */}
      <SectionTitle title="Border" />
      {/* Border Width */}
      <div className="w-full flex flex-col gap-2">
        <InputTitles titles={["Border Width"]} />

        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <LabelInput
            slotProps={{
              label: {
                htmlFor: "borderWidth",
              },
            }}
            id="borderWidth"
            type="number"
            max={360}
            min={-360}
            value={borderWidth | 0}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              handleBorderWidth(val);
            }}
          />
        </div>
      </div>
      {/* Border Style */}
      <div className="w-full flex flex-col gap-2">
        <InputTitles titles={["Color", "Style"]} />

        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <ColorPicker
            id="borderColor"
            value={borderColor}
            onChange={(e) => handleBorderColor(e as string)}
          />
          <LabelInput
            slotProps={{
              label: {
                htmlFor: "borderStyle",
              },
            }}
            id="borderStyle"
            value={borderStyle || "none"}
            disabled
            rightbutton={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    id="borderStyle"
                    className="!p-0 !bg-transparent !h-fit"
                  >
                    <ChevronDownIcon className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 p-0">
                  <Command>
                    <CommandInput placeholder="Search family..." />
                    <CommandGroup>
                      {[
                        "solid",
                        "dashed",
                        "dotted",
                        "double",
                        "groove",
                        "ridge",
                      ].map((fam) => (
                        <CommandItem
                          key={fam}
                          onSelect={() => handleBorderStyle(fam)}
                        >
                          {fam}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        </div>
      </div>
    </div>
  );
}
