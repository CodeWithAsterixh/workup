import { useEditorStore } from "@/store/Editor";
import { createAddMethods } from "@/store/Editor/elementAdders";
import {
  EditorState,
  ElementType
} from "@/store/Editor/types";
import {
  Circle,
  Frame,
  ImagePlus,
  LucideProps,
  MousePointer2,
  QrCode,
  Shapes,
  Square,
  TypeIcon,
} from "lucide-react";

export interface tool {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  action?: () => void;
  nested?: tool[];
}

/**
 * Build the toolbar configuration from add-methods
 */
export function tools(elements: EditorState["elements"]): tool[] {
  const methods = createAddMethods(elements);
  const { handleQuery, currentFace } = useEditorStore.getState();
  const handleAction = (type: ElementType) => {
    if (currentFace) {
      if (Array.isArray(currentFace)) {
        currentFace.map((f) => {
          if (type !== "frame") {
            handleQuery(`INSERT in ${f}face ${type}`);
          } else {
            handleQuery(`INSERT in ${f}face frame with id:frame1`);
          }
        });
      } else {
        if (type !== "frame") {
          handleQuery(`INSERT in ${currentFace}face ${type}`);
        } else {
          handleQuery(`INSERT in ${currentFace}face frame with id:frame1`);
        }
      }
    }
  };

  return [
    { label: "Select", icon: MousePointer2, action: methods.select },
    {
      label: "Add Shape",
      icon: Shapes,
      nested: [
        {
          label: "Rectangle",
          icon: Square,
          action: () => handleAction("rect"),
        },
        {
          label: "Circle",
          icon: Circle,
          action: () => handleAction("ellipse"),
        },
      ],
    },
    {
      label: "Add Image",
      icon: ImagePlus,
      action: () => handleAction("image"),
    },
    { label: "Add QR Code", icon: QrCode, action: () => handleAction("qr") },
    { label: "Add Frame", icon: Frame, action: () => handleAction("frame") },
    { label: "Add Text", icon: TypeIcon, action: () => handleAction("text") },
  ];
}
