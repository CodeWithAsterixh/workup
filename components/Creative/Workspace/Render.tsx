"use client";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { CardFace, EditorState, FaceConfig } from "@/store/Editor/types";
import { useKeyboard } from "@/store/Keyboard";
import React, { useEffect } from "react";
import handleEdit from "../lib/editor-functions/handleEdit";
import getBorderStyle from "../lib/getBorderStyle";
import getValueFromSelectedFaceConfig from "../lib/getValueFromSelected";
import { ElementRenderer } from "./ShapeRender";
import { InteractiveElement } from "../InteractiveElement";

type Props = Omit<Omit<EditorState, "tool">, "faceConfig"> & {
  faceConfig: FaceConfig;
  face: CardFace;
  selectFace?: (face: CardFace) => void;
};

export default function Render({
  face,
  faceConfig,
  currentFace,
  selectFace,
}: Props) {
  const { values } = useKeyboard();
  const { elements, tool, faceConfig: fc, activeFace } = useEditorStore();
  const isSelected = currentFace && currentFace.includes(face);
  const isActive = activeFace && activeFace.includes(face);

  // const {setNodeRef,attributes,listeners,transform,isDragging,over} = useDraggable({id:face})
  // const dragTransformX = useRef(faceConfig.x)
  // const dragTransformY = useRef(faceConfig.y)
  // const style = {
  //   transform:isDragging?CSS.Translate.toString(transform):`translate3d(${faceConfig.x}px, ${faceConfig.y}px) rotate(${faceConfig.rotation}deg)`
  // }
  const borderRadius =
    typeof faceConfig.radius === "number"
      ? `${faceConfig.radius}px`
      : `${faceConfig.radius.top}px ${faceConfig.radius.right}px ${faceConfig.radius.bottom}px ${faceConfig.radius.left}px`;

  const clipContent = getValueFromSelectedFaceConfig({
    current: face,
    faceConfig: fc,
    key: "clipContent",
    options: {
      returnAnyways: false,
    },
  })
    ? { overflow: "hidden" }
    : {};
  const border = getBorderStyle(faceConfig.style.stroke);
  const handleSetFace = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    face: CardFace
  ) => {
    e.stopPropagation();
    if (selectFace && tool === "select") {
      selectFace(face);
    }
  };

  const handleMoveLeft = () => {
    handleEdit.handleUpdateFace({
      param: "x",
      value: "--",
    });
    handleEdit.handleUpdateElement({
      param: "x",
      value: "--",
    });
  };
  const handleMoveRight = () => {
    handleEdit.handleUpdateFace({
      param: "x",
      value: "++",
    });
    handleEdit.handleUpdateElement({
      param: "x",
      value: "++",
    });
  };
  const handleMoveTop = () => {
    handleEdit.handleUpdateFace({
      param: "y",
      value: "--",
    });
    handleEdit.handleUpdateElement({
      param: "y",
      value: "--",
    });
  };
  const handleMoveBottom = () => {
    handleEdit.handleUpdateFace({
      param: "y",
      value: "++",
    });
    handleEdit.handleUpdateElement({
      param: "y",
      value: "++",
    });
  };
  const handleDrag = ({ x, y }: { x: number; y: number }) => {
    handleEdit.handleUpdateFace({
      param: "x",
      value: x,
      singleFace: face,
    });
    handleEdit.handleUpdateFace({
      param: "y",
      value: y,
      singleFace: face,
    });
  };

  const handleResize = ({ h, w }: { w: number; h: number }) => {
    handleEdit.handleUpdateFace({
      param: "width",
      value: w,
      singleFace: "back",
    });
    handleEdit.handleUpdateFace({
      param: "height",
      value: h,
      singleFace: "back",
    });
       handleEdit.handleUpdateFace({
      param: "width",
      value: w,
      singleFace: "front",
    });
    handleEdit.handleUpdateFace({
      param: "height",
      value: h,
      singleFace: "front",
    });
  };

  useEffect(() => {
    // console.log(elements);
  }, [elements]);

  useEffect(() => {
    if (!isActive) return; // Only respond if this face is selected

    if (values.includes("arrowleft")) {
      handleMoveLeft();
    } else if (values.includes("arrowright")) {
      handleMoveRight();
    } else if (values.includes("arrowup")) {
      handleMoveTop();
    } else if (values.includes("arrowdown")) {
      handleMoveBottom();
    }
  }, [values]);

  return (
    <InteractiveElement
      enableSnap={isSelected}
      enableDrag={isSelected}
      enableResize={isSelected}
      onInteractDragEnd={handleDrag}
      onInteractResizeEnd={handleResize}
      asChild
    >
      <div
        className={cn(
          "relative size-fit p-[1px]",
          isSelected
            ? "ring-2 ring-blue-500"
            : "hover:ring-2 hover:ring-blue-500"
        )}
        data-x={faceConfig.x}
        data-y={faceConfig.y}
        style={{
          position: "relative",
          transform: `translateX(${faceConfig.x}px) translateY(${faceConfig.y}px) translateZ(0) rotate(${faceConfig.rotation}deg)`,
          borderRadius: borderRadius,
          width: `${faceConfig.width}px`,
          height: `${faceConfig.height}px`,
          // ...style
        }}
      >
        <div
          style={{
            position: "relative",
            background: faceConfig.style.fill,
            width: "100%",
            height: "100%",
            touchAction: "none",
            border,
            borderRadius: borderRadius,
            opacity: faceConfig.style.opacity,
            ...clipContent,
          }}
          onClick={(e) => handleSetFace(e, face)}
        >
          {elements[face].map((el, id) => (
            <ElementRenderer
              id={el.id}
              index={id}
              face={face}
              key={id}
              el={el}
            />
          ))}
        </div>
      </div>
    </InteractiveElement>
  );
}
