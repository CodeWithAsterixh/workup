"use client";

import handleEdit from "@/components/Creative/lib/editor-functions/handleEdit";
import getValueFromSelectedFaceConfig, {
  getValueFromSelectedElements,
} from "@/components/Creative/lib/getValueFromSelected";
import { Label } from "@/components/ui/label";
import LabelInput from "@/components/ui/labelInput";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "@/store/Editor";
import { InputTitles, SectionTitle } from ".";

export default function LayoutControls({ tab }: { tab: "face" | "element" }) {
  const { faceConfig, currentFace, elements, selectedIds } = useEditorStore();
  const clipContent =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "clipContent",
          options: {
            returnAnyways: false,
          },
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "clipContent",
          elements: elements,
          selectIds: selectedIds,
          options: {
            returnAnyways: false,
          },
        }) || null
      : null;
  const posX =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "x",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "x",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const posY =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "y",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "y",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const posWidth =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "width",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "width",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const posHeight =
    tab === "face"
      ? getValueFromSelectedFaceConfig({
          current: currentFace,
          faceConfig,
          key: "height",
        })
      : tab === "element"
      ? getValueFromSelectedElements({
          key: "height",
          elements: elements,
          selectIds: selectedIds,
        }) || 0
      : 0;
  const posRotation =
    getValueFromSelectedElements({
      key: "rotation",
      elements: elements,
      selectIds: selectedIds,
    }) || 0;
  const handlePosX = (value: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "x",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "x",
        value,
      });
    }
  };
  const handlePosY = (value: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "y",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "y",
        value,
      });
    }
  };
  const handleWidth = (value: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "width",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "width",
        value,
      });
    }
  };
  const handleHeight = (value: number) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "height",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "height",
        value,
      });
    }
  };
  const handleRotation = (value: number) => {
    handleEdit.handleUpdateElement({
      param: "rotation",
      value,
    });
  };

  const handleClipContent = (value: boolean) => {
    if (tab === "face") {
      handleEdit.handleUpdateFace({
        param: "clipContent",
        value,
      });
    } else if (tab === "element") {
      handleEdit.handleUpdateElement({
        param: "clipContent",
        value,
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <SectionTitle title="Layout" />
      <div className="flex flex-wrap gap-4">
        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Positioning"]} />

          <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
            <LabelInput
              slotProps={{
                label: {
                  children: "X",
                  htmlFor: "posX",
                },
                container: {
                  className: "w-full !py-0",
                },
              }}
              id="posX"
              type="number"
              value={posX}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                handlePosX(isNaN(val) ? 0 : val);
              }}
            />
            <LabelInput
              slotProps={{
                label: {
                  children: "Y",
                  htmlFor: "posY",
                },
              }}
              id="posY"
              type="number"
              value={posY}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                handlePosY(isNaN(val) ? 0 : val);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Sizing"]} />

          <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
            <LabelInput
              slotProps={{
                label: {
                  children: "W",
                  htmlFor: "width",
                },
                container: {
                  className: "w-full !py-0",
                },
              }}
              id="width"
              type="number"
              value={posWidth}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                handleWidth(isNaN(val) ? 0 : val);
              }}
            />
            <LabelInput
              slotProps={{
                label: {
                  children: "H",
                  htmlFor: "height",
                },
              }}
              id="height"
              type="number"
              value={posHeight}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                handleHeight(isNaN(val) ? 0 : val);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <InputTitles titles={["Rotation"]} />

          <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(5rem,_1fr))] gap-2">
            <LabelInput
              slotProps={{
                label: {
                  children: (
                    <i className="pi pi-angle-left -rotate-45">&deg;</i>
                  ),
                  htmlFor: "rotation",
                },
              }}
              id="rotation"
              type="number"
              max={360}
              min={-360}
              value={posRotation}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val)) {
                  if (val < -360) {
                    handleRotation(-360);
                  } else if (val > 360) {
                    handleRotation(360);
                  } else {
                    handleRotation(val);
                  }
                }
              }}
            />
          </div>
        </div>

        {clipContent !== null && (
          <div className="w-full flex flex-col gap-2">
            <Label>
              <Switch
                checked={clipContent}
                onCheckedChange={handleClipContent}
              />{" "}
              Clip content
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}
