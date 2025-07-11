import handleEdit from "@/components/Creative/lib/editor-functions/handleEdit";
import { getValueFromSelectedElements } from "@/components/Creative/lib/getValueFromSelected";
import { ColorPicker } from "@/components/ui/color-picker";
import LabelInput from "@/components/ui/labelInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorStore } from "@/store/Editor";
import { InputTitles, SectionTitle } from ".";
import { TypeIcon } from "lucide-react";

export default function QrControls() {
  const isMobile = useIsMobile(1024);
  const { elements, selectedIds } = useEditorStore();

  const bg =
    getValueFromSelectedElements({
      key: "qrOnly.background",
      elements: elements,
      selectIds: selectedIds,
      options:{
        returnAnyways: false
      }
    }) || null;
  const fg =
    getValueFromSelectedElements({
      key: "qrOnly.foreGround",
      elements: elements,
      selectIds: selectedIds,
      options:{
        returnAnyways: false
      }
    }) || null;
  const value =
    getValueFromSelectedElements({
      key: "qrOnly.value",
      elements: elements,
      selectIds: selectedIds,
      options:{
        returnAnyways: false
      }

    }) || null;

  const handleBg = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "qrOnly.background",
      value: val,
    });
  };
  const handleFg = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "qrOnly.foreGround",
      value: val,
    });
  };
  const handleVal = (val: string) => {
    handleEdit.handleUpdateElement({
      param: "qrOnly.value",
      value: val,
    });
  };

  if(!value && !bg && !fg) return null
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Section Title */}
      <SectionTitle title="Qr settings" />

      <div className="w-full flex flex-col gap-2">
        <InputTitles titles={["bg", "fg"]} />

        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <ColorPicker
            side={isMobile ? "top" : "left"}
            value={bg}
            onChange={(e) => handleBg(e as string)}
          />
          <ColorPicker
            side={isMobile ? "top" : "left"}
            value={fg}
            onChange={(e) => handleFg(e as string)}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <InputTitles titles={["value"]} />
        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <LabelInput
            slotProps={{
              label: {
                children: <TypeIcon className="size-3"/>,
                htmlFor: "value",
              },
            }}
            id="value"
            value={value||""}
            onChange={(e) => {
              const val = e.target.value;
              handleVal(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
