import handleEdit from "@/components/Creative/lib/editor-functions/handleEdit";
import getValueFromSelectedFaceConfig, {
  getValueFromSelectedElements,
} from "@/components/Creative/lib/getValueFromSelected";
import { ColorPicker } from "@/components/ui/color-picker";
import LabelInput from "@/components/ui/labelInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEditorStore } from "@/store/Editor";
import { Radius } from "lucide-react";
import { SectionTitle } from ".";

export default function AppearanceControls({
  tab,
}: {
  tab: "face" | "element";
}) {
  const isMobile = useIsMobile(1024);
  const { faceConfig, currentFace, elements, selectedIds } =
    useEditorStore();

  const opacity =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "style.opacity",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "style.opacity",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const radius =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "radius",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "radius",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const fill =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "style.fill",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "style.fill",
          elements: elements,
          selectIds: selectedIds,
        }) || "#fff"
      : "#fff";

  const handleOpacity = (val: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "style.opacity",
        value: val,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "style.opacity",
        value: val,
      });
    }
  };
  const handleRadius = (val: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "radius",
        value: val,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "radius",
        value: val,
      });
    }
  };
  const handleFill = (val: string) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "style.fill",
        value: val,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "style.fill",
        value: val,
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Section Title */}
      <SectionTitle title="Appearance" />
      <div className="w-full flex flex-col gap-2">
        <ul className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2 font-semibold text-xs text-zinc-500 tracking-widest uppercase">
          <li>Opacity</li>
          <li>Radius</li>
        </ul>
        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <LabelInput
            slotProps={{
              label: {
                children: "op",
                htmlFor: "opacity",
              },
              container: {
                className: "w-full !py-0",
              },
            }}
            id="opacity"
            type="number"
            value={opacity * 100}
            max={100}
            min={0}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) {
                if (val < 0) {
                  handleOpacity(0);
                } else if (val > 100) {
                  handleOpacity(100 / 100);
                } else {
                  handleOpacity(val / 100);
                }
              }
            }}
          />
          <LabelInput
            slotProps={{
              label: {
                children: <Radius className="size-3" />,
                htmlFor: "radius",
              },
            }}
            id="radius"
            type="number"
            value={radius}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              handleRadius(isNaN(val) ? 0 : val);
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ul className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2 font-semibold text-xs text-zinc-500 tracking-widest uppercase">
          <li>Fill</li>
        </ul>
        <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
          <ColorPicker
            side={isMobile ? "top" : "left"}
            value={fill}
            onChange={(e) => handleFill(e as string)}
          />
        </div>
      </div>
    </div>
  );
}
