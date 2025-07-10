import handleEdit from "@/components/Creative/lib/editor-functions/handleEdit";
import { getValueFromSelectedElements } from "@/components/Creative/lib/getValueFromSelected";
import { Button } from "@/components/ui/button";
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
import { ChevronDownIcon, TypeIcon } from "lucide-react";
import { InputTitles, SectionTitle } from ".";

export interface TypographyControlsProps {
  tab: "front" | "back";
}

const fontFamilies = [
  "Arial, sans-serif",
  "Helvetica Neue, Helvetica, Arial, sans-serif",
  "Times New Roman, Times, serif",
  "Georgia, serif",
  "Courier New, Courier, monospace",
  "Verdana, Geneva, sans-serif",
  "Tahoma, Geneva, sans-serif",
  "Trebuchet MS, Helvetica, sans-serif",
  "Impact, Charcoal, sans-serif",
  "Comic Sans MS, cursive, sans-serif",
  "Roboto, sans-serif",
  "Open Sans, sans-serif",
  "Lato, sans-serif",
  "Montserrat, sans-serif",
  "Source Sans Pro, sans-serif",
  "Poppins, sans-serif",
  "Merriweather, serif",
  "Playfair Display, serif",
  "Lora, serif",
  "PT Serif, serif",
  "Oswald, sans-serif",
  "Raleway, sans-serif",
  "Pacifico, cursive",
  "Abril Fatface, cursive",
];

const fontWeights = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "normal",
  "bold",
  "bolder",
  "lighter",
];

const presetSizes = [
  {
    label: "xs",
    value: 12,
  },
  {
    label: "sm",
    value: 14,
  },
  {
    label: "base",
    value: 16,
  },
  {
    label: "lg",
    value: 18,
  },
  {
    label: "xl",
    value: 20,
  },
  {
    label: "2xl",
    value: 24,
  },
  {
    label: "3xl",
    value: 32,
  },
  {
    label: "4xl",
    value: 48,
  },
  {
    label: "5xl",
    value: 64,
  },
  {
    label: "6xl",
    value: 80,
  },
];

export default function TypographyControls() {
  const { elements, selectedIds } = useEditorStore();

  const fontFamily = getValueFromSelectedElements({
    key: "fontFamily",
    elements: elements,
    selectIds: selectedIds,
  });
  const fontWeight = getValueFromSelectedElements({
    key: "fontWeight",
    elements: elements,
    selectIds: selectedIds,
  });
  const fontSize = getValueFromSelectedElements({
    key: "fontSize",
    elements: elements,
    selectIds: selectedIds,
  });
  const text = getValueFromSelectedElements({
    key: "text",
    elements: elements,
    selectIds: selectedIds,
  });

  const handleFamily = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "fontFamily",
      value: val,
    });
  };
  const handleWeight = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "fontWeight",
      value: val,
    });
  };
  const handleSize = (val: string) => {
    const size = isNaN(parseInt(val)) ? null : parseInt(val);
    handleEdit.handleUpdateElement({
      param: "fontSize",
      value: size,
    });
  };
  const handleText = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "text",
      value: val,
    });
  };

  if (!text) return null;
  return (
    <div className="w-full flex flex-col gap-4">
      <SectionTitle title="Typography" />
      <div className="flex gap-4 flex-wrap">
        {/* Font Family */}
        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Font Family"]} />
          <LabelInput
            slotProps={{
              label: {
                htmlFor: "fontFamily",
              },
            }}
            id="fontFamily"
            value={fontFamily || "None"}
            disabled
            onChange={(e) => {
              handleSize(e.target.value);
            }}
            rightbutton={
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    id="font-size"
                    className="!p-0 !bg-transparent !h-fit"
                  >
                    <ChevronDownIcon className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 p-0">
                  <Command>
                    <CommandInput placeholder="Search family..." />
                    <CommandGroup>
                      {fontFamilies.map((fam) => (
                        <CommandItem
                          key={fam}
                          onSelect={() => handleFamily(fam)}
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
        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Font Size", "Font Weight"]} />

          <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
            <LabelInput
              slotProps={{
                label: {
                  htmlFor: "fontSize",
                },
              }}
              id="fontSize"
              type="number"
              value={fontSize || "None"}
              disabled={!fontSize}
              onChange={(e) => {
                handleSize(e.target.value);
              }}
              rightbutton={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      id="font-size"
                      className="!p-0 !bg-transparent !h-fit"
                    >
                      <ChevronDownIcon className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <Command>
                      <CommandInput placeholder="Search size..." />
                      <CommandGroup>
                        {presetSizes.map((sz, ind) => (
                          <CommandItem
                            key={ind}
                            value={`${sz.value}`}
                            onSelect={(val) => handleSize(val)}
                          >
                            {sz.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            />
            <LabelInput
              slotProps={{
                label: {
                  htmlFor: "fontWeight",
                },
              }}
              id="fontWeight"
              type="number"
              value={fontWeight || "None"}
              disabled
              onChange={(e) => {
                handleSize(e.target.value);
              }}
              rightbutton={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      id="font-size"
                      className="!p-0 !bg-transparent !h-fit"
                    >
                      <ChevronDownIcon className="size-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 p-0">
                    <Command>
                      <CommandInput placeholder="Search weight..." />
                      <CommandGroup>
                        {fontWeights.map((w) => (
                          <CommandItem key={w} onSelect={() => handleWeight(w)}>
                            {w}
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

        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Content"]} />
          <LabelInput
            slotProps={{
              label: {
                children: <TypeIcon className="size-3" />,
                htmlFor: "text",
              },
            }}
            id="text"
            value={text || "None"}
            disabled={!text}
            onChange={(e) => {
              handleText(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
