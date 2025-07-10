/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEditorStore } from "@/store/Editor";
import { CardFace, Element } from "@/store/Editor/types";
import { useKeyboard } from "@/store/Keyboard";
import type { SelectedCardItem } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { getFillUrl, getGradientDef } from "../lib/getColors";
import { InteractiveElement } from "../InteractiveElement";
import handleEdit from "../lib/editor-functions/handleEdit";

interface RendererProps {
  el: Element;
  select?: SelectedCardItem;
  face: CardFace;
  index: number;
  id: string;
}

export function ElementRenderer({
  el,
  select,
  face,
  index,
  id,
}: RendererProps) {
  const { selectElement, selectedIds, tool, handleQuery } = useEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const { values: keyboardKeys } = useKeyboard();
  // selection outline (if desired)
  const isSelected = selectedIds.includes(el.id);

  // Focus the paragraph when it becomes editable
  useEffect(() => {
    if (isEditing && textContainerRef.current) {
      const p = textContainerRef.current.querySelector("p");
      if (p) {
        p.focus();
        // Move caret to end
        document.execCommand("selectAll", false, undefined);
        document.getSelection()?.collapseToEnd();
      }
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: any) => {
    const newValue = e.currentTarget.textContent;
    handleQuery(`UPDATE itemof id:${el.id} with text:${newValue}`);

    if (newValue === "") {
      handleQuery(`DELETE itemof id:${el.id}`);
    }

    setIsEditing(false);
  };
  const commonStyle: React.CSSProperties = {
    transform: `translateX(${el.x}px) translateY(${el.y}px) translateZ(0)  rotate(${el.rotation}deg)`,
    opacity: el.style.opacity,
    outline: isSelected ? "2px dashed #00f" : undefined,
    zIndex: index,
    cursor:"none !important"
  };

  const handleSelect = (
    event: React.MouseEvent<
      SVGSVGElement | HTMLDivElement | HTMLImageElement,
      MouseEvent
    >
  ) => {
    event.stopPropagation();
    if (tool === "select") {
      selectElement(el.id, keyboardKeys);
    }
  };

  const handleDrag = ({ x, y }: { x: number; y: number }) => {
    handleEdit.handleUpdateElement({
      param: "x",
      value: x,
      singleElement: id,
    });
    handleEdit.handleUpdateElement({
      param: "y",
      value: y,
      singleElement: id,
    });
  };

  const handleResize = ({ h, w }: { w: number; h: number }) => {
    handleEdit.handleUpdateElement({
      param: "width",
      value: w,
      singleElement: id,
    });
    handleEdit.handleUpdateElement({
      param: "height",
      value: h,
      singleElement: id,
    });
  };
  // recursively render children

  switch (el.type) {
    case "rect": {
      const rect = el;
      const gradientId = `gradient-${rect.id}`;
      const gradientDef = getGradientDef(rect.style.fill, gradientId);
      return (
        <InteractiveElement
          enableSnap={isSelected}
          enableDrag={isSelected}
          enableResize={isSelected}
          onInteractDragEnd={handleDrag}
          onInteractResizeEnd={handleResize}
          asChild
        >
          <svg
            onClick={handleSelect}
            width={rect.width}
            height={rect.height}
            style={commonStyle}
            id={id}
          >
            {gradientDef && <defs>{gradientDef}</defs>}

            <rect
              width={rect.width}
              height={rect.height}
              rx={
                typeof rect.radius === "number" ? rect.radius : rect.radius.top
              }
              ry={
                typeof rect.radius === "number" ? rect.radius : rect.radius.left
              }
              fill={getFillUrl(rect.style.fill, gradientId)}
              stroke={`${rect.style.stroke.width}px ${rect.style.stroke.type} ${rect.style.stroke.color}`}
            />
          </svg>
        </InteractiveElement>
      );
    }

    case "ellipse": {
      const ell = el;
      const gradientId = `gradient-${ell.id}`;
      const gradientDef = getGradientDef(ell.style.fill, gradientId);
      return (
        <svg
          onClick={handleSelect}
          width={ell.width}
          height={ell.height}
          viewBox={`0 0 ${ell.width} ${ell.height}`}
          style={commonStyle}
          id={id}
        >
          {gradientDef && <defs>{gradientDef}</defs>}

          <ellipse
            cx={ell.width / 2}
            cy={ell.height / 2}
            rx={ell.width / 2}
            ry={ell.height / 2}
            fill={getFillUrl(ell.style.fill, gradientId)}
            stroke={`${ell.style.stroke.width}px ${ell.style.stroke.type} ${ell.style.stroke.color}`}
          />
        </svg>
      );
    }

    case "line": {
      const ln = el;
      const dx = ln.x2 - ln.x1;
      const dy = ln.y2 - ln.y1;
      const gradientId = `gradient-${ln.id}`;
      const gradientDef = getGradientDef(ln.style.fill, gradientId);
      return (
        <svg
          onClick={handleSelect}
          width={Math.abs(dx)}
          height={Math.abs(dy)}
          style={commonStyle}
        >
          {gradientDef && <defs>{gradientDef}</defs>}

          <line
            x1={0}
            y1={0}
            x2={dx}
            y2={dy}
            stroke={getFillUrl(ln.style.fill, gradientId)}
            strokeWidth={ln.style.stroke.width}
          />
        </svg>
      );
    }

    case "text": {
      const txt = el;

      return (
        <div
          onClick={handleSelect}
          style={{ ...commonStyle }}
          ref={textContainerRef}
          id={id}
        >
          <p
            style={{
              margin: 0,
              fontFamily: txt.fontFamily,
              fontSize: txt.fontSize,
              fontWeight: txt.fontWeight,
              background: `text ${txt.style.fill}`,
              color: "transparent",
              outline: "none",
            }}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onDoubleClick={handleDoubleClick}
            onBlur={handleBlur}
          >
            {txt.text}
          </p>
        </div>
      );
    }

    case "image": {
      const img = el;
      return (
        <InteractiveElement
          enableSnap={isSelected}
          enableDrag={isSelected}
          enableResize={isSelected}
          onInteractDragEnd={handleDrag}
          onInteractResizeEnd={handleResize}
          asChild
        >
          <img
            onClick={handleSelect}
            src={img.src}
            style={{
              ...commonStyle,
              width: img.width,
              height: img.height,
              objectFit: "cover",
            }}
            id={id}
          />
        </InteractiveElement>
      );
    }

    case "frame": {
      const divElement = el;
      const isFlex = divElement.displayType === "flex";
      const displayConfig: React.CSSProperties = isFlex
        ? {
            display: "flex",
            flexDirection: divElement.direction,
            gap: divElement.gap,
            alignItems: divElement.items,
            justifyContent: divElement.justify,
          }
        : {
            display: "block",
          };

      return (
        <div
          onClick={handleSelect}
          style={{
            ...commonStyle,
            width: divElement.width,
            background: divElement.style.fill,
            height: divElement.height,
            ...displayConfig,
          }}
          id={id}
          className="space-x-0"
        >
          {divElement.children?.map((child, idx) => (
            <ElementRenderer
              face={face}
              key={child.id}
              el={child}
              select={select}
              index={idx}
              id={child.id}
            />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
